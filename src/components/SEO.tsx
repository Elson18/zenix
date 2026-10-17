import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../utils/seoSchemas';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  jsonLd?: object | (object | null)[];
}

const DEFAULT_TITLE = 'Zenix Food Worx | Food Safety, FSSAI & Food Business Consultancy';
const DEFAULT_DESCRIPTION = 'Zenix Food Worx provides food testing, FSSAI licensing, regulatory compliance, product development, HACCP & ISO support, hospitality consulting and food factory setup services.';
const DEFAULT_KEYWORDS = 'Food Business Setup Consultant, Bakery Kitchen Setup Consultant, Cloud Kitchen Consultant, Cloud Kitchen Setup, Food Beverage Consultants, Food Project Consultant, Food Business Startup Consultant, Food and Beverages Consultant, Food Processing Consultant, Mayonnaise Processing Plant, Rice Plant Processing Consultant, Rice Plant set up consultant, Rice Mill Plant Setup, Mayonnaise Plant Setup, Food Product Development Consultant, Food Product Development Services, Sauces Product Development, Energy Bar Plant Set Up, Fruit Juices Development Consultant, Breakfast Cereals Plant Consultancy Service, Tomato Processing Line, Nutraceutical Products Development Services, Nutraceuticals Product Development Consultant, Food Consultant Services, Tomato Puree Processing Plant, Nutritional Bars Development, Contract Manufacturing Services, FSSAI Registration Online, Nut Energy Bar Plant, Spice Plant Setups, Tomato Processing and Ketchup Plant, Tomato Ketchup Plant Machinery, Fruit Juice Processing Plant, Spice Plant Consultant, Muesli Plant Setup, Instant Mixes Plant Setup, Functional Food Product Development, Vegan Plant Consultant, Nutraceutical Plant Setup, Ready Premixes Product Development, Granola and Energy Bar Consultant, Proteins Bar Development Consultant, Energy Bar Consultant, Protein Bar Processing Plant, Ready to Eat Product Development, Ready To Cook Product Development, Seasoning Product Development, Premix Plant Setup, Beverages Product Development, Blended Spice Product Development, Muesli Processing Plant Setup, FSSAI Registration for Restaurant, Nutraceuticals Product Development, FSSAI Food License, FSSAI Registration Process, Oats Plant Consultant, Nutritional Bar Development, ISO Consultant, ISO 22000 Certification Services, FSSC 22000 Certification Services, Food Shelf Life Studies Consultant, Food Industry Consultant, Restaurant Set up Consultant, QSR Set up Consultant, FSSAI E-commerce License, FSSAI Product Testing Report Filing, FSSAI Annual Return Filing, Inhouse Food Testing Lab Setup, FoSTaC Training, food safety consultancy, FSSAI licensing, food testing, food product development, HACCP certification, ISO food safety, hospitality consulting, food factory setup, restaurant setup, contract manufacturing, shelf life testing, food packaging validation';
const DEFAULT_OG_IMAGE = `${SITE_URL}/zenixfoodwork.jpg`;

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  jsonLd
}: SEOProps) {
  const location = useLocation();

  const finalTitle = title ? `${title}` : DEFAULT_TITLE;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const finalKeywords = keywords || DEFAULT_KEYWORDS;
  const finalCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
    : `${SITE_URL}${location.pathname}`;
  const finalOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`)
    : DEFAULT_OG_IMAGE;

  useEffect(() => {
    // 1. Update Title
    document.title = finalTitle;

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 3. Canonical Link
    setLinkTag('canonical', finalCanonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Zenix Food Worx');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalOgImage);

    // 6. JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach(script => script.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd];
      schemas.forEach((schemaData, idx) => {
        if (!schemaData) return;
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo-jsonld', 'true');
        script.id = `jsonld-schema-${idx}`;
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Clean up JSON-LD on unmount if needed
      const scripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical, finalOgImage, ogType, noindex, jsonLd, location.pathname]);

  return null;
}
