import React from 'react';
import { 
  ShieldAlert, 
  FileText, 
  FlaskConical, 
  Lightbulb, 
  Award, 
  Utensils, 
  Factory, 
  TrendingUp 
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { motion } from 'framer-motion';

export default function ExpertiseGrid() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-brand-emerald" />;
      case 'FileText': return <FileText className="w-6 h-6 text-brand-emerald" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-brand-emerald" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-brand-emerald" />;
      case 'Award': return <Award className="w-6 h-6 text-brand-emerald" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-brand-emerald" />;
      case 'Factory': return <Factory className="w-6 h-6 text-brand-emerald" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-brand-emerald" />;
      default: return <ShieldAlert className="w-6 h-6 text-brand-emerald" />;
    }
  };

  return (
    <section className="py-16 bg-white border-y border-brand-borderLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-gold px-3.5 py-1.5 rounded-full gold-badge inline-block">
            CORE CAPABILITIES
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal tracking-tight">
            Expertise That Keeps Your Business Moving Forward
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {companyData.expertiseCategories.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-brand-bgWarm border border-brand-borderLight hover:border-brand-emerald/40 hover:bg-brand-lightGreen/40 transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <span className="font-heading font-bold text-sm sm:text-base text-brand-charcoal group-hover:text-brand-emerald transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
