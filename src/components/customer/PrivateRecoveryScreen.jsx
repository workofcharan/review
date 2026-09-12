import React, { useState } from 'react';
import { ShieldCheck, Send, Mail, HeartHandshake } from 'lucide-react';

export default function PrivateRecoveryScreen({ 
  business, 
  answers, 
  onComplete
}) {
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onComplete({
        answers: {
          ...answers,
          private_manager_alert: details
        },
        customerContact: contact,
        recoveryStatus: 'pending_review'
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">Message Delivered Privately</h3>
        <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Thank you for letting us know. Your feedback has been escalated directly to management for immediate review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-in">
      {/* Empathetic Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
          <HeartHandshake className="w-4 h-4 text-amber-600" />
          <span>Direct to General Management</span>
        </div>
        <p className="text-xs text-amber-800/90 leading-relaxed">
          We are sincerely sorry your visit didn't meet expectations. Your message bypasses public algorithms and is routed straight to our leadership team.
        </p>
      </div>

      {/* Details Box */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">
          How can we make this right?
        </label>
        <textarea
          required
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Please share any specifics (timing, table, order, or staff interaction) so we can investigate and fix it immediately..."
          className="w-full rounded-xl bg-white border border-slate-300 p-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none shadow-xs"
        />
      </div>

      {/* Contact info for resolution */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>Contact Info for Follow-up (Optional)</span>
          <span className="text-[10px] text-slate-500 font-semibold">Kept 100% Private</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number for manager compensation"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Privacy guarantee note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Private message guarantee: Will never be posted on public directories.</span>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !details.trim()}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Sending to Management...' : 'Send Private Message to General Manager'}</span>
        </button>
      </div>
    </form>
  );
}
