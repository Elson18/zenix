import { AssessmentQuestion, getQuestionsForBusinessType } from './assessmentQuestions';
import { assessmentCategories, AssessmentCategory } from './assessmentCategories';

export type AnswerValue = 'YES' | 'NO' | 'NOT_SURE' | 'NA';

export interface UserAnswers {
  [questionId: string]: AnswerValue;
}

export interface CategoryScoreResult {
  categoryId: string;
  categoryName: string;
  categoryNumber: string;
  score: number | null; // null if all questions in category are NA
  status: 'GOOD' | 'REVIEW' | 'ATTENTION';
  totalQuestionsCount: number;
}

export interface ServiceRecommendation {
  serviceId: string;
  serviceTitle: string;
  serviceSlug: string;
  reason: string;
  priority: 'High Priority' | 'Recommended' | 'Consider';
  score: number;
}

export interface NextStepItem {
  id: string;
  text: string;
}

const WEIGHT_MULTIPLIERS = {
  high: 3.0,
  medium: 2.0
};

// Calculates scores for each category and the overall weighted score
export function calculateResults(
  businessType: string,
  answers: UserAnswers
): {
  overallScore: number;
  categoryScores: CategoryScoreResult[];
  interpretation: {
    title: string;
    description: string;
    status: 'Strong' | 'Good' | 'Attention' | 'Review';
    color: string; // Tailwind text/bg color helper
  };
} {
  const activeQuestions = getQuestionsForBusinessType(businessType);
  
  // Group questions by category
  const categoriesMap: { [catId: string]: AssessmentQuestion[] } = {};
  assessmentCategories.forEach(cat => {
    categoriesMap[cat.id] = [];
  });
  
  activeQuestions.forEach(q => {
    if (categoriesMap[q.category]) {
      categoriesMap[q.category].push(q);
    }
  });

  const categoryScores: CategoryScoreResult[] = [];
  let weightedScoreSum = 0;
  let totalWeightsSum = 0;

  assessmentCategories.forEach(cat => {
    const catQuestions = categoriesMap[cat.id];
    
    // Skip if category has no active questions for this business type
    if (!catQuestions || catQuestions.length === 0) {
      return;
    }

    let catPointsObtained = 0;
    let catMaxPointsPossible = 0;
    let activeQuestionsCount = 0;

    catQuestions.forEach(q => {
      const ans = answers[q.id];
      if (!ans || ans === 'NA') {
        return; // Exclude N/A from scoring
      }

      activeQuestionsCount++;
      const qWeight = WEIGHT_MULTIPLIERS[q.weight];
      catMaxPointsPossible += qWeight;

      if (ans === 'YES') {
        catPointsObtained += qWeight;
      } else if (ans === 'NOT_SURE') {
        catPointsObtained += qWeight * 0.5;
      } // NO answers obtain 0 points
    });

    const categoryScore = catMaxPointsPossible > 0 ? (catPointsObtained / catMaxPointsPossible) * 100 : null;
    
    let status: 'GOOD' | 'REVIEW' | 'ATTENTION' = 'GOOD';
    if (categoryScore !== null) {
      if (categoryScore < 50) {
        status = 'ATTENTION';
      } else if (categoryScore < 75) {
        status = 'REVIEW';
      } else {
        status = 'GOOD';
      }

      // Add to overall weighted calculation
      const catWeight = WEIGHT_MULTIPLIERS[cat.weight];
      weightedScoreSum += categoryScore * catWeight;
      totalWeightsSum += catWeight;
    }

    categoryScores.push({
      categoryId: cat.id,
      categoryName: cat.name,
      categoryNumber: cat.number,
      score: categoryScore,
      status,
      totalQuestionsCount: catQuestions.length
    });
  });

  const overallScore = totalWeightsSum > 0 ? Math.round(weightedScoreSum / totalWeightsSum) : 0;

  // Score Interpretation
  let interpretation: {
    title: string;
    description: string;
    status: 'Strong' | 'Good' | 'Attention' | 'Review';
    color: string;
  };

  if (overallScore >= 90) {
    interpretation = {
      title: 'Strong Readiness',
      description: 'Your responses indicate strong preparation across the areas assessed. Continue monitoring requirements and maintaining your processes.',
      status: 'Strong',
      color: 'text-brand-primaryDark bg-brand-primaryLight border-brand-primary/20'
    };
  } else if (overallScore >= 75) {
    interpretation = {
      title: 'Good Readiness',
      description: 'Your business appears reasonably prepared, with a few areas that may benefit from review.',
      status: 'Good',
      color: 'text-brand-primaryDark bg-brand-primaryLight border-brand-primary/20'
    };
  } else if (overallScore >= 50) {
    interpretation = {
      title: 'Needs Attention',
      description: 'Your responses indicate several areas that may need attention before you proceed or continue operations.',
      status: 'Attention',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    };
  } else {
    interpretation = {
      title: 'Significant Areas to Review',
      description: 'Your responses indicate multiple areas where professional guidance may be useful.',
      status: 'Review',
      color: 'text-brand-black bg-brand-backgroundSoft border-brand-border'
    };
  }

  return {
    overallScore,
    categoryScores,
    interpretation
  };
}

// Maps services with prioritized scores
export function getRecommendedServicesResults(
  businessType: string,
  answers: UserAnswers
): ServiceRecommendation[] {
  const activeQuestions = getQuestionsForBusinessType(businessType);
  
  // Define service basic parameters
  const servicesMeta: { [id: string]: { title: string; slug: string; baseReason: string } } = {
    'regulatory-licensing': {
      title: 'Regulatory & Licensing Services',
      slug: 'regulatory-licensing',
      baseReason: 'FSSAI licensing, modication, renewals and response filings.'
    },
    'food-testing': {
      title: 'Food Testing Services',
      slug: 'food-testing',
      baseReason: 'Proximate nutrition analysis, shelf-life and micro testing.'
    },
    'label-validation': {
      title: 'Label Validation & Guidance',
      slug: 'label-validation',
      baseReason: 'Compliance-focused review of packaging artwork, allergens and INS labels.'
    },
    'nutritional-calculation': {
      title: 'Nutritional Facts Table Calculation',
      slug: 'nutritional-calculation',
      baseReason: 'Recipe database calculation, serving sizes and print-ready RDA tables.'
    },
    'food-safety-inspections': {
      title: 'Food Safety & Hygiene Inspections',
      slug: 'food-safety-inspections',
      baseReason: 'On-site internal hygiene audits, mock inspections and hygiene rating prep.'
    },
    'certification-documentation': {
      title: 'Certification & Documentation',
      slug: 'certification-documentation',
      baseReason: 'HACCP plan design, ISO 22000 process mapping and quality SOPs.'
    },
    'hospitality-consulting': {
      title: 'Hospitality Consulting Services',
      slug: 'hospitality-consulting',
      baseReason: 'Commercial kitchen layout planning, waste reduction and Swiggy/Zomato listings.'
    },
    'restaurant-setup': {
      title: 'Restaurant Setup Consultancy',
      slug: 'restaurant-setup',
      baseReason: 'Equipment sourcing, vendor tie-ups, staffing hierarchy and fire/food NOCs.'
    },
    'factory-setup': {
      title: 'Food Factory Setup Consultancy',
      slug: 'factory-setup',
      baseReason: 'Greenfield/brownfield plant architectural layouts, zoning and HVAC specifications.'
    },
    'product-development': {
      title: 'New Product Development',
      slug: 'product-development',
      baseReason: 'Weight-based formulation, taste trials and cost engineering.'
    },
    'contract-manufacturing': {
      title: 'Contract Manufacturing Support',
      slug: 'contract-manufacturing',
      baseReason: 'Co-packer desktop audits, technology transfers and quality SLAs.'
    }
  };

  const serviceScores: { [serviceId: string]: { score: number; noCount: number; notSureCount: number; yesCount: number } } = {};
  
  // Initialize scores
  Object.keys(servicesMeta).forEach(id => {
    serviceScores[id] = { score: 0, noCount: 0, notSureCount: 0, yesCount: 0 };
  });

  // Calculate scores based on user answers
  activeQuestions.forEach(q => {
    const ans = answers[q.id];
    const sId = q.relatedServiceId;
    if (!sId || !serviceScores[sId] || !ans) return;

    const qMultiplier = q.weight === 'high' ? 2 : 1;

    if (ans === 'NO') {
      serviceScores[sId].score += 5 * qMultiplier;
      serviceScores[sId].noCount++;
    } else if (ans === 'NOT_SURE') {
      serviceScores[sId].score += 2 * qMultiplier;
      serviceScores[sId].notSureCount++;
    } else if (ans === 'YES') {
      serviceScores[sId].yesCount++;
    }
  });

  const recommendations: ServiceRecommendation[] = [];

  Object.entries(serviceScores).forEach(([sId, stats]) => {
    const meta = servicesMeta[sId];
    if (!meta) return;

    // A service is recommended if it has any gaps (NO or NOT SURE answers), 
    // or if the business type is highly relevant to it.
    let priority: 'High Priority' | 'Recommended' | 'Consider' = 'Consider';
    let reason = meta.baseReason;

    if (stats.noCount > 0) {
      priority = 'High Priority';
      if (sId === 'regulatory-licensing') {
        reason = 'Your responses indicate FSSAI licensing compliance gaps that require immediate licensing audit support.';
      } else if (sId === 'food-testing') {
        reason = 'Your product requires formal laboratory analysis to compile safety parameters and test certificates.';
      } else if (sId === 'label-validation') {
        reason = 'Your product packaging label requires review against current FSSAI and legal metrology rules.';
      } else if (sId === 'nutritional-calculation') {
        reason = 'Your nutritional panels and serving size calculations require compliant verification.';
      } else if (sId === 'food-safety-inspections') {
        reason = 'Your food safety processes indicate gaps in training, inspections, or hygiene monitoring.';
      } else if (sId === 'certification-documentation') {
        reason = 'Your operational records or food safety manuals require structured creation to prepare for certification audits.';
      } else if (sId === 'factory-setup') {
        reason = 'Your food manufacturing layout, machinery or drainage details require pre-operational layout reviews.';
      } else if (sId === 'restaurant-setup' || sId === 'hospitality-consulting') {
        reason = 'Your kitchen workflow, equipment layouts or aggregator setup require structured consulting support.';
      } else if (sId === 'product-development') {
        reason = 'Your recipe formulations or taste trials require food-tech standardization support.';
      } else if (sId === 'contract-manufacturing') {
        reason = 'Your packaging or manufacturing options require contract packer screening and SLAs.';
      }
    } else if (stats.notSureCount > 0) {
      priority = 'Recommended';
      reason = `Your responses suggest potential review areas for ${meta.title.toLowerCase()}.`;
    } else if (stats.yesCount > 0) {
      priority = 'Consider';
      reason = `You have addressed this area, but Zenix can assist with ongoing updates or modifications for ${meta.title.toLowerCase()}.`;
    } else {
      // No active questions answered in this service area
      return;
    }

    recommendations.push({
      serviceId: sId,
      serviceTitle: meta.title,
      serviceSlug: meta.slug,
      reason,
      priority,
      score: stats.score
    });
  });

  // Sort recommendations: High Priority first (by score desc), then Recommended, then Consider
  return recommendations.sort((a, b) => {
    const priorityWeights = { 'High Priority': 3, 'Recommended': 2, 'Consider': 1 };
    const aPriority = priorityWeights[a.priority];
    const bPriority = priorityWeights[b.priority];

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    return b.score - a.score;
  });
}

// Generates personalized description summary based on categories with low scores
export function generatePersonalizedSummary(
  businessType: string,
  categoryScores: CategoryScoreResult[]
): string {
  const needsAttention = categoryScores
    .filter(cat => cat.score !== null && cat.score < 75)
    .map(cat => {
      if (cat.categoryId === 'licensing') return 'FSSAI licensing validity';
      if (cat.categoryId === 'testing') return 'laboratory product testing';
      if (cat.categoryId === 'labelling') return 'packaging labels and nutritional panels';
      if (cat.categoryId === 'hygiene') return 'hygiene SOPs and audits';
      if (cat.categoryId === 'documentation') return 'food safety documentation organization';
      if (cat.categoryId === 'certification') return 'HACCP or ISO certification audits';
      if (cat.categoryId === 'operations') return 'production or kitchen layouts';
      return cat.categoryName.toLowerCase();
    });

  if (needsAttention.length === 0) {
    return 'Your responses indicate strong readiness across all assessed compliance and operational categories. Continue monitoring requirements and maintaining high hygiene standards.';
  }

  if (needsAttention.length === 1) {
    return `Based on your responses, your main area of focus appears to be ${needsAttention[0]}. Addressing this area will help stabilize compliance and operational processes.`;
  }

  if (needsAttention.length === 2) {
    return `Based on your responses, your main areas of focus appear to be ${needsAttention[0]} and ${needsAttention[1]}. Reviewing these areas will strengthen your readiness.`;
  }

  if (needsAttention.length === 3) {
    return `Based on your responses, your main areas of focus appear to be ${needsAttention[0]}, ${needsAttention[1]}, and ${needsAttention[2]}. We recommend addressing these gaps prior to launching or auditing.`;
  }

  return `Based on your responses, you have several areas that would benefit from professional guidance. Your primary focus should be on ${needsAttention[0]}, ${needsAttention[1]}, and ${needsAttention[2]}, followed by layout and process reviews.`;
}

// Compile up to 4 structured next steps
export function compileNextSteps(
  businessType: string,
  answers: UserAnswers
): NextStepItem[] {
  const steps: NextStepItem[] = [];

  // Conditional additions based on answers (Prioritizing NO, then NOT_SURE)
  const isNoOrNotSure = (qId: string) => answers[qId] === 'NO' || answers[qId] === 'NOT_SURE';

  if (isNoOrNotSure('q1') || isNoOrNotSure('q2')) {
    steps.push({ id: 'fssai', text: 'Confirm eligibility tier and renew or apply for your FSSAI license.' });
  }
  if (isNoOrNotSure('q4') || isNoOrNotSure('q5')) {
    steps.push({ id: 'testing', text: 'Define testing parameters and schedule laboratory analysis for your products.' });
  }
  if (isNoOrNotSure('q7')) {
    steps.push({ id: 'label', text: 'Review packaging label layout for mandatory warnings, allergen text, and declarations.' });
  }
  if (isNoOrNotSure('q8') || isNoOrNotSure('q9')) {
    steps.push({ id: 'nutrition', text: 'Calculate the Nutritional Facts table and format the RDA table for print.' });
  }
  if (isNoOrNotSure('q10') || isNoOrNotSure('q11') || isNoOrNotSure('q12')) {
    steps.push({ id: 'hygiene', text: 'Formalize hygiene guidelines and conduct a staff training session.' });
  }
  if (isNoOrNotSure('q13') || isNoOrNotSure('q14')) {
    steps.push({ id: 'docs', text: 'Organize cleaning, sanitation, and temperature logs in your facility files.' });
  }
  if (isNoOrNotSure('q15') || isNoOrNotSure('q16')) {
    steps.push({ id: 'cert', text: 'Conduct a gap assessment audit ahead of ISO or HACCP registration.' });
  }

  // Business Type specific checks
  if (businessType === 'restaurant' || businessType === 'hotel-hospitality' || businessType === 'cloud-kitchen') {
    if (isNoOrNotSure('q17_rest') || isNoOrNotSure('q18_rest')) {
      steps.push({ id: 'rest_layout', text: 'Optimize kitchen zones and verify gas, drainage, and equipment spacing.' });
    }
    if (isNoOrNotSure('q19_rest')) {
      steps.push({ id: 'rest_vendors', text: 'Audit FSSAI licenses and certificates of your primary raw material vendors.' });
    }
  } else if (businessType === 'food-manufacturer') {
    if (isNoOrNotSure('q17_mfg') || isNoOrNotSure('q18_mfg')) {
      steps.push({ id: 'mfg_layout', text: 'Review plant layout blueprints for compliance with unidirectional process flow.' });
    }
  } else if (businessType === 'food-startup' || businessType === 'food-brand') {
    if (isNoOrNotSure('q17_startup') || isNoOrNotSure('q18_startup')) {
      steps.push({ id: 'startup_formulation', text: 'Culinary standardize your recipe weights and conduct trial shelf assessments.' });
    }
    if (isNoOrNotSure('q19_startup')) {
      steps.push({ id: 'startup_copacker', text: 'Identify third-party co-packers and check their FSSAI manufacturing licenses.' });
    }
  }

  // Ensure we have at least a few steps
  if (steps.length === 0) {
    steps.push({ id: 'maintain', text: 'Keep maintaining your operational logs and audit your files periodically.' });
    steps.push({ id: 'renewal', text: 'Set up calendar alerts for FSSAI renewals and periodic lab tests.' });
  }

  // Limit to top 4 steps
  const finalSteps = steps.slice(0, 4);

  // Always append the final expert consultation step
  finalSteps.push({
    id: 'consult',
    text: 'Discuss your readiness assessment report with a Zenix expert to clarify requirements.'
  });

  return finalSteps;
}
