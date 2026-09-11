import React from 'react';
import { useApp } from '../context/AppContext';
import QuestionFlowEngine from '../components/customer/QuestionFlowEngine';
import { Sparkles, Utensils, Building2, Coffee, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CustomerFeedbackView({ forcedSlug }) {
  const { businesses, submitFeedback, currentRoute, navigateTo } = useApp();

  let slug = forcedSlug;
  if (!slug && currentRoute.startsWith('/b/')) {
    slug = currentRoute.replace('/b/', '').split('?')[0];
  }

  const business = businesses.find(b => b.slug === slug) || businesses[0];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'hotel': return <Building2 className="w-4 h-4" />;
      case 'cafe': return <Coffee className="w-4 h-4" />;
      case 'retail': return <ShoppingBag className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

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
            {getCategoryIcon(business.category)}
            <span>{business.type}</span>
          </span>
        </div>
      </header>

      {/* Main Dynamic Flow Engine */}
      <main className="flex-1 flex items-center justify-center my-auto">
        <QuestionFlowEngine
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
