import React from 'react';
import ServiceGrid from '../components/ServiceGrid';
import CTASection from '../components/CTASection';
import ExpertiseGrid from '../components/ExpertiseGrid';

export default function ServicesPage() {
  return (
    <div className="pt-24 space-y-0">
      
      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-brand-bgWarm via-white to-brand-bgLight border-b border-brand-borderLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-4 py-1.5 rounded-full gold-badge inline-block">
            OUR COMPREHENSIVE SERVICES
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-charcoal tracking-tight max-w-3xl mx-auto">
            Complete Food Business Support, From Idea to Growth.
          </h1>

          <p className="text-brand-slate text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you're launching a product, renewing your FSSAI license, preparing for certification or setting up a food factory, our experts are here to support every stage.
          </p>
        </div>
      </section>

      {/* Grid rendering all 11 services */}
      <ServiceGrid showHeading={false} />

      {/* Core Domain Pillars */}
      <ExpertiseGrid />

      {/* CTA */}
      <CTASection />

    </div>
  );
}
