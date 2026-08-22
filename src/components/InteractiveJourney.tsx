import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  FlaskConical, 
  Binary, 
  Tag, 
  FileCheck2, 
  Award, 
  Factory, 
  Rocket, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Package
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface JourneyStage {
  number: string;
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  whatHappens: string;
  services: { title: string; slug: string }[];
  cx: number;
  cy: number;
}

export default function InteractiveJourney() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const stages: JourneyStage[] = [
    {
      number: '01',
      id: 'idea',
      title: 'Idea',
      icon: Lightbulb,
      description: 'Refining recipes, checking compliance models, and assessing market entry requirements.',
      whatHappens: 'During the Idea phase, food entrepreneurs outline their concept, evaluate standard regulatory pathways, formulate business plans, and verify initial compliance options before spending capital.',
      cx: 50,
      cy: 100,
      services: [
        { title: 'Regulatory & Licensing', slug: 'regulatory-licensing' },
        { title: 'New Product Development', slug: 'product-development' }
      ]
    },
    {
      number: '02',
      id: 'product-dev',
      title: 'Product Development',
      icon: Sparkles,
      cx: 150,
      cy: 50,
      description: 'Culinary recipe formulation, taste profiling, and bench-top trial batches.',
      whatHappens: 'Recipe optimization, batch standardization, ingredient sourcing, cost of goods (COGS) analysis, and scale-up planning to translate kitchen recipes to factory-ready specifications.',
      services: [
        { title: 'New Product Development', slug: 'product-development' },
        { title: 'Food Testing Services', slug: 'food-testing' }
      ]
    },
    {
      number: '03',
      id: 'testing',
      title: 'Testing',
      icon: FlaskConical,
      cx: 250,
      cy: 120,
      description: 'Microbial pathogen tests, contaminants audits, and shelf-life assessments.',
      whatHappens: 'Analyzing the physical, chemical, and microbiological safety of the product, including shelf-life tracking under simulated storage conditions to establish durability dates.',
      services: [
        { title: 'Food Testing Services', slug: 'food-testing' },
        { title: 'Food Safety Inspections', slug: 'food-safety-inspections' }
      ]
    },
    {
      number: '04',
      id: 'nutrition',
      title: 'Nutrition',
      icon: Binary,
      cx: 350,
      cy: 60,
      description: 'Calculating macro-nutrients, trans-fats, RDA limits, and panel formats.',
      whatHappens: 'Standardized calculations of nutrient parameters (fats, protein, carbs, sugar, sodium) per 100g and per serving, compliant with latest FSSAI and retail labeling guidelines.',
      services: [
        { title: 'Nutritional Facts Calculation', slug: 'nutritional-calculation' },
        { title: 'Food Testing Services', slug: 'food-testing' }
      ]
    },
    {
      number: '05',
      id: 'label',
      title: 'Label',
      icon: Tag,
      cx: 460,
      cy: 130,
      description: 'Reviewing ingredients, allergens, warnings, and Legal Metrology details.',
      whatHappens: 'Thorough check of front-of-pack and back-of-pack layout information, font sizes, warning emblems, and metrology standards to avoid package recalls.',
      services: [
        { title: 'Label Validation & Guidance', slug: 'label-validation' },
        { title: 'Nutritional Facts Calculation', slug: 'nutritional-calculation' }
      ]
    },
    {
      number: '06',
      id: 'fssai',
      title: 'FSSAI',
      icon: FileCheck2,
      cx: 570,
      cy: 70,
      description: 'Filing state/central licenses, response queries, and uploads.',
      whatHappens: 'Handling FoSCoS filings, licensing modifiers, annual returns coordination, and responding to governmental inspector queries during audits.',
      services: [
        { title: 'Regulatory & Licensing', slug: 'regulatory-licensing' }
      ]
    },
    {
      number: '07',
      id: 'certification',
      title: 'Certification',
      icon: Award,
      cx: 680,
      cy: 140,
      description: 'Formulating HACCP risk plans and audit preparation guidelines.',
      whatHappens: 'Designing Hazard Analysis Critical Control Point (HACCP) plans, drafting ISO 22000 standard operating manuals, and training staff for third-party audits.',
      services: [
        { title: 'Certification & Documentation', slug: 'certification-documentation' },
        { title: 'Food Safety Inspections', slug: 'food-safety-inspections' }
      ]
    },
    {
      number: '08',
      id: 'manufacturing',
      title: 'Manufacturing',
      icon: Factory,
      cx: 790,
      cy: 80,
      description: 'Setting up factory layouts or auditing contract co-packers.',
      whatHappens: 'Drafting industrial factory floor plans, choosing processing lines, coordinating machinery, or screening co-packer candidate locations via hygiene audits.',
      services: [
        { title: 'Food Factory Setup Consultancy', slug: 'factory-setup' },
        { title: 'Contract Manufacturing Support', slug: 'contract-manufacturing' }
      ]
    },
    {
      number: '09',
      id: 'launch',
      title: 'Launch',
      icon: Rocket,
      cx: 890,
      cy: 130,
      description: 'Kitchen trial soft runs, menu cost evaluations, and retail rollouts.',
      whatHappens: 'Starting operations, optimizing order workflows, training personnel, onboarding delivery aggregators like Swiggy/Zomato, and executing initial sales.',
      services: [
        { title: 'Restaurant Setup Consultancy', slug: 'restaurant-setup' },
        { title: 'Hospitality Consulting Services', slug: 'hospitality-consulting' }
      ]
    },
    {
      number: '10',
      id: 'compliance',
      title: 'Ongoing Compliance',
      icon: RotateCcw,
      cx: 970,
      cy: 100,
      description: 'Half-yearly filings, compliance health checks, and routine safety audits.',
      whatHappens: 'Filing annual returns, uploading 6-month testing reports, executing periodic quality audits, and updating licenses for business expansion.',
      services: [
        { title: 'Regulatory & Licensing', slug: 'regulatory-licensing' },
        { title: 'Food Safety Inspections', slug: 'food-safety-inspections' },
        { title: 'Hospitality Consulting Services', slug: 'hospitality-consulting' }
      ]
    }
  ];

  const handleStageClick = (idx: number, stageName: string) => {
    setActiveStageIdx(idx);
    trackEvent('journey_stage_clicked', {
      stageName,
      page: 'home'
    });
  };

  const activeStage = stages[activeStageIdx];
  const ActiveIcon = activeStage.icon;

  const generatePathD = () => {
    let d = `M ${stages[0].cx} ${stages[0].cy}`;
    for (let i = 1; i < stages.length; i++) {
      const p = stages[i];
      const prev = stages[i - 1];
      const cp1x = prev.cx + (p.cx - prev.cx) / 2;
      const cp1y = prev.cy;
      const cp2x = prev.cx + (p.cx - prev.cx) / 2;
      const cp2y = p.cy;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.cx} ${p.cy}`;
    }
    return d;
  };

  return (
    <section className="py-20 bg-brand-backgroundSoft relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border">
            FOOD BUSINESS LIFECYCLE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
            From Idea to Market
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            Wherever you are in your food business journey, Zenix Food Worx helps you move forward with confidence.
          </p>
        </div>

        {/* Journey UI Container */}
        <div className="space-y-12" ref={containerRef}>
          
          {/* DESKTOP CURVED JOURNEY */}
          <div className="hidden lg:block relative h-[250px] w-full px-4 select-none">
            {/* SVG Curved Path Background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1020 220" fill="none">
              <path
                d={generatePathD()}
                stroke="#E7E0D2"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.path
                d={generatePathD()}
                stroke="#F0B000"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStageIdx / (stages.length - 1) }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </svg>

            {/* Stage Interactive Dots on Path */}
            <div className="absolute inset-0 flex justify-between items-center">
              {stages.map((stage, idx) => {
                const isActive = activeStageIdx === idx;
                const isPassed = activeStageIdx > idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(idx, stage.title)}
                    className="absolute group focus:outline-none flex flex-col items-center"
                    style={{ 
                      left: `${(stage.cx / 1000) * 100}%`, 
                      top: `${(stage.cy / 200) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    aria-label={`Stage ${stage.number}: ${stage.title}. ${stage.description}`}
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-subtle border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-primary text-brand-black border-brand-primary scale-110 ring-4 ring-brand-primaryLight'
                          : isPassed
                          ? 'bg-brand-black text-white border-brand-black'
                          : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-primary'
                      }`}
                    >
                      <span className="text-[10px] font-heading font-bold">{stage.number}</span>
                    </div>

                    {/* Stage Label */}
                    <span
                      className={`mt-2 font-heading text-xs font-semibold whitespace-nowrap px-2 py-0.5 rounded-full transition-all ${
                        isActive 
                          ? 'text-brand-primary bg-brand-primaryLight font-bold' 
                          : 'text-brand-charcoal hover:text-brand-primary bg-white/50'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                );
              })}

              {/* Package Fallback traveler */}
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-brand-primary text-brand-black flex items-center justify-center shadow-gold border border-brand-primary/20 pointer-events-none z-20"
                animate={{
                  left: `${(activeStage.cx / 1000) * 100}%`,
                  top: `${(activeStage.cy / 200) * 100}%`
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                style={{ transform: 'translate(-50%, -50%) margin-top: -10px' }}
                title="Moving food package tracking your stage"
              >
                <Package className="w-4 h-4 text-brand-black animate-bounce" />
              </motion.div>
            </div>
          </div>

          {/* MOBILE VERTICAL TIMELINE (Visible on mobile/tablet) */}
          <div className="lg:hidden relative border-l-2 border-brand-border ml-4 pl-8 space-y-8 py-2">
            
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-border -translate-x-1/2">
              <motion.div 
                className="absolute top-0 w-3 h-3 bg-brand-primary rounded-full -translate-x-[5px]"
                animate={{
                  top: `${(activeStageIdx / (stages.length - 1)) * 100}%`
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {stages.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isActive = activeStageIdx === idx;

              return (
                <div
                  key={stage.id}
                  onClick={() => handleStageClick(idx, stage.title)}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-brand-primary shadow-card-hover'
                      : 'bg-brand-backgroundSoft/40 border-brand-border hover:bg-white hover:border-brand-primary/40'
                  }`}
                >
                  <span className={`absolute -left-[45px] top-6 w-7 h-7 rounded-lg font-heading font-extrabold text-xs flex items-center justify-center border ${
                    isActive
                      ? 'bg-brand-primary text-brand-black border-brand-primary ring-2 ring-brand-primaryLight'
                      : 'bg-white text-brand-charcoal border-brand-border'
                  }`}>
                    {stage.number}
                  </span>

                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-brand-primaryLight text-brand-primaryDark' : 'bg-brand-backgroundSoft text-brand-charcoal'}`}>
                      <StageIcon className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-brand-black">
                      {stage.title}
                    </h4>
                  </div>

                  <p className="text-sm text-brand-textSecondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ACTIVE STAGE DETAIL CARD */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStageIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-border shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-primaryLight border border-brand-border flex items-center justify-center shrink-0 shadow-sm text-brand-primaryDark">
                  <ActiveIcon className="w-6 h-6" />
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-primary bg-brand-primaryLight px-2.5 py-0.5 rounded-full border border-brand-border">
                      Stage {activeStage.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-brand-black">
                    {activeStage.title}
                  </h3>

                  <p className="text-brand-textSecondary text-base leading-relaxed">
                    {activeStage.whatHappens}
                  </p>

                  <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Recommended Zenix Services</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeStage.services.map((srv) => (
                          <NavLink
                            key={srv.slug}
                            to={`/services/${srv.slug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-backgroundSoft border border-brand-border text-xs font-heading font-semibold text-brand-charcoal hover:border-brand-primary hover:text-brand-primary transition-all"
                          >
                            <span>{srv.title}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
