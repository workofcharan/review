import React, { useState, useEffect } from 'react';
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
  Check,
  Calculator,
  Flame,
  Award,
  Users,
  BarChart3,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateReviewDraft } from '../utils/aiReviewGenerator';
import { copyTextToClipboard, redirectToReviewPage } from '../utils/mobileRedirectHelper';

export default function LandingView() {
  const { businesses, setSelectedBusinessId, activeBusiness, navigateTo } = useApp();
  const [activeTabArchetype, setActiveTabArchetype] = useState(businesses[0].id);

  // Live Interactive Hero Demo Widget State
  const [heroRating, setHeroRating] = useState(5);
  const [selectedHeroChips, setSelectedHeroChips] = useState(['Painless & Gentle Procedure', "Dr. C's Clear & Reassuring Guidance"]);
  const [heroTone, setHeroTone] = useState('enthusiastic');
  const [heroGeneratedDraft, setHeroGeneratedDraft] = useState('');
  const [heroCopied, setHeroCopied] = useState(false);

  // Interactive ROI Calculator State
  const [monthlyGuests, setMonthlyGuests] = useState(2400);
  const [currentRating, setCurrentRating] = useState(4.2);

  // Live Simulated Social Proof Ticker
  const [recentLiveNotification, setRecentLiveNotification] = useState({
    name: 'Rahul S.',
    biz: 'Dr C Dental Clinic',
    action: 'posted a 5★ Google Review',
    time: 'just now',
    avatar: '🦷'
  });

  const availableChips = [
    'Painless & Gentle Procedure',
    "Dr. C's Clear & Reassuring Guidance",
    'Spotless & Modern Sterile Equipment',
    'Prompt Zero-Wait Time',
    'Friendly Front Desk Team',
    'Thorough Scaling & Cleaning'
  ];

  // Update Hero Generated Review Draft
  useEffect(() => {
    const draft = generateReviewDraft({
      business: activeBusiness,
      rating: heroRating,
      highlights: selectedHeroChips,
      staffShoutout: 'Dr. C & Team',
      freeText: 'Best dental clinic visit ever, completely painless!',
      tone: heroTone
    });
    setHeroGeneratedDraft(draft);
  }, [heroRating, selectedHeroChips, heroTone, activeBusiness]);

  const handleToggleChip = (chip) => {
    if (selectedHeroChips.includes(chip)) {
      setSelectedHeroChips(selectedHeroChips.filter(c => c !== chip));
    } else {
      setSelectedHeroChips([...selectedHeroChips, chip]);
    }
  };

  const handleCopyHero = async () => {
    await copyTextToClipboard(heroGeneratedDraft);
    setHeroCopied(true);
    const targetUrl = activeBusiness?.publicReviewUrl || 'https://g.page/r/CVfAf-zR7rBLEBE/review';
    setTimeout(() => {
      redirectToReviewPage(targetUrl);
    }, 200);
    setTimeout(() => setHeroCopied(false), 2000);
  };

  // ROI Calculations
  const estimatedScanRate = Math.round(monthlyGuests * 0.18); // ~18% scan QR
  const estimatedNew5StarReviews = Math.round(estimatedScanRate * 0.72); // 72% happy route
  const estimatedInterceptedComplaints = Math.round(estimatedScanRate * 0.14); // 14% critical
  const potentialNewRating = Math.min(5.0, (currentRating + 0.5)).toFixed(1);
  const estimatedRevenueLift = Math.round(monthlyGuests * 18 * 0.08); // 8% foot traffic lift

  const selectedBiz = businesses.find(b => b.id === activeTabArchetype) || businesses[0];

  return (
    <div className="space-y-24 pb-24 animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none -z-10" />

        {/* Top Header Text */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Top Feature Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Autonomous QR Feedback & AI Review Conversion Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.06]">
            Turn Every Happy Guest into a{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              5-Star Google Review
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Adaptive QR feedback that automatically converts happy customers into authentic Google reviews with AI, while privately intercepting negative feedback for instant manager recovery.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('/preview')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md shadow-slate-900/10 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <SplitSquareVertical className="w-4 h-4 text-sky-400" />
              <span>Launch Interactive Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm flex items-center gap-2 shadow-2xs transition-all"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Open Business Command Center</span>
            </button>
          </div>
        </div>

        {/* Interactive Live Hero Review Generator Widget */}
        <div className="max-w-4xl mx-auto">
          <div className="saas-card rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-xl space-y-6 relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-sky text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Interactive Live Sandbox
                  </span>
                  <span className="text-xs text-slate-400">• Try the AI conversion engine live</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mt-1">
                  Experience Real-Time AI Review Synthesis
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Connected to <strong className="text-slate-900">{activeBusiness.name}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Sandbox Inputs (5 cols) */}
              <div className="lg:col-span-5 space-y-4 text-left">
                {/* 1. Rating Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">1. Guest Sentiment:</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { val: 1, emoji: '😞' },
                      { val: 2, emoji: '😕' },
                      { val: 3, emoji: '😐' },
                      { val: 4, emoji: '😊' },
                      { val: 5, emoji: '🤩' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setHeroRating(item.val)}
                        className={`p-2 rounded-xl text-center border text-lg transition-all ${
                          heroRating === item.val
                            ? 'bg-sky-50 border-sky-500 shadow-xs scale-105 ring-2 ring-sky-400'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Highlight Compliment Chips */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">2. Selected Compliments:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableChips.map((chip) => {
                      const selected = selectedHeroChips.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleToggleChip(chip)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                            selected
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Tone Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">3. AI Review Voice:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'enthusiastic', label: '🤩 Enthusiastic' },
                      { id: 'detailed', label: '🍷 Foodie / Refined' },
                      { id: 'concise', label: '⚡ Short & Sweet' },
                      { id: 'casual', label: '😎 Chill / Friendly' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setHeroTone(t.id)}
                        className={`p-1.5 rounded-lg text-left text-[11px] font-semibold border transition-all ${
                          heroTone === t.id
                            ? 'bg-sky-50 border-sky-500 text-sky-800 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sandbox Output Preview (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">5.0 Star Draft Ready</span>
                  </div>

                  <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                    <span>AI Synthesized</span>
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal min-h-[90px] italic">
                  "{heroGeneratedDraft}"
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={handleCopyHero}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    {heroCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Draft & Post to Google Review</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 border border-slate-200 transition-colors"
                  >
                    <span>Test Full QR</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
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

      {/* Interactive Business ROI & Review Growth Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="saas-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-lg space-y-8 text-left bg-gradient-to-r from-slate-50 via-white to-sky-50/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-sky-600" />
                <span>ROI & Review Growth Forecaster</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Estimate Your Review Growth & Revenue Impact
              </h3>
              <p className="text-xs text-slate-500">
                Adjust your monthly foot traffic and see the projected 5-star Google review volume and shielded complaints.
              </p>
            </div>
            <span className="badge-emerald px-3 py-1 rounded-full text-xs font-bold">
              Based on live platform conversion rates
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Controls (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Monthly Guests Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Estimated Monthly Guests / Customers:</label>
                  <span className="font-mono text-base font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
                    {monthlyGuests.toLocaleString()} guests
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={monthlyGuests}
                  onChange={(e) => setMonthlyGuests(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>500 (Boutique)</span>
                  <span>5,000 (Busy Venue)</span>
                  <span>10,000+ (High Volume)</span>
                </div>
              </div>

              {/* Current Rating Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Current Google Maps Rating:</label>
                  <span className="font-mono text-base font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    {currentRating} ★
                  </span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="4.8"
                  step="0.1"
                  value={currentRating}
                  onChange={(e) => setCurrentRating(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Projected Impact Cards (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-emerald-800">New 5★ Reviews</div>
                <div className="text-2xl font-extrabold text-emerald-700">+{estimatedNew5StarReviews}/mo</div>
                <div className="text-[10px] text-emerald-600 font-medium">Auto-drafted by AI</div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="text-xs font-bold text-rose-800">Complaints Shielded</div>
                <div className="text-2xl font-extrabold text-rose-700">{estimatedInterceptedComplaints}/mo</div>
                <div className="text-[10px] text-rose-600 font-medium">Intercepted before Google</div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                <div className="text-xs font-bold text-sky-800">Projected Rating</div>
                <div className="text-2xl font-extrabold text-sky-700">{potentialNewRating} ★</div>
                <div className="text-[10px] text-sky-600 font-medium">Top local 3-pack rank</div>
              </div>

              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-1">
                <div className="text-xs font-bold text-violet-800">Est. Revenue Lift</div>
                <div className="text-2xl font-extrabold text-violet-700">+${estimatedRevenueLift.toLocaleString()}</div>
                <div className="text-[10px] text-violet-600 font-medium">Via higher Google visibility</div>
              </div>
            </div>
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
        <div className="saas-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto text-left">
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
                  <span>Direct 5-Star Google Review acceleration</span>
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
                  <div className="text-[11px] text-sky-700">1-click copy to Google Review</div>
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
