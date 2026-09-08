import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ChevronDown, Menu, X, Clock, MapPin, LogIn, UserPlus, Lock, Globe, TrendingUp, 
  MessageSquare, Crown, Sparkles, Phone, User, BookOpen, ShieldCheck, CheckCircle2, Camera 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoldRates } from '../context/GoldRatesContext';
import { useTranslation } from 'react-i18next';
import GoldRateAlertModal from './GoldRateAlertModal';

export default function Navbar() {
  const { rates } = useGoldRates();
  const { t, i18n } = useTranslation();
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collectionsList = [
    { name: t('collections.categories.necklace', 'Necklaces & Harams'), path: '/collections/necklace' },
    { name: t('collections.categories.bangles', 'Bangles & Kada'), path: '/collections/bangles' },
    { name: t('collections.categories.earring', 'Earrings & Jhumkas'), path: '/collections/earring' },
    { name: t('collections.categories.pendant', 'Pendants & Dollars'), path: '/collections/pendant' },
    { name: t('collections.categories.rings', 'Rings'), path: '/collections/rings' },
    { name: t('collections.categories.chain', 'Rope & Fancy Chains'), path: '/collections/chain' },
    { name: t('collections.categories.gift-items', 'Silver Puja Articles'), path: '/collections/gift-items' }
  ];

  const activeStyle = ({ isActive }) => 
    `transition-all duration-300 font-semibold tracking-wider text-sm relative py-1 ${
      isActive 
        ? 'text-brand-gold font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-gold' 
        : 'text-brand-cream hover:text-brand-gold'
    }`;

  const rate24kFormatted = rates['24K']?.toLocaleString('en-IN') || '15,824';
  const rate22kFormatted = rates['22K']?.toLocaleString('en-IN') || '14,505';
  const rate18kFormatted = rates['18K']?.toLocaleString('en-IN') || '11,870';
  const rateSilverFormatted = rates['silver']?.toLocaleString('en-IN') || '260';

  return (
    <header className="w-full relative z-50">
      {/* 1. 100% Full-Width Edge-To-Edge Header Live Rates Ticker */}
      <div className="bg-[#270406] text-brand-cream text-xs py-2 border-b border-brand-gold/30 shadow-md w-full overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex justify-between items-center text-[10px] md:text-xs">
          
          {/* Ticker Track Container */}
          <div className="flex items-center space-x-4 w-full overflow-hidden whitespace-nowrap">
            {/* Live Indicator Pill */}
            <button onClick={() => setIsChartModalOpen(true)} className="bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-3.5 py-1 rounded-full font-cinzel font-black uppercase tracking-widest text-[10px] shadow-md shrink-0 flex items-center gap-2 border border-brand-goldLight z-10 hover:scale-105 transition-transform cursor-pointer" title={t('nav.viewPriceGraph')}><TrendingUp size={12} className="animate-pulse" /><span>{t('nav.liveRates')}</span></button>
            
            <div className="overflow-hidden relative w-full flex">
              {/* Marquee Wrapper */}
              <div className="animate-ticker-wrapper font-sans font-medium text-brand-cream tracking-wide">
                
                {/* Track 1 */}
                <div className="inline-flex items-center space-x-6 shrink-0 pr-6">
                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    24K (99.9%): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate24kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    22K (BIS 916): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate22kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    18K (750): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate18kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    92.5: <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rateSilverFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span className="text-brand-cream/90 font-sans font-semibold tracking-wider text-[11px]">
                    {t('nav.showroom')}
                  </span>
                </div>

                {/* Track 2 */}
                <div className="inline-flex items-center space-x-6 shrink-0 pr-6" aria-hidden="true">
                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    24K (99.9%): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate24kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    22K (BIS 916): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate22kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    18K (750): <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rate18kFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span>
                    92.5: <b className="text-brand-goldLight font-bold font-cormorant text-sm">₹{rateSilverFormatted} / g</b>
                  </span>

                  <span className="font-cinzel text-brand-gold font-extrabold text-[10px]">◆</span>
                  <span className="text-brand-cream/90 font-sans font-semibold tracking-wider text-[11px]">
                    {t('nav.showroom')}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Location & Operating Hours */}
          <div className="hidden xl:flex items-center space-x-4 ml-6 shrink-0 text-brand-cream/90 text-[11px]">
            <span className="flex items-center"><Clock size={12} className="mr-1 text-brand-gold" /> {t('nav.timing')}</span>
            <a 
              href="https://maps.google.com/?q=Sri+Hari+Krishna+Nagai+Maligai+Madurai" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center hover:text-brand-gold transition-colors font-semibold"
            >
              <MapPin size={12} className="mr-1 text-brand-gold" />
              <span>{t('nav.showroom')}</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <nav className={`w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-maroon/95 backdrop-blur-md shadow-2xl py-3' 
          : 'bg-brand-maroon py-3.5'
      } border-b border-brand-gold/25`}>
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* Crisp Official Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="https://sriharikrishnanagaimaligai.com/public/front_assets/images/logo-r.png" 
                alt="Sri Hari Krishna Nagai Maligai" 
                className="h-12 md:h-14 w-auto object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={activeStyle}>{t('nav.home')}</NavLink>
              <NavLink to="/about" className={activeStyle}>{t('nav.about', 'About Us')}</NavLink>
              
              {/* Dropdown for Collections */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
              >
                <NavLink 
                  to="/collections" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 py-1 font-semibold tracking-wider text-sm transition-colors ${
                      isActive ? 'text-brand-gold font-bold' : 'text-brand-cream hover:text-brand-gold'
                    }`
                  }
                >
                  <span>{t('nav.collections')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isCollectionsDropdownOpen ? 'rotate-180 text-brand-gold' : ''}`} />
                </NavLink>

                {isCollectionsDropdownOpen && (
                  <div className="absolute left-0 mt-0 w-60 bg-brand-maroon/95 backdrop-blur-md border border-brand-gold/30 rounded-lg shadow-2xl py-2 z-50">
                    <Link
                      to="/collections"
                      className="block px-4 py-2 text-xs font-cinzel font-bold text-brand-gold uppercase tracking-wider hover:bg-brand-gold/10 border-b border-brand-gold/10"
                    >
                      {t('collections.categories.all', 'View All Collections')} →
                    </Link>
                    {collectionsList.map((item, idx) => (
                      <Link 
                        key={idx} 
                        to={item.path}
                        className="block px-4 py-2.5 text-xs text-brand-cream hover:bg-brand-gold/15 hover:text-brand-goldLight transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/savings-schemes" className={activeStyle}>{t('nav.savingsSchemes')}</NavLink>
              <NavLink to="/contact" className={activeStyle}>{t('nav.contact')}</NavLink>
            </div>

            {/* User Account Login & Register Header Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="relative group cursor-pointer mr-2">
                <div className="flex items-center space-x-1 text-brand-cream hover:text-brand-gold transition-colors text-xs font-semibold uppercase tracking-wider">
                  <Globe size={14} />
                  <span>{i18n.language === 'ta' ? 'தமிழ்' : 'EN'}</span>
                  <ChevronDown size={12} />
                </div>
                <div className="absolute top-full left-0 mt-2 w-24 bg-brand-maroon border border-brand-gold/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button onClick={() => i18n.changeLanguage('en')} className="block w-full text-left px-4 py-2 text-xs text-brand-cream hover:bg-brand-gold/10 hover:text-brand-gold">English</button>
                  <button onClick={() => i18n.changeLanguage('ta')} className="block w-full text-left px-4 py-2 text-xs text-brand-cream hover:bg-brand-gold/10 hover:text-brand-gold">தமிழ்</button>
                </div>
              </div>

              <Link 
                to="/login"
                className="flex items-center space-x-1.5 text-brand-gold hover:text-white transition-colors bg-brand-maroonLight/60 hover:bg-brand-maroonLight border border-brand-gold/40 px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel tracking-wider"
              >
                <Lock size={13} className="text-brand-gold" />
                <span>{t('nav.login')}</span>
              </Link>

              <Link 
                to="/register"
                className="flex items-center space-x-1.5 text-brand-maroon bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldLight hover:to-brand-gold px-3.5 py-1.5 rounded-full text-xs font-bold font-cinzel tracking-wider shadow-md hover:scale-105 transition-transform"
              >
                <UserPlus size={13} />
                <span>{t('nav.register')}</span>
              </Link>

              {/* Quick WhatsApp */}
              <a 
                href="https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20visited%20your%20website." 
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center p-2 rounded-full transition-transform hover:scale-105 shadow-md"
                title="WhatsApp Us"
              >
                <MessageSquare size={16} />
              </a>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-cream hover:text-brand-gold focus:outline-none p-1"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-maroon border-t border-brand-gold/20 px-5 pt-4 pb-6 space-y-3 shadow-2xl">
            <NavLink to="/" className="block text-brand-cream hover:text-brand-gold text-base font-semibold py-2 border-b border-brand-gold/10">
              {t('nav.home')}
            </NavLink>
            <NavLink to="/about" className="block text-brand-cream hover:text-brand-gold text-base font-semibold py-2 border-b border-brand-gold/10">
              {t('nav.about', 'About Us')}
            </NavLink>
            <NavLink to="/collections" className="block text-brand-gold font-bold text-base py-2 border-b border-brand-gold/10">
              {t('nav.collections')}
            </NavLink>
            <NavLink to="/savings-schemes" className="block text-brand-cream hover:text-brand-gold text-base font-semibold py-2 border-b border-brand-gold/10">
              {t('nav.savingsSchemes')}
            </NavLink>
            <NavLink to="/contact" className="block text-brand-cream hover:text-brand-gold text-base font-semibold py-2 border-b border-brand-gold/10">
              {t('nav.contact')}
            </NavLink>

            {/* Language Switcher Mobile */}
            <div className="flex items-center justify-between py-2 border-b border-brand-gold/10 text-xs text-brand-cream">
              <span>{t('nav.language', 'Language')}</span>
              <div className="flex space-x-2">
                <button onClick={() => i18n.changeLanguage('en')} className={`px-2.5 py-1 rounded text-xs ${i18n.language === 'en' ? 'bg-brand-gold text-brand-maroon font-bold' : 'bg-black/40 text-brand-cream'}`}>English</button>
                <button onClick={() => i18n.changeLanguage('ta')} className={`px-2.5 py-1 rounded text-xs ${i18n.language === 'ta' ? 'bg-brand-gold text-brand-maroon font-bold' : 'bg-black/40 text-brand-cream'}`}>தமிழ்</button>
              </div>
            </div>

            {/* Mobile Login & Register Actions */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-maroonLight text-brand-gold border border-brand-gold/40 py-2.5 rounded font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5"
              >
                <LogIn size={14} />
                <span>{t('nav.memberLogin')}</span>
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-gold text-brand-maroon font-cinzel font-bold py-2.5 rounded text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5"
              >
                <UserPlus size={14} />
                <span>{t('nav.register')}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
      <GoldRateAlertModal isOpen={isChartModalOpen} onClose={() => setIsChartModalOpen(false)} />
    </header>
  );
}
