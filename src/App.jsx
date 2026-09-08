import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { GoldRatesProvider } from './context/GoldRatesContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingConcierge from './components/FloatingConcierge';
import WishlistDrawer from './components/WishlistDrawer';

import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import SavingsSchemes from './pages/SavingsSchemes';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import Login from './pages/Login';
import Register from './pages/Register';
import Careers from './pages/Careers';
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import SchemeDetail from './pages/SchemeDetail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:type" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/savings" element={<SavingsSchemes />} />
        <Route path="/scheme/:slug" element={<SchemeDetail />} />
        <Route path="/savings-schemes" element={<SavingsSchemes />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/termsandcondition" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/refundandcancellationpolicy" element={<RefundPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/try-on" element={<VirtualTryOnPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/shippingpolicy" element={<ShippingPolicy />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GoldRatesProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-maroon selection:text-brand-gold flex flex-col justify-between">
            
            {/* Header Navigation */}
            <Navbar />

            {/* Dynamic Route Pages */}
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating VIP Concierge Widget (WhatsApp, Call, Maps, Wishlist, ScrollTop) */}
            <FloatingConcierge />

            {/* Global Slide-out Wishlist Drawer */}
            <WishlistDrawer />

          </div>
        </Router>
      </WishlistProvider>
    </GoldRatesProvider>
  );
}
