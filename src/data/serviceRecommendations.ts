import { servicesData, ServiceItem } from './servicesData';
import { businessTypePools } from './situations';

export interface RecommendedService {
  service: ServiceItem;
  matchScore: number; // 0-100
  reason: string;
  ctaText: string;
}

export interface UserProfileAnswers {
  businessType: string;
  selectedNeeds?: string[];
  businessStage?: string;
  requirements?: string[];
  priority?: string;
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
  const { businessType } = answers;
  if (!businessType) return [];

  // Combine selectedNeeds and legacy requirements if provided
  const needs = answers.selectedNeeds && answers.selectedNeeds.length > 0
    ? answers.selectedNeeds
    : answers.requirements || [];

  if (needs.length === 0) return [];

  const poolConfig = businessTypePools[businessType];
  if (!poolConfig) return [];

  const allowedIds = new Set(poolConfig.allowedServiceIds);
  const recommendationsMap = new Map<string, { score: number; reasons: string[] }>();

  needs.forEach((situationId) => {
    const priorities = poolConfig.priorityMap[situationId];
    if (priorities) {
      priorities.forEach(({ serviceId, baseScore, reason }) => {
        // STRICT RULE: Never recommend services outside the business-type pool!
        if (!allowedIds.has(serviceId)) return;

        const existing = recommendationsMap.get(serviceId);
        if (existing) {
          existing.score = Math.min(99, Math.max(existing.score, baseScore) + 4);
          if (!existing.reasons.includes(reason)) {
            existing.reasons.push(reason);
          }
        } else {
          recommendationsMap.set(serviceId, { score: baseScore, reasons: [reason] });
        }
      });
    }
  });

  const results: RecommendedService[] = [];
  recommendationsMap.forEach((val, key) => {
    const service = servicesData.find((s) => s.id === key);
    if (service && allowedIds.has(service.id)) {
      results.push({
        service,
        matchScore: val.score,
        reason: val.reasons.join(' '),
        ctaText: `Explore ${service.title.split(' ')[0]} Services →`
      });
    }
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
