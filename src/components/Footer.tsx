import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 border-t border-brand-primary relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src="/zenixfoodwork.jpg"
                alt="Zenix Food Worx"
                className="w-10 h-10 rounded-xl object-cover shadow-sm border border-brand-primary/40"
              />
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white leading-tight">
                  ZENIX
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-primary uppercase leading-none">
                  FOOD WORX
                </span>
              </div>
            </NavLink>

            <p className="text-gray-300 text-sm leading-relaxed">
              Trusted Experts for Every Stage of Your Food Business. Comprehensive B2B consultancy for food safety, FSSAI compliance, lab testing, NPD, certification and factory setup.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-heading text-brand-primary">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span>Regulatory & Quality Consultancy</span>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <NavLink to="/about" className="hover:text-brand-primary transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-brand-primary transition-colors">
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-we-work" className="hover:text-brand-primary transition-colors">
                  How We Work
                </NavLink>
              </li>
              <li>
                <NavLink to="/readiness-assessment" className="hover:text-brand-primary transition-colors">
                  Readiness Assessment
                </NavLink>
              </li>
              <li>
                <NavLink to="/industries" className="hover:text-brand-primary transition-colors">
                  Industries We Serve
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-brand-primary transition-colors">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <NavLink to="/services/food-testing" className="hover:text-brand-primary transition-colors">
                  Food Testing Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/services/regulatory-licensing" className="hover:text-brand-primary transition-colors">
                  FSSAI & Regulatory Licensing
                </NavLink>
              </li>
              <li>
                <NavLink to="/services/label-validation" className="hover:text-brand-primary transition-colors">
                  Label Validation & Guidance
                </NavLink>
              </li>
              <li>
                <NavLink to="/services/product-development" className="hover:text-brand-primary transition-colors">
                  New Product Development
                </NavLink>
              </li>
              <li>
                <NavLink to="/services/certification-documentation" className="hover:text-brand-primary transition-colors">
                  HACCP & ISO Certification
                </NavLink>
              </li>
              <li>
                <NavLink to="/services/hospitality-consulting" className="hover:text-brand-primary transition-colors">
                  Hospitality Consulting
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <span>{companyData.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <span>{companyData.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <span>WhatsApp: {companyData.contact.whatsapp}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <span>{companyData.contact.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} Zenix Food Worx. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <NavLink to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </NavLink>
            <span className="text-gray-600">•</span>
            <NavLink to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
}
