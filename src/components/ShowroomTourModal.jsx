import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Award, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function ShowroomTourModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="bg-gradient-to-b from-[#34070B] via-[#220406] to-[#140204] text-white rounded-3xl max-w-2xl w-full overflow-hidden border-2 border-brand-gold/60 shadow-2xl relative text-left"
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
              <Sparkles size={18} className="text-brand-gold" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-gradient">
                Sri Hari Krishna Nagai Maligai
              </span>
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white">
              Virtual Showroom & Heritage Tour
            </h3>
            <p className="text-xs text-brand-cream/80 font-sans">
              104, South Avani Moola Street, Valaiyal Kadai, Madurai - 625001
            </p>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[65vh] font-sans text-xs">
            
            {/* Showroom Video Preview Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-brand-gold/40 bg-black shadow-xl">
              <video
                src="/assets/video/woman_speaking_tamil.mp4"
                controls
                className="w-full h-full object-cover"
                poster="/assets/images/hero_bridal_set.jpg"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* 4 Pillar Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-black/40 rounded-xl border border-brand-gold/25 space-y-1">
                <div className="flex items-center space-x-2 text-brand-gold font-bold font-cinzel text-[11px]">
                  <ShieldCheck size={16} />
                  <span>Karatmeter Laser Lab</span>
                </div>
                <p className="text-[11px] text-brand-cream/80 font-sans">
                  Free instant laser gold purity testing in front of customer eyes.
                </p>
              </div>

              <div className="p-3.5 bg-black/40 rounded-xl border border-brand-gold/25 space-y-1">
                <div className="flex items-center space-x-2 text-brand-gold font-bold font-cinzel text-[11px]">
                  <Award size={16} />
                  <span>Master Karigar Studio</span>
                </div>
                <p className="text-[11px] text-brand-cream/80 font-sans">
                  Traditional Madurai temple karigai handcrafted with sacred precision.
                </p>
              </div>
            </div>

            {/* Address & Direct Actions */}
            <div className="p-4 rounded-2xl bg-black/50 border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-cinzel font-bold text-brand-gold text-xs block">
                  Showroom Timings:
                </span>
                <span className="text-brand-cream text-xs">
                  Monday – Sunday: 9:30 AM – 9:00 PM
                </span>
              </div>

              <div className="flex space-x-2.5 shrink-0">
                <a
                  href="https://maps.app.goo.gl/uXf3qPz9mZJzK4PcA"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer inline-flex items-center space-x-1.5 bg-brand-gold text-brand-maroon px-4 py-2.5 rounded-xl font-cinzel font-bold text-[11px] uppercase tracking-wider shadow"
                >
                  <MapPin size={14} />
                  <span>Google Maps</span>
                </a>

                <a
                  href="tel:+919865045924"
                  className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-brand-gold/40 text-brand-cream px-4 py-2.5 rounded-xl font-cinzel font-bold text-[11px] uppercase tracking-wider"
                >
                  <Phone size={14} />
                  <span>Call Store</span>
                </a>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
