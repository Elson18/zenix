// Zenix Food Worx Frontend Analytics Event System
// This file coordinates tracking hooks for user interactions.
// For production, connect these hooks to Google Tag Manager (datalayer) or Mixpanel.

export interface AnalyticsEventData {
  serviceName?: string;
  serviceId?: string;
  businessType?: string;
  businessStage?: string;
  requirement?: string;
  priority?: string;
  recommendationsCount?: number;
  stageName?: string;
  faqQuestion?: string;
  comparisonServices?: string[];
  ctaType?: string; // e.g. whatsapp, email, form
  page?: string;
}

export const trackEvent = (eventName: string, data?: AnalyticsEventData) => {
  // Safe console logger representing a production analytics event stream
  console.groupCollapsed(`[Zenix Analytics] Event: ${eventName}`);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Path:', window.location.pathname);
  if (data) {
    console.log('Event Metadata:', data);
  }
  console.groupEnd();

  // If GTM / Google Analytics is installed, push to dataLayer:
  // if (typeof window !== 'undefined' && (window as any).dataLayer) {
  //   (window as any).dataLayer.push({ event: eventName, ...data });
  // }
};
