import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Package, 
  FlaskConical, 
  Binary, 
  Tag, 
  FileCheck2, 
  ShieldCheck, 
  Factory, 
  Store, 
  TrendingUp,
  Award
} from 'lucide-react';

interface EcosystemItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  x: string; // custom layout position
  y: string;
  z: number;  // depth level
  delay: number;
  color: string;
}

export default function HeroEcosystem() {
  const shouldReduceMotion = useReducedMotion();

  const items: EcosystemItem[] = [
    { id: 'package', title: 'Food Package', icon: Package, x: '20%', y: '15%', z: 40, delay: 0.1, color: 'text-brand-gold bg-brand-lightGold border-brand-goldBorder/40' },
    { id: 'lab', title: 'R&D Lab', icon: FlaskConical, x: '75%', y: '20%', z: 30, delay: 0.2, color: 'text-brand-emerald bg-brand-lightGreen border-brand-emerald/10' },
    { id: 'nutrition', title: 'Nutrition facts', icon: Binary, x: '10%', y: '45%', z: 50, delay: 0.3, color: 'text-emerald-700 bg-emerald-50 border-emerald-200/50' },
    { id: 'label', title: 'Validate Label', icon: Tag, x: '82%', y: '50%', z: 20, delay: 0.4, color: 'text-brand-gold bg-brand-lightGold border-brand-goldBorder/40' },
    { id: 'fssai', title: 'FSSAI License', icon: FileCheck2, x: '25%', y: '75%', z: 35, delay: 0.5, color: 'text-brand-emerald bg-brand-lightGreen border-brand-emerald/10' },
    { id: 'haccp', title: 'HACCP Shield', icon: ShieldCheck, x: '68%', y: '78%', z: 45, delay: 0.6, color: 'text-emerald-700 bg-emerald-50 border-emerald-200/50' },
    { id: 'factory', title: 'Factory Setup', icon: Factory, x: '48%', y: '12%', z: 15, delay: 0.7, color: 'text-brand-emerald bg-brand-lightGreen border-brand-emerald/10' },
    { id: 'restaurant', title: 'Restaurant Setup', icon: Store, x: '50%', y: '82%', z: 25, delay: 0.8, color: 'text-brand-gold bg-brand-lightGold border-brand-goldBorder/40' },
    { id: 'growth', title: 'Market Launch', icon: TrendingUp, x: '85%', y: '80%', z: 60, delay: 0.9, color: 'text-white bg-brand-emerald border-brand-emerald' }
  ];

  return (
    <div 
      className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
      aria-label="Interactive 3D Food Business Ecosystem"
    >
      {/* Central Zenix Core Emblem */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6, rotateY: 180 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-brand-emerald via-brand-emeraldHover to-brand-dark flex flex-col items-center justify-center border-4 border-brand-gold shadow-gold text-brand-gold outline-none"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold font-heading font-extrabold text-2xl shadow-sm mb-1">
          Z
        </div>
        <span className="font-heading font-extrabold text-base tracking-widest text-white leading-none">
          ZENIX
        </span>
        <span className="text-[8px] font-bold tracking-[0.25em] text-brand-gold uppercase mt-1">
          FOOD WORX
        </span>
      </motion.div>

      {/* Orbiting Glassmorphic Elements */}
      {items.map((item) => {
        const Icon = item.icon;
        
        // Define float animation configuration
        const floatAnimation = shouldReduceMotion 
          ? {} 
          : {
              y: [0, -12, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, -5, 0],
              transition: {
                duration: 5 + item.delay * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay
              }
            };

        return (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.3, z: -100 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, z: item.z }}
            transition={{ duration: 0.8, delay: item.delay, type: 'spring', damping: 15 }}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              transformStyle: 'preserve-3d',
              zIndex: item.z
            }}
          >
            {/* The float container */}
            <motion.div
              animate={floatAnimation}
              className={`p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md shadow-subtle hover:shadow-card-hover hover:border-brand-emerald/30 cursor-pointer flex items-center gap-2.5 transition-all duration-300 ${item.color}`}
              style={{ transform: `translateZ(${item.z}px)` }}
            >
              <div className="p-1.5 rounded-lg bg-white/20 shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-heading font-extrabold text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap">
                {item.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Background elegant grid lines */}
      <svg className="absolute inset-0 w-full h-full stroke-brand-borderLight/40 -z-10" fill="none">
        <defs>
          <radialGradient id="fade-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6F4F1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="200" fill="url(#fade-glow)" className="opacity-70" />
        <circle cx="50%" cy="50%" r="120" strokeDasharray="5 5" strokeWidth="1.5" />
        <circle cx="50%" cy="50%" r="220" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    </div>
  );
}
