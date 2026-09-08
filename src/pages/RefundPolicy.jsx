import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { RotateCcw, ShieldCheck, AlertCircle, Phone, Mail, MapPin, Sparkles, RefreshCw, XCircle } from 'lucide-react';

export default function RefundPolicy() {
  const points = [
    {
      id: 1,
      icon: RotateCcw,
      title: '1. Order Cancellation Policy',
      text: 'Orders can be cancelled only before shipment processing begins. Customized jewellery, special orders, engraved products, and personalized items cannot be cancelled once the order has been confirmed. Approved cancellations will be refunded through the original payment method within 7–15 working days.'
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: '2. Returns & Manufacturing Defect Rules',
      text: 'If you receive a product with a manufacturing defect or an incorrect item, you must notify us within 24 hours of delivery. Returned products must be unused, undamaged, and accompanied by the original invoice, certificates, packaging, and accessories. Products showing signs of wear, alteration, resizing, or damage caused after delivery are not eligible for return.'
    },
    {
      id: 3,
      icon: RefreshCw,
      title: '3. Refunds Processing Schedule',
      text: 'Eligible refunds will be processed within 7–15 working days after the returned product has been inspected and approved by our quality team. Refunds will be credited through the original mode of payment. Shipping charges, handling fees, and payment gateway charges may not be refundable where applicable.'
    },
    {
      id: 4,
      icon: RefreshCw,
      title: '4. Exchange Policy & In-Store Guidelines',
      text: 'Jewellery may be exchanged within 15 days from the date of purchase, subject to product condition and company approval. Customized jewellery, engraved items, gold coins, and special order products are not eligible for exchange through online returns. Any difference in product value during exchange must be paid by the customer.'
    },
    {
      id: 5,
      icon: XCircle,
      title: '5. Non-Returnable & Non-Refundable Items',
      text: 'The following products are strictly not eligible for cancellation, return, or exchange: Customized & Made-to-Order Jewellery, Personalized or Engraved Products, Gold Coins & Bullion Bars, Special Order Items, and Products damaged due to misuse, improper handling, or normal wear and tear.'
    },
    {
      id: 6,
      icon: AlertCircle,
      title: '6. Damaged Package Refusal Procedure',
      text: 'If the package appears tampered with, damaged, or opened during delivery, customers should refuse to accept the shipment and immediately contact our Customer Support team. Shipping-related damages must be reported at the time of delivery.'
    }
  ];

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full">
        
        {/* 100% Full-Width Banner Header */}
        <section className="py-16 bg-brand-maroon text-white relative overflow-hidden w-full">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-gold-glow"
            >
              <Sparkles size={14} className="text-brand-gold animate-spin-slow" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                Customer Protection & Guarantee
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
            >
              Refund & Cancellation Policy
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-cream font-medium text-sm max-w-xl mx-auto font-sans"
            >
              Sri Hari Krishna Nagai Maligai • Madurai
            </motion.p>
          </div>
        </section>

        {/* 100% Full-Width Streaming Cards List */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 space-y-8">
          
          {/* Overview Banner */}
          <div 
            className="bg-white rounded-2xl p-8 border-2 border-brand-gold/30 shadow-lg text-left font-sans text-[#1A0A0C] text-sm md:text-base leading-relaxed w-full"
          >
            <p className="text-[#1A0A0C] font-semibold">
              At <b>Sri Hari Krishna Nagai Maligai</b>, customer satisfaction is our priority. This Refund & Cancellation Policy explains the terms governing order cancellations, returns, refunds, and exchanges.
            </p>
          </div>

          {/* Points Grid with Hover Gold Ring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {points.map((pt) => {
              const IconComp = pt.icon;
              return (
                <div
                  key={pt.id}
                  className="bg-white rounded-2xl p-8 border-2 border-brand-gold/30 hover-gold-ring text-left flex flex-col justify-between cursor-pointer shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 border-b border-brand-gold/20 pb-4">
                      <div className="p-3 bg-brand-maroon text-brand-gold rounded-xl shadow-md shrink-0">
                        <IconComp size={24} />
                      </div>
                      <h3 className="font-cormorant text-2xl font-bold text-brand-maroon">
                        {pt.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                      {pt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Point 7: Return Contact Full-Width Banner */}
          <div 
            className="bg-gradient-to-r from-[#3B070B] via-[#270406] to-[#3B070B] text-white p-8 md:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-2xl text-left space-y-4 w-full"
          >
            <div className="flex items-center space-x-3 border-b border-brand-gold/20 pb-4">
              <div className="p-3 bg-brand-gold text-brand-maroon rounded-xl font-extrabold text-lg">
                7
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-gold-gradient">
                Contact Information for Return & Refund Requests
              </h3>
            </div>
            <p className="text-sm text-brand-cream font-medium font-sans">
              For cancellation, return, refund, or exchange requests, please contact our showroom:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm font-sans text-brand-cream font-semibold pt-2">
              <div className="flex items-center space-x-2 bg-white/10 p-3.5 rounded-lg border border-brand-gold/30">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>Valaiyal Kadai, South Avani Moola Street, Madurai Main, Madurai – 625001</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 p-3.5 rounded-lg border border-brand-gold/30">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>Office: +91 452 4395924 | Mob: +91 98650 45924</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 p-3.5 rounded-lg border border-brand-gold/30">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>info@sriharikrishnanagaimaligai.com</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
