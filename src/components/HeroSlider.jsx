import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Award, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Floating3DParticles from './Floating3DParticles';

export default function HeroSlider() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: '/assets/images/hero_gold_necklace.jpg',
      fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/slider/9tPR61FmWQksJcWVnXXMsAubTWRnHDUAHpbVWUi6.jpg',
      tag: t('slider.slide1.tag', 'Heritage Masterpiece'),
      title: t('slider.slide1.title', 'Divine Temple Collections'),
      subtitle: t('slider.slide1.subtitle', 'Intricately handcrafted 916 antique gold jewelry from Madurai master karigars.'),
      buttonText: t('slider.slide1.btn', 'Explore Necklaces'),
      link: '/collections/necklace'
    },
    {
      image: '/assets/images/hero_bridal_set.jpg',
      fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/slider/qOy3DdZk5scWcghS4sIBqw9RwDHBp3i9hownPqDB.jpg',
      tag: t('slider.slide3.tag', 'Royal Wedding Collection'),
      title: t('slider.slide3.title', 'Exquisite Bridal Harams'),
      subtitle: t('slider.slide3.subtitle', 'Make your wedding day timeless with authentic South Indian gold artistry.'),
      buttonText: t('slider.slide3.btn', 'View Bridal Sets'),
      link: '/collections/necklace'
    },
    {
      image: '/assets/images/hero_gold_bangles.jpg',
      fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/slider/caSljc0C7RAZ58psRAgHCMs4YYNiBNANCdIun2pZ.jpg',
      tag: t('slider.slide2.tag', 'Calcutta & Antique Craft'),
      title: t('slider.slide2.title', 'Filigree & Gadi Bangles'),
      subtitle: t('slider.slide2.subtitle', 'Delicate mesh detailing, festive bangles & cocktail statement rings.'),
      buttonText: t('slider.slide2.btn', 'Explore Bangles'),
      link: '/collections/bangles'
    },
    {
      image: '/assets/images/hero_digi_gold.jpg',
      fallback: 'https://sriharikrishnanagaimaligai.com/storage/app/public/slider/F45KzDxyBm0dtQk5LQRcmm2JfBqP305lUmKVAEM3.jpg',
      tag: t('slider.slide4.tag', 'Digi Gold Savings Scheme'),
      title: t('slider.slide4.title', 'Start Saving In 916 Gold'),
      subtitle: t('slider.slide4.subtitle', 'Save systematically for 11 months & get 12th month bonus benefit.'),
      buttonText: t('slider.slide4.btn', 'Calculate Savings'),
      link: '/savings'
    }
  ];

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: t('slider.trust1_title', '100% BIS 916 Hallmarked'),
      desc: t('slider.trust1_desc', 'Govt. Certified Purity Guarantee')
    },
    {
      icon: TrendingUp,
      title: t('slider.trust2_title', 'Live Transparent Rates'),
      desc: t('slider.trust2_desc', 'Real-time Daily Madurai Bullion')
    },
    {
      icon: Award,
      title: t('slider.trust3_title', '25+ Years Madurai Trust'),
      desc: t('slider.trust3_desc', 'Valaiyal Kadai Street Heritage')
    },
    {
      icon: RotateCcw,
      title: t('slider.trust4_title', 'Lifetime Exchange Policy'),
      desc: t('slider.trust4_desc', '100% Value Protection')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full relative">
      {/* 1. Hero Main Slider */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[88vh] overflow-hidden bg-brand-maroon">
        
        {/* 3D Ambient Gold Floating Particles */}
        <Floating3DParticles />

        {/* Top Slim Golden Progress Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-black/40 z-30 overflow-hidden">
          <motion.div
            key={current}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6.5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight shadow-gold-glow"
          />
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Slide Image with Smooth Scale Zoom */}
            <motion.img
              src={slides[current].image}
              alt={slides[current].title}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center filter brightness-[0.85]"
              onError={(e) => {
                e.target.src = slides[current].fallback;
              }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0305]/95 via-[#250508]/75 to-transparent z-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F0305] via-transparent to-transparent z-10"></div>

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
                  
                  {/* Category Pill Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center space-x-2 bg-black/60 border border-brand-gold/60 px-4 py-1.5 rounded-full backdrop-blur-md shadow-gold-glow"
                  >
                    <Sparkles size={14} className="text-brand-gold animate-spin-slow" />
                    <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                      {slides[current].tag}
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] drop-shadow-2xl"
                  >
                    {slides[current].title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-brand-cream/90 font-medium text-sm sm:text-base md:text-lg max-w-xl font-sans leading-relaxed"
                  >
                    {slides[current].subtitle}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <Link
                      to={slides[current].link}
                      className="btn-shimmer inline-flex items-center space-x-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-7 py-3.5 rounded-full font-cinzel font-extrabold text-xs uppercase tracking-wider shadow-gold-glow-lg hover:scale-105 transition-transform"
                    >
                      <span>{slides[current].buttonText}</span>
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      to="/about"
                      className="inline-flex items-center space-x-2 bg-black/40 hover:bg-black/60 border border-brand-gold/50 text-brand-cream px-6 py-3.5 rounded-full font-cinzel font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:border-brand-gold transition-all"
                    >
                      <span>{t('footer.about', 'Visit Showroom')}</span>
                    </Link>
                  </motion.div>

                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-brand-maroon text-brand-gold border border-brand-gold/40 backdrop-blur-md transition-all hover:scale-110 hidden sm:flex items-center justify-center"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-brand-maroon text-brand-gold border border-brand-gold/40 backdrop-blur-md transition-all hover:scale-110 hidden sm:flex items-center justify-center"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center items-center space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === idx
                  ? 'w-8 bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold shadow-gold-glow'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* 2. 100% Full-Width Royal Trust Pillars Bar */}
      <section className="bg-gradient-to-r from-[#200305] via-[#35070B] to-[#200305] text-brand-cream py-6 border-b border-brand-gold/30 shadow-xl w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {trustPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center space-x-3.5 group text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-goldDark to-brand-gold text-brand-maroon flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-xs sm:text-sm text-brand-gold uppercase tracking-wider">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-brand-cream/80 font-sans font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
