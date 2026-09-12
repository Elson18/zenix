export interface RequirementOption {
  id: string;
  label: string;
  description: string;
}

export interface PriorityOption {
  id: string;
  label: string;
  description: string;
}

export const requirements: RequirementOption[] = [
  { id: 'licensing', label: 'FSSAI Licensing', description: 'Basic, state, or central food license, modifications, or renewals.' },
  { id: 'testing', label: 'Food Testing', description: 'Testing for contaminants, pathogens, shelf-life, or nutrition.' },
  { id: 'label', label: 'Label Validation', description: 'FSSAI and legal metrology package compliance reviews.' },
  { id: 'nutrition', label: 'Nutritional Facts', description: 'Nutrition information calculation and FDA-approved table layout.' },
  { id: 'product-dev', label: 'Product Development', description: 'Recipe formulation, pilot scale-ups, and cost optimization.' },
  { id: 'haccp-iso', label: 'HACCP / ISO', description: 'Gap audits, FSMS manuals, and certification audit preparation.' },
  { id: 'safety-hygiene', label: 'Food Safety & Hygiene', description: 'Staff training, physical inspection audits, and hygiene scores.' },
  { id: 'restaurant-setup', label: 'Restaurant Setup', description: 'Kitchen workflows, equipment procurement, and catering setup.' },
  { id: 'factory-setup', label: 'Factory Setup', description: 'Compliant architecture layout plans and utility design.' },
  { id: 'manufacturing', label: 'Contract Manufacturing', description: 'Co-packer audit screening, Quality SLAs, and tech transfers.' },
  { id: 'hospitality', label: 'Hospitality Consulting', description: 'Menu costing, platform onboarding, and operational audits.' },
  { id: 'nutraceutical', label: 'Nutraceutical Compliance', description: 'Label and claim compliance, product classification, and product/claim approval for health supplements.' },
  { id: 'training', label: 'Training Programs', description: 'FoSTaC certification, Internal & Lead Auditor courses, and HACCP Level 1 to 4 training.' },
  { id: 'not-sure', label: 'Not Sure', description: 'Unsure which path is right; seeking general consultancy guidance.' }
];

export const priorities: PriorityOption[] = [
  { id: 'regulatory', label: 'Regulatory Compliance', description: 'Preventing legal risk, penalties, or license issues.' },
  { id: 'launch', label: 'Product Launch', description: 'Bringing a food product to retail or e-commerce quickly.' },
  { id: 'safety', label: 'Food Safety', description: 'Protecting brand reputation and ensuring consumer safety.' },
  { id: 'setup', label: 'Business Setup', description: 'Setting up kitchen, factory, or facility operations.' },
  { id: 'certification', label: 'Certification', description: 'Obtaining global HACCP/ISO credentials for exports.' },
  { id: 'cost-opt', label: 'Cost Optimization', description: 'Improving COGS, menu recipe costs, or processing waste.' },
  { id: 'growth', label: 'Business Growth', description: 'Expanding sales channels, aggregators, or outlets.' },
  { id: 'general', label: 'General Consultation', description: 'Evaluating opportunities and scaling challenges.' }
];
