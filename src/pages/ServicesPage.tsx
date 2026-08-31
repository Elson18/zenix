import React from 'react';
import { NavLink } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import CTASection from '../components/CTASection';
import { 
  Layers, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Handshake, 
  ArrowRight, 
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  FileCheck2,
  Tag,
  Calculator,
  Lightbulb,
  Award,
  Utensils,
  Factory,
  Store
} from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const whyChoosePoints = [
  {
    icon: Layers,
    title: "One Team, Every Solution",
    description: "From testing and licensing to certification, hospitality, and factory setup."
  },
  {
    icon: ShieldCheck,
    title: "Deep Regulatory Expertise",
    description: "Deep regulatory expertise across FSSAI, HACCP, and ISO standards."
  },
  {
    icon: Zap,
    title: "Quick & Hassle-Free Support",
    description: "Quick and hassle-free licensing and compliance turnaround."
  },
  {
    icon: Sliders,
    title: "Tailored Support",
    description: "Tailored support for both growing startups and established food brands."
  },
  {
    icon: Handshake,
    title: "A Trusted Industry Name",
    description: "A trusted name among food manufacturers and restaurants."
  }
];

const methodologyStages = [
  {
    number: "01",
    title: "Discover",
    description: "We learn about your business, products, and where you currently stand on compliance."
  },
  {
    number: "02",
    title: "Diagnose",
    description: "We pinpoint the exact gaps — whether it's licensing, testing, documentation, or day-to-day operations."
  },
  {
    number: "03",
    title: "Design",
    description: "We build a clear, customized roadmap covering testing, certification, and compliance timelines."
  },
  {
    number: "04",
    title: "Deliver",
    description: "Our team takes ownership — handling applications, testing coordination, documentation, and staff training."
  },
  {
    number: "05",
    title: "Sustain",
    description: "We continue to support you with renewals, audits, and ongoing compliance — so you're always a step ahead."
  }
];

export default function ServicesPage() {
  const handleTalkToExpert = (serviceTitle: string) => {
    trackEvent('consultation_clicked', {
      serviceName: serviceTitle,
      ctaType: 'services_page_list',
      page: '/services'
    });
    window.dispatchEvent(new CustomEvent('open-consultation', { 
      detail: { service: serviceTitle, step: 2 } 
    }));
  };

  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-brand-primary" />;
      case 'FileCheck2': return <FileCheck2 className="w-5 h-5 text-brand-primary" />;
      case 'Tag': return <Tag className="w-5 h-5 text-brand-primary" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-brand-primary" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-brand-primary" />;
      case 'Award': return <Award className="w-5 h-5 text-brand-primary" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-brand-primary" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-brand-primary" />;
      case 'Factory': return <Factory className="w-5 h-5 text-brand-primary" />;
      case 'Store': return <Store className="w-5 h-5 text-brand-primary" />;
      case 'Handshake': return <Handshake className="w-5 h-5 text-brand-primary" />;
      default: return <FlaskConical className="w-5 h-5 text-brand-primary" />;
    }
  };

  return (
    <div className="pt-24 space-y-0 bg-white">
      
      {/* 1. Services Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-bgWarm via-white to-white border-b border-brand-border/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full gold-badge bg-white shadow-sm border border-brand-primary/20 inline-block">
            OUR EXPERTISE
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-black tracking-tight max-w-3xl mx-auto leading-tight">
            End-to-End Food Business Solutions
          </h1>

          <p className="text-brand-textSecondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Zenix Food Worx provides practical, expert-led support across safety auditing, FSSAI regulatory compliance, laboratory testing coordination, product development, and operational consulting.
          </p>
        </div>
      </section>

      {/* 2. Services List Sections (Alternating backgrounds B/A/B/A...) */}
      <div className="divide-y divide-brand-border/40">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section 
              key={service.id} 
              className={`py-20 ${isEven ? 'bg-brand-bgWarm' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Service Visual Column (swaps left/right) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        className="w-full h-[280px] sm:h-[340px] object-cover"
                      />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-sm">
                        {getLucideIcon(service.iconName)}
                      </div>
                    </div>
                  </div>

                  {/* Service Description Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-3">
                      <span className="text-xs font-heading font-extrabold text-brand-primary bg-white px-2.5 py-1 rounded-full border border-brand-border/80 inline-block shadow-sm">
                        Service 0{service.number}
                      </span>
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black tracking-tight leading-snug">
                        {service.title}
                      </h2>
                      <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                        {service.fullDescription}
                      </p>
                    </div>

                    {/* Scope Items Grid */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-heading font-bold text-brand-black uppercase tracking-wider">
                        {service.id === 'food-testing' ? 'Testing Scope & Capabilities' : 'Service Scope & Key Focus Areas'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.keyAreas.map((area, areaIdx) => (
                          <div 
                            key={areaIdx} 
                            className="p-5 rounded-xl bg-white border border-brand-border/60 shadow-sm flex flex-col justify-start gap-1.5 hover:border-brand-primary/45 transition-colors"
                          >
                            <h4 className="font-heading font-bold text-sm text-brand-black flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                              {area.title}
                            </h4>
                            <p className="text-brand-textMuted text-xs leading-relaxed">
                              {area.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => handleTalkToExpert(service.title)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs uppercase tracking-wider shadow-gold hover:shadow-card-hover transition-all"
                      >
                        <span>Discuss Requirements</span>
                        <ArrowRight className="w-4 h-4 text-brand-black" />
                      </button>

                      <NavLink
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-brand-black uppercase tracking-wider hover:text-brand-primary py-2.5 transition-colors"
                      >
                        <span>Detailed View</span>
                        <ChevronRight className="w-4 h-4" />
                      </NavLink>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. Why Choose Zenix Section (Section A - White) */}
      <section className="py-20 bg-white border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-bgWarm border border-brand-primary/20">
              VALUE PROPOSITION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
              Why Choose Zenix?
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
              Practical guidance and reliable support to streamline your food business safety, compliance, and growth goals.
            </p>
          </div>

          {/* Elegant 3 + 2 responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChoosePoints.slice(0, 3).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="p-8 rounded-3xl bg-white border border-brand-border/60 hover:border-brand-primary hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-bgWarm flex items-center justify-center text-brand-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-black">{item.title}</h3>
                  <p className="text-brand-textSecondary text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            {whyChoosePoints.slice(3, 5).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="p-8 rounded-3xl bg-white border border-brand-border/60 hover:border-brand-primary hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 flex flex-col items-start space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-bgWarm flex items-center justify-center text-brand-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-black">{item.title}</h3>
                  <p className="text-brand-textSecondary text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Our Working Methodology Section (Section B - Warm Cream) */}
      <section className="py-20 bg-brand-bgWarm border-t border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white border border-brand-border inline-block shadow-sm">
              OUR WORKING METHODOLOGY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
              Our Working Process
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
              We leverage a structured 5-stage advisory methodology to help transition your food business from basic compliance to scalable growth.
            </p>
          </div>

          {/* Desktop connecting line layout */}
          <div className="hidden lg:block relative mb-12 px-6">
            <div className="absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-brand-border z-0" />
            
            <div className="grid grid-cols-5 gap-6 relative z-10">
              {methodologyStages.map((stage) => (
                <div key={stage.number} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-brand-primary/20 flex items-center justify-center font-heading font-extrabold text-lg text-brand-primaryDark shadow-sm">
                    {stage.number}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-black">{stage.title}</h3>
                  <p className="text-brand-textMuted text-xs sm:text-sm leading-relaxed px-1">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline layout */}
          <div className="lg:hidden space-y-8 relative pl-6 border-l-2 border-brand-border/60 ml-4">
            {methodologyStages.map((stage) => (
              <div key={stage.number} className="relative space-y-2">
                <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center font-heading font-extrabold text-xs text-brand-primaryDark border border-brand-primary/20 shadow-sm">
                  {stage.number}
                </div>
                <h3 className="font-heading font-bold text-lg text-brand-black pl-2">
                  {stage.title}
                </h3>
                <p className="text-brand-textSecondary text-sm leading-relaxed pl-2">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Final CTA */}
      <CTASection />

    </div>
  );
}
