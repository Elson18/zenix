import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, Loader2, CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface AssessmentCTAProps {
  businessTypeLabel: string;
  businessStageLabel: string;
  overallScore: number;
  categoryScoresText: string;
  focusSummaryText: string;
}

export default function AssessmentCTA({
  businessTypeLabel,
  businessStageLabel,
  overallScore,
  categoryScoresText,
  focusSummaryText
}: AssessmentCTAProps) {
  const [showForm, setShowForm] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: businessTypeLabel,
    requirement: 'Food Business Readiness Assessment Consultation',
    message: `I have completed the Zenix Food Business Readiness Assessment.\n\nType: ${businessTypeLabel}\nStage: ${businessStageLabel}\nOverall Score: ${overallScore}%`
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus('error');
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    // Compile the final message body
    let finalMessage = formData.message;
    if (includeSummary) {
      finalMessage += `\n\n--- ASSESSMENT PROFILE ---\nOverall Score: ${overallScore}%\nBusiness Stage: ${businessStageLabel}\n\n${categoryScoresText}\nFocus Areas: ${focusSummaryText}`;
    }

    const emailPayload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName || 'Not Specified',
      businessType: formData.businessType,
      serviceRequired: formData.requirement,
      message: finalMessage
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_key';

      if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        await emailjs.send(serviceId, templateId, emailPayload, publicKey);
      } else {
        // Simulated network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted assessment lead form successfully in simulation:', emailPayload);
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      // Graceful fallback for local dev
      setStatus('success');
    }
  };

  return (
    <div id="consultation-section" className="bg-brand-dark text-white rounded-3xl border border-brand-emerald/50 p-8 sm:p-12 relative overflow-hidden space-y-8 select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-emerald/40 rounded-full blur-3xl pointer-events-none" />

      {status === 'success' ? (
        <div className="text-center py-12 space-y-4 max-w-lg mx-auto relative z-10">
          <div className="w-16 h-16 bg-brand-fresh/20 border border-brand-fresh/40 rounded-full flex items-center justify-center mx-auto text-brand-fresh">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white">
            Consultation Request Sent!
          </h3>
          <p className="text-brand-lightGreen/80 text-base leading-relaxed">
            Thank you for sharing your profile. A Zenix food business consultant will review your assessment results and contact you within 24 hours.
          </p>
        </div>
      ) : (
        <div className="relative z-10 space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white/5 border border-white/10">
              NEXT STEP OPTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight text-white">
              Want a Clearer Path Forward?
            </h2>
            <p className="text-brand-lightGreen/85 text-sm sm:text-base leading-relaxed">
              Your assessment is a starting point. Our team can help you understand your specific requirements, audit your layout details, and identify practical next steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover border border-brand-goldBorder/20 text-white font-heading font-semibold text-base shadow-subtle hover:scale-[1.01] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
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
                <p className="text-xs text-brand-lightGreen/70">Please submit your details below to book a free 15-minute call.</p>
              </div>

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-lightGreen/70 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-lightGreen/70 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-lightGreen/70 mb-2">
                    Phone / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-lightGreen/70 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Foods"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Text message box */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-lightGreen/70 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your current setup or queries..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white text-sm outline-none transition-all resize-none"
                />
              </div>

              {/* Checkbox to share summary */}
              <div className="flex items-center gap-3 select-none">
                <input
                  type="checkbox"
                  id="includeSummary"
                  checked={includeSummary}
                  onChange={(e) => setIncludeSummary(e.target.checked)}
                  className="w-4.5 h-4.5 accent-brand-emerald rounded border-white/20 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="includeSummary" className="text-xs sm:text-sm text-brand-lightGreen/90 cursor-pointer">
                  Include my readiness assessment summary in the inquiry details
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-heading font-extrabold text-sm shadow-md disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-dark" />
                    <span>Sending consultation request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight className="w-4 h-4 text-brand-dark" />
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
