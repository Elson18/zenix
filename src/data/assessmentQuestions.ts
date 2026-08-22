export interface AssessmentQuestion {
  id: string;
  category: string;
  text: string;
  explanation: string;
  infoTooltip?: string;
  relatedServiceId: string; // maps to servicesData id (e.g., 'regulatory-licensing', 'food-testing', etc.)
  weight: 'high' | 'medium';
}

export const generalQuestions: AssessmentQuestion[] = [
  // 01 - LICENSING & REGULATORY
  {
    id: 'q1',
    category: 'licensing',
    text: 'Do you have the applicable FSSAI registration/license for your business?',
    explanation: 'An FSSAI registration or license is a basic legal requirement for food businesses, depending on your capacity and nature of operations.',
    infoTooltip: 'Licensing or registration requirements can vary depending on the nature and scale of the food business.',
    relatedServiceId: 'regulatory-licensing',
    weight: 'high'
  },
  {
    id: 'q2',
    category: 'licensing',
    text: 'Is your FSSAI registration/license currently valid?',
    explanation: 'Operating with an expired FSSAI license is a major compliance risk that can attract penalties, shutdowns, or retail bans.',
    relatedServiceId: 'regulatory-licensing',
    weight: 'high'
  },
  {
    id: 'q3',
    category: 'licensing',
    text: 'Do you have a process for handling regulatory queries, reversions or renewals?',
    explanation: 'Timely responses to government officers and proactive renewal tracking prevent compliance gaps and business disruption.',
    relatedServiceId: 'regulatory-licensing',
    weight: 'high'
  },
  // 02 - PRODUCT TESTING
  {
    id: 'q4',
    category: 'testing',
    text: 'Has your food product been tested through an appropriate laboratory/testing process?',
    explanation: 'Testing in accredited labs verifies microbiological counts, shelf safety, macro-nutrients, and absence of heavy metals or residues.',
    relatedServiceId: 'food-testing',
    weight: 'high'
  },
  {
    id: 'q5',
    category: 'testing',
    text: 'Do you have relevant test reports or supporting quality documentation for your products?',
    explanation: 'Having official lab test reports is necessary to list on e-commerce, access retail stores, or present during regulatory audits.',
    relatedServiceId: 'food-testing',
    weight: 'high'
  },
  {
    id: 'q6',
    category: 'testing',
    text: 'Have you considered shelf-life or stability testing where relevant to your product?',
    explanation: 'Testing validates how long your product remains safe and delicious, defining your "best before" or expiry dates scientifically.',
    relatedServiceId: 'food-testing',
    weight: 'high'
  },
  // 03 - LABELLING & NUTRITION
  {
    id: 'q7',
    category: 'labelling',
    text: 'Has your product label been reviewed for applicable food labelling requirements?',
    explanation: 'FSSAI and legal metrology rules require precise font sizes, allergen statements, logo sizing, and order of ingredients.',
    relatedServiceId: 'label-validation',
    weight: 'high'
  },
  {
    id: 'q8',
    category: 'labelling',
    text: 'Does your product have the required nutritional information for its label, where applicable?',
    explanation: 'Your packaging must state calories, proteins, carbs, added sugars, fats, sodium, and adult recommended daily allowance (%RDA).',
    relatedServiceId: 'nutritional-calculation',
    weight: 'high'
  },
  {
    id: 'q9',
    category: 'labelling',
    text: 'Has the serving size / per 100g or applicable nutritional presentation been reviewed?',
    explanation: 'Nutrient breakdowns must match specified single-serving weights and standard 100g/ml ratios for regulatory approval.',
    relatedServiceId: 'nutritional-calculation',
    weight: 'high'
  },
  // 04 - FOOD SAFETY & HYGIENE
  {
    id: 'q10',
    category: 'hygiene',
    text: 'Do you have documented food safety and hygiene procedures?',
    explanation: 'Written SOPs for cleaning, sanitizing, employee hygiene, temperature controls, and pest management guide daily routines.',
    relatedServiceId: 'food-safety-inspections',
    weight: 'high'
  },
  {
    id: 'q11',
    category: 'hygiene',
    text: 'Are staff trained on food safety and hygiene practices?',
    explanation: 'Food handlers must receive regular training on sanitizing, temperature logging, food storage rules, and personal hygiene.',
    relatedServiceId: 'food-safety-inspections',
    weight: 'high'
  },
  {
    id: 'q12',
    category: 'hygiene',
    text: 'Do you conduct internal hygiene checks or inspections?',
    explanation: 'Pre-emptive mock checks help identify hygiene problems, temperature drifts, or sanitation gaps before regulators audit your premises.',
    relatedServiceId: 'food-safety-inspections',
    weight: 'high'
  },
  // 05 - DOCUMENTATION
  {
    id: 'q13',
    category: 'documentation',
    text: 'Are your key food safety and operational documents organized and up to date?',
    explanation: 'Orderly records of licenses, staff fitness certificates, water safety tests, and supplier licenses facilitate quick compliance checks.',
    relatedServiceId: 'certification-documentation',
    weight: 'medium'
  },
  {
    id: 'q14',
    category: 'documentation',
    text: 'Do you maintain records needed to support your food safety processes?',
    explanation: 'FSSAI audits require logs showing cleaning schedules, pest service dates, refrigerator temp readings, and batch records.',
    relatedServiceId: 'certification-documentation',
    weight: 'medium'
  },
  // 06 - CERTIFICATION
  {
    id: 'q15',
    category: 'certification',
    text: 'Does your business require or currently maintain HACCP / ISO certification or a related food safety management system?',
    explanation: 'HACCP or ISO 22000 certifications are essential for enterprise clients, modern trade outlets, institutional tenders, and exports.',
    relatedServiceId: 'certification-documentation',
    weight: 'medium'
  },
  {
    id: 'q16',
    category: 'certification',
    text: 'Have you completed a recent internal audit or gap assessment?',
    explanation: 'A gap assessment measures your facility layout, process hygiene, and records against the requirements of certifications.',
    relatedServiceId: 'food-safety-inspections',
    weight: 'medium'
  }
];

export const restaurantOperationsQuestions: AssessmentQuestion[] = [
  {
    id: 'q17_rest',
    category: 'operations',
    text: 'Do you have a documented kitchen workflow and hygiene SOPs?',
    explanation: 'A clean workflow divides prep, cooking, and washing sections to completely prevent cross-contamination.',
    relatedServiceId: 'hospitality-consulting',
    weight: 'medium'
  },
  {
    id: 'q18_rest',
    category: 'operations',
    text: 'Have your kitchen equipment and layout been planned for efficient operations?',
    explanation: 'Commercial setup (burners, exhausts, cold tables) must be laid out ergonomically to handle rush hours and reduce food waste.',
    relatedServiceId: 'restaurant-setup',
    weight: 'medium'
  },
  {
    id: 'q19_rest',
    category: 'operations',
    text: 'Do you have a structured vendor/sourcing process?',
    explanation: 'All ingredients should come from FSSAI-registered suppliers, with standard receiving checks for temperature and packaging.',
    relatedServiceId: 'hospitality-consulting',
    weight: 'medium'
  }
];

export const manufacturerOperationsQuestions: AssessmentQuestion[] = [
  {
    id: 'q17_mfg',
    category: 'operations',
    text: 'Is your production layout designed around appropriate food safety and operational requirements?',
    explanation: 'Factories must follow a linear, unidirectional material flow (raw materials → processing → packaging) to eliminate contamination.',
    relatedServiceId: 'factory-setup',
    weight: 'medium'
  },
  {
    id: 'q18_mfg',
    category: 'operations',
    text: 'Have machinery, utilities and drainage requirements been planned?',
    explanation: 'Proper factory setup requires epoxy floors, sloped drainage channels, water filtration (RO), exhaust hoods, and food-grade machinery.',
    relatedServiceId: 'factory-setup',
    weight: 'medium'
  },
  {
    id: 'q19_mfg',
    category: 'operations',
    text: 'Do you have documented production and quality processes?',
    explanation: 'Industrial setups require strict Batch Manufacturing Records (BMR), raw materials spec sheets, and in-line QA check points.',
    relatedServiceId: 'factory-setup',
    weight: 'medium'
  }
];

export const startupOperationsQuestions: AssessmentQuestion[] = [
  {
    id: 'q17_startup',
    category: 'operations',
    text: 'Has your product formulation been finalized?',
    explanation: 'Standardized formulations with precise weight-based percentages are crucial to scaling production and maintaining flavor.',
    relatedServiceId: 'product-development',
    weight: 'medium'
  },
  {
    id: 'q18_startup',
    category: 'operations',
    text: 'Have taste trials / product trials been completed?',
    explanation: 'Trials test taste profiles (sensory panel reviews) and storage stability in different conditions.',
    relatedServiceId: 'product-development',
    weight: 'medium'
  },
  {
    id: 'q19_startup',
    category: 'operations',
    text: 'Have packaging and manufacturing options been evaluated?',
    explanation: 'Decide whether to purchase industrial equipment for in-house manufacturing or contract a co-packer (contract manufacturer).',
    relatedServiceId: 'contract-manufacturing',
    weight: 'medium'
  }
];

export function getQuestionsForBusinessType(businessType: string): AssessmentQuestion[] {
  // Determine active categories and operations questions based on businessType ID
  switch (businessType) {
    case 'food-manufacturer':
      return [...generalQuestions, ...manufacturerOperationsQuestions];

    case 'restaurant':
    case 'hotel-hospitality':
    case 'cloud-kitchen':
      // Skips: testing, labelling, certification
      return [
        ...generalQuestions.filter(q => q.category === 'licensing' || q.category === 'hygiene' || q.category === 'documentation'),
        ...restaurantOperationsQuestions
      ];

    case 'food-startup':
    case 'food-brand':
      // Skips: certification
      return [
        ...generalQuestions.filter(q => q.category !== 'certification'),
        ...startupOperationsQuestions
      ];

    case 'other':
    case 'planning-business':
    default:
      // Skips: operations
      return generalQuestions;
  }
}
