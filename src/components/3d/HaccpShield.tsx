import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, CheckCircle2, Award } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface ShieldNode {
  id: string;
  label: string;
  description: string;
  x1: number; // line start
  y1: number;
  x2: number; // line end (shield center is 200, 110)
  y2: number;
  tx: number; // text offset x
  ty: number; // text offset y
}

export default function HaccpShield() {
  const shouldReduceMotion = useReducedMotion();
  const [nodesConnected, setNodesConnected] = useState(false);

  useEffect(() => {
    // Trigger completion flash after line drawing finishes
    const timer = setTimeout(() => {
      setNodesConnected(true);
      trackEvent('service_compared', {
        serviceId: 'HACCP Shield Complete',
        comparisonServices: ['HACCP', 'ISO'],
        page: window.location.pathname
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const nodes: ShieldNode[] = [
    { id: 'hazard', label: '1. Hazard Analysis', description: 'Analyze hazards', x1: 50, y1: 40, x2: 170, y2: 90, tx: 20, ty: 15 },
    { id: 'ccp', label: '2. Critical Control Points', description: 'Define CCPs', x1: 50, y1: 110, x2: 160, y2: 110, tx: 20, ty: 85 },
    { id: 'limits', label: '3. Critical Limits', description: 'Set boundaries', x1: 50, y1: 180, x2: 170, y2: 130, tx: 20, ty: 155 },
    { id: 'monitor', label: '4. Monitoring Systems', description: 'Log parameters', x1: 350, y1: 40, x2: 230, y2: 90, tx: 240, ty: 15 },
    { id: 'corrective', label: '5. Corrective Action', description: 'Correct errors', x1: 350, y1: 110, x2: 240, y2: 110, tx: 240, ty: 85 },
    { id: 'record', label: '6. Documentation', description: 'Keep safe files', x1: 350, y1: 180, x2: 230, y2: 130, tx: 240, ty: 155 }
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-brand-border p-6 shadow-subtle flex flex-col justify-between min-h-[420px] select-none relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-brand-border pb-4">
        <div>
          <h4 className="font-heading font-extrabold text-xs text-brand-black uppercase tracking-wider">
            HACCP / ISO FRAMEWORK SYSTEM
          </h4>
          <p className="text-[10px] text-brand-textMuted mt-0.5">Integrity & Risk Protection mapping</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primaryLight text-brand-primaryDark text-[10px] font-heading font-bold border border-brand-primary/10">
          <Award className="w-3.5 h-3.5 text-brand-primaryDark" />
          <span>FSMS COMPLIANT</span>
        </div>
      </div>

      {/* SVG Central Animation Area */}
      <div className="relative h-[255px] w-full flex items-center justify-center p-2 bg-brand-backgroundSoft/30 rounded-2xl border border-brand-border my-4">
        <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
          
          <defs>
            <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F0B000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F0B000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing central orbit under shield */}
          {nodesConnected && (
            <motion.circle
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.8 }}
              className="fill-current text-brand-primaryLight"
              cx="200"
              cy="110"
              r="30"
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Draw connecting lines */}
          {nodes.map((node) => (
            <g key={node.id}>
              {/* Path line drawing from node to shield */}
              <motion.path
                d={`M ${node.x1} ${node.y1} L ${node.x2} ${node.y2}`}
                stroke="#F0B000"
                strokeWidth="1.5"
                strokeDasharray="150"
                strokeDashoffset={shouldReduceMotion ? 0 : 150}
                animate={shouldReduceMotion ? {} : { strokeDashoffset: 0 }}
                transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
                strokeLinecap="round"
              />
              {/* Small connection pointer pulse */}
              {nodesConnected && (
                <circle cx={node.x2} cy={node.y2} r="2.5" fill="#F0B000" />
              )}
            </g>
          ))}

          {/* Central Shield representation */}
          <g transform="translate(170, 75)">
            {/* Outer golden shield frame */}
            <motion.path
              d="M 30 0 L 60 10 L 60 40 C 60 65 30 80 30 80 C 30 80 0 65 0 40 L 0 10 Z"
              fill="#111111"
              stroke="#F0B000"
              strokeWidth="2.5"
              animate={nodesConnected ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
            />
            {/* Center golden shield inlay */}
            <path
              d="M 30 8 L 50 15 L 50 40 C 50 58 30 70 30 70 C 30 70 10 58 10 40 L 10 15 Z"
              fill={nodesConnected ? '#F0B000' : '#111111'}
              className="transition-colors duration-500"
            />
          </g>

          {/* SVG Text Renderings for nodes */}
          {nodes.map((node) => (
            <foreignObject
              key={`text-${node.id}`}
              x={node.tx}
              y={node.ty}
              width="140"
              height="50"
            >
              <div className="space-y-0.5 pointer-events-none">
                <p className="font-heading font-extrabold text-[9px] text-brand-black leading-none">
                  {node.label}
                </p>
                <p className="text-[7.5px] text-brand-textMuted leading-tight">
                  {node.description}
                </p>
              </div>
            </foreignObject>
          ))}
          
        </svg>

        {/* Floating Active Subtext overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-32">
          <span className={`text-[9px] font-heading font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-500 ${
            nodesConnected 
              ? 'bg-brand-primary text-brand-black border-brand-primary' 
              : 'bg-white text-brand-textSecondary border-brand-border'
          }`}>
            {nodesConnected ? 'FOOD SAFETY SYSTEM: ACTIVE' : 'BUILDING PIPELINES...'}
          </span>
        </div>
      </div>

      {/* Safety description status */}
      <div className="p-4 bg-brand-backgroundSoft rounded-xl border border-brand-border text-[10px] text-brand-textSecondary leading-relaxed flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-brand-primaryDark shrink-0" />
        <span>Completing all 6 pillars forms a certified Hazard Management Framework required by standard municipal regulations and export networks.</span>
      </div>

    </div>
  );
}
