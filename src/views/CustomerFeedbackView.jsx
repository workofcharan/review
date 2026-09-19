import React from 'react';
import { useApp } from '../context/AppContext';
import QuestionFlowEngine from '../components/customer/QuestionFlowEngine';
import { inferCategoryFromBusiness } from '../utils/aiReviewGenerator';

export default function CustomerFeedbackView({ forcedSlug }) {
  const { businesses, submitFeedback, currentRoute, navigateTo, activeBusiness, addBusiness } = useApp();

  let slug = forcedSlug || '';
  if (!slug) {
    if (currentRoute.includes('/b/')) {
      slug = currentRoute.substring(currentRoute.indexOf('/b/') + 3).split('?')[0].split('#')[0].replace(/\/$/, '');
    }
  }

  // Check URL query parameters or window.location if not set
  if (!slug && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    slug = params.get('b') || params.get('biz') || params.get('slug') || '';
    if (!slug && window.location.hash.includes('/b/')) {
      slug = window.location.hash.substring(window.location.hash.indexOf('/b/') + 3).split('?')[0].replace(/\/$/, '');
    }
  }

  // Extract query parameters from hash or search (supports cross-device QR scanning)
  const getUrlParams = () => {
    if (typeof window === 'undefined') return new URLSearchParams();
    const hash = window.location.hash || '';
    if (hash.includes('?')) {
      return new URLSearchParams(hash.substring(hash.indexOf('?') + 1));
    }
    if (window.location.search) {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  };

  const normalizedSlug = slug ? slug.toLowerCase().trim() : '';
  let business = normalizedSlug 
    ? businesses.find(b => b.slug.toLowerCase() === normalizedSlug || b.id === slug) 
    : null;

  // If business was not found in localStorage (e.g. scanned from a mobile phone), construct dynamically from URL parameters!
  if (!business && normalizedSlug) {
    const p = getUrlParams();
    const pName = p.get('n') || p.get('name') || '';
    const pCat = p.get('c') || p.get('cat') || p.get('category') || '';
    const pLogo = p.get('l') || p.get('logo') || '';
    const pType = p.get('t') || p.get('type') || '';
    const pTagline = p.get('tg') || p.get('tagline') || '';
    const pRevUrl = p.get('r') || p.get('revUrl') || p.get('publicReviewUrl') || '';
    const pCol = p.get('col') || p.get('color') || '#0284c7';

    const formattedName = pName || normalizedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const detectedCat = pCat || inferCategoryFromBusiness({ name: formattedName, type: pType, logo: pLogo });

    business = {
      id: `biz-${normalizedSlug}`,
      name: formattedName,
      slug: normalizedSlug,
      category: detectedCat,
      type: pType || (detectedCat === 'tech' ? 'IT Solutions, Tech Repair & Electronics' : detectedCat === 'gym' ? 'Modern Fitness & Training Club' : detectedCat === 'cafe' ? 'Specialty Coffee & Bakery' : detectedCat === 'restaurant' ? 'Fine Dining & Craft Kitchen' : detectedCat === 'salon' ? 'Luxury Hair & Beauty Salon' : detectedCat === 'hotel' ? 'Boutique Hotel & Suites' : detectedCat === 'automotive' ? 'Auto Care & Performance Detailing' : detectedCat === 'pet' ? 'Veterinary Hospital & Pet Care' : 'Professional Care & Services'),
      tagline: pTagline || 'Delivering exceptional customer experiences and 5-star care',
      logo: pLogo || (detectedCat === 'tech' ? '💻' : detectedCat === 'gym' ? '🏋️' : detectedCat === 'cafe' ? '☕' : detectedCat === 'restaurant' ? '🍽️' : detectedCat === 'salon' ? '💇' : detectedCat === 'hotel' ? '🏨' : detectedCat === 'automotive' ? '🚗' : detectedCat === 'pet' ? '🐾' : detectedCat === 'healthcare' ? '🦷' : '✨'),
      brandColors: {
        primary: pCol,
        accent: pCol,
        bgGradient: 'from-slate-900 via-slate-800 to-slate-950'
      },
      publicReviewUrl: pRevUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedName)}`,
      minPublicRating: 4,
      questionFlow: {
        start: 'overall_experience',
        questions: {
          overall_experience: {
            id: 'overall_experience',
            type: 'emoji_scale',
            title: `How was your visit at ${formattedName}?`,
            subtitle: 'Tap an emoji to rate your experience (Step 1 of 2)',
            options: [
              { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
              { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
              { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
              { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
              { value: 5, label: 'Outstanding!', emoji: '🤩', sentiment: 'positive' },
            ],
            next: {
              '5': 'positive_highlights',
              '4': 'positive_highlights',
              '3': 'private_manager_alert',
              '2': 'private_manager_alert',
              '1': 'private_manager_alert',
            }
          },
          positive_highlights: {
            id: 'positive_highlights',
            type: 'chips_multiselect',
            title: `What made your visit to ${formattedName} great?`,
            subtitle: 'Select your key highlights (Step 2 of 2)',
            options: [
              'Outstanding Customer Service',
              'Quick & Efficient Turnaround',
              'Clean & Professional Environment',
              'Friendly & Knowledgeable Team',
              'High Quality Results',
              'Great Overall Value'
            ],
            next: {
              default: 'direct_submit'
            }
          },
          private_manager_alert: {
            id: 'private_manager_alert',
            type: 'private_resolution',
            title: 'Direct Escalation to Management',
            subtitle: 'Your message is sent confidentially to our management team for prompt resolution.',
            placeholder: 'Please describe what happened so we can make this right...',
            next: {
              default: 'completion_screen'
            }
          }
        }
      }
    };
  }

  // Fallback to activeBusiness or first available
  if (!business) {
    business = activeBusiness || businesses[0];
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-6 px-4 sm:px-6">
      {/* Main Dynamic Flow Engine */}
      <main className="w-full max-w-md my-auto">
        <QuestionFlowEngine
          key={`${business.slug}-${currentRoute}`}
          business={business}
          tableNumber={`Table ${Math.floor(Math.random() * 20) + 1}`}
          onFinishFeedback={(feedbackPayload) => {
            submitFeedback(feedbackPayload);
          }}
        />
      </main>
    </div>
  );
}
