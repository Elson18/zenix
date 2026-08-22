export interface BusinessType {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const businessTypes: BusinessType[] = [
  {
    id: 'food-manufacturer',
    label: 'Food Manufacturer',
    icon: 'Factory',
    description: 'Industrial food processing, processing plants, and packaging units.'
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: 'Store',
    description: 'Fine dining, cafes, QSR chains, bakeries, and retail food outlets.'
  },
  {
    id: 'hotel-hospitality',
    label: 'Hotel / Hospitality',
    icon: 'Hotel',
    description: 'Hotels, resorts, buffet services, and institutional catering operations.'
  },
  {
    id: 'cloud-kitchen',
    label: 'Cloud Kitchen',
    icon: 'ChefHat',
    description: 'Delivery-only food preparation, virtual brands, and central kitchens.'
  },
  {
    id: 'food-startup',
    label: 'Food Startup',
    icon: 'Rocket',
    description: 'A new food product brand, D2C health foods, and innovative snacks.'
  },
  {
    id: 'food-brand',
    label: 'Food Brand',
    icon: 'Award',
    description: 'Established packaged FMCG brands scaling retail presence and channels.'
  },
  {
    id: 'planning-business',
    label: 'Planning a New Food Business',
    icon: 'Compass',
    description: 'Currently preparing blueprints, formulations, licensing, or site layouts.'
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'HelpCircle',
    description: 'Import/export, cold storage, packaging manufacturers, and ingredient suppliers.'
  }
];
