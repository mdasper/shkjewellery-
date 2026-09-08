import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { useGoldRates } from '../context/GoldRatesContext';
import { officialSchemes } from '../data/schemesData';

export default function SchemeDetail() {
  const { slug } = useParams();
  const scheme = officialSchemes.find(s => s.slug === slug);
  
  const { rates } = useGoldRates();
  const rate22k = rates['22K'] || 14505;
  const rateSilver = rates['silver'] || 260;

  const [monthlyAmount, setMonthlyAmount] = useState(3000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1C0507] text-white">
        <h2>Scheme not found.</h2>
        <Link to="/savings">Go Back</Link>
      </div>
    );
  }

  const currentRate = scheme.metal === 'Gold' ? rate22k : rateSilver;
  const totalPaid = monthlyAmount * 11;
  const storeBonus = monthlyAmount * scheme.bonusMultiplier;
  const totalMaturityValue = totalPaid + storeBonus;
  
  const approxMetalGrams = (totalMaturityValue / currentRate).toFixed(2);
  const approxPavan = scheme.metal === 'Gold' ? (approxMetalGrams / 8).toFixed(2) : null;

  const presetAmounts = [1000, 2000, 3000, 5000, 10000, 20000];

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#1C0507] via-[#2A080B] to-[#1C0507] min-h-screen pb-24 text-white w-full">
        
        {/* 100% Full-Width Header Banner */}
        <section className="py-16 bg-[#3B070B] text-white relative overflow-hidden border-b border-brand-gold/30 w-full">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
            <Link to="/savings" className="inline-flex items-center space-x-2 text-brand-gold hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} />
              <span className="font-cinzel text-xs font-bold tracking-wider uppercase">Back to Schemes</span>
            </Link>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/3 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/50">
                 <img src={scheme.image} alt={scheme.title} className="w-full h-auto" />
              </div>
              
              <div className="md:w-2/3 space-y-4 text-left">
                <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-gold-glow">
                  <Sparkles size={14} className="text-brand-gold animate-spin-slow" />
                  <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                    {scheme.subtitle}
                  </span>
                </div>
                
                <h1 className="font-cormorant text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl tracking-wide">
                  {scheme.title}
                </h1>

                <p className="text-brand-cream font-medium text-base max-w-xl font-sans">
                  {scheme.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Scheme Calculator */}
        <section className="py-12 w-full px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] rounded-3xl border-2 border-brand-gold/60 p-6 sm:p-10 shadow-2xl text-left space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/25 pb-6">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-brand-gold text-brand-maroon rounded-2xl shadow-lg shrink-0">
                  <Calculator size={24} />
                </div>
                <div>
                  <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                    {scheme.title} Calculator
                  </h2>
                  <p className="text-xs text-brand-gold font-sans font-medium">
                    11-Month Scheme with {scheme.bonusMultiplier} Month Free Bonus
                  </p>
                </div>
              </div>

              <span className="bg-brand-maroon border border-brand-gold/50 text-brand-gold text-xs font-cinzel font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                Live {scheme.metal} Rate: ₹{currentRate.toLocaleString('en-IN')}/g
              </span>
            </div>

            {/* Slider & Presets */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-cinzel font-bold text-xs uppercase tracking-wider text-brand-gold">
                  Select Monthly Installment (மாத தவணை):
                </label>
                <span className="font-cormorant text-3xl font-extrabold text-gold-gradient">
                  ₹{monthlyAmount.toLocaleString('en-IN')} / month
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(parseInt(e.target.value) || 1000)}
                className="w-full h-3 bg-black/60 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />

              {/* Quick Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlyAmount(amt)}
                    className={`px-4 py-1.5 rounded-xl font-cinzel font-bold text-xs transition-all border ${monthlyAmount === amt ? "bg-brand-gold text-brand-maroon border-white shadow-lg scale-105" : "bg-black/40 border-brand-gold/30 text-brand-cream hover:bg-brand-gold/15"}`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-brand-gold/30 space-y-1">
                <span className="text-[10px] font-cinzel uppercase font-bold text-brand-cream/70 block">
                  You Pay (11 Months)
                </span>
                <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                  ₹{totalPaid.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-brand-cream/60 font-sans block">
                  11 Equal Monthly Installments
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0B10] to-[#2B0508] border border-brand-gold space-y-1 shadow-gold-glow">
                <span className="text-[10px] font-cinzel uppercase font-bold text-brand-gold block">
                  {scheme.bonusMultiplier} Month Free Bonus
                </span>
                <span className="font-cormorant text-2xl sm:text-3xl font-bold text-brand-goldLight block">
                  + ₹{storeBonus.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-brand-cream/80 font-sans block font-semibold">
                  🎁 Gifted by Sri Hari Krishna
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-brand-gold/30 space-y-1">
                <span className="text-[10px] font-cinzel uppercase font-bold text-brand-cream/70 block">
                  Approx {scheme.metal} Accumulated
                </span>
                <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                  ~{approxMetalGrams} Grams
                </span>
                {approxPavan && (
                  <span className="text-[10px] text-brand-gold font-sans block font-bold">
                    ({approxPavan} Sovereigns / பவுன்)
                  </span>
                )}
              </div>
            </div>

            {/* Total Maturity Value & Action */}
            <div className="p-6 rounded-2xl bg-black/60 border-2 border-brand-gold/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <span className="text-xs font-cinzel font-bold text-brand-gold uppercase tracking-wider block">
                  Total Maturity Purchase Value:
                </span>
                <span className="font-cormorant text-4xl sm:text-5xl font-extrabold text-gold-gradient block">
                  ₹{totalMaturityValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-brand-cream/80 font-sans block mt-0.5">
                  100% Value exchangeable for any {scheme.metal} ornaments!
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="btn-shimmer inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-7 py-4 rounded-xl font-cinzel font-extrabold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform shrink-0"
                >
                  <span>Enroll in Scheme Online</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href={`https://api.whatsapp.com/send?phone=+919865045924&text=Vanakkam%20Sri%20Hari%20Krishna%20Nagai%20Maligai!%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(scheme.title)}%20for%20₹${monthlyAmount}/month%20(Total%20Maturity%20Benefit:%20₹${totalMaturityValue}).%20Please%20guide%20me.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
