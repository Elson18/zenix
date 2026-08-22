import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { companyData } from '../data/companyData';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  whatsappMessage?: string;
}

export default function CTASection({
  title = "Ready to Build a Safer, Stronger Food Business?",
  subtitle = "Whether you're launching a new product, navigating compliance or expanding your operations, Zenix Food Worx is ready to help.",
  whatsappMessage = "Hi Zenix Food Worx, I would like to schedule a consultation regarding your food consultancy services."
}: CTASectionProps) {
  
  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-16 md:py-24 bg-brand-black border-t border-brand-primary relative overflow-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primaryLight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full bg-brand-black border border-brand-primary/30 inline-block">
            GET STARTED TODAY
          </span>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <NavLink
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-base shadow-gold hover:scale-105 transition-all duration-300 group"
          >
            <span>Get a Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-brand-black" />
          </NavLink>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-charcoal border border-brand-border text-white hover:bg-brand-primary hover:text-brand-black hover:border-brand-primary font-heading font-semibold text-base hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 fill-current text-brand-primary group-hover:text-brand-black" />
            <span>WhatsApp an Expert</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
