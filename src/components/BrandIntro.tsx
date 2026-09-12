import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BrandIntroProps {
  onComplete: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [introStep, setIntroStep] = useState<'appear' | 'flash' | 'travel' | 'done'>('appear');
  const [targetOffset, setTargetOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Check if intro has already been played in this browser session
    const hasSeenIntro = sessionStorage.getItem('zenix_brand_intro_seen');
    if (hasSeenIntro || shouldReduceMotion) {
      onComplete();
      return;
    }

    // Calculate distance from screen center to top-left header logo target position
    const calculateTargetOffset = () => {
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      // Header logo position estimate relative to viewport (padding & container left)
      const navbarLogoX = Math.max(32, Math.min(window.innerWidth * 0.1, 120)) + 30;
      const navbarLogoY = 44; // Header vertical center height

      setTargetOffset({
        x: navbarLogoX - screenCenterX,
        y: navbarLogoY - screenCenterY
      });
    };

    calculateTargetOffset();

    // Sequence Timings:
    // 0ms - 450ms: Appear at center with subtle 3D tilt
    // 450ms - 900ms: Golden flash + rotate to flat 0deg
    // 850ms - 1500ms: Travel from center to top-left navbar
    // 1400ms - 1900ms: Fade backdrop & reveal website

    const timer1 = setTimeout(() => setIntroStep('flash'), 450);
    const timer2 = setTimeout(() => setIntroStep('travel'), 850);
    const timer3 = setTimeout(() => {
      setIntroStep('done');
      sessionStorage.setItem('zenix_brand_intro_seen', 'true');
      onComplete();
    }, 1750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [shouldReduceMotion, onComplete]);

  const hasSeen = sessionStorage.getItem('zenix_brand_intro_seen');
  if (hasSeen || shouldReduceMotion || introStep === 'done') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: introStep === 'travel' ? [1, 1, 0] : 1 }}
      transition={{ duration: 0.9, times: [0, 0.6, 1] }}
      className="fixed inset-0 z-50 bg-gradient-to-b from-white via-brand-bgWarm to-white flex items-center justify-center overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Background Subtle 3D Depth Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [0.8, 1.15, 1], opacity: [0.2, 0.45, 0] }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* 3D Centered Logo Container */}
      <div className="relative z-10 flex items-center justify-center" style={{ perspective: 1200 }}>
        {/* Golden Flash/Halo Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: introStep === 'flash' ? [0, 0.95, 0] : 0,
            scale: introStep === 'flash' ? [0.8, 1.4, 1.1] : 0.8
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute w-40 h-40 bg-brand-primary/40 rounded-full blur-xl pointer-events-none"
        />

        {/* Traveling 3D Logo */}
        <motion.div
          initial={{
            scale: 0.75,
            opacity: 0,
            rotateX: -14,
            rotateY: 18,
            x: 0,
            y: 0
          }}
          animate={
            introStep === 'appear'
              ? {
                  scale: 1.15,
                  opacity: 1,
                  rotateX: -4,
                  rotateY: 5,
                  x: 0,
                  y: 0
                }
              : introStep === 'flash'
              ? {
                  scale: 1.1,
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  x: 0,
                  y: 0
                }
              : {
                  scale: 1,
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  x: targetOffset.x,
                  y: targetOffset.y
                }
          }
          transition={
            introStep === 'travel'
              ? { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.45, ease: "easeOut" }
          }
          className="flex items-center gap-4 py-2 px-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-card-hover border border-brand-border/60"
        >
          <div className="relative shrink-0">
            <img
              src="/zenixfoodwork.jpg"
              alt="Zenix Food Worx"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-gold border border-brand-primary/30 shrink-0"
            />
          </div>

          <div className="flex flex-col justify-center text-left">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-brand-black leading-tight">
              ZENIX
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase leading-none mt-1">
              FOOD WORX
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
