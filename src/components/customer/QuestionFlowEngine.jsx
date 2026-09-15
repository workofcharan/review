import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';
import EmojiScale from './EmojiScale';
import confetti from 'canvas-confetti';
import { generateReviewDraft, getThreeOptionsForRating } from '../../utils/aiReviewGenerator';
import { copyTextToClipboard, redirectToReviewPage } from '../../utils/mobileRedirectHelper';

const DR_C_EXACT_REVIEW_PAGE = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export default function QuestionFlowEngine({
  business,
  tableNumber = 'Reception / Operatory',
  onFinishFeedback
}) {
  const [currentNodeId, setCurrentNodeId] = useState('step_1_rating');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [showPasteGuideModal, setShowPasteGuideModal] = useState(false);
  const [activeDraftText, setActiveDraftText] = useState('');
  const [scanSeed, setScanSeed] = useState(() => Date.now() + Math.floor(Math.random() * 10000000));

  const selectedRating = Number(answers.overall_experience || 5);
  const ratingThreeOptions = getThreeOptionsForRating(business, selectedRating, scanSeed);

  const handleSelectRating = (ratingVal) => {
    const num = Number(ratingVal);
    const newSeed = Date.now() + Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 9999);
    setScanSeed(newSeed);

    const ratingOpts = getThreeOptionsForRating(business, num, newSeed);
    const initialHighlight = ratingOpts.options[0]?.label || '';
    
    setAnswers(prev => ({
      ...prev,
      overall_experience: num,
      selected_options: [initialHighlight]
    }));

    // Advance to Step 2
    setHistory(['step_1_rating']);
    setCurrentNodeId('step_2_options');
  };

  const handleToggleOption = (optionLabel) => {
    const currentList = Array.isArray(answers.selected_options) ? answers.selected_options : [];
    let updated;
    if (currentList.includes(optionLabel)) {
      // Keep at least one option selected if possible
      updated = currentList.length > 1 ? currentList.filter(item => item !== optionLabel) : currentList;
    } else {
      updated = [...currentList, optionLabel];
    }
    setAnswers(prev => ({
      ...prev,
      selected_options: updated
    }));
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setHistory([]);
    setCurrentNodeId('step_1_rating');
  };

  // Direct Submit & Immediate Browser Redirect to Google Maps Review Page for all ratings
  const handleDirectGoogleSubmit = async (chosenDraft) => {
    const highlights = answers.selected_options || [];
    const rating = selectedRating;
    
    // Synthesize review draft
    const draftText = chosenDraft || activeDraftText || generateReviewDraft({
      business,
      rating,
      highlights,
      staffShoutout: 'Dr. C',
      tone: 'enthusiastic',
      scanSeed
    });

    setActiveDraftText(draftText);
    setRedirecting(true);
    setShowPasteGuideModal(true);

    // Copy draft text to clipboard (iOS Safari & Android WebViews)
    await copyTextToClipboard(draftText);

    // Fire celebration confetti for 4 or 5 stars
    if (rating >= 4) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#0ea5e9', '#10b981', '#f59e0b', '#6366f1']
        });
      } catch (e) {
        console.error(e);
      }
    }

    // Save feedback in dashboard
    const fullPayload = {
      businessId: business.id,
      businessSlug: business.slug,
      rating,
      sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative',
      tableOrLocation: tableNumber,
      channel: 'QR Scan (Mobile)',
      answers: {
        ...answers,
        positive_highlights: highlights
      },
      generatedReview: {
        tone: rating >= 4 ? 'enthusiastic' : rating === 3 ? 'balanced' : 'constructive',
        draft: draftText,
        wasPublishedPublicly: true,
        platform: 'Google Reviews'
      },
      recoveryStatus: 'none_needed',
      customerContact: '',
      managerNotes: ''
    };

    if (onFinishFeedback) {
      onFinishFeedback(fullPayload);
    }

    // Direct navigation to Google Maps Review Page URL
    const targetUrl = business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE;
    setTimeout(() => {
      redirectToReviewPage(targetUrl);
    }, 1200);
  };

  const totalEstimatedSteps = 2;
  const currentStepNumber = currentNodeId === 'step_1_rating' ? 1 : 2;
  const progressPct = Math.round((currentStepNumber / totalEstimatedSteps) * 100);

  // Generate authentic AI review draft tailored to the selected emoji rating and highlights dynamically per scan
  const activeReviewDraft = generateReviewDraft({
    business,
    rating: selectedRating,
    highlights: answers.selected_options || [ratingThreeOptions.options[0]?.label || ''],
    staffShoutout: business.name.includes('Dr C') ? 'Dr. C' : 'the team',
    scanSeed
  });

  const renderQuestionContent = () => {
    // STEP 1: Star Rating Selection (5 Emojis)
    if (currentNodeId === 'step_1_rating') {
      const getGreetingTitle = () => {
        if (business.questionFlow?.questions?.overall_experience?.title) {
          return business.questionFlow.questions.overall_experience.title;
        }
        switch (business.category) {
          case 'gym':
          case 'fitness':
            return `How was your workout session at ${business.name}?`;
          case 'hotel':
            return `How was your stay experience at ${business.name}?`;
          case 'salon':
          case 'spa':
            return `How was your styling & spa visit at ${business.name}?`;
          case 'automotive':
            return `How was your vehicle service at ${business.name}?`;
          case 'retail':
            return `How was your shopping experience at ${business.name}?`;
          case 'pet':
            return `How was your pet's visit to ${business.name}?`;
          case 'restaurant':
          case 'cafe':
            return `How was your dining experience at ${business.name}?`;
          case 'healthcare':
            return `How was your care experience at ${business.name}?`;
          default:
            return `How was your visit at ${business.name}?`;
        }
      };

      const step1Question = {
        title: getGreetingTitle(),
        subtitle: business.questionFlow?.questions?.overall_experience?.subtitle || "Tap an emoji to rate your experience today",
        options: [
          { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
          { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
          { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
          { value: 4, label: "Good", emoji: "😊", sentiment: "positive" },
          { value: 5, label: "Excellent!", emoji: "🤩", sentiment: "positive" },
        ]
      };

      return (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {step1Question.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              {step1Question.subtitle}
            </p>
          </div>

          <EmojiScale
            question={step1Question}
            selectedValue={answers.overall_experience}
            onSelect={(val) => {
              handleSelectRating(val);
            }}
          />
        </div>
      );
    }

    // STEP 2: RELEVANT 3 OPTIONS + RELEVANT 3 AI REVIEW DRAFTS DIRECTLY TO GOOGLE REVIEWS
    const selectedList = Array.isArray(answers.selected_options) ? answers.selected_options : [];
    const ratingColor = selectedRating >= 4 ? 'text-amber-500' : selectedRating === 3 ? 'text-amber-600' : 'text-rose-500';

    return (
      <div className="space-y-5 animate-slide-up">
        {/* Question Title & Subtitle */}
        <div className="space-y-1.5">
          <div className={`flex items-center gap-1.5 text-xs font-bold ${ratingColor}`}>
            <span>{'★'.repeat(selectedRating)}</span>
            <span className="text-slate-500 font-medium">({selectedRating} {selectedRating === 1 ? 'Star' : 'Stars'} Selected)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {ratingThreeOptions.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {ratingThreeOptions.subtitle}
          </p>
        </div>

        {/* Exactly 3 Tailored Options for this Star Rating */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>Select Your Key Highlights / Feedback:</span>
            <button
              type="button"
              onClick={() => {
                const newSeed = Date.now() + Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 9999);
                setScanSeed(newSeed);
                const ratingOpts = getThreeOptionsForRating(business, selectedRating, newSeed);
                if (ratingOpts.options[0]?.label) {
                  setAnswers(prev => ({
                    ...prev,
                    selected_options: [ratingOpts.options[0].label]
                  }));
                }
              }}
              title="Show different options"
              className="text-[10px] text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
            >
              <span>↻ Shuffle Options</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {ratingThreeOptions.options.map((opt) => {
              const isSelected = selectedList.includes(opt.label);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleOption(opt.label)}
                  className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 transform active:scale-[0.99] cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-sm ring-1 ring-sky-400/50'
                      : 'bg-white border-slate-200/90 text-slate-700 hover:border-sky-300 hover:bg-sky-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform ${
                      isSelected ? 'bg-sky-200/60 scale-105' : 'bg-slate-100'
                    }`}>
                      {opt.emoji}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all ${
                    isSelected ? 'bg-sky-600 text-white' : 'border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>


        {/* Direct Google Review Redirection Button */}
        <button
          type="button"
          onClick={() => handleDirectGoogleSubmit(activeReviewDraft)}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
        >
          {redirecting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Opening Google Review Page...</span>
            </div>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Review & Open Google Maps</span>
              <ExternalLink className="w-4 h-4 opacity-85" />
            </>
          )}
        </button>

        {redirecting && (
          <a
            href={business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE}
            target="_top"
            rel="noopener noreferrer"
            className="block text-center text-xs text-sky-700 font-bold underline animate-pulse py-1"
          >
            Tap here if not opened automatically →
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Top Header Card */}
      <div className="rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xl shadow-slate-200/60 relative overflow-hidden bg-white">
        {/* Top bar with back button & progress */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          {history.length > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sm shrink-0">
                {business.logo}
              </div>
              <span className="font-extrabold text-slate-900 truncate max-w-[170px]">{business.name}</span>
            </div>
          )}

          {/* Step & Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Step {currentStepNumber} of {totalEstimatedSteps}
            </span>
            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main dynamic question node */}
        {renderQuestionContent()}

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct Google Review Redirect</span>
          </div>
          <span className="text-slate-400 font-medium truncate max-w-[120px]">{business.name}</span>
        </div>
      </div>

      {/* 1-Tap Paste Instruction Modal Overlay */}
      {showPasteGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold ring-8 ring-emerald-50">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Copied to Clipboard!
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 pt-2">
                Opening Google Review Page
              </h3>
              <p className="text-xs text-slate-500">
                Your review has been copied. Complete it on Google in 2 quick steps:
              </p>
            </div>

            {/* Step visual instructions */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-left text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>Select <strong>{selectedRating} Star{selectedRating > 1 ? 's' : ''}</strong> on Google</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>Tap review box & tap <strong>"Paste"</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => redirectToReviewPage(business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE)}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>Continue to Google Review Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
