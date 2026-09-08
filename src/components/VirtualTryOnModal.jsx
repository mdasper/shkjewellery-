import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, CameraOff, Sparkles, RefreshCw, ZoomIn, ZoomOut, 
  RotateCw, Move, Download, MessageCircle, Upload, Crown, Check, 
  AlertCircle, Eye, EyeOff, Scan, Cpu
} from 'lucide-react';
import { allProducts } from '../data/productsData';

// Cache for transparent cutouts so we don't re-process repeatedly
const cutoutCache = new Map();

/**
 * Removes white/light studio background from necklace images on the fly,
 * creating a 100% transparent PNG with soft edge feathering.
 */
function createTransparentCutout(imageUrl) {
  if (cutoutCache.has(imageUrl)) {
    return Promise.resolve(cutoutCache.get(imageUrl));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check if pixel is near white/light grey studio background
          if (r > 215 && g > 215 && b > 215) {
            const brightness = (r + g + b) / 3;
            if (brightness > 235) {
              data[i + 3] = 0; // Pure transparent
            } else {
              // Smooth feathering boundary
              const alphaRatio = (235 - brightness) / 20;
              data[i + 3] = Math.max(0, Math.min(255, Math.round(alphaRatio * 255)));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const transparentUrl = canvas.toDataURL('image/png');
        cutoutCache.set(imageUrl, transparentUrl);
        resolve(transparentUrl);
      } catch (err) {
        console.warn('Background removal canvas error:', err);
        resolve(imageUrl);
      }
    };
    img.onerror = () => resolve(imageUrl);
    img.src = imageUrl;
  });
}

// Script loader helper for MediaPipe CDN
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.crossOrigin = 'anonymous';
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
};

export default function VirtualTryOnModal({ isOpen, onClose, initialProduct = null }) {
  const tryOnJewels = allProducts.filter(p => 
    p.typeSlug === 'necklace' || p.typeSlug === 'pendant' || p.typeSlug === 'chain'
  );

  const [activeJewel, setActiveJewel] = useState(initialProduct || tryOnJewels[0] || allProducts[0]);
  const [transparentJewelSrc, setTransparentJewelSrc] = useState(activeJewel.image);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [mode, setMode] = useState('camera'); // 'camera' | 'model' | 'upload'
  const [uploadedImage, setUploadedImage] = useState(null);

  // Computer Vision AI Tracking States
  const [aiTrackingActive, setAiTrackingActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [showAiMesh, setShowAiMesh] = useState(true);
  const [aiConfidence, setAiConfidence] = useState(98);

  // Dynamic Landmark Target coordinates (interpolated at 60 FPS)
  const [targetTransform, setTargetTransform] = useState({
    x: 0,
    y: 140,
    scale: 0.85,
    rotation: 0
  });

  // User manual fine-tuning offsets
  const [userOffsetY, setUserOffsetY] = useState(0);
  const [userOffsetX, setUserOffsetX] = useState(0);
  const [userScaleMult, setUserScaleMult] = useState(1.0);

  // Snapshot states
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // DOM Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const faceMeshRef = useRef(null);
  const animFrameRef = useRef(null);
  const hudCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Smoothing tracker ref (Exponential Moving Average)
  const smoothPoseRef = useRef({ x: 0, y: 140, scale: 0.85, rotation: 0, detected: false });

  // Update transparent cutout whenever active jewel changes
  useEffect(() => {
    if (activeJewel?.image) {
      createTransparentCutout(activeJewel.image).then(setTransparentJewelSrc);
    }
  }, [activeJewel]);

  // Sync initial product if passed
  useEffect(() => {
    if (initialProduct) {
      setActiveJewel(initialProduct);
    }
  }, [initialProduct]);

  // Initialize MediaPipe FaceMesh & Camera
  const initFaceMesh = async () => {
    try {
      // 1. Load Mediapipe CameraUtils & FaceMesh scripts dynamically from CDN
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');

      if (!window.FaceMesh) {
        throw new Error('FaceMesh not loaded on window');
      }

      const faceMesh = new window.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      faceMesh.onResults(onFaceMeshResults);
      faceMeshRef.current = faceMesh;
      setAiTrackingActive(true);
    } catch (err) {
      console.warn('MediaPipe FaceMesh initialization fallback:', err);
      setAiTrackingActive(false);
    }
  };

  // Process Real-Time Landmark Predictions
  const onFaceMeshResults = (results) => {
    const hudCanvas = hudCanvasRef.current;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (hudCanvas) {
      hudCanvas.width = width;
      hudCanvas.height = height;
      const ctx = hudCanvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);

      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        setFaceDetected(true);

        // Landmark 152 = Chin Bottom tip
        // Landmark 234 = Left Jaw/Cheek, Landmark 454 = Right Jaw/Cheek
        // Landmark 10 = Forehead top, Landmark 1 = Nose tip
        const chin = landmarks[152];
        const leftJaw = landmarks[234];
        const rightJaw = landmarks[454];
        const nose = landmarks[1];

        // Because video is mirrored (scaleX -1), mirror the horizontal coordinates:
        const chinX = (1 - chin.x) * width;
        const chinY = chin.y * height;

        const leftJawX = (1 - leftJaw.x) * width;
        const leftJawY = leftJaw.y * height;
        const rightJawX = (1 - rightJaw.x) * width;
        const rightJawY = rightJaw.y * height;

        // Calculate face width across jawline
        const jawDist = Math.hypot(rightJawX - leftJawX, rightJawY - leftJawY);

        // Head tilt angle in degrees
        const tiltRad = Math.atan2(rightJawY - leftJawY, rightJawX - leftJawX);
        const tiltDeg = (tiltRad * 180) / Math.PI;

        // Automatic Neck placement: sits naturally below the chin relative to face size
        const rawNeckX = chinX - width / 2;
        const rawNeckY = chinY + jawDist * 0.42 - height / 2;
        const rawScale = (jawDist / 195) * 0.95;
        const rawRot = -tiltDeg;

        // Exponential smoothing (alpha = 0.35) for silky fluid motion
        const smooth = smoothPoseRef.current;
        smooth.x = smooth.x * 0.65 + rawNeckX * 0.35;
        smooth.y = smooth.y * 0.65 + rawNeckY * 0.35;
        smooth.scale = smooth.scale * 0.75 + rawScale * 0.25;
        smooth.rotation = smooth.rotation * 0.65 + rawRot * 0.35;
        smooth.detected = true;

        setTargetTransform({
          x: smooth.x,
          y: smooth.y,
          scale: Math.max(0.4, Math.min(1.8, smooth.scale)),
          rotation: smooth.rotation
        });

        // Draw Computer Vision HUD (Futuristic Golden Face Mesh Points & Reticle)
        if (showAiMesh) {
          ctx.save();
          // Draw subtle jawline contour tracking lines
          ctx.strokeStyle = 'rgba(229, 192, 123, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);

          // Draw Face Oval contour keypoints
          const keyPoints = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];
          
          ctx.beginPath();
          keyPoints.forEach((idx, i) => {
            const pt = landmarks[idx];
            const px = (1 - pt.x) * width;
            const py = pt.y * height;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.closePath();
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Glowing AI Landmark Dots on chin, nose, and jaw
          const featurePoints = [152, 234, 454, 1, 10, 168];
          featurePoints.forEach((idx) => {
            const pt = landmarks[idx];
            const px = (1 - pt.x) * width;
            const py = pt.y * height;

            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#E5C07B';
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 8;
            ctx.fill();
          });

          // Draw Neck Anchor Target Box
          const anchorX = chinX;
          const anchorY = chinY + jawDist * 0.42;

          ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(anchorX - 35, anchorY - 15, 70, 30);

          ctx.font = 'bold 9px "Cinzel", serif';
          ctx.fillStyle = '#FFD700';
          ctx.textAlign = 'center';
          ctx.fillText('NECK ANCHOR', anchorX, anchorY + 4);

          ctx.restore();
        }
      } else {
        setFaceDetected(false);
      }
    }
  };

  // Start Camera and Feed Frames to FaceMesh
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          startAiProcessingLoop();
        };
      }

      setCameraActive(true);
      setMode('camera');
    } catch (err) {
      console.warn('Webcam permission error:', err);
      setCameraError('Camera permission denied or unavailable. Switched to Bridal Model mode.');
      setCameraActive(false);
      setMode('model');
    }
  };

  // Continuous frame processing loop for FaceMesh
  const startAiProcessingLoop = () => {
    const processFrame = async () => {
      if (videoRef.current && videoRef.current.readyState >= 2 && faceMeshRef.current) {
        try {
          await faceMeshRef.current.send({ image: videoRef.current });
        } catch (e) {
          // Frame skip gracefully
        }
      }
      animFrameRef.current = requestAnimationFrame(processFrame);
    };
    animFrameRef.current = requestAnimationFrame(processFrame);
  };

  // Stop camera and loop
  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Modal Lifecycle
  useEffect(() => {
    if (isOpen) {
      initFaceMesh().then(() => {
        startCamera();
      });
    } else {
      stopCamera();
      setSnapshotUrl(null);
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  // Handle Photo Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setMode('upload');
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset Adjustments
  const resetTransform = () => {
    setUserOffsetY(0);
    setUserOffsetX(0);
    setUserScaleMult(1.0);
  };

  // Dynamic Calculated Styles
  const currentX = (targetTransform.x + userOffsetX);
  const currentY = (targetTransform.y + userOffsetY);
  const currentScale = (targetTransform.scale * userScaleMult);
  const currentRot = targetTransform.rotation;

  // Capture Clean Snapshot onto 720x720 Canvas
  const captureLook = () => {
    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // 1. Draw Background (Mirrored Video or Portrait Image)
    if (mode === 'camera' && videoRef.current && videoRef.current.readyState >= 2) {
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      const v = videoRef.current;
      const vRatio = v.videoWidth / v.videoHeight;
      let sWidth = v.videoWidth;
      let sHeight = v.videoHeight;
      let sx = 0, sy = 0;
      if (vRatio > 1) {
        sWidth = v.videoHeight;
        sx = (v.videoWidth - sWidth) / 2;
      } else {
        sHeight = v.videoWidth;
        sy = (v.videoHeight - sHeight) / 2;
      }
      ctx.drawImage(v, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = mode === 'upload' ? uploadedImage : '/assets/images/hero_bridal_set.jpg';
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        renderJewelOnCanvas(ctx, canvas);
      };
      return;
    }

    renderJewelOnCanvas(ctx, canvas);
  };

  const renderJewelOnCanvas = (ctx, canvas) => {
    const jewelImg = new Image();
    jewelImg.crossOrigin = 'anonymous';
    jewelImg.src = transparentJewelSrc;
    jewelImg.onload = () => {
      ctx.save();
      const centerX = canvas.width / 2 + currentX * 1.3;
      const centerY = canvas.height / 2 + currentY * 1.3;

      ctx.translate(centerX, centerY);
      ctx.rotate((currentRot * Math.PI) / 180);

      // Render realistic shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 12;

      const jewelW = 380 * currentScale;
      const jewelH = (jewelImg.height / jewelImg.width) * jewelW;

      ctx.drawImage(jewelImg, -jewelW / 2, -jewelH / 2, jewelW, jewelH);
      ctx.restore();

      // Brand Watermark Banner
      ctx.fillStyle = 'rgba(28, 5, 7, 0.85)';
      ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
      ctx.font = 'bold 15px "Cinzel", serif';
      ctx.fillStyle = '#E5C07B';
      ctx.textAlign = 'center';
      ctx.fillText(`SRI HARI KRISHNA NAGAI MALIGAI • ${activeJewel.name.toUpperCase()} (BIS 916)`, canvas.width / 2, canvas.height - 17);

      const dataUrl = canvas.toDataURL('image/png');
      setSnapshotUrl(dataUrl);
      setIsCapturing(false);
    };
    jewelImg.onerror = () => setIsCapturing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-gradient-to-b from-[#2E0509] via-[#1C0305] to-[#100102] text-white rounded-3xl max-w-5xl w-full overflow-hidden border-2 border-brand-gold/60 shadow-2xl relative flex flex-col max-h-[95vh]"
        >
          {/* Futuristic Gold Header Bar */}
          <div className="px-5 py-3.5 border-b border-brand-gold/30 flex items-center justify-between bg-black/50">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon rounded-xl shadow-gold-glow">
                <Cpu size={18} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-cinzel text-sm sm:text-base font-extrabold text-gold-gradient tracking-wide">
                    Live Computer Vision AR Jewellery Studio
                  </h3>
                  <span className="hidden sm:inline-flex items-center space-x-1 bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>AI TRACKING 60 FPS</span>
                  </span>
                </div>
                <p className="text-[10px] text-brand-cream/70 font-sans hidden sm:block">
                  Automatic face & neck landmark tracking • Zero background gold overlay
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              {/* HUD Mesh Toggle */}
              <button
                onClick={() => setShowAiMesh(!showAiMesh)}
                className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold border transition-all flex items-center space-x-1.5 ${
                  showAiMesh 
                    ? 'bg-brand-gold/20 border-brand-gold text-brand-gold shadow-gold-glow' 
                    : 'bg-black/40 border-brand-gold/30 text-brand-cream/70 hover:text-white'
                }`}
                title="Toggle AI Face Landmark Mesh"
              >
                <Scan size={14} />
                <span className="text-[10px] hidden md:inline">
                  {showAiMesh ? 'AI Mesh: ON' : 'AI Mesh: OFF'}
                </span>
              </button>

              {/* Source Mode Toggles */}
              <div className="hidden sm:flex bg-black/70 rounded-xl p-0.5 border border-brand-gold/30 text-xs">
                <button
                  onClick={startCamera}
                  className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[10px] transition-all ${
                    mode === 'camera' ? 'bg-brand-gold text-brand-maroon shadow' : 'text-brand-cream hover:text-white'
                  }`}
                >
                  Live Camera
                </button>
                <button
                  onClick={() => { setMode('model'); stopCamera(); }}
                  className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[10px] transition-all ${
                    mode === 'model' ? 'bg-brand-gold text-brand-maroon shadow' : 'text-brand-cream hover:text-white'
                  }`}
                >
                  Bridal Model
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1.5 rounded-lg font-cinzel font-bold text-[10px] transition-all ${
                    mode === 'upload' ? 'bg-brand-gold text-brand-maroon shadow' : 'text-brand-cream hover:text-white'
                  }`}
                >
                  Upload Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <button
                onClick={onClose}
                className="text-brand-gold hover:text-brand-maroon hover:bg-brand-gold bg-black/60 p-2 rounded-full border border-brand-gold/40 transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Stage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            
            {/* Viewport Stage (Col 8) */}
            <div 
              ref={containerRef}
              className="md:col-span-8 relative bg-black flex items-center justify-center overflow-hidden min-h-[380px] md:min-h-[500px]"
            >
              {/* Error Banner */}
              {cameraError && mode === 'camera' && (
                <div className="absolute top-3 left-3 right-3 z-30 bg-rose-950/90 border border-rose-500/60 p-3 rounded-xl text-xs flex items-center justify-between text-rose-100 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={16} />
                    <span>{cameraError}</span>
                  </div>
                  <button
                    onClick={() => { setMode('model'); stopCamera(); }}
                    className="underline text-brand-gold font-bold ml-2 shrink-0"
                  >
                    Try Bridal Avatar
                  </button>
                </div>
              )}

              {/* Background 1: Live Mirrored Webcam Video */}
              {mode === 'camera' && (
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  style={{ transform: 'scaleX(-1)' }}
                  className="w-full h-full object-cover select-none"
                />
              )}

              {/* Background 2: Uploaded Photo */}
              {mode === 'upload' && uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded Portrait"
                  className="w-full h-full object-contain select-none"
                />
              )}

              {/* Background 3: Sample Bridal Avatar */}
              {mode === 'model' && (
                <div className="w-full h-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
                    alt="South Indian Bridal Model"
                    className="w-full h-full object-cover select-none brightness-95"
                    onError={(e) => {
                      e.target.src = '/assets/images/hero_bridal_set.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-black/75 px-3 py-1.5 rounded-full text-[10px] text-brand-gold font-cinzel border border-brand-gold/40 shadow-lg">
                    Sample South Indian Bride Look
                  </div>
                </div>
              )}

              {/* Computer Vision HUD Canvas Overlay */}
              <canvas
                ref={hudCanvasRef}
                className="absolute inset-0 pointer-events-none z-10 w-full h-full"
              />

              {/* Real-time Tracking Status Indicator Top Right */}
              {mode === 'camera' && (
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-gold/40 text-[10px] font-mono text-brand-gold shadow-xl">
                  <span className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`}></span>
                  <span>{faceDetected ? 'FACE & NECK LOCKED' : 'SEARCHING FOR FACE...'}</span>
                </div>
              )}

              {/* Pure Transparent Gold Jewel Overlay (Zero White Box) */}
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center z-15"
              >
                <img
                  src={transparentJewelSrc}
                  alt={activeJewel.name}
                  style={{
                    transform: `translate(${currentX}px, ${currentY}px) scale(${currentScale}) rotate(${currentRot}deg)`,
                    mixBlendMode: 'multiply',
                    filter: 'contrast(1.15) brightness(1.03) drop-shadow(0 18px 25px rgba(0,0,0,0.75))',
                    maxWidth: '430px',
                    width: '80%',
                    transition: 'transform 0.04s cubic-bezier(0, 0, 0.2, 1)'
                  }}
                  className="select-none pointer-events-none"
                />
              </div>

              {/* Floating Stage Controls Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-gold/40 text-[11px] text-brand-gold flex items-center space-x-2.5 font-cinzel font-bold shadow-2xl">
                  <span className="text-white font-extrabold">{activeJewel.name}</span>
                  <span className="text-brand-gold">•</span>
                  <span className="text-brand-goldLight font-sans">{activeJewel.weight}</span>
                  <span className="text-brand-gold">•</span>
                  <span className="text-brand-cream/80 text-[10px]">BIS 916</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={resetTransform}
                    className="bg-black/80 hover:bg-brand-gold hover:text-brand-maroon text-brand-gold p-2.5 rounded-xl border border-brand-gold/40 shadow-xl transition-all"
                    title="Reset Custom Offset"
                  >
                    <RefreshCw size={15} />
                  </button>

                  <button
                    onClick={captureLook}
                    disabled={isCapturing}
                    className="btn-shimmer bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-5 py-2.5 rounded-xl font-cinzel font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 hover:scale-105 transition-transform"
                  >
                    <Camera size={16} />
                    <span>{isCapturing ? 'Capturing...' : 'Capture Look'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Computer Vision Fine-Tune Control Panel (Col 4) */}
            <div className="md:col-span-4 p-5 bg-black/50 border-t md:border-t-0 md:border-l border-brand-gold/25 flex flex-col justify-between space-y-4 text-xs font-sans">
              
              <div className="space-y-4">
                <div className="border-b border-brand-gold/20 pb-3 flex items-center justify-between">
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                    <Scan size={14} className="text-brand-gold" /> AI Fit Customization
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Auto-Tracking Active
                  </span>
                </div>

                {/* Neck Level Offset Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-brand-cream">
                    <span className="flex items-center gap-1 font-medium"><Move size={13} /> Neck Level (Up/Down):</span>
                    <span className="font-bold text-brand-gold">{userOffsetY > 0 ? `+${userOffsetY}px` : `${userOffsetY}px`}</span>
                  </div>
                  <input
                    type="range"
                    min="-120"
                    max="180"
                    step="2"
                    value={userOffsetY}
                    onChange={(e) => setUserOffsetY(parseInt(e.target.value))}
                    className="w-full h-2 bg-black/70 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>

                {/* Size Multiplier Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-brand-cream">
                    <span className="flex items-center gap-1 font-medium"><ZoomIn size={13} /> Jewel Scale:</span>
                    <span className="font-bold text-brand-gold">{Math.round(userScaleMult * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.5"
                    step="0.02"
                    value={userScaleMult}
                    onChange={(e) => setUserScaleMult(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black/70 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>

                {/* Horizontal Align Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-brand-cream">
                    <span className="flex items-center gap-1 font-medium"><Move size={13} /> Left / Right Align:</span>
                    <span className="font-bold text-brand-gold">{userOffsetX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    step="2"
                    value={userOffsetX}
                    onChange={(e) => setUserOffsetX(parseInt(e.target.value))}
                    className="w-full h-2 bg-black/70 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>

                {/* Computer Vision Diagnostic Pill */}
                <div className="p-3.5 bg-black/60 rounded-xl border border-brand-gold/25 space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between text-brand-gold">
                    <span>TRACKING MODE:</span>
                    <span className="text-emerald-400">{faceDetected ? 'LOCKED' : 'SCANNING'}</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/80">
                    <span>FACIAL LANDMARKS:</span>
                    <span>468 POINTS</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/80">
                    <span>HEAD TILT ANGLE:</span>
                    <span>{Math.round(currentRot)}°</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/80">
                    <span>BACKGROUND REMOVAL:</span>
                    <span className="text-emerald-400">TRANSPARENT PNG</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Order/Inquiry */}
              <div className="pt-3 border-t border-brand-gold/20 space-y-2">
                <a
                  href={`https://api.whatsapp.com/send?phone=+919865045924&text=${encodeURIComponent(`Vanakkam Sri Hari Krishna Nagai Maligai! I tried on "${activeJewel.name}" (SKU: ${activeJewel.code} • ${activeJewel.weight}) in your AI Computer Vision Try-On studio. Please let me know its current Madurai showroom price and booking details!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-cinzel font-bold py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-xl transition-all"
                >
                  <MessageCircle size={16} />
                  <span>Inquire Jewel on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom Jewel Switcher Tray */}
          <div className="p-3.5 bg-black/80 border-t border-brand-gold/30">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-cinzel text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                Select Ornament to Try On ({tryOnJewels.length} Available):
              </span>
              <span className="text-[10px] text-brand-cream/60 font-sans">
                Click any necklace to switch live
              </span>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-thin">
              {tryOnJewels.slice(0, 18).map((jewel) => (
                <button
                  key={jewel.id}
                  onClick={() => setActiveJewel(jewel)}
                  className={`flex-shrink-0 flex items-center space-x-2.5 p-1.5 rounded-xl border transition-all text-left ${
                    activeJewel.id === jewel.id
                      ? 'bg-brand-maroon border-brand-gold scale-105 shadow-gold-glow'
                      : 'bg-black/50 border-brand-gold/20 hover:border-brand-gold/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={jewel.image}
                    alt={jewel.name}
                    className="w-12 h-12 object-contain rounded-lg bg-black/60 p-0.5"
                  />
                  <div className="pr-2 max-w-[120px]">
                    <span className="font-cormorant text-xs font-bold text-white block truncate">
                      {jewel.name}
                    </span>
                    <span className="text-[9px] text-brand-gold font-cinzel block">
                      {jewel.weight}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Captured Snapshot Modal Overlay */}
          {snapshotUrl && (
            <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center text-center">
              <button
                onClick={() => setSnapshotUrl(null)}
                className="absolute top-4 right-4 text-brand-gold bg-black/70 p-2 rounded-full border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-maroon transition-all"
              >
                <X size={20} />
              </button>

              <div className="max-w-md w-full space-y-4">
                <div className="inline-flex items-center space-x-2 text-brand-gold">
                  <Crown size={20} />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-widest">
                    Your Virtual Look Captured!
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-brand-gold shadow-2xl bg-black aspect-square max-h-[50vh] mx-auto">
                  <img src={snapshotUrl} alt="Captured Look" className="w-full h-full object-cover" />
                </div>

                <div className="flex space-x-3">
                  <a
                    href={snapshotUrl}
                    download={`Sri-Hari-Krishna-${activeJewel.code}-look.png`}
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-brand-gold text-brand-gold py-3 rounded-xl font-cinzel font-bold text-xs uppercase flex items-center justify-center space-x-2 transition-all"
                  >
                    <Download size={16} />
                    <span>Download Photo</span>
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=${encodeURIComponent(`Vanakkam Sri Hari Krishna Nagai Maligai! I took this Virtual Try-On look with "${activeJewel.name}" (${activeJewel.weight}). Please let me know how to order or visit your showroom to see this design!`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shimmer flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-cinzel font-bold text-xs uppercase flex items-center justify-center space-x-2 transition-all shadow-xl"
                  >
                    <MessageCircle size={16} />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
