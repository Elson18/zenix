import React from 'react';
import { CategoryScoreResult } from '../data/scoringRules';

interface CategoryScoresProps {
  categoryScores: CategoryScoreResult[];
}

export default function CategoryScores({ categoryScores }: CategoryScoresProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-borderSubtle pb-3">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-charcoal">
          Category Scores
        </h3>
        <p className="text-xs text-brand-muted">
          Your readiness score breakdown across key business compliance areas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {categoryScores.map((cat) => {
          if (cat.score === null) return null;

          const scoreVal = Math.round(cat.score);
          
          // Color coding:
          // GOOD (>= 75%) -> Green
          // REVIEW (50% - 74%) -> Neutral / Gray
          // ATTENTION (< 50%) -> Amber
          let progressBgColor = 'bg-brand-slate';
          let textColor = 'text-brand-slate bg-brand-borderSubtle';
          let statusLabel = 'REVIEW';

          if (cat.status === 'GOOD') {
            progressBgColor = 'bg-brand-fresh';
            textColor = 'text-brand-fresh bg-brand-softGreen';
            statusLabel = 'GOOD';
          } else if (cat.status === 'REVIEW') {
            progressBgColor = 'bg-brand-slate';
            textColor = 'text-brand-charcoal bg-brand-bgWarm border border-brand-borderLight';
            statusLabel = 'REVIEW';
          } else if (cat.status === 'ATTENTION') {
            progressBgColor = 'bg-amber-500';
            textColor = 'text-amber-800 bg-amber-50';
            statusLabel = 'ATTENTION';
          }

          return (
            <div key={cat.categoryId} className="space-y-2 p-4 rounded-2xl bg-brand-bgLight/40 border border-brand-borderSubtle hover:shadow-subtle transition-all duration-300">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold font-mono font-bold">{cat.categoryNumber}</span>
                  <span className="font-heading font-bold text-brand-charcoal">{cat.categoryName}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-brand-charcoal">{scoreVal}%</span>
                  <span className={`px-2 py-0.5 rounded-full font-heading font-extrabold text-[10px] uppercase tracking-wider ${textColor}`}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-brand-borderLight rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressBgColor} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${scoreVal}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
