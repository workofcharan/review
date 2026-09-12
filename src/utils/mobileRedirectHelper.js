/**
 * Cross-platform clipboard and redirection helper for iOS (Safari/WebKit) and Android (Chrome/Samsung/WebViews)
 */

export async function copyTextToClipboard(text) {
  if (!text) return false;

  // Modern Navigator Clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed, using fallback:', err);
    }
  }

  // iOS Safari / Android WebView execCommand fallback
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0.01';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Mobile range support

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('All clipboard methods failed:', err);
    return false;
  }
}

/**
 * Universal Mobile Redirect for iOS and Android devices
 * Handles standard browsers, in-app QR scanners (WhatsApp, Instagram, Camera), and iframes
 */
export function redirectToReviewPage(url = 'https://g.page/r/CVfAf-zR7rBLEBE/review') {
  if (!url) return;

  try {
    // Check if running inside an iframe (like the dual-screen demo simulator)
    if (window.top && window.top !== window.self) {
      try {
        window.top.location.href = url;
        return;
      } catch (crossOriginErr) {
        console.warn('Cross-origin frame navigation blocked, opening new window/tab:', crossOriginErr);
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
    }

    // Direct mobile top-level navigation (opens Google Maps / Google Review modal on Android and iOS)
    window.location.href = url;
  } catch (err) {
    console.error('Direct navigation failed, attempting anchor trigger:', err);
    // Fallback: create and click an invisible link
    const link = document.createElement('a');
    link.href = url;
    link.rel = 'noopener noreferrer';
    link.target = '_top';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
