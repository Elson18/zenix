import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle2
} from 'lucide-react';
import { businessTypes } from '../data/businessTypes';
import { businessStages } from '../data/businessStages';
import { requirements, priorities } from '../data/requirements';
import { getRecommendedServices, RecommendedService } from '../data/serviceRecommendations';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';

// Map icon strings to Lucide components
const IconMap: Record<string, React.ComponentType<any>> = {
  // Business types
  'Factory': Factory,
  'Store': Store,
  'Hotel': Hotel,
  'ChefHat': ChefHat,
  'Rocket': Rocket,
  'Award': Award,
  'Compass': Compass,
  'HelpCircle': HelpCircle,
  // Services
  'FlaskConical': FlaskConical,
  'FileCheck2': FileCheck2,
  'Tag': Tag,
  'Calculator': Calculator,
  'Lightbulb': Rocket, // Fallback to Rocket or custom
  'Utensils': Utensils,
  'ShieldCheck': ShieldCheck,
  'Handshake': Handshake
};

export default function ServiceFinderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [results, setResults] = useState<RecommendedService[]>([]);

  // Track page view
  useEffect(() => {
    trackEvent('service_finder_started', { page: 'service_finder_page' });
  }, []);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    trackEvent('service_selected', { businessType: typeId, page: 'service_finder_step_1' });
    // Auto-advance to step 2 after a slight delay for better transition visual
    setTimeout(() => {
      setStep(2);
    }, 300);
  };

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    trackEvent('service_selected', { businessStage: stageId, page: 'service_finder_step_2' });
    setTimeout(() => {
      setStep(3);
    }, 300);
  };

  const handleReqToggle = (reqId: string) => {
    if (selectedReqs.includes(reqId)) {
      setSelectedReqs(selectedReqs.filter(id => id !== reqId));
    } else {
      setSelectedReqs([...selectedReqs, reqId]);
    }
  };

  const handlePrioritySelect = (priorityId: string) => {
    setSelectedPriority(priorityId);
    trackEvent('service_selected', { priority: priorityId, page: 'service_finder_step_4' });
    
    // Calculate recommendations
    const recs = getRecommendedServices({
      businessType: selectedType,
      businessStage: selectedStage,
      requirements: selectedReqs,
      priority: priorityId
    });
    setResults(recs);
    trackEvent('service_finder_completed', {
      businessType: selectedType,
      businessStage: selectedStage,
      requirement: selectedReqs.join(', '),
      priority: priorityId,
      recommendationsCount: recs.length,
      page: 'service_finder_results'
    });
    setStep(5);
  };

  const handleRestart = () => {
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
        step: 4 // Direct to contact submission
      }
    }));
  };

  const getWhatsAppUrl = () => {
    const bTypeLabel = businessTypes.find(t => t.id === selectedType)?.label || '';
    const bStageLabel = businessStages.find(s => s.id === selectedStage)?.label || '';
    const reqLabels = selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', ');
    
    const message = `Hi Zenix Food Worx, I completed your Service Finder. 
Business Profile:
- Business Type: ${bTypeLabel}
- Business Stage: ${bStageLabel}
- Primary Needs: ${reqLabels || 'General'}
Recommended Service: ${results[0]?.service?.title || 'None'}`;

    return `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="pt-24 min-h-screen bg-white flex flex-col justify-between">
      
      {/* Upper Area */}
      <div className="flex-grow flex items-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header (Hidden on results page) */}
          {step < 5 && (
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white shadow-sm border border-brand-border inline-block">
                SMART SERVICE FINDER
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
                Find the Right Solution for Your Food Business
              </h1>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                Not sure which service you need? Answer a few quick questions and we'll guide you toward the right Zenix Food Worx solutions.
              </p>
              
              {/* Progress Indicator */}
              <div className="pt-6 max-w-md mx-auto">
                <div className="flex justify-between items-center text-[10px] font-heading font-bold text-brand-textMuted uppercase tracking-wider mb-2">
                  <span>Step {step} of 4</span>
                  <span>{Math.round(((step - 1) / 4) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-brand-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-primary" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((step - 1) / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* QUESTIONNAIRE STEPS */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-border shadow-card-hover min-h-[350px] flex flex-col justify-between relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Business Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black">
                      What type of food business are you?
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Select the category that best describes your operational format.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {businessTypes.map((type) => {
                      const TypeIcon = IconMap[type.icon] || HelpCircle;
                      const isSelected = selectedType === type.id;
                      
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleTypeSelect(type.id)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-[155px] transition-all group focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 ${
                            isSelected
                              ? 'bg-brand-black text-white border-brand-primary shadow-card-hover scale-[1.02]'
                              : 'bg-white border-brand-border hover:border-brand-primary/45 hover:bg-brand-backgroundSoft/30 text-brand-textSecondary shadow-sm'
                          }`}
                        >
                          <div className={`p-2 rounded-xl w-10 h-10 flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-brand-primaryLight text-brand-primaryDark group-hover:bg-brand-primary group-hover:text-brand-black'
                          }`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={`font-heading font-bold text-sm ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                              {type.label}
                            </p>
                            <p className={`text-[10px] mt-1 leading-tight ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                              {type.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Business Stage */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black">
                      Where are you currently in your journey?
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Choose the option corresponding to your active business phase.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {businessStages.map((stage) => {
                      const isSelected = selectedStage === stage.id;
                      return (
                        <button
                          key={stage.id}
                          onClick={() => handleStageSelect(stage.id)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-[155px] transition-all group focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 ${
                            isSelected
                              ? 'bg-brand-black text-white border-brand-primary shadow-card-hover scale-[1.02]'
                              : 'bg-white border-brand-border hover:border-brand-primary/45 hover:bg-brand-backgroundSoft/30 text-brand-textSecondary shadow-sm'
                          }`}
                        >
                          <span className={`text-[10px] font-heading font-bold uppercase tracking-wider ${
                            isSelected ? 'text-white/85' : 'text-brand-primary'
                          }`}>
                            Phase
                          </span>
                          <div>
                            <p className={`font-heading font-bold text-sm ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                              {stage.label}
                            </p>
                            <p className={`text-[10px] mt-1 leading-tight ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                              {stage.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Back Navigation */}
                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      <span>Back</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Requirements */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black">
                        What do you need help with?
                      </h2>
                      <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                        Select one or more options that match your current priorities.
                      </p>
                    </div>
                    {selectedReqs.length > 0 && (
                      <button
                        onClick={() => setStep(4)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs shadow-sm transition-all"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1 pt-2">
                    {requirements.map((req) => {
                      const isSelected = selectedReqs.includes(req.id);
                      return (
                        <button
                          key={req.id}
                          onClick={() => handleReqToggle(req.id)}
                          className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${
                            isSelected
                              ? 'bg-brand-primaryLight border-brand-primary/40 text-brand-black ring-1 ring-brand-primary/10'
                              : 'bg-white border-brand-border hover:bg-brand-backgroundSoft/40 text-brand-textSecondary'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brand-primary border-brand-primary text-brand-black' : 'border-brand-border bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-xs sm:text-sm text-brand-black">{req.label}</p>
                            <p className="text-[10px] text-brand-textMuted mt-0.5 leading-tight">{req.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={selectedReqs.length === 0}
                      className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Optional Priority */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-black">
                      What's your main priority?
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Understanding your main business driver helps us customize the consultancy roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {priorities.map((priorityOption) => {
                      const isSelected = selectedPriority === priorityOption.id;
                      return (
                        <button
                          key={priorityOption.id}
                          onClick={() => handlePrioritySelect(priorityOption.id)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-[155px] transition-all group focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 ${
                            isSelected
                              ? 'bg-brand-black text-white border-brand-primary shadow-card-hover scale-[1.02]'
                              : 'bg-white border-brand-border hover:border-brand-primary/45 hover:bg-brand-backgroundSoft/30 text-brand-textSecondary shadow-sm'
                          }`}
                        >
                          <span className={`text-[10px] font-heading font-bold uppercase tracking-wider ${
                            isSelected ? 'text-white/85' : 'text-brand-primary'
                          }`}>
                            Priority
                          </span>
                          <div>
                            <p className={`font-heading font-bold text-sm ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                              {priorityOption.label}
                            </p>
                            <p className={`text-[10px] mt-1 leading-tight ${isSelected ? 'text-white/80' : 'text-brand-textMuted'}`}>
                              {priorityOption.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-textSecondary hover:bg-brand-backgroundSoft text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={() => handlePrioritySelect('general')}
                      className="px-5 py-2.5 rounded-xl bg-brand-primaryLight hover:bg-brand-primary/10 text-brand-primaryDark font-heading font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Skip this step</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Results Screen */}
              {step === 5 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  
                  {/* Results Header */}
                  <div className="text-center space-y-2 border-b border-brand-border pb-6">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3 py-1 rounded-full bg-brand-primaryLight inline-block">
                      YOUR RECOMMENDATIONS
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black">
                      Here Are the Services That May Help You
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted max-w-xl mx-auto">
                      Our rules compiled these services based on your business vertical, stage, and selected requirements.
                    </p>
                  </div>

                  {/* Profile Summary Box */}
                  <div className="p-5 rounded-2xl bg-brand-backgroundSoft border border-brand-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Business Type</p>
                      <p className="font-bold text-brand-black mt-0.5">
                        {businessTypes.find(t => t.id === selectedType)?.label || selectedType}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Journey Stage</p>
                      <p className="font-bold text-brand-black mt-0.5">
                        {businessStages.find(s => s.id === selectedStage)?.label || selectedStage}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Selected Needs</p>
                      <p className="font-bold text-brand-black mt-0.5 truncate">
                        {selectedReqs.map(id => requirements.find(r => r.id === id)?.label).join(', ') || 'General'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Main Focus</p>
                      <p className="font-bold text-brand-black mt-0.5">
                        {priorities.find(p => p.id === selectedPriority)?.label || 'General Consultation'}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations Cards Grid */}
                  <div className="space-y-4">
                    <h3 className="font-heading font-bold text-sm text-brand-textSecondary uppercase tracking-wider">
                      Recommended For You ({results.length})
                    </h3>

                    {results.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-brand-border text-brand-textMuted text-sm">
                        No specific recommendations found. Please contact our experts for custom guidance.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((rec) => {
                          const ServiceIcon = IconMap[rec.service.iconName] || FlaskConical;
                          
                          return (
                            <div
                              key={rec.service.id}
                              className="p-6 rounded-2xl border border-brand-border hover:border-brand-primary/45 shadow-subtle bg-white flex flex-col justify-between group transition-all duration-300"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="w-10 h-10 rounded-xl bg-brand-primaryLight flex items-center justify-center text-brand-primaryDark">
                                    <ServiceIcon className="w-5 h-5" />
                                  </div>
                                  <span className="text-[10px] font-heading font-bold text-brand-primary bg-brand-primaryLight border border-brand-border px-2 py-0.5 rounded-full">
                                    Match Score: {rec.matchScore}%
                                  </span>
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
                                <button
                                  onClick={() => navigate(`/services/${rec.service.slug}`)}
                                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-backgroundSoft border border-brand-border hover:border-brand-primary hover:text-brand-primary font-heading font-bold text-xs text-brand-black transition-all group"
                                >
                                  <span>Explore Service</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Results Action Buttons */}
                  <div className="p-6 rounded-2xl border border-brand-border bg-brand-backgroundSoft flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="text-center md:text-left space-y-1">
                      <h4 className="font-heading font-bold text-base text-brand-black">
                        Still not sure?
                      </h4>
                      <p className="text-xs text-brand-textSecondary">
                        Talk to our experts and we'll help you identify the right next step.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={handleTalkToExpert}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold text-xs shadow-sm transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-black" />
                        <span>Talk to an Expert</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-black hover:bg-brand-charcoal text-brand-primary border border-brand-primary/20 font-heading font-semibold text-xs shadow-sm transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-current text-brand-primary" />
                        <span className="text-white">WhatsApp Profile</span>
                      </a>

                      <button
                        onClick={handleRestart}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-brand-border hover:bg-brand-backgroundSoft text-brand-black font-heading font-bold text-xs transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Start Again</span>
                      </button>
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
