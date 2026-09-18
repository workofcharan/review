import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Smartphone, 
  Printer, 
  Sparkles,
  Share2
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Smartphone, 
  Printer, 
  Sparkles,
  Star,
  Globe
} from 'lucide-react';
import { generateQrDataUrl, buildFeedbackUrl } from '../../utils/qrHelper';
import { useApp } from '../../context/AppContext';

const DEFAULT_REVIEW_URL = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export default function BusinessQrModal({ business, isOpen, onClose, onOpenPrintStudio }) {
  const { navigateTo } = useApp();
  const [qrMode, setQrMode] = useState('feedback_flow'); // 'feedback_flow' or 'direct_google'
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const biz = business;
  const qrColor = biz?.brandColors?.primary || '#0284c7';

  // Determine active destination URL based on selected mode
  const feedbackFlowUrl = biz ? buildFeedbackUrl(biz.slug) : '';
  const directGoogleUrl = biz?.publicReviewUrl || DEFAULT_REVIEW_URL;
  const activeUrl = qrMode === 'direct_google' ? directGoogleUrl : feedbackFlowUrl;

  useEffect(() => {
    if (!isOpen || !biz) return;
    
    let isMounted = true;
    setIsLoading(true);

    async function generate() {
      const url = await generateQrDataUrl(activeUrl, {
        darkColor: qrColor,
        lightColor: '#ffffff',
        width: 600
      });
      if (isMounted) {
        setQrDataUrl(url || '');
        setIsLoading(false);
      }
    }

    generate();

    return () => {
      isMounted = false;
    };
  }, [isOpen, biz, activeUrl, qrColor]);

  if (!isOpen || !biz) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${biz.slug}-${qrMode}-qr.png`;
    link.click();
  };

  const handleOpenCustomerFlow = () => {
    onClose();
    if (qrMode === 'direct_google') {
      window.open(directGoogleUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo(`/b/${biz.slug}`);
    }
  };

  const handleOpenStudio = () => {
    onClose();
    if (onOpenPrintStudio) {
      onOpenPrintStudio(biz.id);
    } else {
      navigateTo('/dashboard');
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-5 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md border border-white/20"
              style={{ backgroundColor: qrColor }}
            >
              {biz.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {biz.name}
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white/20 text-white uppercase">
                  QR Live
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate max-w-[220px]">
                {biz.type || 'Smart QR Feedback Profile'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-center">
          {/* QR Destination Mode Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-left">
              QR Destination Mode:
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setQrMode('feedback_flow')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  qrMode === 'feedback_flow'
                    ? 'bg-white text-sky-700 shadow-xs ring-1 ring-sky-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Smart 2-Step Flow</span>
              </button>

              <button
                type="button"
                onClick={() => setQrMode('direct_google')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  qrMode === 'direct_google'
                    ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Direct Google Link</span>
              </button>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="relative mx-auto w-52 h-52 bg-slate-50 p-3.5 rounded-3xl border-2 border-slate-200 shadow-inner flex items-center justify-center group">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-slate-400 text-xs font-semibold">
                <QrCode className="w-8 h-8 animate-spin text-sky-500" />
                <span>Generating High-Res QR...</span>
              </div>
            ) : qrDataUrl ? (
              <div className="relative">
                <img
                  src={qrDataUrl}
                  alt={`${biz.name} QR Code`}
                  className="w-44 h-44 object-contain rounded-xl transition-transform group-hover:scale-105 duration-200"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/70 backdrop-blur-2xs rounded-xl transition-opacity cursor-pointer text-white font-bold text-xs gap-1.5"
                  onClick={handleOpenCustomerFlow}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{qrMode === 'direct_google' ? 'Open Google Link' : 'Launch Live Flow'}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-rose-500 font-semibold">Failed to generate QR</div>
            )}
          </div>

          {/* URL Copy Bar */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Scanned Target Destination:</span>
              <span className="text-[10px] text-slate-400 font-mono font-normal">
                {qrMode === 'direct_google' ? 'Google Review Page' : 'Customer Feedback UX'}
              </span>
            </label>
            <div className="flex items-center gap-2 p-1.5 pl-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-mono text-slate-600 truncate flex-1 select-all">
                {activeUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all shrink-0 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCustomerFlow}
              className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{qrMode === 'direct_google' ? 'Test Google Link' : 'Test Flow'}</span>
            </button>
          </div>

          {/* Bottom link to Print Studio */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Print table tents or stickers:</span>
            <button
              type="button"
              onClick={handleOpenStudio}
              className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Open Print Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
