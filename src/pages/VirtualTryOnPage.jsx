import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Camera, RefreshCw,
  Download, MessageCircle, Upload, Crown, Sparkles, AlertCircle,
  Check, Scan, X, Gem, ChevronLeft, ChevronRight, Cpu
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { allProducts } from '../data/productsData';

// ─── Script loader ─────────────────────────────────────────────────────────────
const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src; s.crossOrigin = 'anonymous';
    s.onload = () => resolve(); s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });

// ─── Metal colour filters (CSS) ────────────────────────────────────────────────
const METAL_FILTERS = {
  '22k':   'brightness(1.05) saturate(1.1)',
  antique: 'sepia(0.45) saturate(1.3) brightness(0.9)',
  rose:    'sepia(0.35) saturate(1.5) hue-rotate(-15deg) brightness(1.05)',
  white:   'grayscale(0.6) brightness(1.15) saturate(0.7)'
};

// ─── Preset South-Indian bridal model photos ───────────────────────────────────
const PRESET_MODELS = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583391733981-8498ec7b8b9d?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1603771628302-8e02bec69b1c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=900&auto=format&fit=crop&q=80',
];

export default function VirtualTryOnPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialId = searchParams.get('id');

  // ── Catalog ─────────────────────────────────────────────────────────────────
  const necklaceList = allProducts.filter(
    (p) => p.typeSlug === 'necklace' || p.typeSlug === 'pendant' || p.typeSlug === 'chain'
  );
  const earringList = allProducts.filter((p) => p.typeSlug === 'earring');
  const selectedFromParam = initialId
    ? allProducts.find((p) => p.id === parseInt(initialId))
    : null;

  // ── Active jewel ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(
    selectedFromParam?.typeSlug === 'earring' ? 'earrings' : 'necklace'
  );
  const [activeNecklace, setActiveNecklace] = useState(
    selectedFromParam?.typeSlug !== 'earring' && selectedFromParam
      ? selectedFromParam
      : necklaceList[0]
  );
  const [activeEarring, setActiveEarring] = useState(
    selectedFromParam?.typeSlug === 'earring' && selectedFromParam
      ? selectedFromParam
      : earringList[0]
  );

  // ── Mode ─────────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [presetModelIdx, setPresetModelIdx] = useState(0);

  // ── Metal finish ─────────────────────────────────────────────────────────────
  const [metalFinish, setMetalFinish] = useState('22k');

  // ── Face tracking ─────────────────────────────────────────────────────────────
  const [faceDetected, setFaceDetected] = useState(false);
  const [showAiReticle, setShowAiReticle] = useState(false);
  const [pose3D, setPose3D] = useState({
    neckX: 0, neckY: 0,
    leftEarX: 0, leftEarY: 0, rightEarX: 0, rightEarY: 0,
    scale: 1.0, yaw: 0, pitch: 0, roll: 0,
    faceWidth: 180, hasLocked: false
  });

  // ── Fine-tune controls ───────────────────────────────────────────────────────
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1.0);
  const [necklaceLength, setNecklaceLength] = useState('princess');

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [trayOpen, setTrayOpen] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const videoRef     = useRef(null);
  const streamRef    = useRef(null);
  const faceMeshRef  = useRef(null);
  const animFrameRef = useRef(null);
  const stageRef     = useRef(null);
  const hudCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const lengthOffsets = { choker: -35, princess: 0, haram: 65 };

  // ════════════════════════════════════════════════════════════════════════════
  // 1. MediaPipe FaceMesh Init
  // ════════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    let alive = true;
    async function initFaceMesh() {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');
        if (!alive || !window.FaceMesh) return;
        const fm = new window.FaceMesh({
          locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`
        });
        fm.setOptions({
          maxNumFaces: 1, refineLandmarks: true,
          minDetectionConfidence: 0.5, minTrackingConfidence: 0.5
        });
        fm.onResults(onFaceResults);
        faceMeshRef.current = fm;
      } catch (err) { console.warn('FaceMesh init error:', err); }
    }
    initFaceMesh();
    return () => { alive = false; };
  }, []);

  // ════════════════════════════════════════════════════════════════════════════
  // 2. Face Landmark Processing
  // ════════════════════════════════════════════════════════════════════════════
  const onFaceResults = (results) => {
    const stage = stageRef.current;
    if (!stage) return;
    const W = stage.clientWidth, H = stage.clientHeight;

    if (results.multiFaceLandmarks?.length > 0) {
      const lm = results.multiFaceLandmarks[0];
      setFaceDetected(true);

      const nose = lm[1], chin = lm[152], forehead = lm[10];
      const leftEar = lm[234], rightEar = lm[454];
      const leftEye = lm[33], rightEye = lm[263];

      const chinX = (1 - chin.x) * W, chinY = chin.y * H;
      const foreheadY = forehead.y * H;
      const faceHeight = Math.abs(chinY - foreheadY);

      const lEarX = (1 - leftEar.x) * W, lEarY = leftEar.y * H + 8;
      const rEarX = (1 - rightEar.x) * W, rEarY = rightEar.y * H + 8;

      const faceWidth = Math.hypot(rEarX - lEarX, rEarY - lEarY);
      const midEarX = (lEarX + rEarX) / 2;
      const noseX = (1 - nose.x) * W, noseY = nose.y * H;

      const rawYaw = Math.max(-55, Math.min(55,
        ((noseX - midEarX) / (faceWidth * 0.45)) * 48
      ));
      const midFaceY = (foreheadY + chinY) / 2;
      const rawPitch = Math.max(-30, Math.min(30,
        ((noseY - midFaceY) / (faceHeight * 0.35)) * 35
      ));

      const eyeDx = (1 - leftEye.x) * W - (1 - rightEye.x) * W;
      const eyeDy = leftEye.y * H - rightEye.y * H;
      let rawRoll = (Math.atan2(eyeDy, eyeDx) * 180) / Math.PI;
      if (rawRoll > 90) rawRoll -= 180;
      if (rawRoll < -90) rawRoll += 180;
      const cleanRoll = Math.max(-32, Math.min(32, rawRoll));

      const rawNeckX = chinX;
      const rawNeckY = chinY + faceHeight * 0.65;
      const rawScale = (faceWidth / 185) * 0.96;

      setPose3D((prev) => {
        if (!prev.hasLocked) {
          return {
            neckX: rawNeckX, neckY: rawNeckY,
            leftEarX: lEarX, leftEarY: lEarY,
            rightEarX: rEarX, rightEarY: rEarY,
            scale: rawScale, yaw: rawYaw, pitch: rawPitch, roll: cleanRoll,
            faceWidth, hasLocked: true
          };
        }
        return {
          neckX:     prev.neckX     * 0.65 + rawNeckX * 0.35,
          neckY:     prev.neckY     * 0.65 + rawNeckY * 0.35,
          leftEarX:  prev.leftEarX  * 0.65 + lEarX    * 0.35,
          leftEarY:  prev.leftEarY  * 0.65 + lEarY    * 0.35,
          rightEarX: prev.rightEarX * 0.65 + rEarX    * 0.35,
          rightEarY: prev.rightEarY * 0.65 + rEarY    * 0.35,
          scale:     prev.scale     * 0.70 + rawScale  * 0.30,
          yaw:       prev.yaw       * 0.65 + rawYaw    * 0.35,
          pitch:     prev.pitch     * 0.65 + rawPitch  * 0.35,
          roll:      prev.roll      * 0.65 + cleanRoll * 0.35,
          faceWidth, hasLocked: true
        };
      });

      if (showAiReticle && hudCanvasRef.current) {
        drawHudReticle(W, H, lEarX, lEarY, rEarX, rEarY, rawNeckX, rawNeckY);
      }
    } else {
      setFaceDetected(false);
    }
  };

  const drawHudReticle = (w, h, lx, ly, rx, ry, nx, ny) => {
    const canvas = hudCanvasRef.current;
    if (!canvas) return;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.strokeStyle = 'rgba(229,192,123,0.55)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(nx, ny); ctx.lineTo(rx, ry); ctx.stroke();
    [[lx, ly], [rx, ry], [nx, ny]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#E5C07B'; ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 8; ctx.fill();
    });
    ctx.restore();
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 3. Camera Controls
  // ════════════════════════════════════════════════════════════════════════════
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          startLoop();
        };
      }
      setCameraActive(true); setMode('camera');
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError(t('ar.cameraError')); setCameraActive(false); setMode('model');
    }
  };

  const startLoop = () => {
    const loop = async () => {
      if (videoRef.current?.readyState >= 2 && faceMeshRef.current) {
        try { await faceMeshRef.current.send({ image: videoRef.current }); } catch (_) {}
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
  };

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result); setMode('upload'); stopCamera();
    };
    reader.readAsDataURL(file);
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 4. Derived Layout Values
  // ════════════════════════════════════════════════════════════════════════════
  const stage  = stageRef.current;
  const stageW = stage ? stage.clientWidth  : 800;
  const stageH = stage ? stage.clientHeight : 600;

  const finalNeckX  = (pose3D.hasLocked ? pose3D.neckX    : stageW * 0.50) + offsetX;
  const finalNeckY  = (pose3D.hasLocked ? pose3D.neckY    : stageH * 0.58)
                      + lengthOffsets[necklaceLength] + offsetY;
  const finalLEarX  = pose3D.hasLocked ? pose3D.leftEarX  : stageW * 0.38;
  const finalLEarY  = pose3D.hasLocked ? pose3D.leftEarY  : stageH * 0.38;
  const finalREarX  = pose3D.hasLocked ? pose3D.rightEarX : stageW * 0.62;
  const finalREarY  = pose3D.hasLocked ? pose3D.rightEarY : stageH * 0.38;

  const yawRad          = (pose3D.yaw * Math.PI) / 180;
  const lEarOpacity     = Math.max(0.15, Math.min(1.0, 1 + Math.sin(yawRad) * 0.9));
  const rEarOpacity     = Math.max(0.15, Math.min(1.0, 1 - Math.sin(yawRad) * 0.9));
  const dynamicNecklaceW = Math.max(180, Math.min(350,
    (pose3D.hasLocked ? pose3D.faceWidth * 1.38 : 250) * scaleMultiplier
  ));
  const dynamicEarringW  = Math.max(34, Math.min(80,
    (pose3D.hasLocked ? pose3D.faceWidth * 0.22 : 44) * scaleMultiplier
  ));
  const earringDangle = -pose3D.roll * 0.4;
  const metalFilter   = METAL_FILTERS[metalFinish] || METAL_FILTERS['22k'];
  const currentJewel  = activeTab === 'earrings' ? activeEarring : activeNecklace;

  // ════════════════════════════════════════════════════════════════════════════
  // 5. Snapshot Capture
  // ════════════════════════════════════════════════════════════════════════════
  const captureLook = () => {
    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width  = 1080;
    canvas.height = Math.round(1080 * (stageH / stageW));
    const ctx = canvas.getContext('2d');
    const sf  = canvas.width / stageW;

    const drawJewels = () => {
      const mc = document.createElement('canvas');
      mc.width = canvas.width; mc.height = canvas.height;
      const mCtx = mc.getContext('2d');

      const drawNecklace = (cb) => {
        if (activeTab === 'earrings') return cb();
        const img = new Image();
        img.src = `/assets/tryon/cutout_${activeNecklace.id}.png`;
        img.onload = () => {
          mCtx.save();
          mCtx.translate(finalNeckX * sf, finalNeckY * sf);
          mCtx.rotate((pose3D.roll * Math.PI) / 180);
          mCtx.scale(Math.cos((pose3D.yaw * Math.PI) / 180), 1);
          mCtx.shadowColor = 'rgba(0,0,0,0.7)'; mCtx.shadowBlur = 24; mCtx.shadowOffsetY = 16;
          const jW = dynamicNecklaceW * sf;
          mCtx.drawImage(img, -jW / 2, 0, jW, (img.height / img.width) * jW);
          mCtx.restore(); cb();
        };
        img.onerror = cb;
      };

      const drawEarrings = () => {
        if (activeTab === 'necklace') return finish();
        const img = new Image();
        img.src = `/assets/tryon/single_earring_${activeEarring.id}.png`;
        img.onload = () => {
          const eW = dynamicEarringW * sf;
          const eH = (img.height / img.width) * eW;
          [[finalLEarX, finalLEarY, lEarOpacity],
           [finalREarX, finalREarY, rEarOpacity]].forEach(([x, y, op]) => {
            if (op <= 0.2) return;
            mCtx.save();
            mCtx.globalAlpha = op;
            mCtx.translate(x * sf, y * sf);
            mCtx.rotate((earringDangle * Math.PI) / 180);
            mCtx.shadowColor = 'rgba(0,0,0,0.6)'; mCtx.shadowBlur = 16; mCtx.shadowOffsetY = 10;
            mCtx.drawImage(img, -eW / 2, 0, eW, eH);
            mCtx.restore();
          });
          finish();
        };
        img.onerror = finish;
      };

      const finish = () => {
        ctx.filter = metalFinish !== '22k' ? metalFilter : 'none';
        ctx.drawImage(mc, 0, 0);
        ctx.filter = 'none';
        ctx.fillStyle = 'rgba(28,5,7,0.88)';
        ctx.fillRect(0, canvas.height - 68, canvas.width, 68);
        ctx.font = 'bold 20px "Cinzel", serif';
        ctx.fillStyle = '#E5C07B'; ctx.textAlign = 'center';
        ctx.fillText('SRI HARI KRISHNA NAGAI MALIGAI, MADURAI', canvas.width / 2, canvas.height - 42);
        ctx.font = '14px "Cinzel", serif'; ctx.fillStyle = '#fff8e7';
        ctx.fillText(
          `${currentJewel.name.toUpperCase()} • BIS 916 • ${currentJewel.weight} • AR VIRTUAL TRY-ON`,
          canvas.width / 2, canvas.height - 20
        );
        setSnapshotUrl(canvas.toDataURL('image/png'));
        setIsCapturing(false);
      };

      drawNecklace(drawEarrings);
    };

    if (mode === 'camera' && videoRef.current?.readyState >= 2) {
      ctx.save();
      ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
      const v = videoRef.current;
      const vR = v.videoWidth / v.videoHeight, cR = canvas.width / canvas.height;
      let sW = v.videoWidth, sH = v.videoHeight, sx = 0, sy = 0;
      if (vR > cR) { sW = v.videoHeight * cR; sx = (v.videoWidth - sW) / 2; }
      else          { sH = v.videoWidth / cR;  sy = (v.videoHeight - sH) / 2; }
      ctx.drawImage(v, sx, sy, sW, sH, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawJewels();
    } else {
      const bg = new Image(); bg.crossOrigin = 'anonymous';
      bg.src = mode === 'upload' ? uploadedImage : PRESET_MODELS[presetModelIdx];
      bg.onload = () => { ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); drawJewels(); };
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <PageTransition>
      <div className="bg-[#0D0102] min-h-screen text-white flex flex-col font-sans select-none overflow-hidden">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="bg-gradient-to-r from-[#2B0407] via-[#3B070B] to-[#2B0407] border-b border-brand-gold/40 px-4 sm:px-6 py-3 flex items-center justify-between z-30 shadow-2xl shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-black/40 hover:bg-brand-gold hover:text-brand-maroon text-brand-gold rounded-full border border-brand-gold/40 transition-all flex items-center gap-1 text-xs font-cinzel font-bold"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">{t('ar.back')}</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Crown size={17} className="text-brand-gold" />
                <h1 className="font-cinzel text-sm sm:text-base font-black text-brand-gold tracking-wider">
                  {t('ar.studioTitle')}
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t('ar.badge')}
                </span>
              </div>
              <p className="text-[10px] text-brand-cream/70 hidden sm:block">{t('ar.studioSubtitle')}</p>
            </div>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiReticle(!showAiReticle)}
              className={`p-2 rounded-xl border transition-all ${
                showAiReticle
                  ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                  : 'bg-black/40 border-brand-gold/30 text-brand-cream/50 hover:text-white'
              }`}
              title={showAiReticle ? t('ar.reticleOn') : t('ar.reticleOff')}
            >
              <Scan size={14} />
            </button>

            <div className="flex bg-black/60 rounded-xl p-1 border border-brand-gold/40 text-xs">
              <button
                onClick={startCamera}
                className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[11px] transition-all flex items-center gap-1.5 ${
                  mode === 'camera'
                    ? 'bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon shadow-gold-glow'
                    : 'text-brand-cream hover:text-white'
                }`}
              >
                <Camera size={12} />
                <span className="hidden sm:inline">{t('ar.liveCamera')}</span>
              </button>

              <button
                onClick={() => { setMode('model'); stopCamera(); }}
                className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[11px] transition-all ${
                  mode === 'model'
                    ? 'bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon shadow-gold-glow'
                    : 'text-brand-cream hover:text-white'
                }`}
              >
                {t('ar.bridalModel')}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[11px] transition-all flex items-center gap-1.5 ${
                  mode === 'upload'
                    ? 'bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon shadow-gold-glow'
                    : 'text-brand-cream hover:text-white'
                }`}
              >
                <Upload size={12} />
                <span className="hidden sm:inline">{t('ar.uploadPhoto')}</span>
              </button>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>
          </div>
        </header>

        {/* ── Sub-bar: Category tabs ──────────────────────────────────────────── */}
        <div className="bg-black/80 border-b border-brand-gold/25 px-4 sm:px-6 py-2 flex items-center justify-between z-25 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase tracking-wider hidden sm:inline">
              {t('ar.categoryLabel')}
            </span>
            <div className="flex bg-black/70 p-1 rounded-xl border border-brand-gold/40 text-[10px]">
              {[
                { id: 'necklace', Icon: Crown,    label: t('ar.tabNecklace') },
                { id: 'earrings', Icon: Gem,      label: t('ar.tabEarrings') },
                { id: 'combo',    Icon: Sparkles,  label: t('ar.tabCombo') }
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-3 py-1 rounded-lg font-cinzel font-bold transition-all flex items-center gap-1 ${
                    activeTab === id
                      ? 'bg-brand-gold text-brand-maroon shadow-gold-glow'
                      : 'text-brand-cream hover:text-white'
                  }`}
                >
                  <Icon size={11} />
                  <span className="hidden md:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-emerald-400 hidden lg:flex items-center gap-2">
            <span>YAW: {Math.round(pose3D.yaw)}°</span>
            <span>•</span>
            <span>PITCH: {Math.round(pose3D.pitch)}°</span>
            <span>•</span>
            <span>ROLL: {Math.round(pose3D.roll)}°</span>
          </div>
        </div>

        {/* ── Main workspace ──────────────────────────────────────────────────── */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative">

          {/* Stage viewport */}
          <div ref={stageRef} className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">

            {/* Camera error banner */}
            <AnimatePresence>
              {cameraError && mode !== 'camera' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute top-4 left-4 right-4 z-30 bg-rose-950/95 border border-rose-500 p-3 rounded-2xl flex items-center justify-between text-xs text-rose-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-rose-400 shrink-0" />
                    <span>{cameraError}</span>
                  </div>
                  <button
                    onClick={() => { setMode('model'); setCameraError(null); }}
                    className="bg-brand-gold text-brand-maroon font-cinzel font-bold px-3 py-1 rounded-lg text-xs shrink-0"
                  >
                    {t('ar.useBridalModel')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live camera */}
            {mode === 'camera' && (
              <video ref={videoRef} playsInline autoPlay muted
                style={{ transform: 'scaleX(-1)' }} className="w-full h-full object-cover" />
            )}

            {/* Uploaded photo */}
            {mode === 'upload' && uploadedImage && (
              <img src={uploadedImage} alt="uploaded" className="w-full h-full object-contain" />
            )}

            {/* Preset bridal model */}
            {mode === 'model' && (
              <div className="w-full h-full relative">
                <img
                  key={presetModelIdx}
                  src={PRESET_MODELS[presetModelIdx]}
                  alt="Bridal Model"
                  className="w-full h-full object-cover brightness-95"
                  onError={(e) => { e.target.src = '/assets/images/hero_bridal_set.jpg'; }}
                />
                <button
                  onClick={() => setPresetModelIdx((i) => (i - 1 + PRESET_MODELS.length) % PRESET_MODELS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/70 hover:bg-brand-gold hover:text-brand-maroon text-brand-gold rounded-full border border-brand-gold/50 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setPresetModelIdx((i) => (i + 1) % PRESET_MODELS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/70 hover:bg-brand-gold hover:text-brand-maroon text-brand-gold rounded-full border border-brand-gold/50 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute top-3 left-3 bg-black/75 px-3 py-1 rounded-full text-[10px] text-brand-gold font-cinzel font-bold border border-brand-gold/40">
                  {t('ar.sampleModel')} {presetModelIdx + 1}/{PRESET_MODELS.length}
                </div>
              </div>
            )}

            {/* Face detection badge */}
            {mode === 'camera' && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-gold/40 text-[10px] font-mono shadow-2xl">
                <span className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
                <span className={faceDetected ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                  {faceDetected
                    ? `${t('ar.faceDetected')} • YAW ${Math.round(pose3D.yaw)}°`
                    : t('ar.faceSearching')}
                </span>
              </div>
            )}

            {/* Quick Fit bar */}
            <div className="absolute top-3 left-3 z-20 hidden sm:flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-brand-gold/40 text-xs shadow-2xl">
              <span className="text-[9px] font-cinzel font-bold text-brand-gold uppercase pr-1">{t('ar.quickFit')}</span>
              {[
                { label: t('ar.higher'),   act: () => setOffsetY((p) => p - 15) },
                { label: t('ar.lower'),    act: () => setOffsetY((p) => p + 15) },
                { label: t('ar.sizeDown'), act: () => setScaleMultiplier((p) => Math.max(0.6, p - 0.08)) },
                { label: t('ar.sizeUp'),   act: () => setScaleMultiplier((p) => Math.min(1.6, p + 0.08)) },
              ].map(({ label, act }) => (
                <button key={label} onClick={act}
                  className="px-2 py-1 bg-white/10 hover:bg-brand-gold hover:text-brand-maroon text-brand-cream rounded-lg font-bold transition-all text-[10px]">
                  {label}
                </button>
              ))}
              <button
                onClick={() => { setOffsetY(0); setOffsetX(0); setScaleMultiplier(1.0); }}
                className="px-2 py-1 bg-brand-gold/20 hover:bg-brand-gold text-brand-gold hover:text-brand-maroon rounded-lg font-cinzel font-bold transition-all text-[9px] border border-brand-gold/40"
              >
                {t('ar.autoFit')}
              </button>
            </div>

            {/* HUD reticle canvas */}
            <canvas ref={hudCanvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />

            {/* ── Jewelry overlay ───────────────────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none z-20">

              {/* Necklace */}
              {(activeTab === 'necklace' || activeTab === 'combo') && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${finalNeckX}px`, top: `${finalNeckY}px`,
                    transform: `translate(-50%, 0) rotate(${pose3D.roll}deg) perspective(700px) rotateY(${pose3D.yaw}deg) rotateX(${-pose3D.pitch * 0.7}deg)`,
                    transformOrigin: 'top center',
                    width: `${dynamicNecklaceW}px`,
                    transition: 'transform 0.04s linear'
                  }}
                >
                  <img
                    src={`/assets/tryon/cutout_${activeNecklace.id}.png`}
                    alt={activeNecklace.name}
                    onError={(e) => { e.target.src = activeNecklace.image; }}
                    style={{
                      width: '100%', display: 'block',
                      filter: `drop-shadow(0 18px 26px rgba(0,0,0,0.75)) drop-shadow(0 4px 6px rgba(0,0,0,0.4)) ${metalFilter}`
                    }}
                    className="select-none"
                  />
                </div>
              )}

              {/* Left earring */}
              {(activeTab === 'earrings' || activeTab === 'combo') && lEarOpacity > 0.15 && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${finalLEarX}px`, top: `${finalLEarY}px`,
                    transform: `translate(-50%, 0) scale(${1 + Math.sin(yawRad) * 0.25}) rotate(${earringDangle}deg)`,
                    transformOrigin: 'top center', opacity: lEarOpacity,
                    width: `${dynamicEarringW}px`,
                    transition: 'transform 0.04s linear, opacity 0.08s ease'
                  }}
                >
                  <img
                    src={`/assets/tryon/single_earring_${activeEarring.id}.png`}
                    alt={activeEarring.name}
                    onError={(e) => { e.target.src = activeEarring.image; }}
                    style={{ width: '100%', display: 'block', filter: `drop-shadow(0 12px 18px rgba(0,0,0,0.7)) ${metalFilter}` }}
                    className="select-none"
                  />
                </div>
              )}

              {/* Right earring */}
              {(activeTab === 'earrings' || activeTab === 'combo') && rEarOpacity > 0.15 && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${finalREarX}px`, top: `${finalREarY}px`,
                    transform: `translate(-50%, 0) scale(${1 - Math.sin(yawRad) * 0.25}) rotate(${earringDangle}deg)`,
                    transformOrigin: 'top center', opacity: rEarOpacity,
                    width: `${dynamicEarringW}px`,
                    transition: 'transform 0.04s linear, opacity 0.08s ease'
                  }}
                >
                  <img
                    src={`/assets/tryon/single_earring_${activeEarring.id}.png`}
                    alt={activeEarring.name}
                    onError={(e) => { e.target.src = activeEarring.image; }}
                    style={{ width: '100%', display: 'block', filter: `drop-shadow(0 12px 18px rgba(0,0,0,0.7)) ${metalFilter}` }}
                    className="select-none"
                  />
                </div>
              )}
            </div>

            {/* ── Bottom action bar ─────────────────────────────────────────── */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
              {/* Jewel info chip */}
              <div className="flex items-center gap-3 bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-brand-gold/50 shadow-2xl min-w-0 flex-1 sm:flex-none">
                <img
                  src={activeTab === 'earrings'
                    ? `/assets/tryon/single_earring_${activeEarring.id}.png`
                    : `/assets/tryon/cutout_${activeNecklace.id}.png`}
                  onError={(e) => { e.target.src = currentJewel.image; }}
                  alt=""
                  className="w-10 h-10 object-contain bg-black/60 rounded-xl p-1 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-cormorant text-sm font-bold text-white truncate leading-tight">{currentJewel.name}</h3>
                  <div className="flex items-center gap-1.5 text-[9px] text-brand-gold font-cinzel font-bold pt-0.5">
                    <span>{currentJewel.weight}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{t('ar.bis916')}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline text-brand-cream/60">{currentJewel.code}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setOffsetY(0); setOffsetX(0); setScaleMultiplier(1.0); }}
                  className="p-2.5 bg-black/80 hover:bg-brand-gold hover:text-brand-maroon text-brand-gold rounded-xl border border-brand-gold/40 transition-all"
                  title={t('ar.reset')}
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  onClick={() => setControlsOpen(!controlsOpen)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    controlsOpen
                      ? 'bg-brand-gold text-brand-maroon border-brand-gold'
                      : 'bg-black/80 text-brand-gold border-brand-gold/40 hover:bg-brand-gold/20'
                  }`}
                  title={t('ar.controls')}
                >
                  <Cpu size={15} />
                </button>
                <button
                  onClick={captureLook}
                  disabled={isCapturing}
                  className="btn-shimmer bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-5 py-2.5 rounded-xl font-cinzel font-extrabold text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-60"
                >
                  <Camera size={15} className="shrink-0" />
                  <span>{isCapturing ? t('ar.capturing') : t('ar.capture')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Controls slide-in panel ──────────────────────────────────────── */}
          <AnimatePresence>
            {controlsOpen && (
              <motion.aside
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#200305] via-[#180204] to-[#100102] border-l border-brand-gold/30 z-40 flex flex-col overflow-y-auto"
              >
                <div className="p-4 space-y-5">
                  <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3">
                    <span className="font-cinzel font-bold text-xs text-brand-gold flex items-center gap-2">
                      <Cpu size={14} /> {t('ar.controls')}
                    </span>
                    <button onClick={() => setControlsOpen(false)} className="text-brand-cream/50 hover:text-brand-gold transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Metal Finish */}
                  <div className="space-y-2">
                    <label className="font-cinzel font-bold text-[11px] uppercase tracking-wider text-brand-gold block">
                      {t('ar.selectMetal')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '22k',    label: t('ar.metal22k'),     color: '#E5C07B' },
                        { id: 'antique',label: t('ar.metalAntique'), color: '#B8860B' },
                        { id: 'rose',   label: t('ar.metalRoseGold'),color: '#E8A080' },
                        { id: 'white',  label: t('ar.metalWhiteGold'),color: '#C8C8C8' }
                      ].map(({ id, label, color }) => (
                        <button
                          key={id}
                          onClick={() => setMetalFinish(id)}
                          className={`py-2 px-2 rounded-xl text-center font-cinzel font-bold text-[10px] border transition-all flex items-center gap-1.5 justify-center ${
                            metalFinish === id
                              ? 'border-white shadow-gold-glow scale-105'
                              : 'bg-black/50 border-brand-gold/30 text-brand-cream hover:border-brand-gold'
                          }`}
                          style={metalFinish === id ? { backgroundColor: color + '33', borderColor: color, color } : {}}
                        >
                          {metalFinish === id && <Check size={10} />}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Necklace length */}
                  <div className="space-y-2">
                    <label className="font-cinzel font-bold text-[11px] uppercase tracking-wider text-brand-gold block">
                      {t('ar.necklaceStyle')}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'choker',   label: t('ar.choker') },
                        { id: 'princess', label: t('ar.princess') },
                        { id: 'haram',    label: t('ar.haram') }
                      ].map(({ id, label }) => (
                        <button
                          key={id}
                          onClick={() => setNecklaceLength(id)}
                          className={`py-2 rounded-xl text-center font-cinzel font-bold text-[9px] border transition-all ${
                            necklaceLength === id
                              ? 'bg-brand-gold text-brand-maroon border-white shadow-gold-glow scale-105'
                              : 'bg-black/50 border-brand-gold/30 text-brand-cream hover:border-brand-gold'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Height slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-brand-cream">
                      <span className="font-medium">{t('ar.heightLabel')}</span>
                      <span className="font-bold text-brand-gold">{offsetY > 0 ? `+${offsetY}px` : `${offsetY}px`}</span>
                    </div>
                    <input type="range" min="-120" max="160" step="2" value={offsetY}
                      onChange={(e) => setOffsetY(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                  </div>

                  {/* Scale slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-brand-cream">
                      <span className="font-medium">{t('ar.sizeLabel')}</span>
                      <span className="font-bold text-brand-gold">{Math.round(scaleMultiplier * 100)}%</span>
                    </div>
                    <input type="range" min="0.6" max="1.5" step="0.02" value={scaleMultiplier}
                      onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))}
                      className="w-full h-2.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                  </div>

                  {/* Center align slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-brand-cream">
                      <span className="font-medium">{t('ar.centerLabel')}</span>
                      <span className="font-bold text-brand-gold">{offsetX}px</span>
                    </div>
                    <input type="range" min="-80" max="80" step="2" value={offsetX}
                      onChange={(e) => setOffsetX(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                  </div>

                  {/* 3D Telemetry */}
                  <div className="p-3 bg-black/60 rounded-2xl border border-brand-gold/30 space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between text-brand-gold">
                      <span>{t('ar.engine')}</span>
                      <span className="text-emerald-400">FACEMESH 468 3D</span>
                    </div>
                    <div className="flex justify-between text-brand-cream/70">
                      <span>{t('ar.yaw')}</span>
                      <span className="text-emerald-400">{Math.round(pose3D.yaw)}°</span>
                    </div>
                    <div className="flex justify-between text-brand-cream/70">
                      <span>{t('ar.pitch')}</span>
                      <span className="text-emerald-400">{Math.round(pose3D.pitch)}°</span>
                    </div>
                    <div className="flex justify-between text-brand-cream/70">
                      <span>{t('ar.earAnchors')}</span>
                      <span className="text-emerald-400">{t('ar.anchorsTracked')}</span>
                    </div>
                  </div>

                  {/* WhatsApp enquiry */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=${encodeURIComponent(
                      `${t('ar.waMsg1')} "${currentJewel.name}" ${t('ar.waMsg2')}`
                    )}`}
                    target="_blank" rel="noreferrer"
                    className="btn-shimmer w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-cinzel font-extrabold py-3.5 rounded-2xl text-center flex items-center justify-center gap-2 text-xs uppercase shadow-2xl transition-all"
                  >
                    <MessageCircle size={16} />
                    {t('ar.inquireWa')}
                  </a>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom Jewelry Tray ─────────────────────────────────────────────── */}
        <div className="bg-[#180204] border-t border-brand-gold/40 z-30 shrink-0">
          <button
            onClick={() => setTrayOpen(!trayOpen)}
            className="w-full px-4 py-2 flex items-center justify-between text-xs"
          >
            <span className="font-cinzel text-[11px] font-extrabold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} />
              {activeTab === 'earrings'
                ? `${t('ar.selectEarrings')} (${earringList.length} ${t('ar.designs')})`
                : `${t('ar.selectNecklace')} (${necklaceList.length} ${t('ar.designs')})`
              }
            </span>
            <span className={`text-brand-gold transition-transform duration-200 ${trayOpen ? 'rotate-180' : ''}`}>▲</span>
          </button>

          <AnimatePresence initial={false}>
            {trayOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3">
                  <p className="text-[10px] text-brand-cream/50 mb-2">{t('ar.clickSwitch')}</p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                    {(activeTab === 'earrings' ? earringList : necklaceList).map((jewel) => {
                      const isSel = activeTab === 'earrings'
                        ? activeEarring.id === jewel.id
                        : activeNecklace.id === jewel.id;
                      return (
                        <motion.button
                          key={jewel.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (activeTab === 'earrings') setActiveEarring(jewel);
                            else setActiveNecklace(jewel);
                          }}
                          className={`flex-shrink-0 flex items-center gap-2.5 p-2 rounded-2xl border transition-all text-left ${
                            isSel
                              ? 'bg-gradient-to-r from-[#4A0B10] to-[#2B0508] border-brand-gold shadow-gold-glow scale-105'
                              : 'bg-black/50 border-brand-gold/25 hover:border-brand-gold/50 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={jewel.typeSlug === 'earring'
                              ? `/assets/tryon/single_earring_${jewel.id}.png`
                              : `/assets/tryon/cutout_${jewel.id}.png`}
                            onError={(e) => { e.target.src = jewel.image; }}
                            alt={jewel.name}
                            style={{ filter: metalFilter }}
                            className="w-14 h-14 object-contain rounded-xl bg-black/60 p-1 shrink-0"
                          />
                          <div className="pr-2 max-w-[120px]">
                            <h4 className="font-cormorant text-sm font-bold text-white truncate leading-tight">{jewel.name}</h4>
                            <span className="text-[9px] text-brand-gold font-cinzel font-bold block pt-0.5">{jewel.weight}</span>
                            <span className="text-[9px] text-brand-cream/50 block">{jewel.code}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Snapshot Modal ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {snapshotUrl && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center"
            >
              <button
                onClick={() => setSnapshotUrl(null)}
                className="absolute top-5 right-5 text-brand-gold bg-black/80 p-3 rounded-full border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-maroon transition-all z-10"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', damping: 22 }}
                className="max-w-sm w-full space-y-5"
              >
                <div className="inline-flex items-center gap-2 text-brand-gold">
                  <Crown size={22} className="animate-bounce" />
                  <span className="font-cinzel text-sm font-bold uppercase tracking-widest text-brand-gold">
                    {t('ar.lookCaptured')}
                  </span>
                </div>

                <div className="rounded-3xl overflow-hidden border-2 border-brand-gold shadow-2xl bg-black mx-auto" style={{ maxHeight: '55vh' }}>
                  <img src={snapshotUrl} alt="Captured" className="w-full h-full object-cover" />
                </div>

                <div className="flex gap-3">
                  <a
                    href={snapshotUrl}
                    download="Sri-Hari-Krishna-AR-Look.png"
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-brand-gold text-brand-gold py-3.5 rounded-2xl font-cinzel font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <Download size={15} />
                    {t('ar.downloadPhoto')}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=${encodeURIComponent(
                      `${t('ar.waMsg3')} "${currentJewel.name}". ${t('ar.waMsg4')}`
                    )}`}
                    target="_blank" rel="noreferrer"
                    className="btn-shimmer flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-cinzel font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-2xl"
                  >
                    <MessageCircle size={15} />
                    {t('ar.shareWa')}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
