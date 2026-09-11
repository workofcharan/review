import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import EmojiScale from './EmojiScale';
import ChipsQuestion from './ChipsQuestion';
import TextQuestion from './TextQuestion';
import PositiveReviewScreen from './PositiveReviewScreen';
import PrivateRecoveryScreen from './PrivateRecoveryScreen';
import RewardModal from './RewardModal';

export default function QuestionFlowEngine({
  business,
  tableNumber = 'Table 12',
  onFinishFeedback
}) {
  const flow = business.questionFlow || {};
  const [currentNodeId, setCurrentNodeId] = useState(flow.start || 'overall_experience');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showRewardModal, setShowRewardModal] = useState(false);

  const currentQuestion = flow.questions ? flow.questions[currentNodeId] : null;

  const handleAnswerChange = (val) => {
    setAnswers(prev => ({
      ...prev,
      [currentNodeId]: val
    }));
  };

  const getNextNodeId = (question, answerValue) => {
    if (!question || !question.next) return 'completion_screen';

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
        if (question.next['positive']) return question.next['positive'];
      } else if (rating === 3) {
        if (question.next['neutral']) return question.next['neutral'];
      } else {
        if (question.next['negative']) return question.next['negative'];
      }
    }

    if (question.next.default) {
      return question.next.default;
    }

    const overall = answers.overall_experience || 5;
    return overall >= (business.minPublicRating || 4) 
      ? 'ai_review_screen' 
      : 'private_manager_alert';
  };

  const advanceToNext = (overrideValue) => {
    const val = overrideValue !== undefined ? overrideValue : answers[currentNodeId];
    const nextId = getNextNodeId(currentQuestion, val);

    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentNodeId(previous);
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

  const totalEstimatedSteps = 4;
  const currentStepNumber = Math.min(history.length + 1, totalEstimatedSteps);
  const progressPct = Math.round((currentStepNumber / totalEstimatedSteps) * 100);

  const renderQuestionContent = () => {
    if (currentNodeId === 'ai_review_screen') {
      return (
        <PositiveReviewScreen
          business={business}
          answers={answers}
          onComplete={handleCompleteSubmission}
          onOpenPerk={() => setShowRewardModal(true)}
        />
      );
    }

    if (currentNodeId === 'private_manager_alert' || currentNodeId === 'private_resolution') {
      return (
        <PrivateRecoveryScreen
          business={business}
          answers={answers}
          onComplete={handleCompleteSubmission}
          onOpenPerk={() => setShowRewardModal(true)}
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
          <p className="text-sm text-slate-600">Your insights help us continuously elevate our service.</p>
          <button
            onClick={() => setShowRewardModal(true)}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm"
          >
            Claim VIP Voucher
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-5 animate-slide-up">
        {/* Question Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {currentQuestion.title || currentQuestion.text}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
              }, 250);
            }}
          />
        )}

        {currentQuestion.type === 'chips_multiselect' && (
          <div className="space-y-5">
            <ChipsQuestion
              question={currentQuestion}
              selectedValue={answers[currentNodeId] || []}
              isMulti={true}
              onSelect={handleAnswerChange}
            />
            <button
              type="button"
              onClick={() => advanceToNext()}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

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
              onClick={() => advanceToNext()}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>{answers[currentNodeId] ? 'Generate AI Review Draft' : 'Skip & Continue'}</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
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
              {tableNumber}
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
            <span className="font-medium">Verified Guest Portal</span>
          </div>
          <span className="text-slate-400">Powered by RevPulse AI</span>
        </div>
      </div>

      {/* Reward Modal */}
      {showRewardModal && (
        <RewardModal
          business={business}
          onClose={() => {
            setShowRewardModal(false);
            window.location.hash = '/';
          }}
        />
      )}
    </div>
  );
}
