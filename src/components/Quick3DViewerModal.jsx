import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X, Sparkles, Camera, RotateCcw, ZoomIn, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const METAL_OPTIONS = [
  { id: '22k', label: '22K Gold (916)', color: '#F5C342', hex: 0xf5c342, metalness: 0.95, roughness: 0.22 },
  { id: 'antique', label: 'Antique Temple', color: '#B8860B', hex: 0xb8860b, metalness: 0.85, roughness: 0.38 },
  { id: 'rose', label: 'Rose Gold', color: '#E8A080', hex: 0xe8a080, metalness: 0.92, roughness: 0.25 },
  { id: 'white', label: 'White Gold / Diamond', color: '#E2E8F0', hex: 0xe2e8f0, metalness: 0.98, roughness: 0.18 },
];

export default function Quick3DViewerModal({ isOpen, onClose, product, onOpenAR }) {
  const canvasRef = useRef(null);
  const [selectedMetal, setSelectedMetal] = useState(METAL_OPTIONS[0]);
  const [autoSpin, setAutoSpin] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const materialRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !product) return;

    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting
    const ambient = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfffae6, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 4.0, 15);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // 4. PBR Material
    const pbrMaterial = new THREE.MeshStandardMaterial({
      color: selectedMetal.hex,
      metalness: selectedMetal.metalness,
      roughness: selectedMetal.roughness,
      wireframe: wireframe,
    });
    materialRef.current = pbrMaterial;

    const stoneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 2.4,
    });

    // 5. Build 3D Jewelry Geometry based on product category
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const cat = (product.category || product.title || '').toLowerCase();

    if (cat.includes('bangle')) {
      // 3D Bangle
      const bangle = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.3, 32, 64), pbrMaterial);
      bangle.rotation.x = Math.PI / 3;
      mainGroup.add(bangle);
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 1), stoneMaterial);
        gem.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.28);
        mainGroup.add(gem);
      }
    } else if (cat.includes('ring')) {
      // 3D Ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.22, 32, 64), pbrMaterial);
      ring.rotation.x = Math.PI / 3.5;
      mainGroup.add(ring);
      const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 2), stoneMaterial);
      diamond.position.set(0, 1.6, 0.2);
      mainGroup.add(diamond);
    } else {
      // 3D Grand Necklace / Pendant
      const neckCurve = new THREE.TorusGeometry(2.1, 0.18, 16, 64, Math.PI * 1.15);
      const neckMesh = new THREE.Mesh(neckCurve, pbrMaterial);
      neckMesh.rotation.z = Math.PI * 0.92;
      mainGroup.add(neckMesh);

      // Central Royal Pendant
      const pendantGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.18, 32);
      const pendant = new THREE.Mesh(pendantGeo, pbrMaterial);
      pendant.rotation.x = Math.PI / 2;
      pendant.position.set(0, -1.2, 0);
      mainGroup.add(pendant);

      // Central Stone
      const stone = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 2), stoneMaterial);
      stone.position.set(0, -1.2, 0.15);
      mainGroup.add(stone);
    }

    // 6. Interactive Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      setAutoSpin(false);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => (isDragging = false);
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      mainGroup.rotation.y += dx * 0.01;
      mainGroup.rotation.x += dy * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('mousemove', onMouseMove);

    // 7. Render Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoSpin) {
        mainGroup.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen, product, selectedMetal, autoSpin, wireframe]);

  const handleMetalChange = (option) => {
    setSelectedMetal(option);
    if (materialRef.current) {
      materialRef.current.color.setHex(option.hex);
      materialRef.current.metalness = option.metalness;
      materialRef.current.roughness = option.roughness;
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#120F06] border border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: 3D Interactive WebGL Canvas */}
          <div className="relative flex-1 h-80 md:h-[480px] bg-radial from-[#241B08] to-[#0D0B05] flex items-center justify-center">
            <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Floating 3D Controls */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 rounded-full text-xs font-bold text-[#E5C07B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                360° 3D Real-Time Model
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-xs text-gray-300 pointer-events-none">
              <span className="bg-black/70 px-3 py-1 rounded-lg border border-white/10">
                &circlearrowright; Drag to rotate in 360°
              </span>
              <div className="pointer-events-auto flex gap-1.5">
                <button
                  onClick={() => setAutoSpin((p) => !p)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                    autoSpin
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-black/60 text-white border-white/20'
                  }`}
                >
                  Auto Spin
                </button>
                <button
                  onClick={() => setWireframe((p) => !p)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                    wireframe
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-black/60 text-white border-white/20'
                  }`}
                >
                  Wireframe
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Details & PBR Metal Finishes */}
          <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#D4AF37]/20 bg-[#161208]">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {product.category || 'Gold Jewellery'}
                </span>
                <h2 className="text-lg font-bold text-white mt-1 leading-snug">
                  {product.title || product.name}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Code: <span className="font-mono text-gray-300">{product.code || 'SHK-001'}</span>
                </p>
              </div>

              {/* Price & Purity */}
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Purity</span>
                  <span className="text-xs font-bold text-[#E5C07B] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {product.purity || '22K 916 BIS Hallmarked'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Weight</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {product.estWeight || product.weight || '32.50g'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-xs text-gray-400">Est. Price</span>
                  <span className="text-base font-bold text-[#E5C07B] font-mono">
                    {product.price || '₹2,45,000'}
                  </span>
                </div>
              </div>

              {/* Metal Finish Customizer */}
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-2">
                  Select Metal Finish (Live 3D Shader):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {METAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleMetalChange(opt)}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedMetal.id === opt.id
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                        style={{ backgroundColor: opt.color }}
                      />
                      <span className="text-[11px] font-semibold leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenAR) onOpenAR(product);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                Live Camera AR Try-On
              </button>
              <Link
                to={product.path || `/collections/necklace`}
                onClick={onClose}
                className="w-full py-2.5 bg-black/60 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-xs rounded-xl border border-white/10 flex items-center justify-center transition-all"
              >
                View Full Product Specs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
