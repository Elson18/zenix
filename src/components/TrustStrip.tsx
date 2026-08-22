import React from 'react';
import { companyData } from '../data/companyData';
import { Shield, Award, CheckCircle, FileText, FlaskConical, Utensils, Lightbulb } from 'lucide-react';

export default function TrustStrip() {
  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'FSSAI': return <FileText className="w-4 h-4 text-brand-primary" />;
      case 'HACCP': return <Shield className="w-4 h-4 text-brand-primary" />;
      case 'ISO': return <Award className="w-4 h-4 text-brand-primary" />;
      case 'Food Testing': return <FlaskConical className="w-4 h-4 text-brand-primary" />;
      case 'Food Safety': return <CheckCircle className="w-4 h-4 text-brand-primary" />;
      case 'Hospitality': return <Utensils className="w-4 h-4 text-brand-primary" />;
      case 'Product Development': return <Lightbulb className="w-4 h-4 text-brand-primary" />;
      default: return <CheckCircle className="w-4 h-4 text-brand-primary" />;
    }
  };

  return (
    <section className="py-8 bg-white border-y border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="lg:w-1/3 text-center lg:text-left">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-brand-primary block mb-1">
              Domain Expertise
            </span>
            <h2 className="font-heading font-bold text-base sm:text-lg text-brand-black">
              Trusted Expertise Across Every Stage of Your Food Business
            </h2>
          </div>

          <div className="lg:w-2/3 flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4">
            {companyData.trustPillars.map((pillar) => (
              <div
                key={pillar}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-backgroundSoft border border-brand-border hover:border-brand-primary/40 hover:bg-brand-primaryLight/30 transition-all duration-300 shadow-subtle group"
              >
                {getPillarIcon(pillar)}
                <span className="font-heading font-semibold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-primary transition-colors">
                  {pillar}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
