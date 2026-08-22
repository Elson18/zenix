import React from 'react';
import { NextStepItem } from '../data/scoringRules';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface NextStepsProps {
  nextSteps: NextStepItem[];
  onTalkToExpert: () => void;
}

export default function NextSteps({ nextSteps, onTalkToExpert }: NextStepsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-borderSubtle pb-3">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-charcoal">
          Suggested Next Steps
        </h3>
        <p className="text-xs text-brand-muted">
          Your path forward compiled based on the compliance gaps identified.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {nextSteps.map((step, idx) => {
          const stepNumber = String(idx + 1).padStart(2, '0');
          const isLast = idx === nextSteps.length - 1;

          return (
            <div
              key={step.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all duration-300 relative ${
                isLast
                  ? 'border-brand-gold bg-brand-lightGold/60 hover:shadow-subtle'
                  : 'border-brand-borderLight bg-white hover:shadow-subtle'
              }`}
            >
              <div className="space-y-3">
                <span className="font-heading font-extrabold text-2xl text-brand-gold font-mono block leading-none">
                  {stepNumber}
                </span>
                <p className="text-xs sm:text-sm font-heading font-semibold text-brand-charcoal leading-relaxed">
                  {step.text}
                </p>
              </div>

              {isLast && (
                <div className="pt-2">
                  <button
                    onClick={onTalkToExpert}
                    className="inline-flex items-center gap-1.5 font-heading font-bold text-xs text-brand-emerald hover:text-brand-emeraldHover transition-all group"
                  >
                    <span>Talk to an Expert</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
