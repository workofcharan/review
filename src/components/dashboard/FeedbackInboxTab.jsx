import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Mail, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FeedbackInboxTab() {
  const { activeBusiness, feedbacks, updateFeedbackStatus } = useApp();

  const [selectedSentimentFilter, setSelectedSentimentFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFeedbackModal, setActiveFeedbackModal] = useState(null);
  const [managerNoteInput, setManagerNoteInput] = useState('');

  const bizFeedbacks = feedbacks.filter(f => f.businessId === activeBusiness.id);

  const filteredFeedbacks = bizFeedbacks.filter(fb => {
    if (selectedSentimentFilter === 'positive' && fb.rating < (activeBusiness.minPublicRating || 4)) return false;
    if (selectedSentimentFilter === 'neutral' && fb.rating !== 3) return false;
    if (selectedSentimentFilter === 'negative' && fb.rating >= 3) return false;

    if (selectedStatusFilter === 'action_needed' && fb.recoveryStatus !== 'pending_review') return false;
    if (selectedStatusFilter === 'resolved' && fb.recoveryStatus !== 'resolved') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const textMatch = (fb.generatedReview?.draft || '').toLowerCase().includes(q) ||
        (fb.answers.private_manager_alert || '').toLowerCase().includes(q) ||
        (fb.customerContact || '').toLowerCase().includes(q) ||
        (fb.tableOrLocation || '').toLowerCase().includes(q);
      if (!textMatch) return false;
    }

    return true;
  });

  const handleOpenDetail = (fb) => {
    setActiveFeedbackModal(fb);
    setManagerNoteInput(fb.managerNotes || '');
  };

  const handleSaveResolution = (status) => {
    if (!activeFeedbackModal) return;
    updateFeedbackStatus(activeFeedbackModal.id, status, managerNoteInput);
    setActiveFeedbackModal(prev => ({
      ...prev,
      recoveryStatus: status,
      managerNotes: managerNoteInput
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Live Feedback Feed & Recovery CRM</h2>
          <p className="text-xs text-slate-500">
            Audit trail of customer QR submissions, AI generated reviews, and intercepted private manager alerts.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-300 text-xs font-semibold">
            <button
              onClick={() => setSelectedSentimentFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSentimentFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({bizFeedbacks.length})
            </button>
            <button
              onClick={() => setSelectedSentimentFilter('positive')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSentimentFilter === 'positive' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Positive (5★)
            </button>
            <button
              onClick={() => setSelectedSentimentFilter('negative')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSentimentFilter === 'negative' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Alerts (1-2★)
            </button>
          </div>
        </div>
      </div>

      {/* Search and Table Container */}
      <div className="glass-card rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Search input */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, dish, staff name, customer email, table number..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Feedback Cards List */}
        <div className="divide-y divide-slate-100 bg-white">
          {filteredFeedbacks.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No feedback submissions found</p>
              <p className="text-xs text-slate-400">Try adjusting your search query or filter settings.</p>
            </div>
          ) : (
            filteredFeedbacks.map((fb) => {
              const isPositive = fb.rating >= (activeBusiness.minPublicRating || 4);
              const isNegative = fb.rating < 3;
              const formattedTime = new Date(fb.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const formattedDate = new Date(fb.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

              return (
                <div
                  key={fb.id}
                  onClick={() => handleOpenDetail(fb)}
                  className="p-5 hover:bg-slate-50 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Rating Badge */}
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 font-bold border ${
                      isPositive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : isNegative
                          ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className="text-sm leading-none">{fb.rating}★</span>
                      <span className="text-[9px] uppercase font-bold mt-0.5">
                        {isPositive ? '5-Star' : isNegative ? 'Alert' : 'Neutral'}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{fb.tableOrLocation}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500">{fb.channel}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{formattedDate}, {formattedTime}</span>
                        </span>
                      </div>

                      {/* Snippet */}
                      <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">
                        {fb.generatedReview?.draft || fb.answers.private_manager_alert || 'Customer completed structured answer flow.'}
                      </p>

                      {/* Highlighted tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fb.answers.positive_highlights?.map((h, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                            + {h}
                          </span>
                        ))}
                        {fb.answers.staff_shoutout && !fb.answers.staff_shoutout.includes('Skip') && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-medium flex items-center gap-1">
                            <UserCheck className="w-2.5 h-2.5" />
                            <span>{fb.answers.staff_shoutout}</span>
                          </span>
                        )}
                        {fb.answers.negative_categories?.map((c, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                            ⚠️ {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status & CTA */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${
                      fb.recoveryStatus === 'none_needed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : fb.recoveryStatus === 'resolved'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200 animate-pulse'
                    }`}>
                      {fb.recoveryStatus === 'none_needed' 
                        ? 'Google 5★ Posted' 
                        : fb.recoveryStatus === 'resolved' 
                          ? 'Resolved by GM' 
                          : '⚠️ Intercepted: Action Required'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detailed Modal Drawer */}
      {activeFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeFeedbackModal.rating >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {activeFeedbackModal.rating} / 5 Stars
                  </span>
                  <span className="text-xs text-slate-500">{activeFeedbackModal.tableOrLocation}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Submission Details & Resolution Trail
                </h3>
              </div>
              <button
                onClick={() => setActiveFeedbackModal(null)}
                className="p-1 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Answers Breakdown */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Customer Responses:
                </div>

                {activeFeedbackModal.answers.positive_highlights && (
                  <div>
                    <span className="text-slate-500">Compliments: </span>
                    <span className="text-emerald-700 font-bold">
                      {activeFeedbackModal.answers.positive_highlights.join(', ')}
                    </span>
                  </div>
                )}

                {activeFeedbackModal.answers.staff_shoutout && (
                  <div>
                    <span className="text-slate-500">Staff Praised: </span>
                    <span className="text-sky-700 font-bold">{activeFeedbackModal.answers.staff_shoutout}</span>
                  </div>
                )}

                {activeFeedbackModal.answers.negative_categories && (
                  <div>
                    <span className="text-slate-500">Issues Reported: </span>
                    <span className="text-rose-700 font-bold">
                      {activeFeedbackModal.answers.negative_categories.join(', ')}
                    </span>
                  </div>
                )}

                {activeFeedbackModal.answers.wait_time_drilldown && (
                  <div>
                    <span className="text-slate-500">Specific Delay Area: </span>
                    <span className="text-amber-700 font-bold">{activeFeedbackModal.answers.wait_time_drilldown}</span>
                  </div>
                )}

                {activeFeedbackModal.answers.food_drilldown && (
                  <div>
                    <span className="text-slate-500">Dish Feedback: </span>
                    <span className="text-amber-700 font-bold">{activeFeedbackModal.answers.food_drilldown}</span>
                  </div>
                )}
              </div>

              {/* AI Review Draft / Private Message */}
              {activeFeedbackModal.generatedReview ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Generated Google Review Draft (Tone: {activeFeedbackModal.generatedReview.tone})</span>
                  </div>
                  <p className="text-slate-800 italic leading-relaxed">
                    "{activeFeedbackModal.generatedReview.draft}"
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Private Customer Complaint (Intercepted from Google)</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-mono">
                    "{activeFeedbackModal.answers.private_manager_alert || 'Customer requested direct GM review.'}"
                  </p>
                </div>
              )}

              {/* Customer Contact */}
              {activeFeedbackModal.customerContact && (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Guest Contact: <strong className="text-slate-900">{activeFeedbackModal.customerContact}</strong></span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(activeFeedbackModal.customerContact)}
                    className="text-[11px] text-sky-600 hover:underline font-bold"
                  >
                    Copy Contact
                  </button>
                </div>
              )}

              {/* Manager Resolution Notes */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-slate-700 text-xs">
                  Internal Manager Resolution Note:
                </label>
                <textarea
                  rows={2}
                  value={managerNoteInput}
                  onChange={(e) => setManagerNoteInput(e.target.value)}
                  placeholder="e.g., Called guest, comped meal with $50 credit, kitchen team retrained on order pacing..."
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveFeedbackModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                Close
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveResolution('pending_review')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300"
                >
                  Save as Pending
                </button>
                <button
                  onClick={() => handleSaveResolution('resolved')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
