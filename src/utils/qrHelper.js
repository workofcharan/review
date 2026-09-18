import QRCode from 'qrcode';

/**
 * Builds the canonical scan URL for a business feedback flow
 */
export function buildFeedbackUrl(slug, customBase = '') {
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

