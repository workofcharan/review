import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Sparkles, 
  Star, 
  QrCode, 
  ExternalLink, 
  ArrowRight, 
  Plus, 
  Search, 
  ShieldAlert, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Filter,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';
import AddBusinessModal from '../components/dashboard/AddBusinessModal';
import BusinessQrModal from '../components/dashboard/BusinessQrModal';

export default function AdminBusinessesHubView() {
  const { 
    businesses, 
    selectedBusinessId, 
    setSelectedBusinessId, 
    feedbacks, 
    navigateTo,
    removeBusiness,
    isAddModalOpen,
    setIsAddModalOpen
  } = useApp();

  const [selectedQrBiz, setSelectedQrBiz] = useState(null);
  const [bizToDelete, setBizToDelete] = useState(null);

  // Consolidated Aggregated Metrics
  const totalBusinesses = businesses.length;
  const totalFeedbacks = feedbacks.length;
  const avgCsat = totalFeedbacks > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks).toFixed(1)
    : '5.0';
  const totalGoogleConverted = feedbacks.filter(f => f.generatedReview?.wasPublishedPublicly).length;
  const totalShielded = feedbacks.filter(f => f.rating < 4).length;

  const handleOpenBusinessWorkspace = (bizId) => {
    setSelectedBusinessId(bizId);
    navigateTo('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">
      {/* Aggregate KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Businesses Onboarded</span>
            <Building2 className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalBusinesses}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Active & Deployed</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Overall CSAT</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            <span>{avgCsat}</span>
            <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Top Tier Rating</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Feedback Scans</span>
            <MessageSquare className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalFeedbacks}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Across all locations
          </div>
        </div>

        {/* Metric 4 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Google Reviews</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
            {totalGoogleConverted}
          </div>
        </div>

        {/* Metric 5 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Shielded Issues</span>
            <ShieldCheck className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalShielded}
          </div>
          <div className="text-[11px] text-rose-700 font-bold">
            Intercepted privately
          </div>
        </div>
      </div>

      {/* Onboarded Businesses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <span>Onboarded Businesses</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold">
                {businesses.length}
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Select a business to open its Command Center
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz, idx) => {
            const bizFeedbacks = feedbacks.filter(f => f.businessId === biz.id);
            const count = bizFeedbacks.length;
            const avg = count > 0 
              ? (bizFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / count).toFixed(1) 
              : '5.0';
            const converted = bizFeedbacks.filter(f => f.generatedReview?.wasPublishedPublicly).length;
            const complaints = bizFeedbacks.filter(f => f.rating < 4).length;
            const isSelected = biz.id === selectedBusinessId;

            return (
              <div 
                key={biz.id}
                className={`saas-card rounded-3xl p-6 flex flex-col justify-between space-y-5 bg-white border transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  isSelected ? 'border-sky-500 ring-2 ring-sky-500/20' : 'border-slate-200'
                }`}
              >
                {/* Card Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                        {biz.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider">
                            B{idx + 1}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                            Live
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900 tracking-tight truncate mt-0.5">
                          {biz.name}
                        </h3>
                        <p className="text-xs text-slate-500 truncate font-medium">
                          {biz.type}
                        </p>
                      </div>
                    </div>

                    {/* Remove Business Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBizToDelete(biz);
                      }}
                      title={`Remove ${biz.name}`}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {biz.tagline}
                  </p>

                  {/* Individual Business Stats */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                    <div className="p-2 rounded-xl bg-slate-50/80">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">CSAT</div>
                      <div className="text-sm font-extrabold text-slate-900 flex items-center justify-center gap-0.5 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{avg}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50/80">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Scans</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                        {count}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50/80">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">5★ Google</div>
                      <div className="text-sm font-extrabold text-emerald-700 mt-0.5">
                        {converted}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-1">
                  {/* Primary CTA: Open Dedicated Command Center */}
                  <button
                    type="button"
                    onClick={() => handleOpenBusinessWorkspace(biz.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer group"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Open Business Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedQrBiz(biz)}
                      className="py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/80 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 text-sky-600" />
                      <span>View QR Code</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBusinessId(biz.id);
                        navigateTo(`/b/${biz.slug}`);
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                      <span>Test Flow</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Business QR Code View Modal */}
      <BusinessQrModal
        business={selectedQrBiz}
        isOpen={!!selectedQrBiz}
        onClose={() => setSelectedQrBiz(null)}
        onOpenPrintStudio={(bizId) => {
          setSelectedBusinessId(bizId);
          navigateTo('/dashboard');
        }}
      />

      {/* Delete Business Confirmation Modal */}
      {bizToDelete && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setBizToDelete(null);
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
                onClick={() => setBizToDelete(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-900">{bizToDelete.name}</strong>?
              </p>
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Permanent Deletion Warning</span>
                </div>
                <p className="text-[11px] text-rose-700 leading-relaxed font-normal">
                  This will remove the business profile, its custom question flows, QR code configuration, and all recorded feedback submissions for this location.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setBizToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  removeBusiness(bizToDelete.id);
                  setBizToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
