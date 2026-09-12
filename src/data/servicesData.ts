import { serviceImages } from './imageConfig';

export interface ServiceProcess {
  step: string;
  title: string;
  description: string;
}

export interface KeyArea {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  heroImage: string;
  whatWeOffer: string[];
  keyAreas: KeyArea[];
  whoNeedsThis: string[];
  process: ServiceProcess[];
  benefits: string[];
  ctaText: string;
  whatsappMessage: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "food-testing",
    number: "01",
    title: "Food Testing Services",
    slug: "food-testing",
    shortDescription: "Comprehensive testing for quality, safety, nutritional values, contaminants and shelf-life.",
    fullDescription: "Comprehensive lab testing for food products to ensure quality, safety, and compliance with regulatory standards. We help you identify nutritional values, contaminants, shelf-life, and more — so your products meet every requirement before they reach the market.",
    iconName: "FlaskConical",
    heroImage: serviceImages.foodTesting.url,
    whatWeOffer: [
      "Nutritional panel & proximate analysis testing",
      "Microbiological screening (pathogens, yeast & mold, total plate counts)",
      "Chemical, heavy metals, pesticide & contaminant analysis",
      "Accelerated & real-time shelf-life testing",
      "Quality parameter assessment & sensory evaluations",
      "Mandatory 6-month testing report compilation for FSSAI compliance"
    ],
    keyAreas: [
      {
        title: "Nutritional Testing",
        description: "Nutritional values and composition assessment."
      },
      {
        title: "Contaminant Testing",
        description: "Testing support for relevant contaminants."
      },
      {
        title: "Heavy Metals & Toxins Testing",
        description: "Testing support for relevant heavy metals, toxins and other contaminants to help assess food safety and product quality."
      },
      {
        title: "Microbiological Testing",
        description: "Relevant microbiological quality and safety testing."
      },
      {
        title: "Shelf-Life Testing",
        description: "Support for determining product shelf-life and stability."
      },
      {
        title: "Packing Materials – Migration Testing",
        description: "Migration testing support for food-contact packing materials to help assess whether substances may migrate into food and whether the packaging is suitable for its intended use."
      }
    ],
    whoNeedsThis: [
      "Packaged food manufacturers & FMCG brands",
      "Food exporters & importers",
      "Cloud kitchen operators & QSR chains",
      "Nutraceutical & supplement producers",
      "Raw ingredient suppliers"
    ],
    process: [
      {
        step: "01",
        title: "Sample Plan & Protocol",
        description: "Determine specific testing parameters based on product category and regulatory standards."
      },
      {
        step: "02",
        title: "Sample Collection & Dispatch",
        description: "Guidance on sterile sampling procedures and chain-of-custody transfer."
      },
      {
        step: "03",
        title: "Analytical Testing",
        description: "Testing executed according to standardized protocols and reference methods."
      },
      {
        step: "04",
        title: "Report Review & Action Plan",
        description: "Clear interpretation of test reports with corrective recommendations where needed."
      }
    ],
    benefits: [
      "Eliminate regulatory risk with compliant test documentation",
      "Protect brand reputation by guaranteeing consumer safety",
      "Validate product claim parameters (e.g., high protein, low fat)",
      "Clear guidance on non-conformance remediation"
    ],
    ctaText: "Need Food Testing Support?",
    whatsappMessage: "Hi Zenix Food Worx, I would like to inquire about your Food Testing Services."
  },
  {
    id: "regulatory-licensing",
    number: "02",
    title: "Regulatory & Licensing Services",
    slug: "regulatory-licensing",
    shortDescription: "FSSAI applications, renewals, queries, reversions and mandatory testing report support.",
    fullDescription: "Navigating state and central food safety regulations can be complex. Zenix Food Worx provides end-to-end guidance for FSSAI licensing, registration, scope expansion, annual returns, and handling regulatory queries efficiently.",
    iconName: "FileCheck2",
    heroImage: serviceImages.regulatoryLicensing.url,
    whatWeOffer: [
      "New FSSAI License & Registration applications (State & Central)",
      "License modification, scope expansion, and address updates",
      "FSSAI license renewal tracking & filing",
      "Expert assistance for query responses, application reversions & audit rectifications",
      "FSSAI FoSCoS portal management & mandatory 6-month lab report uploads",
      "Regulatory risk audits & compliance health check-ups"
    ],
    keyAreas: [
      {
        title: "New FSSAI Licensing",
        description: "End-to-end eligibility determination, document preparation, and submission across basic, state, and central licenses."
      },
      {
        title: "License Renewals & Modifications",
        description: "Timely processing to prevent penalties, operational downtime, or license cancellation."
      },
      {
        title: "Reversion & Query Support",
        description: "Drafting technical, compliant responses to food safety officers' queries and application reversions."
      },
      {
        title: "Mandatory Compliance Filing",
        description: "Submission of annual returns, half-yearly returns, and mandatory lab test uploads on FoSCoS."
      }
    ],
    whoNeedsThis: [
      "New food startups launching operations",
      "Established manufacturers upgrading facility capacity",
      "Importers & exporters requiring Central FSSAI licensing",
      "E-commerce food operators & food aggregators",
      "Restaurants, cloud kitchens, and catering units"
    ],
    process: [
      {
        step: "01",
        title: "Eligibility & Scope Audit",
        description: "Evaluate business capacity, kind of business (KOB), and licensing tier requirements."
      },
      {
        step: "02",
        title: "Document Compilation",
        description: "Gather layout plans, machinery lists, water test reports, and partner details."
      },
      {
        step: "03",
        title: "FoSCoS Filing",
        description: "Prepare and submit error-free applications on the official FSSAI portal."
      },
      {
        step: "04",
        title: "Inspection & Issuance",
        description: "Assist with pre-inspection readiness and track approval until license issuance."
      }
    ],
    benefits: [
      "Avoid costly application rejections and filing delays",
      "Ensure 100% compliance with current FSSAI guidelines",
      "Streamlined coordination with regulatory authorities",
      "Peace of mind to focus on business operations"
    ],
    ctaText: "Need FSSAI & Licensing Support?",
    whatsappMessage: "Hi Zenix Food Worx, I would like to know more about your Regulatory & Licensing Services."
  },
  {
    id: "label-validation",
    number: "03",
    title: "Label Validation & Guidance",
    slug: "label-validation",
    shortDescription: "Ensure food labels meet FSSAI and legal metrology requirements.",
    fullDescription: "A single labeling mistake can lead to product recalls, heavy fines, or seizure of goods. Zenix Food Worx scrutinizes packaged food labels against mandatory FSSAI Packaging & Labelling regulations and Legal Metrology rules to ensure market readiness.",
    iconName: "Tag",
    heroImage: serviceImages.labelValidation.url,
    whatWeOffer: [
      "Comprehensive review of front-of-pack and back-of-pack artworks",
      "Verification of mandatory FSSAI declarations, logos, and font sizes",
      "Legal Metrology declaration audit (net content, MRP, customer care)",
      "Ingredient list ordering, additive INS numbers, and allergen warnings",
      "Health claims, organic claims, and sensory callout validation",
      "Multi-language packaging compliance checks"
    ],
    keyAreas: [
      {
        title: "Mandatory FSSAI Declarations",
        description: "Checking FSSAI logo placement, license number, veg/non-veg emblem, and batch codings."
      },
      {
        title: "Ingredient & Allergen Compliance",
        description: "Correct nomenclature of ingredients, percentage declarations, and mandatory allergen warnings."
      },
      {
        title: "Legal Metrology Rules",
        description: "Ensuring net quantity, date of manufacture, expiry/best before, and consumer helpline details comply."
      },
      {
        title: "Claims & Callouts Review",
        description: "Validating nutrition claims (e.g., 'Zero Sugar', 'Rich in Fiber') against regulatory thresholds."
      }
    ],
    whoNeedsThis: [
      "D2C food brands preparing print runs for packaging",
      "FMCG product managers launching line extensions",
      "Importers needing compliant stickering for foreign goods",
      "Nutraceutical & health food companies",
      "Private label brand owners"
    ],
    process: [
      {
        step: "01",
        title: "Artwork Submission",
        description: "Receive label design artwork and product formulation details."
      },
      {
        step: "02",
        title: "Regulatory Audit",
        description: "Cross-check artwork against FSSAI & Legal Metrology checklists."
      },
      {
        step: "03",
        title: "Redline Markup",
        description: "Deliver detailed markup with required corrections, font sizes, and phrasing."
      },
      {
        step: "04",
        title: "Final Approval Sign-Off",
        description: "Re-verify revised artwork prior to final mass printing."
      }
    ],
    benefits: [
      "Prevent costly packaging reprints and packaging waste",
      "Eliminate legal liability from misleading or non-compliant claims",
      "Fast-track retail and e-commerce channel onboarding",
      "Build consumer trust with transparent packaging"
    ],
    ctaText: "Validate Your Product Label →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to validate our product label packaging."
  },
  {
    id: "nutritional-calculation",
    number: "04",
    title: "Nutritional Facts Table Calculation",
    slug: "nutritional-calculation",
    shortDescription: "Accurate nutrition calculations and label-ready nutritional information.",
    fullDescription: "Providing accurate nutritional panels on food packaging is mandatory. Zenix Food Worx calculates nutritional values using standard food composition databases and laboratory test data to deliver complete, label-ready Nutritional Facts tables complying with FSSAI standards.",
    iconName: "Calculator",
    heroImage: serviceImages.nutritionalFacts.url,
    whatWeOffer: [
      "Formulation-based nutritional calculations via standardized reference databases",
      "Lab-backed nutritional panel verification",
      "Energy (kcal), Protein, Carbohydrates, Total Sugars, Added Sugars, Fats, Saturated Fat, Trans Fat & Sodium calculations",
      "Per 100g / 100ml and Per Serving Size calculations",
      "Recommended Dietary Allowance (%RDA) percentage calculations",
      "Export-ready nutrition formats (FSSAI, US FDA, EU standards)"
    ],
    keyAreas: [
      {
        title: "Mandatory Nutrients Breakdown",
        description: "Comprehensive computation of energy, macro-nutrients, trans fat, added sugar, and sodium values."
      },
      {
        title: "Serving Size Standardization",
        description: "Establishing practical, industry-standard serving sizes for your consumer format."
      },
      {
        title: "% RDA Computation",
        description: "Percentage contribution to daily adult intake requirements calculated accurately."
      },
      {
        title: "Label-Ready Graphic Specs",
        description: "Ready-to-print nutritional table layouts for your graphic designer."
      }
    ],
    whoNeedsThis: [
      "Artisanal food producers & cloud kitchens",
      "Packaged snack & beverage manufacturers",
      "Bakery & confectionery brands",
      "Health food & meal kit companies"
    ],
    process: [
      {
        step: "01",
        title: "Recipe & Batch Data Submission",
        description: "Provide exact ingredient weights, yields, processing steps, and raw material spec sheets."
      },
      {
        step: "02",
        title: "Data Verification & Calculation",
        description: "Compute nutritional profile taking processing losses and yields into account."
      },
      {
        step: "03",
        title: "RDA & Format Layout",
        description: "Calculate % RDA and format the values into the prescribed FSSAI table template."
      },
      {
        step: "04",
        title: "Deliverable Package",
        description: "Receive complete print-ready nutritional specs and calculation notes."
      }
    ],
    benefits: [
      "Cost-effective alternative for standard recipes before full lab runs",
      "Guaranteed compliance with latest FSSAI nutrition labeling guidelines",
      "Clear guidance on added sugars and trans-fat declarations",
      "Rapid turnaround time for immediate packaging updates"
    ],
    ctaText: "Calculate Your Nutrition Panel →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to get Nutritional Facts Table Calculations for my products."
  },
  {
    id: "product-development",
    number: "05",
    title: "New Product Development",
    slug: "product-development",
    shortDescription: "From recipe formulation and taste trials to nutritional evaluation and shelf-life testing.",
    fullDescription: "Turn innovative food concepts into commercially viable, market-ready products. Zenix Food Worx assists food brands through recipe standardization, bench-top formulation, sensory testing, ingredient sourcing, cost optimization, and scale-up trial supervision.",
    iconName: "Lightbulb",
    heroImage: serviceImages.productDevelopment.url,
    whatWeOffer: [
      "Recipe formulation & culinary standardization",
      "Bench-top trials & sensory organoleptic evaluations",
      "Commercial ingredient sourcing & clean-label reformulations",
      "Cost of Goods Sold (COGS) optimization & recipe yield management",
      "Nutritional balancing & functional food development",
      "Factory pilot scale-up assistance & production SOP creation"
    ],
    keyAreas: [
      {
        title: "Concept to Formulation",
        description: "Translating brand ideas into exact weight-based recipes suited for industrial processing."
      },
      {
        title: "Sensory & Taste Profiling",
        description: "Rigorous organoleptic evaluations covering flavor, texture, aroma, appearance, and mouthfeel."
      },
      {
        title: "Shelf-Life Stabilization",
        description: "Selecting natural antimicrobials, antioxidants, or thermal processing parameters."
      },
      {
        title: "Commercialization & Scale-Up",
        description: "Adapting kitchen-scale recipes for high-capacity industrial machinery."
      }
    ],
    whoNeedsThis: [
      "Food startups creating novel food or beverage concepts",
      "Established brands expanding into health & wellness segments",
      "Restaurants commercializing signature sauces or packaged items",
      "Private label brand owners seeking custom formulations"
    ],
    process: [
      {
        step: "01",
        title: "Idea & Brief",
        description: "Define target taste profile, price point, target shelf-life, and consumer category."
      },
      {
        step: "02",
        title: "Formulation & Bench Trials",
        description: "Develop trial batches, test functional ingredients, and refine flavor notes."
      },
      {
        step: "03",
        title: "Nutrition & Shelf-Life Assessment",
        description: "Evaluate product stability, microbial safety, and nutritional content."
      },
      {
        step: "04",
        title: "Commercial Launch Prep",
        description: "Finalize packaging specs, batch manufacturing records (BMR), and production SOPs."
      }
    ],
    benefits: [
      "Reduce time-to-market with structured R&D protocols",
      "Optimize product margins through ingredient cost engineering",
      "Ensure consistent batch-to-batch taste and quality",
      "Commercialize recipes without compromising food safety"
    ],
    ctaText: "Develop Your Food Product →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to consult on New Product Development."
  },
  {
    id: "certification-documentation",
    number: "06",
    title: "Certification & Documentation",
    slug: "certification-documentation",
    shortDescription: "HACCP and ISO support including gap analysis, documentation, training and audit preparation.",
    fullDescription: "Gain a competitive edge and build institutional trust with international food safety management certifications. Zenix Food Worx provides end-to-end consulting for HACCP, ISO 22000, FSSC 22000, and GMP standards—guiding you through gap analysis, documentation creation, staff training, and pre-audit readiness.",
    iconName: "Award",
    heroImage: serviceImages.certification.url,
    whatWeOffer: [
      "HACCP (Hazard Analysis Critical Control Point) system design & implementation",
      "ISO 22000 & FSSC 22000 FSMS documentation & process mapping",
      "Good Manufacturing Practices (GMP) & Good Hygiene Practices (GHP) SOPs",
      "Facility gap analysis & risk assessment reporting",
      "Employee food safety, hygiene, and allergen management training",
      "Mock audits & external audit defense support"
    ],
    keyAreas: [
      {
        title: "HACCP Plan Development",
        description: "Hazard identification, critical control point (CCP) determination, critical limits, and monitoring procedures."
      },
      {
        title: "FSMS Documentation",
        description: "Drafting food safety manuals, standard operating procedures (SOPs), and record-keeping formats."
      },
      {
        title: "Gap Analysis Audits",
        description: "Evaluating current facility practices against certification standards prior to formal audits."
      },
      {
        title: "Audit Support & Readiness",
        description: "Guiding management and facility teams through third-party certification audits."
      }
    ],
    whoNeedsThis: [
      "Food manufacturing plants seeking export credentials",
      "Suppliers catering to modern retail or corporate accounts",
      "Caterers & flight kitchen operators",
      "Packaging material manufacturers for food applications"
    ],
    process: [
      {
        step: "01",
        title: "Baseline Gap Assessment",
        description: "Evaluate facility layout, processes, and documentation against standard guidelines."
      },
      {
        step: "02",
        title: "HACCP & SOP Development",
        description: "Draft customized hazard management plans, flow diagrams, and operational SOPs."
      },
      {
        step: "03",
        title: "Implementation & Staff Training",
        description: "Train facility staff on record logging, hygiene protocols, and CCP monitoring."
      },
      {
        step: "04",
        title: "Mock Audit & Certification",
        description: "Execute simulated audit to resolve non-conformances before final certification."
      }
    ],
    benefits: [
      "Unlock high-value corporate, export, and retail retail accounts",
      "Institutionalize robust food safety culture across your workforce",
      "Minimize risk of contamination, product loss, or audit failures",
      "Demonstrate world-class quality commitment to stakeholders"
    ],
    ctaText: "Get Certification Ready →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to inquire about HACCP & ISO Certification support."
  },
  {
    id: "hospitality-consulting",
    number: "07",
    title: "Hospitality Consulting Services",
    slug: "hospitality-consulting",
    shortDescription: "Menu costing, platform onboarding, equipment sourcing and operational improvements.",
    fullDescription: "Elevate your restaurant, hotel, or food service operation into a profitable, high-performing business. Zenix Food Worx delivers strategic hospitality consulting covering kitchen workflow optimization, menu engineering & costing, food aggregator onboarding, vendor sourcing, and service excellence.",
    iconName: "Utensils",
    heroImage: serviceImages.hospitality.url,
    whatWeOffer: [
      "Menu costing, SOP development & operational process support",
      "Menu engineering, dish recipe costing & margin optimization",
      "Swiggy & Zomato platform onboarding, menu structuring & compliance",
      "Commercial kitchen equipment sourcing & layout workflow design",
      "Food waste reduction, inventory controls & portion management SOPs",
      "Staff hygiene, kitchen safety & service standard training",
      "Hospitality operational audits & turn-around strategies"
    ],
    keyAreas: [
      {
        title: "Menu Costing & SOP Development",
        description: "Menu costing, SOP development and operational process support."
      },
      {
        title: "Menu & Pricing Support",
        description: "Support for appropriate menu pricing and profitability."
      },
      {
        title: "Platform Onboarding",
        description: "Guidance for onboarding onto platforms such as Swiggy and Zomato."
      },
      {
        title: "Kitchen Equipment & Machinery",
        description: "Support for selecting appropriate kitchen equipment and machinery."
      },
      {
        title: "Sourcing & Operations",
        description: "Guidance on sourcing and overall operational improvements."
      }
    ],
    whoNeedsThis: [
      "Restaurants, cafes, and fine dining establishments",
      "Hotel food & beverage (F&B) departments",
      "Cloud kitchens & dark kitchen networks",
      "Corporate & institutional catering providers"
    ],
    process: [
      {
        step: "01",
        title: "Operations Audit",
        description: "Analyze menu costs, kitchen layout, waste points, and service workflows."
      },
      {
        step: "02",
        title: "Strategy & Engineering",
        description: "Develop restructured menus, recipe cost cards, and layout modifications."
      },
      {
        step: "03",
        title: "Vendor & Aggregator Setup",
        description: "Coordinate equipment sourcing and digital platform listings."
      },
      {
        step: "04",
        title: "Team Execution & Review",
        description: "Train kitchen personnel and monitor key financial and operational metrics."
      }
    ],
    benefits: [
      "Lower food cost percentage and boost gross profitability",
      "Reduce kitchen bottlenecks during peak service hours",
      "Hassle-free onboarding on food delivery aggregators",
      "Elevate food safety and hygiene ratings"
    ],
    ctaText: "Optimize Your Hospitality Business →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to consult regarding Hospitality Services."
  },
  {
    id: "food-safety-inspections",
    number: "08",
    title: "Food Safety & Hygiene Inspections",
    slug: "food-safety-inspections",
    shortDescription: "Internal audits, mock inspections and gap assessments to identify risks before regulators do.",
    fullDescription: "Protect your food business from unexpected regulatory enforcement, fines, or brand damage. Zenix Food Worx conducts rigorous internal food safety audits, hygiene ratings assessments, and mock FSSAI inspections to catch vulnerabilities before official inspectors visit.",
    iconName: "ShieldCheck",
    heroImage: serviceImages.foodSafety.url,
    whatWeOffer: [
      "Comprehensive on-site food safety & hygiene audits",
      "Mock FSSAI inspection simulations with detailed scoring",
      "Personal hygiene, pest control & sanitation protocol checks",
      "Raw material storage, temperature monitoring & cross-contamination audits",
      "Corrective and Preventive Action (CAPA) reporting",
      "FSSAI Hygiene Rating certification preparation"
    ],
    keyAreas: [
      {
        title: "Mock Regulatory Inspections",
        description: "Simulating official food safety inspector visits to evaluate facility compliance readiness."
      },
      {
        title: "Hygiene & Sanitation Assessments",
        description: "Inspecting cleaning schedules, chemical usage, water safety, and pest management."
      },
      {
        title: "Temperature & Storage Checks",
        description: "Auditing cold chain storage, dry storage elevation, and FIFO/FEFO inventory rotation."
      },
      {
        title: "CAPA Remediation Plans",
        description: "Providing prioritize corrective actions for all non-conformances identified."
      }
    ],
    whoNeedsThis: [
      "Multi-outlet QSR chains & restaurant groups",
      "Central kitchens supplying multiple food points",
      "Food manufacturing & packaging facilities",
      "Institutional caterers & school/hospital cafeterias"
    ],
    process: [
      {
        step: "01",
        title: "Inspection Scope Definition",
        description: "Schedule unannounced or scheduled audit site visits."
      },
      {
        step: "02",
        title: "On-Site Physical Audit",
        description: "Inspect facility premises, employee habits, documentation logs, and storage."
      },
      {
        step: "03",
        title: "Detailed Audit Report",
        description: "Issue photographic audit report highlighting compliant areas and critical gaps."
      },
      {
        step: "04",
        title: "CAPA Verification",
        description: "Verify implementation of recommended corrective and preventive measures."
      }
    ],
    benefits: [
      "Identify operational hygiene risks before regulatory fines occur",
      "Achieve high FSSAI hygiene ratings to showcase to customers",
      "Standardize food safety practices across multiple retail branches",
      "Instill staff accountability through systematic audits"
    ],
    ctaText: "Schedule a Food Safety Audit →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to schedule a Food Safety Inspection."
  },
  {
    id: "factory-setup",
    number: "09",
    title: "Food Factory Setup Consultancy",
    slug: "factory-setup",
    shortDescription: "Layout planning, machinery selection, utilities, licensing and pre-operational compliance.",
    fullDescription: "Building or expanding a food manufacturing facility requires specialized engineering and regulatory foresight. Zenix Food Worx provides end-to-end consultancy for greenfield and brownfield food factories—ensuring layout compliance, efficient material flow, equipment selection, utility setup, and pre-operational licensing.",
    iconName: "Factory",
    heroImage: serviceImages.factorySetup.url,
    whatWeOffer: [
      "FSSAI & HACCP aligned factory layout & architectural floor planning",
      "Unidirectional material, personnel & waste movement workflow design",
      "Processing machinery, packaging line & utility equipment selection",
      "HVAC, air handling units (AHU), water treatment (RO), and drainage design guidance",
      "State & Central FSSAI licensing coordination for manufacturing units",
      "Pre-operational hygiene validation & production readiness sign-off"
    ],
    keyAreas: [
      {
        title: "HACCP Layout Planning",
        description: "Designing floor plans that eliminate cross-contamination between raw material and finished goods zones."
      },
      {
        title: "Machinery & Line Selection",
        description: "Identifying suitable food-grade processing machinery, packaging lines, and capacities."
      },
      {
        title: "Utilities & Infrastructure",
        description: "Guiding water filtration, drainage slopes, epoxy flooring, LED lighting, and ventilation specs."
      },
      {
        title: "Pre-Operational Compliance",
        description: "Executing trial runs, water testing, air testing, and obtaining regulatory licenses prior to launch."
      }
    ],
    whoNeedsThis: [
      "Entrepreneurs building new food processing factories",
      "Existing manufacturers relocating or scaling production capacity",
      "D2C brands transitioning from co-packing to in-house manufacturing",
      "Foreign food companies setting up manufacturing in India"
    ],
    process: [
      {
        step: "01",
        title: "Plan & Site Assessment",
        description: "Evaluate plot dimensions, target production capacity, and utility requirements."
      },
      {
        step: "02",
        title: "Design & Layout Drafting",
        description: "Create compliant CAD layout plans defining clean, semi-clean, and dirty zones."
      },
      {
        step: "03",
        title: "Equip & Sourcing",
        description: "Assist with equipment vendor selection, specifications, and layout integration."
      },
      {
        step: "04",
        title: "License & Inspect",
        description: "Prepare regulatory filings, audit pre-op readiness, and obtain FSSAI manufacturing license."
      }
    ],
    benefits: [
      "Prevent costly structural alterations after construction",
      "Ensure seamless regulatory approval from food safety inspectors",
      "Maximize floor space utilization and operational throughput",
      "Build a modern, hygiene-first food processing facility"
    ],
    ctaText: "Plan Your Food Factory Setup →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to consult on Food Factory Setup Services."
  },
  {
    id: "restaurant-setup",
    number: "10",
    title: "Restaurant Setup Consultancy",
    slug: "restaurant-setup",
    shortDescription: "Kitchen planning, equipment procurement, vendor coordination, staffing and compliance setup.",
    fullDescription: "Launching a successful restaurant requires balancing culinary vision with operational efficiency and legal compliance. Zenix Food Worx supports restaurant concepts from initial kitchen space planning, commercial equipment procurement, and vendor tie-ups to FSSAI licensing, staff hiring structures, and hygiene SOPs.",
    iconName: "Store",
    heroImage: serviceImages.restaurantSetup.url,
    whatWeOffer: [
      "Ergonomic commercial kitchen layout planning & workflow optimization",
      "Commercial kitchen equipment procurement & vendor negotiation",
      "FSSAI food license, trade license, and health NOC filing support",
      "Staffing structure, kitchen hierarchy, and hygiene SOP formulation",
      "Raw material vendor tie-ups & supply chain setup",
      "Pre-launch food safety audit & kitchen staff training"
    ],
    keyAreas: [
      {
        title: "Kitchen Layout & Workflow",
        description: "Designing preparation, cooking, washing, and dispatch zones to optimize kitchen speed and safety."
      },
      {
        title: "Equipment Procurement",
        description: "Sourcing cost-effective, heavy-duty commercial burners, refrigeration, exhausts, and stainless steel fabrication."
      },
      {
        title: "Complete Licensing Setup",
        description: "Handling FSSAI licenses, trade licenses, eating house NOC guidance, and fire safety compliance."
      },
      {
        title: "Operational SOPs & Hygiene",
        description: "Setting up standard food handling, cleaning schedules, and inventory tracking procedures."
      }
    ],
    whoNeedsThis: [
      "First-time restaurant founders launching new concepts",
      "Cloud kitchen brands opening brick-and-mortar outlets",
      "Franchise operators expanding brand footprint",
      "Hotel F&B owners refurbishing existing restaurant kitchens"
    ],
    process: [
      {
        step: "01",
        title: "Concept & Space Analysis",
        description: "Review menu style, space footprint, utility connections, and capacity targets."
      },
      {
        step: "02",
        title: "Layout & Equipment Procurement",
        description: "Design kitchen blueprints and facilitate equipment vendor bidding."
      },
      {
        step: "03",
        title: "Licensing & SOP Setup",
        description: "File regulatory license applications and establish food safety SOPs."
      },
      {
        step: "04",
        title: "Dry Run & Soft Launch",
        description: "Conduct trial cooking runs, workflow testing, and staff hygiene orientation."
      }
    ],
    benefits: [
      "Fast-track your opening timeline with turnkey setup guidance",
      "Optimize kitchen space for maximum order output per hour",
      "Ensure full legal and safety compliance from Day 1",
      "Eliminate unnecessary equipment overspending"
    ],
    ctaText: "Plan Your Restaurant Launch →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to consult on Restaurant Setup Services."
  },
  {
    id: "contract-manufacturing",
    number: "11",
    title: "Contract Manufacturing Support",
    slug: "contract-manufacturing",
    shortDescription: "Find suitable manufacturers, verify compliance, coordinate trials and support documentation.",
    fullDescription: "Scale your food brand rapidly without heavy capital expenditure on manufacturing assets. Zenix Food Worx helps food brands connect with reliable contract manufacturers (co-packers), perform technical and compliance audits, coordinate formulation transfers, and establish robust co-manufacturing agreements.",
    iconName: "Handshake",
    heroImage: serviceImages.contractManufacturing.url,
    whatWeOffer: [
      "Verified contract manufacturer & co-packer identification",
      "Technical, hygiene, and FSSAI compliance auditing of potential co-packers",
      "Technology & formulation transfer coordination",
      "Trial batch supervision & Quality Assurance (QA) protocol setup",
      "Co-manufacturing agreement guidance & Quality SLA drafting",
      "Ongoing commercial batch quality monitoring"
    ],
    keyAreas: [
      {
        title: "Co-Packer Matchmaking",
        description: "Identifying audit-vetted manufacturing facilities with specialized machinery for your product category."
      },
      {
        title: "Facility Compliance Audit",
        description: "Evaluating potential manufacturers for FSSAI compliance, hygiene standards, and production capacity."
      },
      {
        title: "Tech Transfer & Trials",
        description: "Guiding the transfer of recipes, BMRs, and quality specs for pilot batch validation."
      },
      {
        title: "Quality SLA & Documentation",
        description: "Structuring quality agreements, non-disclosure agreements, and batch release protocols."
      }
    ],
    whoNeedsThis: [
      "D2C food brands scaling sales across national channels",
      "Food startups launching initial market test batches",
      "Retail brands launching private-label food categories",
      "Global food companies seeking Indian manufacturing partners"
    ],
    process: [
      {
        step: "01",
        title: "Requirement Definition",
        description: "Define product specs, volume expectations, packaging type, and target cost of goods."
      },
      {
        step: "02",
        title: "Manufacturer Search & Screening",
        description: "Shortlist candidate co-packers and perform desktop and physical site audits."
      },
      {
        step: "03",
        title: "Verification & Trial Run",
        description: "Coordinate sample batch trials, lab analysis, and sensory approval."
      },
      {
        step: "04",
        title: "Documentation & Commercial Scale",
        description: "Finalize quality SLAs, batch specs, and authorize commercial production."
      }
    ],
    benefits: [
      "Scale production rapidly with zero capital expenditure in land or machines",
      "Ensure your proprietary formulations are protected and accurately reproduced",
      "Mitigate quality risks with strict co-packer audits and SLAs",
      "Access specialized food processing technology immediately"
    ],
    ctaText: "Find Contract Manufacturing Support →",
    whatsappMessage: "Hi Zenix Food Worx, I would like to inquire about Contract Manufacturing Support."
  },
  {
    id: "nutraceutical-licensing",
    number: "12",
    title: "Nutraceutical Licensing & Compliance",
    slug: "nutraceutical-licensing",
    shortDescription: "Complete regulatory support for nutraceutical and health supplement products, including label & claim compliance, classification guidance, and product/claim approval.",
    fullDescription: "Complete regulatory support for nutraceutical and health supplement products, including:",
    iconName: "Pill",
    heroImage: serviceImages.nutraceuticalLicensing.url,
    seoTitle: "Nutraceutical Licensing & Compliance | Zenix Food Worx",
    seoDescription: "Complete regulatory support for nutraceutical and health supplement products, including label and claim compliance, ingredient classification, and product or claim approval.",
    whatWeOffer: [
      "Label and Claim Compliance Check: Verifying product labels and health claims meet FSSAI's nutraceutical labelling and claim regulations",
      "Product/Ingredient Classification Guidance: Helping you correctly classify your product or ingredient under the applicable food/nutraceutical category",
      "Product/Claim Approval: End-to-end support for application, documentation, and dossier preparation for product or health claim approval"
    ],
    keyAreas: [
      {
        title: "Label and Claim Compliance Check",
        description: "Verifying product labels and health claims meet FSSAI's nutraceutical labelling and claim regulations"
      },
      {
        title: "Product/Ingredient Classification Guidance",
        description: "Helping you correctly classify your product or ingredient under the applicable food/nutraceutical category"
      },
      {
        title: "Product/Claim Approval",
        description: "End-to-end support for application, documentation, and dossier preparation for product or health claim approval"
      }
    ],
    whoNeedsThis: [
      "Nutraceutical & dietary supplement manufacturers",
      "Health supplement brand owners & importers",
      "Ayurvedic & herbal product manufacturers expanding into nutraceuticals",
      "Contract manufacturers producing health supplements",
      "E-commerce brands launching wellness & nutraceutical lines"
    ],
    process: [
      {
        step: "01",
        title: "Label and Claim Compliance Check",
        description: "Verifying product labels and health claims meet FSSAI's nutraceutical labelling and claim regulations."
      },
      {
        step: "02",
        title: "Product/Ingredient Classification Guidance",
        description: "Helping you correctly classify your product or ingredient under the applicable food/nutraceutical category."
      },
      {
        step: "03",
        title: "Product/Claim Approval",
        description: "End-to-end support for application, documentation, and dossier preparation for product or health claim approval."
      }
    ],
    benefits: [
      "Ensure 100% compliance with FSSAI nutraceutical and supplement regulations",
      "Verify product labels and health claims meet mandatory labelling norms",
      "Correctly classify products and ingredients under applicable food or supplement categories",
      "Complete end-to-end support for dossier preparation and product or claim approval"
    ],
    ctaText: "Discuss This Service",
    whatsappMessage: "Hi Zenix Food Worx, I would like to inquire about Nutraceutical Licensing & Compliance."
  },
  {
    id: "training-programs",
    number: "13",
    title: "Training Programs",
    slug: "training-programs",
    shortDescription: "Professional food safety training programs including FoSTaC, Internal Auditor, Lead Auditor and HACCP Level 1 to Level 4 training.",
    fullDescription: "We conduct professional training programs to build food safety competency within your team, covering FSSAI FoSTaC certification, Internal & Lead Auditor courses, and complete HACCP Level 1 to 4 training.",
    iconName: "GraduationCap",
    heroImage: serviceImages.trainingPrograms.url,
    seoTitle: "Food Safety Training Programs | Zenix Food Worx",
    seoDescription: "Professional food safety training programs including FoSTaC, Internal Auditor, Lead Auditor and HACCP Level 1 to Level 4 training.",
    whatWeOffer: [
      "FSSAI-mandated FoSTaC Food Safety Supervisor certification training",
      "Internal Auditor training for effective internal food safety audits",
      "Lead Auditor training for HACCP & ISO certification audit leadership",
      "HACCP Level 1 Foundational Awareness training for staff and food handlers",
      "HACCP Level 2 & Level 3 Implementation & Supervisory training",
      "HACCP Level 4 Advanced Management & Auditing training"
    ],
    keyAreas: [
      {
        title: "FoSTaC Training",
        description: "FSSAI-mandated Food Safety Supervisor certification training for your food handlers and staff"
      },
      {
        title: "Internal Auditor Training",
        description: "Equip your team with the skills to conduct effective internal food safety audits within your organization"
      },
      {
        title: "Lead Auditor Training",
        description: "Advanced, in-depth training for professionals responsible for leading HACCP & ISO certification audits"
      },
      {
        title: "HACCP Level 1 to Level 4 Training",
        description: "Complete range of HACCP certification training, from foundational awareness (Level 1) to advanced implementation and management levels (Level 2, 3 & 4), based on your team's role and expertise needed"
      }
    ],
    whoNeedsThis: [
      "Food manufacturing units & processing plants",
      "Restaurants, cloud kitchens & hotel chains",
      "Quality Assurance (QA) & Quality Control (QC) teams",
      "Food safety supervisors & hygiene managers",
      "Caterers & institutional food service providers"
    ],
    process: [
      {
        step: "01",
        title: "Training Needs Assessment",
        description: "Identify team skill gaps, regulatory mandates (FoSTaC), and required HACCP/Auditor levels."
      },
      {
        step: "02",
        title: "Custom Curriculum & Scheduling",
        description: "Structure interactive course modules tailored to your facility operations and roles."
      },
      {
        step: "03",
        title: "Interactive Workshop Delivery",
        description: "Conduct classroom or site training with practical case studies and audit simulations."
      },
      {
        step: "04",
        title: "Assessment & Certification",
        description: "Evaluate trainee competence and issue official certification & completion reports."
      }
    ],
    benefits: [
      "Meet mandatory FSSAI FoSTaC supervisor requirements for your facility",
      "Build a strong internal audit culture to maintain continuous inspection readiness",
      "Empower QA/QC personnel with internationally recognized HACCP & Lead Auditor skills",
      "Reduce food safety risks and non-conformances through trained food handlers"
    ],
    ctaText: "Discuss This Service",
    whatsappMessage: "Hi Zenix Food Worx, I would like to inquire about your Training Programs."
  }
];

