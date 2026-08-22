import React, { useEffect } from 'react';
import { UserAnswers, calculateResults, getRecommendedServicesResults, generatePersonalizedSummary, compileNextSteps } from '../data/scoringRules';
import { businessTypes } from '../data/businessTypes';
import { businessStages } from '../data/businessStages';
import CategoryScores from './CategoryScores';
import AttentionAreas from './AttentionAreas';
import RecommendedServices from './RecommendedServices';
import NextSteps from './NextSteps';
import AssessmentCTA from './AssessmentCTA';
import { Printer, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentResultsProps {
  businessType: string;
  businessStage: string;
  answers: UserAnswers;
  onRetake: () => void;
}

export default function AssessmentResults({
  businessType,
  businessStage,
  answers,
  onRetake
}: AssessmentResultsProps) {
  // Run calculations
  const { overallScore, categoryScores, interpretation } = calculateResults(businessType, answers);
  const recommendations = getRecommendedServicesResults(businessType, answers);
  const focusSummary = generatePersonalizedSummary(businessType, categoryScores);
  const nextSteps = compileNextSteps(businessType, answers);

  const bTypeLabel = businessTypes.find(t => t.id === businessType)?.label || 'Food Business';
  const bStageLabel = businessStages.find(s => s.id === businessStage)?.label || 'Idea/Planning';

  const handlePrint = () => {
    window.print();
  };

  // Scroll to top when results mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute circular chart dash values
  const radius = 58;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  // Compile scores list in raw text for EmailJS
  const categoryScoresText = categoryScores
    .map(c => `- ${c.categoryName}: ${c.score !== null ? `${Math.round(c.score)}%` : 'N/A'}`)
    .join('\n');

  // Define score interpretation styling
  let scoreColorClass = 'text-brand-slate';
  let scoreBadgeBg = 'bg-brand-bgLight';
  if (interpretation.status === 'Strong' || interpretation.status === 'Good') {
    scoreColorClass = 'text-brand-fresh';
    scoreBadgeBg = 'bg-brand-softGreen';
  } else if (interpretation.status === 'Attention') {
    scoreColorClass = 'text-amber-600';
    scoreBadgeBg = 'bg-amber-50';
  } else {
    scoreColorClass = 'text-brand-slate';
    scoreBadgeBg = 'bg-brand-bgWarm';
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12 print-card select-none">
      {/* Stylesheet injection for clean prints */}
      <style>{`
        @media print {
          header, footer, nav, .whatsapp-btn, .sticky-bar, .no-print, button, a {
            display: none !important;
          }
          body, main {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .print-header {
            display: flex !important;
            flex-direction: column;
            border-bottom: 2px solid #000;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .print-section-divider {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 20px;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Print-Only Header Logo */}
      <div className="hidden print-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-extrabold text-2xl tracking-tight text-brand-emerald">
              ZENIX FOOD WORX
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-brand-gold uppercase">
              Food Business Readiness Assessment Report
            </p>
          </div>
          <div className="text-right text-xs text-brand-muted">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Type: {bTypeLabel}</p>
            <p>Stage: {bStageLabel}</p>
          </div>
        </div>
      </div>

      {/* 1. Score Summary Hero Panel */}
      <div className="bg-white rounded-3xl border border-brand-borderLight shadow-card-hover p-8 sm:p-12 relative overflow-hidden">
        {/* Subtle details */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lightGreen/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Circular Chart Container */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Radial Meter */}
              <svg className="w-full h-full transform -rotate-95">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Active Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={
                    interpretation.status === 'Strong' || interpretation.status === 'Good' ? '#166534' :
                    interpretation.status === 'Attention' ? '#D97706' : '#111827'
                  }
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Central Text */}
              <div className="absolute text-center">
                <span className="font-heading font-black text-4xl text-brand-charcoal block leading-none">
                  {overallScore}%
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-muted mt-1 block">
                  Readiness
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Block */}
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <span className="text-xs font-heading font-bold text-brand-muted uppercase">
                {bTypeLabel} • {bStageLabel}
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal leading-tight">
              Your Food Business Readiness Score
            </h2>

            <div className="inline-block">
              <span className={`px-4 py-1.5 rounded-full font-heading font-black text-sm uppercase tracking-wider ${scoreBadgeBg} ${scoreColorClass}`}>
                {interpretation.title}
              </span>
            </div>

            <p className="text-brand-slate text-sm sm:text-base leading-relaxed max-w-2xl">
              {interpretation.description}
            </p>
          </div>

        </div>

        {/* Personalized focus paragraph */}
        <div className="mt-8 pt-8 border-t border-brand-borderSubtle">
          <p className="text-brand-charcoal font-heading font-semibold text-sm sm:text-base leading-relaxed">
            {focusSummary}
          </p>
        </div>

        {/* Action Controls for Results */}
        <div className="mt-8 pt-6 border-t border-brand-borderSubtle flex flex-wrap items-center justify-between gap-4 no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-brand-borderLight text-brand-charcoal hover:bg-brand-bgLight transition-colors font-heading font-semibold text-sm shadow-subtle hover:scale-[1.01]"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Assessment Report</span>
          </button>

          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-brand-borderLight text-brand-charcoal hover:text-brand-emerald hover:border-brand-emerald transition-colors font-heading font-semibold text-sm hover:scale-[1.01]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* 2. Category score meters */}
      <div className="print-section-divider">
        <CategoryScores categoryScores={categoryScores} />
      </div>

      {/* 3. Focus Attention Areas */}
      <div className="print-section-divider">
        <AttentionAreas recommendations={recommendations} />
      </div>

      {/* 4. Service Recommendations */}
      <div className="print-section-divider">
        <RecommendedServices recommendations={recommendations} />
      </div>

      {/* 5. Sequence Checklists */}
      <div className="print-section-divider">
        <NextSteps
          nextSteps={nextSteps}
          onTalkToExpert={() => {
            const el = document.getElementById('consultation-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* 6. Lead Generation contact Form */}
      <div className="print-section-divider no-print">
        <AssessmentCTA
          businessTypeLabel={bTypeLabel}
          businessStageLabel={bStageLabel}
          overallScore={overallScore}
          categoryScoresText={categoryScoresText}
          focusSummaryText={focusSummary}
        />
      </div>

      {/* 7. Disclaimer Notice */}
      <div className="p-6 rounded-2xl bg-brand-bgLight/40 border border-brand-borderSubtle flex gap-3 text-xs sm:text-sm text-brand-slate leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-brand-slate shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-heading font-extrabold text-brand-charcoal block uppercase tracking-wider text-[10px]">
            Regulatory Disclaimer
          </span>
          <p>
            This self-assessment is for general informational purposes only and does not constitute a formal compliance audit, official certification, regulatory approval, or legal advice. FSSAI rules, laboratory parameters, and metrology standards vary based on your product specs, facility capacity, and location.
          </p>
        </div>
      </div>
    </div>
  );
}
