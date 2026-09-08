import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Floating3DParticles from '../components/Floating3DParticles';
import { blogArticles } from '../data/blogData';
import { Sparkles, BookOpen, Calendar, ArrowRight, X, MessageSquare, Share2, ShieldCheck } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogArticles.map(a => a.category))];

  const filteredArticles = selectedCategory === 'All' 
    ? blogArticles 
    : blogArticles.filter(a => a.category === selectedCategory);

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-[#FAF7F2] via-[#F3EBE0] to-[#FAF7F2] min-h-screen pb-20 w-full font-sans">
        
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
                Official Jewellery Guide & Heritage Insights
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
            >
              Sri Hari Krishna Blog & Articles
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-cream font-medium text-sm max-w-xl mx-auto font-sans"
            >
              Discover South Indian bridal jewellery trends, BIS hallmark buying tips, gold investment strategies & sacred Tamil wedding traditions.
            </motion.p>
          </div>
        </section>

        {/* 100% Full-Width Category Navigation Pills */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-brand-maroon via-brand-maroonLight to-brand-maroon border-brand-gold text-brand-gold shadow-xl scale-105'
                    : 'bg-white border-brand-gold/30 text-[#1A0A0C] hover:bg-brand-gold/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 100% Full-Width Articles Grid */}
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <AnimatePresence>
              {filteredArticles.map((article) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-brand-gold/30 hover-gold-ring shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-60 overflow-hidden bg-brand-maroon">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      onError={(e) => {
                        e.target.src = article.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-brand-maroon/90 text-brand-gold text-[10px] font-cinzel font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-gold/40 shadow">
                      {article.category}
                    </span>
                    <span className="absolute bottom-3 left-4 text-xs font-sans text-brand-cream/90 flex items-center gap-1 font-medium">
                      <Calendar size={13} className="text-brand-gold" /> {article.date}
                    </span>
                  </div>

                  {/* Article Info */}
                  <div className="p-6 text-left space-y-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF7F2]">
                    <div>
                      <h3 className="font-cormorant text-2xl font-bold text-brand-maroon group-hover:text-brand-maroonLight transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#1A0A0C] font-semibold line-clamp-3 pt-2 font-sans leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-brand-maroon group-hover:text-brand-gold transition-colors flex items-center gap-1">
                        <BookOpen size={14} /> Read Full Article
                      </span>
                      <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-brand-gold/40 relative text-left"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-20 bg-brand-maroon text-brand-cream hover:text-brand-gold p-2 rounded-full transition-colors shadow-lg"
                >
                  <X size={20} />
                </button>

                {/* Banner Image */}
                <div className="relative h-72 sm:h-80 bg-brand-maroon">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover filter brightness-90"
                    onError={(e) => {
                      e.target.src = selectedArticle.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon via-brand-maroon/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="bg-brand-gold text-brand-maroon font-cinzel font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest inline-block shadow">
                      {selectedArticle.category}
                    </span>
                    <h2 className="font-cormorant text-2xl sm:text-4xl font-bold text-white leading-tight drop-shadow-2xl">
                      {selectedArticle.title}
                    </h2>
                    <span className="text-xs font-sans text-brand-cream/80 flex items-center gap-1">
                      <Calendar size={13} className="text-brand-gold" /> {selectedArticle.date} • Sri Hari Krishna Nagai Maligai
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-10 space-y-6 font-sans text-sm text-[#1A0A0C] leading-relaxed">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i} className="font-medium leading-loose text-sm sm:text-base border-l-2 border-brand-gold/40 pl-4 py-1 bg-brand-cream/30 rounded-r-lg">
                      {para}
                    </p>
                  ))}

                  {/* WhatsApp CTA */}
                  <div className="pt-6 border-t border-brand-gold/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-brand-cream/50 p-6 rounded-xl border border-brand-gold/20">
                    <div className="space-y-1">
                      <h4 className="font-cinzel font-bold text-brand-maroon text-sm uppercase">Have Questions About This Jewellery?</h4>
                      <p className="text-xs text-[#1A0A0C] font-semibold">Talk directly with our Madurai showroom experts on WhatsApp.</p>
                    </div>
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919865045924&text=Hi,%20I%20read%20your%20article%20'${encodeURIComponent(selectedArticle.title)}'%20on%20your%20website%20and%20want%20to%20know%20more.`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-shimmer bg-green-600 hover:bg-green-700 text-white font-bold tracking-wider px-6 py-3 rounded-lg text-xs uppercase shadow-xl transition-all flex items-center space-x-2 shrink-0"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp Showroom</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
