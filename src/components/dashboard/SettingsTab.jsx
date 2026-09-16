import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Save, 
  Check, 
  RotateCcw,
  Plus,
  Trash2,
  AlertTriangle,
  X,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsTab() {
  const { activeBusiness, updateBusiness, resetDemoData, removeBusiness, navigateTo, setIsAddModalOpen } = useApp();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: activeBusiness.name || '',
    slug: activeBusiness.slug || '',
    type: activeBusiness.type || '',
    tagline: activeBusiness.tagline || '',
    logo: activeBusiness.logo || '🍷',
    primaryColor: activeBusiness.brandColors?.primary || '#e11d48',
    publicReviewUrl: activeBusiness.publicReviewUrl || '',
    yelpUrl: activeBusiness.yelpUrl || '',
    minPublicRating: activeBusiness.minPublicRating || 4
  });

  // Sync formData whenever activeBusiness changes
  useEffect(() => {
    setFormData({
      name: activeBusiness.name || '',
      slug: activeBusiness.slug || '',
      type: activeBusiness.type || '',
      tagline: activeBusiness.tagline || '',
      logo: activeBusiness.logo || '🍷',
      primaryColor: activeBusiness.brandColors?.primary || '#e11d48',
      publicReviewUrl: activeBusiness.publicReviewUrl || '',
      yelpUrl: activeBusiness.yelpUrl || '',
      minPublicRating: activeBusiness.minPublicRating || 4
    });
  }, [activeBusiness]);

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
      minPublicRating: Number(formData.minPublicRating)
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <form onSubmit={handleSave} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Profile & Routing Settings</h2>
          <p className="text-xs text-slate-500">
            Configure branding, public review destination links, and private feedback interception thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all demo businesses and feedbacks to factory state?')) {
                resetDemoData();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
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
      </div>

      {/* Danger Zone: Remove Business */}
      <div className="rounded-3xl p-6 bg-rose-50/70 border border-rose-200 space-y-4">
        <div className="flex items-center gap-2 text-rose-700 border-b border-rose-200/60 pb-3">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider">Danger Zone</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">Remove This Business Profile</h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Permanently delete <strong className="text-slate-900">{activeBusiness.name}</strong>, including its QR codes, survey flows, and feedback logs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Business Profile</span>
          </button>
        </div>
      </div>
    </form>

    {/* Delete Confirmation Modal */}
    {isDeleteConfirmOpen && (
      <div 
        className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsDeleteConfirmOpen(false);
        }}
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 relative my-6 animate-scale-up space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Remove Business</h3>
                <p className="text-xs text-slate-500">Confirm business deletion</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">{activeBusiness.name}</strong>?
            </p>
            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Permanent Deletion Warning</span>
              </div>
              <p className="text-[11px] text-rose-700 leading-relaxed font-normal">
                This action cannot be undone. All custom review routing, QR codes, and feedback entries for this business will be permanently deleted.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                removeBusiness(activeBusiness.id);
                setIsDeleteConfirmOpen(false);
                navigateTo('/admin');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Yes, Delete Business</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
