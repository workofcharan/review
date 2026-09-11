import React, { useState } from 'react';
import { Gift, Check, Copy, Sparkles, X } from 'lucide-react';

export default function RewardModal({ business, onClose }) {
  const perk = business?.perkOffer || {
    title: "10% Off Your Next Visit",
    code: "REV-VIP10",
    validDays: 30
  };

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(perk.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-amber-300 p-6 text-center shadow-2xl space-y-5 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gift Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-md">
          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
            <Gift className="w-8 h-8 text-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>VIP Reward Unlocked</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {perk.title}
          </h3>
          <p className="text-xs text-slate-600">
            Show this digital voucher to your server or cashier on your next visit to {business.name}.
          </p>
        </div>

        {/* Voucher Code Box */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border-2 border-dashed border-amber-400 flex items-center justify-between gap-2">
          <div className="text-left">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Voucher Promo Code</div>
            <div className="font-mono text-lg font-bold text-amber-800 tracking-wider">
              {perk.code}
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Validity */}
        <div className="text-[11px] text-slate-500 font-medium">
          Valid for {perk.validDays} days from today. One-time use per party.
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-xs"
        >
          Done & Return to Homepage
        </button>
      </div>
    </div>
  );
}
