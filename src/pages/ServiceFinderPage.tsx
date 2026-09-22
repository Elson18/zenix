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
  Factory,
  Hotel,
  Rocket,
  FlaskConical,
  CheckCircle2,
  Globe,
  ShoppingBag,
  Building2,
  Info
} from 'lucide-react';
import { businessTypes } from '../data/businessTypes';
import { businessTypePools, SituationOption } from '../data/situations';
import { 
  getRecommendedServices, 
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
  'Building2': Building2
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

export default function ServiceFinderPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Step state: 1 = Select Business Type, 2 = Select Current Situation & View Recommended Solutions
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  useEffect(() => {
    trackEvent('service_finder_started', { page: 'service_finder_2_step' });
  }, []);

  // Get situation options for the selected business type
  const currentSituations = useMemo<SituationOption[]>(() => {
    if (!selectedType) return [];
    return businessTypePools[selectedType]?.situations || [];
  }, [selectedType]);

  // Compute recommended services dynamically based on Business Type + Selected Needs
  const results = useMemo<RecommendedService[]>(() => {
    if (!selectedType || selectedNeeds.length === 0) return [];
    return getRecommendedServices({
      businessType: selectedType,
      selectedNeeds
    });
  }, [selectedType, selectedNeeds]);

  // Live Confidence Bar Calculation (50% on Step 1, 75-100% on Step 2)
  const confidenceScore = useMemo(() => {
    if (step === 1) return selectedType ? 50 : 25;
    if (selectedNeeds.length === 0) return 50;
    return Math.min(100, 75 + selectedNeeds.length * 5);
  }, [step, selectedType, selectedNeeds]);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    // Clear previous Step 2 selections when changing business type
    setSelectedNeeds([]);
    trackEvent('service_selected', { businessType: typeId, page: 'service_finder_step_1' });
  };

  const handleGoToStep2 = (typeId?: string) => {
    const targetType = typeId || selectedType;
    if (!targetType) return;
    if (typeId && typeId !== selectedType) {
      handleTypeSelect(typeId);
    }
    setDirection(1);
    setStep(2);
  };

  const handleNeedToggle = (needId: string) => {
    if (selectedNeeds.includes(needId)) {
      setSelectedNeeds(selectedNeeds.filter(id => id !== needId));
    } else {
      setSelectedNeeds([...selectedNeeds, needId]);
    }
    trackEvent('situation_selected', { requirement: needId, page: 'service_finder_step_2' });
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleRestart = () => {
    setDirection(-1);
    setStep(1);
    setSelectedType('');
    setSelectedNeeds([]);
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
    const sitLabels = selectedNeeds
      .map(id => currentSituations.find(s => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const message = `Hi Zenix Food Worx, I completed your Service Finder. 
Business Type: ${bTypeLabel}
Current Situation: ${sitLabels || 'General Consultation'}
Top Recommendation: ${results[0]?.service?.title || 'General Consultation'}`;

    return `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(message)}`;
  };

  // Motion Variants
  const stepVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 40 : -40,
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
              SERVICE FINDER
            </span>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-brand-black tracking-tight">
              {step === 1 ? 'What best describes your business?' : 'What best describes your current situation?'}
            </h1>
            <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed">
              {step === 1 
                ? 'Select your business type below to discover relevant solutions for your industry.' 
                : 'Select one or more options below to calculate tailored service recommendations.'}
            </p>
            
            {/* Progress Bar (ONLY STEP 1 OF 2 or STEP 2 OF 2) */}
            <div className="pt-2.5 max-w-md mx-auto">
              <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-heading font-bold text-brand-textMuted uppercase tracking-wider mb-1.5">
                <span>STEP {step} OF 2</span>
                <span className="text-brand-primaryDark">Match Confidence: {confidenceScore}%</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-brand-border/60 rounded-full overflow-hidden p-0.5 border border-brand-border/40">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-primaryDark rounded-full" 
                  initial={{ width: '50%' }}
                  animate={{ width: `${step === 1 ? 50 : Math.max(75, confidenceScore)}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Questionnaire Card Window */}
          <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-brand-border shadow-card-hover flex flex-col justify-between relative overflow-hidden w-full box-border">
            
            <AnimatePresence mode="wait" custom={direction}>
              
              {/* STEP 1: Select Business Type */}
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
                  <div className="space-y-3 w-full box-border">
                    <div className="flex items-center justify-between">
                      <h2 className="font-heading font-extrabold text-base sm:text-lg text-brand-black flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-primaryLight text-brand-primaryDark text-[11px] flex items-center justify-center font-bold shrink-0">1</span>
                        <span>Select Your Business Type</span>
                      </h2>
                      {selectedType && (
                        <span className="text-xs text-brand-primary font-bold shrink-0">✓ Selected</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full box-border">
                      {businessTypes.map((type) => {
                        const TypeIcon = IconMap[type.icon] || Factory;
                        const isSelected = selectedType === type.id;

                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              handleTypeSelect(type.id);
                              handleGoToStep2(type.id);
                            }}
                            className={`box-border p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary w-full h-full ${
                              isSelected
                                ? 'bg-brand-black text-white border-brand-primary shadow-card-hover'
                                : 'bg-white border-brand-border text-brand-textSecondary hover:border-brand-primary/45 hover:shadow-sm'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-lg w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                }`}>
                                  <TypeIcon className="w-5 h-5" />
                                </div>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-brand-primary text-brand-black flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <p className={`font-heading font-bold text-sm sm:text-base leading-snug mb-1 ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                                {type.label}
                              </p>
                              <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                                {type.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 1 Action Bar */}
                  <div className="pt-4 border-t border-brand-border flex justify-end w-full box-border">
                    <button
                      type="button"
                      onClick={() => handleGoToStep2()}
                      disabled={!selectedType}
                      className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Select Current Situation & View Recommended Solutions */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6 w-full box-border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full box-border border-b border-brand-border pb-3">
                    <div>
                      <h2 className="font-heading font-extrabold text-base sm:text-lg text-brand-black flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-primaryLight text-brand-primaryDark text-[11px] flex items-center justify-center font-bold shrink-0">2</span>
                        <span>What best describes your current situation?</span>
                      </h2>
                      <p className="text-xs text-brand-textMuted mt-0.5">
                        Select one or more options. Options are tailored to {businessTypes.find(t => t.id === selectedType)?.label || 'your business type'}.
                      </p>
                    </div>
                    {selectedNeeds.length > 0 && (
                      <span className="text-xs font-bold text-brand-primaryDark bg-brand-primaryLight border border-brand-primary/30 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto">
                        {selectedNeeds.length} Selected
                      </span>
                    )}
                  </div>

                  {/* Step 2 Situation Cards Grid - Fixed Border Width to Prevent Layout Shift */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full box-border">
                    {currentSituations.map((sit) => {
                      const isSelected = selectedNeeds.includes(sit.id);

                      return (
                        <button
                          key={sit.id}
                          type="button"
                          onClick={() => handleNeedToggle(sit.id)}
                          className={`box-border p-4 rounded-xl text-left flex items-start gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary w-full h-full min-h-[100px] border-2 ${
                            isSelected
                              ? 'bg-brand-primaryLight border-brand-primary text-brand-black shadow-sm'
                              : 'bg-white border-brand-border hover:border-brand-primary/40 text-brand-textSecondary'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brand-primary border-brand-primary text-brand-black' : 'border-brand-border bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-bold text-xs sm:text-sm text-brand-black leading-snug">
                              {sit.title}
                            </p>
                            <p className="text-[11px] sm:text-xs text-brand-textMuted mt-1 leading-relaxed">
                              {sit.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Empty Selection State vs Recommended Solutions */}
                  {selectedNeeds.length === 0 ? (
                    <div className="py-8 px-4 border-2 border-dashed border-brand-border rounded-xl text-center bg-brand-backgroundSoft/50 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-brand-primaryLight text-brand-primaryDark mx-auto flex items-center justify-center">
                        <Info className="w-5 h-5" />
                      </div>
                      <p className="font-heading font-bold text-sm text-brand-black">
                        Select at least one option to see recommended services.
                      </p>
                      <p className="text-xs text-brand-textMuted max-w-md mx-auto leading-relaxed">
                        Choose your current situation from the cards above to immediately reveal tailored service recommendations for your enterprise.
                      </p>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-brand-border space-y-4 w-full box-border">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-brand-black flex items-center gap-2 uppercase tracking-wide">
                          <Sparkles className="w-4 h-4 text-brand-primaryDark shrink-0" />
                          <span>Recommended Solutions</span>
                        </h3>
                        <span className="text-xs font-heading font-bold text-brand-primaryDark bg-brand-primaryLight border border-brand-primary/20 px-2.5 py-0.5 rounded-full shrink-0">
                          Top Match: <CountUpNumber value={results[0]?.matchScore || 0} />
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full box-border">
                        {results.map((rec, idx) => {
                          const ServiceIcon = IconMap[rec.service.iconName] || FlaskConical;
                          const isTopMatch = idx === 0;

                          return (
                            <div
                              key={rec.service.id}
                              className={`box-border p-4 rounded-xl border-2 flex flex-col justify-between group transition-all relative w-full h-full ${
                                isTopMatch
                                  ? 'bg-white border-brand-primary shadow-card-hover'
                                  : 'bg-white border-brand-border hover:border-brand-primary/45 shadow-subtle'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2.5">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                    isTopMatch ? 'bg-brand-primary text-brand-black font-bold' : 'bg-brand-primaryLight text-brand-primaryDark'
                                  }`}>
                                    <ServiceIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {isTopMatch && (
                                      <span className="text-[9px] font-heading font-extrabold px-2 py-0.5 rounded-full bg-brand-primary text-brand-black uppercase tracking-wider">
                                        Top Match
                                      </span>
                                    )}
                                    <span className="text-xs font-heading font-extrabold text-brand-primaryDark">
                                      {rec.matchScore}% Match
                                    </span>
                                  </div>
                                </div>

                                <h4 className="font-heading font-bold text-sm sm:text-base text-brand-black group-hover:text-brand-primary transition-colors">
                                  {rec.service.title}
                                </h4>
                                <p className="text-xs text-brand-textSecondary mt-1 line-clamp-2 leading-relaxed">
                                  {rec.service.shortDescription}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-brand-border/60 flex items-center justify-between gap-2">
                                <span className="text-[10px] text-brand-textMuted italic truncate max-w-[70%]">
                                  "{rec.reason}"
                                </span>
                                <button
                                  type="button"
                                  onClick={() => navigate(`/services/${rec.service.slug}`)}
                                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-brand-black hover:text-brand-primary transition-colors shrink-0"
                                >
                                  <span>Explore</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Action & Next Steps Bar */}
                  <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 w-full box-border">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-4 py-2.5 rounded-lg border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRestart}
                        className="px-3.5 py-2.5 rounded-lg border border-brand-border hover:bg-brand-backgroundSoft text-brand-textMuted hover:text-brand-black text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={handleTalkToExpert}
                        className="px-4 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-bold text-xs sm:text-sm shadow-gold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-black" />
                        <span>Talk to an Expert</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-lg bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-bold text-xs sm:text-sm shadow-subtle transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4 fill-current text-brand-primary" />
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
