import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 space-y-0">
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white shadow-sm border border-brand-border inline-block">
            LEGAL COMPLIANCE
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black">
            Privacy Policy
          </h1>
          <p className="text-brand-textSecondary text-sm sm:text-base">
            Last Updated: August 2026 • Zenix Food Worx Confidentiality Policy
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-brand-textSecondary text-base leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              1. Introduction
            </h2>
            <p>
              At Zenix Food Worx, we respect your business privacy and are committed to protecting the corporate data, formulation specs, contact details, and facility information shared with us. This Privacy Policy outlines how we collect, use, and protect your information when you interact with our website or engage our food consultancy services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              2. Information We Collect
            </h2>
            <p>
              We collect information provided voluntarily through our consultation contact forms, phone inquiries, email communications, and client onboarding documents. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Full Name, Designation, and Contact Details (Phone Number, Email)</li>
              <li>Company / Brand Name and Food Industry Category</li>
              <li>Facility address and regulatory license details provided for audits</li>
              <li>Product formulation data shared under Non-Disclosure Agreements (NDAs)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              3. Use of Information
            </h2>
            <p>
              Your information is strictly used to evaluate your consultancy requirements, execute regulatory submissions (such as FSSAI filings), coordinate laboratory testing, communicate progress reports, and deliver customized advisory services. We do not sell, rent, or trade client information to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              4. Proprietary Data Security & NDAs
            </h2>
            <p>
              We maintain strict organizational security measures to protect your proprietary food formulations, recipe specifications, factory layouts, and internal audit reports against unauthorized access, loss, or disclosure. Standard Non-Disclosure Agreements (NDAs) are executed prior to reviewing sensitive technical formulation data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              5. Contact Us
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to update your corporate communication preferences, please contact our compliance desk at <span className="font-semibold text-brand-primaryDark">info@zenixfoodworx.com</span>.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
