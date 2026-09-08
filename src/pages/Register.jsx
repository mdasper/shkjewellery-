import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Crown, Sparkles, Phone, User, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';

export default function Register() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [monthlyChitAmount, setMonthlyChitAmount] = useState('2000');
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
                {t('auth.regTitle', 'New Digi Gold Registration')}
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
                    {t('modals.subscribedMsg', 'Registration Successful!')}
                  </h3>
                  <p className="text-xs text-brand-cream font-sans">
                    {fullName} • ₹{parseInt(monthlyChitAmount).toLocaleString('en-IN')}/m
                  </p>
                  <Link
                    to="/savings-schemes"
                    className="btn-shimmer inline-block bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider shadow mt-2"
                  >
                    {t('schemes.exploreBtn', 'View Scheme Details')} →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                      {t('auth.nameLabel', 'Full Legal Name')} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t('auth.namePlaceholder', 'Enter your full name')}
                        className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                      />
                      <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                      {t('auth.phoneLabel', 'Mobile / WhatsApp Number')} *
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

                  {/* Monthly Amount Selector Chips */}
                  <div className="space-y-2 pt-1">
                    <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                      {t('home.digiGold.f3_title', 'Monthly Gold Savings Amount')}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1000', '2000', '5000', '10000'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setMonthlyChitAmount(amt)}
                          className={`py-2.5 rounded-xl font-cinzel font-bold text-xs transition-all border ${
                            monthlyChitAmount === amt
                              ? 'bg-brand-gold text-brand-maroon border-white shadow-lg font-extrabold scale-105'
                              : 'bg-black/40 border-brand-gold/25 text-brand-cream hover:bg-brand-gold/15'
                          }`}
                        >
                          ₹{parseInt(amt).toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    {/* Bonus Callout */}
                    <div className="p-3.5 bg-brand-gold/15 border border-brand-gold/40 rounded-xl flex items-center space-x-2.5 text-brand-cream text-xs font-sans mt-2">
                      <CheckCircle2 size={18} className="text-brand-gold shrink-0" />
                      <span>
                        <b>{t('schemes.benefit', 'Benefit:')}</b> {t('schemes.digiGoldDesc', 'Save monthly in gold weight. Enjoy 1-month bonus at maturity.')}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-4 rounded-xl text-center block text-xs sm:text-sm uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                    >
                      {t('auth.regBtn', 'Complete Scheme Registration')} →
                    </button>
                  </div>

                  {/* Navigation Switch Link */}
                  <div className="pt-4 border-t border-brand-gold/20 text-center">
                    <p className="text-xs text-brand-cream/80 font-sans">
                      {t('auth.alreadyHave', 'Already registered with an active passbook?')}{' '}
                      <Link 
                        to="/login" 
                        className="text-brand-gold font-bold hover:underline font-cinzel"
                      >
                        {t('auth.loginHere', 'Member Login')} →
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
