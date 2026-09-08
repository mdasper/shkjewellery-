import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { Truck, ShieldCheck, Clock, MapPin, AlertCircle, Phone, Mail, Sparkles, Box, CheckCircle2 } from 'lucide-react';

export default function ShippingPolicy() {
  const points = [
    {
      id: 1,
      icon: Truck,
      title: '1. Shipping Coverage Across India',
      text: 'We offer shipping services to most cities and towns across India for all eligible purchases. Certain remote or interior locations may attract additional shipping charges. Customers are requested to provide complete and accurate delivery details, including their full name (as per Government ID), complete delivery address, contact number, and email address. For security purposes, the recipient may be required to present a valid Government-issued photo ID at the time of delivery.'
    },
    {
      id: 2,
      icon: Clock,
      title: '2. Delivery Schedule & Dispatch Timelines',
      text: 'We aim to deliver orders within 7 to 21 working days, subject to product availability, order processing, and manufacturing requirements. Delivery timelines may vary depending on product availability, customization requirements, manufacturing schedules, and the delivery location. In the event of an unforeseen delay, our customer support team will promptly notify you with the revised delivery schedule.',
      bullets: [
        'Delivery timelines commence from the date of dispatch.',
        'Orders are processed only after successful payment authorization and verification.',
        'Estimated delivery schedules may vary due to courier service limitations.'
      ]
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: '3. Shipment & Delivery Verification Procedure',
      text: 'Orders will be delivered only to the shipping address confirmed by the customer. Customers may modify the delivery address before dispatch. Once the shipment has been processed, recipient details cannot be changed. Multiple products under a single order may be packed together. For gift deliveries, recipient signature and valid ID serve as proof of successful delivery.'
    },
    {
      id: 4,
      icon: AlertCircle,
      title: '4. Force Majeure & Unforeseen Events',
      text: 'We shall not be liable for any delay or failure in delivery resulting from circumstances beyond our reasonable control, including natural disasters (floods, earthquakes, storms), war, riots, civil disturbances, government restrictions, transport disruptions, labor disputes, or public health emergencies. Delivery timelines may be extended without liability during such events.'
    },
    {
      id: 5,
      icon: Box,
      title: '5. Damaged or Returned Shipments',
      text: 'If the package appears damaged, tampered with, opened, or compromised at the time of delivery, customers are advised to refuse acceptance and immediately notify our Customer Support team. If delivery attempts fail, shipments may be returned to our Madurai showroom, and re-delivery charges shall apply.'
    },
    {
      id: 6,
      icon: ShieldCheck,
      title: '6. Insured Luxury Packaging',
      text: 'Every jewellery purchase is packed with exceptional care to ensure maximum protection during transit. Our packaging includes secure jewellery boxes, tamper-evident seals, protective cushioning materials, and safe handling procedures throughout dispatch.'
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
                Secure Delivery Across India
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
            >
              Shipping & Transit Policy
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
              At <b>Sri Hari Krishna Nagai Maligai</b>, we are committed to providing secure, reliable, and timely delivery services across India. Every jewellery purchase is handled with the utmost care to ensure that it reaches you safely and in excellent condition.
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

                    {pt.bullets && (
                      <div className="bg-brand-cream/80 p-4 rounded-xl border border-brand-gold/30 space-y-2 pt-2">
                        {pt.bullets.map((b, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs font-bold text-brand-maroon">
                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Point 7: Store Support Full-Width Banner */}
          <div 
            className="bg-gradient-to-r from-[#3B070B] via-[#270406] to-[#3B070B] text-white p-8 md:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-2xl text-left space-y-4 w-full"
          >
            <div className="flex items-center space-x-3 border-b border-brand-gold/20 pb-4">
              <div className="p-3 bg-brand-gold text-brand-maroon rounded-xl font-extrabold text-lg">
                7
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-gold-gradient">
                Customer Support & Shipping Assistance
              </h3>
            </div>
            <p className="text-sm text-brand-cream font-medium font-sans">
              For shipping-related enquiries, shipment tracking assistance, or delivery concerns, please contact our Customer Support Team:
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
