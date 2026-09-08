import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HeroSlider from '../components/HeroSlider';
import RateCalculator from '../components/RateCalculator';
import InstagramShowcase from '../components/InstagramShowcase';
import PageTransition from '../components/PageTransition';
import OldGoldCalculator from '../components/OldGoldCalculator';
import BridalSetPlanner from '../components/BridalSetPlanner';
import GoldRateAlertModal from '../components/GoldRateAlertModal';
import ShowroomTourModal from '../components/ShowroomTourModal';
import ProductCard3D from '../components/ProductCard3D';
import Quick3DViewerModal from '../components/Quick3DViewerModal';
import VirtualTryOnModal from '../components/VirtualTryOnModal';
import { useWishlist } from '../context/WishlistContext';
import { 
  Sparkles, ArrowRight, ShieldCheck, Award, Heart, Star, 
  MapPin, Phone, MessageCircle, CheckCircle2, Clock, Crown, ExternalLink,
  Scale, RefreshCw, Bell, Video, Camera, PiggyBank, QrCode, Smartphone, Download
} from 'lucide-react';

const categoryTabs = ['All', 'Antique', 'Bridal Special', 'Gold', 'Silver'];

export default function Home() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('All');
  const [isOldGoldOpen, setIsOldGoldOpen] = useState(false);
  const [isBridalPlannerOpen, setIsBridalPlannerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [selected3DProduct, setSelected3DProduct] = useState(null);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selectedARProduct, setSelectedARProduct] = useState(null);
  const [isARModalOpen, setIsARModalOpen] = useState(false);

  const allCategoryItems = [
    {
      title: t('home.items.item1_title', 'Antique & Temple Jewelry'),
      subtitle: t('home.items.item1_sub', 'Divine Karigari from Madurai Master Craftsmen with sacred motifs'),
      image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/Bbajh9KH6AfXRx9LiuYPtjiI3xH2H1L6NeeXFUpe.jpg',
      category: 'Antique',
      categoryLabel: t('home.collections.antique', 'Antique'),
      path: '/collections/necklace',
      purity: '22K 916',
      estWeight: '32g - 80g'
    },
    {
      title: t('home.items.item2_title', 'Grand Bridal Harams & Sets'),
      subtitle: t('home.items.item2_sub', 'Make your wedding day timeless with pure 916 Gold heritage sets'),
      image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/ZyMnbtyNilXJevemEjA4xEghzDvVGrZxwodc1lBZ.jpg',
      category: 'Bridal Special',
      categoryLabel: t('home.collections.bridalSpecial', 'Bridal Special'),
      path: '/collections/necklace',
      purity: 'BIS 916',
      estWeight: '40g - 120g'
    },
    {
      title: t('home.items.item3_title', 'Fancy Bangles & Gada'),
      subtitle: t('home.items.item3_sub', 'Daily wear, Calcutta filigree mesh, and antique casting bangles'),
      image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/vbL0V2yRl7uM3ObAOcraN9pszUsVXqIZeIRWCzJI.jpg',
      category: 'Gold',
      categoryLabel: t('home.collections.gold', 'Gold'),
      path: '/collections/bangles',
      purity: '22K 916',
      estWeight: '16g - 48g'
    },
    {
      title: t('home.items.item4_title', 'Pure 92.5 Silver Articles'),
      subtitle: t('home.items.item4_sub', 'Auspicious puja vessels, kunguma chimizh, lamps, and divine gifts'),
      image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/8pRS3R1oHYpju6Inb8BBfV3Lb7ln7xZBemCYN8dP.jpg',
      category: 'Silver',
      categoryLabel: t('home.collections.silver', 'Silver'),
      path: '/collections/gift-items',
      purity: '92.5 Silver',
      estWeight: '50g - 500g'
    }
  ];

  const customerReviews = [
    {
      quote: t('home.testimonials.q1', "Bought our daughter's bridal haram from Sri Hari Krishna Nagai Maligai. The gold finishing and temple karigari details are breathtaking! Best showroom in Valaiyal Kadai."),
      author: t('home.testimonials.a1', "Meenakshi Sundaram"),
      loc: t('home.testimonials.l1', "Madurai Main"),
      item: t('home.testimonials.i1', "Bridal Antique Set"),
      rating: 5
    },
    {
      quote: t('home.testimonials.q2', "Their Digi Gold chit scheme is extremely trustworthy. I saved every month easily and the bonus benefit saved us making charges during Akshaya Tritiya!"),
      author: t('home.testimonials.a2', "Anand & Priya"),
      loc: t('home.testimonials.l2', "Theni"),
      item: t('home.testimonials.i2', "Digi Gold Scheme"),
      rating: 5
    },
    {
      quote: t('home.testimonials.q3', "Honest daily gold rate estimation and genuine 916 hallmarked items. No hidden costs. They weighed our old gold transparently with laser testing."),
      author: t('home.testimonials.a3', "Kannan R."),
      loc: t('home.testimonials.l3', "Dindigul"),
      item: t('home.testimonials.i3', "Gold Exchange & Bangles"),
      rating: 5
    }
  ];

  const filteredItems = activeTab === 'All' 
    ? allCategoryItems 
    : allCategoryItems.filter(item => item.category === activeTab);

  return (
    <PageTransition>
      <div className="bg-brand-cream font-sans overflow-x-hidden w-full">
        
        {/* 1. 8K HD Hero Carousel Banner with Royal Trust Strip */}
        <HeroSlider />

        {/* 2. Royal Showroom Concierge & Interactive Services Bar */}
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="py-8 bg-gradient-to-r from-[#200305] via-[#35070B] to-[#200305] border-b border-brand-gold/30 w-full text-white">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* Tool 1: {t('home.services.oldGold', 'Old Gold Exchange')} */}
              <button
                onClick={() => setIsOldGoldOpen(true)}
                className="p-3.5 rounded-2xl bg-black/40 border border-brand-gold/30 hover:border-brand-gold hover:bg-white/5 transition-all text-left group shadow-lg flex items-center space-x-3"
              >
                <div className="p-2.5 rounded-xl bg-brand-gold text-brand-maroon shadow shrink-0 group-hover:scale-110 transition-transform">
                  <RefreshCw size={18} />
                </div>
                <div>
                  <span className="font-cinzel text-xs font-bold text-brand-gold uppercase tracking-wider block truncate">
                    {t('home.services.oldGold', 'Old Gold Exchange')}
                  </span>
                  <span className="text-[10px] text-brand-cream/80 font-sans block truncate">
                    Laser Karatmeter â†’
                  </span>
                </div>
              </button>

              {/* Tool 2: Bridal Set Planner */}
              <button
                onClick={() => setIsBridalPlannerOpen(true)}
                className="p-3.5 rounded-2xl bg-black/40 border border-brand-gold/30 hover:border-brand-gold hover:bg-white/5 transition-all text-left group shadow-lg flex items-center space-x-3"
              >
                <div className="p-2.5 rounded-xl bg-brand-gold text-brand-maroon shadow shrink-0 group-hover:scale-110 transition-transform">
                  <Crown size={18} />
                </div>
                <div>
                  <span className="font-cinzel text-xs font-bold text-brand-gold uppercase tracking-wider block truncate">
                    {t('home.services.bridalPlanner', 'Bridal Planner')}
                  </span>
                  <span className="text-[10px] text-brand-cream/80 font-sans block truncate">
                    Sovereign Budget â†’
                  </span>
                </div>
              </button>

              {/* Tool 3: Gold {t('home.services.rateAlerts', 'Rate Alerts')} */}
              <button
                onClick={() => setIsAlertOpen(true)}
                className="p-3.5 rounded-2xl bg-black/40 border border-brand-gold/30 hover:border-brand-gold hover:bg-white/5 transition-all text-left group shadow-lg flex items-center space-x-3"
              >
                <div className="p-2.5 rounded-xl bg-brand-gold text-brand-maroon shadow shrink-0 group-hover:scale-110 transition-transform">
                  <Bell size={18} />
                </div>
                <div>
                  <span className="font-cinzel text-xs font-bold text-brand-gold uppercase tracking-wider block truncate">
                    {t('home.services.rateAlerts', 'Rate Alerts')}
                  </span>
                  <span className="text-[10px] text-brand-cream/80 font-sans block truncate">
                    Daily Drops â†’
                  </span>
                </div>
              </button>

              {/* Tool 5: Virtual {t('home.services.showroomTour', 'Showroom Tour')} */}
              <button
                onClick={() => setIsTourOpen(true)}
                className="p-3.5 rounded-2xl bg-black/40 border border-brand-gold/30 hover:border-brand-gold hover:bg-white/5 transition-all text-left group shadow-lg flex items-center space-x-3"
              >
                <div className="p-2.5 rounded-xl bg-brand-gold text-brand-maroon shadow shrink-0 group-hover:scale-110 transition-transform">
                  <Video size={18} />
                </div>
                <div>
                  <span className="font-cinzel text-xs font-bold text-brand-gold uppercase tracking-wider block truncate">
                    {t('home.services.showroomTour', 'Showroom Tour')}
                  </span>
                  <span className="text-[10px] text-brand-cream/80 font-sans block truncate">
                    Madurai Heritage â†’
                  </span>
                </div>
              </button>

            </div>
          </div>
        </motion.section>

        {/* 3. Today's Rate & 3D Glassmorphism Rate Calculator (100% Full-Width) */}
        <RateCalculator />


                {/* NEW NATIVE SECTION: Mobile App Promo */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-50px" }} 
          transition={{ duration: 0.6 }} 
          className="py-16 bg-gradient-to-b from-[#2A0508] via-[#1A0305] to-[#2A0508] border-b border-brand-gold/30 w-full text-white relative overflow-hidden"
        >
          {/* Background subtle glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Content */}
              <div className="space-y-8 text-left lg:pr-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-4 py-1.5 rounded-full font-cinzel font-black uppercase tracking-widest text-xs shadow-gold-glow">
                    <Sparkles size={14} className="animate-pulse" />
                    <span>{t('home.digiGold.badge', 'NEW LAUNCH')}</span>
                  </div>
                  
                  <h2 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">
                    {t('home.digiGold.title1', 'MOBILE APP')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark">{t('home.digiGold.title2', 'DIGI GOLD')}</span>
                  </h2>
                  <p className="text-brand-cream/90 text-lg sm:text-xl font-sans tracking-wide">
                    {t('home.digiGold.subtitle', 'Smart Gold Savings. Anytime. Anywhere.')}
                  </p>
                </div>

                {/* 4 Features Grid */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-gold/20">
                  <div className="flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                      <Award size={24} />
                    </div>
                    <span className="font-cinzel font-bold text-sm text-brand-gold tracking-wide">{t('home.digiGold.f1_title', '916 Hallmarked')}</span>
                    <span className="text-xs text-brand-cream/70 font-sans">{t('home.digiGold.f1_sub', 'HUID Jewellery')}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-cinzel font-bold text-sm text-brand-gold tracking-wide">{t('home.digiGold.f2_title', 'Secure & Trusted')}</span>
                    <span className="text-xs text-brand-cream/70 font-sans">{t('home.digiGold.f2_sub', 'Bank-grade Security')}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                      <PiggyBank size={24} />
                    </div>
                    <span className="font-cinzel font-bold text-sm text-brand-gold tracking-wide">{t('home.digiGold.f3_title', 'Save Any Time')}</span>
                    <span className="text-xs text-brand-cream/70 font-sans">{t('home.digiGold.f3_sub', 'Flexible Instalments')}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                      <Smartphone size={24} />
                    </div>
                    <span className="font-cinzel font-bold text-sm text-brand-gold tracking-wide">{t('home.digiGold.f4_title', 'Easy Digital')}</span>
                    <span className="text-xs text-brand-cream/70 font-sans">{t('home.digiGold.f4_sub', 'Instant Transactions')}</span>
                  </div>
                </div>

                {/* Call to Action Actions */}
                <div className="pt-6 flex flex-wrap items-center gap-6">
                  <div className="bg-white p-2 rounded-xl flex items-center space-x-4 shadow-2xl">
                    <QrCode size={50} className="text-brand-maroon" />
                    <div className="pr-4">
                      <span className="block font-cinzel font-bold text-brand-maroon text-sm uppercase">{t('home.digiGold.scan', 'Scan To')}</span>
                      <span className="block font-cinzel font-bold text-brand-maroon text-lg uppercase">{t('home.digiGold.getStarted', 'Get Started')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <button className="flex items-center space-x-2 bg-black/60 border border-white/20 hover:border-brand-gold text-white px-5 py-2.5 rounded-lg transition-colors">
                      <Download size={18} />
                      <div className="text-left">
                        <span className="block text-[9px] uppercase tracking-wider text-brand-cream/70">{t('home.digiGold.getItOn', 'GET IT ON')}</span>
                        <span className="block text-sm font-bold tracking-wide">Google Play</span>
                      </div>
                    </button>
                    <button className="flex items-center space-x-2 bg-black/60 border border-white/20 hover:border-brand-gold text-white px-5 py-2.5 rounded-lg transition-colors">
                      <Download size={18} />
                      <div className="text-left">
                        <span className="block text-[9px] uppercase tracking-wider text-brand-cream/70">{t('home.digiGold.download', 'Download on the')}</span>
                        <span className="block text-sm font-bold tracking-wide">App Store</span>
                      </div>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Content - Visual Image (Full uncropped image as requested) */}
              <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full max-w-2xl xl:max-w-3xl"
                >
                  <img 
                    src="/assets/images/user_digi_gold_banner.jpg" 
                    alt="Digi Gold App Banner" 
                    className="w-full h-auto object-contain rounded-xl shadow-2xl shadow-brand-gold/20 border-2 border-brand-gold/30"
                  />
                  {/* Subtle glare effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-xl"></div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.section>

{/* 4. Section: Gold Standards & Purity Verification (100% Full-Width) */}
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5ECE0] to-[#FAF7F2] text-[#1A0A0C] border-b border-brand-gold/30 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <span className="text-brand-goldDark font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Crown size={14} className="text-brand-goldDark" /> {t('home.standards.badge', 'Sacred Hallmarking Standards')}
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-brand-maroon leading-tight">
                {t('home.purity.guaranteeTitle', 'Purity Guaranteed at Every Carat')}
              </h2>
              <p className="text-[#3A1A1E] font-medium text-sm sm:text-base font-sans leading-relaxed">
                {t('home.purity.guaranteeDesc', 'Every jewel at Sri Hari Krishna Nagai Maligai undergoes rigorous BIS testing and 6-digit HUID laser hallmarking for unquestionable purity.')}
              </p>
            </div>

            {/* 3 Purity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
              
              {/* 24K Pure Bullion */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border-2 border-brand-gold/40 p-8 space-y-4 shadow-xl relative overflow-hidden group hover:border-brand-gold hover:shadow-2xl transition-all"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-gold/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center space-x-3 text-brand-maroon">
                  <div className="p-3.5 bg-gradient-to-br from-brand-goldDark to-brand-gold text-brand-maroon rounded-2xl shadow-md shrink-0 font-bold">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <span className="font-cinzel font-extrabold text-lg tracking-wider uppercase text-brand-maroon block">
                      {t('home.purity.b24k', '24K Pure Gold')}
                    </span>
                    <span className="text-[11px] font-sans font-bold text-brand-goldDark uppercase">
                      {t('home.purity.b24kTag', '99.9% Investment Bullion')}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#3A1A1E] font-medium leading-relaxed font-sans pt-1">
                  {t('home.purity.b24kDesc', 'Minted bullion bars and coins certified 99.9% pure. Ideal for sovereign wealth, digital gold savings, and wedding gift coin reserves.')}
                </p>
                <div className="pt-3 border-t border-brand-gold/20 flex items-center justify-between text-xs font-cinzel font-bold text-brand-maroon">
                  <span>{t('home.purity.zeroImpurities', 'Zero Impurities')}</span>
                  <span className="text-brand-goldDark">{t('home.purity.bis999', 'BIS Certified 999')}</span>
                </div>
              </motion.div>

              {/* 22K 916 Hallmark Standard */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-b from-[#FFFDF9] to-[#FBF4E8] rounded-3xl border-2 border-brand-gold p-8 space-y-4 shadow-2xl relative overflow-hidden group hover:shadow-gold-glow transition-all ring-2 ring-brand-gold/30"
              >
                <div className="absolute -top-3 right-6 bg-brand-maroon text-brand-gold text-[10px] font-cinzel font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow">
                  {t('home.purity.showroomStandard', 'Showroom Standard')}
                </div>
                <div className="flex items-center space-x-3 text-brand-maroon">
                  <div className="p-3.5 bg-brand-maroon text-brand-gold rounded-2xl shadow-md shrink-0">
                    <Award size={26} />
                  </div>
                  <div>
                    <span className="font-cinzel font-extrabold text-lg tracking-wider uppercase text-brand-maroon block">
                      {t('home.purity.b22k', '22K 916 Hallmark')}
                    </span>
                    <span className="text-[11px] font-sans font-bold text-brand-goldDark uppercase">
                      {t('home.purity.b22kTag', 'Traditional Sacred Standard')}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#3A1A1E] font-medium leading-relaxed font-sans pt-1">
                  {t('home.purity.b22kDesc', 'The quintessential benchmark for traditional South Indian bridal harams, casting bangles, ottiyanams, and auspicious wedding jewellery.')}
                </p>
                <div className="pt-3 border-t border-brand-gold/20 flex items-center justify-between text-xs font-cinzel font-bold text-brand-maroon">
                  <span>{t('home.purity.huidEncoded', 'HUID Laser Encoded')}</span>
                  <span className="text-brand-goldDark">{t('home.purity.exchangeValue', '100% Exchange Value')}</span>
                </div>
              </motion.div>

              {/* 18K Designer Gold */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border-2 border-brand-gold/40 p-8 space-y-4 shadow-xl relative overflow-hidden group hover:border-brand-gold hover:shadow-2xl transition-all"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-gold/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center space-x-3 text-brand-maroon">
                  <div className="p-3.5 bg-gradient-to-br from-brand-goldDark to-brand-gold text-brand-maroon rounded-2xl shadow-md shrink-0">
                    <Heart size={26} />
                  </div>
                  <div>
                    <span className="font-cinzel font-extrabold text-lg tracking-wider uppercase text-brand-maroon block">
                      {t('home.purity.b18k', '18K Designer Gold')}
                    </span>
                    <span className="text-[11px] font-sans font-bold text-brand-goldDark uppercase">
                      {t('home.purity.b18kTag', '750 Purity • Gemstones')}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#3A1A1E] font-medium leading-relaxed font-sans pt-1">
                  {t('home.purity.b18kDesc', 'Engineered with enhanced durability for gemstone jewelry, modern diamond rings, daily office wear chains, and lightweight festive earrings.')}
                </p>
                <div className="pt-3 border-t border-brand-gold/20 flex items-center justify-between text-xs font-cinzel font-bold text-brand-maroon">
                  <span>{t('home.purity.highDurability', 'High Durability')}</span>
                  <span className="text-brand-goldDark">{t('home.purity.hallmarked750', '750 Hallmarked')}</span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* 4. Featured Collections Showcase with Interactive Filter Tabs (100% Full-Width) */}
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="py-20 bg-gradient-to-b from-[#2C0508] via-[#1E0305] to-[#2C0508] text-white relative border-b border-brand-gold/30 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-brand-gold" /> Master Crafted in Madurai
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
                {t('home.collections.title')}
              </h2>
              <p className="text-brand-cream font-medium text-sm font-sans">
                {t('home.collections.subtitle')}
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 relative ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon shadow-gold-glow scale-105 font-extrabold' 
                      : 'bg-black/40 hover:bg-black/60 text-brand-cream/90 border border-brand-gold/30 hover:border-brand-gold'
                  }`}
                >
                  {tab === 'All' ? t('collections.tabs.all', 'All Collections') : (tab === 'Antique' ? t('home.collections.antique', 'Antique') : (tab === 'Bridal Special' ? t('home.collections.bridalSpecial', 'Bridal Special') : (tab === 'Gold' ? t('home.collections.gold', 'Gold') : t('home.collections.silver', 'Silver'))))}
                </button>
              ))}
            </div>

            {/* Collections Grid with 3D Tilt & Specular Glint Cards */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            >
              <AnimatePresence>
                {filteredItems.map((cat, idx) => (
                  <ProductCard3D
                    key={cat.title || idx}
                    item={cat}
                    onOpen3DModal={(item) => {
                      setSelected3DProduct(item);
                      setIs3DModalOpen(true);
                    }}
                    onOpenAR={(item) => {
                      setSelectedARProduct(item);
                      setIsARModalOpen(true);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Catalog Button */}
            <div className="mt-14 text-center">
              <Link 
                to="/collections"
                className="btn-shimmer inline-flex items-center space-x-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-10 py-4 rounded-xl font-cinzel text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
              >
                <span>{t('home.collections.viewCatalog')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            </div>
        </motion.section>

        {/* 5. Madurai Heritage & Craftsmanship Story (100% Full-Width) */}
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4EBE0] to-[#FAF7F2] text-[#1A0A0C] border-b border-brand-gold/30 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-brand-gold/20 text-brand-maroon px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-gold/40">
                  <MapPin size={15} className="text-brand-goldDark" />
                  <span>{t('home.heritage.tag', 'Madurai Heritage • Valaiyal Kadai Street')}</span>
                </div>

                <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-brand-maroon leading-tight">
                  {t('home.heritage.title')}
                </h2>

                <p className="text-[#3A1A1E] font-medium text-sm sm:text-base leading-relaxed font-sans">
                  {t('home.heritage.desc')}
                </p>

                {/* Stat Cards Grid with 3D Hover Lift */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-gold/30">
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="text-center bg-white p-5 rounded-2xl border-2 border-brand-gold/40 shadow-lg cursor-default"
                  >
                    <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-brand-maroon block">100%</span>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-brand-goldDark font-sans mt-1 block">BIS 916 Hallmark</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="text-center bg-white p-5 rounded-2xl border-2 border-brand-gold/40 shadow-lg cursor-default"
                  >
                    <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-brand-maroon block">25+</span>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-brand-goldDark font-sans mt-1 block">{t('home.testimonials.yearsTrust', 'Years of Trust')}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="text-center bg-white p-5 rounded-2xl border-2 border-brand-gold/40 shadow-lg cursor-default"
                  >
                    <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-brand-maroon block">10K+</span>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-brand-goldDark font-sans mt-1 block">{t('home.testimonials.happyFamilies', 'Happy Families')}</span>
                  </motion.div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link 
                    to="/about"
                    className="btn-shimmer inline-block bg-brand-maroon text-brand-gold hover:bg-brand-maroonLight px-8 py-4 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl"
                  >
                    {t('home.heritage.btn', 'Discover Our Full Heritage →')}</Link>

                  <a 
                    href="https://maps.app.goo.gl/uXf3qPz9mZJzK4PcA"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 border-2 border-brand-gold/60 hover:border-brand-gold text-brand-maroon px-6 py-4 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all bg-white/60 hover:bg-white shadow"
                  >
                    <ExternalLink size={15} />
                    <span>{t('home.heritage.map')}</span>
                  </a>
                </div>
              </div>

              {/* Decorative Visual Showcase Frame */}
              <div className="lg:col-span-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-4 sm:p-6 border-2 border-brand-gold/50 rounded-3xl bg-white shadow-2xl"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-black">
                    <img 
                      src="/assets/images/hero_bridal_set.jpg" 
                      alt="Madurai Gold Jewellery Artistry"
                      className="w-full h-full object-cover filter brightness-95"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="font-cinzel text-brand-gold text-xs font-bold uppercase tracking-widest block">
                        Madurai Valaiyal Kadai Heritage
                      </span>
                      <h4 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mt-1">
                        South Indian Temple & Bridal Masterpieces
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Instagram Reels & Trending Posts Showcase (100% Full-Width) */}
        <InstagramShowcase />

        {/* 7. Customer Testimonials with 5 Gold Stars (100% Full-Width) */}
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="py-20 bg-gradient-to-b from-[#2B0508] via-[#1E0305] to-[#2B0508] text-white relative w-full border-b border-brand-gold/30">
          <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
            
            <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">
                {t('home.testimonials.trusted')}
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-white drop-shadow-2xl">
                {t('home.testimonials.title')}
              </h2>
              <p className="text-brand-cream font-medium text-xs sm:text-sm font-sans">
                {t('home.testimonials.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
              {customerReviews.map((rev, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-b from-[#3E070B] to-[#200305] p-8 rounded-3xl border-2 border-brand-gold/35 hover:border-brand-gold hover:shadow-gold-glow space-y-4 relative transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex text-brand-gold space-x-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="bg-black/60 text-brand-gold text-[9px] font-cinzel font-bold px-2.5 py-0.5 rounded-full border border-brand-gold/30">{t('home.testimonials.verifiedBuyer', 'Verified Buyer')}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-cream/90 font-medium italic leading-relaxed font-sans">
                    "{rev.quote}"
                  </p>

                  <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between">
                    <div>
                      <span className="font-cormorant text-lg sm:text-xl font-bold text-gold-gradient block leading-tight">
                        {rev.author}
                      </span>
                      <span className="text-[10px] text-brand-cream/70 uppercase tracking-widest font-sans">
                        {rev.loc}
                      </span>
                    </div>
                    <span className="text-[10px] font-sans text-brand-gold font-semibold">
                      {rev.item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* 4 Grand Interactive Modals */}
        <OldGoldCalculator isOpen={isOldGoldOpen} onClose={() => setIsOldGoldOpen(false)} />
        <BridalSetPlanner isOpen={isBridalPlannerOpen} onClose={() => setIsBridalPlannerOpen(false)} />
        <GoldRateAlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
        <ShowroomTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

        {/* 360° Real-Time 3D Model Inspector Modal */}
        <Quick3DViewerModal
          isOpen={is3DModalOpen}
          onClose={() => setIs3DModalOpen(false)}
          product={selected3DProduct}
          onOpenAR={(prod) => {
            setSelectedARProduct(prod);
            setIsARModalOpen(true);
          }}
        />

        {/* Live Camera AR Try-On Modal */}
        <VirtualTryOnModal
          isOpen={isARModalOpen}
          onClose={() => setIsARModalOpen(false)}
          initialProduct={selectedARProduct}
        />

      </div>
    </PageTransition>
  );
}

