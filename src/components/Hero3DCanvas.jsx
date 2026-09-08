import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas({ activeSlide = 0 }) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 2. High-Performance WebGL Renderer
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

    // 3. Studio Lighting for 22K Gold Specular Reflections
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffae6, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 4.0, 15);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // 4. Gold PBR Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5c342,
      metalness: 0.95,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    const rubyMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b111e,
      metalness: 0.2,
      roughness: 0.15,
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 2.4,
    });

    // 5. Build 3 Distinct 3D Luxury Ornaments (Switched with Slides)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- Model 1: 3D Royal Temple Gold Coin & Pendant ---
    const coinGroup = new THREE.Group();
    const coinGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.22, 64);
    const coinMesh = new THREE.Mesh(coinGeo, goldMaterial);
    coinMesh.rotation.x = Math.PI / 2;
    coinGroup.add(coinMesh);

    // Coin Inner Beaded Rim
    const rimTorus = new THREE.TorusGeometry(1.7, 0.08, 16, 64);
    const rimMesh = new THREE.Mesh(rimTorus, goldMaterial);
    coinGroup.add(rimMesh);

    // Central Sacred Temple Motif (Octagon Diamond Relief)
    const jewelCoreGeo = new THREE.OctahedronGeometry(0.8, 2);
    const jewelCore = new THREE.Mesh(jewelCoreGeo, rubyMaterial);
    jewelCore.scale.set(1, 1, 0.45);
    jewelCore.position.z = 0.12;
    coinGroup.add(jewelCore);

    // 8 Surrounding Diamond Accents
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2, 1),
        diamondMaterial
      );
      gem.position.set(Math.cos(angle) * 1.3, Math.sin(angle) * 1.3, 0.12);
      coinGroup.add(gem);
    }
    masterGroup.add(coinGroup);

    // --- Model 2: 3D Royal Solitaire Diamond Ring ---
    const ringGroup = new THREE.Group();
    const ringBandGeo = new THREE.TorusGeometry(1.6, 0.22, 32, 64);
    const ringBand = new THREE.Mesh(ringBandGeo, goldMaterial);
    ringBand.rotation.x = Math.PI / 3;
    ringGroup.add(ringBand);

    // Crown Prongs & Solitaire Diamond
    const solitaireGeo = new THREE.OctahedronGeometry(0.75, 2);
    const solitaireMesh = new THREE.Mesh(solitaireGeo, diamondMaterial);
    solitaireMesh.position.set(0, 1.75, 0.2);
    ringGroup.add(solitaireMesh);

    const prongGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 16);
    for (let i = 0; i < 4; i++) {
      const prong = new THREE.Mesh(prongGeo, goldMaterial);
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      prong.position.set(Math.cos(angle) * 0.45, 1.6, Math.sin(angle) * 0.45 + 0.2);
      ringGroup.add(prong);
    }
    ringGroup.visible = false;
    masterGroup.add(ringGroup);

    // --- Model 3: 3D Calcutta Filigree Bangle ---
    const bangleGroup = new THREE.Group();
    const bangleGeo = new THREE.TorusGeometry(2.0, 0.35, 32, 64);
    const bangleMesh = new THREE.Mesh(bangleGeo, goldMaterial);
    bangleMesh.rotation.x = Math.PI / 2.5;
    bangleGroup.add(bangleMesh);

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), rubyMaterial);
      bead.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0);
      bangleGroup.add(bead);
    }
    bangleGroup.visible = false;
    masterGroup.add(bangleGroup);

    const models = [coinGroup, ringGroup, bangleGroup, coinGroup];

    // 6. Mouse Parallax & Smooth Interpolation
    let targetRotX = 0;
    let targetRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.8;
      targetRotX = -y * 0.6;
      targetPosX = x * 0.4;
      targetPosY = y * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 7. IntersectionObserver for Zero Lag Performance
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 8. Animation Render Loop (60 FPS)
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause when scrolled out of view

      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle luxury floating
      masterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15 + targetPosY * 0.5;
      masterGroup.position.x += (targetPosX - masterGroup.position.x) * 0.05;

      // Smooth rotation with mouse parallax
      masterGroup.rotation.y += (targetRotY + elapsedTime * 0.3 - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;

      // Dynamic light movement
      keyLight.position.x = Math.sin(elapsedTime * 0.8) * 6;
      keyLight.position.z = Math.cos(elapsedTime * 0.8) * 6;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // 9. Resize handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
      style={{ willChange: 'transform' }}
    />
  );
}
