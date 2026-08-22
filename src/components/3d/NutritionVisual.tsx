import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, TableProperties, Sparkles } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface Nutrient {
  name: string;
  value: string;
  rda: string;
  color: string;
  x: string; // orbit coordinates
  y: string;
}

export default function NutritionVisual() {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'orbit' | 'table'>('orbit');

  const nutrients: Nutrient[] = [
    { name: 'Energy', value: '380 kcal', rda: '19%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '12%', y: '12%' },
    { name: 'Protein', value: '12.5 g', rda: '25%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '78%', y: '12%' },
    { name: 'Carbohydrates', value: '75.0 g', rda: '27%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '5%', y: '50%' },
    { name: 'Fat', value: '3.2 g', rda: '5%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '82%', y: '50%' },
    { name: 'Added Sugar', value: '2.4 g', rda: '5%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '15%', y: '85%' },
    { name: 'Sodium', value: '45 mg', rda: '2%', color: 'border-brand-primary text-brand-primaryDark bg-brand-primaryLight', x: '75%', y: '85%' }
  ];

  const handleToggleMode = () => {
    const nextMode = viewMode === 'orbit' ? 'table' : 'orbit';
    setViewMode(nextMode);
    trackEvent('service_comparison_used', {
      serviceName: 'Nutrition Visualization Mode',
      comparisonServices: [nextMode],
      page: window.location.pathname
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-brand-border p-6 shadow-subtle flex flex-col justify-between min-h-[460px] select-none">
      
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-brand-border pb-4">
        <div>
          <h4 className="font-heading font-extrabold text-xs text-brand-black uppercase tracking-wider">
            NUTRITION DECLARATION MODEL
          </h4>
          <p className="text-[10px] text-brand-textMuted mt-0.5">Interactive panel and values breakdown</p>
        </div>

        <button
          onClick={handleToggleMode}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-primaryLight text-brand-primaryDark hover:bg-brand-primary hover:text-brand-black transition-all text-xs font-heading font-bold shadow-sm"
        >
          {viewMode === 'orbit' ? (
            <>
              <TableProperties className="w-3.5 h-3.5 text-brand-primaryDark" />
              <span>Show Table</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-brand-primaryDark" />
              <span>Show Interactive Orbit</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Display Area */}
      <div className="relative flex-grow flex items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          
          {/* ORBIT VIEW */}
          {viewMode === 'orbit' && (
            <motion.div
              key="orbit-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Central Glowing Product Package Representation */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-36 rounded-2xl bg-gradient-to-br from-brand-black to-brand-charcoal border-2 border-brand-primary shadow-gold z-10 flex flex-col items-center justify-center p-3"
              >
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-brand-primary font-heading font-extrabold text-xs mb-1">
                  Z
                </div>
                <span className="text-[8px] font-heading font-extrabold text-white tracking-widest uppercase">
                  ZENIX
                </span>
                <span className="text-[6px] text-brand-primary font-bold tracking-[0.2em] uppercase mt-1">
                  COMPLIANT
                </span>
              </motion.div>

              {/* Surrounding background lines */}
              <svg className="absolute inset-0 w-full h-full stroke-brand-border/30 -z-0" fill="none">
                <circle cx="50%" cy="50%" r="110" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="60" strokeDasharray="2 2" />
              </svg>

              {/* Surrounding Nutrient Orbit Cards */}
              {nutrients.map((nut, idx) => {
                const floatOffset = idx % 2 === 0 ? 6 : -6;
                return (
                  <motion.div
                    key={nut.name}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={shouldReduceMotion ? {} : { 
                      opacity: 1, 
                      scale: 1,
                      y: [0, floatOffset, 0]
                    }}
                    transition={{
                      opacity: { delay: idx * 0.05 },
                      y: { duration: 4 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className={`absolute p-2.5 rounded-xl border-2 shadow-sm font-heading flex flex-col items-center min-w-[90px] ${nut.color}`}
                    style={{ left: nut.x, top: nut.y }}
                  >
                    <span className="text-[8px] uppercase tracking-wider font-extrabold opacity-60">
                      {nut.name}
                    </span>
                    <span className="text-xs font-extrabold mt-0.5 whitespace-nowrap">
                      {nut.value}
                    </span>
                    <span className="text-[7px] font-bold opacity-80 mt-0.5">
                      {nut.rda} RDA
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute inset-0 flex items-center justify-center p-2 w-full"
            >
              <div className="w-full bg-brand-backgroundSoft/60 rounded-2xl border border-brand-border overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-brand-black text-brand-primary border-b border-brand-primary/20 font-heading text-[10px] font-extrabold uppercase tracking-wider">
                      <th className="p-3 pl-4">Nutrient Parameter</th>
                      <th className="p-3 text-right">Value per 100g</th>
                      <th className="p-3 text-right pr-4">% Adult RDA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border font-heading">
                    {nutrients.map((nut) => (
                      <tr key={nut.name} className="hover:bg-white transition-colors">
                        <td className="p-3 pl-4 font-bold text-brand-black">{nut.name}</td>
                        <td className="p-3 text-right text-brand-textSecondary font-semibold">{nut.value}</td>
                        <td className="p-3 text-right text-brand-primaryDark font-extrabold pr-4">{nut.rda}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Safety status declaration */}
      <div className="p-4 bg-brand-backgroundSoft rounded-xl border border-brand-border text-[10px] text-brand-textSecondary leading-relaxed flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-primaryDark shrink-0" />
        <span>RDA percentages are standard guidance metrics. Actual panel configurations are generated dynamically during formulation audits.</span>
      </div>

    </div>
  );
}
