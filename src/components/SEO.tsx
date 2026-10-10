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
const DEFAULT_KEYWORDS = 'food safety consultancy, FSSAI licensing, food testing, food product development, HACCP certification, ISO food safety, hospitality consulting, food factory setup, restaurant setup, contract manufacturing, food packaging validation, shelf life testing, FoSTaC training';
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
