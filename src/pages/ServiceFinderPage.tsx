import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  RotateCcw, 
  MessageCircle,
  Check, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  Factory,
  Store,
  Hotel,
  ChefHat,
  Rocket,
  Award,
  Compass,
  FileCheck2,
  FlaskConical,
  Tag,
  Calculator,
  Utensils,
  ShieldCheck,
  Handshake,
  Pill,
  GraduationCap,
  CheckCircle2,
  Globe,
  ShoppingBag,
  Building2,
  X
} from 'lucide-react';
import { businessTypes } from '../data/businessTypes';
import { businessStages } from '../data/businessStages';
import { requirements, priorities, RequirementOption } from '../data/requirements';
import { 
  getRecommendedServices, 
  getBusinessArchetype, 
  RecommendedService 
} from '../data/serviceRecommendations';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';

// Map icon strings to Lucide components
const IconMap: Record<string, React.ComponentType<any>> = {
  'Factory': Factory,
  'Hotel': Hotel,
  'Globe': Globe,
  'Rocket': Rocket,
  'ShoppingBag': ShoppingBag,
  'Building2': Building2,
  'Store': Store,
  'ChefHat': ChefHat,
  'Award': Award,
  'Compass': Compass,
  'HelpCircle': HelpCircle,
  'FlaskConical': FlaskConical,
  'FileCheck2': FileCheck2,
  'Tag': Tag,
  'Calculator': Calculator,
  'Lightbulb': Rocket,
  'Utensils': Utensils,
  'ShieldCheck': ShieldCheck,
  'Handshake': Handshake,
  'Pill': Pill,
  'GraduationCap': GraduationCap
};

// Count-up component for match scores
function CountUpNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 650;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}%</span>;
}

// Celebration Particle Burst Component for #1 Top Match Card
function CelebrationBurst() {
  const particles = Array.from({ length: 8 });

  return (
    <div className="absolute top-2 right-2 pointer-events-none z-20">
      {particles.map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 32;
        const y = Math.sin(angle) * 32;

        return (
          <motion.span
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0.4], x, y, opacity: [1, 1, 0] }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-brand-primary shadow-sm"
          />
        );
      })}
    </div>
  );
}

export default function ServiceFinderPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Step state: 1 = Type + Stage, 2 = Adaptive Needs & Recommendations
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [selectedType, setSelectedType] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    trackEvent('service_finder_started', { page: 'service_finder_2_step' });
  }, []);

  // Compute recommended services inline dynamically
  const results = useMemo(() => {
    if (!selectedType || !selectedStage) return [];
    return getRecommendedServices({
      businessType: selectedType,
      businessStage: selectedStage,
      requirements: selectedReqs,
      priority: selectedPriority
    });
  }, [selectedType, selectedStage, selectedReqs, selectedPriority]);

  // Adaptive Requirements Sorting: Rank requirements relevant to selected business vertical first
  const sortedRequirements = useMemo(() => {
    if (!selectedType) return requirements;

    const relevant: RequirementOption[] = [];
    const others: RequirementOption[] = [];

    requirements.forEach((req) => {
      if (req.id === 'not-sure') {
        others.push(req);
      } else if (req.relevantForTypes && req.relevantForTypes.includes(selectedType)) {
        relevant.push(req);
      } else {
        others.push(req);
      }
    });

    return [...relevant, ...others];
  }, [selectedType]);

  // Real-time confidence score calculation (0 - 100%)
  const confidenceScore = useMemo(() => {
    let score = 0;
    if (selectedType) score += 40;
    if (selectedStage) score += 30;
    if (selectedReqs.length > 0) score += 20;
    if (selectedPriority) score += 10;
    return Math.min(100, score);
  }, [selectedType, selectedStage, selectedReqs, selectedPriority]);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    trackEvent('service_selected', { businessType: typeId, page: 'service_finder_step_1' });
  };

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    trackEvent('service_selected', { businessStage: stageId, page: 'service_finder_step_1' });
  };

  const handleReqToggle = (reqId: string) => {
    if (reqId === 'not-sure') {
      setSelectedReqs(['not-sure']);
    } else {
      const filtered = selectedReqs.filter(id => id !== 'not-sure');
      if (filtered.includes(reqId)) {
        setSelectedReqs(filtered.filter(id => id !== reqId));
      } else {
        setSelectedReqs([...filtered, reqId]);
      }
    }
  };

  const handlePriorityToggle = (priorityId: string) => {
    if (selectedPriority === priorityId) {
      setSelectedPriority('');
    } else {
      setSelectedPriority(priorityId);
    }
  };

  const handleGoToNeeds = () => {
    if (!selectedType || !selectedStage) return;
    setDirection(1);
    setStep(2);
  };

  const handleBack = (prevStep: number) => {
    setDirection(-1);
    setStep(prevStep);
  };

  const handleRestart = () => {
    setDirection(-1);
    setStep(1);
    setSelectedType('');
    setSelectedStage('');
    setSelectedReqs([]);
    setSelectedPriority('');
    trackEvent('service_finder_started', { page: 'service_finder_restart' });
  };

  const handleTalkToExpert = () => {
    trackEvent('consultation_clicked', {
      ctaType: 'results_consultation',
      page: 'service_finder'
    });

    window.dispatchEvent(new CustomEvent('open-consultation', {
      detail: { 
        service: results[0]?.service?.title || 'General Consultation', 
        step: 4
      }
    }));
  };

  const getWhatsAppUrl = () => {
    const bTypeLabel = businessTypes.find(t => t.id === selectedType)?.label || '';
    const bStageLabel = businessStages.find(s => s.id === selectedStage)?.label || '';
    const reqLabels = selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', ');
    
    const message = `Hi Zenix Food Worx, I completed your Smart Service Finder. 
Business Profile:
- Business Vertical: ${bTypeLabel}
- Operational Stage: ${bStageLabel}
- Selected Needs: ${reqLabels || 'General Consultancy'}
Top Recommendation: ${results[0]?.service?.title || 'General Consultation'}`;

    return `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(message)}`;
  };

  // Business Archetype
  const archetype = useMemo(() => {
    return getBusinessArchetype(selectedType, selectedStage);
  }, [selectedType, selectedStage]);

  // Motion Variants
  const stepVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="pt-20 lg:pt-22 pb-8 min-h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Ambient Looping Gradient Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden z-0">
        <motion.div 
          animate={shouldReduceMotion ? false : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-20 right-1/4 w-[600px] h-[400px] bg-brand-primaryLight/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={shouldReduceMotion ? false : { scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Main Container */}
      <div className="flex-grow flex items-center py-4 sm:py-6 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header & Live Progress Meter */}
          <div className="text-center max-w-2xl mx-auto mb-5 space-y-2">
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3 py-1 rounded-full gold-badge bg-white shadow-sm border border-brand-border inline-block">
              SMART SERVICE FINDER
            </span>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-brand-black tracking-tight">
              {step === 1 ? 'Tell Us About Your Food Business' : 'Select Your Specific Needs'}
            </h1>
            <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed">
              {step === 1 
                ? 'Select your business vertical below to reveal relevant operational stages.' 
                : 'Choose the services or priorities you wish to solve immediately.'}
            </p>
            
            {/* Progress & Live Confidence Bar */}
            <div className="pt-2.5 max-w-md mx-auto">
              <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-heading font-bold text-brand-textMuted uppercase tracking-wider mb-1.5">
                <span>STEP {step} OF 2</span>
                <span className="text-brand-primaryDark">Match Confidence: {confidenceScore}%</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-brand-border/60 rounded-full overflow-hidden p-0.5 border border-brand-border/40">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-primaryDark rounded-full" 
                  initial={{ width: '50%' }}
                  animate={{ width: `${step === 1 ? Math.max(50, confidenceScore * 0.7) : Math.max(85, confidenceScore)}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Questionnaire Card Window */}
          <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-brand-border shadow-card-hover flex flex-col justify-between relative overflow-hidden w-full box-border">
            
            <AnimatePresence mode="wait" custom={direction}>
              
              {/* STEP 1: Combined Business Type + Journey Stage */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-5 w-full box-border"
                >
                  {/* Section A: Business Type Selection */}
                  <div className="space-y-3 w-full box-border">
                    <div className="flex items-center justify-between">
                      <h2 className="font-heading font-extrabold text-base sm:text-lg text-brand-black flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-primaryLight text-brand-primaryDark text-[11px] flex items-center justify-center font-bold shrink-0">1</span>
                        <span>Select Your Business Vertical</span>
                      </h2>
                      {selectedType && (
                        <span className="text-xs text-brand-primary font-bold shrink-0">✓ Selected</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full box-border">
                      {businessTypes.map((type) => {
                        const TypeIcon = IconMap[type.icon] || HelpCircle;
                        const isSelected = selectedType === type.id;
                        const isAnySelected = Boolean(selectedType);

                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleTypeSelect(type.id)}
                            className={`box-border p-3.5 sm:p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary w-full h-full ${
                              isSelected
                                ? 'bg-brand-black text-white border-brand-primary shadow-card-hover'
                                : isAnySelected
                                ? 'bg-white border-brand-border/60 text-brand-textSecondary opacity-70 hover:opacity-100 hover:border-brand-primary/45'
                                : 'bg-white border-brand-border text-brand-textSecondary hover:border-brand-primary/45 hover:shadow-sm'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className={`p-1.5 rounded-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                }`}>
                                  <TypeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                </div>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-brand-primary text-brand-black flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <p className={`font-heading font-bold text-xs sm:text-sm leading-snug mb-0.5 ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                                {type.label}
                              </p>
                              <p className={`text-[11px] leading-snug ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                                {type.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section B: Inline Accordion Expansion for Journey Stage */}
                  <AnimatePresence>
                    {selectedType && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-4 border-t border-brand-border space-y-3 overflow-hidden w-full box-border"
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="font-heading font-extrabold text-base sm:text-lg text-brand-black flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-brand-primaryLight text-brand-primaryDark text-[11px] flex items-center justify-center font-bold shrink-0">2</span>
                            <span>Where are you in your journey?</span>
                          </h2>
                          <span className="text-[11px] text-brand-textMuted shrink-0">Select your active phase</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full box-border">
                          {businessStages.map((stage) => {
                            const isSelected = selectedStage === stage.id;
                            const isAnySelected = Boolean(selectedStage);

                            return (
                              <button
                                key={stage.id}
                                type="button"
                                onClick={() => handleStageSelect(stage.id)}
                                className={`box-border p-3 sm:p-3.5 rounded-lg border-2 text-left flex flex-col justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary w-full h-full ${
                                  isSelected
                                    ? 'bg-brand-primaryLight border-brand-primary text-brand-black shadow-sm font-semibold'
                                    : isAnySelected
                                    ? 'bg-white border-brand-border/60 text-brand-textSecondary opacity-70 hover:opacity-100'
                                    : 'bg-white border-brand-border text-brand-textSecondary hover:border-brand-primary/40'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[9px] font-heading font-bold uppercase tracking-wider text-brand-primaryDark">
                                      Phase
                                    </span>
                                    {isSelected && (
                                      <Check className="w-3.5 h-3.5 text-brand-primaryDark stroke-[3]" />
                                    )}
                                  </div>
                                  <p className="font-heading font-bold text-xs text-brand-black mb-0.5">
                                    {stage.label}
                                  </p>
                                  <p className="text-[10px] text-brand-textMuted leading-tight">
                                    {stage.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 1 Action Bar */}
                  <div className="pt-3 border-t border-brand-border flex justify-end w-full box-border">
                    <button
                      type="button"
                      onClick={handleGoToNeeds}
                      disabled={!selectedType || !selectedStage}
                      className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <span>Continue to Specific Needs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Adaptive Specific Needs + Live Recommended Solutions */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4 w-full box-border"
                >
                  <div className="flex items-center justify-between w-full box-border">
                    <div>
                      <h2 className="font-heading font-extrabold text-base sm:text-lg text-brand-black">
                        What do you need help with?
                      </h2>
                      <p className="text-[11px] sm:text-xs text-brand-textMuted mt-0.5">
                        Select one or more items. Relevant options for your vertical are highlighted.
                      </p>
                    </div>
                  </div>

                  {/* Adaptive Requirements Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full box-border">
                    {sortedRequirements.map((req) => {
                      const isSelected = selectedReqs.includes(req.id);
                      const isRelevant = req.relevantForTypes && req.relevantForTypes.includes(selectedType);

                      return (
                        <button
                          key={req.id}
                          type="button"
                          onClick={() => handleReqToggle(req.id)}
                          className={`box-border p-3 rounded-lg border-2 text-left flex items-start gap-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary w-full h-full ${
                            isSelected
                              ? 'bg-brand-primaryLight border-brand-primary text-brand-black shadow-sm'
                              : isRelevant
                              ? 'bg-white border-brand-primary/40 hover:border-brand-primary text-brand-textSecondary'
                              : 'bg-white border-brand-border hover:bg-brand-backgroundSoft text-brand-textSecondary'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brand-primary border-brand-primary text-brand-black' : 'border-brand-border bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-heading font-bold text-xs text-brand-black truncate">{req.label}</p>
                              {isRelevant && (
                                <span className="text-[8px] font-heading font-extrabold px-1.5 py-0.5 rounded bg-brand-primaryLight text-brand-primaryDark uppercase shrink-0">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-brand-textMuted mt-0.5 leading-tight line-clamp-2">{req.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Priority Chips */}
                  <div className="pt-3 border-t border-brand-border space-y-1.5 w-full box-border">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-textMuted">
                        Optional Focus Filter
                      </span>
                      {selectedPriority && (
                        <button 
                          type="button"
                          onClick={() => setSelectedPriority('')}
                          className="text-[10px] font-heading font-bold text-brand-primaryDark hover:underline flex items-center gap-1"
                        >
                          <span>Clear Focus</span>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 w-full box-border">
                      {priorities.slice(0, 6).map((p) => {
                        const isChipSelected = selectedPriority === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handlePriorityToggle(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold transition-colors border-2 ${
                              isChipSelected
                                ? 'bg-brand-black text-brand-primary border-brand-primary shadow-sm'
                                : 'bg-brand-backgroundSoft text-brand-charcoal border-brand-border hover:border-brand-primary/40'
                            }`}
                          >
                            <span>{p.label}</span>
                            {isChipSelected && <span className="ml-1 text-brand-primary font-bold">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inline Recommended Solutions */}
                  {results.length > 0 && (
                    <div className="pt-3.5 border-t border-brand-border space-y-3 w-full box-border">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-heading font-bold text-xs text-brand-textSecondary uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-brand-primaryDark shrink-0" />
                          <span>Recommended Solutions ({results.length})</span>
                        </h3>
                        <span className="text-[10px] font-heading font-bold text-brand-primaryDark bg-brand-primaryLight border border-brand-primary/20 px-2 py-0.5 rounded-full shrink-0">
                          Top Match: <CountUpNumber value={results[0]?.matchScore || 0} />
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full box-border">
                        {results.slice(0, 3).map((rec, idx) => {
                          const ServiceIcon = IconMap[rec.service.iconName] || FlaskConical;
                          const isTopMatch = idx === 0;

                          return (
                            <div
                              key={rec.service.id}
                              className={`box-border p-3.5 rounded-xl border-2 flex flex-col justify-between group transition-colors relative w-full h-full ${
                                isTopMatch
                                  ? 'bg-white border-brand-primary shadow-card-hover'
                                  : 'bg-white border-brand-border hover:border-brand-primary/45 shadow-subtle'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    isTopMatch ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                  }`}>
                                    <ServiceIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {isTopMatch && (
                                      <span className="text-[8px] font-heading font-extrabold px-1.5 py-0.5 rounded-full bg-brand-primary text-brand-black uppercase tracking-wider">
                                        Top Match
                                      </span>
                                    )}
                                    <span className="text-[10px] font-heading font-bold text-brand-primaryDark">
                                      {rec.matchScore}%
                                    </span>
                                  </div>
                                </div>

                                <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-black group-hover:text-brand-primary transition-colors">
                                  {rec.service.title}
                                </h4>
                                <p className="text-[11px] text-brand-textSecondary mt-0.5 line-clamp-2 leading-relaxed">
                                  {rec.service.shortDescription}
                                </p>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between gap-2">
                                <span className="text-[10px] text-brand-textMuted italic truncate">
                                  "{rec.reason}"
                                </span>
                                <button
                                  type="button"
                                  onClick={() => navigate(`/services/${rec.service.slug}`)}
                                  className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-brand-black hover:text-brand-primary transition-colors shrink-0"
                                >
                                  <span>Explore</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Action & Next Steps Bar */}
                  <div className="pt-3 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 w-full box-border">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleBack(1)}
                        className="px-3.5 py-2 rounded-lg border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1 transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRestart}
                        className="px-3 py-2 rounded-lg border border-brand-border hover:bg-brand-backgroundSoft text-brand-textMuted hover:text-brand-black text-xs font-heading font-bold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={handleTalkToExpert}
                        className="px-4 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs shadow-gold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-black" />
                        <span>Talk to an Expert</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 rounded-lg bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-semibold text-xs shadow-subtle transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current text-brand-primary" />
                        <span className="text-white">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </div>

    </div>
  );
}
