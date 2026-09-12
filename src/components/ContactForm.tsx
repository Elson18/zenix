import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactEmail } from '../services/emailjs';
import { companyData } from '../data/companyData';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: 'Food Manufacturers',
    serviceRequired: 'Food Testing',
    message: ''
  });

  const [website, setWebsite] = useState(''); // Honeypot field
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const businessTypesOptions = [
    'Food Manufacturers',
    'Hospitality / HoReCa',
    'Food Import / Food Export',
    'Food Start up’s',
    'Retail & E-commerce',
    'Corporates / Educational institutions',
    'Other'
  ];

  const requirementsList = [
    'Food Testing',
    'FSSAI / Licensing',
    'Label Validation',
    'Nutritional Facts',
    'New Product Development',
    'HACCP / ISO',
    'Food Safety & Hygiene',
    'Factory Setup',
    'Restaurant Setup',
    'Contract Manufacturing',
    'General Consultation'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error on change
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

    // Prevent double submission
    if (status === 'loading') return;

    setStatus('loading');
    setIsSubmissionError(false);
    setValidationErrors({});

    // Honeypot spam check
    if (website) {
      console.log('[Spam Protection] Honeypot field filled. Simulating success.');
      // Simulate success delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        businessType: 'Food Manufacturer',
        serviceRequired: 'Food Testing',
        message: ''
      });
      setWebsite('');
      return;
    }

    // Client-side validations
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

    if (!formData.businessType.trim()) {
      errors.businessType = 'Please select your business type.';
    }

    if (!formData.serviceRequired.trim()) {
      errors.serviceRequired = 'Please select a requirement.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus('idle');
      return;
    }

    try {
      await sendContactEmail({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        business_type: formData.businessType,
        requirement: formData.serviceRequired,
        message: formData.companyName
          ? `[Company: ${formData.companyName}]\n\n${formData.message}`
          : formData.message
      });

      setStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        businessType: 'Food Manufacturer',
        serviceRequired: 'Food Testing',
        message: ''
      });
    } catch (err) {
      console.error('EmailJS submission failed:', err);
      setIsSubmissionError(true);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setIsSubmissionError(false);
    setValidationErrors({});
  };

  // 1. Success Screen View
  if (status === 'success') {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-card-hover text-center py-16 space-y-6 animate-fadeIn" aria-live="polite">
        <div className="w-20 h-20 bg-brand-primaryLight rounded-full flex items-center justify-center mx-auto text-brand-primaryDark border border-brand-primary/20">
          <CheckCircle2 className="w-12 h-12" style={{ color: '#F0B000' }} />
        </div>
        <h2 className="font-heading font-extrabold text-3xl text-brand-black">
          Thank You!
        </h2>
        <p className="text-brand-textSecondary max-w-md mx-auto text-base leading-relaxed">
          Your consultation request has been received successfully. Our team will review your requirement and get back to you soon.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-8 py-3 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm hover:bg-brand-primaryDark transition-all duration-300 shadow-gold"
          style={{ backgroundColor: '#F0B000' }}
        >
          Back to Website
        </button>
      </div>
    );
  }

  // 2. Submission Error Screen View
  if (status === 'error' && isSubmissionError) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-card-hover text-center py-16 space-y-6 animate-fadeIn" aria-live="polite">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-150">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="font-heading font-extrabold text-3xl text-brand-black">
          Something went wrong
        </h2>
        <p className="text-brand-textSecondary max-w-md mx-auto text-base leading-relaxed">
          We couldn't send your request right now. Please try again or contact us directly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm hover:bg-brand-primaryDark transition-all duration-300 shadow-gold"
            style={{ backgroundColor: '#F0B000' }}
          >
            Try Again
          </button>
          <a
            href={`mailto:${companyData.contact.email}`}
            className="px-6 py-3 rounded-xl border border-brand-border hover:bg-brand-backgroundSoft text-brand-black font-heading font-bold text-sm transition-all duration-300 flex items-center justify-center"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  // 3. Main Form View
  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-card-hover">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-brand-border pb-4 mb-6">
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black">
            Send Us an Enquiry
          </h3>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
            Fill out the form below and our consultancy team will reach out promptly.
          </p>
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
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g., Rajesh Sharma"
              className={`w-full px-4 py-3 rounded-xl border ${
                validationErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.fullName}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Company / Brand Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Apex Foods Pvt Ltd"
              className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-brand-black text-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 rounded-xl border ${
                validationErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={`w-full px-4 py-3 rounded-xl border ${
                validationErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              } focus:ring-2 text-brand-black text-sm outline-none transition-all`}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Business Type */}
          <div>
            <label htmlFor="businessType" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                validationErrors.businessType ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              } text-brand-black text-sm outline-none bg-white transition-all`}
            >
              {businessTypesOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {validationErrors.businessType && (
              <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.businessType}</p>
            )}
          </div>

          {/* Service Required */}
          <div>
            <label htmlFor="serviceRequired" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
              Requirement <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceRequired"
              name="serviceRequired"
              value={formData.serviceRequired}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                validationErrors.serviceRequired ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              } text-brand-black text-sm outline-none bg-white transition-all`}
            >
              {requirementsList.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
            {validationErrors.serviceRequired && (
              <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.serviceRequired}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-heading font-bold text-brand-black uppercase tracking-wider mb-2">
            How Can We Help You? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your requirement, facility status, or specific compliance questions..."
            className={`w-full px-4 py-3 rounded-xl border ${
              validationErrors.message ? 'border-red-500 focus:ring-red-200' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
            } text-brand-black text-sm outline-none transition-all resize-none`}
          ></textarea>
          {validationErrors.message && (
            <p className="text-red-500 text-xs mt-1" aria-live="assertive">{validationErrors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-xl text-brand-black font-heading font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
          style={{ backgroundColor: '#F0B000' }}
          aria-live="polite"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-brand-black" />
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
      </form>
    </div>
  );
}
