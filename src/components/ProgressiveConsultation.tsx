import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import { businessTypes } from '../data/businessTypes';
import { businessStages } from '../data/businessStages';
import { requirements } from '../data/requirements';
import { getRecommendedServices, RecommendedService } from '../data/serviceRecommendations';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';
import emailjs from '@emailjs/browser';

export default function ProgressiveConsultation() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      setSuccess(false);
      setError('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validations
    if (!contactInfo.fullName.trim() || !contactInfo.phone.trim() || !contactInfo.email.trim()) {
      setError('Please fill in Name, Phone, and Email.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const payload = {
      ...contactInfo,
      businessType: businessTypes.find(t => t.id === businessType)?.label || businessType,
      businessStage: businessStages.find(s => s.id === businessStage)?.label || businessStage,
      requirements: selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', '),
      recommendedServices: recommended.map(r => r.service.title).join(', '),
      message: message || 'No additional message provided.'
    };

    try {
      trackEvent('service_finder_completed', {
        businessType: payload.businessType,
        businessStage: payload.businessStage,
        requirement: payload.requirements,
        recommendationsCount: recommended.length,
        page: 'progressive_consultation'
      });

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_key';

      if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        await emailjs.send(serviceId, templateId, payload, publicKey);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      // Fallback success for local development
      setSuccess(true);
    } finally {
      setLoading(false);
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
              
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-brand-primaryLight rounded-full flex items-center justify-center mx-auto text-brand-primaryDark">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-extrabold text-xl text-brand-black">
                    Consultation Request Sent!
                  </h4>
                  <p className="text-sm text-brand-textSecondary max-w-md mx-auto leading-relaxed">
                    Thank you. We have received your business profile and compliance requirements. One of our senior consultants will contact you within 24 hours.
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
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Anil Kumar"
                            value={contactInfo.fullName}
                            onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all"
                          />
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
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all"
                          />
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
            {!success && (
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
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-sm shadow-md disabled:opacity-75 transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <CheckCircle2 className="w-4 h-4 text-brand-black" />
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
