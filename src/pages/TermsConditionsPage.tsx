import React from 'react';

export default function TermsConditionsPage() {
  return (
    <div className="pt-24 space-y-0">
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white shadow-sm border border-brand-border inline-block">
            LEGAL AGREEMENT
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black">
            Terms & Conditions
          </h1>
          <p className="text-brand-textSecondary text-sm sm:text-base">
            Last Updated: August 2026 • General Terms of Engagement
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-brand-textSecondary text-base leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the Zenix Food Worx website or engaging our advisory, regulatory, testing, or setup consultancy services, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              2. Consultancy Scope & Advisory Services
            </h2>
            <p>
              Zenix Food Worx provides professional regulatory guidance, FSSAI application support, laboratory testing coordination, packaging validation, product development assistance, and food business setup consulting based on established statutory guidelines and food science best practices. Official regulatory approvals and license grants remain subject to final government authority inspection and statutory verification.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              3. Client Responsibilities
            </h2>
            <p>
              Clients are responsible for providing accurate, authentic, and complete business information, raw material specifications, facility blueprints, and legal documentation required for regulatory filings and lab testing protocols.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              4. Intellectual Property
            </h2>
            <p>
              All original content, branding, website design elements, and methodology frameworks published on this website are the intellectual property of Zenix Food Worx. Client-specific formulations and customized layout designs created under contract belong to the respective client as specified in formal service agreements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-black">
              5. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable statutory laws. For formal contract inquiries or legal correspondence, contact <span className="font-semibold text-brand-primaryDark">info@zenixfoodworx.com</span>.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
