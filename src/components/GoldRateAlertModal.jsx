import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Bell, CheckCircle2, MessageCircle, TrendingUp } from 'lucide-react';
import GoldRateChart from './GoldRateChart';

const historicalData = {
  '22k': [
    { date: 'Aug 27', rate: 6600 },
    { date: 'Aug 28', rate: 6620 },
    { date: 'Aug 29', rate: 6650 },
    { date: 'Aug 30', rate: 6645 },
    { date: 'Aug 31', rate: 6680 },
    { date: 'Sep 01', rate: 6690 },
    { date: 'Sep 02', rate: 6710 },
  ],
  '24k': [
    { date: 'Aug 27', rate: 7200 },
    { date: 'Aug 28', rate: 7222 },
    { date: 'Aug 29', rate: 7254 },
    { date: 'Aug 30', rate: 7249 },
    { date: 'Aug 31', rate: 7287 },
    { date: 'Sep 01', rate: 7298 },
    { date: 'Sep 02', rate: 7320 },
  ],
  '18k': [
    { date: 'Aug 27', rate: 5400 },
    { date: 'Aug 28', rate: 5416 },
    { date: 'Aug 29', rate: 5441 },
    { date: 'Aug 30', rate: 5437 },
    { date: 'Aug 31', rate: 5465 },
    { date: 'Sep 01', rate: 5473 },
    { date: 'Sep 02', rate: 5490 },
  ],
  'silver': [
    { date: 'Aug 27', rate: 85 },
    { date: 'Aug 28', rate: 86 },
    { date: 'Aug 29', rate: 87 },
    { date: 'Aug 30', rate: 87 },
    { date: 'Aug 31', rate: 89 },
    { date: 'Sep 01', rate: 90 },
    { date: 'Sep 02', rate: 92 },
  ]
};

export default function GoldRateAlertModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState('22k');

  if (!isOpen) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const getLineColor = () => {
    if (selectedMetal === 'silver') return '#E5E7EB';
    if (selectedMetal === '18k') return '#E3A857';
    return '#F4D068';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-brand-gold/60 shadow-2xl relative text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-gold hover:text-brand-maroon hover:bg-brand-gold bg-black/40 p-2 rounded-full border border-brand-gold/40 transition-all z-10"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-brand-gold/30 text-center space-y-1 bg-black/20">
            <div className="flex items-center justify-center space-x-1.5 text-brand-gold">
              <TrendingUp size={18} className="text-brand-gold" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-gradient">
                {t('nav.liveRates', 'LIVE MADURAI RATES')}
              </span>
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white">
              {t('modals.rateAlertTitle', 'Gold Price Trend & Alerts')}
            </h3>
          </div>

          <div className="p-6 space-y-6 font-sans text-xs max-h-[80vh] overflow-y-auto custom-scrollbar">
            
            {/* Price Chart Section */}
            <div className="bg-black/40 border border-brand-gold/25 rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="flex space-x-2">
                  {['22k', '24k', '18k', 'silver'].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-3 py-1 rounded-md font-cinzel font-bold text-[10px] uppercase tracking-wider transition-colors border ${
                        selectedMetal === metal 
                          ? 'bg-brand-gold text-brand-maroon border-brand-gold' 
                          : 'bg-black/40 text-brand-gold/70 border-brand-gold/30 hover:border-brand-gold/60 hover:text-brand-gold'
                      }`}
                    >
                      {metal === 'silver' ? 'Silver 92.5' : `${metal.toUpperCase()} Gold`}
                    </button>
                  ))}
                </div>
                <span className="text-brand-cream/60 text-[9px] uppercase tracking-widest text-right">{t('nav.viewPriceGraph', 'Last 7 Days')}</span>
              </div>
              <GoldRateChart data={historicalData[selectedMetal]} lineColor={getLineColor()} />
            </div>

            {/* Subscription Form */}
            {subscribed ? (
              <div className="p-6 bg-brand-gold/15 border border-brand-gold/40 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-brand-gold mx-auto" />
                <h4 className="font-cormorant text-2xl font-bold text-white">
                  {t('modals.subscribedMsg', 'Subscription Active!')}
                </h4>
                <p className="text-xs text-brand-cream font-sans">
                  +91 {phone}
                </p>
                <button
                  onClick={onClose}
                  className="btn-shimmer bg-brand-gold text-brand-maroon px-6 py-2 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider mt-2"
                >
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <Bell size={12} className="animate-pulse" />
                    <span>{t('home.services.rateAlerts', 'Get Daily Rate Drop Alerts (WhatsApp)')}</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-brand-gold/40 bg-black/70 text-brand-gold font-bold text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('modals.enterPhone', '10-digit WhatsApp number')}
                      className="w-full bg-black/50 border border-brand-gold/40 rounded-r-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle size={16} />
                  <span>{t('modals.subscribeBtn', 'Subscribe via WhatsApp')}</span>
                </button>
              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
