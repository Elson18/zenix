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
      case 'Layers': return <Layers className="w-6 h-6 text-brand-primaryDark" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-primaryDark" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-primaryDark" />;
      case 'Sliders': return <Sliders className="w-6 h-6 text-brand-primaryDark" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-brand-primaryDark" />;
      default: return <ShieldCheck className="w-6 h-6 text-brand-primaryDark" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-white border border-brand-border hover:border-brand-primary shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-primaryLight flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {getIcon(icon)}
          </div>
          <span className="font-heading font-extrabold text-2xl text-brand-primary/30 group-hover:text-brand-primary transition-colors">
            {number}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-brand-black mb-3 group-hover:text-brand-primary transition-colors">
          {title}
        </h3>

        <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-brand-border flex items-center gap-2 text-xs font-heading font-semibold text-brand-primary">
        <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
        <span>Zenix Assurance</span>
      </div>
    </motion.div>
  );
}
