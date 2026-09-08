import React, { useState } from 'react';
import { Smartphone, Download, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ChitSchemeApp() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const duration = 11; // 11 month scheme
  const gold22KRate = 14505.00; // Rs. 14,505.00 per gram

  const totalInvestment = monthlyAmount * duration;
  // Jewelry scheme benefit: Jewelers usually match 1 month installment as bonus (12th month) or waive making charges.
  const bonusAmount = monthlyAmount; 
  const totalMaturityValue = totalInvestment + bonusAmount;
  const estimatedGoldGrams = totalMaturityValue / gold22KRate;

  return (
    <section id="schemes" className="py-16 bg-brand-maroon text-white scroll-mt-20 relative overflow-hidden">
      {/* Background overlay designs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* App Info Panel */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/15 text-brand-gold px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Smartphone size={14} />
              <span>Mobile App Launch</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
              Sri Hari Krishna <span className="text-brand-gold">Digi Gold</span> App
            </h2>
            
            <p className="text-brand-cream/80 text-sm md:text-base leading-relaxed">
              Paying your gold savings scheme installments has never been easier. Track your weight logs, view daily rates, make secure payments, and watch your savings grow directly from our mobile application.
            </p>

            {/* Benefit bullet points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-brand-gold mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-sm text-brand-cream">100% Safe & Trusted</h4>
                  <p className="text-xs text-brand-cream/70">Fully secured gateways with transaction logs.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-brand-gold mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-sm text-brand-cream">No Making Charges & Wastage</h4>
                  <p className="text-xs text-brand-cream/70">Special waivers up to 18% on maturity purchase.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-brand-gold mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-sm text-brand-cream">Bonus 12th Month Installment</h4>
                  <p className="text-xs text-brand-cream/70">Store pays your last installment as matching bonus.</p>
                </div>
              </div>
            </div>

            {/* Play store download buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="https://play.google.com/store" 
                target="_blank"
                rel="noreferrer"
                className="bg-brand-gold hover:bg-brand-goldLight text-brand-maroon font-bold px-6 py-3 rounded-lg flex items-center space-x-3 transition-transform hover:scale-105 shadow-lg"
              >
                <Download size={18} />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold tracking-wider leading-none">Get it on</span>
                  <span className="text-sm font-black">Google Play Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Scheme Calculator Card */}
          <div className="lg:col-span-6 bg-white text-brand-charcoal rounded-lg shadow-2xl p-6 md:p-8 border border-brand-gold/20">
            <div className="flex items-center space-x-2.5 mb-6 border-b border-brand-gold/15 pb-4">
              <Sparkles className="text-brand-gold" size={20} />
              <h3 className="font-serif text-xl font-bold text-brand-maroon text-left">
                Gold Savings Scheme Planner
              </h3>
            </div>

            <div className="space-y-6 text-left">
              {/* Slider for monthly installment */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="schemeAmount" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/80">
                    Monthly Saving Installment
                  </label>
                  <span className="text-lg font-black text-brand-maroon">
                    ₹{monthlyAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  id="schemeAmount"
                  min="1000"
                  max="25000"
                  step="1000"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(parseInt(e.target.value) || 1000)}
                  className="w-full h-2 bg-brand-cream rounded-lg appearance-none cursor-pointer accent-brand-gold mt-1"
                />
                <div className="flex justify-between text-[10px] text-brand-charcoal/50 font-bold mt-1">
                  <span>₹1,000</span>
                  <span>₹10,000</span>
                  <span>₹25,000</span>
                </div>
              </div>

              {/* Calculator breakdown cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-cream border border-brand-gold/10 p-3 rounded text-center">
                  <span className="block text-[10px] text-brand-charcoal/60 uppercase tracking-wider font-bold">Total Term</span>
                  <span className="block text-base font-bold text-brand-maroon mt-0.5">{duration} Months</span>
                </div>
                <div className="bg-brand-cream border border-brand-gold/10 p-3 rounded text-center">
                  <span className="block text-[10px] text-brand-charcoal/60 uppercase tracking-wider font-bold">Total Paid By You</span>
                  <span className="block text-base font-bold text-brand-maroon mt-0.5">₹{totalInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-brand-cream border border-brand-gold/10 p-3 rounded text-center">
                  <span className="block text-[10px] text-brand-charcoal/60 uppercase tracking-wider font-bold">Bonus Contribution</span>
                  <span className="block text-base font-bold text-green-600 mt-0.5">₹{bonusAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-brand-cream border border-brand-gold/10 p-3 rounded text-center">
                  <span className="block text-[10px] text-brand-charcoal/60 uppercase tracking-wider font-bold">Total Purchase Value</span>
                  <span className="block text-base font-extrabold text-brand-maroon mt-0.5">₹{totalMaturityValue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Estimate Output */}
              <div className="bg-brand-maroon/5 border border-brand-maroon/20 rounded p-4 text-center space-y-1">
                <span className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider">
                  Estimated Accumulated Gold Weight (22K)
                </span>
                <span className="block font-serif text-3xl font-black text-brand-maroon">
                  ~ {estimatedGoldGrams.toFixed(3)} Grams
                </span>
                <span className="block text-[10px] text-brand-charcoal/50 font-medium italic mt-1">
                  *Calculated at 22K rate of ₹{gold22KRate}/g. Weight may vary based on live rate at maturity.
                </span>
              </div>

              {/* CTA Inquire */}
              <a
                href={`https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20want%2520to%20enroll%20in%20your%2011-Month%20Savings%20Scheme%20with%20₹${monthlyAmount}%20monthly%20amount.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-maroon font-bold tracking-wider py-3 rounded text-center block text-sm shadow transition-colors flex items-center justify-center space-x-2"
              >
                <ShieldCheck size={18} />
                <span>ENROLL IN THIS SCHEME VIA WHATSAPP</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
