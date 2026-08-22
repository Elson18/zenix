import React from 'react';
import IndustryCard from '../components/IndustryCard';
import CTASection from '../components/CTASection';
import { industriesData } from '../data/industriesData';

export default function IndustriesPage() {
  return (
    <div className="pt-24 space-y-0">
      
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-bgWarm via-white to-brand-bgLight border-b border-brand-borderLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-4 py-1.5 rounded-full gold-badge inline-block">
            SECTOR SPECIFIC EXPERTISE
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-charcoal tracking-tight max-w-3xl mx-auto">
            Industries We Serve
          </h1>

          <p className="text-brand-slate text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Tailored food safety, licensing, packaging, laboratory testing, and operational solutions customized for your specific food industry vertical.
          </p>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

    </div>
  );
}
