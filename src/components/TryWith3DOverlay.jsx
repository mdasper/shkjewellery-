import React, { useState, useEffect, useRef, useCallback, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CameraOff } from 'lucide-react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrthographicCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ── MediaPipe script loader ──────────────────────────────────────────────────
const loadScript = (src) => new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve();
  const s = document.createElement('script');
  s.src = src; s.crossOrigin = 'anonymous'; s.onload = resolve; s.onerror = reject;
  document.head.appendChild(s);
});

function getJewelSrc(product) {
  if (product.typeSlug === 'earring') return `/assets/tryon/earring_${product.id}.png`;
  return `/assets/tryon/cutout_${product.id}.png`;
}

// ── Curved 2D Image on 3D Surface ──────────────────────────────────────────
function CurvedJewel({ trackingPos, stageSize, jewelSrc }) {
  const groupRef = useRef();
  const [texture, setTexture] = useState(null);

  // Load texture manually to avoid Suspense hanging the entire canvas if image is missing
  useEffect(() => {
    new THREE.TextureLoader().load(
      jewelSrc,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace; // crucial for correct colors
        setTexture(tex);
      }
    );
  }, [jewelSrc]);
  
  const geometry = useMemo(() => {
    // A half-cylinder along Y axis, facing +Z
    return new THREE.CylinderGeometry(1, 1, 1.5, 32, 1, true, -Math.PI / 2, Math.PI);
  }, []);

  useFrame(() => {
    if (!groupRef.current || !trackingPos || !stageSize) return;

    const wX = trackingPos.x - stageSize.w / 2;
    const wY = stageSize.h / 2 - trackingPos.y;
    
    // Torus/Cylinder radius is 1. We want total width = trackingPos.w
    // so scale is trackingPos.w / 2.
    const targetScale = trackingPos.w / 2;

    const lerp = THREE.MathUtils.lerp;
    const cur = groupRef.current;
    
    // If it's the very first frame (Y is 1000), snap immediately instead of slow lerp
    if (cur.position.y === 1000) {
      cur.position.set(wX, wY, 0);
      cur.rotation.set(trackingPos.pitch, trackingPos.yaw, trackingPos.roll);
      cur.scale.set(targetScale, targetScale, targetScale);
    } else {
      cur.position.x = lerp(cur.position.x, wX, 0.3);
      cur.position.y = lerp(cur.position.y, wY, 0.3);
      
      cur.rotation.y = lerp(cur.rotation.y, trackingPos.yaw, 0.3);
      cur.rotation.x = lerp(cur.rotation.x, trackingPos.pitch, 0.3);
      cur.rotation.z = lerp(cur.rotation.z, trackingPos.roll, 0.3);
      
      const sc = lerp(cur.scale.x, targetScale, 0.3);
      cur.scale.set(sc, sc, sc);
    }
  });

  return (
    <group ref={groupRef} position={[0, 1000, 0]}>
      <mesh geometry={geometry}>
        {texture ? (
          <meshStandardMaterial 
            map={texture} 
            transparent={true}
            alphaTest={0.05}
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.8}
          />
        ) : (
          <meshBasicMaterial color="#FBD05E" wireframe={true} />
        )}
      </mesh>
    </group>
  );
}

export default function TryWith3DOverlay({ product, onClose }) {
  const [status, setStatus] = useState('loading');
  const [faceDetected, setFaceDetected] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const [stageSize, setStageSize] = useState({ w: 700, h: 500 });
  
  // Tracked position: x,y in pixels, w in pixels, angles in radians
  const liveTracking = useRef({ x: 0, y: 0, w: 200, yaw: 0, pitch: 0, roll: 0 });

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fmRef = useRef(null);
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const jewelSrc = getJewelSrc(product);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      setStageSize({ w: entries[0].contentRect.width, h: entries[0].contentRect.height });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const onResults = useCallback((results) => {
    const W = containerRef.current?.clientWidth || 700;
    const H = containerRef.current?.clientHeight || 500;

    if (!results.multiFaceLandmarks?.length) {
      setFaceDetected(false);
      return;
    }
    setFaceDetected(true);

    const lm = results.multiFaceLandmarks[0];

    const chin = lm[152];
    const fore = lm[10];
    const lEar = lm[234];
    const rEar = lm[454];
    const nose = lm[1];

    const toX = (p) => (1 - p.x) * W;
    const toY = (p) => p.y * H;

    const chinY = toY(chin);
    const foreY = toY(fore);
    const faceH = Math.abs(chinY - foreY);
    
    const lEarX = toX(lEar);
    const rEarX = toX(rEar);
    const earW = Math.abs(lEarX - rEarX);
    
    const anchorX = (lEarX + rEarX) / 2;
    // Adjusted Y offset so the necklace sits properly below the chin
    const anchorY = chinY + faceH * 0.45;
    
    // Scale necklace physical width
    const neckW = earW * 1.5;

    // True 3D Angles from FaceMesh Depth (z)
    const earDZ = (lEar.z - rEar.z);
    const earDX = (lEar.x - rEar.x); 
    // Amplify yaw slightly for better visibility of the 3D effect
    let yaw = Math.atan2(earDZ, Math.abs(earDX)) * 1.8; 

    const noseY = nose.y;
    const faceMidY = (chin.y + fore.y) / 2;
    let pitch = (noseY - faceMidY) * 2.5; 

    const eyeDX = toX(lm[33]) - toX(lm[263]);
    const eyeDY = toY(lm[33]) - toY(lm[263]);
    let roll = Math.atan2(eyeDY, eyeDX);

    liveTracking.current = { x: anchorX, y: anchorY, w: neckW, yaw, pitch, roll };
  }, []);

  const startLoop = useCallback(() => {
    const tick = async () => {
      const v = videoRef.current;
      const fm = fmRef.current;
      if (v && v.readyState >= 2 && fm) {
        try { await fm.send({ image: v }); } catch {}
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');
        if (cancelled || !window.FaceMesh) throw new Error('FaceMesh unavail');

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise(res => { videoRef.current.onloadedmetadata = () => videoRef.current.play().then(res); });
        }

        const fm = new window.FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
        fm.setOptions({ maxNumFaces: 1, refineLandmarks: false, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
        fm.onResults(onResults);
        fmRef.current = fm;

        if (!cancelled) {
          setStatus('ready');
          startLoop();
        }
      } catch (err) {
        if (!cancelled) {
          setStatus('error');
          setCameraError('Camera access denied or failed to load AI.');
        }
      }
    }
    boot();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [onResults, startLoop]);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black flex flex-col">
        <div className="bg-gradient-to-r from-[#2B0407] to-[#1a0204] border-b border-brand-gold/40 px-6 py-4 flex items-center justify-between shadow-2xl z-50 relative">
          <div>
            <h2 className="font-cinzel text-lg font-black text-brand-gold tracking-wider">
              ✨ 3D Curved AR — {product.name}
            </h2>
            <p className="text-xs text-emerald-400 font-mono tracking-wider mt-1">CURVED PROJECTION ACTIVE</p>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-maroon text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div ref={containerRef} className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          
          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/90 text-brand-gold">
              <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4" />
              <p className="font-cinzel font-bold text-sm">Initialising 3D Engine...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/95 px-8 text-center">
              <CameraOff size={52} className="text-rose-400 mb-4" />
              <p className="text-rose-400">{cameraError}</p>
            </div>
          )}

          <video ref={videoRef} playsInline autoPlay muted style={{ transform: 'scaleX(-1)' }} className="absolute inset-0 w-full h-full object-cover select-none" />

          {status === 'ready' && faceDetected && (
            <div className="absolute inset-0 pointer-events-none">
              <Canvas orthographic camera={{ position: [0, 0, 1000], zoom: 1, near: 0.1, far: 5000, left: -stageSize.w/2, right: stageSize.w/2, top: stageSize.h/2, bottom: -stageSize.h/2 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={2} color="#fff8e7" />
                
                <Suspense fallback={null}>
                  <CurvedJewel trackingPos={liveTracking.current} stageSize={stageSize} jewelSrc={jewelSrc} />
                </Suspense>
              </Canvas>
            </div>
          )}
          
          {status === 'ready' && (
            <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end space-y-2 pointer-events-none">
              <div className={`px-4 py-2 rounded-full border border-brand-gold/40 text-xs font-mono shadow-2xl backdrop-blur-md bg-black/80 ${faceDetected ? 'text-emerald-400' : 'text-amber-400'}`}>
                {faceDetected ? '✓ 3D Anchor Locked — Turn head freely!' : 'Face the camera to lock 3D anchor...'}
              </div>
              <p className="text-[10px] text-white/50 bg-black/50 px-3 py-1 rounded-full border border-white/10">Projecting 2D PNG onto 3D Curve</p>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
