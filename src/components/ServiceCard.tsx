import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FlaskConical, 
  FileCheck2, 
  Tag, 
  Calculator, 
  Lightbulb, 
  Award, 
  Utensils, 
  ShieldCheck, 
  Factory, 
  Store, 
  Handshake, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../data/servicesData';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-brand-emerald" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6 text-brand-emerald" />;
      case 'Tag': return <Tag className="w-6 h-6 text-brand-emerald" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-brand-emerald" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-brand-emerald" />;
      case 'Award': return <Award className="w-6 h-6 text-brand-emerald" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-brand-emerald" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-emerald" />;
      case 'Factory': return <Factory className="w-6 h-6 text-brand-emerald" />;
      case 'Store': return <Store className="w-6 h-6 text-brand-emerald" />;
      case 'Handshake': return <Handshake className="w-6 h-6 text-brand-emerald" />;
      default: return <FlaskConical className="w-6 h-6 text-brand-emerald" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <NavLink
        to={`/services/${service.slug}`}
        className="group relative flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-brand-borderLight hover:border-brand-emerald/50 shadow-subtle hover:shadow-card-hover transform hover:-translate-y-1.5 transition-all duration-300"
      >
        <div>
          {/* Top Row: Icon & Number */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-lightGreen flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors duration-300">
              <span className="group-hover:text-white text-brand-emerald transition-colors">
                {getIcon(service.iconName)}
              </span>
            </div>
            <span className="font-heading font-extrabold text-sm text-brand-muted tracking-wider">
              {service.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl text-brand-charcoal mb-3 group-hover:text-brand-emerald transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-brand-slate text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>
        </div>

        {/* Bottom CTA Arrow */}
        <div className="pt-4 border-t border-brand-borderSubtle flex items-center justify-between font-heading font-semibold text-sm text-brand-emerald group-hover:text-brand-emeraldHover">
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </NavLink>
    </motion.div>
  );
}
