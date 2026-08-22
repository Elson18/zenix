import React from 'react';
import { businessStages } from '../data/businessStages';
import { ChevronRight } from 'lucide-react';

interface AssessmentBusinessStageProps {
  selectedId: string;
  onChange: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AssessmentBusinessStage({
  selectedId,
  onChange,
  onNext,
  onBack
}: AssessmentBusinessStageProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand-border shadow-card-hover p-8 sm:p-12 space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black tracking-tight">
          Where are you currently in your business journey?
        </h2>
        <p className="text-brand-textSecondary text-sm sm:text-base">
          This helps calibrate the next steps and recommended services for your operational timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businessStages.map((stage) => {
          const isSelected = selectedId === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => onChange(stage.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(stage.id);
                }
              }}
              className={`flex items-start justify-between text-left p-5 rounded-2xl border transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-brand-primary bg-brand-primaryLight/40 shadow-sm ring-1 ring-brand-primary'
                  : 'border-brand-border hover:border-brand-primary/40 hover:bg-brand-backgroundSoft/45'
              }`}
              aria-checked={isSelected}
              role="radio"
            >
              <div className="space-y-1 pr-4">
                <h3 className="font-heading font-bold text-sm sm:text-base text-brand-black">
                  {stage.label}
                </h3>
                <p className="text-xs text-brand-textMuted leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Indicator Circle */}
              <div className="w-5 h-5 rounded-full border border-brand-border flex items-center justify-center shrink-0 mt-0.5">
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-brand-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-brand-border">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-brand-border text-brand-black font-heading font-semibold text-sm hover:bg-brand-backgroundSoft transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedId}
          className="px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark disabled:opacity-50 text-brand-black font-heading font-semibold text-sm shadow-gold transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
