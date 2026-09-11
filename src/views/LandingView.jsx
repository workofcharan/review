import React, { useState } from 'react';
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
  SplitSquareVertical,
  Zap,
  Shield,
  Bot,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LandingView() {
  const { businesses, setSelectedBusinessId, activeBusiness, navigateTo } = useApp();
  const [activeTabArchetype, setActiveTabArchetype] = useState(businesses[0].id);
  const [copiedDemo, setCopiedDemo] = useState(false);

  const selectedBiz = businesses.find(b => b.id === activeTabArchetype) || businesses[0];

  return (
    <div className="space-y-24 pb-24 animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-8">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none -z-10" />

        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Autonomous QR Feedback & AI Review Conversion Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Accelerate 5-Star Reviews.{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Shield Negative Escapes.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Adaptive QR feedback that converts delighted guests into authentic Google reviews using AI, while privately intercepting dissatisfied feedback for instant manager resolution.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('/preview')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <SplitSquareVertical className="w-4 h-4 text-sky-400" />
            <span>Launch Interactive Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('/dashboard')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm flex items-center gap-2 shadow-xs transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-600" />
            <span>Command Center</span>
          </button>
        </div>

        {/* Interactive Live Product Preview Hero Card */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="font-mono text-slate-400 text-[11px] ml-2">revpulse.io/live-engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                  100% Client-Side Adaptive
                </span>
              </div>
            </div>

            {/* Visual Workflow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <QrCode className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">1. Instant QR Scan</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Guests scan a table tent, bill fold, or coaster. Zero app download. Opens adaptive 5-point sentiment scale in &lt;1 second.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <Bot className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">2. Smart Bifurcation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>4-5 Stars:</strong> Captures praise & favorite items.<br/>
                  <strong>1-3 Stars:</strong> Intercepted into a private General Manager resolution form.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">3. AI Google Review + Perk</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Synthesizes authentic human-sounding Google review draft with 1-click copy + unlocks digital VIP discount voucher.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
          <div className="saas-card rounded-2xl p-4 text-left">
            <div className="text-2xl font-extrabold text-slate-900">4.9★</div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Average Client Rating</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">+0.5 pts average boost</div>
          </div>
          <div className="saas-card rounded-2xl p-4 text-left">
            <div className="text-2xl font-extrabold text-emerald-700">+340%</div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Google Review Flow</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">Verified customer posts</div>
          </div>
          <div className="saas-card rounded-2xl p-4 text-left">
            <div className="text-2xl font-extrabold text-sky-700">100%</div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">1-Star Shield Protection</div>
            <div className="text-[10px] text-sky-700 font-semibold mt-1">Private GM triage</div>
          </div>
          <div className="saas-card rounded-2xl p-4 text-left">
            <div className="text-2xl font-extrabold text-amber-700">&lt; 28s</div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Guest Completion Time</div>
            <div className="text-[10px] text-amber-700 font-semibold mt-1">Frictionless UX</div>
          </div>
        </div>
      </section>

      {/* Multi-Industry Archetypes Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xs font-extrabold text-sky-600 uppercase tracking-widest">
            Pre-Configured Industry Solutions
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tailored Flows for Every Customer Experience
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Select an industry below to see how the adaptive state machine configures its questions, praise tags, and review drafter.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {businesses.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveTabArchetype(b.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  b.id === activeTabArchetype
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{b.logo}</span>
                <span>{b.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Industry Showcase Card */}
        <div className="saas-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl border border-slate-200">
                {selectedBiz.logo}
              </div>
              <div>
                <span className="badge-sky text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {selectedBiz.category}
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {selectedBiz.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedBiz.tagline}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configured question nodes & adaptive branches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>VIP Perk: {selectedBiz.perkOffer?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Automatic Google Maps & TripAdvisor review linking</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedBusinessId(selectedBiz.id);
                    navigateTo(`/b/${selectedBiz.slug}`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Test Live Flow</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBusinessId(selectedBiz.id);
                    navigateTo('/dashboard');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs transition-all"
                >
                  <span>Open Dashboard</span>
                </button>
              </div>
            </div>

            {/* Flow Preview Mockup */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question Graph Sample
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-800">Q1: Overall Experience</div>
                  <div className="text-[11px] text-slate-500">5-Point Emoji Sentiment Scale</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                  <div className="font-bold text-emerald-900">Branch (4-5★): Positive Highlights</div>
                  <div className="text-[11px] text-emerald-700">Food quality, sommelier, staff shoutouts</div>
                </div>
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-950">
                  <div className="font-bold text-sky-900">Final: AI Review Synthesis</div>
                  <div className="text-[11px] text-sky-700">1-click copy to Google Review + Claim Perk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-12 bg-slate-900 text-white shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-3xl font-extrabold tracking-tight">
              Ready to automate your reputation and guest recovery?
            </h3>
            <p className="text-sm text-slate-400">
              Launch table tents in minutes, shield your ratings, and grow your 5-star Google review footprint.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md flex items-center gap-2 transition-all transform active:scale-95"
            >
              <span>Explore Command Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/preview')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <SplitSquareVertical className="w-4 h-4 text-sky-400" />
              <span>Launch Live Simulator</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LayoutDashboard(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  );
}
