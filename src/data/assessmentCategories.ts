export interface AssessmentCategory {
  id: string;
  name: string;
  weight: 'high' | 'medium';
  description: string;
  number: string;
}

export const assessmentCategories: AssessmentCategory[] = [
  {
    id: 'licensing',
    name: 'Licensing & Regulatory',
    weight: 'high',
    description: 'FSSAI registration/license, validity checks, and query handling.',
    number: '01'
  },
  {
    id: 'testing',
    name: 'Product Testing',
    weight: 'high',
    description: 'Lab testing processes, test reports, and shelf-life or stability studies.',
    number: '02'
  },
  {
    id: 'labelling',
    name: 'Labelling & Nutrition',
    weight: 'high',
    description: 'Packaging artwork, nutrition facts table calculations, and RDA declarations.',
    number: '03'
  },
  {
    id: 'hygiene',
    name: 'Food Safety & Hygiene',
    weight: 'high',
    description: 'Hygiene SOPs, staff training standards, and internal inspections.',
    number: '04'
  },
  {
    id: 'documentation',
    name: 'Documentation',
    weight: 'medium',
    description: 'Standard operating records and food safety documentation organization.',
    number: '05'
  },
  {
    id: 'certification',
    name: 'Certification',
    weight: 'medium',
    description: 'HACCP/ISO readiness and food safety management system pre-audits.',
    number: '06'
  },
  {
    id: 'operations',
    name: 'Business Operations',
    weight: 'medium',
    description: 'SOPs, layouts, machinery planning, and operational workflows matching your business type.',
    number: '07'
  }
];
