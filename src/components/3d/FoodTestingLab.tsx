import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

export default function FoodTestingLab() {
  const shouldReduceMotion = useReducedMotion();
  const [graphPulse, setGraphPulse] = useState(0);

  // Animate digital graph points periodically
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setGraphPulse((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // SVG Coordinates for the digital chart path
  const chartPaths = [
    "M 10 70 L 40 45 L 80 55 L 120 20 L 160 50 L 200 15 L 240 40 L 270 10",
    "M 10 70 L 35 60 L 70 30 L 110 50 L 150 25 L 190 35 L 230 10 L 270 25",
    "M 10 70 L 50 20 L 90 40 L 130 15 L 170 60 L 210 25 L 245 45 L 270 15",
    "M 10 70 L 45 50 L 85 20 L 125 45 L 165 15 L 205 50 L 235 30 L 270 10"
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-brand-borderLight p-6 shadow-subtle space-y-6 select-none relative overflow-hidden">
      
      {/* Visual Header */}
      <div className="flex justify-between items-center border-b border-brand-borderSubtle pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-emerald animate-pulse" />
          <span className="font-heading font-extrabold text-xs text-brand-charcoal uppercase tracking-wider">
            ANALYSIS MONITOR: ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightGreen text-brand-emerald text-[10px] font-heading font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SAFETY CHECK PASSED</span>
        </div>
      </div>

      {/* Main Isometric Lab SVG */}
      <div className="relative h-[250px] w-full flex items-center justify-center bg-brand-bgWarm/40 rounded-2xl border border-brand-borderSubtle/60 p-4">
        <svg viewBox="0 0 450 230" className="w-full h-full" fill="none">
          
          {/* DEFINITIONS FOR GRADIENTS */}
          <defs>
            <linearGradient id="beakerGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E6F4F1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0B3C2D" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="fluidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C5A059" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0B3C2D" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="microscopeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>

          {/* 1. DIGITAL ANALYSIS DISPLAY SCREEN (Left) */}
          <g transform="translate(10, 10)">
            {/* Screen border */}
            <rect x="0" y="0" width="180" height="110" rx="10" fill="#072B20" stroke="#0B3C2D" strokeWidth="3" />
            <rect x="5" y="5" width="170" height="100" rx="8" fill="#031510" />
            
            {/* Grid background lines */}
            <path d="M 5 25 H 175 M 5 50 H 175 M 5 75 H 175 M 34 5 V 105 M 68 5 V 105 M 102 5 V 105 M 136 5 V 105" stroke="#0B3C2D" strokeOpacity="0.3" strokeWidth="0.5" />
            
            {/* Animated Graph lines */}
            <motion.path
              d={chartPaths[graphPulse]}
              stroke="#C5A059"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              transition={{ duration: 0.8 }}
            />
            
            {/* Screen overlay details */}
            <text x="12" y="18" fill="#166534" className="font-heading font-bold" style={{ fontSize: '7px' }}>TEMP: 37.2°C</text>
            <text x="120" y="18" fill="#C5A059" className="font-heading font-bold" style={{ fontSize: '7px' }}>QA/QC: 99.8%</text>
          </g>

          {/* 2. MICROSCOPE (Center Right) */}
          <g transform="translate(260, 20)">
            {/* Microscope Base */}
            <path d="M 20 180 Q 40 185 80 185 Q 120 185 140 180 L 130 165 L 30 165 Z" fill="url(#microscopeGrad)" />
            {/* Microscope Arm */}
            <path d="M 120 165 C 130 120 120 60 70 50 L 55 60 C 95 70 100 120 95 165 Z" fill="#374151" />
            {/* Microscope Stage */}
            <rect x="35" y="125" width="70" height="6" rx="2" fill="#111827" />
            {/* Glass Slide with glowing food sample */}
            <rect x="45" y="123" width="50" height="2" fill="#FAFAFA" />
            <circle cx="70" cy="124" r="3.5" fill="#C5A059" opacity="0.8" className="animate-pulse" />
            {/* Lenses & Dial */}
            <path d="M 65 60 L 75 60 L 72 105 L 68 105 Z" fill="#9CA3AF" />
            <circle cx="108" cy="140" r="6" fill="#D1D5DB" />
            {/* Upper Eye-piece tube */}
            <path d="M 45 40 L 60 25 L 75 40 Z" fill="#1F2937" />
            <line x1="60" y1="25" x2="52" y2="10" stroke="#111827" strokeWidth="4" />
          </g>

          {/* 3. TEST TUBES RACK (Right Bottom) */}
          <g transform="translate(195, 140)">
            {/* Rack structure */}
            <rect x="0" y="50" width="85" height="15" rx="3" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
            <rect x="5" y="10" width="75" height="40" fill="none" stroke="#BDC3C7" strokeWidth="0.8" />
            
            {/* Test Tube 1 (Emerald Fluid) */}
            <rect x="15" y="0" width="10" height="50" rx="5" fill="url(#beakerGrad)" stroke="#FAFAFA" strokeWidth="1" />
            <motion.rect
              x="16"
              y="22"
              width="8"
              height="24"
              rx="4"
              fill="#166534"
              opacity="0.8"
              animate={shouldReduceMotion ? {} : { height: [24, 12, 24], y: [22, 34, 22] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Test Tube 2 (Gold Fluid) */}
            <rect x="35" y="0" width="10" height="50" rx="5" fill="url(#beakerGrad)" stroke="#FAFAFA" strokeWidth="1" />
            <motion.rect
              x="36"
              y="10"
              width="8"
              height="36"
              rx="4"
              fill="url(#fluidGrad)"
              opacity="0.9"
              animate={shouldReduceMotion ? {} : { height: [36, 18, 36], y: [10, 28, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Test Tube 3 (Empty) */}
            <rect x="55" y="0" width="10" height="50" rx="5" fill="url(#beakerGrad)" stroke="#FAFAFA" strokeWidth="1" />
          </g>

          {/* 4. PETRI DISH (Center Left) */}
          <g transform="translate(40, 145)">
            {/* Glass dish circle */}
            <circle cx="45" cy="40" r="35" fill="url(#beakerGrad)" stroke="#D1D5DB" strokeWidth="1.5" />
            <circle cx="45" cy="40" r="30" fill="none" stroke="#BDC3C7" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Inner growing organism/sample */}
            <motion.g
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '45px 40px' }}
            >
              {/* Center cell block */}
              <path d="M 40 35 Q 45 30 50 35 Q 55 45 45 48 Q 35 45 40 35 Z" fill="#C5A059" opacity="0.6" />
              {/* Outer micro-particles */}
              <circle cx="30" cy="30" r="2" fill="#166534" />
              <circle cx="60" cy="50" r="1.5" fill="#166534" />
              <circle cx="28" cy="48" r="2" fill="#C5A059" />
              <circle cx="55" cy="28" r="1.5" fill="#C5A059" />
            </motion.g>
          </g>
          
        </svg>
      </div>

      {/* Bottom Values/Indicators */}
      <div className="grid grid-cols-3 gap-4 text-center text-xs">
        <div className="p-3 bg-brand-bgWarm rounded-xl border border-brand-borderLight">
          <p className="text-[10px] text-brand-muted uppercase font-heading font-bold">Parameters</p>
          <p className="font-extrabold text-brand-emerald mt-0.5">Microbiology</p>
        </div>
        <div className="p-3 bg-brand-bgWarm rounded-xl border border-brand-borderLight">
          <p className="text-[10px] text-brand-muted uppercase font-heading font-bold">Accuracy</p>
          <p className="font-extrabold text-brand-emerald mt-0.5">99.85%</p>
        </div>
        <div className="p-3 bg-brand-bgWarm rounded-xl border border-brand-borderLight">
          <p className="text-[10px] text-brand-muted uppercase font-heading font-bold">Standards</p>
          <p className="font-extrabold text-brand-gold mt-0.5">ISO 17025</p>
        </div>
      </div>

    </div>
  );
}
