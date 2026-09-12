import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Copy, Check, ExternalLink, HeartHandshake, Send, Mail, CheckCircle2 } from 'lucide-react';
import EmojiScale from './EmojiScale';
import ChipsQuestion from './ChipsQuestion';
import TextQuestion from './TextQuestion';
import PrivateRecoveryScreen from './PrivateRecoveryScreen';
import confetti from 'canvas-confetti';
import { generateReviewDraft, generateReviewOptions, getThreeOptionsForRating } from '../../utils/aiReviewGenerator';
import { copyTextToClipboard, redirectToReviewPage } from '../../utils/mobileRedirectHelper';

const DR_C_EXACT_REVIEW_PAGE = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export default function QuestionFlowEngine({
  business,
  tableNumber = 'Reception / Operatory',
  onFinishFeedback
}) {
  const flow = business.questionFlow || {};
  const [currentNodeId, setCurrentNodeId] = useState('step_1_rating');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedReviewOptionIndex, setSelectedReviewOptionIndex] = useState(0);
  const [privateDetails, setPrivateDetails] = useState('');
  const [privateContact, setPrivateContact] = useState('');
  const [isSubmittingPrivate, setIsSubmittingPrivate] = useState(false);
  const [privateSubmitted, setPrivateSubmitted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showPasteGuideModal, setShowPasteGuideModal] = useState(false);
  const [activeDraftText, setActiveDraftText] = useState('');

  const selectedRating = Number(answers.overall_experience || 5);
  const ratingThreeOptions = getThreeOptionsForRating(business, selectedRating);

  const handleAnswerChange = (key, val) => {
    setAnswers(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleSelectRating = (ratingVal) => {
    const num = Number(ratingVal);
    // Default to the first option of the 3 tailored options for that rating
    const ratingOpts = getThreeOptionsForRating(business, num);
    const initialHighlight = ratingOpts.options[0]?.label || '';
    
    setAnswers(prev => ({
      ...prev,
      overall_experience: num,
      selected_options: [initialHighlight]
    }));
    setSelectedReviewOptionIndex(0);

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

  // Direct Submit & Immediate Browser Redirect to the Exact Google Maps Review Page (iOS & Android Compatible)
  const handleDirectGoogleSubmit = async (chosenDraft) => {
    const highlights = answers.selected_options || [];
    const rating = selectedRating;
    
    // Synthesize review draft
    const draftText = chosenDraft || activeDraftText || generateReviewDraft({
      business,
      rating,
      highlights,
      staffShoutout: 'Dr. C',
      tone: 'enthusiastic'
    });

    setActiveDraftText(draftText);
    setRedirecting(true);
    setShowPasteGuideModal(true);

    // Copy draft text to clipboard (works on iOS Safari & Android WebViews)
    await copyTextToClipboard(draftText);

    // Fire celebration confetti
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

    // Save feedback in dashboard
    const fullPayload = {
      businessId: business.id,
      businessSlug: business.slug,
      rating,
      sentiment: 'positive',
      tableOrLocation: tableNumber,
      channel: 'QR Scan (Mobile)',
      answers: {
        ...answers,
        positive_highlights: highlights
      },
      generatedReview: {
        tone: 'enthusiastic',
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

    // Direct navigation to the requested Google Maps Review Page URL (Android & iOS)
    const targetUrl = business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE;
    setTimeout(() => {
      redirectToReviewPage(targetUrl);
    }, 1200);
  };

  const handlePrivateSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmittingPrivate(true);

    const fullPayload = {
      businessId: business.id,
      businessSlug: business.slug,
      rating: selectedRating,
      sentiment: selectedRating === 3 ? 'neutral' : 'negative',
      tableOrLocation: tableNumber,
      channel: 'QR Scan (Mobile)',
      answers: {
        ...answers,
        private_manager_alert: privateDetails,
        selected_concerns: answers.selected_options || []
      },
      generatedReview: null,
      recoveryStatus: 'pending_review',
      customerContact: privateContact,
      managerNotes: ''
    };

    setTimeout(() => {
      if (onFinishFeedback) {
        onFinishFeedback(fullPayload);
      }
      setIsSubmittingPrivate(false);
      setPrivateSubmitted(true);
    }, 400);
  };

  const totalEstimatedSteps = 2;
  const currentStepNumber = currentNodeId === 'step_1_rating' ? 1 : 2;
  const progressPct = Math.round((currentStepNumber / totalEstimatedSteps) * 100);

  // Generate 3 review draft variations when rating is 4 or 5
  const threeReviewOptions = generateReviewOptions({
    business,
    rating: selectedRating,
    highlights: answers.selected_options || [ratingThreeOptions.options[0]?.label || ''],
    staffShoutout: 'Dr. C'
  });

  const activeReviewDraft = threeReviewOptions[selectedReviewOptionIndex]?.text || threeReviewOptions[0]?.text || '';

  const renderQuestionContent = () => {
    // STEP 1: Star Rating Selection
    if (currentNodeId === 'step_1_rating') {
      const step1Question = {
        title: business.category === 'restaurant'
          ? `How was your dining experience at ${business.name}?`
          : `How was your dental care experience at ${business.name}?`,
        subtitle: "Tap an emoji to rate your visit today",
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

    // STEP 2: 3 TAILORED OPTIONS FOR CHOSEN STAR RATING
    // Positive Ratings: 4 or 5 Stars
    if (selectedRating >= 4) {
      const selectedList = Array.isArray(answers.selected_options) ? answers.selected_options : [];

      return (
        <div className="space-y-5 animate-slide-up">
          {/* Question Title & Subtitle */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
              <span>{'★'.repeat(selectedRating)}</span>
              <span className="text-slate-500 font-medium">({selectedRating} Stars Selected)</span>
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
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              3 Highlights (Tap to select):
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

          {/* 3 AI Review Draft Options */}
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/90 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-sky-900 font-extrabold">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>3 Review Options (Choose One):</span>
              </div>
              <span className="text-[10px] bg-sky-200/70 text-sky-900 px-2 py-0.5 rounded-full font-bold">
                Auto-Copied on Click
              </span>
            </div>

            {/* 3 Review Option Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1.5">
              {threeReviewOptions.map((option, idx) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedReviewOptionIndex(idx)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                    selectedReviewOptionIndex === idx
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white/90 text-slate-700 hover:bg-white border border-sky-200/60'
                  }`}
                >
                  <div className="truncate">{option.title.split(':')[0]}</div>
                  <div className={`text-[9px] font-medium opacity-85 truncate ${selectedReviewOptionIndex === idx ? 'text-sky-100' : 'text-slate-400'}`}>
                    {option.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Live Review Draft Preview */}
            <p className="text-xs text-slate-700 italic leading-relaxed bg-white/95 p-3 rounded-xl border border-sky-100/80 shadow-2xs">
              "{activeReviewDraft}"
            </p>

            <div className="flex items-center gap-2 text-[10px] text-slate-600 font-semibold pt-0.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0">1</span>
              <span>Tap below to copy chosen review</span>
              <span className="text-slate-300">→</span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0">2</span>
              <span>Paste on Google Maps</span>
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
    }

    // Neutral / Negative Ratings: 1, 2, or 3 Stars (Private Recovery)
    if (privateSubmitted) {
      return (
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Feedback Received Privately</h3>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            Thank you for letting us know. Your message and selected concerns have been escalated directly to management for immediate resolution.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      );
    }

    const selectedList = Array.isArray(answers.selected_options) ? answers.selected_options : [];

    return (
      <form onSubmit={handlePrivateSubmit} className="space-y-4 animate-slide-up">
        {/* Empathetic Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
            <span>{'★'.repeat(selectedRating)}</span>
            <span className="text-slate-500 font-medium">({selectedRating} Star Rating)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
            {ratingThreeOptions.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {ratingThreeOptions.subtitle}
          </p>
        </div>

        {/* 3 Options for 1, 2, or 3 Stars */}
        <div className="space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            3 Primary Issues (Select one):
          </div>
          <div className="space-y-2">
            {ratingThreeOptions.options.map((opt) => {
              const isSelected = selectedList.includes(opt.label);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnswers(prev => ({ ...prev, selected_options: [opt.label] }))}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-500 text-amber-950 shadow-xs ring-1 ring-amber-400/50'
                      : 'bg-white border-slate-200/90 text-slate-700 hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${
                      isSelected ? 'bg-amber-200/60' : 'bg-slate-100'
                    }`}>
                      {opt.emoji}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'bg-amber-600 text-white' : 'border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Details Box */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">
            Additional Details (Optional)
          </label>
          <textarea
            rows={2}
            value={privateDetails}
            onChange={(e) => setPrivateDetails(e.target.value)}
            placeholder="Please share any specifics so management can investigate and follow up..."
            className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        {/* Optional Contact info for manager resolution */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Contact Info for Follow-up (Optional)</span>
            <span className="text-[10px] text-slate-400">100% Private</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={privateContact}
              onChange={(e) => setPrivateContact(e.target.value)}
              placeholder="Email or phone for manager resolution"
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Kept 100% confidential. Will not be posted publicly.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmittingPrivate}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmittingPrivate ? 'Submitting to Management...' : 'Send Privately to Management'}</span>
        </button>
      </form>
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
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
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
                Your 5-star review has been copied. Complete it on Google in 2 quick steps:
              </p>
            </div>

            {/* Step visual instructions */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-left text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>Select <strong>5 Stars</strong> rating on Google</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>Tap review box & tap <strong>"Paste"</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => redirectToReviewPage(business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE)}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98"
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
