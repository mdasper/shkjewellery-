import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { ShieldCheck, Award, Heart, Sparkles, MapPin, Crown, ArrowRight, MessageSquare, Scale } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full font-sans text-left">
        
        {/* 100% Full-Width Royal Header Banner */}
        <section className="py-20 bg-brand-maroon text-white relative overflow-hidden w-full border-b border-brand-gold/30">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-gold-glow">
              <Crown size={14} className="text-brand-gold" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                {t('about.badge', 'Generations of Madurai Heritage & Craftsmanship')}
              </span>
            </div>
            
            <h1 className="font-cormorant text-4xl sm:text-6xl font-extrabold text-white drop-shadow-2xl">
              {t('about.title', 'About Sri Hari Krishna Nagai Maligai')}
            </h1>
            <p className="text-brand-cream font-medium text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
              {t('about.subtitle', "Discover the history, values, and master goldsmith craftsmanship behind Madurai's most trusted 916 jewellery showroom.")}
            </p>
          </div>
        </section>

        {/* 100% Full-Width Split Heritage Showcase Section */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-6 bg-white p-8 sm:p-10 rounded-3xl border-2 border-brand-gold/30 hover-gold-ring shadow-2xl">
              <div className="space-y-2 border-b border-brand-gold/20 pb-4">
                <span className="text-xs font-cinzel font-extrabold text-brand-goldDark uppercase tracking-widest block">
                  {t('about.street', 'Valaiyal Kadai • South Avani Moola Street')}
                </span>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-brand-maroon leading-tight">
                  {t('about.traditionTitle', 'Where Tradition Meets Timeless Elegance')}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                <p>
                  {t('about.storyP1', "Established in the heart of Madurai's traditional jewellery marketplace, Sri Hari Krishna Nagai Maligai has served generations of families with absolute purity, transparent rates, and custom temple designs.")}
                </p>
                <p>
                  {t('about.storyP2', "Whether you are seeking heavy bridal harams for grand weddings, lightweight daily gold chains, traditional Lakshmi coin sets, or pure 92.5 silver puja articles, our experienced karigars ensure every ornament is finished to perfection.")}
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-brand-gold/20">
                <div className="w-10 h-10 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center shrink-0 shadow">
                  <MapPin size={20} />
                </div>
                <span className="text-xs font-bold text-brand-maroon font-sans leading-snug">
                  {t('about.addressText', 'South Avani Moola Street, Valaiyal Kadai, Madurai Main, Tamil Nadu - 625001')}
                </span>
              </div>
            </div>

            {/* Right Image Showcase Column */}
            <div className="lg:col-span-6">
              <div className="relative p-3 rounded-3xl border-2 border-brand-gold/40 bg-brand-maroon shadow-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80" 
                  alt="Gold Jewellery Crafting"
                  className="w-full h-[400px] object-cover rounded-2xl filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-black/80 backdrop-blur-md text-brand-gold text-xs font-cinzel font-bold px-3 py-1.5 rounded-lg border border-brand-gold/40 shadow">
                    {t('about.bisBadge', '100% BIS 916 HALLMARKED')}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white space-y-1">
                  <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase tracking-widest block">
                    {t('about.karigariTag', 'Madurai Karigari Legacy')}
                  </span>
                  <h4 className="font-cormorant text-lg font-bold text-white">
                    {t('about.karigariTitle', 'Master Goldsmiths Crafting Heritage Jewels')}
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 100% Full-Width 4-Pillar Luxury Grid */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-cinzel font-extrabold text-brand-goldDark uppercase tracking-widest block">
              {t('about.commitmentsTag', 'Our Core Showroom Commitments')}
            </span>
            <h3 className="font-cormorant text-3xl sm:text-4xl font-extrabold text-brand-maroon">
              {t('about.commitmentsTitle', 'Why Madurai Families Choose Us')}
            </h3>
            <p className="text-xs sm:text-sm text-[#1A0A0C] font-semibold max-w-xl mx-auto font-sans">
              {t('about.commitmentsDesc', 'Built upon strict ethical foundations and certified gold purity that has spanned generations.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-brand-maroon">
                {t('about.p1Title', '100% BIS 916 Hallmarked')}
              </h4>
              <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                {t('about.p1Desc', 'Every gold jewel carries authentic government hallmarking laser stamps with full HUID verification.')}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                <Scale size={24} />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-brand-maroon">
                {t('about.p2Title', 'Zero Making Charge Wastage Mystery')}
              </h4>
              <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                {t('about.p2Desc', 'Completely transparent billing system. Clear breakdown of gold rate, making charges, and taxes with no hidden costs.')}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                <Award size={24} />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-brand-maroon">
                {t('about.p3Title', 'Authentic Madurai Karigari')}
              </h4>
              <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                {t('about.p3Desc', 'Handcrafted temple jewellery, antique collections, and custom bridal ornaments sculpted by hereditary artisans.')}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                <Heart size={24} />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-brand-maroon">
                {t('about.p4Title', 'Guaranteed Lifetime Exchange')}
              </h4>
              <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                {t('about.p4Desc', '100% full gold value exchange policy on all 916 jewellery purchased from our showroom.')}
              </p>
            </div>

          </div>
        </div>

        {/* 100% Full-Width Showroom Experience CTA */}
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-8">
          <div className="bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon p-8 sm:p-12 rounded-3xl border-2 border-brand-gold/40 shadow-2xl text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest block">
                  {t('about.showroomTag', 'Visit Us In Person')}
                </span>
                <h3 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  {t('about.showroomTitle', 'Experience True Madurai Hospitality')}
                </h3>
                <p className="text-brand-cream font-medium text-xs sm:text-sm font-sans leading-relaxed max-w-2xl">
                  {t('about.showroomDesc', 'Step into our air-conditioned showroom located right at Valaiyal Kadai, South Avani Moola Street. Our staff will guide you through bridal collections, daily wear, and flexible savings schemes.')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-black/30 p-3 rounded-xl border border-brand-gold/30">
                    <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase block">{t('about.hoursTitle', 'Showroom Timings')}</span>
                    <span className="text-xs text-white font-sans">{t('about.hoursDesc', 'Monday to Sunday: 10:00 AM – 8:30 PM (All 7 Days Open)')}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl border border-brand-gold/30">
                    <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase block">{t('about.phoneTitle', 'Direct Customer Support')}</span>
                    <span className="text-xs text-white font-sans">{t('about.phoneDesc', '+91 98650 45924 / 0452 439 5924')}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl border border-brand-gold/30">
                    <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase block">{t('about.whatsappTitle', 'WhatsApp Video Shopping')}</span>
                    <span className="text-xs text-white font-sans">{t('about.whatsappDesc', 'Live video call shopping available for distant and NRI families.')}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col space-y-4">
                <Link
                  to="/collections"
                  className="btn-shimmer w-full py-4 rounded-xl bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold text-xs uppercase tracking-wider text-center shadow-gold-glow hover:scale-105 transition-transform"
                >
                  {t('about.exploreCollectionsBtn', 'Explore Showroom Catalog')}
                </Link>
                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl border-2 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 font-cinzel font-bold text-xs uppercase tracking-wider text-center transition-colors"
                >
                  {t('about.contactBtn', 'Get In Touch With Us')}
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
