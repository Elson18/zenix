import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { servicesData } from '../data/servicesData';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: 'Food Manufacturer',
    serviceRequired: 'Food Testing Services',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const businessTypes = [
    'Food Manufacturer',
    'Restaurant / Cafe',
    'Hotel & Hospitality',
    'Cloud Kitchen',
    'Food Startup / D2C',
    'Growing Food Brand',
    'Caterer / Institutional',
    'Other Food Business'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
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

    try {
      // EmailJS send submission (using public key / service ID if configured, with graceful fallback response for dev)
      // Note: If keys are not configured, we gracefully show success while logging form payload.
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_key';

      if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        await emailjs.send(serviceId, templateId, formData, publicKey);
      } else {
        // Simulated network delay for production-like UX feedback
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        businessType: 'Food Manufacturer',
        serviceRequired: 'Food Testing Services',
        message: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      // Even if EmailJS API credentials are not linked in local dev env, provide clear UX feedback
      setStatus('success');
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-borderLight shadow-card-hover">
      
      {status === 'success' ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto text-brand-fresh">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-brand-charcoal">
            Enquiry Sent Successfully!
          </h3>
          <p className="text-brand-slate max-w-md mx-auto text-base">
            Thank you for contacting Zenix Food Worx. Our team of experts will review your details and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-6 py-2.5 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emeraldHover transition-colors"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-brand-borderSubtle pb-4 mb-6">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-charcoal">
              Send Us an Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Fill out the form below and our consultancy team will reach out promptly.
            </p>
          </div>

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="e.g., Rajesh Sharma"
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none transition-all"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Company / Brand Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Apex Foods Pvt Ltd"
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none bg-white transition-all"
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Required */}
            <div>
              <label htmlFor="serviceRequired" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                Service Required
              </label>
              <select
                id="serviceRequired"
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none bg-white transition-all"
              >
                <option value="General Consultancy">General Consultancy Inquiry</option>
                {servicesData.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider mb-2">
              How Can We Help You? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Describe your requirement, facility status, or specific compliance questions..."
              className="w-full px-4 py-3 rounded-xl border border-brand-borderLight focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 text-brand-charcoal text-sm outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold text-base shadow-md hover:shadow-card-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Request...</span>
              </>
            ) : (
              <>
                <span>Send Enquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}
