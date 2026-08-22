export interface FAQItem {
  question: string;
  answer: string;
}

export const serviceFAQs: Record<string, FAQItem[]> = {
  'food-testing': [
    {
      question: 'What types of food testing do you support?',
      answer: 'We support comprehensive testing including nutritional profiling, microbiological screen tests (such as pathogens, yeast, and mold), heavy metal screening, pesticide residue tests, and accelerated/real-time shelf-life testing. Specific testing needs can vary depending on your product category and target market regulations.'
    },
    {
      question: 'When should food products be tested?',
      answer: 'Testing is typically required during product development, before initial commercial launch, and periodically during production. Under FSSAI norms, many manufacturers are required to submit testing reports every 6 months.'
    },
    {
      question: 'How does testing support compliance?',
      answer: 'Standardized testing provides analytical proof that your food products are free from contaminants, safe for consumption, and that nutritional panel claims match actual parameters. This documentation is essential for regulatory audits and customer trust.'
    }
  ],
  'regulatory-licensing': [
    {
      question: 'When might a business require an FSSAI license?',
      answer: 'Any food business operator involved in the manufacture, processing, packaging, storage, transportation, distribution, or sale of food products in India requires an FSSAI license or registration. The tier (Basic, State, or Central) is generally determined by annual turnover and production capacity.'
    },
    {
      question: 'Do you support renewal?',
      answer: 'Yes, we track licensing timelines and support the documentation filing for timely renewals to prevent operational penalties or license lapses.'
    },
    {
      question: 'Can you help with queries/reversions?',
      answer: 'Yes, we regularly assist businesses in drafting technical responses to queries, clarification requests, and application reversions raised by food safety authorities.'
    }
  ],
  'label-validation': [
    {
      question: 'What information should be reviewed on a food label?',
      answer: 'FSSAI packaging guidelines mandate reviewing ingredient listings, allergen declarations, vegetarian/non-vegetarian emblems, net contents, date of manufacture/expiry, customer helpline information, and brand-name font ratios. Requirements can vary depending on the product and applicable regulations.'
    },
    {
      question: 'Can you review nutritional information?',
      answer: 'Yes, we verify that your nutritional table structure, serving sizes, and percent daily allowance contributions align with FSSAI regulations and legal metrology rules.'
    }
  ],
  'nutritional-calculation': [
    {
      question: 'Can you calculate nutritional values without laboratory testing?',
      answer: 'Yes, we can perform recipe-based calculations using standardized reference databases (like IFCT) for standard formulations. However, for products subjected to high heat, processing losses, or regulatory claims (e.g., "rich in protein"), laboratory testing verification is recommended.'
    },
    {
      question: 'What formats do you output?',
      answer: 'We provide print-ready nutritional facts tables formatted for FSSAI standards, with option adjustments for international markets like US FDA or EU regulations.'
    }
  ],
  'product-development': [
    {
      question: 'How do you protect recipe confidentiality?',
      answer: 'Confidentiality is a core priority. We sign mutual Non-Disclosure Agreements (NDAs) before reviewing ingredients, weights, yields, or formulation specifications.'
    },
    {
      question: 'Do you help with sourcing raw ingredients?',
      answer: 'Yes, we assist in connecting brands with commercial food ingredient suppliers, flavor houses, and co-packers suitable for pilot trials.'
    }
  ],
  'certification-documentation': [
    {
      question: 'What is the difference between HACCP and ISO 22000?',
      answer: 'HACCP is a hazard management methodology focused on identifying critical control points in production. ISO 22000 is a broader Food Safety Management System (FSMS) framework that incorporates HACCP principles alongside general business management workflows.'
    },
    {
      question: 'Do you issue the final certifications?',
      answer: 'We act as specialized consultants. We conduct gap audits, draft process documents, and train staff. The final certifications are issued by accredited third-party certification bodies after successful audits, which we help you prepare for and defend.'
    }
  ],
  'hospitality-consulting': [
    {
      question: 'How does menu engineering improve margins?',
      answer: 'Menu engineering analyses dish cost structures and popularity to redesign menu layouts. This helps nudge diners toward higher-margin items while eliminating food waste and high-cost ingredients.'
    },
    {
      question: 'Do you support Swiggy and Zomato onboarding?',
      answer: 'Yes, we help register outlets on food delivery portals, establish proper menu structures, navigate aggregator compliance, and set up initial promotional campaigns.'
    }
  ],
  'food-safety-inspections': [
    {
      question: 'How often should internal hygiene audits be conducted?',
      answer: 'For retail food outlets, kitchens, and processing sites, we suggest quarterly audits. This helps establish ongoing staff accountability and keeps facilities inspection-ready.'
    },
    {
      question: 'What is included in the mock FSSAI inspection report?',
      answer: 'Our report includes comprehensive site photography, checklist scoring based on official inspection templates, critical risk identification (e.g., cross-contamination, water checks), and detailed Corrective and Preventive Action (CAPA) plans.'
    }
  ],
  'factory-setup': [
    {
      question: 'Why is factory layout planning important before construction?',
      answer: 'Designing layouts aligned with HACCP prevents cross-contamination between raw materials and finished products. Modifying layouts after epoxy flooring or heavy drainage is installed is extremely expensive.'
    },
    {
      question: 'Can you help select machinery suppliers?',
      answer: 'Yes, we identify commercial machinery suppliers suited for your production capacity and verify that they meet sanitary food-grade specifications.'
    }
  ],
  'restaurant-setup': [
    {
      question: 'Do you design kitchen layouts?',
      answer: 'Yes, we draft ergonomic kitchen plans defining preparation, cooking, washing, and dispatch zones to maximize speed and ensure safety.'
    },
    {
      question: 'What compliance licenses do I need to launch a restaurant?',
      answer: 'Launch requirements generally include an FSSAI Food Service License, Municipal Trade License, Eating House License, Fire Safety NOC, and environmental approvals. Specific rules depend on location and seating capacity.'
    }
  ],
  'contract-manufacturing': [
    {
      question: 'How do you select suitable contract manufacturers?',
      answer: 'We evaluate co-packers based on their category certifications, processing machinery, allergen controls, minimum order quantities (MOQ), and facility hygiene records.'
    },
    {
      question: 'Do you draft the quality agreements?',
      answer: 'We guide the drafting of Quality Service Level Agreements (SLAs) to set clear expectations on moisture levels, microbiological limits, and batch release protocols.'
    }
  ]
};

export function getServiceFAQs(serviceId: string): FAQItem[] {
  return serviceFAQs[serviceId] || [];
}
