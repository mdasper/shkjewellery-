import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const categories = ['All', 'Gold', 'Antique', 'Silver', 'Bridal Special'];

const products = [
  {
    id: 1,
    name: 'Royal Heritage Antique Necklace',
    category: 'Antique',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/Bbajh9KH6AfXRx9LiuYPtjiI3xH2H1L6NeeXFUpe.jpg',
    description: 'Traditional heavy gold neckpiece intricately carved with divine temple designs.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 2,
    name: 'Traditional Calcutta Fancy Bangles',
    category: 'Gold',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/vbL0V2yRl7uM3ObAOcraN9pszUsVXqIZeIRWCzJI.jpg',
    description: 'Charming daily-wear and festive bangles featuring fine mesh and filigree details.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 3,
    name: 'Kundan Studded Jhumkas',
    category: 'Antique',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/ZyMnbtyNilXJevemEjA4xEghzDvVGrZxwodc1lBZ.jpg',
    description: 'Premium matching studs and drops styled with semi-precious gems and pearls.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 4,
    name: 'Royal Laxmi Coin Haram',
    category: 'Bridal Special',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/ZyMnbtyNilXJevemEjA4xEghzDvVGrZxwodc1lBZ.jpg', // secondary reuse/placeholder
    description: 'Traditional long chain studded with Laxmi coins, perfect for South Indian brides.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 5,
    name: 'Aesthetic Gold Leaf Pendant',
    category: 'Gold',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/uTOKjy423YiTqSAb4uCMOCrHuRX35nZdQ5Zrhkrz.png',
    description: 'Lightweight designer pendant with delicate floral pattern, ideal for chains.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 6,
    name: 'Majestic Gadi Stone Ring',
    category: 'Gold',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/efl9adn4Lle10UU6ThFXJpBdZpzoZ9JQu2HbF1dM.png',
    description: 'Stunning cocktail ring embedded with premium ruby/emerald center stones.',
    purity: '22Kt Gold / 18Kt Gold'
  },
  {
    id: 7,
    name: 'Handcrafted Square Rope Chain',
    category: 'Gold',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/b2kAsQ37NS1II6dNt9c5ktJnNheqGBF1XUcBulVL.jpg',
    description: 'Highly durable rope design chain featuring modern polishing and high shine.',
    purity: '22Kt Gold (916)'
  },
  {
    id: 8,
    name: 'Silver Puja Kunguma Chimizh',
    category: 'Silver',
    image: 'https://sriharikrishnanagaimaligai.com/storage/app/public/collection/8pRS3R1oHYpju6Inb8BBfV3Lb7ln7xZBemCYN8dP.jpg',
    description: 'Pure silver vermillion box crafted with antique finishes and elegant detailing.',
    purity: '92.5 Pure Silver'
  }
];

export default function CollectionsGallery() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="collections" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase flex justify-center items-center gap-1.5">
            <Sparkles size={14} /> Our Masterpieces
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-maroon">
            Curated Jewellery Collections
          </h2>
          <p className="text-brand-charcoal/70 text-sm">
            Explore our heritage gold, silver, and antique designs. Each piece is hallmarked and handpicked for your special moments.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab
                  ? 'bg-brand-maroon border-brand-maroon text-white shadow-md'
                  : 'bg-brand-cream border-brand-gold/15 text-brand-charcoal hover:bg-brand-gold/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-brand-cream border border-brand-gold/10 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-column justify-between h-[450px]"
            >
              {/* Product Image Wrapper */}
              <div className="relative h-60 w-full overflow-hidden bg-brand-charcoal">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <span className="absolute top-3 left-3 bg-brand-maroon/90 text-brand-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {product.purity}
                </span>
              </div>

              {/* Product Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-serif font-bold text-brand-maroon text-lg group-hover:text-brand-maroonLight transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-brand-charcoal/70 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-gold/10 mt-4 flex items-center justify-between">
                  <a 
                    href={`https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20saw%20this%20product%20on%2520your%20website:%20${product.name}%20and%20want%20to%20know%20details.`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-brand-maroon hover:text-brand-gold transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
