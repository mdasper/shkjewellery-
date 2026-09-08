import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, Download, RefreshCw, ZoomIn, ZoomOut, Check, 
  Move, MessageCircle, Eye, Crown 
} from 'lucide-react';

function getJewelSrc(product) {
  if (product.typeSlug === 'earring') return `/assets/tryon/earring_${product.id}.png`;
  return `/assets/tryon/cutout_${product.id}.png`;
}

export default function TryWithOverlay({ product, onClose }) {
  const [phase, setPhase] = useState('camera'); // 'camera' | 'studio'
  const [cameraError, setCameraError] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const jewelRef = useRef(null);
  
  const jewelSrc = getJewelSrc(product);

  // ── 1. Boot Webcam on Mount ──
  useEffect(() => {
    let cancelled = false;
    async function initCam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        if (!cancelled) setCameraError('Camera access denied. Please allow camera permissions.');
      }
    }
    if (phase === 'camera') {
      initCam();
    }
    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [phase]);

  // ── 2. Capture Photo ──
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    
    // Draw mirrored video to canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    setPhotoData(canvas.toDataURL('image/jpeg', 0.9));
    setPhase('studio');
    setScale(0.8); // Default scale
  };

  const retakePhoto = () => {
    setPhotoData(null);
    setPhase('camera');
  };

  // ── 3. Final Composite Download ──
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    // Using a standard portrait frame for the download
    canvas.width = 1080; 
    canvas.height = 1350; 
    const ctx = canvas.getContext('2d');

    const finish = () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png', 1.0);
      a.download = `MyLook-${product.code}.png`;
      a.click();
    };

    const bgImg = new Image();
    bgImg.src = photoData;
    bgImg.onload = () => {
      // Crop center of webcam photo to fit portrait aspect ratio
      const sSize = Math.min(bgImg.width, (bgImg.height * 1080) / 1350);
      const sX = (bgImg.width - sSize) / 2;
      const sY = (bgImg.height - (sSize * 1350) / 1080) / 2;
      
      ctx.drawImage(bgImg, sX, sY, sSize, (sSize * 1350) / 1080, 0, 0, 1080, 1350);

      const jImg = new Image();
      jImg.src = jewelSrc;
      jImg.onload = () => {
        // We get the dragged position from Framer Motion's style transform
        const transformStr = jewelRef.current.style.transform;
        // Parse translate(Xpx, Ypx)
        const match = transformStr.match(/translate[XY3d]?\(([^,]+)(?:,\s*([^)]+))?/);
        let tx = 0, ty = 0;
        if (match) {
          tx = parseFloat(match[1]) || 0;
          ty = parseFloat(match[2]) || 0;
        }

        // The stage size in DOM
        const stageDom = document.getElementById('studio-stage');
        if (stageDom) {
          const domW = stageDom.clientWidth;
          const domH = stageDom.clientHeight;
          
          // Jewel base width is 60% of DOM width
          const domJW = domW * 0.6 * scale;
          const domJH = (jImg.height / jImg.width) * domJW;
          
          // Base position was center
          const domJX = (domW - domJW) / 2 + tx;
          const domJY = (domH - domJH) / 2 + ty; // we centered it with flex in DOM

          // Scale to canvas 1080x1350
          const scaleFactorW = 1080 / domW;
          const scaleFactorH = 1350 / domH;
          // Use an average or "cover" scale factor since DOM is object-cover
          const coverRatio = Math.max(1080/domW, 1350/domH);

          // Calculate final pixel positions for canvas
          const cJW = domJW * coverRatio;
          const cJH = domJH * coverRatio;
          const cJX = (1080 - cJW)/2 + (tx * coverRatio);
          const cJY = (1350 - cJH)/2 + (ty * coverRatio);

          // Draw drop shadow
          ctx.shadowColor = 'rgba(0,0,0,0.6)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 15;
          ctx.drawImage(jImg, cJX, cJY, cJW, cJH);
          ctx.shadowBlur = 0;

          // Branding bar
          ctx.fillStyle = 'rgba(28,5,7,0.9)';
          ctx.fillRect(0, 1270, 1080, 80);
          ctx.font = 'bold 22px serif'; 
          ctx.fillStyle = '#E5C07B'; 
          ctx.textAlign = 'center';
          ctx.fillText(`SRI HARI KRISHNA NAGAI MALIGAI • ${product.name.toUpperCase()} • BIS 916`, 540, 1318);
          
          finish();
        }
      };
    };
  };

  const waText = encodeURIComponent(`Vanakkam! I just tried "${product.name}" (SKU: ${product.code}) using the Photo Studio. Please share price!`);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2B0407] to-[#1a0204] border-b border-brand-gold/40 px-6 py-3 flex items-center justify-between shadow-2xl z-50">
          <div className="flex items-center space-x-3">
            <Crown className="text-brand-gold" size={20} />
            <div>
              <h2 className="font-cinzel text-lg font-black text-brand-gold">✨ Photo Try-On Studio</h2>
              <p className="text-xs text-brand-cream/70 font-sans">{product.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full hover:bg-brand-gold hover:text-brand-maroon text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-[#0a0001]">
          
          {/* Main Stage (Camera/Photo) */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[50vh] lg:min-h-0">
            
            {phase === 'camera' && (
              <>
                {cameraError ? (
                  <div className="text-rose-400 font-cinzel text-center px-4">{cameraError}</div>
                ) : (
                  <>
                    <video ref={videoRef} playsInline muted style={{ transform: 'scaleX(-1)' }} className="absolute inset-0 w-full h-full object-cover" />
                    
                    {/* Ghost outline guide */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-[10vh]">
                      <div className="w-40 h-56 lg:w-48 lg:h-64 border-2 border-dashed border-brand-gold/60 rounded-[40%] animate-pulse" />
                      <p className="mt-4 text-brand-gold font-cinzel font-bold text-xs lg:text-sm bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full">Align face here & look straight</p>
                    </div>

                    <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-20">
                      <button onClick={takePhoto} className="flex items-center space-x-2 bg-brand-gold text-brand-maroon px-6 lg:px-8 py-3 lg:py-4 rounded-full font-cinzel font-black text-base lg:text-lg shadow-[0_0_40px_rgba(229,192,123,0.5)] hover:scale-105 transition-all whitespace-nowrap">
                        <Camera size={20} className="lg:w-6 lg:h-6" />
                        <span>Take Photo</span>
                      </button>
                    </div>
                  </>
                )}
                {/* Hidden canvas for taking photo */}
                <canvas ref={canvasRef} className="hidden" />
              </>
            )}

            {phase === 'studio' && (
              <div id="studio-stage" className="relative w-full h-full flex items-center justify-center overflow-hidden bg-zinc-900">
                <img src={photoData} alt="Captured" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                
                {/* Draggable Jewel */}
                <motion.div
                  ref={jewelRef}
                  drag
                  dragMomentum={false}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  className={`relative z-10 w-[60%] max-w-[300px] lg:max-w-[400px] cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-80' : 'opacity-100'}`}
                  style={{ scale }}
                >
                  {/* Subtle drag hint box */}
                  <div className="absolute inset-0 border-2 border-brand-gold/30 border-dashed opacity-0 hover:opacity-100 transition-opacity" />
                  
                  <img 
                    src={jewelSrc} 
                    alt="Jewel" 
                    className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] pointer-events-none select-none"
                    draggable="false"
                  />
                  
                  {/* Drag Icon Indicator */}
                  {!isDragging && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-brand-gold p-2 lg:p-3 rounded-full animate-pulse pointer-events-none">
                      <Move size={20} className="lg:w-6 lg:h-6" />
                    </div>
                  )}
                </motion.div>

                {/* Instructions Bar */}
                <div className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-brand-gold/30 pointer-events-none shadow-2xl flex justify-center">
                  <p className="text-brand-gold font-cinzel font-bold text-[10px] lg:text-sm tracking-wider flex items-center text-center">
                    <Check size={14} className="mr-1.5 lg:mr-2 text-emerald-400 shrink-0" /> Perfect! Drag jewel to fit.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Side / Bottom Panel */}
          <div className="w-full lg:w-[360px] shrink-0 bg-gradient-to-b from-[#1C0305] to-[#100102] border-t lg:border-t-0 lg:border-l border-brand-gold/30 flex flex-col p-4 lg:p-6 z-20 overflow-y-auto max-h-[45vh] lg:max-h-none">
            
            <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-8 shrink-0">
              <img src={jewelSrc} className="w-14 h-14 lg:w-20 lg:h-20 object-contain bg-black/50 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl border border-brand-gold/20" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-cormorant font-bold text-lg lg:text-xl leading-tight truncate">{product.name}</h3>
                <p className="text-brand-gold font-cinzel text-[9px] lg:text-[10px] uppercase mt-1 truncate">{product.weight} · {product.code}</p>
              </div>
            </div>

            {phase === 'studio' && (
              <div className="space-y-4 lg:space-y-6 mb-4 lg:mb-8 shrink-0">
                <div>
                  <label className="text-brand-cream/80 font-sans text-[11px] lg:text-xs flex justify-between mb-2 lg:mb-3">
                    <span className="font-bold flex items-center"><ZoomIn size={14} className="mr-1"/> Adjust Size</span>
                    <span>{Math.round(scale * 100)}%</span>
                  </label>
                  <input 
                    type="range" min="0.4" max="2.0" step="0.05" 
                    value={scale} onChange={e => setScale(parseFloat(e.target.value))}
                    className="w-full accent-brand-gold"
                  />
                </div>
                
                <div className="bg-black/40 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-brand-gold/20 hidden sm:block">
                  <p className="text-brand-gold text-[10px] lg:text-xs font-cinzel font-bold mb-1.5 lg:mb-2">Controls:</p>
                  <ul className="text-brand-cream/70 text-[10px] lg:text-xs space-y-1 lg:space-y-2 font-sans">
                    <li>👆 Drag the jewelry on the photo to move it</li>
                    <li>↔️ Use the slider above to change size</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-auto space-y-2.5 lg:space-y-3 shrink-0">
              {phase === 'studio' && (
                <>
                  <button onClick={handleDownload} className="w-full py-3 lg:py-4 bg-brand-gold text-brand-maroon rounded-xl lg:rounded-2xl font-cinzel font-bold text-[11px] lg:text-xs uppercase flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(229,192,123,0.3)] hover:scale-[1.02] transition-all">
                    <Download size={16} /> <span>Download My Look</span>
                  </button>
                  <button onClick={retakePhoto} className="w-full py-2.5 lg:py-3 border border-brand-gold/40 text-brand-gold rounded-xl lg:rounded-2xl font-cinzel font-bold text-[10px] lg:text-xs uppercase flex items-center justify-center space-x-2 hover:bg-brand-gold/10 transition-all">
                    <RefreshCw size={14} /> <span>Retake Photo</span>
                  </button>
                </>
              )}
              
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
                <a href={`https://api.whatsapp.com/send?phone=+919865045924&text=${waText}`} target="_blank" rel="noreferrer" className="w-full py-2.5 lg:py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl lg:rounded-2xl font-cinzel font-bold text-[9px] lg:text-xs uppercase flex items-center justify-center space-x-1.5 transition-all text-center">
                  <MessageCircle size={14} /> <span className="truncate">WhatsApp</span>
                </a>
                <a href={`/product/${product.id}`} className="w-full py-2.5 lg:py-3 bg-brand-maroon hover:bg-brand-maroonLight border border-brand-gold/40 text-brand-gold rounded-xl lg:rounded-2xl font-cinzel font-bold text-[9px] lg:text-xs uppercase flex items-center justify-center space-x-1.5 transition-all text-center">
                  <Eye size={14} /> <span className="truncate">Specs</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
