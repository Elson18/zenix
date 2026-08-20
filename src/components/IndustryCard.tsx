import React from 'react';
import { NavLink } from 'react-router-dom';
import { Factory, UtensilsCrossed, Hotel, Store, Rocket, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { IndustryItem } from '../data/industriesData';

interface IndustryCardProps {
  industry: IndustryItem;
  index: number;
}

export default function IndustryCard({ industry, index }: IndustryCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Factory': return <Factory className="w-6 h-6 text-brand-emerald" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-brand-emerald" />;
      case 'Hotel': return <Hotel className="w-6 h-6 text-brand-emerald" />;
      case 'Store': return <Store className="w-6 h-6 text-brand-emerald" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-brand-emerald" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-brand-emerald" />;
      default: return <Factory className="w-6 h-6 text-brand-emerald" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white rounded-3xl border border-brand-borderLight overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
          <h3 className="font-heading font-extrabold text-xl text-white">
            {industry.title}
          </h3>
          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-emerald shrink-0">
            {getIcon(industry.iconName)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-grow">
        <p className="text-xs font-heading font-bold text-brand-gold uppercase tracking-wider">
          {industry.subtitle}
        </p>

        <p className="text-brand-slate text-sm leading-relaxed">
          {industry.description}
        </p>

        <div className="pt-2 space-y-2">
          <p className="text-xs font-heading font-bold text-brand-charcoal uppercase tracking-wider">
            Key Support Areas:
          </p>
          <ul className="space-y-1.5">
            {industry.keySolutions.slice(0, 3).map((sol, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-brand-slate">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-fresh shrink-0 mt-0.5" />
                <span>{sol}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="px-6 py-4 bg-brand-bgWarm border-t border-brand-borderSubtle">
        <NavLink
          to="/contact"
          className="flex items-center justify-between font-heading font-semibold text-xs text-brand-emerald hover:text-brand-emeraldHover transition-colors"
        >
          <span>Consult for {industry.title}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>
    </motion.div>
  );
}
