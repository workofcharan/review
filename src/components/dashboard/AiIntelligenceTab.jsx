import React from 'react';
import { 
  ThumbsUp, 
  ShieldAlert, 
  Lightbulb, 
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AiIntelligenceTab() {
  const { activeBusiness, aiInsights } = useApp();

  const businessPraise = activeBusiness.aiPraise || {
    topic: "Exceptional Staff Attention & High-Quality Care",
    quote: "Guests consistently praise the polite, gentle, and transparent service."
  };

  const businessBottleneck = activeBusiness.aiBottleneck || {
    topic: "Peak Hour Waiting Room Delays",
    quote: "Occasional wait time spikes during busy peak weekend windows."
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
            <span>Natural Language Intelligence Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {activeBusiness.name} AI Sentiment & Topic Clustering
          </h2>
          <p className="text-xs sm:text-sm text-sky-100">
            Unsupervised clustering of qualitative guest feedback, root-cause diagnostics, and actionable recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Praise Clusters */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <ThumbsUp className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Top Customer Reviews</h3>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              98% CSAT Impact
            </span>
          </div>

          <div className="space-y-3">
            {/* Primary Business Praise */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-emerald-950">{businessPraise.topic}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Top mention
                </span>
              </div>
              <p className="text-xs text-slate-700 italic">
                "{businessPraise.quote}"
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `98%` }} 
                />
              </div>
            </div>

            {aiInsights.praiseClusters.map((cluster, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{cluster.topic}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {cluster.count} mentions
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "{cluster.quote}"
                </p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${cluster.positiveScore}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Intercepted Complaints Clusters */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Root-Cause Complaint Clusters</h3>
            </div>
            <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Intercepted Privately
            </span>
          </div>

          <div className="space-y-3">
            {/* Primary Business Bottleneck */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-rose-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{businessBottleneck.topic}</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  Primary Risk
                </span>
              </div>

              <p className="text-xs text-slate-700 italic">
                "{businessBottleneck.quote}"
              </p>

              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">AI Suggested Action: </strong>
                  Optimize appointment buffers during peak rush hours to ensure zero customer wait time.
                </div>
              </div>
            </div>

            {aiInsights.complaintClusters.map((complaint, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-rose-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>{complaint.topic}</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    {complaint.count} reports
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  {complaint.impact}
                </p>

                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">AI Suggested Action: </strong>
                    {complaint.suggestedAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
