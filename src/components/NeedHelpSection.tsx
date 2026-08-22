import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileCheck2, 
  FlaskConical, 
  Tag, 
  Lightbulb, 
  Store, 
  Factory, 
  Award, 
  Handshake, 
  ArrowRight 
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface HelpCard {
  id: string;
  title: string;
  description: string;
  cta: string;
  slug: string;
  icon: React.ComponentType<any>;
  badge?: 'Popular' | 'Recommended' | null;
}

export default function NeedHelpSection() {
  const navigate = useNavigate();

  const cards: HelpCard[] = [
    {
      id: 'fssai',
      title: 'I Need an FSSAI License',
      description: 'Get guidance for new applications, renewals, queries and compliance requirements.',
      cta: 'Explore FSSAI Support',
      slug: 'regulatory-licensing',
      icon: FileCheck2,
      badge: 'Popular'
    },
    {
      id: 'testing',
      title: 'I Need Food Testing',
      description: 'Understand the testing requirements for quality, safety, nutrition and shelf life.',
      cta: 'Explore Food Testing',
      slug: 'food-testing',
      icon: FlaskConical,
      badge: 'Recommended'
    },
    {
      id: 'label',
      title: 'I Need to Validate My Label',
      description: 'Review your packaging information for applicable food and legal requirements.',
      cta: 'Validate My Label',
      slug: 'label-validation',
      icon: Tag
    },
    {
      id: 'launch',
      title: 'I Want to Launch a Product',
      description: 'From formulation and trials to testing, nutrition and compliance.',
      cta: 'Start Product Development',
      slug: 'product-development',
      icon: Lightbulb
    },
    {
      id: 'restaurant',
      title: 'I Want to Set Up a Restaurant',
      description: 'Kitchen planning, equipment, licensing, hygiene and operational setup.',
      cta: 'Plan My Restaurant',
      slug: 'restaurant-setup',
      icon: Store
    },
    {
      id: 'factory',
      title: 'I Want to Set Up a Factory',
      description: 'Layout, machinery, utilities, licensing and pre-operational compliance.',
      cta: 'Plan My Factory',
      slug: 'factory-setup',
      icon: Factory
    },
    {
      id: 'certification',
      title: 'I Need HACCP / ISO Support',
      description: 'Gap analysis, documentation, training and audit preparation.',
      cta: 'Explore Certification Support',
      slug: 'certification-documentation',
      icon: Award
    },
    {
      id: 'manufacturing',
      title: 'I Need Contract Manufacturing',
      description: 'Find suitable manufacturing partners and coordinate compliance and production.',
      cta: 'Explore Contract Manufacturing',
      slug: 'contract-manufacturing',
      icon: Handshake
    }
  ];

  const handleCardClick = (card: HelpCard) => {
    trackEvent('service_selected', {
      serviceName: card.title,
      serviceId: card.id,
      page: 'home'
    });
    navigate(`/services/${card.slug}`);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-brand-border">
      {/* Background blurs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-primaryLight/15 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-primary px-3.5 py-1.5 rounded-full gold-badge inline-block bg-brand-backgroundSoft border border-brand-border">
            TAILORED SUPPORT
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-black tracking-tight">
            What Do You Need Help With?
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            Tell us what you're working on. We'll help you find the right solution.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleCardClick(card)}
                className="group relative bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-primary/50 shadow-subtle hover:shadow-card-hover cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[250px] outline-none focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card);
                  }
                }}
                aria-label={`${card.title}. ${card.description} Click to ${card.cta}`}
              >
                {/* Upper Content */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primaryLight flex items-center justify-center text-brand-primaryDark group-hover:bg-brand-primary group-hover:text-brand-black transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Badge */}
                    {card.badge && (
                      <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                        card.badge === 'Popular' 
                          ? 'bg-brand-primaryLight text-brand-black border-brand-primary/20' 
                          : 'bg-brand-backgroundSoft text-brand-charcoal border-brand-border'
                      }`}>
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-brand-black mb-2 group-hover:text-brand-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-brand-textSecondary leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* CTA Line */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-heading font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-primary transition-colors">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
