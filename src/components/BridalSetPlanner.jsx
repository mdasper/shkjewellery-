import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Check, MessageCircle } from 'lucide-react';
import { useGoldRates } from '../context/GoldRatesContext';

export default function BridalSetPlanner({ isOpen, onClose }) {
  const { rates } = useGoldRates();
  const rate22k = rates['22K'] || 14505;

  const bridalItems = [
    { id: 'haram', name: 'Grand Temple Muhurtham Haram', weightGrams: 40, pavan: 5, defaultChecked: true },
    { id: 'choker', name: 'Antique Bridal Choker / Attigai', weightGrams: 24, pavan: 3, defaultChecked: true },
    { id: 'bangles', name: 'Traditional Casting Bangles (Set of 4)', weightGrams: 32, pavan: 4, defaultChecked: true },
    { id: 'vanki', name: 'Divine Peacock Vanki (Armlet Pair)', weightGrams: 24, pavan: 3, defaultChecked: false },
    { id: 'ottiyanam', name: 'Madurai Royal Ottiyanam (Waistbelt)', weightGrams: 40, pavan: 5, defaultChecked: false },
    { id: 'jhumkas', name: 'Antique Lakshmi Jhumkas & Maatal', weightGrams: 16, pavan: 2, defaultChecked: true }
  ];

  const [selectedItems, setSelectedItems] = useState(() => 
    bridalItems.filter(item => item.defaultChecked).map(item => item.id)
  );

  if (!isOpen) return null;

  const toggleItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activeItems = bridalItems.filter(item => selectedItems.includes(item.id));
  const totalWeightGrams = activeItems.reduce((sum, item) => sum + item.weightGrams, 0);
  const totalPavan = totalWeightGrams / 8;
  const estimatedMetalCost = totalWeightGrams * rate22k;
  const estimatedMakingAndGst = estimatedMetalCost * 0.15; // 12% avg making + 3% GST
  const estimatedTotalBudget = Math.round(estimatedMetalCost + estimatedMakingAndGst);

  const generateWhatsAppMessage = () => {
    let msg = `Vanakkam Sri Hari Krishna Nagai Maligai! I planned my Bridal Jewellery Trousseau on your website:\n\n`;
    activeItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.weightGrams}g / ${item.pavan} Pavan)\n`;
    });
    msg += `\nTotal Planned Weight: ${totalWeightGrams}g (${totalPavan} Sovereigns / பவுன்)\n`;
    msg += `Estimated Budget: ₹${estimatedTotalBudget.toLocaleString('en-IN')}\n\n`;
    msg += `I would like to book a VIP showroom bridal consultation to view available antique designs.`;
    return encodeURIComponent(msg);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white rounded-3xl max-w-xl w-full overflow-hidden border-2 border-brand-gold/60 shadow-2xl relative text-left"
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
              <Crown size={20} className="text-brand-gold animate-bounce" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-gradient">
                Sri Hari Krishna Nagai Maligai
              </span>
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white">
              Bridal Muhurtham Trousseau Planner
            </h3>
            <p className="text-xs text-brand-cream/80 font-sans">
              Plan your sacred wedding gold weight in Sovereigns (பவுன்) & Budget
            </p>
          </div>

          <div className="p-6 space-y-5 font-sans text-xs">
            
            {/* Checklist of Bridal Ornaments */}
            <div className="space-y-2 max-h-[36vh] overflow-y-auto pr-1">
              {bridalItems.map((item) => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-gradient-to-r from-[#4A0B10] to-[#2B0508] border-brand-gold shadow-md'
                        : 'bg-black/30 border-brand-gold/20 hover:border-brand-gold/40 opacity-75'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-brand-gold text-brand-maroon border-brand-gold' : 'border-brand-gold/40'
                      }`}>
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className="font-cormorant text-base font-bold text-white block">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-brand-cream/70">
                          Approx: {item.weightGrams}g ({item.pavan} Pavan)
                        </span>
                      </div>
                    </div>

                    <span className="font-cinzel text-xs font-bold text-brand-gold">
                      {item.pavan} Sovereigns
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Budget & Weight Summary Box */}
            <div className="p-5 rounded-2xl bg-black/50 border-2 border-brand-gold/45 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs text-brand-cream">
                <span>Selected Bridal Pieces:</span>
                <span className="font-bold text-white">{activeItems.length} Ornaments</span>
              </div>
              <div className="flex justify-between items-center text-xs text-brand-cream">
                <span>Total Sacred Gold Weight:</span>
                <span className="font-bold text-brand-goldLight text-sm">
                  {totalWeightGrams} Grams (~{totalPavan} Sovereigns / பவுன்)
                </span>
              </div>

              <div className="pt-2 border-t border-brand-gold/25 flex justify-between items-center">
                <div>
                  <span className="font-cinzel font-bold text-brand-gold text-xs uppercase block">
                    Estimated Bridal Budget:
                  </span>
                  <span className="text-[10px] text-brand-cream/70">
                    (Includes 22K 916 gold, crafting & GST)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-cormorant text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
                    ₹{estimatedTotalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Send Plan to WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?phone=+919865045924&text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
            >
              <MessageCircle size={16} />
              <span>Book Bridal Consultation with this Plan →</span>
            </a>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
