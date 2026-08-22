import React from 'react';
import { Factory, Store, Hotel, ChefHat, Rocket, Award, Compass, HelpCircle } from 'lucide-react';
import { businessTypes, BusinessType } from '../data/businessTypes';

interface AssessmentBusinessTypeProps {
  selectedId: string;
  onChange: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Factory,
  Store,
  Hotel,
  ChefHat,
  Rocket,
  Award,
  Compass,
  HelpCircle
};

export default function AssessmentBusinessType({
  selectedId,
  onChange,
  onNext,
  onBack
}: AssessmentBusinessTypeProps) {
  // Exclude "planning-business" if the user wants exactly the 7 options: 
  // 1. Food Manufacturer, 2. Food Brand, 3. Restaurant, 4. Hotel / Hospitality, 5. Cloud Kitchen, 6. Food Startup, 7. Other.
  // Note: 'planning-business' in businessTypes is basically the same as Startup or Planning. We can show all 8 or filter down. 
  // Let's show all 8 as defined in the source data file, or keep it standard. All 8 are extremely helpful.
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand-borderLight shadow-card-hover p-8 sm:p-12 space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal tracking-tight">
          What type of food business are you?
        </h2>
        <p className="text-brand-slate text-sm sm:text-base">
          This helps customize the compliance questions and recommendations for your business model.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessTypes.map((type) => {
          const IconComponent = iconMap[type.icon] || HelpCircle;
          const isSelected = selectedId === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(type.id);
                }
              }}
              className={`flex flex-col items-start text-left p-5 rounded-2xl border transition-all relative outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-brand-emerald bg-brand-lightGreen/40 shadow-sm ring-1 ring-brand-emerald'
                  : 'border-brand-borderLight hover:border-brand-emerald/40 hover:bg-brand-bgLight/40'
              }`}
              aria-checked={isSelected}
              role="radio"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                isSelected ? 'bg-brand-emerald text-white' : 'bg-brand-bgWarm text-brand-emerald'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <h3 className="font-heading font-bold text-sm text-brand-charcoal mb-1">
                {type.label}
              </h3>
              
              <p className="text-[11px] sm:text-xs text-brand-muted leading-relaxed">
                {type.description}
              </p>

              {/* Selection Dot */}
              <div className="absolute top-4 right-4 w-4 h-4 rounded-full border flex items-center justify-center border-brand-borderLight">
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-brand-borderSubtle">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-brand-borderLight text-brand-charcoal font-heading font-semibold text-sm hover:bg-brand-bgLight transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedId}
          className="px-8 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover disabled:opacity-50 text-white font-heading font-semibold text-sm shadow-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
