import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const JEWEL_SHOWCASE = [
  {
    image: '/assets/tryon/cutout_1.png',
    fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/Bbajh9KH6AfXRx9LiuYPtjiI3xH2H1L6NeeXFUpe.jpg',
    title: 'Antique Temple Necklace',
    weight: '43.78g',
    purity: '22K 916 BIS'
  },
  {
    image: '/assets/tryon/cutout_25.png',
    fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/ZyMnbtyNilXJevemEjA4xEghzDvVGrZxwodc1lBZ.jpg',
    title: 'Grand Bridal Haram',
    weight: '68.50g',
    purity: '22K 916 BIS'
  },
  {
    image: '/assets/tryon/cutout_74.png',
    fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/vbL0V2yRl7uM3ObAOcraN9pszUsVXqIZeIRWCzJI.jpg',
    title: 'Calcutta Filigree Bangles',
    weight: '32.10g',
    purity: '22K 916 BIS'
  },
  {
    image: '/assets/tryon/earring_61.png',
    fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/8pRS3R1oHYpju6Inb8BBfV3Lb7ln7xZBemCYN8dP.jpg',
    title: 'Royal Temple Jhumkas',
    weight: '18.40g',
    purity: '22K 916 BIS'
  }
];

export default function Hero3DCanvas({ activeSlide = 0 }) {
  const containerRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(activeSlide % JEWEL_SHOWCASE.length);
  }, [activeSlide]);

  const jewel = JEWEL_SHOWCASE[currentIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-auto select-none p-4"
    >
      {/* 3D Floating Showcase Stage */}
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        
        {/* Glowing Background Radial Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-[#9B111E]/20 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* 3D Rotating Golden Outer Ring */}
        <div 
          className="absolute inset-4 rounded-full border border-[#D4AF37]/30 border-dashed pointer-events-none"
          style={{
            animation: 'spin 25s linear infinite',
          }}
        />

        {/* 3D Pedestal Base Glow */}
        <div 
          className="absolute bottom-6 inset-x-12 h-10 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent blur-md pointer-events-none"
        />

        {/* Main Floating 3D Jewelry Card with Dynamic Specular Glint */}
        <div 
          className="relative z-10 w-4/5 h-4/5 bg-gradient-to-b from-[#1E1708]/80 to-[#0F0B04]/95 border border-[#D4AF37]/60 rounded-3xl p-6 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between group hover:border-[#D4AF37] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(212,175,55,0.25)]"
          style={{
            transform: 'perspective(1000px) rotateX(4deg) rotateY(-4deg)',
            willChange: 'transform',
          }}
        >
          {/* Top Hologram Badge */}
          <div className="w-full flex items-center justify-between text-[10px] font-cinzel font-bold text-[#E5C07B]">
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-[#D4AF37]/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE 3D SHOWCASE
            </span>
            <span className="font-mono text-gray-400">{jewel.purity}</span>
          </div>

          {/* Actual Showroom Jewel High-Res Image with 3D Depth & Hover Parallax */}
          <div className="relative flex-1 w-full flex items-center justify-center p-2">
            <img
              key={jewel.image}
              src={jewel.image}
              alt={jewel.title}
              onError={(e) => {
                e.target.src = jewel.fallback;
              }}
              className="max-h-56 max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-700 ease-out animate-bounce-subtle"
            />
          </div>

          {/* Bottom Title & Specs */}
          <div className="w-full text-center pt-2 border-t border-[#D4AF37]/20">
            <h4 className="text-sm font-bold text-white font-cinzel group-hover:text-[#E5C07B] transition-colors truncate">
              {jewel.title}
            </h4>
            <div className="flex items-center justify-center gap-3 text-[11px] text-[#D4AF37] mt-0.5">
              <span>Weight: <strong className="text-white font-mono">{jewel.weight}</strong></span>
              <span>&bull;</span>
              <span>Madurai Karigari</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
