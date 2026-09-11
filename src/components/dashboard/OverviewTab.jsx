import React from 'react';
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight, 
  QrCode, 
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function OverviewTab({ setActiveTab }) {
  const { activeBusiness, feedbacks, navigateTo } = useApp();

  const bizFeedbacks = feedbacks.filter(f => f.businessId === activeBusiness.id);

  const total = bizFeedbacks.length;
  const avgRating = total > 0 
    ? (bizFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1)
    : '5.0';

  const positiveCount = bizFeedbacks.filter(f => f.rating >= (activeBusiness.minPublicRating || 4)).length;
  const neutralCount = bizFeedbacks.filter(f => f.rating === 3).length;
  const negativeCount = bizFeedbacks.filter(f => f.rating < 3).length;

  const googleReviewsCaptured = bizFeedbacks.filter(f => f.generatedReview?.wasPublishedPublicly).length;
  const interceptedComplaints = bizFeedbacks.filter(f => f.rating < 4).length;

  const positivePercent = total > 0 ? Math.round((positiveCount / total) * 100) : 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner with Quick Actions */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Review Conversion Active</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {activeBusiness.name} Command Center
          </h2>
          <p className="text-xs sm:text-sm text-sky-100">
            {activeBusiness.tagline} • Intercepting negative feedback before public listing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-sm transition-all transform active:scale-95"
          >
            <ExternalLink className="w-4 h-4 text-sky-600" />
            <span>Open Customer QR View</span>
          </button>
          <button
            onClick={() => setActiveTab('qr_studio')}
            className="px-4 py-2.5 rounded-xl bg-sky-700/60 hover:bg-sky-700 text-white border border-sky-400/60 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <QrCode className="w-4 h-4 text-sky-200" />
            <span>Print Table Tents</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CSAT Rating */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average CSAT</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{avgRating}</span>
            <span className="text-xs text-slate-500">/ 5.0</span>
          </div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.4 vs last month</span>
          </div>
        </div>

        {/* Card 2: Google Reviews Generated */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">5★ Google Reviews</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{googleReviewsCaptured}</span>
            <span className="text-xs text-emerald-600 font-bold">{positivePercent}% conversion</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Synthesized by AI & posted by happy guests
          </div>
        </div>

        {/* Card 3: Intercepted Issues */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intercepted Privately</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{interceptedComplaints}</span>
            <span className="text-xs text-rose-600 font-bold">100% shielded</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Prevented 1★ Google rating drops
          </div>
        </div>

        {/* Card 4: Total QR Submissions */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Feedback Scans</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{total}</span>
            <span className="text-xs text-slate-500">responses</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Avg completion time: 28 seconds
          </div>
        </div>
      </div>

      {/* Conversion Funnel & Sentiment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Distribution Bar */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sentiment Routing Breakdown</h3>
              <p className="text-xs text-slate-500">Real-time bifurcation between public Google promotion & internal triage</p>
            </div>
            <button
              onClick={() => setActiveTab('feedback_inbox')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
              <div 
                style={{ width: `${(positiveCount / (total || 1)) * 100}%` }} 
                className="bg-emerald-500 hover:bg-emerald-600 transition-all" 
                title="Positive (5★ & 4★)"
              />
              <div 
                style={{ width: `${(neutralCount / (total || 1)) * 100}%` }} 
                className="bg-amber-500 hover:bg-amber-600 transition-all" 
                title="Neutral (3★)"
              />
              <div 
                style={{ width: `${(negativeCount / (total || 1)) * 100}%` }} 
                className="bg-rose-500 hover:bg-rose-600 transition-all" 
                title="Negative (1-2★)"
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-medium">Positive to Google ({positiveCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-medium">Neutral Feedback ({neutralCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-medium">Intercepted Escapes ({negativeCount})</span>
              </div>
            </div>
          </div>

          {/* Live Recent Feed Snapshot */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Latest Live Submissions</h4>
            <div className="space-y-2.5">
              {bizFeedbacks.slice(0, 3).map((fb) => (
                <div 
                  key={fb.id}
                  onClick={() => setActiveTab('feedback_inbox')}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 cursor-pointer flex items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      fb.rating >= 4 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : fb.rating === 3 
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {fb.rating}★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{fb.tableOrLocation}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{fb.channel}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {fb.generatedReview?.draft || fb.answers.private_manager_alert || 'Customer completed standard feedback flow.'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      fb.recoveryStatus === 'none_needed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : fb.recoveryStatus === 'resolved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {fb.recoveryStatus === 'none_needed' ? 'Public Google 5★' : fb.recoveryStatus === 'resolved' ? 'Resolved by GM' : 'Action Required'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations Quick Card */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sky-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">AI Quick Insights</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on {total} guest responses analyzed in the past 30 days:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <span className="font-bold">Top Driver:</span> Truffle Tagliatelle & Maya's wine pairings drive 98% of 5-star reviews.
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                <span className="font-bold">Peak Risk:</span> 35+ min delay between appetizers and mains on Friday nights.
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('ai_intelligence')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            <span>Explore Full AI Clustering</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
