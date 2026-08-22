import React, { useState } from 'react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { companyData } from '../data/companyData';
import { getRelatedServices } from '../data/serviceRelationships';
import { getServiceFAQs } from '../data/faqs';
import { trackEvent } from '../utils/analytics';
import CTASection from '../components/CTASection';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Accordion State
  const [expandedFAQIdx, setExpandedFAQIdx] = useState<number | null>(null);

  // Dynamic related services
  const relatedIds = getRelatedServices(service.id);
  const relatedServices = servicesData.filter(s => relatedIds.includes(s.id));

  // Dynamic FAQs
  const faqs = getServiceFAQs(service.id);

  // Dynamic Button Label (Smart CTA Behavior)
  const getSmartCtaLabel = (id: string) => {
    switch (id) {
      case 'food-testing': return 'Discuss Food Testing';
      case 'regulatory-licensing': return 'Get FSSAI Support';
      case 'label-validation': return 'Validate My Label';
      case 'nutritional-calculation': return 'Calculate My Nutrition';
      case 'product-development': return 'Discuss My Product';
      case 'certification-documentation': return 'Get Certification Support';
      case 'hospitality-consulting': return 'Optimize My Operations';
      case 'food-safety-inspections': return 'Schedule Inspection';
      case 'factory-setup': return 'Plan My Factory';
      case 'restaurant-setup': return 'Plan My Restaurant';
      case 'contract-manufacturing': return 'Find Manufacturing Support';
      default: return 'Talk to an Expert';
    }
  };

  const smartCtaText = getSmartCtaLabel(service.id);
  const whatsappUrl = `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(service.whatsappMessage)}`;

  const handleCtaClick = () => {
    trackEvent('consultation_clicked', {
      serviceName: service.title,
      serviceId: service.id,
      ctaType: 'service_page_primary',
      page: window.location.pathname
    });
    // Open progressive consultation modal pre-filled with this service title
    window.dispatchEvent(new CustomEvent('open-consultation', {
      detail: { service: service.title, step: 2 } // Start from Step 2 directly since service context is known
    }));
  };

  const handleFAQToggle = (idx: number, question: string) => {
    if (expandedFAQIdx === idx) {
      setExpandedFAQIdx(null);
    } else {
      setExpandedFAQIdx(idx);
      trackEvent('faq_opened', {
        serviceId: service.id,
        faqQuestion: question,
        page: window.location.pathname
      });
    }
  };

  return (
    <div className="pt-24 space-y-0 bg-brand-bgLight">
      
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gold-badge text-xs font-heading font-bold bg-white border border-brand-borderLight shadow-sm">
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
                <button
                  onClick={handleCtaClick}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold text-base shadow-card-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                >
                  <span>{smartCtaText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_clicked', { serviceName: service.title, serviceId: service.id, page: window.location.pathname })}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-base shadow-subtle hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-lightGold border border-brand-goldBorder/40">
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
                className="p-5 rounded-2xl bg-brand-bgWarm border border-brand-borderLight hover:border-brand-emerald/40 hover:bg-white hover:shadow-subtle transition-all flex items-start gap-4"
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
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-borderLight">
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
                <div className="w-10 h-10 rounded-xl bg-brand-lightGold flex items-center justify-center text-brand-gold font-heading font-bold text-sm border border-brand-goldBorder/40">
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
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-borderLight">
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

      {/* 6. FAQ ACCORDION SECTION (Feature 8) */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white border-t border-brand-borderLight">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-lightGold border border-brand-goldBorder/40">
                FAQ SUPPORT
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted">
                Understanding licensing, audits, and testing details. Answers can vary depending on product regulations.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isExpanded = expandedFAQIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isExpanded
                        ? 'bg-brand-bgWarm border-brand-emerald/40 shadow-sm'
                        : 'bg-white border-brand-borderLight hover:bg-brand-bgWarm/40'
                    }`}
                  >
                    <button
                      onClick={() => handleFAQToggle(idx, faq.question)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span className="font-heading font-bold text-sm sm:text-base text-brand-charcoal">
                        {faq.question}
                      </span>
                      <span className={`p-1 rounded-lg shrink-0 transition-transform ${
                        isExpanded ? 'bg-brand-emerald text-white' : 'bg-brand-lightGreen text-brand-emerald'
                      }`}>
                        {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-xs sm:text-sm text-brand-slate leading-relaxed border-t border-brand-borderSubtle/60 pt-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. DYNAMIC RELATED SERVICES SECTION (Feature 7) */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-brand-bgWarm/40 border-t border-brand-borderLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-borderLight">
                COMPLEMENTARY SERVICES
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal">
                You May Also Need
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted">
                Food compliance and product development often go together. Consider these related services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map(rsrv => (
                <div
                  key={rsrv.id}
                  className="bg-white p-6 rounded-2xl border border-brand-borderLight hover:border-brand-emerald/30 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-heading font-bold text-brand-gold uppercase tracking-wider bg-brand-lightGold border border-brand-goldBorder/30 px-2.5 py-0.5 rounded-full">
                      Service 0{rsrv.number}
                    </span>
                    <h3 className="font-heading font-bold text-base text-brand-charcoal mt-3">
                      {rsrv.title}
                    </h3>
                    <p className="text-xs text-brand-slate mt-2 leading-relaxed line-clamp-2">
                      {rsrv.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-brand-borderSubtle flex items-center justify-between">
                    <NavLink
                      to={`/services/${rsrv.slug}`}
                      className="text-xs font-heading font-bold text-brand-emerald uppercase tracking-wider hover:text-brand-accent transition-colors flex items-center gap-1 group"
                    >
                      <span>Explore service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINDER CROSS-LINK BANNER (Feature 6) */}
      <section className="py-12 bg-brand-emerald text-white text-center border-t border-brand-emeraldHover overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <h3 className="font-heading font-bold text-lg sm:text-xl">
            Need help with multiple stages of your food business?
          </h3>
          <p className="text-xs text-white/70 max-w-xl mx-auto">
            Take our 1-minute Service Finder questionnaire and receive a complete, custom compliance recommendation list.
          </p>
          <div className="pt-2">
            <NavLink
              to="/service-finder"
              onClick={() => trackEvent('service_finder_started', { page: `service_detail_${service.id}` })}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-white text-brand-emerald font-heading font-bold text-xs shadow-md hover:bg-brand-lightGreen transition-all"
            >
              <span>Start Service Finder</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* 9. Contextual CTA Banner */}
      <CTASection
        title={service.ctaText}
        subtitle={`Speak with our regulatory and food safety consultants to initiate your ${service.title.toLowerCase()} requirements today.`}
        whatsappMessage={service.whatsappMessage}
      />

    </div>
  );
}
