import React from 'react';
import ContactForm from '../components/ContactForm';
import { companyData } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent("Hi Zenix Food Worx, I would like to inquire about your consultancy services.")}`;

  return (
    <div className="pt-24 space-y-0">
      
      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-brand-bgWarm via-white to-brand-bgLight border-b border-brand-borderLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-4 py-1.5 rounded-full gold-badge inline-block">
            GET IN TOUCH
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-charcoal tracking-tight max-w-3xl mx-auto">
            Let's Talk About Your Food Business
          </h1>

          <p className="text-brand-slate text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Tell us what you're working on and our team will help you identify the right next steps.
          </p>
        </div>
      </section>

      {/* Split Form & Contact Information */}
      <section className="py-20 bg-brand-bgWarm/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Direct Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold">
                  DIRECT CONTACT
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal">
                  Speak Directly With Our Food Safety Team
                </h2>
                <p className="text-brand-slate text-base leading-relaxed">
                  Whether you require immediate FSSAI license assistance, product testing guidance, or a factory layout audit, we're ready to assist.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-brand-borderLight shadow-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-charcoal">Phone Consultation</h4>
                    <p className="text-sm text-brand-slate mt-0.5">{companyData.contact.phone}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-borderLight shadow-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-charcoal">Email Inquiry</h4>
                    <p className="text-sm text-brand-slate mt-0.5">{companyData.contact.email}</p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 shadow-subtle flex items-start gap-4 group transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-emerald-900 group-hover:text-emerald-700 transition-colors">
                      WhatsApp Quick Chat
                    </h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Connect with a consultant instantly on WhatsApp.
                    </p>
                  </div>
                </a>

                <div className="p-5 rounded-2xl bg-white border border-brand-borderLight shadow-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightGold flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-charcoal">Corporate Location</h4>
                    <p className="text-sm text-brand-slate mt-0.5">{companyData.contact.address}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-borderLight shadow-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-charcoal">Working Hours</h4>
                    <p className="text-sm text-brand-slate mt-0.5">{companyData.contact.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Regulatory Assurance Badge */}
              <div className="p-5 rounded-2xl bg-brand-lightGreen/60 border border-brand-emerald/20 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand-emerald shrink-0" />
                <p className="text-xs font-heading font-medium text-brand-emerald">
                  All customer inquiries are treated with strict corporate confidentiality and non-disclosure.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
