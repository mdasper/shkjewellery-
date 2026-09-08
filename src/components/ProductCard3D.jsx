import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, Camera, Heart, Crown, ShieldCheck } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard3D({ item, onOpen3DModal, onOpenAR }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50, opacity: 0 });
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlintPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const wished = isWishlisted(item.id || item.code || item.title);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
      className="group relative bg-gradient-to-b from-[#1C1608] to-[#120F06] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-colors duration-300 flex flex-col"
    >
      {/* Dynamic Specular Gold Glint Reflection Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glintPos.x}% ${glintPos.y}%, rgba(255, 230, 150, 0.35) 0%, rgba(212, 175, 55, 0.1) 35%, transparent 70%)`,
          opacity: glintPos.opacity,
        }}
      />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 rounded-full text-[10px] font-bold text-[#E5C07B] flex items-center gap-1">
          <Crown className="w-3 h-3 text-[#D4AF37]" />
          {item.purity || '22K 916'}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(item);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-all ${
            wished
              ? 'bg-[#9B111E] text-white border-[#9B111E]'
              : 'bg-black/60 text-gray-300 border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Showcase Container with 3D Depth Layer */}
      <div className="relative h-64 overflow-hidden bg-black/40 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <img
          src={item.image || item.cutout}
          alt={item.title || item.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Hover Floating Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-30 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onOpen3DModal && onOpen3DModal(item)}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            360° 3D View
          </button>
          <button
            onClick={() => onOpenAR && onOpenAR(item)}
            className="py-2 px-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/60 text-[#E5C07B] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-[#D4AF37]/20 active:scale-95 transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            AR Try-On
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#141006]/90 border-t border-[#D4AF37]/20">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#D4AF37]/80 mb-0.5">
            <span>{item.categoryLabel || item.category || 'Gold'}</span>
            <span className="font-mono text-gray-400">{item.estWeight || item.weight || '24.5g'}</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-[#E5C07B] transition-colors line-clamp-1">
            {item.title || item.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">
            {item.subtitle || 'Handcrafted 916 hallmark gold by Madurai master karigars.'}
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block">Est. Price</span>
            <span className="text-sm font-bold text-[#E5C07B] font-mono">
              {item.price || '₹1,84,500'}
            </span>
          </div>
          <Link
            to={item.path || `/collections/necklace`}
            className="text-xs text-white/80 hover:text-[#D4AF37] font-semibold flex items-center gap-1 transition-colors"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
