import React from 'react';
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight, 
  QrCode, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ThumbsUp, 
  Layers,
  BarChart3,
  Award 
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

  // 5-Star to 1-Star exact distribution
  const starCounts = {
    5: bizFeedbacks.filter(f => f.rating === 5).length,
    4: bizFeedbacks.filter(f => f.rating === 4).length,
    3: bizFeedbacks.filter(f => f.rating === 3).length,
    2: bizFeedbacks.filter(f => f.rating === 2).length,
    1: bizFeedbacks.filter(f => f.rating === 1).length,
  };

  const googleReviewsCaptured = bizFeedbacks.filter(f => f.generatedReview?.wasPublishedPublicly).length;
  const interceptedComplaints = bizFeedbacks.filter(f => f.rating < 4).length;

  const positivePercent = total > 0 ? Math.round((positiveCount / total) * 100) : 100;
  const conversionRate = total > 0 ? Math.round((googleReviewsCaptured / (positiveCount || 1)) * 100) : 100;

  // Business-tailored praise & bottleneck insights
  const praiseTopic = activeBusiness.aiPraise?.topic || "Exceptional Service & Caring Staff";
  const praiseQuote = activeBusiness.aiPraise?.quote || "Guests love the attentive service, quick responses, and spotless environment.";
  const bottleneckTopic = activeBusiness.aiBottleneck?.topic || "Peak Hour Wait Times";
  const bottleneckQuote = activeBusiness.aiBottleneck?.quote || "Occasional slight delay during peak hours intercepted before reaching public reviews.";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner with Quick Actions */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{activeBusiness.logo}</span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {activeBusiness.name} Command Center
            </h2>
            <span className="badge-sky text-[10px] font-bold px-2 py-0.5 rounded-full">
              AI Acceleration Active
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            {activeBusiness.tagline} • All 5-star guests are nudged to Google Reviews while negative feedback is intercepted privately.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all transform active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            <span>Open Customer QR View</span>
          </button>
          <button
            onClick={() => setActiveTab('qr_studio')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-sky-600" />
            <span>Generate Print Collateral</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CSAT Rating */}
        <div className="saas-card rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average CSAT</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{avgRating}</span>
            <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+0.4 pts</span>
            </span>
            <span className="text-slate-400">Past 30 days</span>
          </div>
        </div>

        {/* Card 2: Google Reviews Generated */}
        <div className="saas-card rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">5★ Google Reviews</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{googleReviewsCaptured}</span>
            <span className="text-xs text-emerald-700 font-bold">{positivePercent}% happy guests</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Draft conversion:</span>
            <span className="text-emerald-700 font-bold">{conversionRate}% converted</span>
          </div>
        </div>

        {/* Card 3: Intercepted Issues */}
        <div className="saas-card rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shielded Complaints</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{interceptedComplaints}</span>
            <span className="text-xs text-rose-700 font-bold">100% intercepted</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Public 1★ prevented:</span>
            <span className="text-rose-700 font-bold">{negativeCount} cases</span>
          </div>
        </div>

        {/* Card 4: Total QR Submissions */}
        <div className="saas-card rounded-2xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Feedback Scans</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{total}</span>
            <span className="text-xs text-slate-400 font-medium">sessions</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Avg completion:</span>
            <span className="text-sky-700 font-bold">&lt; 28 seconds</span>
          </div>
        </div>
      </div>

      {/* Sentiment Funnel, Rating Distribution & Recent Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Routing Breakdown & 5-Star Distribution Bars */}
        <div className="lg:col-span-2 saas-card rounded-3xl p-6 space-y-6 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Sentiment Routing Breakdown</h3>
              <p className="text-xs text-slate-500">Intelligent bifurcation between public Google acceleration and internal recovery</p>
            </div>
            <button
              onClick={() => setActiveTab('feedback_inbox')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View Feed</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Combined Visual Sentiment Segment Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Overall Sentiment Routing</span>
              <span className="text-slate-400">{total} Total Submissions</span>
            </div>
            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200 shadow-inner">
              {total === 0 ? (
                <div className="w-full bg-slate-200 text-center text-[9px] text-slate-500 font-bold flex items-center justify-center">
                  No ratings yet
                </div>
              ) : (
                <>
                  <div 
                    style={{ width: `${(positiveCount / total) * 100}%` }} 
                    className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-500" 
                    title={`Positive: ${positiveCount} (${Math.round((positiveCount / total) * 100)}%)`}
                  />
                  <div 
                    style={{ width: `${(neutralCount / total) * 100}%` }} 
                    className="bg-amber-400 hover:bg-amber-500 transition-all duration-500" 
                    title={`Neutral: ${neutralCount} (${Math.round((neutralCount / total) * 100)}%)`}
                  />
                  <div 
                    style={{ width: `${(negativeCount / total) * 100}%` }} 
                    className="bg-rose-500 hover:bg-rose-600 transition-all duration-500" 
                    title={`Negative: ${negativeCount} (${Math.round((negativeCount / total) * 100)}%)`}
                  />
                </>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Positive Route</span>
                </div>
                <div className="text-lg font-extrabold text-emerald-800 mt-1">{positiveCount}</div>
                <div className="text-[10px] text-emerald-700 font-medium">Nudged to Google Reviews</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Neutral Feedback</span>
                </div>
                <div className="text-lg font-extrabold text-amber-800 mt-1">{neutralCount}</div>
                <div className="text-[10px] text-amber-700 font-medium">Operational suggestions</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Intercepted Alerts</span>
                </div>
                <div className="text-lg font-extrabold text-rose-800 mt-1">{negativeCount}</div>
                <div className="text-[10px] text-rose-700 font-medium">Private GM resolution</div>
              </div>
            </div>
          </div>

          {/* 5-Star to 1-Star Detailed Rating Bars */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Star Rating Distribution</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Live sync</span>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars] || 0;
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                const barColor = stars >= 4 ? 'bg-emerald-500' : stars === 3 ? 'bg-amber-400' : 'bg-rose-500';

                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-7 font-bold text-slate-700 shrink-0 flex items-center gap-0.5">
                      {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 bg-slate-200/80 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-[11px] font-semibold text-slate-500 shrink-0">
                      {count} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Feed List */}
          <div className="pt-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Latest Live Submissions</h4>
            {bizFeedbacks.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                No feedback submissions yet for {activeBusiness.name}. Test the customer QR flow above to see live updates!
              </div>
            ) : (
              <div className="space-y-2">
                {bizFeedbacks.slice(0, 3).map((fb) => (
                  <div 
                    key={fb.id}
                    onClick={() => setActiveTab('feedback_inbox')}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 cursor-pointer flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        fb.rating >= 4 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : fb.rating === 3 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {fb.rating}★
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>{fb.tableOrLocation}</span>
                          <span className="text-[10px] text-slate-400 font-normal">• {fb.channel}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {fb.generatedReview?.draft || fb.answers?.private_manager_alert || 'Completed feedback flow.'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        fb.recoveryStatus === 'none_needed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : fb.recoveryStatus === 'resolved'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {fb.recoveryStatus === 'none_needed' ? 'Google 5★' : fb.recoveryStatus === 'resolved' ? 'Resolved' : 'Alert'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Intelligence Summary Card */}
        <div className="saas-card rounded-3xl p-6 flex flex-col justify-between space-y-4 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-slate-900">AI Intelligence Pulse</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Real-time
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-[11px] uppercase tracking-wider">
                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                  <span>Top Praise Driver</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{praiseTopic}</div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "{praiseQuote}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px] uppercase tracking-wider">
                  <ShieldAlert className="w-3 h-3 text-rose-600" />
                  <span>Primary Risk Bottleneck</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{bottleneckTopic}</div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "{bottleneckQuote}"
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('ai_intelligence')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            <span>Explore AI Complaint Clusters</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
