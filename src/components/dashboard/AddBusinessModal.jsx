import React, { useState } from 'react';
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
      'Dr. & Team Clear Guidance',
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
    defaultType: 'Fine Dining & Hospitality',
    defaultTagline: 'Exquisite Culinary Flavors & Exceptional Table Service',
    defaultColor: '#e11d48',
    step1Greeting: 'How was your dining experience at',
    defaultHighlights: [
      'Delicious & Flavorful Dishes',
      'Warm & Attentive Table Service',
      'Beautiful Ambiance & Cozy Vibe',
      'Fast & Fresh Kitchen Delivery',
      'Handcrafted Cocktails & Drinks',
      'Great Value & Portion Sizes'
    ]
  },
  { 
    id: 'cafe', 
    label: 'Café & Bakery', 
    icon: '☕', 
    defaultType: 'Artisanal Coffee & Bakery',
    defaultTagline: 'Single-Origin Brews, Fresh Pastries & Cozy Workspaces',
    defaultColor: '#d97706',
    step1Greeting: 'How was your visit at',
    defaultHighlights: [
      'Signature Specialty Coffee & Latte Art',
      'Fresh Flaky Artisanal Pastries',
      'Warm & Welcoming Barista Team',
      'Relaxing Music & Aesthetic Ambiance',
      'Fast Wi-Fi & Laptop-Friendly Seating',
      'Quick Service & Prompt Order Delivery'
    ]
  },
  { 
    id: 'hotel', 
    label: 'Hotel & Resort', 
    icon: '🏨', 
    defaultType: 'Boutique Hotel & Luxury Suites',
    defaultTagline: 'Exceptional Comfort, World-Class Concierge & Unforgettable Stays',
    defaultColor: '#0d9488',
    step1Greeting: 'How was your stay experience at',
    defaultHighlights: [
      'Immaculate Room & Luxury Bedding',
      'Exceptional Concierge & Front Desk',
      'Stunning Views & Relaxing Pool Deck',
      'Delicious Breakfast & Room Service',
      'Fast & Smooth Check-in Experience',
      'Pristine Spa & Fitness Amenities'
    ]
  },
  { 
    id: 'salon', 
    label: 'Salon & Spa', 
    icon: '💇', 
    defaultType: 'Hair, Beauty & Wellness Spa',
    defaultTagline: 'Couture Styling, Rejuvenating Facials & Radiant Looks',
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
    label: 'Pet Care & Vet', 
    icon: '🐾', 
    defaultType: 'Veterinary Clinic & Pet Wellness Center',
    defaultTagline: 'Gentle Veterinary Medicine & Loving Care for Your Pets',
    defaultColor: '#10b981',
    step1Greeting: 'How was your pet\'s visit at',
    defaultHighlights: [
      'Gentle & Caring Veterinarians',
      'Stress-Free Pet Handling',
      'Thorough Checkup & Clear Guidance',
      'Clean & Odor-Free Clinic',
      'Affordable Wellness Packages',
      'Compassionate Front Desk Staff'
    ]
  }
];

const PRESET_EMOJIS = ['🏋️', '🦷', '🍽️', '☕', '🏨', '💇', '🚗', '🛍️', '🐾', '🧘', '⚡', '✨', '🩺', '🍕', '💆', '💈', '🥗', '🚲'];

export default function AddBusinessModal({ isOpen, onClose }) {
  const { addBusiness, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('gym');
  const [type, setType] = useState('Modern Fitness Club & Personal Training');
  const [tagline, setTagline] = useState('State-of-the-Art Equipment, Inspiring Coaches & Peak Energy');
  const [logo, setLogo] = useState('🏋️');
  const [publicReviewUrl, setPublicReviewUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat.id);
    setLogo(cat.icon);
    setType(cat.defaultType);
    if (cat.defaultTagline) setTagline(cat.defaultTagline);
    if (cat.defaultColor) setPrimaryColor(cat.defaultColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `business-${Date.now()}`;
    const selectedCatConfig = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const greetingPrefix = selectedCatConfig.step1Greeting || 'How was your visit at';

    const newBusinessPayload = {
      name: name.trim(),
      slug,
      category,
      type,
      tagline,
      logo,
      brandColors: {
        primary: primaryColor,
        accent: primaryColor,
        bgGradient: 'from-slate-900 via-slate-800 to-slate-950'
      },
      publicReviewUrl: publicReviewUrl.trim() || 'https://g.page/r/CVfAf-zR7rBLEBE/review',
      yelpUrl: publicReviewUrl.trim() || '',
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
              { value: 4, label: 'Good & Friendly', emoji: '😊', sentiment: 'positive' },
              { value: 5, label: 'Outstanding!', emoji: '😁✨', sentiment: 'positive' },
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
            title: 'What did you enjoy most today?',
            subtitle: 'Select all highlights that made your visit great (Step 2 of 2)',
            options: selectedCatConfig.defaultHighlights || [
              'Outstanding Customer Service',
              'Quick & Efficient Service',
              'Clean & Comfortable Environment',
              'Friendly & Professional Team',
              'High Quality Experience',
              'Transparent & Fair Pricing'
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
    navigateTo('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 relative my-8 animate-scale-up space-y-5">
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
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Industry Archetype */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">1. Select Industry / Category:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`p-2 rounded-xl text-left border text-xs font-bold flex items-center gap-2 transition-all ${
                    category === cat.id
                      ? 'bg-sky-50 border-sky-500 text-sky-900 ring-1 ring-sky-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">2. Business / Clinic Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Dr C Dental Clinic, Luxe Hair Studio..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Subtitle / Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">3. Business Subtitle / Type:</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Advanced Dental Care"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800"
              />
            </div>

            {/* Emoji Logo Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">4. Emoji Icon / Logo:</label>
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-50 rounded-xl border border-slate-300">
                {PRESET_EMOJIS.slice(0, 7).map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setLogo(emoji)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                      logo === emoji ? 'bg-sky-600 text-white font-bold' : 'hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Google Review URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>5. Google Maps / Review URL:</span>
              <span className="text-[10px] text-sky-600 font-semibold">Where reviews will redirect</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={publicReviewUrl}
                onChange={(e) => setPublicReviewUrl(e.target.value)}
                placeholder="https://g.page/r/CVfAf-zR7rBLEBE/review"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Business Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
