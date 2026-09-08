import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import TryWithOverlay from '../components/TryWithOverlay';
import { itemTypes, allProducts } from '../data/productsData';
import { useGoldRates } from '../context/GoldRatesContext';
import { 
  Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, 
  Grid, Scale, ShoppingBag, Eye, ArrowUpRight, MessageSquare, Camera 
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function Collections() {
  const { t } = useTranslation();
  const { type: pathType } = useParams();
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const { rates } = useGoldRates();

  const [activeSlug, setActiveSlug] = useState(pathType || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [tryWithProduct, setTryWithProduct] = useState(null);

  useEffect(() => {
    if (pathType) {
      setActiveSlug(pathType.toLowerCase());
    } else {
      setActiveSlug('all');
    }
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [pathType, catParam]);

  const handleSlugChange = (slug) => {
    setActiveSlug(slug);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filteredProducts = allProducts.filter(p => {
    if (pathType && pathType.toLowerCase() !== 'all') {
      return p.typeSlug === pathType.toLowerCase();
    }
    if (catParam && catParam !== 'All') {
      return p.category === catParam;
    }
    if (activeSlug !== 'all') {
      return p.typeSlug === activeSlug;
    }
    return true;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE) || 1;

  // Products slice for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + visibleCount);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setVisibleCount(ITEMS_PER_PAGE);
    const element = document.getElementById('productsContainer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, totalProducts - startIndex));
  };

  // Helper to calculate live estimate price
  const calculateEstPrice = (product) => {
    const isSilver = product.typeSlug === 'gift-items' || product.purity.toLowerCase().includes('silver');
    const ratePerGram = isSilver ? (rates['silver'] || 260) : (rates['22K'] || 14505);
    const grams = product.weightGrams || 14.35;
    const baseValue = ratePerGram * grams;
    const makingValue = baseValue * 0.12; // 12% making charges avg
    const gstValue = (baseValue + makingValue) * 0.03;
    const total = baseValue + makingValue + gstValue;
    return total.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  return (
    <>
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full font-sans">
        
        {/* 100% Full-Width Royal Banner Header (Clean Luxury) */}
        <section className="py-16 bg-brand-maroon text-white relative overflow-hidden w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-3">
            <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest block">
              {t('collections.badge', '100% BIS 916 HALLMARKED GOLD & PURE 92.5 SILVER')}
            </span>
            <h1 className="font-cormorant text-4xl sm:text-6xl font-extrabold text-white capitalize drop-shadow-2xl">
              {pathType ? `${pathType.replace('-', ' ')} Showcase` : t('collections.heroTitle', 'Exquisite Showroom Collections')}
            </h1>
            <p className="text-brand-cream font-medium text-sm max-w-xl mx-auto font-sans">
                {t('collections.heroSubtitle', 'Discover Madurai\'s finest handcrafted gold & silver jewellery with certified 916 purity.')}
              </p>

              <div className="pt-2">
                <Link
                  to="/try-on"
                  className="btn-shimmer inline-flex items-center space-x-2 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon px-6 py-3 rounded-full font-cinzel font-extrabold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-transform"
                >
                  <Camera size={16} />
                  <span>{t('collections.tryOnGlobal', 'Open Live Camera Try-On Studio (நேரடி கேமரா)')}</span>
                </Link>
              </div>

            
          </div>
        </section>

        {/* 100% Full-Width Clean Category Navigation Pills */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {itemTypes.map((item) => (
              <Link
                key={item.slug}
                to={item.slug === 'all' ? '/collections' : `/collections/${item.slug}`}
                onClick={() => handleSlugChange(item.slug)}
                className={`px-5 py-2.5 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeSlug === item.slug
                    ? 'bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon border-brand-gold text-brand-gold shadow-xl scale-105'
                    : 'bg-white border-brand-gold/30 text-[#1A0A0C] hover:bg-brand-gold/15'
                }`}
              >{t(`collections.categories.${item.slug}`, item.label)}</Link>
            ))}
          </div>
        </div>

        {/* Product Navigation Indicator Bar */}
        <div id="productsContainer" className="w-full px-4 sm:px-8 lg:px-12 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-brand-gold/30 rounded-xl p-4 shadow-sm backdrop-blur-md text-xs font-sans text-[#1A0A0C] font-semibold space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Grid size={16} className="text-brand-gold" />
              <span>
                Displaying Items <b className="text-brand-maroon font-bold">{startIndex + 1}</b> - <b className="text-brand-maroon font-bold">{Math.min(startIndex + displayedProducts.length, totalProducts)}</b>
              </span>
            </div>
            <div className="text-[#1A0A0C]">
              Page <b className="text-brand-maroon font-bold">{currentPage}</b> of <b className="text-brand-maroon font-bold">{totalPages}</b>
            </div>
          </div>
        </div>

        {/* 100% Full-Width Tanishq-Grade Ultra-Luxury Product Grid */}
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            <AnimatePresence>
              {displayedProducts.map((product) => {
                const estPrice = calculateEstPrice(product);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-brand-gold/30 hover-gold-ring shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    {/* Full-Frame Aspect Square Image Canvas */}
                    <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-brand-maroon block">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        onError={(e) => {
                          e.target.src = 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/Bbajh9KH6AfXRx9LiuYPtjiI3xH2H1L6NeeXFUpe.jpg';
                        }}
                      />
                      
                      {/* Micro Floating Badges */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-black/80 backdrop-blur-md text-brand-gold text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-md border border-brand-gold/40 shadow">
                          BIS 916
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-brand-gold text-brand-maroon text-[10px] font-cinzel font-black px-3 py-1 rounded-md shadow flex items-center gap-1">
                          <Scale size={11} /> {product.weight}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded border border-white/20">
                          {product.code}
                        </span>
                      </div>

                      {/* Virtual Try With Pill Button */}
                      {(product.typeSlug === 'necklace' || product.typeSlug === 'pendant' || product.typeSlug === 'chain' || product.typeSlug === 'earring') && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTryWithProduct(product); }}
                            className="bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon border-0 text-[9px] font-cinzel font-black px-3 py-1 rounded-lg shadow-gold-glow flex items-center space-x-1.5 hover:scale-105 transition-transform"
                          >
                            <Sparkles size={10} />
                            <span>✨ {t('collections.tryWith', 'Try With')}</span>
                          </button>
                        </div>
                      )}
                    </Link>

                    {/* Royal Product Details */}
                    <div className="p-5 text-left space-y-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF7F2]">
                      <Link to={`/product/${product.id}`} className="block space-y-1">
                        <span className="text-[10px] font-cinzel font-extrabold text-brand-goldDark uppercase tracking-widest block">
                          22K {product.category}
                        </span>
                        <h3 className="font-cormorant text-2xl font-extrabold text-[#1A0A0C] group-hover:text-brand-maroon transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Weight & Est. Price Bar */}
                      <div className="pt-2 border-t border-brand-gold/20 space-y-3">
                        <div className="flex justify-between items-center bg-brand-cream/80 p-2.5 rounded-lg border border-brand-gold/25">
                          <div className="text-left">
                            <span className="text-[9px] uppercase font-bold text-brand-sepia block">NET WEIGHT:</span>
                            <span className="font-cinzel text-xs font-extrabold text-brand-maroon">
                              {product.weight}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase font-bold text-brand-sepia block">EST. SHOWROOM PRICE:</span>
                            <span className="font-cormorant text-lg font-extrabold text-brand-maroon block">
                              ₹{estPrice}*
                            </span>
                          </div>
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="btn-shimmer bg-brand-maroon hover:bg-brand-maroonLight text-brand-gold font-cinzel font-bold text-xs py-2.5 rounded-lg text-center shadow flex items-center justify-center space-x-1 uppercase tracking-wider"
                          >
                            <Eye size={14} />
                            <span>Specs</span>
                          </Link>

                          <a
                            href={`https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20want%20to%20order/inquire%20about%20SKU:%20${product.code}%20(${encodeURIComponent(product.name)})%20-%20Weight:%20${product.weight}%20from%20your%20website.`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white font-cinzel font-bold text-xs py-2.5 rounded-lg text-center shadow flex items-center justify-center space-x-1 uppercase tracking-wider"
                          >
                            <MessageSquare size={14} />
                            <span>Order</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Load More Button */}
        {startIndex + displayedProducts.length < totalProducts && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="btn-shimmer inline-flex items-center space-x-2 bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon text-brand-gold px-8 py-3.5 rounded-lg font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl border border-brand-gold/40 hover:scale-105 transition-transform"
            >
              <span>Load More Products</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Multi-Page Pagination Bar */}
        {totalPages > 1 && (
          <div className="w-full px-4 sm:px-8 lg:px-12 mt-12">
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-lg border border-brand-gold/30 bg-white text-brand-maroon hover:bg-brand-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg font-cinzel font-bold text-xs transition-all border ${
                      currentPage === pageNum
                        ? 'bg-brand-maroon border-brand-gold text-brand-gold shadow-lg scale-105'
                        : 'bg-white border-brand-gold/30 text-[#1A0A0C] hover:bg-brand-gold/15'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-lg border border-brand-gold/30 bg-white text-brand-maroon hover:bg-brand-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

      </div>
    </PageTransition>

    {/* Try With Full-Screen Overlay */}
    {tryWithProduct && (
      <TryWithOverlay
        product={tryWithProduct}
        onClose={() => setTryWithProduct(null)}
      />
    )}
    </>
  );
}
