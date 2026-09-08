import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, RefreshCw, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useGoldRates } from '../context/GoldRatesContext';

export default function OldGoldCalculator({ isOpen, onClose }) {
  const { rates } = useGoldRates();
  const [purity, setPurity] = useState('22K');
  const [weight, setWeight] = useState(16); // Default 2 Pavan

  if (!isOpen) return null;

  const baseRate24k = rates['24K'] || 15824;
  const purityFactor = purity === '24K' ? 1.0 : purity === '22K' ? 0.916 : purity === '18K' ? 0.750 : 0.585;
  const ratePerGram = Math.round(baseRate24k * purityFactor);
  const estimatedExchangeValue = Math.round(ratePerGram * weight);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-brand-gold/60 shadow-2xl relative text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-gold hover:text-brand-maroon hover:bg-brand-gold bg-black/40 p-2 rounded-full border border-brand-gold/40 transition-all"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-brand-gold/30 text-center space-y-1 bg-black/20">
            <div className="flex items-center justify-center space-x-1.5 text-brand-gold">
              <RefreshCw size={18} className="animate-spin-slow text-brand-gold" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-gradient">
                Sri Hari Krishna Nagai Maligai
              </span>
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white">
              Old Gold Exchange Estimator
            </h3>
            <p className="text-xs text-brand-cream/80 font-sans">
              100% Transparent Madurai Laser Karatmeter Valuation
            </p>
          </div>

          <div className="p-6 space-y-5 font-sans text-xs">
            
            {/* 1. Purity Selector */}
            <div className="space-y-1.5">
              <label className="block font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                1. Select Purity of Old Gold Ornaments
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: '24K', label: '24K (99.9%)' },
                  { key: '22K', label: '22K (916)' },
                  { key: '18K', label: '18K (750)' },
                  { key: '14K', label: '14K (585)' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPurity(item.key)}
                    className={`py-2.5 rounded-xl font-cinzel font-bold text-xs transition-all border ${
                      purity === item.key
                        ? 'bg-brand-gold text-brand-maroon border-white shadow font-extrabold scale-105'
                        : 'bg-black/40 border-brand-gold/25 text-brand-cream hover:bg-brand-gold/15'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Weight Inputs */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-cinzel font-bold text-brand-gold uppercase tracking-wider text-[10px]">
                  2. Weight of Old Gold (Grams)
                </label>
                <span className="text-brand-cream/70 text-[11px]">
                  (~{(weight / 8).toFixed(2)} Sovereigns / பவுன்)
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-gold font-cinzel">
                  GRAMS
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '8g (1 Pavan)', val: 8 },
                  { label: '16g (2 Pavan)', val: 16 },
                  { label: '32g (4 Pavan)', val: 32 },
                  { label: '64g (8 Pavan)', val: 64 }
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setWeight(p.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-sans transition-all border ${
                      weight === p.val
                        ? 'bg-brand-gold text-brand-maroon font-bold'
                        : 'bg-white/5 border-brand-gold/20 text-brand-cream/80 hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Exchange Valuation Result Box */}
            <div className="p-5 rounded-2xl bg-black/50 border-2 border-brand-gold/45 shadow-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-brand-cream">
                <span>Calculated Benchmark Rate ({purity}):</span>
                <span className="font-bold text-white">₹{ratePerGram.toLocaleString('en-IN')}/g</span>
              </div>
              <div className="flex justify-between items-center text-xs text-brand-cream">
                <span>Total Net Weight:</span>
                <span className="font-bold text-white">{weight} grams</span>
              </div>

              <div className="pt-2 border-t border-brand-gold/25 flex justify-between items-center">
                <div>
                  <span className="font-cinzel font-bold text-brand-gold text-xs uppercase block">
                    Estimated Exchange Value:
                  </span>
                  <span className="text-[10px] text-brand-cream/70">
                    (Applicable 100% against new 916 jewellery)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-cormorant text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
                    ₹{estimatedExchangeValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Note */}
            <div className="p-3 bg-brand-gold/15 border border-brand-gold/30 rounded-xl flex items-start space-x-2 text-[11px] text-brand-cream">
              <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
              <span>
                <b>Zero Laser Deductions:</b> We melt and test your gold right in front of you using German Karatmeter laser analysis at our South Avani Moola Street showroom.
              </span>
            </div>

            {/* WhatsApp Booking */}
            <a
              href={`https://api.whatsapp.com/send?phone=+919865045924&text=Vanakkam%20Sri%20Hari%20Krishna%20Nagai%20Maligai!%20I%20used%20your%20Old%20Gold%20Exchange%20Estimator:%20${weight}g%20(${((weight/8)).toFixed(1)}%20Pavan)%20of%20${purity}%20Gold%20(Estimated%20Value:%20₹${estimatedExchangeValue.toLocaleString('en-IN')}).%20I%20would%20like%20to%20visit%20the%20showroom%20to%20exchange%20for%20new%20bridal%20jewels.`}
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
            >
              <MessageCircle size={16} />
              <span>Book Gold Exchange on WhatsApp →</span>
            </a>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
