import React, { useState } from 'react';
import { AssessmentQuestion } from '../data/assessmentQuestions';
import { AnswerValue } from '../data/scoringRules';
import { HelpCircle, Info, ChevronLeft, ChevronRight, Check, X, AlertCircle, HelpCircle as QuestionIcon } from 'lucide-react';

interface AssessmentQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  selectedAnswer: AnswerValue | undefined;
  onAnswer: (value: AnswerValue) => void;
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
}

export default function AssessmentQuestionComponent({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  onContinue,
  onBack,
  canContinue
}: AssessmentQuestionProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const options: { value: AnswerValue; label: string; icon: React.ComponentType<{ className?: string }>; activeClass: string; hoverClass: string }[] = [
    {
      value: 'YES',
      label: 'Yes',
      icon: Check,
      activeClass: 'border-brand-fresh bg-brand-softGreen text-brand-fresh ring-1 ring-brand-fresh',
      hoverClass: 'hover:border-brand-fresh/40 hover:bg-brand-softGreen/30'
    },
    {
      value: 'NO',
      label: 'No',
      icon: X,
      activeClass: 'border-amber-600 bg-amber-50 text-amber-800 ring-1 ring-amber-600',
      hoverClass: 'hover:border-amber-500/40 hover:bg-amber-50/30'
    },
    {
      value: 'NOT_SURE',
      label: 'Not Sure',
      icon: QuestionIcon,
      activeClass: 'border-brand-gold bg-brand-lightGold text-brand-gold ring-1 ring-brand-gold',
      hoverClass: 'hover:border-brand-gold/40 hover:bg-brand-lightGold/30'
    },
    {
      value: 'NA',
      label: 'Not Applicable',
      icon: AlertCircle,
      activeClass: 'border-gray-500 bg-gray-50 text-gray-700 ring-1 ring-gray-500',
      hoverClass: 'hover:border-gray-400/40 hover:bg-gray-50/30'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-borderLight shadow-card-hover p-6 sm:p-10 space-y-8 select-none">
      
      {/* Top Meta info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold">
            Q{questionNumber} • {question.category.toUpperCase()}
          </span>
          
          {question.infoTooltip && (
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="p-1.5 rounded-full text-brand-muted hover:text-brand-emerald hover:bg-brand-bgLight transition-colors relative outline-none focus-visible:ring-1 focus-visible:ring-brand-emerald"
              title="Help information"
              aria-label="Toggle helpful information"
            >
              <Info className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Question text & description */}
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl text-brand-charcoal tracking-tight leading-snug">
            {question.text}
          </h2>
          <p className="text-brand-slate text-xs sm:text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>

        {/* Info Tooltip box */}
        {question.infoTooltip && showTooltip && (
          <div className="p-4 rounded-2xl bg-brand-lightGreen/50 border border-brand-emerald/10 text-xs sm:text-sm text-brand-emerald leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{question.infoTooltip}</span>
          </div>
        )}
      </div>

      {/* Answer Button Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.value;
          const IconComp = opt.icon;

          return (
            <button
              key={opt.value}
              onClick={() => {
                onAnswer(opt.value);
                // Simple feedback & auto-advance could be handled in page,
                // but let's let the user read the explanation and click continue manually.
              }}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2 ${
                isSelected ? opt.activeClass : `border-brand-borderLight text-brand-charcoal ${opt.hoverClass}`
              }`}
              aria-checked={isSelected}
              role="radio"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                isSelected ? 'bg-current text-white' : 'bg-brand-bgWarm text-brand-muted'
              }`}>
                {/* SVG icon inside button */}
                <IconComp className="w-4 h-4 text-brand-slate" />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-brand-borderSubtle">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-brand-borderLight text-brand-charcoal font-heading font-semibold text-sm hover:bg-brand-bgLight transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover disabled:opacity-50 text-white font-heading font-semibold text-sm shadow-sm transition-colors"
        >
          <span>Continue</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
