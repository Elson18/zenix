import React from 'react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { companyData } from '../data/companyData';
import CTASection from '../components/CTASection';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(service.whatsappMessage)}`;

  return (
    <div className="pt-24 space-y-0">
      
      {/* 1. Service Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-bgWarm via-white to-brand-bgLight border-b border-brand-borderLight relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-heading font-medium text-brand-muted mb-8">
            <NavLink to="/" className="hover:text-brand-emerald">Home</NavLink>
            <ChevronRight className="w-3.5 h-3.5" />
            <NavLink to="/services" className="hover:text-brand-emerald">Services</NavLink>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-emerald font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gold-badge text-xs font-heading font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span>Service 0{service.number}</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-charcoal tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-brand-slate text-lg sm:text-xl leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold text-base shadow-card-hover transition-all duration-300 group"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-base shadow-subtle transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </motion.div>

            {/* Right Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block">
              WHAT WE OFFER
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal">
              Comprehensive Support Scope
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {service.whatWeOffer.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-brand-bgWarm border border-brand-borderLight hover:border-brand-emerald/40 transition-all flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-lightGreen flex items-center justify-center text-brand-emerald shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-heading font-medium text-sm sm:text-base text-brand-charcoal">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Key Areas Cards */}
      <section className="py-20 bg-brand-bgWarm/60 border-y border-brand-borderLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block">
              KEY FOCUS AREAS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal">
              Core Pillars of Our {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.keyAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-brand-borderLight shadow-subtle space-y-3 hover:shadow-card-hover transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-lightGold flex items-center justify-center text-brand-gold font-heading font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-charcoal">
                  {area.title}
                </h3>
                <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who Needs This? & Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Target Audience */}
            <div className="lg:col-span-6 space-y-6 p-8 rounded-3xl bg-brand-bgWarm border border-brand-borderLight">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-brand-gold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>WHO NEEDS THIS SERVICE?</span>
              </div>
              
              <h3 className="font-heading font-extrabold text-2xl text-brand-charcoal">
                Designed for Key Food Business Verticals
              </h3>

              <ul className="space-y-3">
                {service.whoNeedsThis.map((aud, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-slate text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald shrink-0" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Zenix Benefits */}
            <div className="lg:col-span-6 space-y-6 p-8 rounded-3xl bg-white border border-brand-borderLight shadow-subtle">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-brand-emerald uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>WHY CHOOSE ZENIX?</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-brand-charcoal">
                Measurable Business Benefits
              </h3>

              <ul className="space-y-3">
                {service.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-slate text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-brand-fresh shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Approach Steps */}
      <section className="py-20 bg-brand-bgWarm/40 border-t border-brand-borderLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block">
              OUR PROCESS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal">
              Step-by-Step Implementation Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((pStep, idx) => (
              <div
                key={pStep.step}
                className="p-6 rounded-2xl bg-white border border-brand-borderLight shadow-subtle space-y-3 relative"
              >
                <span className="w-10 h-10 rounded-xl bg-brand-emerald text-white font-heading font-bold text-sm flex items-center justify-center">
                  {pStep.step}
                </span>

                <h4 className="font-heading font-bold text-lg text-brand-charcoal">
                  {pStep.title}
                </h4>

                <p className="text-brand-slate text-xs sm:text-sm leading-relaxed">
                  {pStep.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contextual CTA Banner */}
      <CTASection
        title={service.ctaText}
        subtitle={`Speak with our regulatory and food safety consultants to initiate your ${service.title.toLowerCase()} requirements today.`}
        whatsappMessage={service.whatsappMessage}
      />

    </div>
  );
}
