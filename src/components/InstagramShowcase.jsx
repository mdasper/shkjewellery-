import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Floating3DParticles from './Floating3DParticles';

export default function InstagramShowcase() {
  const { t } = useTranslation();

  const reelsData = [
    {
      id: 1,
      title: t('instagram.reel1', 'Yellow Saree Bridal Choker & Temple Haram Styling'),
      handle: '@sriharikrishnanagaimaligai',
      image: '/assets/images/reel_bride_yellow.png',
      fallback: '/assets/images/hero_gold_necklace.jpg',
      url: 'https://www.instagram.com/sriharikrishnanagaimaligai/'
    },
    {
      id: 2,
      title: t('instagram.reel2', 'Red Saree Antique Bangles & Haram Showcase'),
      handle: '@sriharikrishnanagaimaligai',
      image: '/assets/images/reel_bride_red.png',
      fallback: '/assets/images/hero_bridal_set.jpg',
      url: 'https://www.instagram.com/sriharikrishnanagaimaligai/'
    },
    {
      id: 3,
      title: t('instagram.reel3', 'Royal 916 Temple Jewellery Masterclass Reel'),
      handle: '@sriharikrishnanagaimaligai',
      image: '/assets/images/hero_gold_bangles.jpg',
      fallback: '/assets/images/hero_gold_bangles.jpg',
      url: 'https://www.instagram.com/sriharikrishnanagaimaligai/'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#3B070B] via-[#270406] to-[#3B070B] text-white relative overflow-hidden border-b border-brand-gold/30 w-full">
      
      {/* Ambient background particles */}
      <Floating3DParticles />

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header (Compact Luxury Viewport) */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-3 py-1 rounded-full backdrop-blur-md shadow-gold-glow">
            <svg className="w-3.5 h-3.5 fill-current text-brand-gold" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="text-gold-gradient font-cinzel font-bold text-[11px] uppercase tracking-widest">
              {t('instagram.badge', 'Trending On Instagram')}
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl">
            {t('instagram.title', 'Instagram Post & Reels')}
          </h2>

          <p className="text-brand-cream font-medium text-xs sm:text-sm font-sans leading-relaxed">
            {t('instagram.subtitle', 'Discover our most loved and trending jewelry pieces, crafted with elegance and tradition.')}
          </p>
        </div>

        {/* 3 Interactive Dynamic Video/Image Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reelsData.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-xl bg-black"
            >
              <div className="aspect-[9/16] max-h-[380px] w-full relative overflow-hidden">
                <img 
                  src={reel.image} 
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = reel.fallback;
                  }}
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Instagram Icon Badge Top Right */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-brand-gold border border-brand-gold/30">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>

                {/* Content Overlay Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 text-left">
                  <span className="text-[10px] text-brand-gold font-cinzel font-bold tracking-wider block">
                    {reel.handle}
                  </span>
                  <h4 className="font-cormorant text-base font-bold text-white leading-tight drop-shadow line-clamp-2">
                    {reel.title}
                  </h4>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-[11px] font-cinzel font-bold text-brand-gold hover:text-white transition-colors pt-1"
                  >
                    <span>{t('instagram.watchReel', 'Watch on Instagram')}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
