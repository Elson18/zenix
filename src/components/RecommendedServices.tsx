import React from 'react';
import { ServiceRecommendation } from '../data/scoringRules';
import { NavLink } from 'react-router-dom';
import { ArrowRight, AlertCircle, Bookmark, Compass } from 'lucide-react';

interface RecommendedServicesProps {
  recommendations: ServiceRecommendation[];
}

export default function RecommendedServices({ recommendations }: RecommendedServicesProps) {
  // Take top 3 recommended services to keep the grid elegant
  const topRecs = recommendations.slice(0, 3);

  if (topRecs.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-brand-border pb-3">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-black">
          Recommended Zenix Services
        </h3>
        <p className="text-xs text-brand-textMuted">
          Based on your assessment, we recommend exploring these services first to resolve key gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRecs.map((rec) => {
          let badgeColor = 'bg-brand-primaryLight text-brand-primaryDark';
          let priorityIcon = <Compass className="w-4 h-4 text-brand-primaryDark" />;
          
          if (rec.priority === 'High Priority') {
            badgeColor = 'bg-amber-100 text-amber-800';
            priorityIcon = <AlertCircle className="w-4 h-4 text-amber-600" />;
          } else if (rec.priority === 'Recommended') {
            badgeColor = 'bg-brand-primaryLight border border-brand-primary/20 text-brand-primaryDark';
            priorityIcon = <Bookmark className="w-4 h-4 text-brand-primaryDark" />;
          }

          return (
            <div
              key={rec.serviceId}
              className="bg-white rounded-2xl border border-brand-border hover:border-brand-primary/45 shadow-subtle hover:shadow-card-hover p-6 flex flex-col justify-between space-y-6 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider ${badgeColor}`}>
                    {priorityIcon}
                    {rec.priority}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-brand-black leading-snug group-hover:text-brand-primary transition-colors">
                    {rec.serviceTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <NavLink
                  to={`/services/${rec.serviceSlug}`}
                  className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-brand-black hover:text-brand-primary group-hover:translate-x-0.5 transition-all"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
