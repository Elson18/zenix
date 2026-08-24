import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { businessTypes } from '../data/businessTypes';
import { businessStages } from '../data/businessStages';
import { requirements } from '../data/requirements';
import { getRecommendedServices, RecommendedService } from '../data/serviceRecommendations';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';
import { sendContactEmail } from '../services/emailjs';

export default function ProgressiveConsultation() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(''); // Honeypot field

  // Form State
  const [businessType, setBusinessType] = useState('food-manufacturer');
  const [businessStage, setBusinessStage] = useState('new-idea');
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: ''
  });

  const [recommended, setRecommended] = useState<RecommendedService[]>([]);

  // Listen to global open event
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.service) {
          // Pre-fill requirement if triggered from a specific service detail page
          const matchingReq = requirements.find(r => r.label.toLowerCase().includes(customEvent.detail.service.toLowerCase()) || customEvent.detail.service.toLowerCase().includes(r.label.toLowerCase()));
          if (matchingReq) {
            setSelectedReqs([matchingReq.id]);
          } else {
            setMessage(`Inquiry regarding: ${customEvent.detail.service}`);
          }
        }
        if (customEvent.detail.step) {
          setStep(customEvent.detail.step);
        }
      }
      setStatus('idle');
      setIsSubmissionError(false);
      setValidationErrors({});
      setIsOpen(true);
    };

    window.addEventListener('open-consultation', handleOpen);
    return () => window.removeEventListener('open-consultation', handleOpen);
  }, []);

  // Update recommendations whenever selections change
  useEffect(() => {
    if (isOpen) {
      const recs = getRecommendedServices({
        businessType,
        businessStage,
        requirements: selectedReqs,
        priority: 'general'
      });
      setRecommended(recs.slice(0, 3));
    }
  }, [businessType, businessStage, selectedReqs, isOpen]);

  const handleCheckboxChange = (reqId: string) => {
    if (selectedReqs.includes(reqId)) {
      setSelectedReqs(selectedReqs.filter(r => r !== reqId));
    } else {
      setSelectedReqs([...selectedReqs, reqId]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
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

    // Honeypot spam check
    if (website) {
      console.log('[Spam Protection] Honeypot triggered in ProgressiveConsultation. Simulating success.');
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setWebsite('');
      return;
    }

    // Validations
    const errors: Record<string, string> = {};
    if (!contactInfo.fullName.trim()) {
      errors.fullName = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email.trim()) {
      errors.email = 'Please enter a valid email address.';
    } else if (!emailRegex.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!contactInfo.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else {
      const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
      if (!phoneRegex.test(contactInfo.phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus('idle');
      return;
    }

    const payload = {
      name: contactInfo.fullName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      business_type: businessTypes.find(t => t.id === businessType)?.label || businessType,
      requirement: selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', ') || 'General Consultation',
      message: `Stage: ${businessStages.find(s => s.id === businessStage)?.label || businessStage}\nRecommended Services: ${recommended.map(r => r.service.title).join(', ')}\n\nMessage: ${message || 'No additional message provided.'}`
    };

    try {
      trackEvent('service_finder_completed', {
        businessType: payload.business_type,
        businessStage: businessStage,
        requirement: payload.requirement,
        recommendationsCount: recommended.length,
        page: 'progressive_consultation'
      });

      await sendContactEmail(payload);
      setStatus('success');
    } catch (err) {
      console.error('Progressive submission error:', err);
      setIsSubmissionError(true);
      setStatus('error');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset steps after delay
    setTimeout(() => {
      setStep(1);
      setMessage('');
      setContactInfo({ fullName: '', companyName: '', phone: '', email: '' });
      setSelectedReqs([]);
      setStatus('idle');
      setIsSubmissionError(false);
      setValidationErrors({});
    }, 300);
  };

  // WhatsApp CTA direct click helper
  const getWhatsAppMessage = () => {
    const selectedLabels = selectedReqs.map(id => requirements.find(r => r.id === id)?.label);
    const bType = businessTypes.find(t => t.id === businessType)?.label || '';
    const bStage = businessStages.find(s => s.id === businessStage)?.label || '';
    
    return `Hi Zenix Food Worx, I would like to get a consultation. 
Business Type: ${bType}
Stage: ${bStage}
Requirements: ${selectedLabels.join(', ') || 'General'}`;
  };

  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="bg-white rounded-3xl w-full max-w-2xl border border-brand-border shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-backgroundSoft">
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-black">
                  Get a Zenix Food Consultation
                </h3>
                <p className="text-xs text-brand-textMuted mt-0.5">
                  Step {step} of 4: {
                    step === 1 ? 'Business Context' :
                    step === 2 ? 'Your Needs' :
                    step === 3 ? 'Recommended Services' : 'Submit Details'
                  }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-brand-textSecondary hover:bg-brand-border/30 hover:text-brand-primary transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              
              {status === 'success' ? (
                <div className="text-center py-12 space-y-6 animate-fadeIn" aria-live="polite">
                  <div className="w-20 h-20 bg-brand-primaryLight rounded-full flex items-center justify-center mx-auto text-brand-primaryDark border border-brand-primary/20">
                    <CheckCircle2 className="w-12 h-12" style={{ color: '#F0B000' }} />
                  </div>
                  <h4 className="font-heading font-extrabold text-2xl text-brand-black">
                    Thank You!
                  </h4>
                  <p className="text-sm text-brand-textSecondary max-w-md mx-auto leading-relaxed">
                    Your consultation request has been received successfully. Our team will review your requirement and get back to you soon.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-semibold text-sm shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current text-brand-primary" />
                      <span className="text-white">Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl border border-brand-border hover:border-brand-primary hover:text-brand-primary text-brand-black font-heading font-semibold text-sm transition-all"
                    >
                      Back to Website
                    </button>
                  </div>
                </div>
              ) : status === 'error' && isSubmissionError ? (
                <div className="text-center py-12 space-y-6 animate-fadeIn" aria-live="polite">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-150">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                  </div>
                  <h4 className="font-heading font-extrabold text-2xl text-brand-black">
                    Something went wrong
                  </h4>
                  <p className="text-sm text-brand-textSecondary max-w-md mx-auto leading-relaxed">
                    We couldn't send your request right now. Please try again or contact us directly.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setIsSubmissionError(false);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm hover:bg-brand-primaryDark transition-all duration-300 shadow-gold"
                      style={{ backgroundColor: '#F0B000' }}
                    >
                      Try Again
                    </button>
                    <a
                      href="mailto:info@zenixfoodworx.com"
                      className="px-6 py-2.5 rounded-xl border border-brand-border hover:bg-brand-backgroundSoft text-brand-black font-heading font-bold text-sm transition-all duration-300 flex items-center justify-center"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  {/* STEP 1: Business Context */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
                          What type of food business are you?
                        </label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none bg-white transition-all"
                        >
                          {businessTypes.map(t => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
                          Where are you in your journey?
                        </label>
                        <select
                          value={businessStage}
                          onChange={(e) => setBusinessStage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none bg-white transition-all"
                        >
                          {businessStages.map(s => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="p-4 rounded-xl bg-brand-primaryLight/30 border border-brand-primary/10 text-xs text-brand-textSecondary leading-relaxed">
                        Setting this context helps our algorithms recommend the specific testing, labeling, and licensing actions you need.
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Requirements */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-3">
                          What do you need help with? (Select all that apply)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                          {requirements.map(req => (
                            <label
                                key={req.id}
                                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                                  selectedReqs.includes(req.id)
                                    ? 'bg-brand-primaryLight border-brand-primary/40 text-brand-black'
                                    : 'bg-white border-brand-border hover:bg-brand-backgroundSoft text-brand-textSecondary'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedReqs.includes(req.id)}
                                  onChange={() => handleCheckboxChange(req.id)}
                                  className="mt-1 rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                                  style={{ accentColor: '#F0B000' }}
                                />
                                <div className="text-xs">
                                  <p className="font-heading font-bold">{req.label}</p>
                                  <p className="text-[10px] text-brand-textMuted mt-0.5 leading-tight">{req.description}</p>
                                </div>
                              </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
                          Additional Requirements / Message (Optional)
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe specific products, license queries, or milestones..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Show Inferred Recommendations */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1">
                          Recommended Services For Your Business
                        </h4>
                        <p className="text-xs text-brand-textSecondary mb-4">
                          Based on your answers, our logic identified these high-relevance solutions.
                        </p>

                        <div className="space-y-3">
                          {recommended.map(rec => (
                            <div
                              key={rec.service.id}
                              className="p-4 rounded-2xl bg-brand-backgroundSoft border border-brand-border flex items-start gap-4"
                            >
                              <span className="w-8 h-8 rounded-lg bg-brand-primaryLight text-brand-primaryDark font-heading font-bold text-xs flex items-center justify-center shrink-0">
                                {rec.matchScore}%
                              </span>
                              <div>
                                <h5 className="font-heading font-bold text-sm text-brand-black">
                                  {rec.service.title}
                                </h5>
                                <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">
                                  {rec.reason}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-brand-primaryLight border border-brand-primary/10 flex items-center justify-between text-xs">
                        <span className="text-brand-textSecondary font-medium">Prefer direct messaging?</span>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-bold text-[11px]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current text-brand-primary" />
                          <span className="text-white">WhatsApp profile</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Contact details to submit */}
                  {step === 4 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            placeholder="e.g. Anil Kumar"
                            value={contactInfo.fullName}
                            onChange={handleContactChange}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              validationErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
                            } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
                          />
                          {validationErrors.fullName && (
                            <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Organic Foods Hub"
                            value={contactInfo.companyName}
                            onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="e.g. +91 98765 43210"
                            value={contactInfo.phone}
                            onChange={handleContactChange}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              validationErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
                            } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
                          />
                          {validationErrors.phone && (
                            <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            value={contactInfo.email}
                            onChange={handleContactChange}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              validationErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
                            } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-brand-textMuted">
                        * Required fields. By submitting this form you authorize Zenix Food Worx consultants to contact you. We keep your business details strictly confidential.
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>

            {/* Footer Buttons */}
            {status !== 'success' && !(status === 'error' && isSubmissionError) && (
              <div className="p-6 border-t border-brand-border bg-brand-backgroundSoft flex items-center justify-between">
                <div>
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-border hover:border-brand-primary hover:text-brand-primary text-brand-black font-heading font-semibold text-sm transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="px-4 py-2.5 rounded-xl border border-transparent text-brand-textSecondary hover:bg-brand-border/30 font-heading font-semibold text-sm transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div>
                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-sm shadow-sm transition-all"
                      style={{ backgroundColor: '#F0B000' }}
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4 text-brand-black" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-sm shadow-md disabled:opacity-75 transition-all"
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
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

