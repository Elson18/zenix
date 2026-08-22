import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyData } from '../data/companyData';
import { useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

export default function WhatsAppButton() {
  const location = useLocation();

  // Determine dynamic message based on active route
  let customMessage = "Hi Zenix Food Worx, I would like to know more about your consultancy services.";
  
  if (location.pathname.startsWith('/services/')) {
    const slug = location.pathname.replace('/services/', '');
    const service = servicesData.find((s) => s.slug === slug);
    if (service) {
      customMessage = service.whatsappMessage;
    }
  }

  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(customMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Zenix Food Worx on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-brand-black hover:bg-brand-charcoal text-brand-primary font-heading font-semibold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group border border-brand-primary/30"
    >
      <MessageCircle className="w-6 h-6 fill-current text-brand-primary group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline text-white">WhatsApp Expert</span>
    </a>
  );
}
