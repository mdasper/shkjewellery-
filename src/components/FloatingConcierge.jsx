import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Heart, ArrowUp, Sparkles, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function FloatingConcierge() {
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Concierge Navigation" className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2.5">
      
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-brand-maroon/90 hover:bg-brand-maroon text-brand-gold border border-brand-gold/50 shadow-xl flex items-center justify-center transition-transform hover:scale-110"
            title="Scroll to Top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Action Menu */}
      <div className="flex flex-col items-end space-y-2">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="flex flex-col space-y-2 bg-[#2B0508]/95 backdrop-blur-md p-2 rounded-2xl border border-brand-gold/40 shadow-2xl shadow-gold-glow"
            >
              {/* 1. Wishlist Drawer Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative flex items-center space-x-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-brand-maroonLight text-brand-cream hover:text-white transition-all text-xs font-sans group"
                title="View Shortlist"
              >
                <div className="relative">
                  <Heart size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-maroon font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow font-cinzel">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="font-medium text-[11px] pr-1">Shortlist</span>
              </button>

              {/* 2. Google Maps Location */}
              <a
                href="https://maps.app.goo.gl/uXf3qPz9mZJzK4PcA"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-brand-maroonLight text-brand-cream hover:text-white transition-all text-xs font-sans group"
                title="Locate Showroom on Google Maps"
              >
                <MapPin size={16} className="text-brand-gold group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[11px] pr-1">Madurai Store</span>
              </a>

              {/* 3. Direct Phone Call */}
              <a
                href="tel:+919865045924"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-brand-maroonLight text-brand-cream hover:text-white transition-all text-xs font-sans group"
                title="Call Showroom: +91 98650 45924"
              >
                <Phone size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[11px] pr-1">Call Store</span>
              </a>

              {/* 4. WhatsApp Direct Chat */}
              <a
                href="https://api.whatsapp.com/send?phone=+919865045924&text=Vanakkam%20Sri%20Hari%20Krishna%20Nagai%20Maligai!%20I%20am%20browsing%20your%20website%20and%20need%20assistance."
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white transition-all text-xs font-sans group shadow"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={16} className="text-white group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[11px] pr-1">WhatsApp</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-shimmer w-13 h-13 w-12 h-12 rounded-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon border-2 border-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-gold-glow"
          title="VIP Concierge"
        >
          {isExpanded ? <X size={20} /> : <Sparkles size={20} className="animate-spin-slow" />}
        </button>
      </div>

    </aside>
  );
}
