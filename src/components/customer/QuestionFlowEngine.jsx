import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';
import EmojiScale from './EmojiScale';
import ChipsQuestion from './ChipsQuestion';
import TextQuestion from './TextQuestion';
import PrivateRecoveryScreen from './PrivateRecoveryScreen';
import confetti from 'canvas-confetti';
import { generateReviewDraft } from '../../utils/aiReviewGenerator';
import { copyTextToClipboard, redirectToReviewPage } from '../../utils/mobileRedirectHelper';

const DR_C_EXACT_REVIEW_PAGE = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export default function QuestionFlowEngine({
  business,
  tableNumber = 'Reception / Operatory',
  onFinishFeedback
}) {
  const flow = business.questionFlow || {};
  const [currentNodeId, setCurrentNodeId] = useState(flow.start || 'overall_experience');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [showPasteGuideModal, setShowPasteGuideModal] = useState(false);
  const [activeDraftText, setActiveDraftText] = useState('');

  const currentQuestion = flow.questions ? flow.questions[currentNodeId] : null;

  const handleAnswerChange = (val) => {
    setAnswers(prev => ({
      ...prev,
      [currentNodeId]: val
    }));
  };

  const getNextNodeId = (question, answerValue) => {
    if (!question || !question.next) return 'direct_submit';

    if (typeof answerValue === 'string' || typeof answerValue === 'number') {
      const key = String(answerValue);
      if (question.next[key]) return question.next[key];
    }

    if (Array.isArray(answerValue)) {
      for (const item of answerValue) {
        if (question.next[item]) {
          return question.next[item];
        }
      }
    }

    if (question.type === 'emoji_scale') {
      const rating = Number(answerValue);
      if (rating >= (business.minPublicRating || 4)) {
        if (question.next['5'] || question.next['positive']) return question.next['5'] || question.next['positive'];
      } else {
        if (question.next['1'] || question.next['negative']) return question.next['1'] || question.next['negative'];
      }
    }

    if (question.next.default) {
      return question.next.default;
    }

    const overall = answers.overall_experience || 5;
    return overall >= (business.minPublicRating || 4) 
      ? 'direct_submit' 
      : 'private_manager_alert';
  };

  const advanceToNext = (overrideValue) => {
    const val = overrideValue !== undefined ? overrideValue : answers[currentNodeId];
    const nextId = getNextNodeId(currentQuestion, val);

    if (nextId === 'direct_submit') {
      handleDirectGoogleSubmit();
      return;
    }

    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentNodeId(previous);
  };

  // Direct Submit & Immediate Browser Redirect to the Exact Google Maps Review Page (iOS & Android Compatible)
  const handleDirectGoogleSubmit = async () => {
    const highlights = answers.positive_highlights || [];
    const rating = Number(answers.overall_experience || 5);
    
    // 1. Synthesize review draft
    const draftText = generateReviewDraft({
      business,
      rating,
      highlights,
      staffShoutout: 'Dr. C',
      tone: 'enthusiastic'
    });

    setActiveDraftText(draftText);
    setRedirecting(true);
    setShowPasteGuideModal(true);

    // 2. Copy draft text to clipboard (works on iOS Safari & Android WebViews)
    await copyTextToClipboard(draftText);

    // 3. Fire celebration confetti
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

    // 4. Save feedback in dashboard
    const fullPayload = {
      businessId: business.id,
      businessSlug: business.slug,
      rating,
      sentiment: 'positive',
      tableOrLocation: tableNumber,
      channel: 'QR Scan (Mobile)',
      answers: {
        ...answers
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

    // 5. Direct navigation to the requested Google Maps Review Page URL (Android & iOS)
    const targetUrl = business.publicReviewUrl || DR_C_EXACT_REVIEW_PAGE;
    setTimeout(() => {
      redirectToReviewPage(targetUrl);
    }, 1200);
  };

  const handleCompleteSubmission = (extraData = {}) => {
    const rating = Number(answers.overall_experience || 5);
    const sentiment = rating >= (business.minPublicRating || 4) 
      ? 'positive' 
      : rating === 3 
        ? 'neutral' 
        : 'negative';

    const fullPayload = {
      businessId: business.id,
      businessSlug: business.slug,
      rating,
      sentiment,
      tableOrLocation: tableNumber,
      channel: 'QR Scan (Mobile)',
      answers: {
        ...answers,
        ...(extraData.answers || {})
      },
      generatedReview: extraData.generatedReview || null,
      recoveryStatus: extraData.recoveryStatus || (rating >= 4 ? 'none_needed' : 'pending_review'),
      customerContact: extraData.customerContact || '',
      managerNotes: ''
    };

    if (onFinishFeedback) {
      onFinishFeedback(fullPayload);
    }
  };

  const totalEstimatedSteps = 2;
  const currentStepNumber = currentNodeId === 'overall_experience' ? 1 : 2;
  const progressPct = Math.round((currentStepNumber / totalEstimatedSteps) * 100);

  const renderQuestionContent = () => {
    if (currentNodeId === 'private_manager_alert' || currentNodeId === 'private_resolution') {
      return (
        <PrivateRecoveryScreen
          business={business}
          answers={answers}
          onComplete={handleCompleteSubmission}
        />
      );
    }

    if (!currentQuestion) {
      return (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Thank you for your feedback!</h3>
          <p className="text-sm text-slate-600">Redirecting to Google Review page...</p>
        </div>
      );
    }

    return (
      <div className="space-y-5 animate-slide-up">
        {/* Step Indicator Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Step {currentStepNumber} of 2
          </span>
          <span className="text-[11px] font-semibold text-slate-400">
            {progressPct}% Complete
          </span>
        </div>

        {/* Question Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {currentQuestion.title || currentQuestion.text}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {currentQuestion.subtitle}
            </p>
          )}
        </div>

        {/* Question Input Type */}
        {currentQuestion.type === 'emoji_scale' && (
          <EmojiScale
            question={currentQuestion}
            selectedValue={answers[currentNodeId]}
            onSelect={(val) => {
              handleAnswerChange(val);
              setTimeout(() => {
                advanceToNext(val);
              }, 200);
            }}
          />
        )}

        {currentQuestion.type === 'chips_multiselect' && (() => {
          const selectedChips = answers[currentNodeId] || [];
          const liveDraft = generateReviewDraft({
            business,
            rating: Number(answers.overall_experience || 5),
            highlights: selectedChips,
            staffShoutout: 'Dr. C',
            tone: 'enthusiastic'
          });

          return (
            <div className="space-y-4">
              <ChipsQuestion
                question={currentQuestion}
                selectedValue={selectedChips}
                isMulti={true}
                onSelect={handleAnswerChange}
              />

              {/* Generated Review Live Preview Card */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-sky-900 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Your Ready-to-Paste Google Review:</span>
                  </div>
                  <span className="text-[10px] bg-sky-200/60 text-sky-800 px-2 py-0.5 rounded-full font-semibold">
                    Auto-Copied on Click
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed bg-white/90 p-2.5 rounded-xl border border-sky-100">
                  "{liveDraft}"
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0">1</span>
                  <span>Tap below to copy</span>
                  <span className="text-slate-400">→</span>
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0">2</span>
                  <span><strong>Paste</strong> directly on Google</span>
                </div>
              </div>

              {/* Direct Google Review Redirection Button */}
              <button
                type="button"
                onClick={handleDirectGoogleSubmit}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
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
        })()}

        {currentQuestion.type === 'chips_single' && (
          <div className="space-y-5">
            <ChipsQuestion
              question={currentQuestion}
              selectedValue={answers[currentNodeId] || ''}
              isMulti={false}
              onSelect={(val) => {
                handleAnswerChange(val);
                setTimeout(() => advanceToNext(val), 200);
              }}
            />
          </div>
        )}

        {currentQuestion.type === 'free_text' && (
          <div className="space-y-5">
            <TextQuestion
              question={currentQuestion}
              value={answers[currentNodeId] || ''}
              onChange={handleAnswerChange}
            />
            <button
              type="button"
              disabled={redirecting}
              onClick={handleDirectGoogleSubmit}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>Go to Google Review Page</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Top Header Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xl relative overflow-hidden bg-white">
        {/* Top bar with back button & progress */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          {history.length > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-base">{business.logo}</span>
              <span className="font-bold text-slate-900">{business.name}</span>
            </div>
          )}

          {/* Location & Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-medium">
              Step {currentStepNumber} of 2
            </span>
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main dynamic question node */}
        {renderQuestionContent()}

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium">Direct Google Review Redirect</span>
          </div>
          <span className="text-slate-400">{business.name}</span>
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
