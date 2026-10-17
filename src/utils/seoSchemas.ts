import { companyData } from '../data/companyData';
import { ServiceItem } from '../data/servicesData';
import { FAQItem } from '../data/faqs';

export const SITE_URL = 'https://zenixfoodworx.com';

// Organization & Local Business JSON-LD Schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: companyData.name,
  legalName: companyData.name,
  url: SITE_URL,
  logo: `${SITE_URL}/zenixfoodwork.jpg`,
  image: `${SITE_URL}/zenixfoodwork.jpg`,
  description: companyData.heroSubtitle,
  telephone: companyData.contact.phone,
  email: companyData.contact.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyData.contact.address,
    addressLocality: 'Thoraipakkam, Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600097',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9348,
    longitude: 80.2325
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '17:30'
    }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: companyData.contact.phone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Tamil', 'Hindi']
  },
  sameAs: [],
  knowsAbout: [
    "Food Business Setup Consultant",
    "Bakery Kitchen Setup Consultant",
    "Cloud Kitchen Setup",
    "Food Processing Plant Setup",
    "Rice Mill Plant Setup",
    "Mayonnaise Processing Plant",
    "Tomato Processing Line",
    "Food Product Development Services",
    "Energy Bar Plant Set Up",
    "Nutraceuticals Product Development",
    "FSSAI Registration Online",
    "ISO 22000 Certification Services",
    "FSSC 22000 Certification Services",
    "Food Shelf Life Studies",
    "Inhouse Food Testing Lab Setup",
    "FoSTaC Training"
  ]
});

// WebSite JSON-LD Schema
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: companyData.name,
  description: companyData.tagline,
  publisher: {
    '@id': `${SITE_URL}/#organization`
  },
  inLanguage: 'en-US'
});

// BreadcrumbList JSON-LD Schema Generator
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
  }))
});

// Service JSON-LD Schema Generator
export const getServiceSchema = (service: ServiceItem) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/services/${service.slug}#service`,
  name: service.title,
  serviceType: service.title,
  description: service.fullDescription || service.shortDescription,
  provider: {
    '@type': 'LocalBusiness',
    name: companyData.name,
    url: SITE_URL,
    telephone: companyData.contact.phone
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  url: `${SITE_URL}/services/${service.slug}`,
  hasOfferCatalog: service.whatWeOffer && service.whatWeOffer.length > 0 ? {
    '@type': 'OfferCatalog',
    name: `${service.title} Offerings`,
    itemListElement: service.whatWeOffer.map((offer, idx) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offer
      },
      position: idx + 1
    }))
  } : undefined
});

// FAQPage JSON-LD Schema Generator
export const getFAQSchema = (faqs: FAQItem[]) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// ItemList JSON-LD Schema Generator (for Services overview page)
export const getServicesListSchema = (services: ServiceItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Zenix Food Worx Services',
  description: 'Comprehensive list of food safety, regulatory compliance, testing, and consulting services.',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
    description: service.shortDescription
  }))
});

// HowTo / Process JSON-LD Schema Generator
export interface ProcessStep {
  stage?: string;
  step?: string;
  title: string;
  description: string;
}

export const getHowToSchema = (steps: ProcessStep[], title: string = 'Our 5-Step Consulting Process') => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: title,
  description: 'Step-by-step process of working with Zenix Food Worx for food safety, FSSAI compliance, testing, and factory setup.',
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.description
  }))
});
