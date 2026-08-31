import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Factory, 
  UtensilsCrossed, 
  Hotel, 
  Store, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface IndustryVertical {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  keySolutions: string[];
  image?: string;
}

const industries: IndustryVertical[] = [
  {
    id: "food-manufacturers",
    title: "Food Manufacturers",
    subtitle: "Scale Production with Regulatory Confidence",
    icon: Factory,
    description: "From greenfield factory layout planning to commercial scaling, we help food processors stay compliant with FSSAI, HACCP, and ISO standards while optimizing output.",
    keySolutions: [
      "FSSAI State & Central License Filing",
      "HACCP & ISO System Implementation",
      "Factory Layout & Clean-Zone Setup"
    ],
    image: "/images/Food Manufacturers.jpeg"
  },
  {
    id: "restaurants",
    title: "Restaurants & Dining",
    subtitle: "Hygiene Standards & Operational Excellence",
    icon: UtensilsCrossed,
    description: "Streamline restaurant operations with menu cost engineering, staff hygiene audits, trade licensing, FSSAI compliance, and kitchen workflow design.",
    keySolutions: [
      "Restaurant FSSAI & Hygiene Compliance",
      "Kitchen Layout & Workflow Planning",
      "Menu Costing & Margin Optimization"
    ]
  },
  {
    id: "hotels-hospitality",
    title: "Hotels & Hospitality",
    subtitle: "Premium Standards for Large-Scale Dining",
    icon: Hotel,
    description: "Multi-outlet hotel kitchens require elevated hygiene management and operational control. We conduct food safety inspections and staff training across hotel properties.",
    keySolutions: [
      "FSMS & HACCP Audits for Hotel Kitchens",
      "Banquet & Bulk Catering Safety SOPs",
      "Vendor Quality & Raw Material Audits"
    ]
  },
  {
    id: "cloud-kitchens",
    title: "Cloud Kitchens & QSRs",
    subtitle: "Fast-Paced Delivery & Aggregator Onboarding",
    icon: Store,
    description: "Cloud kitchens operate on high volume and speed. We assist delivery outlets with rapid licensing, Swiggy/Zomato onboarding compliance, waste reduction, and safety SOPs.",
    keySolutions: [
      "Rapid FSSAI Registration for Outlets",
      "Swiggy & Zomato Onboarding Compliance",
      "Menu Standardization & Portion SOPs"
    ]
  },
  {
    id: "food-startups",
    title: "Food Startups & D2C",
    subtitle: "Turn Culinary Ideas into Market Ready Products",
    icon: Rocket,
    description: "For new food founders launching innovative foods, we provide turnkey guidance across recipe trials, packaging claims, nutrition tables, and contract manufacturing.",
    keySolutions: [
      "Recipe Formulation & Bench Trials",
      "Nutritional Facts Panel & Claims",
      "Contract Manufacturing Matchmaking"
    ],
    image: "/images/Food Startups & D2C.jpeg"
  },
  {
    id: "growing-brands",
    title: "Growing Food Brands",
    subtitle: "Scale Multi-Market Reach Without Compliance Gaps",
    icon: TrendingUp,
    description: "Expanding into retail chains, e-commerce platforms, or exports requires structured compliance. We help scaling brands verify co-packers and update licenses.",
    keySolutions: [
      "Contract Manufacturer (Co-Packer) Audits",
      "Central FSSAI Licensing & Multi-Scope",
      "Export Packaging & Quality SLAs"
    ]
  }
];

export default function IndustriesWeServeSection() {
  return (
    <section className="py-20 bg-white border-t border-brand-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-bgWarm border border-brand-primary/20 shadow-sm">
            SECTOR-SPECIFIC SOLUTIONS
          </span>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
            Industries We Serve
          </h2>

          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            Tailored food safety, licensing, packaging, laboratory testing, and operational solutions customized for your specific food business vertical.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-3xl border border-brand-border/60 hover:border-brand-primary shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                {/* Optional Image Banner or Icon Banner */}
                {ind.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-white">
                      <h3 className="font-heading font-extrabold text-lg text-white">
                        {ind.title}
                      </h3>
                      <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-primaryDark shrink-0">
                        <Icon className="w-5 h-5 text-brand-primaryDark" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bgWarm group-hover:bg-brand-primaryLight/50 flex items-center justify-center text-brand-primaryDark transition-colors">
                      <Icon className="w-6 h-6 text-brand-primaryDark" />
                    </div>
                    <span className="text-[10px] font-heading font-extrabold text-brand-primary bg-brand-primaryLight px-2.5 py-1 rounded-full border border-brand-primary/10">
                      Sector 0{idx + 1}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {!ind.image && (
                      <h3 className="font-heading font-extrabold text-xl text-brand-black group-hover:text-brand-primaryDark transition-colors">
                        {ind.title}
                      </h3>
                    )}
                    <p className="text-xs font-heading font-bold text-brand-primary uppercase tracking-wider">
                      {ind.subtitle}
                    </p>
                    <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  {/* Solutions List */}
                  <div className="pt-3 border-t border-brand-border/40 space-y-2">
                    <p className="text-[10px] font-heading font-bold text-brand-textMuted uppercase tracking-wider">
                      Key Support Solutions:
                    </p>
                    <ul className="space-y-1.5">
                      {ind.keySolutions.map((sol, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-brand-textSecondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 py-4 bg-brand-backgroundSoft/60 border-t border-brand-border/40 flex items-center justify-between">
                  <NavLink
                    to="/service-finder"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-brand-black uppercase tracking-wider hover:text-brand-primary transition-colors group/link"
                  >
                    <span>Explore Sector Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-primary group-hover/link:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
