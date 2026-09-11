import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ExternalLink, RefreshCw, Star, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateReviewDraft } from '../../utils/aiReviewGenerator';

const TONES = [
  { id: 'enthusiastic', label: '🤩 Enthusiastic', desc: 'Energetic & glowing' },
  { id: 'detailed', label: '🍷 Detailed & Foodie', desc: 'Sophisticated & refined' },
  { id: 'concise', label: '⚡ Short & Sweet', desc: 'Quick 2-sentence punch' },
  { id: 'casual', label: '😎 Friendly / Chill', desc: 'Natural & relaxed' },
];

export default function PositiveReviewScreen({ 
  business, 
  answers, 
  onComplete,
  onOpenPerk 
}) {
  const [selectedTone, setSelectedTone] = useState('enthusiastic');
  const [draftText, setDraftText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const refreshDraft = (tone = selectedTone) => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateReviewDraft({
        business,
        rating: answers.overall_experience || 5,
        highlights: answers.positive_highlights || [],
        staffShoutout: answers.staff_shoutout || '',
        freeText: answers.positive_free_text || '',
        tone
      });
      setDraftText(generated);
      setIsGenerating(false);
    }, 200);
  };

  useEffect(() => {
    refreshDraft('enthusiastic');
  }, []);

  const handleToneChange = (toneId) => {
    setSelectedTone(toneId);
    refreshDraft(toneId);
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(draftText);
    setIsCopied(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#e11d48', '#10b981', '#f59e0b', '#8b5cf6']
      });
    } catch (e) {
      console.error(e);
    }

    onComplete({
      generatedReview: {
        tone: selectedTone,
        draft: draftText,
        wasPublishedPublicly: true,
        platform: 'Google Reviews'
      },
      recoveryStatus: 'none_needed'
    });

    const targetUrl = business.publicReviewUrl || 'https://maps.google.com';
    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      onOpenPerk();
    }, 800);
  };

  const handleSkipToPerk = () => {
    onComplete({
      generatedReview: {
        tone: selectedTone,
        draft: draftText,
        wasPublishedPublicly: false,
        platform: 'Direct Internal'
      },
      recoveryStatus: 'none_needed'
    });
    onOpenPerk();
  };

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* Header Badge */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Review Drafter Ready</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Thank you! We'd love your support on Google.
        </h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          We used your positive feedback to draft an authentic review. 1-click copy & paste directly to our Google page!
        </p>
      </div>

      {/* Tone Selectors */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Review Tone:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TONES.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => handleToneChange(tone.id)}
              className={`p-2.5 rounded-xl text-left border transition-all duration-200 ${
                selectedTone === tone.id
                  ? 'bg-sky-50 border-sky-500 text-sky-900 ring-1 ring-sky-400 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold">{tone.label}</div>
              <div className="text-[10px] text-slate-500 truncate">{tone.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Review Box */}
      <div className="relative group">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-100 rounded-t-xl border-t border-x border-slate-300 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-amber-500">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800">5.0 Star Rating</span>
          </div>
          <button
            type="button"
            onClick={() => refreshDraft()}
            disabled={isGenerating}
            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>

        <textarea
          rows={4}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          className="w-full rounded-b-xl bg-white border border-slate-300 p-3.5 text-slate-900 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500 font-normal resize-none shadow-xs"
        />
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={handleCopyAndRedirect}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Copied! Opening Google Reviews...</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Draft & Post to Google Review</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSkipToPerk}
          className="w-full py-2.5 px-3 text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <Gift className="w-3.5 h-3.5 text-amber-500" />
          <span>Claim VIP Perk without posting public review</span>
        </button>
      </div>
    </div>
  );
}
