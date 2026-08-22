import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
<<<<<<< HEAD
import StickyMobileActionBar from './components/StickyMobileActionBar';
import ProgressiveConsultation from './components/ProgressiveConsultation';
=======
>>>>>>> 00bf16a30f474be74c18c2eb942eed8a448a50df
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
<<<<<<< HEAD
import ServiceFinderPage from './pages/ServiceFinderPage';
import CompareServicesPage from './pages/CompareServicesPage';
=======
>>>>>>> 00bf16a30f474be74c18c2eb942eed8a448a50df
import HowWeWorkPage from './pages/HowWeWorkPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-bgLight text-brand-slate">
        <Navbar />
        
<<<<<<< HEAD
        {/* pb-20 on mobile ensures the sticky action bar does not cover page content */}
        <main className="flex-grow pb-20 lg:pb-0">
=======
        <main className="flex-grow">
>>>>>>> 00bf16a30f474be74c18c2eb942eed8a448a50df
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
<<<<<<< HEAD
            <Route path="/service-finder" element={<ServiceFinderPage />} />
            <Route path="/compare-services" element={<CompareServicesPage />} />
=======
>>>>>>> 00bf16a30f474be74c18c2eb942eed8a448a50df
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
<<<<<<< HEAD
        <StickyMobileActionBar />
        <ProgressiveConsultation />
=======
>>>>>>> 00bf16a30f474be74c18c2eb942eed8a448a50df
      </div>
    </Router>
  );
}
