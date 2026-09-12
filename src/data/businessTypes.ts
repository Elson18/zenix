export interface BusinessType {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const businessTypes: BusinessType[] = [
  {
    id: 'food-manufacturers',
    label: 'Food Manufacturers',
    icon: 'Factory',
    description: 'Industrial food processing, manufacturing facilities, and packaging units.'
  },
  {
    id: 'hospitality-horeca',
    label: 'Hospitality / HoReCa',
    icon: 'Hotel',
    description: 'Hotels, restaurants, cafes, caterers, and food service operations.'
  },
  {
    id: 'food-import-export',
    label: 'Food Import / Food Export',
    icon: 'Globe',
    description: 'Importers, exporters, customs compliance, and international food trade.'
  },
  {
    id: 'food-startups',
    label: "Food Start up’s",
    icon: 'Rocket',
    description: 'New food product brands, D2C health foods, and innovative food launches.'
  },
  {
    id: 'retail-ecommerce',
    label: 'Retail & E-commerce',
    icon: 'ShoppingBag',
    description: 'Supermarkets, grocery chains, online D2C platforms, and retail distribution.'
  },
  {
    id: 'corporates-educational-institutions',
    label: 'Corporates / Educational institutions',
    icon: 'Building2',
    description: 'Corporate cafeterias, school & university canteens, and institutional dining.'
  }
];
