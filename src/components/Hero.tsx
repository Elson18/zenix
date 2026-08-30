import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageImages } from '../data/imageConfig';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-brand-bgWarm via-white to-white overflow-hidden">
      {/* Background Subtle Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-primaryLight/35 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-badge text-xs sm:text-sm font-heading font-semibold shadow-sm border border-brand-primary/30">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span>Food Safety • Compliance • Quality • Growth</span>
            </div>

            {/* Large Hero Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-black tracking-tight leading-[1.12]">
              Trusted Experts for <br className="hidden sm:inline" />
              <span className="text-brand-primary font-extrabold">Every Stage</span> of Your <br className="hidden sm:inline" />
              Food Business.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg sm:text-xl text-brand-textSecondary max-w-2xl font-normal leading-relaxed">
              From food testing and FSSAI licensing to certification, product development, hospitality consulting and factory setup, Zenix Food Worx helps food businesses stay compliant, efficient and ready to grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-base shadow-gold transition-all duration-300 group"
              >
                <span>Get a Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-brand-black" />
              </NavLink>

              <NavLink
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-brand-backgroundSoft text-brand-black border-2 border-brand-border hover:border-brand-primary font-heading font-semibold text-base shadow-subtle transition-all duration-300"
              >
                <span>Explore Our Services</span>
              </NavLink>
            </div>

            {/* Quick Domain Badges */}
            <div className="pt-6 border-t border-brand-border/80 flex flex-wrap gap-4 text-xs font-heading font-medium text-brand-textMuted">
              <span className="flex items-center gap-1.5 text-brand-black">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" /> FSSAI Registration & Licensing
              </span>
              <span className="flex items-center gap-1.5 text-brand-black">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" /> HACCP & ISO Audits
              </span>
              <span className="flex items-center gap-1.5 text-brand-black">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" /> Lab Quality Testing
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Visual Hero & Floating Feature Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Rounded Image Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={pageImages.homeHero.url}
                alt={pageImages.homeHero.alt}
                className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Soft Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Left */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card-hover border border-brand-border hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primaryLight flex items-center justify-center text-brand-primary">
                <ShieldCheck className="w-5 h-5 text-brand-primaryDark" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-black">FSSAI Compliance</p>
                <p className="text-xs text-brand-textMuted">100% Regulatory Alignment</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Top Right */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-12 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card-hover border border-brand-border hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-backgroundSoft flex items-center justify-center text-brand-primary">
                <Award className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-black">Quality Testing</p>
                <p className="text-xs text-brand-textMuted">Lab Analysis & Safety</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Bottom Left */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-card-hover border border-brand-border flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-black flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-black">Business Growth</p>
                <p className="text-xs text-brand-textMuted">Turnkey Food Consultancy</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
