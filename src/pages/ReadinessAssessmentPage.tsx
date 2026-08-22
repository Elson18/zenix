import React, { useEffect } from 'react';
import ReadinessAssessment from '../components/ReadinessAssessment';
import { ClipboardCheck } from 'lucide-react';

export default function ReadinessAssessmentPage() {
  // Update browser window title for SEO and user recognition
  useEffect(() => {
    document.title = 'Check Your Food Business Readiness | Zenix Food Worx';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 space-y-0 bg-white min-h-screen flex flex-col justify-between">
      
      {/* Page Hero Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border">
            Self-Assessment Tool
          </span>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight max-w-3xl mx-auto">
            Food Business Readiness Assessment
          </h1>

          <p className="text-brand-textSecondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Identify potential gaps in your FSSAI licensing, laboratory testing, label design, safety documentation, and operations.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <ReadinessAssessment />
      </div>

    </div>
  );
}
