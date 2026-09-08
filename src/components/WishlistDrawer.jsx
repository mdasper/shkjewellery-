import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();

  const totalGrams = wishlist.reduce((sum, item) => sum + (parseFloat(item.weightGrams) || 0), 0);

  const generateWhatsAppMessage = () => {
    let msg = `Vanakkam Sri Hari Krishna Nagai Maligai! I have shortlisted ${wishlist.length} jewels on your website:\n\n`;
    wishlist.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.purity || '22K 916'}, Wt: ${item.weight || item.weightGrams + 'g'})\n`;
    });
    if (totalGrams > 0) {
      msg += `\nTotal Approx Weight: ${totalGrams.toFixed(2)}g (~${(totalGrams / 8).toFixed(1)} Sovereigns)\n`;
    }
    msg += `\nPlease let me know the current availability and final price estimation. Nandri!`;
    return encodeURIComponent(msg);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white border-l-2 border-brand-gold/50 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-gold/30 flex items-center justify-between bg-black/30">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-brand-gold text-brand-maroon rounded-full shadow">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl font-bold text-white">
                      Your Jewellery Shortlist
                    </h3>
                    <p className="text-[11px] text-brand-gold font-sans font-semibold">
                      {wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'} Saved
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-full text-brand-cream hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <Sparkles size={36} className="text-brand-gold mx-auto opacity-70" />
                    <p className="font-cormorant text-2xl text-white font-bold">
                      Your Shortlist is Empty
                    </p>
                    <p className="text-xs text-brand-cream/80 font-sans max-w-xs mx-auto">
                      Click the Heart icon on any necklace, bangle, or ring to save and review them here.
                    </p>
                    <Link
                      to="/collections"
                      onClick={() => setIsWishlistOpen(false)}
                      className="btn-shimmer inline-block bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider shadow mt-4"
                    >
                      Explore Collections →
                    </Link>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-3.5 rounded-2xl bg-black/40 border border-brand-gold/30 hover:border-brand-gold/60 transition-all group"
                    >
                      <div className="w-18 h-18 w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-brand-gold/20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0 text-left space-y-1">
                        <Link
                          to={`/product/${item.id}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-cormorant text-base font-bold text-white hover:text-brand-goldLight transition-colors block truncate"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center space-x-2 text-[10px] font-sans text-brand-cream/80">
                          <span className="text-brand-gold font-bold">{item.purity || '22K 916'}</span>
                          <span>•</span>
                          <span>{item.weight || item.weightGrams + 'g'}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-brand-cream/50 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Actions */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-brand-gold/30 bg-black/50 space-y-3">
                  <div className="flex justify-between items-center text-xs font-sans text-brand-cream">
                    <span>Total Shortlisted Items:</span>
                    <span className="font-bold text-brand-gold">{wishlist.length} Jewels</span>
                  </div>
                  {totalGrams > 0 && (
                    <div className="flex justify-between items-center text-xs font-sans text-brand-cream pb-1 border-b border-brand-gold/15">
                      <span>Approximate Gold Weight:</span>
                      <span className="font-bold text-white">
                        {totalGrams.toFixed(2)}g (~{(totalGrams / 8).toFixed(1)} Sovereigns)
                      </span>
                    </div>
                  )}

                  {/* WhatsApp Inquire All */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shimmer w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-3.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                  >
                    <MessageCircle size={16} />
                    <span>Inquire Shortlist on WhatsApp →</span>
                  </a>

                  <div className="flex justify-between items-center pt-1">
                    <button
                      onClick={clearWishlist}
                      className="text-[11px] text-brand-cream/60 hover:text-rose-300 transition-colors"
                    >
                      Clear All Shortlist
                    </button>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-[11px] text-brand-gold hover:underline font-cinzel"
                    >
                      Continue Browsing →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
