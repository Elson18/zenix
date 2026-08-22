import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface FactoryZone {
  id: string;
  name: string;
  description: string;
  // coordinates for the package center on a 600x300 isometric layout
  px: number;
  py: number;
  highlightColor: string;
}

export default function FoodFactory() {
  const shouldReduceMotion = useReducedMotion();
  const [activeZoneIdx, setActiveZoneIdx] = useState(0);

  const zones: FactoryZone[] = [
    {
      id: 'raw',
      name: '1. Raw Material Area',
      description: 'Incoming ingredients are checked for temperature, purity, quality specs, and sorted into sterile storage racks.',
      px: 80,
      py: 160,
      highlightColor: '#C5A059'
    },
    {
      id: 'processing',
      name: '2. Processing & Cooking',
      description: 'Recipe formulation, thermal treatment, mixing, and baking in food-grade stainless steel chambers under strict SOP parameters.',
      px: 170,
      py: 110,
      highlightColor: '#166534'
    },
    {
      id: 'quality',
      name: '3. Quality Control (QA/QC)',
      description: 'Analytical lab testing of inline batches for moisture, pathogen counts, contaminants, and sensory profiles.',
      px: 260,
      py: 70,
      highlightColor: '#0B3C2D'
    },
    {
      id: 'packaging',
      name: '4. Sterile Packaging',
      description: 'Hermetic sealing and gas flushing of product bags/boxes. Imprinting legal declarations, FSSAI logos, and batch barcodes.',
      px: 360,
      py: 90,
      highlightColor: '#C5A059'
    },
    {
      id: 'storage',
      name: '5. Temperature Storage',
      description: 'Pallet warehousing in humidity and climate-controlled bays. Tracking stock movement via FIFO logs.',
      px: 440,
      py: 140,
      highlightColor: '#166534'
    },
    {
      id: 'dispatch',
      name: '6. Dispatch & Loading',
      description: 'Final shipping inspections and vehicle temperature verification before cargo loads onto delivery trucks.',
      px: 520,
      py: 190,
      highlightColor: '#0B3C2D'
    }
  ];

  const handleZoneClick = (idx: number, name: string) => {
    setActiveZoneIdx(idx);
    trackEvent('journey_stage_clicked', {
      stageName: `Factory: ${name}`,
      page: window.location.pathname
    });
  };

  const activeZone = zones[activeZoneIdx];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-brand-borderLight p-6 shadow-subtle flex flex-col justify-between min-h-[460px] select-none">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-brand-borderSubtle pb-4">
        <div>
          <h4 className="font-heading font-extrabold text-xs text-brand-charcoal uppercase tracking-wider">
            FACTORY LAYOUT & CONVEYOR WORKFLOW
          </h4>
          <p className="text-[10px] text-brand-muted mt-0.5">Isometric material and production flow validation</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightGreen text-brand-emerald text-[10px] font-heading font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>HACCP COMPLIANT ROUTING</span>
        </div>
      </div>

      {/* Isometric SVG Factory Map */}
      <div className="relative h-[220px] w-full flex items-center justify-center p-2 bg-brand-bgWarm/30 rounded-2xl border border-brand-borderSubtle/60 my-4">
        <svg viewBox="0 0 600 300" className="w-full h-full" fill="none">
          
          <defs>
            <linearGradient id="isometricBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#F3F4F6" />
            </linearGradient>
          </defs>

          {/* Isometric Grid Floor outline */}
          <path d="M 300 20 L 580 160 L 300 290 L 20 160 Z" fill="url(#isometricBg)" stroke="#E5E7EB" strokeWidth="2" />
          
          {/* Conveyor path line connecting zones */}
          <path d="M 80 160 L 170 110 L 260 70 L 360 90 L 440 140 L 520 190" stroke="#BDC3C7" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />

          {/* Render Isometric Zone Cubes */}
          {zones.map((zone, idx) => {
            const isActive = activeZoneIdx === idx;
            return (
              <g 
                key={zone.id} 
                className="cursor-pointer" 
                onClick={() => handleZoneClick(idx, zone.name)}
              >
                {/* Outer bounding circle for zone */}
                <circle 
                  cx={zone.px} 
                  cy={zone.py} 
                  r="24" 
                  fill={isActive ? `${zone.highlightColor}20` : 'transparent'} 
                  stroke={isActive ? zone.highlightColor : 'transparent'} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
                
                {/* Isometric Box representation (Room) */}
                <path 
                  d={`M ${zone.px} ${zone.py - 12} L ${zone.px + 14} ${zone.py - 5} L ${zone.px + 14} ${zone.py + 10} L ${zone.px} ${zone.py + 17} L ${zone.px - 14} ${zone.py + 10} L ${zone.px - 14} ${zone.py - 5} Z`}
                  fill={isActive ? zone.highlightColor : '#FFFFFF'}
                  stroke={isActive ? '#FFFFFF' : '#BDC3C7'}
                  strokeWidth="1"
                  className="transition-all duration-300 shadow-sm"
                  opacity={isActive ? 0.95 : 0.7}
                />

                {/* Zone Number Text label */}
                <text 
                  x={zone.px} 
                  y={zone.py + 3} 
                  fill={isActive ? '#FFFFFF' : '#374151'} 
                  className="font-heading font-extrabold text-[8px]" 
                  textAnchor="middle"
                >
                  0{idx + 1}
                </text>
              </g>
            );
          })}

          {/* Animated 3D Package Traveler on conveyor line */}
          <motion.g
            animate={{
              x: activeZone.px - 10,
              y: activeZone.py - 18
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 90 }}
            className="pointer-events-none"
          >
            {/* Box package icon container */}
            <path
              d="M 10 0 L 20 5 L 20 15 L 10 20 L 0 15 L 0 5 Z"
              fill="#C5A059"
              stroke="#FFFFFF"
              strokeWidth="1"
              className="shadow-md"
            />
            {/* Box tape strip */}
            <path d="M 10 0 L 10 10" stroke="#BD9F53" strokeWidth="1" />
          </motion.g>
          
        </svg>
      </div>

      {/* Active Stage Description Detail */}
      <div className="p-5 rounded-2xl bg-brand-bgWarm border border-brand-borderLight space-y-2">
        <div className="flex items-center justify-between border-b border-brand-borderSubtle pb-2">
          <h5 className="font-heading font-extrabold text-sm text-brand-emerald">
            {activeZone.name}
          </h5>
          <span className="text-[10px] font-heading font-bold text-brand-gold bg-brand-lightGold px-2.5 py-0.5 rounded-full border border-brand-goldBorder/40 uppercase">
            Zone 0{activeZoneIdx + 1}
          </span>
        </div>
        <p className="text-xs text-brand-slate leading-relaxed">
          {activeZone.description}
        </p>
      </div>

      {/* Interactive step selectors */}
      <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-brand-borderSubtle mt-4">
        {zones.map((zone, idx) => (
          <button
            key={zone.id}
            onClick={() => handleZoneClick(idx, zone.name)}
            className={`px-3 py-1.5 rounded-xl font-heading text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeZoneIdx === idx
                ? 'bg-brand-emerald text-white shadow-sm'
                : 'bg-white border border-brand-borderLight text-brand-slate hover:border-brand-emerald/40 hover:text-brand-emerald'
            }`}
          >
            {zone.name.split(' ')[1]}
          </button>
        ))}
      </div>

    </div>
  );
}
