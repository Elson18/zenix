import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle, Compass, PhoneCall } from 'lucide-react';

export default function NotFoundPage() {
  // Update page title for SEO & context
  useEffect(() => {
    document.title = '404 - Page Not Found | Zenix Food Worx';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-brand-bgLight flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-primaryLight rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-softGold rounded-full filter blur-3xl opacity-60" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10 py-16 px-6 sm:px-8 bg-white/80 backdrop-blur-md rounded-3xl border border-brand-border shadow-subtle my-8">
        
        {/* Animated Icon Container */}
        <div className="flex justify-center mb-8 relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="w-24 h-24 rounded-full bg-brand-primaryLight/50 flex items-center justify-center text-brand-primaryDark border border-brand-primary/20 relative"
          >
            <Compass className="w-12 h-12 stroke-[1.5]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -top-1 -right-1 bg-brand-primary text-brand-black p-1.5 rounded-full shadow-gold border border-white"
            >
              <AlertTriangle className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Headers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primaryDark px-3 py-1 bg-brand-primaryLight/60 rounded-full border border-brand-primary/10 inline-block">
            Error 404
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
            Lost in Transition?
          </h1>
          <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading text-sm font-semibold shadow-subtle hover:shadow-gold transition-all duration-300 group"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-brand-backgroundSoft text-brand-charcoal hover:text-brand-black font-heading text-sm font-semibold border border-brand-border shadow-sm transition-all duration-300"
          >
            <PhoneCall className="w-4 h-4 text-brand-primary" />
            <span>Contact Support</span>
          </Link>
        </motion.div>

        {/* Quick Links Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 pt-8 border-t border-brand-border/60 text-left"
        >
          <h2 className="text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-3">
            Popular Pages
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/services" className="text-brand-charcoal hover:text-brand-primary font-medium transition-colors">
              • Our Services
            </Link>

            <Link to="/service-finder" className="text-brand-charcoal hover:text-brand-primary font-medium transition-colors">
              • Service Finder
            </Link>
            <Link to="/about" className="text-brand-charcoal hover:text-brand-primary font-medium transition-colors">
              • About Zenix
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
