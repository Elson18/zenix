import { servicesData, ServiceItem } from './servicesData';

export interface RecommendedService {
  service: ServiceItem;
  matchScore: number; // 0-100
  reason: string;
  ctaText: string;
}

export interface UserProfileAnswers {
  businessType: string; // id from businessTypes.ts
  businessStage: string; // id from businessStages.ts
  requirements: string[]; // ids from requirements.ts
  priority?: string; // id from priorities.ts (optional)
}

export function getBusinessArchetype(businessType: string, _businessStage?: string): { title: string; subtitle: string } {
  switch (businessType) {
    case 'food-manufacturers':
      return {
        title: "Scaling Food Manufacturer",
        subtitle: "Focusing on industrial facility standards, batch quality, and statutory compliance."
      };
    case 'hospitality-horeca':
      return {
        title: "Hospitality & Foodservice Brand",
        subtitle: "Focusing on kitchen hygiene, menu cost engineering, and multi-outlet compliance."
      };
    case 'food-import-export':
      return {
        title: "Global Food Importer / Exporter",
        subtitle: "Focusing on Central FSSAI licensing, customs clearance, and global trade packaging."
      };
    case 'food-startups':
      return {
        title: "Innovative Food Startup",
        subtitle: "Focusing on recipe formulation, shelf-life verification, and co-packer sourcing."
      };
    case 'retail-ecommerce':
      return {
        title: "Retail & E-commerce Food Merchant",
        subtitle: "Focusing on packaging claim validation, nutritional declarations, and platform compliance."
      };
    case 'corporates-educational-institutions':
      return {
        title: "Institutional Dining Operator",
        subtitle: "Focusing on bulk kitchen food safety, staff FoSTaC training, and sanitation rating."
      };
    default:
      return {
        title: "Emerging Food Enterprise",
        subtitle: "Tailoring regulatory licensing and operational quality management."
      };
  }
}

export function getRecommendedServices(answers: UserProfileAnswers): RecommendedService[] {
  const recommendationsMap = new Map<string, { score: number; reasons: string[] }>();

  const addRecommendation = (serviceId: string, score: number, reason: string) => {
    const existing = recommendationsMap.get(serviceId);
    if (existing) {
      // De-duplicate & boost confidence score when multiple signals align
      existing.score = Math.min(100, Math.max(existing.score, score) + (existing.score >= 85 ? 5 : 10));
      if (!existing.reasons.includes(reason)) {
        existing.reasons.push(reason);
      }
    } else {
      recommendationsMap.set(serviceId, { score, reasons: [reason] });
    }
  };

  const { businessType, businessStage, requirements, priority } = answers;

  // --- 1. DIRECT REQUIREMENT MATCHES (Highest Weight, Score 95-100) ---
  requirements.forEach((req) => {
    switch (req) {
      case 'licensing':
        addRecommendation(
          'regulatory-licensing',
          100,
          'Selected FSSAI Licensing as an immediate operational requirement.'
        );
        break;
      case 'testing':
        addRecommendation(
          'food-testing',
          100,
          'Selected Food Testing for quality parameters, contaminants, or shelf-life verification.'
        );
        break;
      case 'label':
        addRecommendation(
          'label-validation',
          100,
          'Selected Label Validation to ensure FSSAI packaging & claim compliance.'
        );
        break;
      case 'nutrition':
        addRecommendation(
          'nutritional-calculation',
          100,
          'Selected Nutritional Facts calculation for mandatory nutrition table declarations.'
        );
        break;
      case 'product-dev':
        addRecommendation(
          'product-development',
          100,
          'Selected Product Development for recipe formulation, trials, and scale-up.'
        );
        break;
      case 'haccp-iso':
        addRecommendation(
          'certification-documentation',
          100,
          'Selected HACCP / ISO consultancy for global food safety accreditation.'
        );
        break;
      case 'safety-hygiene':
        addRecommendation(
          'food-safety-inspections',
          100,
          'Selected Food Safety & Hygiene Inspections for site sanitation audits.'
        );
        break;
      case 'restaurant-setup':
        addRecommendation(
          'restaurant-setup',
          100,
          'Selected Restaurant Setup for commercial kitchen layout and equipment sourcing.'
        );
        break;
      case 'factory-setup':
        addRecommendation(
          'factory-setup',
          100,
          'Selected Factory Setup Consultancy for plant layout and utility design.'
        );
        break;
      case 'manufacturing':
        addRecommendation(
          'contract-manufacturing',
          100,
          'Selected Contract Manufacturing support for screening co-packers and SLAs.'
        );
        break;
      case 'hospitality':
        addRecommendation(
          'hospitality-consulting',
          100,
          'Selected Hospitality Consulting for menu engineering and aggregator onboarding.'
        );
        break;
      case 'nutraceutical':
        addRecommendation(
          'nutraceutical-licensing',
          100,
          'Selected Nutraceutical Compliance for health supplement approvals and claims.'
        );
        break;
      case 'training':
        addRecommendation(
          'training-programs',
          100,
          'Selected Training Programs for team FoSTaC and audit certifications.'
        );
        break;
    }
  });

  // --- 2. BUSINESS TYPE & STAGE COMBINED SIGNALS ---
  if (businessType === 'food-manufacturers') {
    addRecommendation(
      'regulatory-licensing',
      90,
      'Food Manufacturers require FSSAI Central/State licensing.'
    );
    if (businessStage === 'setting-up-factory') {
      addRecommendation(
        'factory-setup',
        95,
        'Setting up a factory layout requires compliant engineering to prevent structural issues.'
      );
    } else {
      addRecommendation(
        'factory-setup',
        85,
        'Factory layout optimization supports expanding food processing lines.'
      );
    }
    if (priority === 'certification') {
      addRecommendation(
        'certification-documentation',
        90,
        'HACCP/ISO certification qualifies manufacturing lines for retail shelves and exports.'
      );
    }
  }

  if (businessType === 'hospitality-horeca') {
    addRecommendation(
      'hospitality-consulting',
      90,
      'Hospitality operations benefit from menu engineering and kitchen workflow design.'
    );
    if (businessStage === 'setting-up-restaurant') {
      addRecommendation(
        'restaurant-setup',
        95,
        'Setting up a food retail kitchen requires custom layouts and NOC clearances.'
      );
    } else {
      addRecommendation(
        'food-safety-inspections',
        85,
        'Hygiene audits and food safety inspections ensure top cleanliness ratings.'
      );
    }
  }

  if (businessType === 'food-import-export') {
    addRecommendation(
      'regulatory-licensing',
      95,
      'Importing/exporting food requires Central FSSAI licensing and trade clearance.'
    );
    addRecommendation(
      'label-validation',
      90,
      'Imported food products must comply with Indian legal metrology and labelling norms.'
    );
  }

  if (businessType === 'food-startups') {
    addRecommendation(
      'product-development',
      90,
      'Food startups benefit from recipe formulation, shelf-life testing, and pilot trials.'
    );
    addRecommendation(
      'label-validation',
      85,
      'Validating nutrition and claims ensures new product launches are market-compliant.'
    );
  }

  if (businessType === 'retail-ecommerce') {
    addRecommendation(
      'label-validation',
      90,
      'Retail & E-commerce platforms mandate accurate FSSAI label declarations.'
    );
    addRecommendation(
      'regulatory-licensing',
      85,
      'E-commerce sellers and retail stores require valid food merchant licenses.'
    );
  }

  if (businessType === 'corporates-educational-institutions') {
    addRecommendation(
      'food-safety-inspections',
      90,
      'Corporate and campus canteens require routine food safety & hygiene audits.'
    );
    addRecommendation(
      'training-programs',
      85,
      'FoSTaC training empowers staff and food handlers in institutional dining setups.'
    );
  }

  if (priority === 'safety') {
    addRecommendation(
      'food-safety-inspections',
      90,
      'Aligned with primary focus on internal hygiene inspections and safety audits.'
    );
  }

  // --- 3. FALLBACK MECHANISM ---
  if (recommendationsMap.size === 0 || requirements.includes('not-sure')) {
    addRecommendation(
      'regulatory-licensing',
      75,
      'FSSAI Licensing is the baseline registration required for every food business.'
    );
    addRecommendation(
      'food-testing',
      70,
      'General food testing establishes initial quality and safety metrics.'
    );
  }

  // Convert map to array and sort by match score
  const results: RecommendedService[] = [];

  recommendationsMap.forEach((val, key) => {
    const service = servicesData.find((s) => s.id === key);
    if (service) {
      results.push({
        service,
        matchScore: val.score,
        reason: val.reasons.join(' Also, '),
        ctaText: `Explore ${service.title.split(' ')[0]} Services →`
      });
    }
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
