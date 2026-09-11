import QRCode from 'qrcode';

/**
 * Generates a QR Code as a Data URL (PNG image)
 */
export async function generateQrDataUrl(url, options = {}) {
  try {
    const defaultOptions = {
      width: 400,
      margin: 2,
      color: {
        dark: options.darkColor || '#0284c7',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: 'H'
    };
    return await QRCode.toDataURL(url, defaultOptions);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}

/**
 * Generates QR Code as an SVG String
 */
export async function generateQrSvg(url, options = {}) {
  try {
    const defaultOptions = {
      width: 400,
      margin: 2,
      color: {
        dark: options.darkColor || '#0284c7',
        light: options.lightColor || '#ffffff',
      },
      errorCorrectionLevel: 'H'
    };
    return await QRCode.toString(url, { ...defaultOptions, type: 'svg' });
  } catch (err) {
    console.error('Error generating QR SVG:', err);
    return null;
  }
}
