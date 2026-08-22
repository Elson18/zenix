import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { companyData } from '../data/companyData';
import { Search, Stethoscope, Compass, Send, RefreshCw } from 'lucide-react';

export default function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  const getStageIcon = (index: number) => {
    switch (index) {
      case 0: return <Search className="w-5 h-5 text-brand-primaryDark" />;
      case 1: return <Stethoscope className="w-5 h-5 text-brand-primaryDark" />;
      case 2: return <Compass className="w-5 h-5 text-brand-primaryDark" />;
      case 3: return <Send className="w-5 h-5 text-brand-primaryDark" />;
      case 4: return <RefreshCw className="w-5 h-5 text-brand-primaryDark" />;
      default: return <Search className="w-5 h-5 text-brand-primaryDark" />;
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge bg-white border border-brand-border inline-block shadow-sm">
            HOW WE WORK
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
            A Clearer Path From Compliance to Growth
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            Our structured 5-stage methodology simplifies complex regulatory requirements into a predictable, transparent process for your business.
          </p>
        </div>

        {/* Desktop Horizontal Interactive Timeline (hidden on small screens) */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-border -translate-y-1/2 z-0" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStage / (companyData.howWeWork.length - 1)) * 100}%` }}
          />

          {/* Timeline Nodes */}
          <div className="relative z-10 flex justify-between items-center">
            {companyData.howWeWork.map((item, idx) => (
              <button
                key={item.stage}
                onClick={() => setActiveStage(idx)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-lg transition-all duration-300 ${
                    activeStage === idx
                      ? 'bg-brand-primary text-brand-black shadow-gold scale-110 ring-4 ring-brand-primaryLight'
                      : activeStage > idx
                      ? 'bg-brand-black text-brand-primary border border-brand-primary/20'
                      : 'bg-white text-brand-black border-2 border-brand-border hover:border-brand-primary'
                  }`}
                >
                  {item.stage}
                </div>
                <span
                  className={`mt-3 font-heading text-sm font-semibold transition-colors ${
                    activeStage === idx ? 'text-brand-primaryDark' : 'text-brand-textSecondary'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-3xl bg-brand-backgroundSoft border border-brand-border shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-brand-border flex items-center justify-center shrink-0 shadow-sm">
              {getStageIcon(activeStage)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-primary">
                  Stage {companyData.howWeWork[activeStage].stage}
                </span>
                <span className="text-xs font-heading font-semibold text-brand-primaryDark bg-brand-primaryLight px-2.5 py-0.5 rounded-full">
                  {companyData.howWeWork[activeStage].subtitle}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-brand-black">
                {companyData.howWeWork[activeStage].title}
              </h3>

              <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                {companyData.howWeWork[activeStage].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Vertical Timeline (Visible on mobile/tablet) */}
        <div className="mt-12 lg:hidden space-y-6">
          {companyData.howWeWork.map((item, idx) => (
            <div
              key={item.stage}
              onClick={() => setActiveStage(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activeStage === idx
                  ? 'bg-white border-brand-primary shadow-gold'
                  : 'bg-brand-backgroundSoft border-brand-border'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="w-9 h-9 rounded-xl bg-brand-primary text-brand-black font-heading font-bold text-sm flex items-center justify-center">
                  {item.stage}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-lg text-brand-black">
                    {item.title}
                  </h4>
                  <span className="text-xs text-brand-primaryDark font-medium">
                    {item.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-sm text-brand-textSecondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
