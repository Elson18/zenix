export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  keySolutions: string[];
  image: string;
}

export const industriesData: IndustryItem[] = [
  {
    id: "food-manufacturers",
    title: "Food Manufacturers",
    subtitle: "Scale Production with Regulatory Confidence",
    iconName: "Factory",
    description: "From greenfield factory layout planning to commercial production scaling, we help food processors stay compliant with FSSAI, HACCP, and ISO standards while optimizing output.",
    keySolutions: [
      "FSSAI State & Central License Filing",
      "HACCP & ISO 22000 System Implementation",
      "Mandatory 6-Month Lab Testing & Validation",
      "Factory Layout Planning & Clean-Zone Setup",
      "Packaging & Legal Metrology Label Reviews"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "restaurants",
    title: "Restaurants & Dining",
    subtitle: "Hygiene Standard & Operational Excellence",
    iconName: "UtensilsCrossed",
    description: "Streamline restaurant operations with menu cost engineering, staff hygiene audits, trade licensing, FSSAI compliance, and commercial kitchen workflow design.",
    keySolutions: [
      "Restaurant FSSAI & Hygiene Compliance",
      "Kitchen Layout & Ergonomic Equipment Planning",
      "Menu Costing & Profit Margin Optimization",
      "Internal Food Safety & Hygiene Audits",
      "Staff Food Handling & Sanitation SOPs"
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hotels-hospitality",
    title: "Hotels & Hospitality",
    subtitle: "Premium Standards for Large-Scale Dining",
    iconName: "Hotel",
    description: "Multi-outlet hotel kitchens require elevated hygiene management and seamless operational control. We conduct food safety inspections and staff training across hotel properties.",
    keySolutions: [
      "FSMS & HACCP Audits for Hotel Kitchens",
      "Banquet & Bulk Catering Safety SOPs",
      "Vendor Audit & Raw Material Verification",
      "Regulatory Query & Inspection Defense",
      "Staff Hygiene & Sanitation Orientations"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cloud-kitchens",
    title: "Cloud Kitchens & QSRs",
    subtitle: "Fast-Paced Delivery & Aggregator Onboarding",
    iconName: "Store",
    description: "Cloud kitchens operate on high volume and speed. We assist dark kitchens with rapid licensing, Swiggy/Zomato onboarding compliance, waste reduction, and kitchen safety.",
    keySolutions: [
      "Rapid FSSAI Registration for Delivery Outlets",
      "Swiggy & Zomato Regulatory Onboarding Support",
      "Menu Standardization & Portion Control SOPs",
      "Food Packaging & Delivery Shelf-Life Checks",
      "Internal Hygiene Audits for Multi-Brand Spaces"
    ],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "food-startups",
    title: "Food Startups & D2C",
    subtitle: "Turn Culinary Ideas into Market Ready Products",
    iconName: "Rocket",
    description: "For new food founders launching innovative snacks, beverages, or D2C foods, we provide turnkey guidance across recipe trials, packaging claims, nutrition tables, and co-packing.",
    keySolutions: [
      "New Product Recipe Formulation & Trials",
      "Nutritional Facts Panel Calculation & Claims",
      "FSSAI Labeling & Packaging Verification",
      "Accelerated Shelf-Life Testing Protocols",
      "Contract Manufacturing Matchmaking"
    ],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "growing-brands",
    title: "Growing Food Brands",
    subtitle: "Scale Multi-Market Reach Without Compliance Gaps",
    iconName: "TrendingUp",
    description: "Expanding into retail chains, e-commerce platforms, or exports requires structured compliance. We help scaling brands verify co-packers, update licenses, and maintain uniform quality.",
    keySolutions: [
      "Contract Manufacturing (Co-Packer) Audits",
      "Central FSSAI Licensing & Multi-Location Scope",
      "Export Packaging & International Compliance",
      "Third-Party Quality SLA Drafting",
      "Line Extension R&D & Reformulations"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  }
];
