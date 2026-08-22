import React from 'react';
import { Timer, CheckCircle, ArrowRight, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentIntroProps {
  onStart: () => void;
}

export default function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand-borderLight shadow-card-hover overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Content */}
        <div className="p-8 sm:p-12 md:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold bg-brand-lightGold border border-brand-goldBorder/40">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Interactive Assessment
            </span>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
              Check Your Food Business Readiness
            </h1>

            <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
              Answer a few quick questions to identify areas that may need attention across licensing, testing, labelling, food safety and certification.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-heading font-bold text-brand-charcoal leading-none">2–3 Minutes</p>
                <p className="text-brand-muted text-[11px] sm:text-xs">Quick self-assessment</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-heading font-bold text-brand-charcoal leading-none">No Sign-up</p>
                <p className="text-brand-muted text-[11px] sm:text-xs">No account required</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-heading font-bold text-brand-charcoal leading-none">100% Client-Side</p>
                <p className="text-brand-muted text-[11px] sm:text-xs">No information stored</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-heading font-bold text-brand-charcoal leading-none">Actionable Report</p>
                <p className="text-brand-muted text-[11px] sm:text-xs">Custom recommendations</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold text-base shadow-subtle hover:scale-[1.01] transition-all group"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Premium Illustration Backdrop */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-brand-emerald to-brand-dark p-8 items-center justify-center relative overflow-hidden">
          {/* Subtle graphic element */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-emeraldHover/55 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

          {/* Premium Vector SVG Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[240px] text-center text-white space-y-6 relative z-10"
          >
            <div className="relative inline-block">
              {/* Outer circle */}
              <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-white/5 shadow-inner">
                <ClipboardCheck className="w-16 h-16 text-brand-gold" />
              </div>
              {/* Inner floating badges */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-brand-fresh border border-white/20 flex items-center justify-center text-white text-xs font-bold shadow-md">
                ✓
              </div>
              <div className="absolute bottom-1 -left-2 w-7 h-7 rounded-lg bg-brand-gold border border-white/20 flex items-center justify-center text-white text-xs font-bold shadow-md">
                ★
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-white">Zenix Food Worx</h3>
              <p className="text-xs text-brand-lightGreen/70 leading-relaxed max-w-[180px] mx-auto">
                Helping you identify compliance gaps and streamline your launch.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
