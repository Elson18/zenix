export interface ServiceRelationship {
  serviceId: string;
  relatedServiceIds: string[];
}

export const serviceRelationships: Record<string, string[]> = {
  'food-testing': [
    'nutritional-calculation',
    'label-validation',
    'product-development'
  ],
  'regulatory-licensing': [
    'food-safety-inspections',
    'certification-documentation',
    'label-validation'
  ],
  'label-validation': [
    'nutritional-calculation',
    'food-testing',
    'regulatory-licensing'
  ],
  'nutritional-calculation': [
    'label-validation',
    'food-testing',
    'regulatory-licensing'
  ],
  'product-development': [
    'food-testing',
    'nutritional-calculation',
    'label-validation'
  ],
  'certification-documentation': [
    'food-safety-inspections',
    'factory-setup',
    'regulatory-licensing'
  ],
  'hospitality-consulting': [
    'restaurant-setup',
    'food-safety-inspections',
    'regulatory-licensing'
  ],
  'food-safety-inspections': [
    'regulatory-licensing',
    'certification-documentation',
    'hospitality-consulting'
  ],
  'factory-setup': [
    'certification-documentation',
    'contract-manufacturing',
    'food-testing'
  ],
  'restaurant-setup': [
    'regulatory-licensing',
    'food-safety-inspections',
    'hospitality-consulting'
  ],
  'contract-manufacturing': [
    'factory-setup',
    'food-testing',
    'certification-documentation'
  ],
  'nutraceutical-licensing': [
    'regulatory-licensing',
    'label-validation',
    'food-testing'
  ],
  'training-programs': [
    'certification-documentation',
    'food-safety-inspections',
    'regulatory-licensing'
  ]
};
export function getRelatedServices(serviceId: string): string[] {
  return serviceRelationships[serviceId] || [];
}
