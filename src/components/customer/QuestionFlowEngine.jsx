import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  HeartHandshake,
  Send,
  Mail,
  ArrowRight
} from 'lucide-react';
import EmojiScale from './EmojiScale';
import { generateReviewDraft, getThreeOptionsForRating, getStaffLabelForBusiness, inferCategoryFromBusiness } from '../../utils/aiReviewGenerator';
import { copyTextToClipboard, redirectToReviewPage } from '../../utils/mobileRedirectHelper';

export default function QuestionFlowEngine({
  business,
  tableNumber = 'Reception / Operatory',
  onFinishFeedback
}) {
  const fallbackReviewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business?.name || 'Local Business')}`;
  const targetGoogleUrl = business?.publicReviewUrl || fallbackReviewUrl;

  const questionFlow = business?.questionFlow || {};
  const questions = questionFlow.questions || {};
  const startNodeId = questionFlow.start || Object.keys(questions)[0] || 'overall_experience';

  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [activeDraftText, setActiveDraftText] = useState('');
  const [scanSeed, setScanSeed] = useState(() => Date.now() + Math.floor(Math.random() * 10000000));
  
  // Private resolution state
  const [privateDetails, setPrivateDetails] = useState('');
  const [privateContact, setPrivateContact] = useState('');
  const [privateSubmitting, setPrivateSubmitting] = useState(false);
  const [privateCompleted, setPrivateCompleted] = useState(false);

  const selectedRating = Number(answers.overall_experience || 5);
  const ratingThreeOptions = getThreeOptionsForRating(business, selectedRating, scanSeed);

  // Get current node definition or fallback
  const currentNode = questions[currentNodeId] || {
    id: currentNodeId,
    type: currentNodeId === 'overall_experience' ? 'emoji_scale' : 'chips_multiselect',
    title: `How was your experience at ${business?.name || 'our location'}?`,
    subtitle: 'Tap an emoji to rate your visit today',
    options: ['Great Customer Service', 'Quick & Friendly', 'Clean Environment', 'Top Quality'],
    next: { default: 'direct_submit' }
  };

  const handleSelectRating = (ratingVal) => {
    const num = Number(ratingVal);
    const newSeed = Date.now() + Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 9999);
    setScanSeed(newSeed);

    const ratingOpts = getThreeOptionsForRating(business, num, newSeed);
    const initialHighlight = ratingOpts.options[0]?.label || '';

    setAnswers(prev => ({
      ...prev,
      overall_experience: num,
      [currentNodeId]: num,
      selected_options: [initialHighlight]
    }));

    // In 2-step flow, always advance to Step 2 (rating suggestions) for ALL star ratings (1★-5★)
    const targetBranch = 'positive_highlights';

    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(targetBranch);
  };

  const handleToggleChip = (optionLabel, isMulti = true) => {
    const currentList = Array.isArray(answers.selected_options) ? answers.selected_options : [];
    let updated;
    if (isMulti) {
      if (currentList.includes(optionLabel)) {
        updated = currentList.length > 1 ? currentList.filter(item => item !== optionLabel) : currentList;
      } else {
        updated = [...currentList, optionLabel];
      }
    } else {
      updated = [optionLabel];
    }

    setActiveDraftText('');
    setAnswers(prev => ({
      ...prev,
      selected_options: updated,
      [currentNodeId]: updated
    }));
  };

  const handleAdvanceToNext = () => {
    const nextTarget = currentNode.next?.default || 'direct_submit';
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(nextTarget);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prevNodeId = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentNodeId(prevNodeId);
  };

  // Direct Submit & Immediate Browser Redirect to Google Maps Review Page
  const handleDirectGoogleSubmit = async (chosenDraft) => {
    const highlights = answers.selected_options || answers[currentNodeId] || [];
    const rating = selectedRating;
    
    // Synthesize review draft
    const draftText = chosenDraft || activeDraftText || generateReviewDraft({
      business,
      rating,
      highlights: Array.isArray(highlights) ? highlights : [String(highlights)],
      staffShoutout: getStaffLabelForBusiness(business),
      tone: 'enthusiastic',
      scanSeed
    });

    setActiveDraftText(draftText);
    setRedirecting(true);

    // Copy draft text to clipboard (iOS Safari & Android WebViews)
    await copyTextToClipboard(draftText);

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

    // Immediate direct navigation to Google Maps Review Page URL
    redirectToReviewPage(targetGoogleUrl);
  };

  // Submit private manager escalation
  const handlePrivateResolutionSubmit = (e) => {
    e.preventDefault();
    setPrivateSubmitting(true);

    setTimeout(() => {
      const fullPayload = {
        businessId: business.id,
        businessSlug: business.slug,
        rating: selectedRating,
        sentiment: 'negative',
        tableOrLocation: tableNumber,
        channel: 'QR Scan (Mobile)',
        answers: {
          ...answers,
          private_manager_alert: privateDetails
        },
        generatedReview: null,
        recoveryStatus: 'pending_review',
        customerContact: privateContact,
        managerNotes: 'Confidential message submitted through private QR resolution gate.'
      };

      if (onFinishFeedback) {
        onFinishFeedback(fullPayload);
      }

      setPrivateSubmitting(false);
      setPrivateCompleted(true);
    }, 400);
  };

  // Submit confidential feedback directly from Step 2
  const handlePrivateResolutionFromStep2 = () => {
    setPrivateSubmitting(true);
    const chosenHighlights = answers.selected_options || answers[currentNodeId] || [];
    const highlightsText = Array.isArray(chosenHighlights) ? chosenHighlights.join(', ') : String(chosenHighlights);

    setTimeout(() => {
      const fullPayload = {
        businessId: business.id,
        businessSlug: business.slug,
        rating: selectedRating,
        sentiment: selectedRating === 3 ? 'neutral' : 'negative',
        tableOrLocation: tableNumber,
        channel: 'QR Scan (Mobile)',
        answers: {
          ...answers,
          feedback_points: chosenHighlights,
          private_manager_alert: `Key customer concerns selected: ${highlightsText}`
        },
        generatedReview: null,
        recoveryStatus: 'pending_review',
        customerContact: privateContact || '',
        managerNotes: 'Confidential feedback submitted directly via 2-step smart QR feedback.'
      };

      if (onFinishFeedback) {
        onFinishFeedback(fullPayload);
      }

      setPrivateSubmitting(false);
      setPrivateCompleted(true);
    }, 400);
  };

  // Generate authentic AI review draft tailored to current answers
  const activeReviewDraft = generateReviewDraft({
    business,
    rating: selectedRating,
    highlights: answers.selected_options || (Array.isArray(currentNode.options) ? [currentNode.options[0]] : ['Great Customer Service']),
    staffShoutout: getStaffLabelForBusiness(business),
    scanSeed
  });

  const isPublicPositiveRating = selectedRating >= (business?.minPublicRating || 4);
  const isPositiveTerminal = currentNodeId === 'direct_submit' || 
    currentNodeId === 'ai_review_screen' || 
    (currentNode.type === 'chips_multiselect' && (!currentNode.next?.default || currentNode.next?.default === 'direct_submit' || currentNode.next?.default === 'ai_review_screen'));

  const renderContent = () => {
    // 1. Private Resolution Completed Confirmation
    if (privateCompleted || currentNodeId === 'completion_screen') {
      return (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            ✓
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">Message Delivered Privately</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Thank you for letting us know. Your note has been escalated directly to our leadership team for immediate resolution.
            </p>
          </div>
          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kept 100% Confidential</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. Private Resolution Form (1-3 Star Recovery Gate)
    if (currentNode.type === 'private_resolution' || currentNodeId === 'private_manager_alert') {
      return (
        <form onSubmit={handlePrivateResolutionSubmit} className="space-y-4 animate-slide-up">
          {/* Empathetic Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-800 text-xs">
              <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Direct to General Management</span>
            </div>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              {currentNode.subtitle || "We are sincerely sorry your visit didn't meet expectations. Your message bypasses public directories and goes straight to our leadership team."}
            </p>
          </div>

          {/* Details Box */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              {currentNode.title || 'How can we make this right?'}
            </label>
            <textarea
              required
              rows={3}
              value={privateDetails}
              onChange={(e) => setPrivateDetails(e.target.value)}
              placeholder={currentNode.placeholder || "Please share any specifics (timing, order, or service interaction) so we can investigate and make it right..."}
              className="w-full rounded-2xl bg-slate-50 border border-slate-300 p-3 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none shadow-xs font-medium"
            />
          </div>

          {/* Contact info for resolution */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Contact Info for Follow-up (Optional)</span>
              <span className="text-[10px] text-slate-400 font-semibold">Kept Private</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={privateContact}
                onChange={(e) => setPrivateContact(e.target.value)}
                placeholder="Email or phone number for manager follow-up"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={privateSubmitting || !privateDetails.trim()}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 disabled:opacity-50 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{privateSubmitting ? 'Sending to Management...' : 'Send Private Message to Leadership'}</span>
          </button>
        </form>
      );
    }

    // 3. 5-Point Sentiment Scale Node (Emoji / Stars)
    if (currentNode.type === 'emoji_scale' || currentNodeId === 'overall_experience') {
      const dynamicTitle = currentNode.title || `How was your experience at ${business?.name || 'our location'}?`;
      const dynamicSubtitle = currentNode.subtitle || "Tap an emoji to rate your visit today (Step 1 of 2)";

      const stepQuestion = {
        title: dynamicTitle,
        subtitle: dynamicSubtitle,
        options: currentNode.options || [
          { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
          { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
          { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
          { value: 4, label: "Good", emoji: "😊", sentiment: "positive" },
          { value: 5, label: "Excellent!", emoji: "🤩", sentiment: "positive" },
        ]
      };

      return (
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {stepQuestion.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              {stepQuestion.subtitle}
            </p>
          </div>

          <EmojiScale
            question={stepQuestion}
            selectedValue={answers.overall_experience}
            onSelect={(val) => handleSelectRating(val)}
          />
        </div>
      );
    }

    // 4. Free Text Question Node
    if (currentNode.type === 'free_text') {
      return (
        <div className="space-y-4 animate-slide-up">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
              {currentNode.title || 'Any extra details or staff shoutouts?'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {currentNode.subtitle || 'Please share your thoughts (optional)'}
            </p>
          </div>

          <textarea
            rows={4}
            value={answers[currentNodeId] || ''}
            onChange={(e) => setAnswers(prev => ({ ...prev, [currentNodeId]: e.target.value }))}
            placeholder={currentNode.placeholder || 'Type here...'}
            className="w-full rounded-2xl bg-slate-50 border border-slate-300 p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none font-medium"
          />

          <button
            type="button"
            onClick={handleAdvanceToNext}
            className="w-full py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    }

    // 5. Exactly 3 Dynamic Suggestions (Per Scan) + AI Review Draft + Google Redirection
    const selectedList = Array.isArray(answers.selected_options) ? answers.selected_options : [];
    const displayedOptions = (ratingThreeOptions.options || []).slice(0, 3);
    const ratingColor = selectedRating >= 4 ? 'text-amber-500' : selectedRating === 3 ? 'text-amber-600' : 'text-rose-500';

    return (
      <div className="space-y-4 animate-slide-up">
        {/* Title & Star Badges */}
        <div className="space-y-1">
          <div className={`flex items-center gap-1.5 text-xs font-bold ${ratingColor}`}>
            <span>{'★'.repeat(selectedRating)}</span>
            <span className="text-slate-500 font-medium">({selectedRating} {selectedRating === 1 ? 'Star' : 'Stars'} Selected)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
            {ratingThreeOptions.title || currentNode.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {ratingThreeOptions.subtitle || currentNode.subtitle}
          </p>
        </div>

        {/* Exactly 3 Dynamic Highlight Suggestions (Rotated per scan) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>Select Key Highlights:</span>
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
              className="text-[10px] text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>↻ Shuffle Options</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {displayedOptions.map((opt, idx) => {
              const label = typeof opt === 'string' ? opt : opt.label || opt.name || String(opt);
              const emoji = typeof opt === 'object' && opt.emoji ? opt.emoji : '✨';
              const desc = typeof opt === 'object' && opt.desc ? opt.desc : `Top quality ${label.toLowerCase()}`;
              const isSelected = selectedList.includes(label);
              return (
                <button
                  key={opt.id || idx}
                  type="button"
                  onClick={() => handleToggleChip(label, currentNode.type !== 'chips_single')}
                  className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 transform active:scale-[0.99] cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-xs ring-1 ring-sky-400/50 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50/30 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 transition-transform ${
                      isSelected ? 'bg-sky-200/60 scale-105' : 'bg-slate-100'
                    }`}>
                      {emoji}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {label}
                      </div>
                      {desc && (
                        <div className="text-[10px] text-slate-500 leading-tight line-clamp-1">
                          {desc}
                        </div>
                      )}
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

        {/* Action Button: Google Maps for 4-5 Stars, Confidential Resolution for 1-3 Stars */}
        {isPublicPositiveRating ? (
          <>
            <button
              type="button"
              onClick={() => handleDirectGoogleSubmit(activeDraftText || activeReviewDraft)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
            >
              {redirecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Opening Google Review Page...</span>
                </div>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Review & Post on Google Maps</span>
                  <ExternalLink className="w-4 h-4 opacity-85" />
                </>
              )}
            </button>

            {redirecting && (
              <a
                href={targetGoogleUrl}
                target="_top"
                rel="noopener noreferrer"
                className="block text-center text-xs text-sky-700 font-bold underline animate-pulse py-1"
              >
                Tap here if not opened automatically →
              </a>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={handlePrivateResolutionFromStep2}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-black text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
          >
            {privateSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Delivering to Management...</span>
              </div>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Send Confidential Feedback to Management</span>
                <HeartHandshake className="w-4 h-4 opacity-85" />
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Top Header Card */}
      <div className="rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xl shadow-slate-200/60 relative overflow-hidden bg-white">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          {history.length > 0 && !privateCompleted ? (
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

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              {history.length === 0 ? 'Step 1' : 'Step 2'}
            </span>
          </div>
        </div>

        {/* Main dynamic question node */}
        {renderContent()}

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Customer Flow</span>
          </div>
          <span className="text-slate-400 font-medium truncate max-w-[120px]">{business.name}</span>
        </div>
      </div>
    </div>
  );
}
