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

  // Step state: 1 = Type + Stage, 2 = Adaptive Needs + Optional Priorities, 3 = Results
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [selectedType, setSelectedType] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  const [results, setResults] = useState<RecommendedService[]>([]);

  useEffect(() => {
    trackEvent('service_finder_started', { page: 'service_finder_2_step' });
  }, []);

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

  const handleCalculateResults = () => {
    setDirection(1);
    const recs = getRecommendedServices({
      businessType: selectedType,
      businessStage: selectedStage,
      requirements: selectedReqs,
      priority: selectedPriority
    });
    setResults(recs);
    setStep(3);

    trackEvent('service_finder_completed', {
      businessType: selectedType,
      businessStage: selectedStage,
      requirement: selectedReqs.join(', '),
      priority: selectedPriority || 'inferred',
      recommendationsCount: recs.length,
      page: 'service_finder_results'
    });
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
    setResults([]);
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
    <div className="pt-24 min-h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      
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
      <div className="flex-grow flex items-center py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header & Live Progress Meter (Hidden on Results Page) */}
          {step < 3 && (
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white shadow-sm border border-brand-border inline-block">
                SMART SERVICE FINDER
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
                {step === 1 ? 'Tell Us About Your Food Business' : 'Select Your Specific Needs'}
              </h1>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                {step === 1 
                  ? 'Select your business vertical below to reveal relevant operational stages.' 
                  : 'Choose the services or priorities you wish to solve immediately.'}
              </p>
              
              {/* Progress & Live Confidence Bar */}
              <div className="pt-4 max-w-md mx-auto">
                <div className="flex justify-between items-center text-[11px] font-heading font-bold text-brand-textMuted uppercase tracking-wider mb-2">
                  <span>Step {step} of 2</span>
                  <span className="text-brand-primaryDark">Match Confidence: {confidenceScore}%</span>
                </div>
                <div className="h-2 w-full bg-brand-border/60 rounded-full overflow-hidden p-0.5 border border-brand-border/40">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-primaryDark rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${confidenceScore}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Questionnaire Card Window */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-border shadow-card-hover min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            
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
                  className="space-y-8"
                >
                  {/* Section A: Business Type Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-heading font-extrabold text-lg sm:text-xl text-brand-black flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-primaryLight text-brand-primaryDark text-xs flex items-center justify-center font-bold">1</span>
                        <span>Select Your Business Vertical</span>
                      </h2>
                      {selectedType && (
                        <span className="text-xs text-brand-primary font-bold">✓ Selected</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {businessTypes.map((type) => {
                        const TypeIcon = IconMap[type.icon] || HelpCircle;
                        const isSelected = selectedType === type.id;
                        const isAnySelected = Boolean(selectedType);

                        return (
                          <motion.button
                            key={type.id}
                            whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                            onClick={() => handleTypeSelect(type.id)}
                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                              isSelected
                                ? 'bg-brand-black text-white border-brand-primary shadow-card-hover ring-2 ring-brand-primary/20 scale-[1.02]'
                                : isAnySelected
                                ? 'bg-white border-brand-border/60 text-brand-textSecondary opacity-65 hover:opacity-100 hover:border-brand-primary/45'
                                : 'bg-white border-brand-border text-brand-textSecondary hover:border-brand-primary/45 hover:shadow-sm'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl w-10 h-10 flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                }`}>
                                  <TypeIcon className="w-5 h-5" />
                                </div>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="w-6 h-6 rounded-full bg-brand-primary text-brand-black flex items-center justify-center"
                                  >
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </motion.div>
                                )}
                              </div>
                              <p className={`font-heading font-bold text-sm sm:text-base leading-snug mb-1 ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                                {type.label}
                              </p>
                              <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                                {type.description}
                              </p>
                            </div>
                          </motion.button>
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
                        className="pt-6 border-t border-brand-border space-y-4 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="font-heading font-extrabold text-lg sm:text-xl text-brand-black flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand-primaryLight text-brand-primaryDark text-xs flex items-center justify-center font-bold">2</span>
                            <span>Where are you in your journey?</span>
                          </h2>
                          <span className="text-xs text-brand-textMuted">Select your active phase</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {businessStages.map((stage) => {
                            const isSelected = selectedStage === stage.id;
                            const isAnySelected = Boolean(selectedStage);

                            return (
                              <motion.button
                                key={stage.id}
                                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                                onClick={() => handleStageSelect(stage.id)}
                                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                  isSelected
                                    ? 'bg-brand-primaryLight border-brand-primary text-brand-black shadow-sm font-semibold'
                                    : isAnySelected
                                    ? 'bg-white border-brand-border/60 text-brand-textSecondary opacity-70 hover:opacity-100'
                                    : 'bg-white border-brand-border text-brand-textSecondary hover:border-brand-primary/40'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-primaryDark">
                                      Phase
                                    </span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-brand-primaryDark stroke-[3]" />
                                    )}
                                  </div>
                                  <p className="font-heading font-bold text-xs sm:text-sm text-brand-black mb-1">
                                    {stage.label}
                                  </p>
                                  <p className="text-[10px] text-brand-textMuted leading-tight">
                                    {stage.description}
                                  </p>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 1 Action Bar */}
                  <div className="pt-4 border-t border-brand-border flex justify-end">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleGoToNeeds}
                      disabled={!selectedType || !selectedStage}
                      className="px-7 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
                    >
                      <span>Continue to Specific Needs</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Adaptive Specific Needs + Optional Priorities */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading font-extrabold text-lg sm:text-xl text-brand-black">
                        What do you need help with?
                      </h2>
                      <p className="text-xs text-brand-textMuted mt-1">
                        Select one or more items. Relevant options for your vertical are highlighted.
                      </p>
                    </div>
                    {selectedReqs.length > 0 && (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleCalculateResults}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs shadow-gold transition-all"
                      >
                        <span>See Recommended Services ({selectedReqs.length})</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>

                  {/* Adaptive Requirements Grid with Staggered Motion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1 pt-1">
                    {sortedRequirements.map((req, idx) => {
                      const isSelected = selectedReqs.includes(req.id);
                      const isRelevant = req.relevantForTypes && req.relevantForTypes.includes(selectedType);

                      return (
                        <motion.button
                          key={req.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: idx * 0.035 }}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                          onClick={() => handleReqToggle(req.id)}
                          className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                            isSelected
                              ? 'bg-brand-primaryLight border-brand-primary text-brand-black shadow-sm ring-1 ring-brand-primary/20'
                              : isRelevant
                              ? 'bg-white border-brand-primary/30 hover:border-brand-primary/60 text-brand-textSecondary'
                              : 'bg-white border-brand-border/70 hover:bg-brand-backgroundSoft text-brand-textSecondary opacity-85'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brand-primary border-brand-primary text-brand-black' : 'border-brand-border bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-heading font-bold text-xs sm:text-sm text-brand-black">{req.label}</p>
                              {isRelevant && (
                                <span className="text-[9px] font-heading font-extrabold px-1.5 py-0.5 rounded bg-brand-primaryLight text-brand-primaryDark uppercase">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-brand-textMuted mt-0.5 leading-tight">{req.description}</p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Optional Priority Chips */}
                  <div className="pt-4 border-t border-brand-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-textMuted">
                        Optional Focus Filter
                      </span>
                      {selectedPriority && (
                        <button 
                          onClick={() => setSelectedPriority('')}
                          className="text-[10px] font-heading font-bold text-brand-primaryDark hover:underline flex items-center gap-1"
                        >
                          <span>Clear Focus</span>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {priorities.slice(0, 6).map((p) => {
                        const isChipSelected = selectedPriority === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => handlePriorityToggle(p.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all border ${
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

                  {/* Step 2 Action Bar */}
                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <button
                      onClick={() => handleBack(1)}
                      className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      <span>Back to Profile</span>
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCalculateResults}
                      className="px-7 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs flex items-center gap-2 shadow-gold transition-all"
                    >
                      <span>Show Recommendations</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Results & Personalized Archetype */}
              {step === 3 && (
                <motion.div
                  key="results"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Archetype Headline */}
                  <div className="text-center space-y-2 border-b border-brand-border pb-6">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full bg-brand-primaryLight border border-brand-primary/20 inline-block">
                      DIAGNOSTIC RESULTS
                    </span>
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black"
                    >
                      You are a <span className="text-brand-primaryDark">{archetype.title}</span>
                    </motion.h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted max-w-xl mx-auto">
                      {archetype.subtitle}
                    </p>
                  </div>

                  {/* Profile Summary Strip */}
                  <div className="p-4 rounded-2xl bg-brand-backgroundSoft border border-brand-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Business Vertical</p>
                      <p className="font-bold text-brand-black mt-0.5">
                        {businessTypes.find(t => t.id === selectedType)?.label || selectedType}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Operational Phase</p>
                      <p className="font-bold text-brand-black mt-0.5">
                        {businessStages.find(s => s.id === selectedStage)?.label || selectedStage}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Primary Needs</p>
                      <p className="font-bold text-brand-black mt-0.5 truncate">
                        {selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', ') || 'General Consultancy'}
                      </p>
                    </div>
                  </div>

                  {/* Recommended Services Grid */}
                  <div className="space-y-4">
                    <h3 className="font-heading font-bold text-sm text-brand-textSecondary uppercase tracking-wider">
                      Recommended Solutions ({results.length})
                    </h3>

                    {results.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-brand-border text-brand-textMuted text-sm">
                        No specific matches found. Please contact our team for custom consultancy.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {results.map((rec, idx) => {
                          const ServiceIcon = IconMap[rec.service.iconName] || FlaskConical;
                          const isTopMatch = idx === 0;

                          return (
                            <motion.div
                              key={rec.service.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.08 }}
                              className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all duration-300 relative ${
                                isTopMatch
                                  ? 'bg-white border-brand-primary shadow-card-hover ring-2 ring-brand-primary/20 scale-[1.01]'
                                  : 'bg-white border-brand-border hover:border-brand-primary/45 shadow-subtle'
                              }`}
                            >
                              {/* Top Match Celebration Particles */}
                              {isTopMatch && !shouldReduceMotion && <CelebrationBurst />}

                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    isTopMatch ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                  }`}>
                                    <ServiceIcon className="w-5 h-5" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {isTopMatch && (
                                      <span className="text-[9px] font-heading font-extrabold px-2 py-0.5 rounded-full bg-brand-primary text-brand-black uppercase tracking-wider">
                                        Top Match
                                      </span>
                                    )}
                                    <span className="text-[11px] font-heading font-bold text-brand-primaryDark bg-brand-primaryLight border border-brand-primary/20 px-2.5 py-0.5 rounded-full">
                                      Match Score: <CountUpNumber value={rec.matchScore} />
                                    </span>
                                  </div>
                                </div>

                                <h4 className="font-heading font-bold text-base text-brand-black group-hover:text-brand-primary transition-colors">
                                  {rec.service.title}
                                </h4>
                                <p className="text-xs text-brand-textSecondary mt-1 line-clamp-2">
                                  {rec.service.shortDescription}
                                </p>
                                
                                <div className="mt-4 pt-3 border-t border-brand-border">
                                  <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Why recommended</p>
                                  <p className="text-xs text-brand-textSecondary mt-0.5 leading-relaxed italic">
                                    "{rec.reason}"
                                  </p>
                                </div>
                              </div>

                              <div className="mt-6 pt-2">
                                <motion.button
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => navigate(`/services/${rec.service.slug}`)}
                                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-backgroundSoft border border-brand-border hover:border-brand-primary hover:text-brand-primary font-heading font-bold text-xs text-brand-black transition-all group"
                                >
                                  <span>Explore Service</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Actions & Next Steps Bar */}
                  <div className="p-6 rounded-2xl border border-brand-border bg-brand-backgroundSoft flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="text-center md:text-left space-y-1">
                      <h4 className="font-heading font-bold text-base text-brand-black">
                        Ready to take action?
                      </h4>
                      <p className="text-xs text-brand-textSecondary">
                        Connect with a food safety & regulatory expert today.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleTalkToExpert}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs shadow-gold transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-black" />
                        <span>Talk to an Expert</span>
                      </motion.button>

                      <motion.a
                        whileTap={{ scale: 0.97 }}
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-semibold text-xs shadow-subtle transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-current text-brand-primary" />
                        <span className="text-white">WhatsApp Profile</span>
                      </motion.a>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRestart}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-brand-border hover:bg-brand-backgroundSoft text-brand-black font-heading font-bold text-xs transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Start Again</span>
                      </motion.button>
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
