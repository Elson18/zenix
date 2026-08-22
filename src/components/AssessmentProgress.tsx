import React from 'react';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  categoryName: string;
}

export default function AssessmentProgress({
  currentStep,
  totalSteps,
  percentage,
  categoryName
}: AssessmentProgressProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-3 px-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-heading font-extrabold text-brand-primary uppercase tracking-wider">
            {categoryName}
          </span>
          <span className="text-xs text-brand-textMuted">•</span>
          <span className="text-xs font-semibold text-brand-black">
            Question {currentStep} of {totalSteps}
          </span>
        </div>
        <span className="text-xs font-bold text-brand-primary text-right">
          {percentage}% Complete
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
