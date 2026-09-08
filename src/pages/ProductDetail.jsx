import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import TryWithOverlay from '../components/TryWithOverlay';
import { allProducts } from '../data/productsData';
import { useGoldRates } from '../context/GoldRatesContext';
import { useWishlist } from '../context/WishlistContext';
import SizeGuideModal from '../components/SizeGuideModal';
import { 
  Heart, Minus, Plus, ArrowLeft, Scale, Sparkles, 
  CheckCircle2, MessageSquare, Ruler, Share2, Check, Camera
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rates } = useGoldRates();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, show: false });
  const [tryWithOpen, setTryWithOpen] = useState(false);

  // Find product by id
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];
  const isWishlisted = isInWishlist(product?.id);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="py-20 text-center text-brand-maroon font-cinzel font-bold">
        Product Not Found. <Link to="/collections" className="underline">Back to Collections</Link>
      </div>
    );
  }

  // Live Price Calculation
  const isSilver = product.typeSlug === 'gift-items' || product.purity.toLowerCase().includes('silver');
  const ratePerGram = isSilver ? (rates['silver'] || 260) : (rates['22K'] || 14505);
  const grams = product.weightGrams || 14.35;
  const wastagePct = 12.00; // 12% wastage avg
  const basePrice = ratePerGram * grams;
  const wastageCost = basePrice * (wastagePct / 100);
  const totalBeforeTax = basePrice + wastageCost;
  const gstCost = totalBeforeTax * 0.03;
  const unitTotalPrice = (totalBeforeTax + gstCost);
  const finalTotalPrice = (unitTotalPrice * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Zoom Mouse Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Sri Hari Krishna Nagai Maligai, Madurai.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Related products from same type
  const relatedProducts = allProducts
    .filter(p => p.typeSlug === product.typeSlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full font-sans text-left">
        
        {/* Breadcrumb Bar */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6 border-b border-brand-gold/20 bg-white/60 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#1A0A0C] font-semibold">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center space-x-1 text-brand-maroon hover:text-brand-gold font-bold transition-colors mr-3"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <span>/</span>
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-brand-gold transition-colors">Collections</Link>
            <span>/</span>
            <Link to={`/collections/${product.typeSlug}`} className="hover:text-brand-gold transition-colors capitalize">{product.typeSlug}</Link>
            <span>/</span>
            <span className="text-brand-maroon font-bold truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Main Product Showcase Container */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white rounded-3xl p-6 sm:p-10 border-2 border-brand-gold/30 shadow-2xl">
            
            {/* Left Column: Image Gallery with HD Karigari Zoom Lens */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPos(prev => ({ ...prev, show: false }))}
                className="relative aspect-square rounded-2xl overflow-hidden bg-brand-maroon border-2 border-brand-gold/30 shadow-xl group cursor-crosshair"
              >
                <img 
                  src={activeImage} 
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: zoomPos.show ? 'scale(2.2)' : 'scale(1)'
                  }}
                  className="w-full h-full object-cover transition-transform duration-150 ease-out"
                />

                {/* Floating Badges */}
                <span className="absolute top-4 left-4 bg-brand-maroon/95 text-brand-gold text-xs font-cinzel font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-brand-gold/40 shadow-lg pointer-events-none">
                  {product.purity}
                </span>
                <span className="absolute top-4 right-4 bg-brand-gold text-brand-maroon text-xs font-cinzel font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 pointer-events-none">
                  <Scale size={13} /> {product.weight}
                </span>

                {/* Zoom Hint Overlay */}
                {!zoomPos.show && (
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-brand-cream/90 font-sans pointer-events-none flex items-center gap-1.5 border border-white/10">
                    <Sparkles size={12} className="text-brand-gold" />
                    <span>Hover over jewel for HD Karigari Zoom</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3">
                {[product.image, '/assets/images/hero_gold_necklace.jpg', '/assets/images/hero_bridal_set.jpg'].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === imgUrl ? 'border-brand-gold scale-105 shadow-md' : 'border-brand-gold/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Specs & Order Actions */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Product Title & Code */}
              <div className="space-y-1 border-b border-brand-gold/20 pb-4">
                <div className="flex justify-between items-start">
                  <h1 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-[#1A0A0C] uppercase tracking-wide">
                    {product.name}
                  </h1>

                  {/* Size Guide Trigger Button */}
                  {(product.typeSlug === 'bangles' || product.typeSlug === 'rings') && (
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="shrink-0 inline-flex items-center space-x-1 text-xs font-cinzel font-bold text-brand-maroon hover:text-brand-gold underline pt-2"
                    >
                      <Ruler size={14} />
                      <span>Size Guide</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-xs font-sans text-brand-sepia font-semibold pt-1">
                  <span>SKU: {product.code}</span>
                  <span>•</span>
                  <span>Category: <b className="text-brand-maroon uppercase">{product.typeSlug}</b></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">100% Madurai Showroom In Stock</span>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="bg-gradient-to-b from-[#FAF7F2] to-[#F2E8DC] p-5 rounded-2xl border border-brand-gold/40 space-y-3">
                <div className="flex justify-between items-center text-xs text-[#3A1A1E] font-medium">
                  <span>Pure Metal Weight ({grams}g @ ₹{ratePerGram}/g):</span>
                  <span className="font-bold text-[#1A0A0C]">₹{basePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#3A1A1E] font-medium">
                  <span>Craftsmanship & Making Charges ({wastagePct}%):</span>
                  <span className="font-bold text-[#1A0A0C]">₹{wastageCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#3A1A1E] font-medium border-b border-brand-gold/25 pb-3">
                  <span>Govt. GST (3%):</span>
                  <span className="font-bold text-[#1A0A0C]">₹{gstCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>

                {/* Total Price Highlight */}
                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-brand-maroon block">
                      Estimated Total Value:
                    </span>
                    <span className="text-[10px] text-brand-sepia">
                      (~{(grams / 8).toFixed(2)} Sovereigns / பவுன்)
                    </span>
                  </div>
                  <span className="font-cormorant text-3xl sm:text-4xl font-extrabold text-brand-maroon">
                    ₹{finalTotalPrice}
                  </span>
                </div>
              </div>

              {/* Quantity & Actions Bar */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#1A0A0C]">
                    Quantity:
                  </span>
                  <div className="flex items-center border-2 border-brand-gold/40 rounded-xl bg-white shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-brand-gold/20 text-brand-maroon transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 font-bold text-brand-maroon font-cinzel text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-brand-gold/20 text-brand-maroon transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center space-x-3">
                  {/* WhatsApp Reservation Button */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=${encodeURIComponent(`Vanakkam Sri Hari Krishna Nagai Maligai! I would like to reserve/inquire about: ${product.name} (SKU: ${product.code})\nPurity: ${product.purity}\nWeight: ${product.weight} (~${(grams/8).toFixed(1)} Sovereigns)\nEstimated Total: ₹${finalTotalPrice} (Qty: ${quantity})\nIs this piece available in your Madurai showroom?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shimmer flex-1 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon font-cinzel font-extrabold tracking-widest py-4 rounded-xl text-center flex items-center justify-center space-x-2 text-xs uppercase shadow-2xl hover:scale-[1.02] transition-transform"
                  >
                    <MessageSquare size={18} />
                    <span>Reserve & Lock Rate on WhatsApp →</span>
                  </a>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-xl border-2 transition-all shadow-md ${
                      isWishlisted 
                        ? 'border-rose-500 bg-rose-50 text-rose-600 scale-105' 
                        : 'border-brand-gold/40 bg-white text-brand-maroon hover:bg-brand-gold/10'
                    }`}
                    title={isWishlisted ? "Remove from Shortlist" : "Save to Shortlist"}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="p-4 rounded-xl border-2 border-brand-gold/40 bg-white text-brand-maroon hover:bg-brand-gold/10 transition-all shadow-md relative"
                    title="Share this Jewel"
                  >
                    {isCopied ? <Check size={20} className="text-emerald-600" /> : <Share2 size={20} />}
                  </button>
                </div>

                {/* Try With This Jewel Button */}
                {(product.typeSlug === 'necklace' || product.typeSlug === 'pendant' || product.typeSlug === 'chain' || product.typeSlug === 'earring') && (
                  <button
                    onClick={() => setTryWithOpen(true)}
                    className="w-full bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight text-brand-maroon py-3.5 rounded-xl font-cinzel font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-gold-glow hover:scale-[1.01] transition-all"
                  >
                    <Sparkles size={16} />
                    <span>✨ Try With This Jewel</span>
                  </button>
                )}
              </div>

              {/* Trust Strip */}
              <div className="p-4 rounded-2xl bg-white border border-brand-gold/30 shadow flex items-center justify-around text-center text-[11px] font-cinzel font-bold text-brand-maroon">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={16} className="text-brand-goldDark" />
                  <span>100% BIS 916 Hallmarked</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Sparkles size={16} className="text-brand-goldDark" />
                  <span>Laser HUID Encoded</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Scale size={16} className="text-brand-goldDark" />
                  <span>Lifetime Exchange</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="w-full px-4 sm:px-8 lg:px-12 mt-12">
            <div className="text-left space-y-2 mb-8">
              <span className="text-gold-gradient font-cinzel font-bold text-xs uppercase tracking-widest">Matching Items</span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-brand-maroon">Related Products You May Love</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-brand-gold/30 hover-gold-ring shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden bg-brand-maroon">
                    <img 
                      src={rel.image} 
                      alt={rel.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-black/70 text-brand-gold text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-full uppercase border border-brand-gold/30">
                      {rel.purity}
                    </span>
                  </div>

                  <div className="p-5 text-left space-y-1.5">
                    <h3 className="font-cormorant text-lg font-bold text-[#1A0A0C] group-hover:text-brand-maroon transition-colors line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-brand-sepia font-sans">{rel.weight}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />

      </div>
    </PageTransition>

    {/* Try With Overlay */}
    {tryWithOpen && (
      <TryWithOverlay
        product={product}
        onClose={() => setTryWithOpen(false)}
      />
    )}
    </>
  );
}
