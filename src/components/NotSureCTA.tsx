import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

export default function NotSureCTA() {
  const handleTalkToExpert = () => {
    trackEvent('consultation_clicked', {
      ctaType: 'progressive_modal',
      page: window.location.pathname
    });
    // Dispatch custom event to trigger progressive consultation drawer/modal
    window.dispatchEvent(new CustomEvent('open-consultation', { 
      detail: { service: 'General Consultation', step: 1 } 
    }));
  };

  return (
    <section className="py-16 md:py-20 bg-white border-t border-brand-border/60 relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primaryLight/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-softGold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border">
            CONFUSED?
          </span>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
            Not Sure Where to Start?
          </h2>

          <p className="text-brand-textSecondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every food business is different. Tell us about your requirement and we'll help you identify the right next step.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <NavLink
            to="/service-finder"
            onClick={() => trackEvent('service_finder_started', { page: 'not_sure_cta' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-base shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
          >
            <span>Find My Service</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-black" />
          </NavLink>

          <button
            onClick={handleTalkToExpert}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-brand-border hover:border-brand-primary hover:text-brand-primary text-brand-black font-heading font-semibold text-base shadow-subtle hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 text-brand-primary" />
            <span>Talk to an Expert</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
