import React from 'react';
import { NavLink } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import FeatureCard from '../components/FeatureCard';
import NeedHelpSection from '../components/NeedHelpSection';
import InteractiveJourney from '../components/InteractiveJourney';
import NotSureCTA from '../components/NotSureCTA';
import ExpertiseGrid from '../components/ExpertiseGrid';
import ProcessTimeline from '../components/ProcessTimeline';
import CTASection from '../components/CTASection';
import { companyData } from '../data/companyData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageImages } from '../data/imageConfig';

export default function HomePage() {
  return (
    <div className="space-y-0 bg-white">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Introduction / Value Proposition */}
      <section className="py-20 bg-brand-bgWarm border-t border-brand-border/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={pageImages.homePhilosophy.url}
                  alt={pageImages.homePhilosophy.alt}
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-2xl shadow-card-hover border border-brand-border/60 hidden sm:block max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primaryLight flex items-center justify-center text-brand-primaryDark shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brand-black">Practical Solutions</p>
                    <p className="text-xs text-brand-textMuted">Compliant & Growth-Focused</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white border border-brand-primary/20">
                ABOUT ZENIX FOOD WORX
              </span>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
                Food Safety and Business Growth Should Go Together.
              </h2>

              <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
                At Zenix Food Worx, we understand that food safety and business growth aren't separate goals — they go together. With strong expertise in food regulations, quality testing and hospitality operations, we work with businesses of every size, from ambitious startups to established manufacturers.
              </p>

              <p className="text-brand-slate text-base leading-relaxed">
                Our approach is simple: take the stress out of compliance and help food businesses grow through practical, real-world solutions.
              </p>

              <div className="pt-2">
                <NavLink
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-sm shadow-gold transition-all group"
                >
                  <span>Discover Our Approach</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-black" />
                </NavLink>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. What Do You Need Help With? */}
      <NeedHelpSection />

      {/* 5. Our Services (Core Capabilities) */}
      <ExpertiseGrid />


      {/* 7. Food Business Journey */}
      <InteractiveJourney />

      {/* 8. Why Choose Zenix */}
      <section className="py-20 bg-brand-bgWarm border-t border-brand-border/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-lightGold border border-brand-primary/20">
              WHY CHOOSE ZENIX
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              Why Choose Zenix Food Worx?
            </h2>
            <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
              Practical expertise that turns complex food compliance into clear, actionable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyData.whyChooseUs.slice(0, 3).map((item, idx) => (
              <FeatureCard
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={idx}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {companyData.whyChooseUs.slice(3, 5).map((item, idx) => (
              <FeatureCard
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={idx + 3}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 9. How We Work */}
      <ProcessTimeline />

      {/* 10. Food Business Readiness Assessment Banner Section */}
      <section className="py-20 bg-brand-bgWarm border-t border-b border-brand-border/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white via-brand-bgWarm/10 to-white rounded-3xl border border-brand-border/60 shadow-card-hover p-8 sm:p-12 md:flex md:items-center md:justify-between gap-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 max-w-2xl relative z-10">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border/60">
                COMPLIANCE HEALTH CHECK
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight leading-tight">
                Check Your Food Business Readiness
              </h2>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                Take our quick 2-minute interactive assessment to identify attention areas in your FSSAI registration, safety audits, product tests, and food labelling formats.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-heading font-semibold text-brand-textSecondary">
                <span className="flex items-center gap-1.5">✓ No Account Required</span>
                <span className="flex items-center gap-1.5">✓ 100% Client-Side</span>
                <span className="flex items-center gap-1.5">✓ Personal Recommendations</span>
              </div>
            </div>

            <div className="mt-8 md:mt-0 shrink-0 relative z-10">
              <NavLink
                to="/readiness-assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-base shadow-gold hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5 text-brand-black" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA (Not Sure Where to Start?) */}
      <NotSureCTA />

      {/* 12. Bottom CTA Section */}
      <CTASection />

    </div>
  );
}
