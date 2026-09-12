import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import BrandIntro from './components/BrandIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileActionBar from './components/StickyMobileActionBar';
import ProgressiveConsultation from './components/ProgressiveConsultation';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceFinderPage from './pages/ServiceFinderPage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    return Boolean(sessionStorage.getItem('zenix_brand_intro_seen')) || Boolean(shouldReduceMotion);
  });

  return (
    <Router>
      <ScrollToTop />
      {!isIntroComplete && (
        <BrandIntro onComplete={() => setIsIntroComplete(true)} />
      )}
      <motion.div
        initial={isIntroComplete ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: isIntroComplete ? 1 : 0, y: isIntroComplete ? 0 : 15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col min-h-screen bg-brand-bgLight text-brand-slate"
      >
        <Navbar />
        
        {/* pb-20 on mobile ensures the sticky action bar does not cover page content */}
        <main className="flex-grow pb-20 lg:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/service-finder" element={<ServiceFinderPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />

            {/* Catch-all 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <StickyMobileActionBar />
        <ProgressiveConsultation />
      </motion.div>
    </Router>
  );
}
