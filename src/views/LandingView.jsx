import React from 'react';
import { 
  Sparkles, 
  QrCode, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Smartphone, 
  ArrowRight, 
  Building2, 
  Utensils, 
  Coffee, 
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  Gift,
  CheckCircle2,
  SplitSquareVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LandingView() {
  const { businesses, setSelectedBusinessId, activeBusiness, navigateTo } = useApp();

  return (
    <div className="space-y-20 pb-20 animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-8">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-100/80 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Next-Gen QR Feedback & AI Review Acceleration</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Turn Every Guest into a{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              5-Star Google Review
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Adaptive QR feedback that automatically converts happy customers into authentic Google reviews with AI, while privately intercepting negative experiences for instant manager resolution.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('/preview')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <SplitSquareVertical className="w-4 h-4" />
            <span>Launch Dual-Screen Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('/dashboard')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm flex items-center gap-2 shadow-xs transition-all"
          >
            <span>Open Business Command Center</span>
          </button>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <div className="glass-card rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.8★</div>
            <div className="text-xs text-slate-500 mt-0.5">Average Client Rating</div>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">+340%</div>
            <div className="text-xs text-slate-500 mt-0.5">Google Review Volume</div>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">1-Star Reviews Intercepted</div>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">&lt;30s</div>
            <div className="text-xs text-slate-500 mt-0.5">Guest Completion Time</div>
          </div>
        </div>
      </section>

      {/* 3-Step Flow Architecture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xs font-extrabold text-sky-600 uppercase tracking-widest">
            Frictionless Customer Journey
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            How Smart Bifurcation & AI Drafting Works
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-sky-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg border border-sky-200">
              01
            </div>
            <h4 className="text-lg font-bold text-slate-900">Table QR Scan</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Guest scans a branded tabletop tent or bill card. No app download or account creation needed. Quick 5-point sentiment scale in 1 tap.
            </p>
            <div className="pt-2 text-xs font-semibold text-sky-600 flex items-center gap-1">
              <span>Dynamic State Machine</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-amber-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-200">
              02
            </div>
            <h4 className="text-lg font-bold text-slate-900">Smart Sentiment Routing</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-emerald-600">4-5 Stars:</strong> Highlight favorite dishes/services.<br />
              <strong className="text-rose-600">1-3 Stars:</strong> Private root-cause form routed directly to the General Manager.
            </p>
            <div className="pt-2 text-xs font-semibold text-amber-600 flex items-center gap-1">
              <span>Negative Review Shield</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-200">
              03
            </div>
            <h4 className="text-lg font-bold text-slate-900">AI Review Synthesis & Perk</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our AI converts selected highlights into a human-sounding 5-star review. Guest taps 1-click copy & posts to Google Maps to claim their VIP discount voucher.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span>Google SEO & Foot-Traffic Boost</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Industry Archetypes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xs font-extrabold text-sky-600 uppercase tracking-widest">
            Tailored Industry Flows
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            Explore Pre-Configured Business Templates
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Click any profile below to experience its adaptive question state machine and branding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              className="glass-card rounded-3xl p-6 border border-slate-200 hover:border-sky-400 shadow-sm flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-inner">
                  {biz.logo}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 tracking-tight">{biz.name}</h4>
                  <div className="text-xs text-sky-600 font-semibold">{biz.type}</div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {biz.tagline}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedBusinessId(biz.id);
                    navigateTo(`/b/${biz.slug}`);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs border border-sky-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Test Mobile QR Flow</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBusinessId(biz.id);
                    navigateTo('/dashboard');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-medium border border-slate-200 transition-colors"
                >
                  View Dashboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to accelerate your 5-star reputation?
            </h3>
            <p className="text-sm text-sky-100">
              Deploy customized QR table tents and start capturing authentic customer sentiment today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm shadow-xl flex items-center gap-2 transition-all transform active:scale-95"
            >
              <span>Get Started in Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/preview')}
              className="px-6 py-3.5 rounded-2xl bg-sky-700/60 hover:bg-sky-700 text-white border border-sky-400 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <SplitSquareVertical className="w-4 h-4" />
              <span>Try Interactive Simulator</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
