export interface BusinessStage {
  id: string;
  label: string;
  description: string;
}

export const businessStages: BusinessStage[] = [
  {
    id: 'new-idea',
    label: 'I have a new idea',
    description: 'Fleshing out recipe concepts, exploring market potential and regulatory options.'
  },
  {
    id: 'developing-product',
    label: 'Developing a product',
    description: 'Working on recipes, shelf-life testing, or product packaging designs.'
  },
  {
    id: 'preparing-launch',
    label: 'Preparing to launch',
    description: 'Gathering compliance documents, finalizing print runs, and setting up vendors.'
  },
  {
    id: 'already-operating',
    label: 'Already operating',
    description: 'Managing day-to-day operations and seeking efficiency or auditing checks.'
  },
  {
    id: 'expanding-business',
    label: 'Expanding my business',
    description: 'Launching line extensions, scaling capacity, or entering national retail channels.'
  },
  {
    id: 'setting-up-factory',
    label: 'Setting up a factory',
    description: 'Drafting industrial layouts, selecting machinery, and organizing pre-op licenses.'
  },
  {
    id: 'setting-up-restaurant',
    label: 'Setting up a restaurant',
    description: 'Designing kitchens, sourcing commercial equipment, and handling fire/food NOCs.'
  },
  {
    id: 'ongoing-compliance',
    label: 'Need ongoing compliance support',
    description: 'Managing annual FSSAI returns, periodic food tests, and training certifications.'
  }
];
