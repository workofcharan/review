import React from 'react';
import { useApp } from '../context/AppContext';
import QuestionFlowEngine from '../components/customer/QuestionFlowEngine';
import { Sparkles, Utensils, Building2, Coffee, ShoppingBag, ArrowLeft, Dumbbell, Car, Scissors, HeartPulse, PawPrint } from 'lucide-react';
import { inferCategoryFromBusiness } from '../utils/aiReviewGenerator';

export default function CustomerFeedbackView({ forcedSlug }) {
  const { businesses, submitFeedback, currentRoute, navigateTo, activeBusiness } = useApp();

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

  const normalizedSlug = slug ? slug.toLowerCase().trim() : '';
  const business = (normalizedSlug ? businesses.find(b => b.slug.toLowerCase() === normalizedSlug || b.id === slug) : null) || activeBusiness || businesses[0];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'gym':
      case 'fitness': return <Dumbbell className="w-4 h-4 text-purple-600" />;
      case 'restaurant': return <Utensils className="w-4 h-4 text-rose-600" />;
      case 'hotel':
      case 'hospitality': return <Building2 className="w-4 h-4 text-teal-600" />;
      case 'cafe': return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'salon':
      case 'spa': return <Scissors className="w-4 h-4 text-pink-600" />;
      case 'automotive': return <Car className="w-4 h-4 text-orange-600" />;
      case 'retail': return <ShoppingBag className="w-4 h-4 text-indigo-600" />;
      case 'pet': return <PawPrint className="w-4 h-4 text-emerald-600" />;
      case 'healthcare': return <HeartPulse className="w-4 h-4 text-sky-600" />;
      default: return <Sparkles className="w-4 h-4 text-sky-600" />;
    }
  };

  const activeCategory = inferCategoryFromBusiness(business);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Brand Bar */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 bg-white shadow-xs px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Customer Mode</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 bg-white shadow-xs px-3 py-1.5 rounded-full border border-slate-200">
            {getCategoryIcon(activeCategory)}
            <span>{business.type || business.name}</span>
          </span>
        </div>
      </header>

      {/* Main Dynamic Flow Engine */}
      <main className="flex-1 flex items-center justify-center my-auto">
        <QuestionFlowEngine
          key={`${business.slug}-${currentRoute}`}
          business={business}
          tableNumber={`Table ${Math.floor(Math.random() * 20) + 1}`}
          onFinishFeedback={(feedbackPayload) => {
            submitFeedback(feedbackPayload);
          }}
        />
      </main>

      {/* Bottom Business Switcher Pill for quick demo exploration */}
      <footer className="max-w-md w-full mx-auto mt-6 text-center">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 pl-2 font-medium">Demo Profile:</span>
          <div className="flex gap-1">
            {businesses.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => navigateTo(`/b/${b.slug}`)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  b.slug === business.slug
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{b.logo}</span>
                <span className="hidden sm:inline">{b.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
