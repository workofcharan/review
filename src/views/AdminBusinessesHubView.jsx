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
  LayoutDashboard
} from 'lucide-react';
import AddBusinessModal from '../components/dashboard/AddBusinessModal';

export default function AdminBusinessesHubView() {
  const { 
    businesses, 
    selectedBusinessId, 
    setSelectedBusinessId, 
    feedbacks, 
    navigateTo 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Consolidated Aggregated Metrics
  const totalBusinesses = businesses.length;
  const totalFeedbacks = feedbacks.length;
  const avgPortfolioCsat = totalFeedbacks > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks).toFixed(1)
    : '5.0';
  const totalGoogleConverted = feedbacks.filter(f => f.generatedReview?.wasPublishedPublicly).length;
  const totalShielded = feedbacks.filter(f => f.rating < 4).length;

  const categories = [
    { id: 'all', label: 'All Businesses' },
    { id: 'healthcare', label: 'Healthcare & Dental' },
    { id: 'cafe', label: 'Café & Restaurant' },
    { id: 'salon', label: 'Salon & Spa' }
  ];

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                            b.category === selectedCategory || 
                            (selectedCategory === 'cafe' && (b.category === 'cafe' || b.category === 'restaurant'));
    return matchesSearch && matchesCategory;
  });

  const handleOpenBusinessWorkspace = (bizId) => {
    setSelectedBusinessId(bizId);
    navigateTo('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* Top Banner: Admin Multi-Business Control Center */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Admin Multi-Business Master Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Business Operations Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Select any handled business to open its dedicated command center, inspect live QR feedback streams, configure adaptive question flows, and manage private complaint resolution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Register New Business</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Portfolio Aggregate KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="saas-card rounded-2xl p-4 sm:p-5 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Businesses Handled</span>
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
            <span>Portfolio CSAT</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            <span>{avgPortfolioCsat}</span>
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
          <div className="text-[11px] text-emerald-700 font-bold">
            100% 5★ Converted
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

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search handled businesses by name or type..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Handled Businesses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <span>Handled Businesses</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
              {filteredBusinesses.length}
            </span>
          </h2>
          <span className="text-xs text-slate-500">
            Click any business to enter its Command Center
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz, idx) => {
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
                    <div className="flex items-center gap-3">
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
                      onClick={() => navigateTo(`/b/${biz.slug}`)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                      <span>Customer QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBusinessId(biz.id);
                        navigateTo('/dashboard');
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3 h-3 text-sky-600" />
                      <span>Print Studio</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Business Modal */}
      <AddBusinessModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
