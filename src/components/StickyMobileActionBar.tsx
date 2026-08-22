import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';

export default function StickyMobileActionBar() {
  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent("Hi Zenix Food Worx, I would like to schedule a consultation regarding food compliance.")}`;
  const phoneUrl = `tel:${companyData.contact.phoneClean}`;

  const handleConsultationClick = () => {
    trackEvent('consultation_clicked', {
      ctaType: 'sticky_mobile_bar',
      page: window.location.pathname
    });
    window.dispatchEvent(new CustomEvent('open-consultation', { 
      detail: { service: 'General Consultation', step: 1 } 
    }));
  };

  const handleCallClick = () => {
    trackEvent('phone_clicked', { page: window.location.pathname });
  };

  const handleWhatsappClick = () => {
    trackEvent('whatsapp_clicked', { page: window.location.pathname });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-border shadow-lg p-3 pb-safe-bottom flex items-center gap-3">
      
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsappClick}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-black hover:bg-brand-charcoal text-brand-primary font-heading font-bold text-xs uppercase tracking-wider border border-brand-primary/10 transition-colors"
        aria-label="Chat with Zenix Food Worx on WhatsApp"
      >
        <MessageCircle className="w-4.5 h-4.5 fill-current text-brand-primary" />
        <span className="text-white">WhatsApp</span>
      </a>

      {/* Call Button */}
      <a
        href={phoneUrl}
        onClick={handleCallClick}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-backgroundSoft hover:bg-brand-primaryLight text-brand-charcoal font-heading font-bold text-xs uppercase tracking-wider border border-brand-border transition-all"
        aria-label="Call Zenix Food Worx Office"
      >
        <Phone className="w-4 h-4 text-brand-primary" />
        <span>Call</span>
      </a>

      {/* Consultation Button */}
      <button
        onClick={handleConsultationClick}
        className="flex-[1.3] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
        aria-label="Open Consultation Request Form"
      >
        <Sparkles className="w-4 h-4 text-brand-black fill-current" />
        <span>Consultation</span>
      </button>

    </div>
  );
}
