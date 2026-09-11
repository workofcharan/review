import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import QuestionFlowEngine from '../components/customer/QuestionFlowEngine';
import { 
  Smartphone, 
  LayoutDashboard, 
  RotateCcw, 
  ExternalLink
} from 'lucide-react';

export default function SplitScreenView() {
  const { 
    activeBusiness, 
    feedbacks, 
    submitFeedback,
    navigateTo 
  } = useApp();

  const [phoneKey, setPhoneKey] = useState(0);
  const [selectedTable] = useState('Table 7');

  const bizFeedbacks = feedbacks.filter(f => f.businessId === activeBusiness.id);
  const positiveFeedbacks = bizFeedbacks.filter(f => f.rating >= (activeBusiness.minPublicRating || 4));
  const negativeFeedbacks = bizFeedbacks.filter(f => f.rating < 3);

  const handleResetPhone = () => {
    setPhoneKey(prev => prev + 1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4 bg-slate-50">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="font-bold text-slate-900">Interactive Live Dual Simulation:</span>
          <span className="text-slate-600">
            Submit feedback on the mobile device on the right and watch the manager dashboard update on the left in real time!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetPhone}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
            <span>Reset Mobile Phone</span>
          </button>
        </div>
      </div>

      {/* Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Real-Time Business Dashboard Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-[11px] text-slate-500 font-bold uppercase">Total Scans</span>
              <div className="text-2xl font-extrabold text-slate-900">{bizFeedbacks.length}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-[11px] text-emerald-600 font-bold uppercase">5★ Public Google</span>
              <div className="text-2xl font-extrabold text-emerald-700">{positiveFeedbacks.length}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-[11px] text-rose-600 font-bold uppercase">Intercepted Shield</span>
              <div className="text-2xl font-extrabold text-rose-700">{negativeFeedbacks.length}</div>
            </div>
          </div>

          {/* Real-time Submissions Audit Feed */}
          <div className="glass-card rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900">Live Feedback Feed</h3>
              </div>
              <button
                onClick={() => navigateTo('/dashboard')}
                className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Full Command Center</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {bizFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      fb.rating >= 4 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                    }`}>
                      {fb.rating}★
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{fb.tableOrLocation}</span>
                        <span className="text-slate-400 font-normal">
                          {new Date(fb.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-700 line-clamp-2">
                        {fb.generatedReview?.draft || fb.answers.private_manager_alert || 'Feedback captured'}
                      </p>
                      {fb.answers.positive_highlights && (
                        <div className="text-[10px] text-emerald-700 font-bold">
                          Highlights: {fb.answers.positive_highlights.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                    fb.recoveryStatus === 'none_needed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : fb.recoveryStatus === 'resolved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {fb.recoveryStatus === 'none_needed' ? 'Google 5★' : 'Manager Alert'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Mobile Frame (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-sky-600" />
            <span>Customer Mobile Experience Simulator</span>
          </div>

          {/* iPhone Frame */}
          <div className="w-full max-w-[360px] rounded-[42px] p-3.5 bg-slate-900 border-[6px] border-slate-700 shadow-2xl relative">
            {/* Speaker / Dynamic Island notch */}
            <div className="w-24 h-4 bg-slate-850 rounded-full mx-auto mb-2 border border-slate-700" />

            {/* Mobile Screen Area */}
            <div className="rounded-[30px] overflow-hidden bg-white min-h-[580px] p-2 flex flex-col justify-center">
              <QuestionFlowEngine
                key={phoneKey}
                business={activeBusiness}
                tableNumber={selectedTable}
                onFinishFeedback={(feedbackPayload) => {
                  submitFeedback(feedbackPayload);
                }}
              />
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
