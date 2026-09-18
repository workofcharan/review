import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Building2, 
  X, 
  Plus, 
  Sparkles, 
  Link as LinkIcon, 
  Palette, 
  Smile, 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  Hotel, 
  Scissors, 
  Car,
  Heart,
  Dumbbell,
  PawPrint
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  { 
    id: 'gym', 
    label: 'Gym & Fitness', 
    icon: '🏋️', 
    defaultType: 'Modern Fitness Club & Personal Training',
    defaultTagline: 'State-of-the-Art Equipment, Inspiring Coaches & Peak Energy',
    defaultColor: '#8b5cf6',
    step1Greeting: 'How was your workout session at',
    defaultHighlights: [
      'State-of-the-Art Gym Equipment',
      'Motivating & Expert Personal Trainers',
      'Spotless Clean Facility & Locker Rooms',
      'High-Energy Group Fitness Classes',
      'Welcoming & Supportive Atmosphere',
      'Great Music & Workout Vibe',
      'Smooth Check-in & Helpful Staff'
    ]
  },
  { 
    id: 'healthcare', 
    label: 'Healthcare & Dental', 
    icon: '🦷', 
    defaultType: 'Advanced Dental & Healthcare Clinic',
    defaultTagline: 'Gentle, State-of-the-Art Care & Reassuring Doctors',
    defaultColor: '#0284c7',
    step1Greeting: 'How was your care experience at',
    defaultHighlights: [
      'Painless & Gentle Procedure',
      'Clear Guidance & Caring Doctors',
      'Spotless & Modern Sterile Equipment',
      'Prompt Zero-Wait Time',
      'Friendly Front Desk Team',
      'Transparent & Fair Pricing'
    ]
  },
  { 
    id: 'restaurant', 
    label: 'Restaurant & Dining', 
    icon: '🍽️', 
    defaultType: 'Fine Dining & Craft Kitchen',
    defaultTagline: 'Artisanal Flavors, Fresh Local Ingredients & Warm Hospitality',
    defaultColor: '#e11d48',
    step1Greeting: 'How was your dining experience at',
    defaultHighlights: [
      'Delicious & Exquisite Flavors',
      'Attentive & Friendly Table Service',
      'Prompt Kitchen Turnaround',
      'Cozy & Stylish Dining Ambience',
      'Craft Drinks & Fresh Pairings',
      'Generous Portions & Great Presentation'
    ]
  },
  { 
    id: 'cafe', 
    label: 'Cafe & Bakery', 
    icon: '☕', 
    defaultType: 'Specialty Coffee & Artisan Roastery',
    defaultTagline: 'Single-Origin Brews, Fresh Pastries & Cozy Community Space',
    defaultColor: '#d97706',
    step1Greeting: 'How was your coffee & pastry at',
    defaultHighlights: [
      'Specialty Coffee & Artisan Brews',
      'Fresh & Flaky Artisan Pastries',
      'Fast & Super Friendly Baristas',
      'Cozy Aesthetic & Chill Ambience',
      'Reliable Wi-Fi & Work Vibe',
      'Smooth Ordering & Fast Service'
    ]
  },
  { 
    id: 'hotel', 
    label: 'Hotel & Resort', 
    icon: '🏨', 
    defaultType: 'Boutique Hotel & Luxury Suites',
    defaultTagline: 'Unmatched Comfort, Impeccable Concierge & Stunning Views',
    defaultColor: '#059669',
    step1Greeting: 'How was your stay experience at',
    defaultHighlights: [
      'Luxurious & Spotless Suites',
      'Warm & Attentive Concierge Staff',
      'Fast Check-In & Departure',
      'Delicious Gourmet Breakfast',
      'Serene & Relaxing Amenities',
      'Prime Central Location'
    ]
  },
  { 
    id: 'salon', 
    label: 'Salon & Spa', 
    icon: '💇', 
    defaultType: 'Luxury Hair Salon & Day Spa',
    defaultTagline: 'Bespoke Hair Transformations, Rejuvenating Treatments & Radiance',
    defaultColor: '#db2777',
    step1Greeting: 'How was your styling & spa experience at',
    defaultHighlights: [
      'Flawless Haircut & Expert Styling',
      'Vibrant Color & Seamless Balayage',
      'Relaxing Scalp Massage & Treatment',
      'Knowledgeable & Attentive Stylist',
      'Spotless, Chic & Luxurious Salon Vibe',
      'Zero Waiting Time & Prompt Appointment'
    ]
  },
  { 
    id: 'automotive', 
    label: 'Auto & Car Care', 
    icon: '🚗', 
    defaultType: 'Auto Care & Performance Detailing',
    defaultTagline: 'Master Technicians, Transparent Pricing & Fast Turnaround',
    defaultColor: '#ea580c',
    step1Greeting: 'How was your vehicle service at',
    defaultHighlights: [
      'Fast Diagnostic & Expert Repair',
      'Spotless Ceramic Coating & Detailing',
      'Transparent & Honest Quote',
      'Polite & Knowledgeable Service Advisor',
      'On-Time Vehicle Delivery',
      'Clean & Comfortable Customer Lounge'
    ]
  },
  { 
    id: 'retail', 
    label: 'Retail & Store', 
    icon: '🛍️', 
    defaultType: 'Boutique Fashion & Lifestyle Store',
    defaultTagline: 'Curated Collections, Premium Brands & Personalized Styling',
    defaultColor: '#7c3aed',
    step1Greeting: 'How was your shopping experience at',
    defaultHighlights: [
      'Curated & Trendy Selection',
      'Helpful & Attentive Sales Staff',
      'Seamless Checkout & Packaging',
      'Spacious & Clean Fitting Rooms',
      'Great Quality Products',
      'Hassle-Free Return & Exchange Policy'
    ]
  },
  { 
    id: 'pet', 
    label: 'Pet Care & Veterinary', 
    icon: '🐾', 
    defaultType: 'Veterinary Hospital & Pet Care',
    defaultTagline: 'Gentle, Compassionate & Comprehensive Animal Care',
    defaultColor: '#10b981',
    step1Greeting: 'How was your pet’s visit at',
    defaultHighlights: [
      'Gentle & Compassionate Care',
      'Stress-Free & Calming Handling',
      'Spotless & Odor-Free Clinic',
      'Clear Treatment & Medication Advice',
      'Prompt Appointment & Caring Vets'
    ]
  },
  { 
    id: 'general', 
    label: 'General Business & Services', 
    icon: '✨', 
    defaultType: 'Professional Service & Client Care',
    defaultTagline: 'Outstanding Quality, Dedicated Team & Seamless Experience',
    defaultColor: '#0284c7',
    step1Greeting: 'How was your experience at',
    defaultHighlights: [
      'Outstanding Service Quality',
      'Friendly & Attentive Team',
      'Clean & Inviting Space',
      'Fast & Seamless Turnaround',
      'Great Communication & Value'
    ]
  }
];

function detectCategory(logoEmoji, nameText = '', typeText = '') {
  const text = `${nameText} ${typeText}`.toLowerCase();
  
  // Gym
  if (['🏋️', '🥊', '🧘', '🏃', '🏊'].includes(logoEmoji) || /gym|fitness|crossfit|workout|trainer|training|boxing|yoga|athletics|apex/.test(text)) {
    return 'gym';
  }
  // Cafe
  if (['☕', '🥐', '🥖', '🥯', '🍩'].includes(logoEmoji) || /cafe|coffee|bakery|roastery|espresso|brew|matcha|tea/.test(text)) {
    return 'cafe';
  }
  // Restaurant
  if (['🍽️', '🍕', '🍔', '🍷', '🌮', '🍦', '🍜', '🍣', '🥩'].includes(logoEmoji) || /restaurant|bistro|kitchen|grill|pizza|burger|dining|food|eatery|taco|steak|sushi|pasta/.test(text)) {
    return 'restaurant';
  }
  // Salon
  if (['💇', '💆', '💅', '🌸', '💈', '💄'].includes(logoEmoji) || /salon|spa|hair|beauty|barber|nails|massage|skin|glow|aesthetic/.test(text)) {
    return 'salon';
  }
  // Hotel
  if (['🏨', '🏖️', '🌴', '🛏️'].includes(logoEmoji) || /hotel|resort|suites|inn|stay|lodge|motel|villa|grand/.test(text)) {
    return 'hotel';
  }
  // Auto
  if (['🚗', '🔧', '🏎️', '🛠️'].includes(logoEmoji) || /auto|car|motors|garage|tire|mechanic|detailing|lube|wash/.test(text)) {
    return 'automotive';
  }
  // Retail
  if (['🛍️', '👟', '💎', '👗', '👔', '👠'].includes(logoEmoji) || /boutique|store|shop|retail|fashion|apparel|jewel|shoes|market/.test(text)) {
    return 'retail';
  }
  // Pet
  if (['🐾', '🐕', '🐈'].includes(logoEmoji) || /pet|vet|paws|veterinary|animal|hound|dog|cat/.test(text)) {
    return 'pet';
  }
  // Healthcare
  if (['🦷', '🩺', '🏥', '💊'].includes(logoEmoji) || /dental|dentist|clinic|doctor|dr\.|teeth|ortho|chiro|medical|health/.test(text)) {
    return 'healthcare';
  }

  return 'general';
}

export default function AddBusinessModal({ isOpen, onClose }) {
  const { addBusiness, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('');
  const [tagline, setTagline] = useState('');
  const [logo, setLogo] = useState('✨');
  const [publicReviewUrl, setPublicReviewUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#0284c7');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Freeze background scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNameChange = (val) => {
    setName(val);
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(autoSlug);
  };

  const handleSelectEmoji = (em) => {
    setLogo(em);
    const detected = detectCategory(em, name, type);
    const config = CATEGORIES.find(c => c.id === detected);
    if (config && config.defaultColor && primaryColor === '#0284c7') {
      setPrimaryColor(config.defaultColor);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `biz-${Date.now()}`;
    const detectedCategory = detectCategory(logo, name, type);
    const selectedCatConfig = CATEGORIES.find(c => c.id === detectedCategory) || CATEGORIES[CATEGORIES.length - 1];
    const greetingPrefix = selectedCatConfig.step1Greeting || 'How was your visit at';
    
    // Default to search on Google Maps for this specific business name if not entered
    const finalReviewUrl = publicReviewUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name.trim())}`;

    const newBusinessPayload = {
      name: name.trim(),
      slug: finalSlug,
      category: detectedCategory,
      type: type.trim() || selectedCatConfig.defaultType,
      tagline: tagline.trim() || selectedCatConfig.defaultTagline,
      logo,
      brandColors: {
        primary: primaryColor,
        accent: primaryColor,
        bgGradient: 'from-slate-900 via-slate-800 to-slate-950'
      },
      publicReviewUrl: finalReviewUrl,
      yelpUrl: '',
      tripAdvisorUrl: '',
      minPublicRating: 4,
      tableCount: 10,
      questionFlow: {
        start: 'overall_experience',
        questions: {
          overall_experience: {
            id: 'overall_experience',
            type: 'emoji_scale',
            title: `${greetingPrefix} ${name.trim()}?`,
            subtitle: 'Tap an emoji to rate your experience (Step 1 of 2)',
            options: [
              { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
              { value: 2, label: 'Unsatisfied', emoji: '😕', sentiment: 'negative' },
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
            title: `What made your visit to ${name.trim()} great?`,
            subtitle: 'Select your key highlights (Step 2 of 2)',
            options: selectedCatConfig.defaultHighlights || [
              'Outstanding Customer Service',
              'Quick & Efficient Service',
              'Clean & Comfortable Environment',
              'Friendly & Professional Team',
              'High Quality Experience',
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
            placeholder: 'Please describe what happened so we can follow up with you directly...',
            next: {
              default: 'completion_screen'
            }
          }
        }
      }
    };

    addBusiness(newBusinessPayload);
    setIsSubmitting(false);
    onClose();
    setName('');
    setSlug('');
    setType('');
    setTagline('');
    setLogo('✨');
    setPublicReviewUrl('');
    navigateTo('/dashboard');
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 relative my-8 animate-scale-up space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Add New Business Profile</h3>
              <p className="text-xs text-slate-500">Create a new location or clinic with automated QR feedback</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name & Subtitle in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Summit Dental Studio"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Category / Subtitle
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g., Advanced Dental & Implantology"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Logo Emoji Palette (Clean Grid - No Horizontal Scrollbar) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-slate-500" />
                <span>Select Logo Emoji:</span>
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 text-base flex items-center justify-center font-bold">
                  {logo}
                </span>
              </label>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="text-[10px] font-semibold">Custom:</span>
                <input
                  type="text"
                  maxLength={4}
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="✨"
                  className="w-9 h-7 text-center text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 font-normal"
                />
              </div>
            </div>

            <div className="p-2 rounded-2xl bg-slate-50/90 border border-slate-200/90">
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-1 sm:gap-1.5">
                {[
                  '🦷', '🩺', '🏥', '💊', '☕', '🥐', '🍽️', '🍕', '🍔', '🍷',
                  '🏋️', '🥊', '🧘', '🏃', '🏊', '🏨', '🏖️', '💆', '💇', '💅',
                  '🌸', '🚗', '🔧', '🏎️', '🛍️', '👟', '💎', '🐾', '🐕', '📚',
                  '💻', '🏢', '⭐', '✨', '🎯', '🛠️', '🌮', '🍦', '💈', '🎨'
                ].map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => handleSelectEmoji(em)}
                    className={`h-8 rounded-xl flex items-center justify-center text-base cursor-pointer transition-all duration-150 transform hover:scale-125 select-none ${
                      logo === em 
                        ? 'bg-sky-500 text-white shadow-xs ring-2 ring-sky-400/50 scale-110 z-10' 
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-100 shadow-2xs'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Tagline & Promise
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., Painless Dentistry & Sparkling Smiles"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-slate-900"
            />
          </div>

          {/* URL Slug */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Feedback Route Slug</span>
            </label>
            <div className="flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <span className="text-slate-400 font-mono">/b/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="summit-dental"
                className="bg-transparent flex-1 font-mono text-xs text-slate-900 focus:outline-none pl-1"
              />
            </div>
          </div>

          {/* Public Google Review URL */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Google Maps / Review Destination URL</span>
            </label>
            <input
              type="url"
              value={publicReviewUrl}
              onChange={(e) => setPublicReviewUrl(e.target.value)}
              placeholder="https://g.page/r/YOUR_BUSINESS_ID/review"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-slate-900"
            />
          </div>

          {/* Primary Brand Color */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>Primary Brand Accent Color</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
              />
              <div className="flex gap-2">
                {['#0284c7', '#059669', '#7c3aed', '#db2777', '#ea580c', '#d97706'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPrimaryColor(c)}
                    className="w-6 h-6 rounded-full border border-white/50 shadow-xs cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Business Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
