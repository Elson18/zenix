import React from 'react';
import { NavLink } from 'react-router-dom';
import { Factory, Package, Utensils, Hotel, ChefHat, FlaskConical, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface HomeIndustryItem {
  id: string;
  number: string;
  title: string;
  description: string;
  services: string[];
  iconName: string;
}

interface HomeIndustryCardProps {
  industry: HomeIndustryItem;
  index: number;
}

export default function HomeIndustryCard({ industry, index }: HomeIndustryCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Factory':
        return <Factory className="w-6 h-6 text-brand-primary" />;
      case 'Package':
        return <Package className="w-6 h-6 text-brand-primary" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-brand-primary" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-brand-primary" />;
      case 'ChefHat':
        return <ChefHat className="w-6 h-6 text-brand-primary" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-brand-primary" />;
      default:
        return <Factory className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl border border-brand-border/60 hover:border-brand-primary p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:bg-brand-bgWarm hover:shadow-card-hover"
    >
      <div className="space-y-5">
        {/* Number & Icon */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-brand-bgWarm group-hover:bg-brand-primaryLight/40 flex items-center justify-center transition-colors">
            {getIcon(industry.iconName)}
          </div>
          <span className="text-xs font-heading font-extrabold text-brand-border group-hover:text-brand-primary/40 transition-colors">
            {industry.number}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-heading font-extrabold text-xl text-brand-black group-hover:text-brand-primaryDark transition-colors">
            {industry.title}
          </h3>
          <p className="text-brand-textSecondary text-sm leading-relaxed">
            {industry.description}
          </p>
        </div>

        {/* Services List */}
        <div className="pt-4 border-t border-brand-border/40 space-y-2">
          <p className="text-[10px] font-heading font-bold text-brand-textMuted uppercase tracking-wider">
            Relevant Services
          </p>
          <ul className="grid grid-cols-1 gap-2">
            {industry.services.map((service, sIdx) => (
              <li key={sIdx} className="flex items-center gap-2 text-xs text-brand-textSecondary">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
                <span className="group-hover:text-brand-black transition-colors">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="pt-6 mt-6 border-t border-brand-border/40 flex items-center justify-between">
        <NavLink
          to="/service-finder"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-primary transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-primary group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>
    </motion.div>
  );
}
