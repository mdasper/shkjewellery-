import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { Sparkles, ArrowRight, Calculator } from 'lucide-react';
import { officialSchemes } from '../data/schemesData';

export default function SavingsSchemes() {
  const { t } = useTranslation();
  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#1C0507] via-[#2A080B] to-[#1C0507] min-h-screen pb-24 text-white w-full">
        
        {/* 100% Full-Width Header Banner */}
        <section className="py-16 bg-[#3B070B] text-white relative overflow-hidden border-b border-brand-gold/30 w-full">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-gold-glow">
              <Sparkles size={14} className="text-brand-gold animate-spin-slow" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">{t('schemes.badge', 'Official Gold & Silver Savings Plans')}</span>
            </div>
            
            <h1 className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-wide">{t('schemes.title', 'Gold Savings Schemes')}</h1>

            <p className="text-brand-cream font-medium text-sm md:text-base max-w-xl mx-auto font-sans">
              {t('schemes.subtitle', 'Sri Hari Krishna Nagai Maligai • Madurai Valaiyal Kadai Street')}
            </p>
          </div>
        </section>

        {/* 100% Full-Width Poster Grid Container */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10 relative z-10">
          <div className="text-center space-y-2 mb-10">
            <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">{t('schemes.showroomSchemes', 'Showroom Schemes')}</span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white">{t('schemes.popularPlansTitle', 'Popular Madurai Savings Plans')}</h2>
            <p className="text-brand-cream/80 max-w-lg mx-auto text-sm pt-2">{t('schemes.popularPlansSubtitle', 'Click on any scheme below to view details and calculate your maturity benefits.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
            {officialSchemes.map((poster) => (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-maroon/90 rounded-2xl overflow-hidden border border-brand-gold/30 hover-gold-ring shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <Link to={`/scheme/${poster.slug}`} className="relative aspect-[4/5] overflow-hidden bg-black flex items-center justify-center block">
                  <img 
                    src={poster.image} 
                    alt={poster.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/images/hero_gold_necklace.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <span className="bg-brand-gold text-brand-maroon px-4 py-2 rounded-full font-cinzel font-bold text-sm shadow-xl flex items-center gap-2">
                       <Calculator size={16} />
                       {t('schemes.calculatePlan', 'Calculate Plan')}
                     </span>
                  </div>
                </Link>

                <div className="p-6 text-left space-y-2 bg-gradient-to-t from-[#200305] to-[#3B070B] border-t border-brand-gold/30">
                  <h3 className="font-cormorant text-2xl font-bold text-brand-goldLight">{poster.title}</h3>
                  <p className="text-xs text-brand-cream font-sans font-medium line-clamp-2">
                    {poster.subtitle}
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-[10px] bg-black/40 px-2 py-1 rounded text-brand-gold font-bold font-sans">
                      {poster.bonusMultiplier > 0 ? t('schemes.monthBonus', '{{count}} Month Bonus', { count: poster.bonusMultiplier }) : t('schemes.noMaking', 'No Making Charges')}
                    </span>
                    <Link
                      to={`/scheme/${poster.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-cinzel font-bold text-brand-gold hover:text-white transition-colors"
                    >
                      <span>{t('collections.viewDetails', 'View Details')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
