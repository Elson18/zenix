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
  Pill,
  GraduationCap,
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
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-brand-primaryDark" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6 text-brand-primaryDark" />;
      case 'Tag': return <Tag className="w-6 h-6 text-brand-primaryDark" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-brand-primaryDark" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-brand-primaryDark" />;
      case 'Award': return <Award className="w-6 h-6 text-brand-primaryDark" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-brand-primaryDark" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-primaryDark" />;
      case 'Factory': return <Factory className="w-6 h-6 text-brand-primaryDark" />;
      case 'Store': return <Store className="w-6 h-6 text-brand-primaryDark" />;
      case 'Handshake': return <Handshake className="w-6 h-6 text-brand-primaryDark" />;
      case 'Pill': return <Pill className="w-6 h-6 text-brand-primaryDark" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-brand-primaryDark" />;
      default: return <FlaskConical className="w-6 h-6 text-brand-primaryDark" />;
    }
  };

  const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 3deg rotation
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ perspective: 1000 }}
    >
      <NavLink
        to={`/services/${service.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        className="group relative flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-brand-border hover:border-brand-primary shadow-subtle hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
      >
        <div>
          {/* Top Row: Icon & Number */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-primaryLight flex items-center justify-center group-hover:bg-brand-softGold group-hover:scale-110 transition-all duration-300">
              <span className="transition-transform group-hover:-translate-y-0.5">
                {getIcon(service.iconName)}
              </span>
            </div>
            <span className="font-heading font-extrabold text-sm text-brand-textMuted tracking-wider">
              {service.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl text-brand-black mb-3 group-hover:text-brand-primary transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-brand-textSecondary text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>
        </div>

        {/* Bottom CTA Arrow */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between font-heading font-semibold text-sm text-brand-black group-hover:text-brand-primary">
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </NavLink>
    </motion.div>
  );
}
