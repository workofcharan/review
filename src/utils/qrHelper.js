import QRCode from 'qrcode';

/**
 * Builds an optimized, clean scan URL for a business feedback flow
 * Keeps the payload compact for maximum QR optical decodability across all mobile cameras
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
  
  // Append compact query parameters (name, category, logo, review url, type, color) to ensure 100% reliable cross-device reconstruction without bloating QR density
  if (business) {
    const params = new URLSearchParams();
    if (business.name) params.set('n', business.name);
    if (business.category) params.set('c', business.category);
    if (business.logo) params.set('l', business.logo);
    if (business.type) params.set('t', business.type);
    if (business.publicReviewUrl) params.set('r', business.publicReviewUrl);
    if (business.brandColors?.primary) params.set('col', business.brandColors.primary);
    
    const qs = params.toString();
    return `${base}/#/b/${slug}${qs ? `?${qs}` : ''}`;
  }

  return `${base}/#/b/${slug}`;
}

/**
 * Generates a high-contrast, camera-friendly QR Code as a Data URL (PNG)
 * Uses Level M error correction and standard margin for 100% optical decodability
 */
export async function generateQrDataUrl(url, options = {}) {
  if (!url) return '';
  try {
    const defaultOptions = {
      width: options.width || 600,
      margin: options.margin !== undefined ? options.margin : 3,
      color: {
        dark: options.darkColor || '#0f172a',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    };
    return await QRCode.toDataURL(url, defaultOptions);
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Fallback attempt with standard black/white
    try {
      return await QRCode.toDataURL(url, {
        width: 400,
        margin: 3,
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
      margin: options.margin !== undefined ? options.margin : 3,
      color: {
        dark: options.darkColor || '#0f172a',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    };
    return await QRCode.toString(url, { ...defaultOptions, type: 'svg' });
  } catch (err) {
    console.error('Error generating QR SVG:', err);
    return '';
  }
}

