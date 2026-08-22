import React from 'react';
import InteractiveJourney from '../components/InteractiveJourney';
import CTASection from '../components/CTASection';
import { companyData } from '../data/companyData';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowWeWorkPage() {
  return (
    <div className="pt-24 space-y-0 bg-white">
      
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border">
            OUR WORKING METHODOLOGY
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-black tracking-tight max-w-3xl mx-auto">
            A Clearer Path From Compliance to Growth
          </h1>

          <p className="text-brand-textSecondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            We simplify complex regulatory frameworks into a structured, transparent lifecycle journey tailored for your food business.
          </p>
        </div>
      </section>

      {/* Interactive Business Lifecycle Journey Timeline (Feature 2) */}
      <InteractiveJourney />

      {/* Deep-Dive Stage Advisory Breakdown */}
      <section className="py-20 bg-brand-backgroundSoft/40 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black">
              Detailed Breakdown of Our Advisory Method
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg">
              Here is what happens at every step of your engagement with Zenix Food Worx.
            </p>
          </div>

          <div className="space-y-12">
            {companyData.howWeWork.map((stageItem, idx) => (
              <motion.div
                key={stageItem.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-border shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary text-brand-black font-heading font-extrabold text-2xl flex items-center justify-center shadow-gold shrink-0">
                    {stageItem.stage}
                  </div>
                  <div>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-primary">
                      STAGE {stageItem.stage}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-brand-black">
                      {stageItem.title}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-9 space-y-3 border-t lg:border-t-0 lg:border-l border-brand-border pt-6 lg:pt-0 lg:pl-8">
                  <h4 className="font-heading font-bold text-lg text-brand-primaryDark">
                    {stageItem.subtitle}
                  </h4>
                  <p className="text-brand-textSecondary text-base leading-relaxed">
                    {stageItem.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-heading font-semibold text-brand-primaryDark">
                    <CheckCircle2 className="w-4 h-4 text-brand-primaryDark" />
                    <span>Clear deliverables & progress tracking at this stage</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTASection />

    </div>
  );
}
