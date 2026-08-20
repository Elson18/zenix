import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-brand-bgWarm via-white to-brand-bgLight overflow-hidden">
      {/* Background Subtle Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-lightGreen/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-lightGold/80 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-badge text-xs sm:text-sm font-heading font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Food Safety • Compliance • Quality • Growth</span>
            </div>

            {/* Large Hero Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal tracking-tight leading-[1.12]">
              Trusted Experts for <br className="hidden sm:inline" />
              <span className="emerald-gradient-text">Every Stage</span> of Your <br className="hidden sm:inline" />
              Food Business.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg sm:text-xl text-brand-slate max-w-2xl font-normal leading-relaxed">
              From food testing and FSSAI licensing to certification, product development, hospitality consulting and factory setup, Zenix Food Worx helps food businesses stay compliant, efficient and ready to grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold text-base shadow-card-hover transition-all duration-300 group"
              >
                <span>Get a Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>

              <NavLink
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-brand-bgLight text-brand-emerald border-2 border-brand-emerald/20 hover:border-brand-emerald font-heading font-semibold text-base shadow-subtle transition-all duration-300"
              >
                <span>Explore Our Services</span>
              </NavLink>
            </div>

            {/* Quick Domain Badges */}
            <div className="pt-6 border-t border-brand-borderLight/80 flex flex-wrap gap-4 text-xs font-heading font-medium text-brand-muted">
              <span className="flex items-center gap-1.5 text-brand-charcoal">
                <CheckCircle2 className="w-4 h-4 text-brand-fresh" /> FSSAI Registration & Licensing
              </span>
              <span className="flex items-center gap-1.5 text-brand-charcoal">
                <CheckCircle2 className="w-4 h-4 text-brand-fresh" /> HACCP & ISO Audits
              </span>
              <span className="flex items-center gap-1.5 text-brand-charcoal">
                <CheckCircle2 className="w-4 h-4 text-brand-fresh" /> Lab Quality Testing
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
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000"
                alt="Food Quality Laboratory Specialist inspecting food sample"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Soft Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Left */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card-hover border border-brand-borderLight hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-fresh">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-charcoal">FSSAI Compliance</p>
                <p className="text-xs text-brand-muted">100% Regulatory Alignment</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Top Right */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-12 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card-hover border border-brand-borderLight hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-lightGold flex items-center justify-center text-brand-gold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-charcoal">Quality Testing</p>
                <p className="text-xs text-brand-muted">Lab Analysis & Safety</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Bottom Left */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-card-hover border border-brand-borderLight flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-emerald flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-brand-charcoal">Business Growth</p>
                <p className="text-xs text-brand-muted">Turnkey Food Consultancy</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
