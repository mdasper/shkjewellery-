import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { FileText, ShieldCheck, Scale, Phone, Mail, MapPin, Sparkles, UserCheck, DollarSign, PackageCheck, Award, Lock, ShieldAlert } from 'lucide-react';

export default function Terms() {
  const points = [
    {
      id: 1,
      icon: FileText,
      title: '1. General Usage Terms',
      text: 'By visiting our website, you acknowledge and accept all the terms and policies mentioned here. We may update or modify these Terms & Conditions at any time without prior notice. Continued use of our website means you agree to the updated terms.'
    },
    {
      id: 2,
      icon: UserCheck,
      title: '2. Account Registration & Credentials',
      text: 'To place orders or access certain features, users must create an account. You must provide accurate, complete, and valid information during registration. You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account will be considered your authorized action.'
    },
    {
      id: 3,
      icon: PackageCheck,
      title: '3. Product Info & Visual Representation',
      text: 'We strive to provide accurate descriptions, weights, purity, images, and pricing. However, minor variations may occur due to photography, lighting, or digital display differences. Gold and silver prices are subject to daily market fluctuations.'
    },
    {
      id: 4,
      icon: DollarSign,
      title: '4. Daily Pricing & Payment Modes',
      text: 'Prices displayed on our website are based on the prevailing market rate of gold/silver and may change without notice. Payment must be made through authorized and secure modes provided on the website. We reserve the right to cancel any order in case of pricing errors, technical issues, or suspicious transactions.'
    },
    {
      id: 5,
      icon: ShieldCheck,
      title: '5. Order Confirmation & Custom Orders',
      text: 'Once an order is placed, you will receive a confirmation email/SMS. Orders can be cancelled only before they are processed or shipped. Custom-made jewellery orders cannot be cancelled, as they are made exclusively for you.'
    },
    {
      id: 6,
      icon: PackageCheck,
      title: '6. Shipping & Delivery Terms',
      text: 'Delivery timelines depend on product availability, location, and courier partners. We provide tracking details once the order is dispatched. Any unforeseen delay caused by logistics partners is beyond our control, but we will assist whenever possible.'
    },
    {
      id: 7,
      icon: ShieldCheck,
      title: '7. Return, Replacement & Exchange',
      text: 'Jewellery once sold cannot be returned, except in cases of manufacturing defects. If there is a defect, customers must inform us within 48 hours of delivery. Exchange or buyback is subject to our in-store policies and prevailing gold rates. Engraved or customized products are not eligible for return or exchange.'
    },
    {
      id: 8,
      icon: Award,
      title: '8. Weight, Purity & BIS Certification',
      text: 'All gold and silver products sold by us come with assured purity. Some jewellery items may include hallmarking or certification from authorized agencies. Actual product weight may vary slightly during final billing due to manufacturing tolerances.'
    },
    {
      id: 9,
      icon: Lock,
      title: '9. Intellectual Property Protection',
      text: 'All content on this website—including designs, images, logo, text, product photos, and graphics—belongs to Sri Hari Krishna Nagai Maligai. Unauthorized copying, reproduction, or commercial use is strictly prohibited.'
    },
    {
      id: 10,
      icon: ShieldCheck,
      title: '10. Privacy & Customer Data Protection',
      text: 'We collect personal information such as name, phone number, email, and other data necessary for providing our services. Your data is used to inform you about new jewellery arrivals, offers, promotions, and updates. Your data is protected with strict security protocols.'
    },
    {
      id: 11,
      icon: ShieldAlert,
      title: '11. Limitation of Liability',
      text: 'We are not responsible for any loss, damage, or inconvenience caused by technical issues, delays, or misuse of your account. We reserve the right to refuse service to anyone who violates our policies or engages in fraudulent activity.'
    },
    {
      id: 12,
      icon: Scale,
      title: '12. Governing Law & Jurisdiction',
      text: 'These Terms & Conditions are governed by the laws of India. Any disputes will fall under the exclusive jurisdiction of the courts in Madurai, Tamil Nadu.'
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
                Legal & Usage Agreement
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
            >
              Terms & Conditions
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
              Welcome to <b>Sri Hari Krishna Nagai Maligai</b>. By accessing or using our website, you agree to comply with the following Terms & Conditions. Please read them carefully before using our services.
            </p>
          </div>

          {/* Points Grid with Hover Gold Ring */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
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
                      <h3 className="font-cormorant text-xl font-bold text-brand-maroon">
                        {pt.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                      {pt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Point 13: Official Contact Full-Width Banner */}
          <div 
            className="bg-gradient-to-r from-[#3B070B] via-[#270406] to-[#3B070B] text-white p-8 md:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-2xl text-left space-y-4 w-full"
          >
            <div className="flex items-center space-x-3 border-b border-brand-gold/20 pb-4">
              <div className="p-3 bg-brand-gold text-brand-maroon rounded-xl font-extrabold text-lg">
                13
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-gold-gradient">
                Official Legal Contact Information
              </h3>
            </div>
            <p className="text-sm text-brand-cream font-medium font-sans">
              For any queries regarding Terms & Conditions, please contact us:
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
