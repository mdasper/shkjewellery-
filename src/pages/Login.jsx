import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Crown, Lock, Phone, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';

export default function Login() {
  const { t } = useTranslation();
  const [mobileNum, setMobileNum] = useState('');
  const [passbookNum, setPassbookNum] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-[85vh] bg-gradient-to-b from-[#2B0508] via-[#1A0305] to-[#2B0508] text-white relative overflow-hidden flex items-center justify-center py-16 px-4 w-full">
        
        {/* 3D Ambient Gold Floating Particles */}
        <Floating3DParticles />

        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-b from-[#34070B] via-[#240407] to-[#150204] rounded-3xl border-2 border-brand-gold/60 shadow-2xl shadow-gold-glow-lg overflow-hidden text-left"
          >
            {/* Royal Showroom Header */}
            <div className="p-7 border-b border-brand-gold/30 text-center space-y-2 bg-gradient-to-r from-[#200305] via-[#35070B] to-[#200305] relative">
              <div className="flex items-center justify-center space-x-2 text-brand-gold">
                <Crown size={22} className="text-brand-gold animate-bounce" />
                <span className="font-cinzel text-xs font-bold text-gold-gradient tracking-widest uppercase">
                  Sri Hari Krishna Nagai Maligai
                </span>
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t('auth.loginTitle', 'Member Passbook Login')}
              </h2>
              <p className="text-xs text-brand-cream/80 font-sans">
                {t('about.street', 'Madurai Valaiyal Kadai')} • {t('about.bisBadge', '100% BIS 916 Sacred Savings')}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-7 sm:p-8 space-y-6">
              {submitted ? (
                <div className="p-6 bg-brand-gold/15 border border-brand-gold/40 rounded-2xl text-center space-y-3">
                  <Sparkles size={32} className="text-brand-gold mx-auto animate-spin-slow" />
                  <h3 className="font-cormorant text-2xl font-bold text-white">
                    {t('auth.loginTitle', 'Login Request Received')}
                  </h3>
                  <p className="text-xs text-brand-cream font-sans">
                    +91 {mobileNum}
                  </p>
                  <Link
                    to="/savings-schemes"
                    className="btn-shimmer inline-block bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider shadow mt-2"
                  >
                    {t('schemes.exploreBtn', 'View Scheme Passbook')} →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  
                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                      {t('auth.phoneLabel', 'Registered Mobile Number')} *
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-brand-gold/40 bg-black/70 text-brand-gold font-bold text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={mobileNum}
                        onChange={(e) => setMobileNum(e.target.value)}
                        placeholder={t('auth.phonePlaceholder', '10-digit mobile number')}
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-r-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                      />
                      <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    </div>
                  </div>

                  {/* Chit Passbook ID */}
                  <div className="space-y-1.5">
                    <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                      {t('auth.passLabel', 'Chit Passbook / Customer ID (Optional)')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={passbookNum}
                        onChange={(e) => setPassbookNum(e.target.value)}
                        placeholder="e.g. SHK-CHIT-1092"
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                      />
                      <BookOpen size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-4 rounded-xl text-center block text-xs sm:text-sm uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                    >
                      {t('auth.loginBtn', 'Access Passbook Dashboard')} →
                    </button>
                  </div>

                  {/* Navigation Switch Link */}
                  <div className="pt-4 border-t border-brand-gold/20 text-center">
                    <p className="text-xs text-brand-cream/80 font-sans">
                      {t('auth.noAccount', "Don't have an active chit scheme?")}{' '}
                      <Link 
                        to="/register" 
                        className="text-brand-gold font-bold hover:underline font-cinzel"
                      >
                        {t('auth.registerHere', 'Register New Scheme')} →
                      </Link>
                    </p>
                  </div>

                </form>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </PageTransition>
  );
}
