import React from 'react';
import { ServiceRecommendation } from '../data/scoringRules';
import { AlertCircle, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface AttentionAreasProps {
  recommendations: ServiceRecommendation[];
}

export default function AttentionAreas({ recommendations }: AttentionAreasProps) {
  // Only show active gaps or relevant services. 
  // We want to list the areas that need attention first, followed by others.
  
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-borderSubtle pb-3">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-charcoal">
          Areas That May Need Attention
        </h3>
        <p className="text-xs text-brand-muted">
          Specific compliance and quality vectors grouped by priority level.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          let statusColor = 'text-brand-slate border-brand-borderLight bg-brand-bgLight/40';
          let icon = <CheckCircle2 className="w-5 h-5 text-brand-fresh shrink-0 mt-0.5" />;
          let label = 'GOOD';
          let wording = 'Addressed';
          let ctaText = 'Explore Service';

          if (rec.priority === 'High Priority') {
            statusColor = 'border-amber-100 bg-amber-50/50';
            icon = <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
            label = 'ATTENTION';
            wording = 'May Need Attention';
            ctaText = `Explore ${rec.serviceTitle}`;
          } else if (rec.priority === 'Recommended') {
            statusColor = 'border-brand-goldBorder bg-brand-lightGold/40';
            icon = <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />;
            label = 'REVIEW';
            wording = 'May Benefit from Review';
            ctaText = `Explore ${rec.serviceTitle}`;
          } else {
            // Consider state (fulfilled)
            statusColor = 'border-brand-borderLight bg-white';
            icon = <CheckCircle2 className="w-5 h-5 text-brand-fresh shrink-0 mt-0.5" />;
            label = 'GOOD';
            wording = 'Addressed';
            ctaText = `View ${rec.serviceTitle}`;
          }

          return (
            <div
              key={rec.serviceId}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:shadow-subtle ${statusColor}`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5 shrink-0">{icon}</div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-heading font-extrabold text-sm sm:text-base text-brand-charcoal">
                      {rec.serviceTitle}
                    </h4>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase font-mono ${
                      rec.priority === 'High Priority' ? 'bg-amber-100 text-amber-800' :
                      rec.priority === 'Recommended' ? 'bg-brand-lightGold border border-brand-goldBorder/50 text-brand-gold' :
                      'bg-brand-softGreen text-brand-fresh'
                    }`}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <NavLink
                  to={`/services/${rec.serviceSlug}`}
                  className={`inline-flex items-center gap-1.5 font-heading font-semibold text-xs transition-colors py-2 px-4 rounded-xl border ${
                    rec.priority === 'High Priority' ? 'border-amber-200 text-amber-800 hover:bg-amber-100/40 bg-white' :
                    rec.priority === 'Recommended' ? 'border-brand-goldBorder text-brand-gold hover:bg-brand-lightGold bg-white' :
                    'border-brand-borderLight text-brand-charcoal hover:bg-brand-bgLight bg-white'
                  }`}
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
