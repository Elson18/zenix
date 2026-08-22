import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

type Face = 'front' | 'ingredients' | 'nutrition' | 'regulatory';

export default function FoodPackaging() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFace, setActiveFace] = useState<Face>('front');

  // Map face key to rotation degree
  const getRotationStyle = (face: Face) => {
    switch (face) {
      case 'front': return { rotateY: 0, rotateX: 0 };
      case 'ingredients': return { rotateY: -90, rotateX: 0 };
      case 'nutrition': return { rotateY: -180, rotateX: 0 };
      case 'regulatory': return { rotateY: 0, rotateX: -90 };
      default: return { rotateY: 0, rotateX: 0 };
    }
  };

  const handleFaceChange = (face: Face) => {
    setActiveFace(face);
    trackEvent('faq_opened', {
      serviceName: 'Food Packaging Face',
      faqQuestion: `Rotated to: ${face}`,
      page: window.location.pathname
    });
  };

  const rot = getRotationStyle(activeFace);

  return (
    <div className="space-y-6 flex flex-col items-center select-none py-6">
      
      {/* 3D Viewport */}
      <div 
        className="w-[280px] h-[340px] flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* Package Container */}
        <motion.div
          animate={shouldReduceMotion ? {} : { 
            rotateY: rot.rotateY, 
            rotateX: rot.rotateX
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
          className="relative w-[180px] h-[260px] cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 1. FRONT FACE (rotateY 0deg) */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-black to-brand-charcoal border-2 border-brand-primary flex flex-col justify-between p-4 shadow-xl"
            style={{ 
              transform: 'translateZ(90px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[7px] font-heading font-extrabold tracking-widest text-brand-primary bg-white/10 px-2 py-0.5 rounded-full">
                PREMIUM
              </span>
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-heading font-extrabold text-white text-xl tracking-tight leading-none">
                ZENIX
              </h4>
              <p className="text-[7px] font-bold text-brand-primary tracking-[0.2em] uppercase">
                FOOD WORX
              </p>
              <div className="w-8 h-[1px] bg-brand-primary/60 mx-auto my-2" />
              <p className="text-[10px] text-brand-primaryLight font-heading font-semibold uppercase tracking-wider">
                COMPLIANT BLEND
              </p>
            </div>

            <div className="flex justify-between items-center text-[7px] text-white/70">
              <span>NET WT. 500g</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm border border-brand-primary/40 p-0.5 flex items-center justify-center shrink-0">
                  <span className="w-1 h-1 rounded-full bg-brand-primary" />
                </span>
                <span>VEG</span>
              </span>
            </div>
          </div>

          {/* 2. BACK FACE (rotateY 180deg) */}
          <div 
            className="absolute inset-0 rounded-2xl bg-white border border-brand-border flex flex-col justify-between p-3.5 shadow-xl text-brand-textSecondary text-[7px]"
            style={{ 
              transform: 'rotateY(180deg) translateZ(90px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="border-b border-brand-border pb-1 mb-1">
              <h5 className="font-heading font-bold text-brand-black text-[8px] uppercase">
                Nutritional Facts
              </h5>
              <p className="text-[6px] text-brand-textMuted">Values per 100g serving</p>
            </div>

            <div className="space-y-1 flex-grow font-heading">
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Energy</span>
                <span className="font-bold">380 kcal</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Protein</span>
                <span className="font-bold">12.5 g</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Carbohydrates</span>
                <span className="font-bold">75.0 g</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold"> Total Sugars</span>
                <span className="font-bold">2.4 g</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Dietary Fiber</span>
                <span className="font-bold">8.0 g</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Fat</span>
                <span className="font-bold">3.2 g</span>
              </div>
              <div className="flex justify-between border-b border-brand-border py-0.5">
                <span className="font-semibold">Sodium</span>
                <span className="font-bold">45 mg</span>
              </div>
            </div>

            <p className="text-[5px] text-brand-textMuted leading-tight mt-1 border-t border-brand-border pt-1">
              * Recommended Dietary Allowance (RDA) values are based on a 2000 kcal diet.
            </p>
          </div>

          {/* 3. RIGHT SIDE FACE (rotateY 90deg) */}
          <div 
            className="absolute top-0 bottom-0 rounded-2xl bg-brand-backgroundSoft border border-brand-border flex flex-col justify-between p-3 shadow-xl"
            style={{ 
              left: '45px', // centered offset
              width: '90px', // width of the side panels (depth of box)
              transform: 'rotateY(90deg) translateZ(90px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="border-b border-brand-border pb-1">
              <h5 className="font-heading font-bold text-brand-black text-[7px] uppercase tracking-wider">
                INGREDIENTS
              </h5>
            </div>
            
            <p className="text-[6px] text-brand-textSecondary leading-relaxed flex-grow pt-2 font-heading">
              Whole Wheat Flour, Organic Rolled Oats, Millet Blend (Ragi, Bajra), Natural Flavor Extracts, Vitamin & Mineral Premix (Iron, Calcium, Zinc), Salt, Plant Fiber.
            </p>

            <div className="text-[5px] text-brand-textMuted leading-none border-t border-brand-border pt-1">
              Store in a cool, dry place away from sunlight.
            </div>
          </div>

          {/* 4. LEFT SIDE FACE (rotateY -90deg) */}
          <div 
            className="absolute top-0 bottom-0 rounded-2xl bg-brand-backgroundSoft border border-brand-border flex flex-col justify-between p-3 shadow-xl"
            style={{ 
              left: '45px',
              width: '90px',
              transform: 'rotateY(-90deg) translateZ(90px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="border-b border-brand-border pb-1">
              <h5 className="font-heading font-bold text-brand-black text-[7px] uppercase tracking-wider">
                BATCH INFO
              </h5>
            </div>
            
            <div className="space-y-1.5 pt-2 text-[6px] text-brand-textSecondary">
              <div>
                <span className="font-bold">Mfd Date:</span>
                <p>22 Aug 2026</p>
              </div>
              <div>
                <span className="font-bold">Expiry:</span>
                <p>22 Feb 2027</p>
              </div>
              <div>
                <span className="font-bold">Batch No:</span>
                <p>ZX-402-N</p>
              </div>
            </div>

            <div className="text-[5px] text-brand-textMuted leading-none border-t border-brand-border pt-1">
              Zenix Food Worx Quality Seal.
            </div>
          </div>

          {/* 5. TOP FACE (rotateX 90deg) */}
          <div 
            className="absolute left-0 right-0 rounded-2xl bg-brand-black border border-brand-primary/30 flex items-center justify-center p-3"
            style={{ 
              top: '85px',
              height: '90px',
              transform: 'rotateX(90deg) translateZ(130px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <span className="text-[8px] font-heading font-extrabold text-brand-primary uppercase tracking-widest text-center">
              CLOSE BEFORE SEALING
            </span>
          </div>

          {/* 6. BOTTOM FACE (rotateX -90deg) -> Regulatory View */}
          <div 
            className="absolute left-0 right-0 rounded-2xl bg-white border-2 border-brand-border flex flex-col justify-between p-3 shadow-xl"
            style={{ 
              top: '85px',
              height: '90px',
              transform: 'rotateX(-90deg) translateZ(130px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-1">
              <span className="text-[6px] text-brand-textSecondary font-bold">FSSAI Lic. No:</span>
              <span className="text-[6.5px] font-heading font-extrabold text-brand-primaryDark">10022022000213</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[5.5px] text-brand-textSecondary font-heading">
              <div>
                <p className="font-bold text-brand-textMuted">Manufactured by:</p>
                <p>Apex Food Processing Hub, Sector 62, IN</p>
              </div>
              <div>
                <p className="font-bold text-brand-textMuted">Legal Metrology:</p>
                <p>Standard retail dimensions, package certified.</p>
              </div>
            </div>

            <div className="text-[5px] text-brand-textMuted text-center pt-1 border-t border-brand-border">
              FSSAI & LEGAL METROLOGY COMPLIANT DECLARATIONS
            </div>
          </div>

        </motion.div>
      </div>

      {/* Interactive Controller Tabs */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {(['front', 'ingredients', 'nutrition', 'regulatory'] as Face[]).map((face) => (
          <button
            key={face}
            onClick={() => handleFaceChange(face)}
            className={`px-3 py-1.5 rounded-lg font-heading text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeFace === face
                ? 'bg-brand-primary text-brand-black shadow-sm'
                : 'bg-white border border-brand-border text-brand-textSecondary hover:border-brand-primary/40 hover:text-brand-primaryDark'
            }`}
          >
            {face === 'front' ? 'Front Label' :
             face === 'ingredients' ? 'Ingredients (Side)' :
             face === 'nutrition' ? 'Nutrition (Back)' : 'Regulatory (Base)'}
          </button>
        ))}
      </div>
      
      {/* Dynamic guidance note */}
      <div className="flex items-start gap-2 max-w-sm text-center justify-center p-3 rounded-xl bg-brand-primaryLight/50 border border-brand-primary/10 text-[10px] text-brand-textSecondary leading-relaxed">
        <Info className="w-3.5 h-3.5 text-brand-primaryDark shrink-0 mt-0.5" />
        <span>Use the buttons to rotate the box and inspect individual package panels.</span>
      </div>

    </div>
  );
}
