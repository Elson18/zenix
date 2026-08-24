import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { sendContactEmail } from '../services/emailjs';

interface AssessmentCTAProps {
  businessTypeLabel: string;
  businessStageLabel: string;
  overallScore: number;
  categoryScoresText: string;
  focusSummaryText: string;
  categoryScoresFormatted?: string;
  attentionAreas?: string;
  recommendedServices?: string;
}

export default function AssessmentCTA({
  businessTypeLabel,
  businessStageLabel,
  overallScore,
  categoryScoresText,
  focusSummaryText,
  categoryScoresFormatted = '',
  attentionAreas = '',
  recommendedServices = ''
}: AssessmentCTAProps) {
  const [showForm, setShowForm] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(''); // Honeypot field

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: businessTypeLabel,
    requirement: 'Food Business Readiness Assessment Consultation',
    message: `I have completed the Zenix Food Business Readiness Assessment.\n\nType: ${businessTypeLabel}\nStage: ${businessStageLabel}\nIllustrative Food Business Readiness Score: ${overallScore}%`
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'loading') return;

    setStatus('loading');
    setIsSubmissionError(false);
    setValidationErrors({});

    // Honeypot check
    if (website) {
      console.log('[Spam Protection] Honeypot triggered in AssessmentCTA. Simulating success.');
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setWebsite('');
      return;
    }

    // Validations
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please enter a valid email address.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else {
      const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }

    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus('idle');
      return;
    }

    // Compile the message body
    let finalMessage = formData.message;
    if (includeSummary) {
      finalMessage += `\n\n--- ASSESSMENT PROFILE ---\nIllustrative Food Business Readiness Score: ${overallScore}%\nBusiness Stage: ${businessStageLabel}\n\n${categoryScoresText}\nFocus Areas: ${focusSummaryText}\n\nDisclaimer: This self-assessment is for general informational purposes only and does not constitute a formal compliance audit, certification or legal advice.`;
    }

    const emailPayload: any = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      business_type: formData.businessType,
      requirement: formData.requirement,
      message: finalMessage,
      ...(includeSummary ? {
        assessment_score: `${overallScore}%`,
        category_scores: categoryScoresFormatted,
        attention_areas: attentionAreas,
        recommended_services: recommendedServices
      } : {})
    };

    try {
      await sendContactEmail(emailPayload);
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmissionError(true);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setIsSubmissionError(false);
    setValidationErrors({});
    setShowForm(false);
  };

  return (
    <div id="consultation-section" className="bg-brand-black text-white rounded-3xl border border-brand-primary/30 p-8 sm:p-12 relative overflow-hidden space-y-8 select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      {status === 'success' ? (
        <div className="text-center py-12 space-y-6 max-w-lg mx-auto relative z-10 animate-fadeIn" aria-live="polite">
          <div className="w-20 h-20 bg-brand-primary/20 border border-brand-primary/40 rounded-full flex items-center justify-center mx-auto text-brand-primary">
            <CheckCircle2 className="w-12 h-12" style={{ color: '#F0B000' }} />
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-white">
            Thank You!
          </h2>
          <p className="text-brand-primaryLight/80 text-base leading-relaxed">
            Your consultation request has been received successfully. Our team will review your requirement and get back to you soon.
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm hover:bg-brand-primaryDark transition-all duration-300 shadow-gold"
            style={{ backgroundColor: '#F0B000' }}
          >
            Back to Website
          </button>
        </div>
      ) : status === 'error' && isSubmissionError ? (
        <div className="text-center py-12 space-y-6 max-w-lg mx-auto relative z-10 animate-fadeIn" aria-live="polite">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-white">
            Something went wrong
          </h2>
          <p className="text-brand-primaryLight/80 text-base leading-relaxed">
            We couldn't send your request right now. Please try again or contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setStatus('idle');
                setIsSubmissionError(false);
              }}
              className="px-6 py-3 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm hover:bg-brand-primaryDark transition-all duration-300 shadow-gold"
              style={{ backgroundColor: '#F0B000' }}
            >
              Try Again
            </button>
            <a
              href="mailto:info@zenixfoodworx.com"
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-heading font-bold text-sm transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      ) : (
        <div className="relative z-10 space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white/5 border border-white/10">
              NEXT STEP OPTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight text-white">
              Want a Clearer Path Forward?
            </h2>
            <p className="text-brand-primaryLight/85 text-sm sm:text-base leading-relaxed">
              Your assessment is a starting point. Our team can help you understand your specific requirements, audit your layout details, and identify practical next steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark border border-brand-primary/20 text-brand-black font-heading font-semibold text-base shadow-subtle hover:scale-[1.01] transition-all"
              style={{ backgroundColor: '#F0B000' }}
            >
              <MessageCircle className="w-5 h-5 text-brand-black" />
              <span>Talk to a Zenix Expert</span>
            </button>

            <NavLink
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-heading font-semibold text-base transition-all"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          {/* Consultation Form Panel */}
          {showForm && (
            <form onSubmit={handleSubmit} className="border-t border-white/10 pt-8 space-y-6 max-w-4xl animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-white">Schedule Your Expert Consultation</h3>
                <p className="text-xs text-brand-primaryLight/70">Please submit your details below to book a free 15-minute call.</p>
              </div>

              {/* Spam Protection Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-primaryLight/70 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Verma"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-brand-primary focus:ring-brand-primary'
                    } text-white text-sm outline-none transition-all`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-red-400 text-xs mt-1" aria-live="assertive">{validationErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-primaryLight/70 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-brand-primary focus:ring-brand-primary'
                    } text-white text-sm outline-none transition-all`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-xs mt-1" aria-live="assertive">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-primaryLight/70 mb-2">
                    Phone / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-brand-primary focus:ring-brand-primary'
                    } text-white text-sm outline-none transition-all`}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-400 text-xs mt-1" aria-live="assertive">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-primaryLight/70 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Foods"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Text message box */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-primaryLight/70 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your current setup or queries..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                    validationErrors.message ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-brand-primary focus:ring-brand-primary'
                  } text-white text-sm outline-none transition-all resize-none`}
                />
                {validationErrors.message && (
                  <p className="text-red-400 text-xs mt-1" aria-live="assertive">{validationErrors.message}</p>
                )}
              </div>

              {/* Checkbox to share summary */}
              <div className="flex items-center gap-3 select-none">
                <input
                  type="checkbox"
                  id="includeSummary"
                  checked={includeSummary}
                  onChange={(e) => setIncludeSummary(e.target.checked)}
                  className="w-4.5 h-4.5 accent-brand-primary rounded border-white/20 focus:ring-0 cursor-pointer"
                  style={{ accentColor: '#F0B000' }}
                />
                <label htmlFor="includeSummary" className="text-xs sm:text-sm text-brand-primaryLight/90 cursor-pointer">
                  Include my readiness assessment summary in the inquiry details
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-brand-black font-heading font-extrabold text-sm shadow-md disabled:opacity-75"
                style={{ backgroundColor: '#F0B000' }}
                aria-live="polite"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-black" />
                    <span>Sending Request...</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <span>Try Again</span>
                  </>
                ) : (
                  <>
                    <span>Get a Consultation →</span>
                    <ArrowRight className="w-4 h-4 text-brand-black" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

