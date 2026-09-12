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
  priority: string; // id from priorities.ts
}

export function getRecommendedServices(answers: UserProfileAnswers): RecommendedService[] {
  const recommendationsMap = new Map<string, { score: number; reasons: string[] }>();

  const addRecommendation = (serviceId: string, score: number, reason: string) => {
    const existing = recommendationsMap.get(serviceId);
    if (existing) {
      existing.score = Math.max(existing.score, score);
      if (!existing.reasons.includes(reason)) {
        existing.reasons.push(reason);
      }
    } else {
      recommendationsMap.set(serviceId, { score, reasons: [reason] });
    }
  };

  const { businessType, businessStage, requirements, priority } = answers;

  // --- 1. DIRECT REQUIREMENT MATCHES (Highest Priority, Score 95-100) ---
  requirements.forEach((req) => {
    switch (req) {
      case 'licensing':
        addRecommendation(
          'regulatory-licensing',
          100,
          'You selected FSSAI Licensing as an immediate requirement for your business.'
        );
        break;
      case 'testing':
        addRecommendation(
          'food-testing',
          100,
          'Food Testing is chosen to analyze quality parameters, contaminants, or shelf-life.'
        );
        break;
      case 'label':
        addRecommendation(
          'label-validation',
          100,
          'Label Validation is required to ensure packaging compliance with FSSAI regulations.'
        );
        break;
      case 'nutrition':
        addRecommendation(
          'nutritional-calculation',
          100,
          'Nutritional Facts calculation is selected for declaring nutrients on food labels.'
        );
        break;
      case 'product-dev':
        addRecommendation(
          'product-development',
          100,
          'Product Development is requested to support recipe formulation and trials.'
        );
        break;
      case 'haccp-iso':
        addRecommendation(
          'certification-documentation',
          100,
          'HACCP / ISO consultancy is selected to establish international food safety standards.'
        );
        break;
      case 'safety-hygiene':
        addRecommendation(
          'food-safety-inspections',
          100,
          'Food Safety & Hygiene Inspections is requested to review sanitation levels.'
        );
        break;
      case 'restaurant-setup':
        addRecommendation(
          'restaurant-setup',
          100,
          'Restaurant Setup is selected to help with layout design, equipment procurement, and launches.'
        );
        break;
      case 'factory-setup':
        addRecommendation(
          'factory-setup',
          100,
          'Factory Setup Consultancy is chosen to coordinate industrial layout and machinery plans.'
        );
        break;
      case 'manufacturing':
        addRecommendation(
          'contract-manufacturing',
          100,
          'Contract Manufacturing support is selected to screen suitable co-packers.'
        );
        break;
      case 'hospitality':
        addRecommendation(
          'hospitality-consulting',
          100,
          'Hospitality Consulting is selected to engineer menus and onboard platforms.'
        );
        break;
      case 'nutraceutical':
        addRecommendation(
          'nutraceutical-licensing',
          100,
          'Nutraceutical Licensing & Compliance is selected for health supplement regulatory support.'
        );
        break;
      case 'training':
        addRecommendation(
          'training-programs',
          100,
          'Training Programs is chosen to build food safety, FoSTaC, and audit competency for your team.'
        );
        break;
    }
  });

  // --- 2. BUSINESS STAGE INFERENCES (Medium Priority, Score 80-90) ---
  if (businessStage === 'new-idea' || businessStage === 'developing-product') {
    if (businessType === 'food-startup' || businessType === 'food-brand') {
      addRecommendation(
        'product-development',
        90,
        'Your stage indicates you are working on new concepts; formulation trials are crucial.'
      );
      addRecommendation(
        'food-testing',
        80,
        'Developing new products requires shelf-life and nutrient testing.'
      );
    }
  }

  if (businessStage === 'setting-up-factory') {
    addRecommendation(
      'factory-setup',
      95,
      'You are currently planning or setting up a factory layout. Correct engineering prevents structural issues.'
    );
    addRecommendation(
      'regulatory-licensing',
      85,
      'FSSAI Manufacturing Licensing is crucial for starting factory operations.'
    );
  }

  if (businessStage === 'setting-up-restaurant') {
    addRecommendation(
      'restaurant-setup',
      95,
      'Setting up a food retail kitchen requires custom layouts and specific equipment sourcing.'
    );
    addRecommendation(
      'regulatory-licensing',
      85,
      'Retail food licenses and local NOCs are required before launching a restaurant.'
    );
  }

  if (businessStage === 'preparing-launch') {
    addRecommendation(
      'label-validation',
      85,
      'As you prepare to launch, verifying packaging labels against legal standards prevents product recalls.'
    );
    addRecommendation(
      'regulatory-licensing',
      85,
      'Ensuring valid FSSAI state or central licensing is mandatory before you launch retail sales.'
    );
  }

  if (businessStage === 'ongoing-compliance') {
    addRecommendation(
      'regulatory-licensing',
      90,
      'Your priority is ongoing compliance, which demands returns management and modification filings.'
    );
    addRecommendation(
      'food-safety-inspections',
      80,
      'Routine hygiene ratings and mock inspection audits maintain compliant operations.'
    );
  }

  // --- 3. BUSINESS TYPE & PRIORITY INFERENCES (Medium-Low, Score 75-90) ---
  if (businessType === 'food-manufacturers') {
    addRecommendation(
      'regulatory-licensing',
      90,
      'Food Manufacturers require FSSAI Central/State licensing and statutory compliance.'
    );
    addRecommendation(
      'factory-setup',
      85,
      'Factory layout optimization and machinery planning support processing operations.'
    );
    if (priority === 'certification') {
      addRecommendation(
        'certification-documentation',
        90,
        'HACCP or ISO certification helps food manufacturers qualify for retail and exports.'
      );
    }
  }

  if (businessType === 'hospitality-horeca') {
    addRecommendation(
      'hospitality-consulting',
      90,
      'Hospitality operations benefit from menu engineering, costing, and kitchen workflow design.'
    );
    addRecommendation(
      'food-safety-inspections',
      85,
      'Hygiene audits and food safety inspections ensure top cleanliness ratings.'
    );
  }

  if (businessType === 'food-import-export') {
    addRecommendation(
      'regulatory-licensing',
      95,
      'Importing and exporting food requires Central FSSAI licensing and customs trade clearance.'
    );
    addRecommendation(
      'label-validation',
      90,
      'Imported food products must comply with Indian packaging and labelling regulations.'
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
      'Retail & E-commerce platforms mandate accurate FSSAI label declarations and barcode details.'
    );
    addRecommendation(
      'regulatory-licensing',
      85,
      'E-commerce sellers and retail operations require valid food merchant licenses.'
    );
  }

  if (businessType === 'corporates-educational-institutions') {
    addRecommendation(
      'food-safety-inspections',
      90,
      'Corporate and campus canteens require routine food safety and hygiene audits.'
    );
    addRecommendation(
      'training-programs',
      85,
      'FoSTaC food safety training empowers kitchen staff and food handlers in institutional setups.'
    );
  }

  if (priority === 'safety') {
    addRecommendation(
      'food-safety-inspections',
      90,
      'A primary concern for food safety aligns with our internal hygiene inspections and audits.'
    );
  }

  // Default recommendations if no services are identified or "not sure" was chosen
  if (recommendationsMap.size === 0 || requirements.includes('not-sure')) {
    addRecommendation(
      'regulatory-licensing',
      75,
      'FSSAI Licensing is the baseline registration needed by every food business in India.'
    );
    addRecommendation(
      'food-testing',
      70,
      'General food testing helps establish initial quality and safety metrics.'
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
