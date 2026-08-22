import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface RestaurantStep {
  id: string;
  name: string;
  description: string;
  // coordinates for the chef icon on a 600x300 isometric layout
  px: number;
  py: number;
  color: string;
}

export default function RestaurantKitchen() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const steps: RestaurantStep[] = [
    {
      id: 'planning',
      name: '1. Space & Layout Planning',
      description: 'Designing ergonomic kitchen zones (Prep, Cook, Wash, Dispatch) to ensure raw ingredients and finished plates never cross paths, conforming to HACCP rules.',
      px: 90,
      py: 180,
      color: '#C5A059'
    },
    {
      id: 'equipment',
      name: '2. Equipment Procurement',
      description: 'Sourcing heavy-duty commercial kitchen ranges, custom exhausts, combi-ovens, food-grade fabrication tables, and cold chain coolers.',
      px: 180,
      py: 120,
      color: '#166534'
    },
    {
      id: 'vendors',
      name: '3. Vendor & Supply Chain',
      description: 'Establishing trade agreements with certified ingredient suppliers, cold storage networks, and packing material providers.',
      px: 270,
      py: 90,
      color: '#0B3C2D'
    },
    {
      id: 'staffing',
      name: '4. Staff Hierarchy & Training',
      description: 'Structuring kitchen hierarchies (Executive Chef, Line Cooks, Stewards), scheduling mock runs, and establishing clear hygiene logs.',
      px: 360,
      py: 110,
      color: '#C5A059'
    },
    {
      id: 'hygiene',
      name: '5. Pre-Op Hygiene Validation',
      description: 'Simulating deep cleaning, executing water potability tests, setting pest control barriers, and verifying FSSAI safety ratings.',
      px: 440,
      py: 150,
      color: '#166534'
    },
    {
      id: 'opening',
      name: '6. Grand Launch Soft Run',
      description: 'Running menu trials under pressure, adjusting kitchen order ticket (KOT) workflows, and opening doors for commercial dining.',
      px: 510,
      py: 200,
      color: '#0B3C2D'
    }
  ];

  const handleStepClick = (idx: number, name: string) => {
    setActiveStepIdx(idx);
    trackEvent('journey_stage_clicked', {
      stageName: `Restaurant: ${name}`,
      page: window.location.pathname
    });
  };

  const activeStep = steps[activeStepIdx];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-brand-borderLight p-6 shadow-subtle flex flex-col justify-between min-h-[460px] select-none">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-brand-borderSubtle pb-4">
        <div>
          <h4 className="font-heading font-extrabold text-xs text-brand-charcoal uppercase tracking-wider">
            COMMERCIAL KITCHEN SETUP WORKFLOW
          </h4>
          <p className="text-[10px] text-brand-muted mt-0.5">Isometric space allocation and launch milestones</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightGreen text-brand-emerald text-[10px] font-heading font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>FSSAI RETRACTABLE LAYOUT</span>
        </div>
      </div>

      {/* Isometric SVG Kitchen Map */}
      <div className="relative h-[220px] w-full flex items-center justify-center p-2 bg-brand-bgWarm/30 rounded-2xl border border-brand-borderSubtle/60 my-4">
        <svg viewBox="0 0 600 300" className="w-full h-full" fill="none">
          
          <defs>
            <linearGradient id="isometricKitchenBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#F8F7F4" />
            </linearGradient>
          </defs>

          {/* Isometric Grid Floor outline */}
          <path d="M 300 20 L 580 160 L 300 290 L 20 160 Z" fill="url(#isometricKitchenBg)" stroke="#E5E7EB" strokeWidth="2" />
          
          {/* Workflow path line */}
          <path d="M 90 180 L 180 120 L 270 90 L 360 110 L 440 150 L 510 200" stroke="#BDC3C7" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />

          {/* Render Isometric Step Anchors */}
          {steps.map((st, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <g 
                key={st.id} 
                className="cursor-pointer" 
                onClick={() => handleStepClick(idx, st.name)}
              >
                {/* Outer ring */}
                <circle 
                  cx={st.px} 
                  cy={st.py} 
                  r="22" 
                  fill={isActive ? `${st.color}20` : 'transparent'} 
                  stroke={isActive ? st.color : 'transparent'} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
                
                {/* Isometric diamond symbol */}
                <path 
                  d={`M ${st.px} ${st.py - 10} L ${st.px + 12} ${st.py - 4} L ${st.px + 12} ${st.py + 8} L ${st.px} ${st.py + 14} L ${st.px - 12} ${st.py + 8} L ${st.px - 12} ${st.py - 4} Z`}
                  fill={isActive ? st.color : '#FFFFFF'}
                  stroke={isActive ? '#FFFFFF' : '#BDC3C7'}
                  strokeWidth="1"
                  className="transition-all duration-300 shadow-sm"
                  opacity={isActive ? 0.95 : 0.7}
                />

                {/* Step index label */}
                <text 
                  x={st.px} 
                  y={st.py + 2} 
                  fill={isActive ? '#FFFFFF' : '#374151'} 
                  className="font-heading font-extrabold text-[8px]" 
                  textAnchor="middle"
                >
                  0{idx + 1}
                </text>
              </g>
            );
          })}

          {/* Animated 3D Chef Traveler */}
          <motion.g
            animate={{
              x: activeStep.px - 10,
              y: activeStep.py - 24
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 90 }}
            className="pointer-events-none"
          >
            {/* Chef-hat vector traveler representing active position */}
            <circle cx="10" cy="8" r="7" fill="#BDC3C7" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="5" cy="5" r="4.5" fill="#FAFAFA" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="15" cy="5" r="4.5" fill="#FAFAFA" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="5" y="10" width="10" height="6" fill="#FAFAFA" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="7" y="13" width="6" height="1" fill="#C5A059" />
          </motion.g>
          
        </svg>
      </div>

      {/* Active Step Description */}
      <div className="p-5 rounded-2xl bg-brand-bgWarm border border-brand-borderLight space-y-2">
        <div className="flex items-center justify-between border-b border-brand-borderSubtle pb-2">
          <h5 className="font-heading font-extrabold text-sm text-brand-emerald">
            {activeStep.name}
          </h5>
          <span className="text-[10px] font-heading font-bold text-brand-gold bg-brand-lightGold px-2.5 py-0.5 rounded-full border border-brand-goldBorder/40 uppercase">
            Phase 0{activeStepIdx + 1}
          </span>
        </div>
        <p className="text-xs text-brand-slate leading-relaxed">
          {activeStep.description}
        </p>
      </div>

      {/* Selector pills */}
      <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-brand-borderSubtle mt-4">
        {steps.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => handleStepClick(idx, st.name)}
            className={`px-3 py-1.5 rounded-xl font-heading text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeStepIdx === idx
                ? 'bg-brand-emerald text-white shadow-sm'
                : 'bg-white border border-brand-borderLight text-brand-slate hover:border-brand-emerald/40 hover:text-brand-emerald'
            }`}
          >
            {st.name.split(' ')[1]}
          </button>
        ))}
      </div>

    </div>
  );
}
