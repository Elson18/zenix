import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../data/servicesData';

interface ServiceGridProps {
  limit?: number;
  showHeading?: boolean;
}

export default function ServiceGrid({ limit, showHeading = true }: ServiceGridProps) {
  const displayedServices = limit ? servicesData.slice(0, limit) : servicesData;

  return (
    <section className="py-20 bg-brand-bgWarm/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block">
              OUR SERVICES
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              Complete Food Business Support, From Idea to Growth.
            </h2>
            <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
              Whether you're launching a product, renewing your FSSAI license, preparing for certification or setting up a food business, our experts are here to support every stage.
            </p>
          </div>
        )}

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
