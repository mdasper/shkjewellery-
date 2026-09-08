import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calculator, TrendingUp, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { useGoldRates } from '../context/GoldRatesContext';
import Floating3DParticles from './Floating3DParticles';

export default function RateCalculator() {
  const { t } = useTranslation();
  const { rates } = useGoldRates();
  const [selectedPurity, setSelectedPurity] = useState('22K');
  const [weight, setWeight] = useState(8); // Default 1 Sovereign (8g) for Madurai
  const [includeGST, setIncludeGST] = useState(true);
  const [makingCharges, setMakingCharges] = useState(12);

  const ratePerGram = rates[selectedPurity] || 14505;
  const basicCost = ratePerGram * weight;
  const makingChargesCost = basicCost * (makingCharges / 100);
  const totalBeforeTax = basicCost + makingChargesCost;
  const gstCost = includeGST ? totalBeforeTax * 0.03 : 0;
  const totalCost = totalBeforeTax + gstCost;

  // South Indian Quick Weight Presets (Grams & Pavan/Sovereign)
  const weightPresets = [
    { label: '1g', val: 1 },
    { label: '4g (1/2 Pavan)', val: 4 },
    { label: '8g (1 Pavan)', val: 8 },
    { label: '16g (2 Pavan)', val: 16 },
    { label: '24g (3 Pavan)', val: 24 },
    { label: '32g (4 Pavan)', val: 32 }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#2B0508] via-[#1E0305] to-[#2B0508] text-white relative overflow-hidden border-b border-brand-gold/30 w-full">
      
      {/* 3D Ambient Background Particles */}
      <Floating3DParticles />

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Live Rate Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-black/60 border border-brand-gold/50 px-4 py-1.5 rounded-full backdrop-blur-md shadow-gold-glow">
              <TrendingUp size={14} className="text-brand-gold animate-bounce" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> {t('calculator.liveBadge', 'Live Market Rate • Madurai Today')}
              </span>
            </div>

            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              {t('calculator.title', 'Transparent Bullion & Jewelry Estimator')}
            </h2>

            <p className="text-brand-cream/90 font-medium text-sm sm:text-base font-sans leading-relaxed">
              {t('calculator.subtitle', 'Experience 100% fair and transparent Madurai market rates. Calculate instant estimates including pure gold weight, making charges, and GST with complete clarity.')}
            </p>
            
            {/* Rates Table Grid with Hover Gold Ring */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: 'Gold 24K (99.9%)', key: '24K', badge: t('calculator.pureBullion', 'Pure Bullion Bar') },
                { label: 'Gold 22K (916)', key: '22K', badge: t('calculator.standardHallmark', 'Standard Hallmark') },
                { label: 'Gold 18K (750)', key: '18K', badge: t('calculator.diamondJewelry', 'Diamond Jewelry') },
                { label: 'Silver 92.5', key: 'silver', badge: t('calculator.pujaUtensils', 'Puja Utensils') }
              ].map((item, idx) => {
                const isSelected = (item.key === selectedPurity);
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedPurity(item.key)}
                    className={`border p-4 rounded-xl shadow-xl backdrop-blur-md text-left space-y-1 relative overflow-hidden group cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-b from-[#550B10] to-[#2E0407] border-brand-gold ring-2 ring-brand-gold/50 shadow-gold-glow' 
                        : 'bg-gradient-to-b from-[#3E060A]/80 to-[#220305]/80 border-brand-gold/30 hover:border-brand-gold/60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-cinzel font-bold text-brand-gold uppercase tracking-wider block">
                        {item.label}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 size={13} className="text-brand-goldLight" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      )}
                    </div>
                    <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block group-hover:text-brand-goldLight transition-colors">
                      ₹{(rates[item.key] || 0).toLocaleString('en-IN')}<span className="text-xs font-sans text-brand-cream/70">/g</span>
                    </span>
                    <span className="text-[9px] text-brand-cream/80 font-sans block">
                      {item.badge}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Madurai Traditional Benchmark Info */}
            <div className="p-4 rounded-xl bg-black/40 border border-brand-gold/30 flex items-center space-x-3 text-xs text-brand-cream font-sans">
              <Sparkles size={18} className="text-brand-gold shrink-0" />
              <span>
                <b>{t('nav.showroom', 'Madurai')}:</b> 1 Sovereign (பவுன்) = <b>8 {t('calculator.grams', 'Grams')}</b>. 22K 916 Hallmark.
              </span>
            </div>

          </div>

          {/* Right Column: Catchy Glassmorphism Calculator */}
          <div className="lg:col-span-7">
            <div 
              className="bg-gradient-to-b from-[#3F080C]/95 via-[#2E0508]/95 to-[#1F0305]/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-brand-gold/45 p-6 sm:p-10 text-left relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-brand-gold/25 pb-6 mb-7">
                <div className="flex items-center space-x-3.5">
                  <div className="bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon p-3.5 rounded-2xl shadow-xl">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {t('calculator.calcTitle', 'Jewellery Price Calculator')}
                    </h3>
                    <p className="text-xs text-brand-gold font-sans font-medium mt-0.5">
                      {t('calculator.subtitle', 'Live estimation with accurate purity, making & GST')}
                    </p>
                  </div>
                </div>

                <span className="bg-brand-maroon border border-brand-gold/50 text-brand-gold text-[10px] font-cinzel font-bold px-3 py-1.5 rounded-full uppercase tracking-wider hidden sm:block">
                  ₹{ratePerGram}/g
                </span>
              </div>

              <div className="space-y-6">
                
                {/* 1. Metal & Purity Selection */}
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-brand-gold mb-2.5">
                    1. {t('calculator.selectPurity', 'Select Purity / Metal Type')}
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {['24K', '22K', '18K', 'silver'].map((purity) => (
                      <button
                        key={purity}
                        type="button"
                        onClick={() => setSelectedPurity(purity)}
                        className={`py-3 rounded-xl font-cinzel font-bold text-xs sm:text-sm transition-all duration-300 border ${
                          selectedPurity === purity
                            ? 'bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-maroon border-white shadow-xl scale-105 font-extrabold'
                            : 'bg-black/40 border-brand-gold/20 text-brand-cream hover:bg-brand-gold/15'
                        }`}
                      >
                        {purity === 'silver' ? 'Silver 92.5' : `${purity} Gold`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Weight Inputs & Quick Sovereign / Pavan Presets */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="calcWeightInput" className="text-xs font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                      2. {t('calculator.weightInGrams', 'Weight in Grams')}
                    </label>
                    <span className="text-[11px] text-brand-cream/80 font-sans">
                      ({(weight / 8).toFixed(2)} Sovereign / பவுன்)
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="number"
                      id="calcWeightInput"
                      min="0.1"
                      step="0.01"
                      value={weight}
                      onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-black/50 border border-brand-gold/40 rounded-xl px-4 py-3.5 text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-brand-gold font-sans"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-gold font-cinzel">
                      {t('calculator.grams', 'GRAMS')}
                    </span>
                  </div>

                  {/* Sovereign Preset Quick Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {weightPresets.map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setWeight(preset.val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                          weight === preset.val 
                            ? 'bg-brand-gold text-brand-maroon font-bold shadow' 
                            : 'bg-white/10 hover:bg-white/20 text-brand-cream border border-brand-gold/20'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Making Charges Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="makingSlider" className="text-xs font-cinzel font-bold uppercase tracking-wider text-brand-gold">
                      3. {t('calculator.makingCharges', 'Making Charges')} ({makingCharges}%)
                    </label>
                    <span className="text-[11px] text-brand-goldLight font-sans font-semibold">
                      ₹{makingChargesCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="makingSlider"
                    min="5"
                    max="25"
                    step="1"
                    value={makingCharges}
                    onChange={(e) => setMakingCharges(parseInt(e.target.value) || 0)}
                    className="w-full h-2.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>

                {/* 4. GST Checkbox */}
                <div className="flex items-center space-x-3 pt-1">
                  <input
                    type="checkbox"
                    id="gstCheck"
                    checked={includeGST}
                    onChange={(e) => setIncludeGST(e.target.checked)}
                    className="w-4 h-4 text-brand-maroon border-brand-gold/40 rounded focus:ring-brand-gold accent-brand-gold cursor-pointer"
                  />
                  <label htmlFor="gstCheck" className="text-xs font-semibold text-brand-cream cursor-pointer select-none font-sans">
                    {t('calculator.includeGST', 'Include 3% Govt. GST (Mandatory for Invoices)')}
                  </label>
                </div>

                {/* Total Calculation Box */}
                <div className="bg-black/50 border border-brand-gold/45 rounded-2xl p-6 space-y-3 backdrop-blur-md shadow-2xl">
                  <div className="flex justify-between text-xs text-brand-cream font-sans">
                    <span>{t('calculator.basePrice', 'Base Metal Price')} ({weight}g @ ₹{ratePerGram}/g):</span>
                    <span className="font-bold text-white">₹{basicCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-cream font-sans">
                    <span>{t('calculator.makingValue', 'Making / Wastage')} ({makingCharges}%):</span>
                    <span className="font-bold text-white">₹{makingChargesCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  {includeGST && (
                    <div className="flex justify-between text-xs text-brand-cream font-sans border-b border-brand-gold/25 pb-3">
                      <span>{t('calculator.gstValue', '3% GST')}:</span>
                      <span className="font-bold text-white">₹{gstCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  {/* Total Highlight */}
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="font-cinzel font-bold text-brand-gold text-sm sm:text-base uppercase tracking-wider block">
                        {t('calculator.estTotal', 'Estimated Total Amount')}:
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient block drop-shadow-2xl">
                        ₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={`https://api.whatsapp.com/send?phone=+919865045924&text=Vanakkam!%20I%20calculated%20an%20estimate%20on%20your%20website:%20${weight}g%20(${((weight/8)).toFixed(1)}%20Pavan)%20${selectedPurity}%20Gold%20(Estimated%20Total:%20₹${totalCost.toFixed(0)}).%20Please%20guide%20me%20with%20available%20designs!`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-4 rounded-xl text-center flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle size={18} />
                  <span>{t('calculator.whatsappBtn', 'Share on WhatsApp / Lock Rate')} →</span>
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
