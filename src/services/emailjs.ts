import emailjs from '@emailjs/browser';

// Initialize EmailJS once during module load if the public key is provided
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

if (publicKey) {
  emailjs.init({
    publicKey: publicKey,
  });
} else {
  console.warn('[Zenix EmailJS] Public key is missing. EmailJS has not been initialized.');
}

export interface ContactEmailParams {
  name: string;
  email: string;
  phone: string;
  business_type: string;
  requirement: string;
  message: string;
  // Optional Readiness Assessment Scores & Gaps
  assessment_score?: string;
  category_scores?: string;
  attention_areas?: string;
  recommended_services?: string;
}

/**
 * Sends customer enquiries or consultations via EmailJS.
 * If credentials are not set in the environment variables, it simulates a successful send
 * in local development while logging the payload.
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<any> {
  const finalServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || serviceId;
  const finalTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || templateId;
  const finalPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || publicKey;

  if (!finalPublicKey || !finalServiceId || !finalTemplateId) {
    console.log('[Zenix EmailJS - Simulated Send (No credentials)]', params);
    // Simulate network delay for realistic user experience feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { status: 200, text: 'OK (Simulated Success)' };
  }

  const templateParams: Record<string, string> = {
    to_email: 'support@zenixfoodworx.com',
    recipient_email: 'support@zenixfoodworx.com',
    name: params.name,
    email: params.email,
    phone: params.phone,
    business_type: params.business_type,
    requirement: params.requirement,
    message: params.message,
  };

  if (params.assessment_score !== undefined) {
    templateParams.assessment_score = params.assessment_score;
  }
  if (params.category_scores !== undefined) {
    templateParams.category_scores = params.category_scores;
  }
  if (params.attention_areas !== undefined) {
    templateParams.attention_areas = params.attention_areas;
  }
  if (params.recommended_services !== undefined) {
    templateParams.recommended_services = params.recommended_services;
  }

  try {
    const response = await emailjs.send(finalServiceId, finalTemplateId, templateParams, finalPublicKey);
    return response;
  } catch (error) {
    console.error('[Zenix EmailJS] Submission failed:', error);
    throw error;
  }
}
