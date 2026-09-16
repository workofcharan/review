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
import { generateQrDataUrl } from '../../utils/qrHelper';
import { useApp } from '../../context/AppContext';

export default function BusinessQrModal({ business, isOpen, onClose, onOpenPrintStudio }) {
  const { navigateTo } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const biz = business;
  const baseUrl = window.location.origin + window.location.pathname;
  const targetFeedbackUrl = biz ? `${baseUrl}#/b/${biz.slug}` : '';
  const qrColor = biz?.brandColors?.primary || '#0284c7';

  useEffect(() => {
    if (!isOpen || !biz) return;
    
    let isMounted = true;
    setIsLoading(true);

    async function generate() {
      const url = await generateQrDataUrl(targetFeedbackUrl, {
        darkColor: qrColor,
        lightColor: '#ffffff'
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
  }, [isOpen, biz, targetFeedbackUrl, qrColor]);

  if (!isOpen || !biz) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetFeedbackUrl);
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
    link.download = `${biz.slug}-feedback-qr.png`;
    link.click();
  };

  const handleOpenCustomerFlow = () => {
    onClose();
    navigateTo(`/b/${biz.slug}`);
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
      className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-scale-up">
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
                {biz.type}
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
        <div className="p-6 space-y-5 text-center">
          {/* Instructions */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold border border-sky-200">
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Scan with phone camera or click to test</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Customers scan this code to leave ratings, generate 5★ Google reviews, or route complaints privately.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative mx-auto w-56 h-56 bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 shadow-inner flex items-center justify-center group">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-slate-400 text-xs font-semibold">
                <QrCode className="w-8 h-8 animate-spin text-sky-500" />
                <span>Generating QR Code...</span>
              </div>
            ) : qrDataUrl ? (
              <div className="relative">
                <img
                  src={qrDataUrl}
                  alt={`${biz.name} QR Code`}
                  className="w-48 h-48 object-contain rounded-xl transition-transform group-hover:scale-105 duration-200"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-xs rounded-xl transition-opacity cursor-pointer text-white font-bold text-xs gap-1.5"
                  onClick={handleOpenCustomerFlow}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Flow</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-rose-500 font-semibold">Failed to generate QR</div>
            )}
          </div>

          {/* URL Copy Bar */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Feedback QR Web Link:
            </label>
            <div className="flex items-center gap-2 p-1.5 pl-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-mono text-slate-600 truncate flex-1 select-all">
                {targetFeedbackUrl}
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
          <div className="grid grid-cols-2 gap-2 pt-2">
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
              <span>Test Live Flow</span>
            </button>
          </div>

          {/* Bottom link to Print Studio */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Need table tents or coasters?</span>
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
