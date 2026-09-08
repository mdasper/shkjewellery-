import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { Lock, ShieldCheck, UserCheck, Eye, Phone, Mail, MapPin, Sparkles, Database, Shield, Bell, UserPlus } from 'lucide-react';

export default function Privacy() {
  const points = [
    {
      id: 1,
      icon: UserCheck,
      title: '1. Information We Collect',
      text: 'When you register, place an order, or submit an enquiry through www.sriharikrishnanagaimaligai.com, we may collect your name, mobile number, email address, delivery address, and other information necessary to provide our products and services.'
    },
    {
      id: 2,
      icon: Database,
      title: '2. Use of Personal Information',
      text: 'Your personal information is used to process orders, respond to enquiries, provide customer support, improve our services, and keep you informed about new jewellery collections, festive offers, promotions, and other updates that may be of interest to you.'
    },
    {
      id: 3,
      icon: UserPlus,
      title: '3. Account Registration & Passbook Privacy',
      text: 'Creating an account allows you to place orders, track purchases, manage your profile, and access personalised features on our website. You are responsible for maintaining the confidentiality of your account credentials.'
    },
    {
      id: 4,
      icon: Shield,
      title: '4. Website & Service Improvement',
      text: 'The information you provide helps us improve our website, enhance customer experience, verify transactions, resolve issues efficiently, conduct feedback surveys, and continuously improve the quality of our products and services.'
    },
    {
      id: 5,
      icon: Eye,
      title: '5. Cookies and Technical Data',
      text: 'We may collect technical information such as your IP address, browser type, operating system, and browsing activity to analyse website performance, improve security, prevent fraudulent activity, and provide a better browsing experience.'
    },
    {
      id: 6,
      icon: Lock,
      title: '6. Data Security Protocols',
      text: 'We implement appropriate technical and organisational security measures to protect your personal information from unauthorised access, misuse, alteration, disclosure, or data breaches. Your information is handled using industry-standard security practices.'
    },
    {
      id: 7,
      icon: UserCheck,
      title: '7. Updating Your Profile Information',
      text: 'You may review and update your personal information through your account dashboard or by contacting our customer support team. We encourage customers to keep their information accurate and up to date.'
    },
    {
      id: 8,
      icon: ShieldCheck,
      title: '8. Data Confidentiality Guarantee',
      text: 'Your personal information is kept strictly confidential and is not sold, rented, or shared with third parties except where required by law or necessary to provide our services through trusted business partners.'
    },
    {
      id: 9,
      icon: Bell,
      title: '9. Marketing & Opt-Out Choices',
      text: 'You may receive promotional messages, newsletters, and information about our latest jewellery collections and special offers. You may opt out of these communications at any time by updating your account preferences or contacting customer support.'
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
                Data Protection & Privacy Policy
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
            >
              Privacy Policy
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
              At <b>Sri Hari Krishna Nagai Maligai</b>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit or use our website.
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

          {/* Point 10: Official Contact Full-Width Banner */}
          <div 
            className="bg-gradient-to-r from-[#3B070B] via-[#270406] to-[#3B070B] text-white p-8 md:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-2xl text-left space-y-4 w-full"
          >
            <div className="flex items-center space-x-3 border-b border-brand-gold/20 pb-4">
              <div className="p-3 bg-brand-gold text-brand-maroon rounded-xl font-extrabold text-lg">
                10
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-gold-gradient">
                Contact Information for Privacy Concerns
              </h3>
            </div>
            <p className="text-sm text-brand-cream font-medium font-sans">
              If you have any questions regarding this Privacy Policy or the way your personal information is handled, please contact us:
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
