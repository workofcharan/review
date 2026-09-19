import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Building2, 
  X, 
  Sparkles, 
  Link as LinkIcon, 
  Palette, 
  Smile, 
  Save,
  Check,
  MapPin,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { inferCategoryFromBusiness } from '../../utils/aiReviewGenerator';

export default function EditBusinessModal({ isOpen, onClose }) {
  const { activeBusiness, updateBusiness } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    tagline: '',
    logo: '✨',
    publicReviewUrl: '',
    minPublicRating: 4,
    primaryColor: '#0284c7'
  });

  const [saved, setSaved] = useState(false);

  // Sync modal state whenever activeBusiness or isOpen changes
  useEffect(() => {
    if (activeBusiness) {
      setFormData({
        name: activeBusiness.name || '',
        type: activeBusiness.type || '',
        tagline: activeBusiness.tagline || '',
        logo: activeBusiness.logo || '✨',
        publicReviewUrl: activeBusiness.publicReviewUrl || '',
        minPublicRating: activeBusiness.minPublicRating || 4,
        primaryColor: activeBusiness.brandColors?.primary || '#0284c7'
      });
    }
  }, [activeBusiness, isOpen]);

  if (!isOpen || !activeBusiness) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanSlug = (formData.name || activeBusiness.slug || 'business')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const detectedCategory = inferCategoryFromBusiness({
      name: formData.name,
      type: formData.type,
      tagline: formData.tagline,
      logo: formData.logo,
      category: activeBusiness.category
    });

    updateBusiness(activeBusiness.id, {
      name: formData.name.trim(),
      slug: cleanSlug || activeBusiness.slug,
      type: formData.type.trim(),
      tagline: formData.tagline.trim(),
      logo: formData.logo,
      category: detectedCategory,
      publicReviewUrl: formData.publicReviewUrl.trim(),
      minPublicRating: Number(formData.minPublicRating),
      brandColors: {
        ...activeBusiness.brandColors,
        primary: formData.primaryColor,
        accent: formData.primaryColor
      }
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  const EMOJI_OPTIONS = ['💻', '🍷', '🏋️', '☕', '🍽️', '💇', '🏨', '🚗', '🛍️', '🐾', '🦷', '✨', '🍕', '🌸', '⚡', '🏥'];

  const COLOR_OPTIONS = [
    { label: 'Sky Blue', hex: '#0284c7' },
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Purple', hex: '#8b5cf6' },
    { label: 'Slate', hex: '#334155' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xl">
              {formData.logo || '🏢'}
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-sky-400" />
                <span>Edit Business Profile</span>
              </h2>
              <p className="text-xs text-slate-300">
                Update name, description, Google Maps link, and routing settings
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Business Name & Logo Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Business Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Ebin tech"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-sky-600" />
                <span>Icon / Logo</span>
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-center text-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          {/* Quick Emoji Swatches */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500">Quick Icon Selector:</span>
            <div className="flex flex-wrap gap-1.5">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleChange('logo', emoji)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border transition-all cursor-pointer ${
                    formData.logo === emoji 
                      ? 'bg-sky-50 border-sky-500 scale-110 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Business Type / Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Business Type / Industry Category
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="e.g. Digital Marketing Agency, Software Solutions"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm font-medium text-slate-900"
            />
          </div>

          {/* Tagline / Full Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Command Center Description / Tagline
              </label>
              <span className="text-[10px] text-slate-400">Displayed on overview banner</span>
            </div>
            <textarea
              rows={3}
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Detailed description or tagline about your services..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs leading-relaxed text-slate-900 font-normal resize-none"
            />
          </div>

          {/* Google Review Destination URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Google Maps / Public Review Page URL</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.publicReviewUrl}
                onChange={(e) => handleChange('publicReviewUrl', e.target.value)}
                placeholder="https://g.page/r/your-business/review"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm font-medium text-slate-900 font-mono"
              />
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-500">
              When guests tap "Copy Review & Post on Google Maps", they are automatically directed to this link.
            </p>
          </div>

          {/* Minimum Rating Threshold & Brand Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Public Review Redirection</span>
              </label>
              <select
                value={formData.minPublicRating}
                onChange={(e) => handleChange('minPublicRating', Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={1}>All Stars (1★–5★ to Google) (Recommended)</option>
                <option value={4}>4 Stars & Above</option>
                <option value={5}>5 Stars Only</option>
              </select>
              <p className="text-[10px] text-slate-500">
                All star ratings redirect customers straight to your Google Maps review form.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-500" />
                <span>Brand Accent Color</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0"
                />
                <div className="flex flex-wrap gap-1">
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => handleChange('primaryColor', col.hex)}
                      className={`w-5 h-5 rounded-md border transition-transform cursor-pointer ${
                        formData.primaryColor === col.hex ? 'scale-125 ring-2 ring-slate-400' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saved}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer disabled:opacity-75"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
