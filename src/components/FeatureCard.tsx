import React from 'react';
import { Layers, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function FeatureCard({ number, title, description, icon, index }: FeatureCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layers': return <Layers className="w-6 h-6 text-brand-emerald" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-emerald" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-emerald" />;
      case 'Sliders': return <Sliders className="w-6 h-6 text-brand-emerald" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-brand-emerald" />;
      default: return <ShieldCheck className="w-6 h-6 text-brand-emerald" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-white border border-brand-borderLight hover:border-brand-emerald/40 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-lightGreen flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {getIcon(icon)}
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-emerald/30 group-hover:text-brand-emerald transition-colors">
            {number}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-brand-charcoal mb-3 group-hover:text-brand-emerald transition-colors">
          {title}
        </h3>

        <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-brand-borderSubtle flex items-center gap-2 text-xs font-heading font-semibold text-brand-gold">
        <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
        <span>Zenix Assurance</span>
      </div>
    </motion.div>
  );
}
