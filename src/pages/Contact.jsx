import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Sparkles, Navigation, Calendar, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Bridal Harams & Sets',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Sri Hari Krishna Nagai Maligai,%0A%0AMy Name: ${encodeURIComponent(formData.name)}%0APhone: ${encodeURIComponent(formData.phone)}%0AInterest: ${encodeURIComponent(formData.interest)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://api.whatsapp.com/send?phone=+919865045924&text=${text}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full font-sans text-left">
        
        {/* 100% Full-Width Banner */}
        <section className="py-20 bg-brand-maroon text-white relative overflow-hidden w-full border-b border-brand-gold/30">
          <Floating3DParticles />
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand-maroonLight/80 border border-brand-gold/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-gold-glow">
              <Sparkles size={14} className="text-brand-gold" />
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                {t('contact.badge', 'Madurai Main Showroom • We Are Here To Assist You')}
              </span>
            </div>
            
            <h1 className="font-cormorant text-4xl sm:text-6xl font-extrabold text-white drop-shadow-2xl">
              {t('contact.title', 'Contact Our Showroom')}
            </h1>
            <p className="text-brand-cream font-medium text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
              {t('contact.subtitle', 'Visit our flagship Madurai main showroom, call our expert jewellery team, or send us an instant WhatsApp inquiry directly.')}
            </p>
          </div>
        </section>

        {/* 100% Full-Width Top 4-Card Touchpoint Strip */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            
            {/* Touchpoint 1: Address */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                  <MapPin size={22} />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-maroon pt-1">
                  {t('contact.addressTitle', 'Showroom Address')}
                </h3>
                <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                  {t('contact.addressText', 'South Avani Moola Street, Valaiyal Kadai, Madurai Main, Madurai - 625001, Tamil Nadu.')}
                </p>
              </div>
              <a 
                href="https://maps.google.com/?q=South+Avani+Moola+Street+Madurai" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-cinzel font-bold text-brand-maroon hover:text-brand-gold flex items-center gap-1.5 pt-2 border-t border-brand-gold/20"
              >
                <Navigation size={13} />
                <span>{t('home.heritage.map', 'Get Driving Directions')} →</span>
              </a>
            </div>

            {/* Touchpoint 2: Phone */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                  <Phone size={22} />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-maroon pt-1">
                  {t('contact.phoneTitle', 'Phone Support')}
                </h3>
                <div className="space-y-1 text-xs font-semibold text-[#1A0A0C] font-sans">
                  <a href="tel:+914524395924" className="block hover:text-brand-gold font-bold">Office: +91 452 4395924</a>
                  <a href="tel:+919865045924" className="block hover:text-brand-gold font-bold">Mobile: +91 98650 45924</a>
                </div>
              </div>
              <a 
                href="tel:+919865045924" 
                className="text-xs font-cinzel font-bold text-brand-maroon hover:text-brand-gold flex items-center gap-1.5 pt-2 border-t border-brand-gold/20"
              >
                <span>{t('footer.call', 'Call Showroom Now')} →</span>
              </a>
            </div>

            {/* Touchpoint 3: WhatsApp */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                  <MessageSquare size={22} />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-maroon pt-1">
                  {t('contact.whatsappTitle', 'Instant WhatsApp')}
                </h3>
                <p className="text-xs text-[#1A0A0C] font-semibold font-sans">
                  {t('contact.whatsappText', 'Chat directly with our goldsmith team for custom orders and rate inquiries.')}
                </p>
                <a href="https://api.whatsapp.com/send?phone=+919865045924" target="_blank" rel="noreferrer" className="text-xs font-bold text-brand-maroon hover:text-brand-gold block break-all font-sans">
                  +91 98650 45924
                </a>
              </div>
              <a 
                href="https://api.whatsapp.com/send?phone=+919865045924" 
                target="_blank"
                rel="noreferrer"
                className="text-xs font-cinzel font-bold text-brand-maroon hover:text-brand-gold flex items-center gap-1.5 pt-2 border-t border-brand-gold/20"
              >
                <span>WhatsApp →</span>
              </a>
            </div>

            {/* Touchpoint 4: Hours */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 hover-gold-ring shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow">
                  <Clock size={22} />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-maroon pt-1">
                  {t('contact.hoursTitle', 'Showroom Timings')}
                </h3>
                <p className="text-xs text-[#1A0A0C] font-semibold leading-relaxed font-sans">
                  {t('contact.hoursText', 'Mon - Sun: 10:00 AM - 8:30 PM (All 7 Days Open)')}
                </p>
              </div>
              <div className="text-xs font-cinzel font-bold text-green-700 flex items-center gap-1.5 pt-2 border-t border-brand-gold/20">
                <CheckCircle2 size={14} />
                <span>{t('nav.timing', '10 AM - 8:30 PM')}</span>
              </div>
            </div>

          </div>
        </div>

        {/* 100% Full-Width Split Layout */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Direct Inquiry Form */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border-2 border-brand-gold/30 shadow-2xl space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-1.5 border-b border-brand-gold/20 pb-4">
                <span className="text-xs font-cinzel font-extrabold text-brand-goldDark uppercase tracking-widest block">
                  {t('contact.formTitle', 'Send Us an Inquiry')}
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-extrabold text-brand-maroon">
                  {t('contact.title', 'Contact Our Showroom')}
                </h2>
                <p className="text-xs text-[#1A0A0C] font-semibold font-sans pt-1">
                  {t('contact.formSubtitle', 'Fill in your details below and our team will get back to you immediately on WhatsApp.')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs flex-1 flex flex-col justify-between pt-2">
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-[#1A0A0C] uppercase tracking-wider mb-1.5">
                      {t('contact.nameLabel', 'Your Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.namePlaceholder', 'Enter your full name')}
                      className="w-full bg-[#FAF7F2] border-2 border-brand-gold/30 rounded-xl px-4 py-3 text-[#1A0A0C] font-bold focus:outline-none focus:border-brand-maroon transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A0A0C] uppercase tracking-wider mb-1.5">
                      {t('contact.phoneLabel', 'Phone Number')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact.phonePlaceholder', 'Enter 10-digit mobile number')}
                      className="w-full bg-[#FAF7F2] border-2 border-brand-gold/30 rounded-xl px-4 py-3 text-[#1A0A0C] font-bold focus:outline-none focus:border-brand-maroon transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A0A0C] uppercase tracking-wider mb-1.5">
                      {t('contact.interestLabel', 'Interested In')}
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#FAF7F2] border-2 border-brand-gold/30 rounded-xl px-4 py-3 text-[#1A0A0C] font-bold focus:outline-none focus:border-brand-maroon transition-colors"
                    >
                      <option>{t('contact.opt1', 'Bridal Harams & Sets')}</option>
                      <option>{t('contact.opt2', 'Antique Temple Jewellery')}</option>
                      <option>{t('contact.opt3', 'Gold Chains & Daily Wear')}</option>
                      <option>{t('contact.opt4', 'Bangles & Kadas')}</option>
                      <option>{t('contact.opt5', 'Silver Articles & Utensils')}</option>
                      <option>{t('contact.opt6', 'Gold Savings Scheme')}</option>
                      <option>{t('contact.opt7', 'Old Gold Exchange Rate')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A0A0C] uppercase tracking-wider mb-1.5">
                      {t('contact.messageLabel', 'Your Message / Custom Requirement')}
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.messagePlaceholder', 'Tell us about the jewellery you are looking for...')}
                      className="w-full bg-[#FAF7F2] border-2 border-brand-gold/30 rounded-xl px-4 py-3 text-[#1A0A0C] font-bold focus:outline-none focus:border-brand-maroon transition-colors"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-shimmer w-full bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon text-brand-gold font-cinzel font-extrabold tracking-widest py-4 rounded-xl text-center text-xs uppercase shadow-2xl transition-all flex items-center justify-center space-x-2 hover:text-white mt-4"
                >
                  <Send size={16} />
                  <span>{t('contact.submitBtn', 'Send WhatsApp Inquiry')} →</span>
                </button>
              </form>
            </div>

            {/* Right Column: Interactive Map & Visit Booking Card */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
              
              {/* Map Embed Frame */}
              <div className="bg-white rounded-3xl p-3 border-2 border-brand-gold/30 shadow-2xl overflow-hidden flex-1 min-h-[300px] relative">
                <iframe
                  title="Sri Hari Krishna Nagai Maligai Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d78.1189!3d9.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sSouth+Avani+Moola+St%2C+Madurai+Main%2C+Madurai%2C+Tamil+Nadu+625001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Showroom Visit Booking Action Card */}
              <div className="bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon p-8 rounded-3xl border-2 border-brand-gold/40 shadow-2xl text-white space-y-4 shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold text-brand-maroon flex items-center justify-center font-bold shadow">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                      {t('about.showroomTitle', 'Plan Your Showroom Visit')}
                    </h3>
                    <p className="text-xs text-brand-cream font-medium font-sans">
                      {t('about.showroomDesc', 'Enjoy personalized VIP jewellery assistance at our Madurai main store.')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20want%20to%20book%20a%20VIP%20Showroom%20Visit."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-cinzel font-bold text-xs py-3.5 px-4 rounded-xl text-center shadow-lg flex items-center justify-center space-x-2 uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919865045924"
                    className="bg-brand-gold text-brand-maroon hover:bg-white font-cinzel font-bold text-xs py-3.5 px-4 rounded-xl text-center shadow-lg flex items-center justify-center space-x-2 uppercase tracking-wider transition-colors"
                  >
                    <Phone size={16} />
                    <span>{t('footer.call', 'Call Store')}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}
