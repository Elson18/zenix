import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  HelpCircle, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  MessageCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { servicesData, ServiceItem } from '../data/servicesData';
import { companyData } from '../data/companyData';
import { trackEvent } from '../utils/analytics';

interface CompareData {
  serviceId: string;
  bestFor: string;
  includes: string;
  outcome: string;
  purpose: string;
  scope: string;
  types: string[]; // compatible business types
  stages: string[]; // compatible stages
  reqs: string[]; // compatible requirements
}

const comparisonMatrix: Record<string, CompareData> = {
  'food-testing': {
    serviceId: 'food-testing',
    bestFor: 'Food Manufacturers / FMCG Brands',
    includes: 'Chemical, Microbiological & Shelf-life testing',
    outcome: 'Standardized Lab Analysis Reports',
    purpose: 'Verify quality parameters, safety standards, and nutritional inputs.',
    scope: 'Accelerated shelf-life, pesticide screenings, pathogen audits, and mandatory FSSAI reports.',
    types: ['food-manufacturer', 'food-startup', 'food-brand', 'other'],
    stages: ['developing-product', 'preparing-launch', 'already-operating', 'expanding-business', 'ongoing-compliance'],
    reqs: ['testing']
  },
  'regulatory-licensing': {
    serviceId: 'regulatory-licensing',
    bestFor: 'All Food Operators',
    includes: 'FSSAI state/central licensing & returns',
    outcome: 'Active FSSAI License & Returns filings',
    purpose: 'Prevent regulatory penalties and secure legal retail permits.',
    scope: 'New filings, modifications, query replies, annual returns, and FoSCoS portal setups.',
    types: ['food-manufacturer', 'restaurant', 'hotel-hospitality', 'cloud-kitchen', 'food-startup', 'food-brand', 'planning-business', 'other'],
    stages: ['new-idea', 'preparing-launch', 'already-operating', 'expanding-business', 'setting-up-factory', 'setting-up-restaurant', 'ongoing-compliance'],
    reqs: ['licensing']
  },
  'label-validation': {
    serviceId: 'label-validation',
    bestFor: 'Packaged Food Brands',
    includes: 'Artwork checks & Legal Metrology review',
    outcome: 'Compliant Print-Ready Packaging Labels',
    purpose: 'Prevent print mistakes, packaging wastage, and regulatory recalls.',
    scope: 'Nutrition panel structure, logo sizing, allergen declarations, and health claim thresholds.',
    types: ['food-manufacturer', 'food-startup', 'food-brand', 'other'],
    stages: ['developing-product', 'preparing-launch', 'already-operating', 'expanding-business'],
    reqs: ['label']
  },
  'nutritional-calculation': {
    serviceId: 'nutritional-calculation',
    bestFor: 'Food Startups & D2C Brands',
    includes: 'Recipe database calculations & RDA estimates',
    outcome: 'Graphics-ready Nutritional Panels',
    purpose: 'Create compliant nutrient details panels without high laboratory cost.',
    scope: 'Energy, protein, carbohydrates, sodium, trans-fat, and serving sizing calculations.',
    types: ['food-startup', 'food-brand', 'cloud-kitchen', 'restaurant'],
    stages: ['new-idea', 'developing-product', 'preparing-launch'],
    reqs: ['nutrition']
  },
  'product-development': {
    serviceId: 'product-development',
    bestFor: 'Food Brands & Startups',
    includes: 'Culinary recipe trials & formulation scaling',
    outcome: 'Standardized Industrial Formulations',
    purpose: 'Translate home kitchen recipes into scale-up ready packaging batches.',
    scope: 'Bench trials, organoleptic tastings, ingredient sourcing, and COGS budgeting.',
    types: ['food-startup', 'food-brand', 'planning-business'],
    stages: ['new-idea', 'developing-product', 'expanding-business'],
    reqs: ['product-dev']
  },
  'certification-documentation': {
    serviceId: 'certification-documentation',
    bestFor: 'Food Manufacturing Sites',
    includes: 'HACCP safety manuals & ISO 22000 setup',
    outcome: 'Mock audits & FSMS documentation packages',
    purpose: 'Qualify for corporate retail chains, export channels, and global buyer audits.',
    scope: 'Hazard identification plans, staff sanitation training, and mock audit defenses.',
    types: ['food-manufacturer', 'other'],
    stages: ['setting-up-factory', 'already-operating', 'expanding-business', 'ongoing-compliance'],
    reqs: ['haccp-iso']
  },
  'hospitality-consulting': {
    serviceId: 'hospitality-consulting',
    bestFor: 'Restaurants, Hotels & Cafes',
    includes: 'Menu costing cards & Aggregator listings',
    outcome: 'Waste logs & Platform listings setup',
    purpose: 'Improve food cost percentages and grow delivery platform metrics.',
    scope: 'Recipe pricing matrices, Swiggy/Zomato onboarding, portion control, and equipment choices.',
    types: ['restaurant', 'hotel-hospitality', 'cloud-kitchen'],
    stages: ['preparing-launch', 'already-operating', 'expanding-business', 'setting-up-restaurant'],
    reqs: ['hospitality']
  },
  'food-safety-inspections': {
    serviceId: 'food-safety-inspections',
    bestFor: 'Restaurants, Caterers & Factories',
    includes: 'Mock FSSAI audits & GHP logs review',
    outcome: 'Actionable Corrective Plans (CAPA)',
    purpose: 'Detect hygiene failures before governmental safety audits occur.',
    scope: 'Physical facility inspection, cold chain temperatures, pest audits, and hygiene score metrics.',
    types: ['food-manufacturer', 'restaurant', 'hotel-hospitality', 'cloud-kitchen'],
    stages: ['already-operating', 'expanding-business', 'ongoing-compliance'],
    reqs: ['safety-hygiene']
  },
  'factory-setup': {
    serviceId: 'factory-setup',
    bestFor: 'Industrial Food Processors',
    includes: 'Compliant CAD floor plans & utility specs',
    outcome: 'Approved Factory Floor Plans & Licensing',
    purpose: 'Prevent structural errors, line blocks, and cross-contamination hazards.',
    scope: 'Epoxy floors, HVAC/RO utilities, machinery line sizing, material flows, and pre-op compliance.',
    types: ['food-manufacturer', 'planning-business', 'other'],
    stages: ['new-idea', 'setting-up-factory', 'expanding-business'],
    reqs: ['factory-setup']
  },
  'restaurant-setup': {
    serviceId: 'restaurant-setup',
    bestFor: 'Retail Food Startups',
    includes: 'Space workflow designs & vendor bids',
    outcome: 'Ready-to-Launch Kitchen Installations',
    purpose: 'Accelerate opening timelines and select cost-effective commercial kitchen sets.',
    scope: 'Order expediting plans, equipment procurement bids, health NOC files, and dry trial runs.',
    types: ['restaurant', 'cloud-kitchen', 'planning-business', 'hotel-hospitality'],
    stages: ['new-idea', 'setting-up-restaurant', 'expanding-business'],
    reqs: ['restaurant-setup']
  },
  'contract-manufacturing': {
    serviceId: 'contract-manufacturing',
    bestFor: 'D2C Packaged Brands',
    includes: 'Co-packer audits & SLA documents',
    outcome: 'Quality SLAs & Pilot Trial runs',
    purpose: 'Scale packaged items rapidly without investing capital in land or lines.',
    scope: 'Vendor vetting, NDA protection, scale-up runs, and ongoing quality audits.',
    types: ['food-startup', 'food-brand', 'planning-business'],
    stages: ['developing-product', 'preparing-launch', 'expanding-business'],
    reqs: ['manufacturing']
  }
};

export default function CompareServicesPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterReq, setFilterReq] = useState('all');

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedMobileRow, setExpandedMobileRow] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('service_comparison_used', { page: 'compare_page' });
  }, []);

  const handleSelectService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(sId => sId !== id));
    } else {
      if (selectedServices.length >= 3) {
        alert('You can compare a maximum of 3 services simultaneously.');
        return;
      }
      setSelectedServices([...selectedServices, id]);
      trackEvent('service_compared', {
        serviceId: id,
        comparisonServices: [...selectedServices, id],
        page: 'compare_page'
      });
    }
  };

  const handleClearSelections = () => {
    setSelectedServices([]);
  };

  // Get matching services based on filters
  const filteredServices = servicesData.filter(service => {
    const matrix = comparisonMatrix[service.id];
    if (!matrix) return false;

    const matchesType = filterType === 'all' || matrix.types.includes(filterType);
    const matchesStage = filterStage === 'all' || matrix.stages.includes(filterStage);
    const matchesReq = filterReq === 'all' || matrix.reqs.includes(filterReq);

    return matchesType && matchesStage && matchesReq;
  });

  const handleTalkToExpert = (srvName: string) => {
    trackEvent('consultation_clicked', {
      serviceName: srvName,
      ctaType: 'comparison_consultation',
      page: 'compare_services'
    });
    window.dispatchEvent(new CustomEvent('open-consultation', {
      detail: { service: srvName, step: 4 }
    }));
  };

  const getWhatsAppUrl = (srvName: string) => {
    const text = `Hi Zenix Food Worx, I am interested in comparing and inquiring about your: ${srvName}. Please share details.`;
    return `https://wa.me/${companyData.contact.phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-brand-backgroundSoft via-white to-brand-section border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-4 py-1.5 rounded-full gold-badge inline-block bg-white shadow-sm border border-brand-border">
            SERVICE DETAILS
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-black tracking-tight max-w-3xl mx-auto">
            Compare Our Services
          </h1>
          <p className="text-brand-textSecondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Understand which Zenix Food Worx service best fits your business requirements and operational phase.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* FILTERS TOOLBAR */}
        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <span className="text-xs font-heading font-bold text-brand-textSecondary uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Info className="w-4 h-4 text-brand-primary" />
              <span>Filters</span>
            </span>
            
            {/* Filter by Type */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-brand-border text-xs font-heading font-bold bg-white text-brand-black outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/10 cursor-pointer"
              >
                <option value="all">All Business Types</option>
                <option value="food-manufacturer">Manufacturer</option>
                <option value="restaurant">Restaurant / Cafe</option>
                <option value="hotel-hospitality">Hotel / Hospitality</option>
                <option value="cloud-kitchen">Cloud Kitchen</option>
                <option value="food-startup">Food Startup</option>
                <option value="food-brand">Food Brand</option>
              </select>
            </div>

            {/* Filter by Stage */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-brand-border text-xs font-heading font-bold bg-white text-brand-black outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/10 cursor-pointer"
              >
                <option value="all">All Business Stages</option>
                <option value="new-idea">Idea / Planning</option>
                <option value="developing-product">Product Development</option>
                <option value="preparing-launch">Launch Phase</option>
                <option value="already-operating">Existing Business</option>
                <option value="expanding-business">Expansion Phase</option>
                <option value="setting-up-factory">Factory Setup</option>
                <option value="setting-up-restaurant">Restaurant Setup</option>
              </select>
            </div>

            {/* Filter by Requirement */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <select
                value={filterReq}
                onChange={(e) => setFilterReq(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-brand-border text-xs font-heading font-bold bg-white text-brand-black outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/10 cursor-pointer"
              >
                <option value="all">All Needs</option>
                <option value="licensing">Licensing / FSSAI</option>
                <option value="testing">Testing / Quality</option>
                <option value="label">Label Validation</option>
                <option value="nutrition">Nutrition Panel</option>
                <option value="haccp-iso">HACCP / ISO</option>
                <option value="product-dev">Product R&D</option>
                <option value="factory-setup">Factory Design</option>
                <option value="restaurant-setup">Restaurant Launch</option>
                <option value="manufacturing">Contract Mfg</option>
              </select>
            </div>
          </div>

          {/* Reset button */}
          {(filterType !== 'all' || filterStage !== 'all' || filterReq !== 'all') && (
            <button
              onClick={() => { setFilterType('all'); setFilterStage('all'); setFilterReq('all'); }}
              className="text-xs font-heading font-bold text-red-600 hover:text-red-700 underline shrink-0"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* SIDE-BY-SIDE SIDE COMPARE DRAWER (Shown when items are selected) */}
        <AnimatePresence>
          {selectedServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="p-6 rounded-3xl bg-brand-black text-white border border-brand-primary/30 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-primary fill-current" />
                    <span>Side-by-Side Comparison Matrix</span>
                  </h3>
                  <p className="text-xs text-white/70">
                    Comparing {selectedServices.length} of 3 selected services.
                  </p>
                </div>
                <button
                  onClick={handleClearSelections}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-heading font-bold transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Grid comparing selected */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedServices.map(sId => {
                  const srv = servicesData.find(s => s.id === sId);
                  const matrix = comparisonMatrix[sId];
                  if (!srv || !matrix) return null;

                  return (
                    <div key={sId} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-heading font-extrabold text-base text-white">
                            {srv.title}
                          </h4>
                          <button
                            onClick={() => handleSelectService(sId)}
                            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label={`Remove ${srv.title} from comparison`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-[10px] text-white/50 uppercase font-heading font-bold">Best For</p>
                            <p className="text-white font-medium mt-0.5">{matrix.bestFor}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/50 uppercase font-heading font-bold">Main Purpose</p>
                            <p className="text-white/90 mt-0.5 leading-relaxed">{matrix.purpose}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/50 uppercase font-heading font-bold">Typical Scope</p>
                            <p className="text-white/90 mt-0.5 leading-relaxed">{matrix.scope}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/50 uppercase font-heading font-bold">Delivery Deliverable</p>
                            <p className="text-brand-primary font-bold mt-0.5">{matrix.outcome}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex gap-2">
                        <NavLink
                          to={`/services/${srv.slug}`}
                          className="flex-1 text-center py-2 rounded-xl bg-white text-brand-black hover:bg-brand-primary font-heading font-bold text-xs shadow-sm transition-all"
                        >
                          Explore
                        </NavLink>
                        <button
                          onClick={() => handleTalkToExpert(srv.title)}
                          className="flex-1 text-center py-2 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black border border-brand-primary/20 font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-brand-black" />
                          <span>Consult</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Dummy slots if less than 3 selected */}
                {selectedServices.length < 3 && Array.from({ length: 3 - selectedServices.length }).map((_, i) => (
                  <div key={i} className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-white/20 text-white/40 text-xs text-center space-y-2">
                    <HelpCircle className="w-6 h-6 stroke-[1.5]" />
                    <p>Select another service below to compare side-by-side.</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPARISON MAIN DIRECTORY TABLE (DESKTOP) */}
        <div className="hidden lg:block bg-white rounded-3xl border border-brand-border shadow-subtle overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-backgroundSoft border-b border-brand-border">
                <th className="p-5 font-heading font-extrabold text-xs uppercase text-brand-black w-[5%] text-center">Compare</th>
                <th className="p-5 font-heading font-extrabold text-xs uppercase text-brand-black w-[25%]">Service Name</th>
                <th className="p-5 font-heading font-extrabold text-xs uppercase text-brand-black w-[25%]">Best For</th>
                <th className="p-5 font-heading font-extrabold text-xs uppercase text-brand-black w-[25%]">Includes</th>
                <th className="p-5 font-heading font-extrabold text-xs uppercase text-brand-black w-[20%]">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredServices.map(srv => {
                const matrix = comparisonMatrix[srv.id];
                if (!matrix) return null;
                const isSelected = selectedServices.includes(srv.id);

                return (
                  <tr 
                    key={srv.id}
                    className={`transition-all hover:bg-brand-primaryLight/20 ${isSelected ? 'bg-brand-primaryLight/40' : ''}`}
                  >
                    <td className="p-5 text-center">
                      <button
                        onClick={() => handleSelectService(srv.id)}
                        className={`w-5 h-5 mx-auto rounded-md border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-brand-primary border-brand-primary text-brand-black'
                            : 'border-brand-border bg-white hover:border-brand-primary'
                        }`}
                        aria-label={`Select ${srv.title} for comparison`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </td>
                    <td className="p-5">
                      <NavLink
                        to={`/services/${srv.slug}`}
                        className="font-heading font-bold text-sm text-brand-black hover:text-brand-primary transition-colors"
                      >
                        {srv.title}
                      </NavLink>
                    </td>
                    <td className="p-5 text-xs text-brand-textSecondary leading-relaxed">{matrix.bestFor}</td>
                    <td className="p-5 text-xs text-brand-textSecondary leading-relaxed">{matrix.includes}</td>
                    <td className="p-5">
                      <span className="text-xs font-bold text-brand-primaryDark px-2.5 py-1 rounded-full bg-brand-primaryLight">
                        {matrix.outcome}
                      </span>
                    </td>
                  </tr>
                );
              })}
              
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-brand-textMuted text-sm border-none">
                    No services match the selected filters. Please adjust filters or clear selections.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* COMPARISON MAIN DIRECTORY LIST (MOBILE CARDS) */}
        <div className="lg:hidden space-y-4">
          {filteredServices.map(srv => {
            const matrix = comparisonMatrix[srv.id];
            if (!matrix) return null;
            const isSelected = selectedServices.includes(srv.id);
            const isExpanded = expandedMobileRow === srv.id;

            return (
              <div 
                key={srv.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSelected 
                    ? 'bg-brand-primaryLight/40 border-brand-primary' 
                    : 'bg-white border-brand-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSelectService(srv.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary text-brand-black'
                          : 'border-brand-border bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <NavLink
                      to={`/services/${srv.slug}`}
                      className="font-heading font-bold text-sm text-brand-black"
                    >
                      {srv.title}
                    </NavLink>
                  </div>

                  <button
                    onClick={() => setExpandedMobileRow(isExpanded ? null : srv.id)}
                    className="p-1 text-brand-textSecondary hover:text-brand-primary transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-brand-primaryDark px-2 py-0.5 rounded bg-brand-primaryLight">
                    {matrix.outcome}
                  </span>
                  <span className="text-[10px] text-brand-textMuted font-heading font-semibold">
                    Best For: {matrix.bestFor.split(' ')[0]}
                  </span>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-brand-border text-xs space-y-3 text-brand-textSecondary"
                    >
                      <div>
                        <p className="text-[9px] uppercase tracking-wider font-bold text-brand-textMuted">Best For</p>
                        <p className="mt-0.5">{matrix.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider font-bold text-brand-textMuted">Includes</p>
                        <p className="mt-0.5">{matrix.includes}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider font-bold text-brand-textMuted">Purpose</p>
                        <p className="mt-0.5 leading-relaxed">{matrix.purpose}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider font-bold text-brand-textMuted">Scope details</p>
                        <p className="mt-0.5 leading-relaxed">{matrix.scope}</p>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <NavLink
                          to={`/services/${srv.slug}`}
                          className="flex-1 text-center py-2 rounded-lg bg-brand-backgroundSoft font-heading font-bold text-[11px] border border-brand-border text-brand-black"
                        >
                          View Service Page
                        </NavLink>
                        <button
                          onClick={() => handleTalkToExpert(srv.title)}
                          className="flex-1 py-2 rounded-lg bg-brand-primary text-brand-black font-heading font-bold text-[11px]"
                        >
                          Talk to Expert
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          
          {filteredServices.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-brand-border text-brand-textMuted text-sm bg-white">
              No services match the selected filters.
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
