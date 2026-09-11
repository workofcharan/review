import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Gift, 
  Save, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsTab() {
  const { activeBusiness, updateBusiness, resetDemoData } = useApp();

  const [formData, setFormData] = useState({
    name: activeBusiness.name || '',
    slug: activeBusiness.slug || '',
    type: activeBusiness.type || '',
    tagline: activeBusiness.tagline || '',
    logo: activeBusiness.logo || '🍷',
    primaryColor: activeBusiness.brandColors?.primary || '#e11d48',
    publicReviewUrl: activeBusiness.publicReviewUrl || '',
    yelpUrl: activeBusiness.yelpUrl || '',
    minPublicRating: activeBusiness.minPublicRating || 4,
    perkTitle: activeBusiness.perkOffer?.title || '',
    perkCode: activeBusiness.perkOffer?.code || '',
    perkDays: activeBusiness.perkOffer?.validDays || 30
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateBusiness(activeBusiness.id, {
      name: formData.name,
      slug: formData.slug,
      type: formData.type,
      tagline: formData.tagline,
      logo: formData.logo,
      brandColors: {
        ...activeBusiness.brandColors,
        primary: formData.primaryColor
      },
      publicReviewUrl: formData.publicReviewUrl,
      yelpUrl: formData.yelpUrl,
      minPublicRating: Number(formData.minPublicRating),
      perkOffer: {
        title: formData.perkTitle,
        code: formData.perkCode,
        validDays: Number(formData.perkDays)
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Profile & Routing Settings</h2>
          <p className="text-xs text-slate-500">
            Configure branding, public review destination links, and private feedback interception thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all demo businesses and feedbacks to factory state?')) {
                resetDemoData();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset Demo Data</span>
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            {saved ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? 'Settings Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: General Info */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sky-600 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Business Identity</h3>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1 space-y-1">
                <label className="text-xs font-bold text-slate-700">Logo Emoji:</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-lg text-center text-slate-900"
                />
              </div>
              <div className="col-span-3 space-y-1">
                <label className="text-xs font-bold text-slate-700">Business Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">URL Slug (`/b/[slug]`):</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-sky-700 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Business Type / Subtitle:</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tagline / Mission:</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Smart Review Interception & Links */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sky-600 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Public Review Channels</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Google Maps / Review URL:</label>
              <input
                type="url"
                value={formData.publicReviewUrl}
                onChange={(e) => handleChange('publicReviewUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Yelp / TripAdvisor URL:</label>
              <input
                type="url"
                value={formData.yelpUrl}
                onChange={(e) => handleChange('yelpUrl', e.target.value)}
                placeholder="https://yelp.com/biz/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Public Review Threshold:</label>
                <span className="text-xs font-bold text-emerald-700">{formData.minPublicRating}+ Stars</span>
              </div>
              <input
                type="range"
                min="3"
                max="5"
                step="1"
                value={formData.minPublicRating}
                onChange={(e) => handleChange('minPublicRating', e.target.value)}
                className="w-full accent-sky-600"
              />
              <p className="text-[11px] text-slate-500">
                Customers rating {formData.minPublicRating}+ stars get the AI Google Review prompt. Lower ratings get intercepted privately.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: VIP Perk Offer */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-amber-600 border-b border-slate-100 pb-3">
            <Gift className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Customer Incentive / Perk Offer</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Incentive Description:</label>
              <input
                type="text"
                value={formData.perkTitle}
                onChange={(e) => handleChange('perkTitle', e.target.value)}
                placeholder="e.g., 10% off next visit & complimentary dessert"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Voucher Promo Code:</label>
              <input
                type="text"
                value={formData.perkCode}
                onChange={(e) => handleChange('perkCode', e.target.value)}
                placeholder="e.g. VIP10"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-amber-700 font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
