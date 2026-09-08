import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('bangles');

  const bangleSizes = [
    { size: '2.2', diameterMm: '54.0 mm', circumferenceMm: '169.6 mm', category: 'Extra Small' },
    { size: '2.4', diameterMm: '57.2 mm', circumferenceMm: '179.6 mm', category: 'Small' },
    { size: '2.6', diameterMm: '60.3 mm', circumferenceMm: '189.4 mm', category: 'Medium (Most Common)' },
    { size: '2.8', diameterMm: '63.5 mm', circumferenceMm: '199.4 mm', category: 'Large' },
    { size: '2.10', diameterMm: '66.7 mm', circumferenceMm: '209.5 mm', category: 'Extra Large' }
  ];

  const ringSizes = [
    { inSize: '10', innerDiameterMm: '16.0 mm', circumferenceMm: '50.3 mm' },
    { inSize: '12', innerDiameterMm: '16.5 mm', circumferenceMm: '51.8 mm' },
    { inSize: '14', innerDiameterMm: '17.2 mm', circumferenceMm: '54.0 mm' },
    { inSize: '16', innerDiameterMm: '17.8 mm', circumferenceMm: '55.9 mm' },
    { inSize: '18', innerDiameterMm: '18.5 mm', circumferenceMm: '58.1 mm' },
    { inSize: '20', innerDiameterMm: '19.1 mm', circumferenceMm: '60.0 mm' }
  ];

  if (!isOpen) return null;

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
              <Ruler size={18} />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-gradient">
                Sri Hari Krishna Nagai Maligai
              </span>
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white">
              Bangle & Ring Sizing Guide
            </h3>
            <p className="text-xs text-brand-cream/80 font-sans">
              Traditional South Indian Hallmark Measurements
            </p>
          </div>

          {/* Tab Selector */}
          <div className="p-2 mx-6 mt-4 bg-black/50 rounded-xl border border-brand-gold/25 flex gap-2">
            <button
              onClick={() => setActiveTab('bangles')}
              className={`flex-1 py-2 rounded-lg font-cinzel font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'bangles'
                  ? 'bg-brand-gold text-brand-maroon shadow font-extrabold'
                  : 'text-brand-cream/70 hover:text-brand-gold'
              }`}
            >
              Bangle Sizes (வளையல்)
            </button>
            <button
              onClick={() => setActiveTab('rings')}
              className={`flex-1 py-2 rounded-lg font-cinzel font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'rings'
                  ? 'bg-brand-gold text-brand-maroon shadow font-extrabold'
                  : 'text-brand-cream/70 hover:text-brand-gold'
              }`}
            >
              Ring Sizes (மோதிரம்)
            </button>
          </div>

          {/* Table Container */}
          <div className="p-6 overflow-y-auto max-h-[50vh] space-y-4 font-sans text-xs">
            {activeTab === 'bangles' ? (
              <div className="space-y-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-gold/30 text-brand-gold font-cinzel text-[11px]">
                      <th className="pb-2">Indian Size</th>
                      <th className="pb-2">Diameter</th>
                      <th className="pb-2">Circumference</th>
                      <th className="pb-2 text-right">Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/15">
                    {bangleSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 font-bold text-white font-cinzel">{row.size}</td>
                        <td className="py-2.5 text-brand-cream">{row.diameterMm}</td>
                        <td className="py-2.5 text-brand-cream">{row.circumferenceMm}</td>
                        <td className="py-2.5 text-right font-medium text-brand-goldLight text-[11px]">{row.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-3 rounded-xl bg-black/40 border border-brand-gold/20 text-[11px] text-brand-cream/90 flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    <b>How to measure at home:</b> Measure the inner diameter of an existing well-fitting bangle using a standard millimeter scale. <b>2.4 & 2.6</b> are the most common South Indian bridal sizes.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-gold/30 text-brand-gold font-cinzel text-[11px]">
                      <th className="pb-2">Indian Size</th>
                      <th className="pb-2">Inner Diameter</th>
                      <th className="pb-2 text-right">Circumference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/15">
                    {ringSizes.map((row) => (
                      <tr key={row.inSize} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 font-bold text-white font-cinzel">{row.inSize}</td>
                        <td className="py-2.5 text-brand-cream">{row.innerDiameterMm}</td>
                        <td className="py-2.5 text-right text-brand-goldLight">{row.circumferenceMm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-3 rounded-xl bg-black/40 border border-brand-gold/20 text-[11px] text-brand-cream/90 flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    <b>Tip:</b> Wrap a thin strip of paper snugly around the base of your intended finger, mark the point where it overlaps, and measure the length in millimeters.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-brand-gold/30 bg-black/40 text-center">
            <button
              onClick={onClose}
              className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold py-3 rounded-xl uppercase tracking-wider text-xs shadow-xl"
            >
              Got It, Continue Browsing
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
