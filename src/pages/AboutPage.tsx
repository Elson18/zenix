import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Target, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { pageImages } from '../data/imageConfig';

export default function AboutPage() {
  return (
    <div className="pt-24 space-y-0">
      
      {/* Page Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full gold-badge bg-white border border-brand-border inline-block shadow-sm">
            ABOUT ZENIX FOOD WORX
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-black tracking-tight max-w-4xl mx-auto leading-tight">
            Bridging the Gap Between Regulatory Compliance & Food Business Growth
          </h1>

          <p className="text-brand-textSecondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Zenix Food Worx is a one-stop food consultancy dedicated to empowering food manufacturers, restaurants, cloud kitchens, and food startups with practical, regulatory-aligned solutions.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black leading-tight">
                Food Safety and Business Growth Should Go Together.
              </h2>

              <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                At Zenix Food Worx, we understand that food safety and business growth aren't separate goals — they go together. With strong expertise in food regulations, quality testing and hospitality operations, we work with businesses of every size, from ambitious startups to established manufacturers.
              </p>

              <p className="text-brand-textSecondary text-base leading-relaxed">
                Our approach is simple: take the stress out of compliance and help food businesses grow through practical, real-world solutions. We simplify the regulatory landscape so you can focus on expanding your market reach, innovating recipes, and scaling operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-brand-backgroundSoft border border-brand-border flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-primaryDark shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black">Regulatory Rigor</h4>
                    <p className="text-xs text-brand-textMuted">Precision compliance across FSSAI & Legal Metrology.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-backgroundSoft border border-brand-border flex items-start gap-3">
                  <Target className="w-5 h-5 text-brand-primaryDark shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black">Practical Focus</h4>
                    <p className="text-xs text-brand-textMuted">Real-world operational solutions without fluff.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={pageImages.aboutPhilosophy.url}
                  alt={pageImages.aboutPhilosophy.alt}
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Strategic Pillars / Mission & Vision */}
      <section className="py-20 bg-brand-bgWarm border-t border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white border border-brand-border inline-block shadow-sm">
              OUR FOUNDATION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
              Driven by Quality, Safety & Client Success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Our Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-border/60 shadow-subtle hover:border-brand-primary hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-bgWarm flex items-center justify-center text-brand-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black uppercase tracking-wider">
                Our Vision
              </h3>
              <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed font-normal">
                "A world where every food business operates safely, confidently, and compliantly."
              </p>
            </div>

            {/* Our Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-border/60 shadow-subtle hover:border-brand-primary hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-bgWarm flex items-center justify-center text-brand-primary">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black uppercase tracking-wider">
                Our Mission
              </h3>
              <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed font-normal">
                "To help food businesses navigate regulations, ensure quality, and grow sustainably — through expert guidance at every step of the journey."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTASection />

    </div>
  );
}
