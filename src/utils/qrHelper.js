import QRCode from 'qrcode';

/**
 * Builds the canonical scan URL for a business feedback flow
 * Supports passing either a business object or a slug string
 */
export function buildFeedbackUrl(businessOrSlug, customBase = '') {
  if (!businessOrSlug) return '';
  
  let slug = '';
  let business = null;
  if (typeof businessOrSlug === 'object') {
    business = businessOrSlug;
    slug = business.slug || '';
  } else {
    slug = String(businessOrSlug);
  }
  
  if (!slug) return '';
  
  // If a custom base is provided (e.g. production domain or LAN IP)
  let base = customBase.trim();
  if (!base) {
    if (typeof window !== 'undefined' && window.location) {
      base = window.location.origin + window.location.pathname;
    } else {
      base = 'https://revpulse.app/';
    }
  }

  // Remove trailing index.html or extra slashes
  base = base.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  
  // If business metadata is available, append query parameters for 100% reliable cross-device QR scanning
  if (business) {
    const params = new URLSearchParams();
    if (business.name) params.set('n', business.name);
    if (business.category) params.set('c', business.category);
    if (business.logo) params.set('l', business.logo);
    if (business.type) params.set('t', business.type);
    if (business.tagline) params.set('tg', business.tagline);
    if (business.publicReviewUrl) params.set('r', business.publicReviewUrl);
    if (business.brandColors?.primary) params.set('col', business.brandColors.primary);
    
    const qs = params.toString();
    return `${base}/#/b/${slug}${qs ? `?${qs}` : ''}`;
  }

  return `${base}/#/b/${slug}`;
}

/**
 * Generates a high-quality QR Code as a Data URL (PNG)
 */
export async function generateQrDataUrl(url, options = {}) {
  if (!url) return '';
  try {
    const defaultOptions = {
      width: options.width || 600,
      margin: options.margin !== undefined ? options.margin : 2,
      color: {
        dark: options.darkColor || '#0284c7',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'H'
    };
    return await QRCode.toDataURL(url, defaultOptions);
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Fallback attempt with standard black/white
    try {
      return await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'M'
      });
    } catch (fallbackErr) {
      console.error('Fallback QR generation failed:', fallbackErr);
      return '';
    }
  }
}

/**
 * Generates QR Code as an SVG String
 */
export async function generateQrSvg(url, options = {}) {
  if (!url) return '';
  try {
    const defaultOptions = {
      width: options.width || 600,
      margin: options.margin !== undefined ? options.margin : 2,
      color: {
        dark: options.darkColor || '#0284c7',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'H'
    };
    return await QRCode.toString(url, { ...defaultOptions, type: 'svg' });
  } catch (err) {
    console.error('Error generating QR SVG:', err);
    return '';
  }
}

