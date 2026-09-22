export interface SituationOption {
  id: string;
  title: string;
  description: string;
}

export interface ServicePriority {
  serviceId: string;
  baseScore: number;
  reason: string;
}

export interface BusinessPoolConfig {
  allowedServiceIds: string[];
  situations: SituationOption[];
  priorityMap: Record<string, ServicePriority[]>;
}

export const businessTypePools: Record<string, BusinessPoolConfig> = {
  'food-manufacturers': {
    allowedServiceIds: [
      'regulatory-licensing',
      'food-testing',
      'label-validation',
      'nutritional-calculation',
      'certification-documentation',
      'factory-setup',
      'product-development'
    ],
    situations: [
      {
        id: 'fm-1',
        title: 'I have a new idea',
        description: 'Exploring recipe concepts, exploring market potential and regulatory options.'
      },
      {
        id: 'fm-2',
        title: 'Developing a product',
        description: 'Working on formulations, shelf-life testing, or packaging designs.'
      },
      {
        id: 'fm-3',
        title: 'Preparing to launch',
        description: 'Gathering compliance documents, finalizing packaging, and setting up vendors.'
      },
      {
        id: 'fm-4',
        title: 'Already operating',
        description: 'Managing day-to-day production and seeking efficiency or auditing checks.'
      },
      {
        id: 'fm-5',
        title: 'Expanding my business',
        description: 'Scaling capacity, adding new lines, or entering national/export channels.'
      },
      {
        id: 'fm-6',
        title: 'Setting up a factory',
        description: 'Drafting industrial layouts, selecting machinery, and organizing pre-op licenses.'
      },
      {
        id: 'fm-7',
        title: 'Need ongoing compliance support',
        description: 'Managing annual FSSAI returns, periodic tests, and training certifications.'
      }
    ],
    priorityMap: {
      'fm-1': [
        { serviceId: 'product-development', baseScore: 95, reason: 'Recommended for recipe concept exploration and initial formulation trials.' },
        { serviceId: 'regulatory-licensing', baseScore: 90, reason: 'Essential for assessing FSSAI licensing and regulatory options early.' },
        { serviceId: 'food-testing', baseScore: 85, reason: 'Supports preliminary quality parameter testing.' }
      ],
      'fm-2': [
        { serviceId: 'product-development', baseScore: 98, reason: 'Provides recipe formulation and bench-top trial support.' },
        { serviceId: 'food-testing', baseScore: 95, reason: 'Essential for shelf-life testing and microbial stability.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Ensures preliminary packaging designs meet regulatory standards.' },
        { serviceId: 'nutritional-calculation', baseScore: 88, reason: 'Calculates nutritional facts for formulation testing.' }
      ],
      'fm-3': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Required for obtaining FSSAI manufacturing licenses before launch.' },
        { serviceId: 'label-validation', baseScore: 95, reason: 'Finalizes label compliance before mass packaging printing.' },
        { serviceId: 'nutritional-calculation', baseScore: 92, reason: 'Provides mandatory nutrition table declarations.' },
        { serviceId: 'food-testing', baseScore: 88, reason: 'Compiles mandatory baseline food safety lab test reports.' }
      ],
      'fm-4': [
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Ensures active production complies with FSSAI license requirements.' },
        { serviceId: 'food-testing', baseScore: 92, reason: 'Manages periodic testing required for manufacturing operations.' },
        { serviceId: 'certification-documentation', baseScore: 88, reason: 'Drives operational efficiency through HACCP/ISO systems.' }
      ],
      'fm-5': [
        { serviceId: 'factory-setup', baseScore: 95, reason: 'Supports expansion of manufacturing capacity and layout optimization.' },
        { serviceId: 'certification-documentation', baseScore: 92, reason: 'Unlocks national retail and export channels with HACCP/ISO credentials.' },
        { serviceId: 'food-testing', baseScore: 88, reason: 'Validates quality across expanded product lines.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Handles scope expansion for additional manufacturing lines.' }
      ],
      'fm-6': [
        { serviceId: 'factory-setup', baseScore: 98, reason: 'Guides industrial layout planning, machinery selection, and utility design.' },
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Organizes pre-operational FSSAI manufacturing licenses and approvals.' },
        { serviceId: 'certification-documentation', baseScore: 90, reason: 'Establishes HACCP/ISO facility standards from construction phase.' },
        { serviceId: 'food-testing', baseScore: 85, reason: 'Provides water and environmental pre-operational clearance testing.' }
      ],
      'fm-7': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Manages annual FSSAI returns, license renewals, and portal uploads.' },
        { serviceId: 'food-testing', baseScore: 92, reason: 'Schedules mandatory 6-month periodic lab testing reports.' },
        { serviceId: 'certification-documentation', baseScore: 88, reason: 'Maintains ongoing audit readiness and HACCP/ISO compliance.' }
      ]
    }
  },
  'hospitality-horeca': {
    allowedServiceIds: [
      'regulatory-licensing',
      'food-safety-inspections',
      'hospitality-consulting',
      'restaurant-setup',
      'training-programs'
    ],
    situations: [
      {
        id: 'h-1',
        title: 'New concept',
        description: 'Planning a new restaurant, café, QSR, or hotel food concept and menu.'
      },
      {
        id: 'h-2',
        title: 'Setting up',
        description: 'Designing kitchen layout, sourcing equipment, and obtaining FSSAI/trade licenses.'
      },
      {
        id: 'h-3',
        title: 'Already operating',
        description: 'Managing daily operations, hygiene audits, and staff training needs.'
      },
      {
        id: 'h-4',
        title: 'Expanding outlets',
        description: 'Opening new branches, entering franchise models, or adding delivery channels.'
      },
      {
        id: 'h-5',
        title: 'Franchise & multi-outlet growth',
        description: 'Franchise structuring, SOP standardization, and compliance across outlets.'
      },
      {
        id: 'h-6',
        title: 'Need ongoing compliance support',
        description: 'Annual FSSAI renewals, hygiene checks, and staff certification.'
      }
    ],
    priorityMap: {
      'h-1': [
        { serviceId: 'hospitality-consulting', baseScore: 95, reason: 'Assists in concept planning, menu engineering, and dish costing.' },
        { serviceId: 'restaurant-setup', baseScore: 92, reason: 'Helps plan initial kitchen workflow and space footprints.' },
        { serviceId: 'regulatory-licensing', baseScore: 88, reason: 'Outlines mandatory food service licenses for new concepts.' }
      ],
      'h-2': [
        { serviceId: 'restaurant-setup', baseScore: 98, reason: 'Designs commercial kitchen layouts and equipment procurement.' },
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Secures FSSAI food license, trade license, and health clearances.' },
        { serviceId: 'hospitality-consulting', baseScore: 90, reason: 'Optimizes operational workflow and aggregator onboarding.' },
        { serviceId: 'food-safety-inspections', baseScore: 85, reason: 'Ensures pre-launch kitchen hygiene readiness.' }
      ],
      'h-3': [
        { serviceId: 'food-safety-inspections', baseScore: 98, reason: 'Executes regular site hygiene audits and risk assessments.' },
        { serviceId: 'training-programs', baseScore: 95, reason: 'Delivers mandatory FoSTaC staff food safety training.' },
        { serviceId: 'hospitality-consulting', baseScore: 90, reason: 'Optimizes daily kitchen operations, waste reduction, and menu margins.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Manages ongoing FSSAI license compliance.' }
      ],
      'h-4': [
        { serviceId: 'hospitality-consulting', baseScore: 95, reason: 'Supports aggregator onboarding, multi-outlet models, and delivery channels.' },
        { serviceId: 'restaurant-setup', baseScore: 92, reason: 'Fast-tracks kitchen layout design for new branch openings.' },
        { serviceId: 'training-programs', baseScore: 88, reason: 'Standardizes staff training across expanding locations.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Files FSSAI license applications for new outlets.' }
      ],
      'h-5': [
        { serviceId: 'hospitality-consulting', baseScore: 98, reason: 'Delivers SOP standardization and operational frameworks across outlets.' },
        { serviceId: 'training-programs', baseScore: 95, reason: 'Certifies staff across franchise locations for consistent quality.' },
        { serviceId: 'food-safety-inspections', baseScore: 90, reason: 'Audits franchise branches to protect brand hygiene ratings.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Ensures all franchise outlets maintain active licensing.' }
      ],
      'h-6': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Handles annual FSSAI renewals and license filings.' },
        { serviceId: 'food-safety-inspections', baseScore: 95, reason: 'Executes periodic hygiene checks and audit simulations.' },
        { serviceId: 'training-programs', baseScore: 92, reason: 'Maintains ongoing staff FoSTaC certifications.' }
      ]
    }
  },
  'food-import-export': {
    allowedServiceIds: [
      'regulatory-licensing',
      'label-validation',
      'food-testing',
      'certification-documentation',
      'nutritional-calculation'
    ],
    situations: [
      {
        id: 'ie-1',
        title: 'Exploring trade',
        description: 'Evaluating feasibility of importing or exporting a food product.'
      },
      {
        id: 'ie-2',
        title: 'Preparing documentation',
        description: 'Compiling FSSAI import clearance, health certificates, and export paperwork.'
      },
      {
        id: 'ie-3',
        title: 'Already trading',
        description: 'Currently importing/exporting and need ongoing regulatory support.'
      },
      {
        id: 'ie-4',
        title: 'Scaling trade volume',
        description: 'Expanding to new countries, buyers, or product categories.'
      },
      {
        id: 'ie-5',
        title: 'Need ongoing compliance support',
        description: 'Renewals, periodic testing, and audit support for continued trade.'
      }
    ],
    priorityMap: {
      'ie-1': [
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Determines Central FSSAI import/export license feasibility.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Evaluates stickering and packaging rules for imported/exported goods.' },
        { serviceId: 'food-testing', baseScore: 85, reason: 'Assesses lab testing parameters required for trade clearance.' }
      ],
      'ie-2': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Compiles Central FSSAI import clearance and regulatory documentation.' },
        { serviceId: 'label-validation', baseScore: 95, reason: 'Validates imported product labels and legal metrology declarations.' },
        { serviceId: 'food-testing', baseScore: 90, reason: 'Coordinates customs sample lab testing and health certificate reports.' },
        { serviceId: 'nutritional-calculation', baseScore: 88, reason: 'Converts international nutrition declarations into compliant FSSAI tables.' }
      ],
      'ie-3': [
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Provides ongoing regulatory support for customs and import clearance.' },
        { serviceId: 'food-testing', baseScore: 90, reason: 'Manages mandatory consignment testing and safety parameters.' },
        { serviceId: 'certification-documentation', baseScore: 88, reason: 'Supports HACCP/ISO compliance required by international buyers.' },
        { serviceId: 'label-validation', baseScore: 85, reason: 'Validates label updates for incoming food consignments.' }
      ],
      'ie-4': [
        { serviceId: 'certification-documentation', baseScore: 95, reason: 'Provides HACCP/ISO accreditation required to access global trade buyers.' },
        { serviceId: 'label-validation', baseScore: 92, reason: 'Ensures packaging compliance for new export destination countries.' },
        { serviceId: 'food-testing', baseScore: 90, reason: 'Conducts comprehensive contaminant and heavy metal testing.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Expands Central FSSAI license scope for additional trade categories.' }
      ],
      'ie-5': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Manages Central FSSAI renewals and port clearance documentation.' },
        { serviceId: 'food-testing', baseScore: 92, reason: 'Schedules periodic consignment quality and safety testing.' },
        { serviceId: 'certification-documentation', baseScore: 88, reason: 'Delivers ongoing audit support for continued international trade.' },
        { serviceId: 'label-validation', baseScore: 85, reason: 'Audits labeling and claim declarations for imported goods.' }
      ]
    }
  },
  'food-startups': {
    allowedServiceIds: [
      'regulatory-licensing',
      'product-development',
      'label-validation',
      'nutritional-calculation',
      'food-testing',
      'contract-manufacturing'
    ],
    situations: [
      {
        id: 'fs-1',
        title: 'I have a new idea',
        description: 'Exploring a food product concept, market potential, and regulatory options.'
      },
      {
        id: 'fs-2',
        title: 'Developing a product',
        description: 'Formulating recipes, running shelf-life trials, and finalizing packaging.'
      },
      {
        id: 'fs-3',
        title: 'Preparing to launch',
        description: 'Licensing, label compliance, and vendor/distribution setup before launch.'
      },
      {
        id: 'fs-4',
        title: 'Already operating',
        description: 'Selling in the market and need ongoing compliance or quality support.'
      },
      {
        id: 'fs-5',
        title: 'Expanding my business',
        description: 'Expanding to new markets, retail shelves, or e-commerce platforms.'
      }
    ],
    priorityMap: {
      'fs-1': [
        { serviceId: 'product-development', baseScore: 95, reason: 'Translates food product ideas into commercial recipe formulations.' },
        { serviceId: 'regulatory-licensing', baseScore: 90, reason: 'Identifies FSSAI licensing tiers and regulatory paths for startups.' },
        { serviceId: 'label-validation', baseScore: 85, reason: 'Guides initial brand callouts and compliant packaging concepts.' }
      ],
      'fs-2': [
        { serviceId: 'product-development', baseScore: 98, reason: 'Provides recipe formulation, bench-top trials, and cost engineering.' },
        { serviceId: 'food-testing', baseScore: 95, reason: 'Runs shelf-life trials and microbial safety verification.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Finalizes packaging callouts, allergen declarations, and claims.' },
        { serviceId: 'nutritional-calculation', baseScore: 88, reason: 'Calculates exact nutritional panels for product packaging.' }
      ],
      'fs-3': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Secures startup FSSAI licenses for commercial sales.' },
        { serviceId: 'label-validation', baseScore: 95, reason: 'Validates label artworks before mass commercial printing.' },
        { serviceId: 'nutritional-calculation', baseScore: 92, reason: 'Delivers print-ready nutrition facts tables for retail packaging.' },
        { serviceId: 'contract-manufacturing', baseScore: 88, reason: 'Connects startups with vetted co-packers for production scale-up.' },
        { serviceId: 'food-testing', baseScore: 85, reason: 'Compiles pre-launch food safety test reports.' }
      ],
      'fs-4': [
        { serviceId: 'regulatory-licensing', baseScore: 92, reason: 'Maintains active FSSAI license compliance and mandatory filings.' },
        { serviceId: 'food-testing', baseScore: 90, reason: 'Provides batch quality monitoring and shelf-life verification.' },
        { serviceId: 'contract-manufacturing', baseScore: 88, reason: 'Assists in scaling batch volumes through co-packers.' },
        { serviceId: 'label-validation', baseScore: 85, reason: 'Validates packaging updates for retail & e-commerce channels.' }
      ],
      'fs-5': [
        { serviceId: 'contract-manufacturing', baseScore: 95, reason: 'Identifies high-capacity co-packers to scale distribution.' },
        { serviceId: 'product-development', baseScore: 92, reason: 'Develops new product flavors and line extensions for growth.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Validates labels for national retail chains and e-commerce platforms.' },
        { serviceId: 'food-testing', baseScore: 88, reason: 'Ensures consistent quality parameters across expanded retail volumes.' }
      ]
    }
  },
  'retail-ecommerce': {
    allowedServiceIds: [
      'regulatory-licensing',
      'label-validation',
      'nutritional-calculation',
      'food-testing',
      'product-development'
    ],
    situations: [
      {
        id: 're-1',
        title: 'New product line',
        description: 'Planning a packaged food product for retail shelves or online sale.'
      },
      {
        id: 're-2',
        title: 'Preparing to launch',
        description: 'Label compliance, nutritional facts, and licensing for marketplace listing.'
      },
      {
        id: 're-3',
        title: 'Already operating',
        description: 'Actively selling on retail/e-commerce and need ongoing compliance support.'
      },
      {
        id: 're-4',
        title: 'Expanding my business',
        description: 'Expanding to new platforms, states, or retail chains.'
      },
      {
        id: 're-5',
        title: 'Need ongoing compliance support',
        description: 'Renewals, periodic testing, and label/claim audit support.'
      }
    ],
    priorityMap: {
      're-1': [
        { serviceId: 'product-development', baseScore: 95, reason: 'Refines recipe formulations for commercial retail packaging.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Plans label compliance and claims for retail shelf appeal.' },
        { serviceId: 'nutritional-calculation', baseScore: 88, reason: 'Computes nutritional panels for prospective product lines.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Determines vendor licensing requirements for retail and e-commerce.' }
      ],
      're-2': [
        { serviceId: 'label-validation', baseScore: 98, reason: 'Ensures 100% label compliance for Amazon, Flipkart, and retail listing.' },
        { serviceId: 'nutritional-calculation', baseScore: 95, reason: 'Delivers mandatory nutritional facts tables for marketplace listing.' },
        { serviceId: 'regulatory-licensing', baseScore: 92, reason: 'Secures FSSAI merchant/e-commerce food licenses.' },
        { serviceId: 'food-testing', baseScore: 88, reason: 'Compiles lab test reports required by e-commerce marketplaces.' }
      ],
      're-3': [
        { serviceId: 'regulatory-licensing', baseScore: 95, reason: 'Provides ongoing compliance support for active retail seller licenses.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Audits existing labels to prevent marketplace listing suspensions.' },
        { serviceId: 'food-testing', baseScore: 88, reason: 'Executes periodic batch testing required by retail distributors.' }
      ],
      're-4': [
        { serviceId: 'label-validation', baseScore: 95, reason: 'Audits packaging claims for entry into major supermarket chains.' },
        { serviceId: 'product-development', baseScore: 90, reason: 'Develops new SKUs and variant formulations for retail expansion.' },
        { serviceId: 'regulatory-licensing', baseScore: 88, reason: 'Handles interstate licensing and marketplace vendor registration.' },
        { serviceId: 'food-testing', baseScore: 85, reason: 'Validates extended shelf-life for multi-state distribution.' }
      ],
      're-5': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Manages timely FSSAI license renewals and portal filings.' },
        { serviceId: 'food-testing', baseScore: 92, reason: 'Schedules periodic quality and safety testing for retail SKUs.' },
        { serviceId: 'label-validation', baseScore: 90, reason: 'Provides ongoing label and claim audit support.' },
        { serviceId: 'nutritional-calculation', baseScore: 85, reason: 'Updates nutrition panels for recipe revisions.' }
      ]
    }
  },
  'corporates-educational-institutions': {
    allowedServiceIds: [
      'regulatory-licensing',
      'food-safety-inspections',
      'hospitality-consulting',
      'training-programs'
    ],
    situations: [
      {
        id: 'cei-1',
        title: 'Planning food services',
        description: 'Setting up a new canteen, cafeteria, or institutional food facility.'
      },
      {
        id: 'cei-2',
        title: 'Setting up operations',
        description: 'Kitchen setup, vendor onboarding, and food safety licensing.'
      },
      {
        id: 'cei-3',
        title: 'Already operating',
        description: 'Running daily food services and need hygiene/safety audits.'
      },
      {
        id: 'cei-4',
        title: 'Expanding my business',
        description: 'Adding new campuses, locations, or additional food outlets.'
      },
      {
        id: 'cei-5',
        title: 'Need ongoing compliance support',
        description: 'FSSAI renewals, periodic testing, and staff training certifications.'
      }
    ],
    priorityMap: {
      'cei-1': [
        { serviceId: 'hospitality-consulting', baseScore: 95, reason: 'Assists in planning institutional cafeteria layouts, menus, and vendor standards.' },
        { serviceId: 'regulatory-licensing', baseScore: 90, reason: 'Identifies mandatory FSSAI food service licensing for canteens.' },
        { serviceId: 'food-safety-inspections', baseScore: 85, reason: 'Establishes baseline hygiene guidelines for facility planning.' }
      ],
      'cei-2': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Secures mandatory FSSAI licenses for corporate & campus canteens.' },
        { serviceId: 'hospitality-consulting', baseScore: 95, reason: 'Guides kitchen setup, equipment selection, and vendor onboarding.' },
        { serviceId: 'food-safety-inspections', baseScore: 90, reason: 'Conducts pre-operational food safety & sanitation inspections.' },
        { serviceId: 'training-programs', baseScore: 85, reason: 'Enrolls canteen staff in mandatory FoSTaC food safety supervisor training.' }
      ],
      'cei-3': [
        { serviceId: 'food-safety-inspections', baseScore: 98, reason: 'Executes routine food safety and cafeteria hygiene audits.' },
        { serviceId: 'training-programs', baseScore: 95, reason: 'Delivers ongoing staff hygiene training and FoSTaC certification.' },
        { serviceId: 'hospitality-consulting', baseScore: 90, reason: 'Optimizes dining hall throughput and food waste controls.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Maintains valid canteen licenses and compliance filings.' }
      ],
      'cei-4': [
        { serviceId: 'hospitality-consulting', baseScore: 95, reason: 'Assists in scaling cafeteria operations across new campuses.' },
        { serviceId: 'food-safety-inspections', baseScore: 90, reason: 'Standardizes hygiene audit checklists for multi-location dining.' },
        { serviceId: 'training-programs', baseScore: 88, reason: 'Trains new food handling staff for expanded campus sites.' },
        { serviceId: 'regulatory-licensing', baseScore: 85, reason: 'Files FSSAI license applications for new campus locations.' }
      ],
      'cei-5': [
        { serviceId: 'regulatory-licensing', baseScore: 98, reason: 'Handles annual FSSAI renewals for institutional food premises.' },
        { serviceId: 'food-safety-inspections', baseScore: 95, reason: 'Conducts periodic hygiene checks and sanitation rating audits.' },
        { serviceId: 'training-programs', baseScore: 92, reason: 'Ensures ongoing staff FoSTaC certifications and training renewals.' }
      ]
    }
  }
};
