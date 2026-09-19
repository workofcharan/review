import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Sliders,
  Sparkles,
  Eye,
  Palette,
  Image as ImageIcon,
  Star,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateQrDataUrl, buildFeedbackUrl } from '../../utils/qrHelper';

export default function QrStudioTab() {
  const { activeBusiness } = useApp();

  const [cardFormat, setCardFormat] = useState('table_tent');
  const [tabletopBg, setTabletopBg] = useState('studio'); // studio, wood, marble
  const [headline, setHeadline] = useState('How was your visit today?');
  const [subheadline, setSubheadline] = useState('Scan to rate & share your feedback in seconds');
  const [qrColor, setQrColor] = useState(activeBusiness?.brandColors?.primary || '#0284c7');
  const [tableLabel, setTableLabel] = useState('Table #');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Sync color with activeBusiness changes
  useEffect(() => {
    if (activeBusiness?.brandColors?.primary) {
      setQrColor(activeBusiness.brandColors.primary);
    }
  }, [activeBusiness]);

  // QR always routes compulsorily through the Smart 2-Step Flow
  const targetFeedbackUrl = activeBusiness ? buildFeedbackUrl(activeBusiness) : '';

  useEffect(() => {
    let isMounted = true;
    async function loadQr() {
      if (!targetFeedbackUrl) return;
      const url = await generateQrDataUrl(targetFeedbackUrl, {
        darkColor: '#0f172a',
        lightColor: '#ffffff',
        width: 600,
        margin: 3,
        errorCorrectionLevel: 'M'
      });
      if (isMounted) {
        setQrDataUrl(url || '');
      }
    }
    loadQr();
    return () => {
      isMounted = false;
    };
  }, [targetFeedbackUrl, activeBusiness]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetFeedbackUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${activeBusiness.slug}-smart-flow-qr.png`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">QR Code Studio & Collateral Generator</h2>
          <p className="text-xs text-slate-500">
            Generate customized, print-ready table tents, coaster cards, and stickers linked to {activeBusiness.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isCopied ? 'Link Copied!' : 'Copy Scanned URL'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Table Flyer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customizer Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="saas-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-sky-600 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Design & Layout Settings</h3>
            </div>

            {/* Template Format Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Collateral Format:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'table_tent', label: 'A5 Table Tent', desc: 'Foldable tent card' },
                  { id: 'acrylic', label: 'Acrylic Stand', desc: 'Square 4x4 card' },
                  { id: 'coaster', label: 'Coaster Disc', desc: 'Circular drink mat' },
                  { id: 'receipt', label: 'Bill Insert', desc: 'Compact slip' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCardFormat(item.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      cardFormat === item.id
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-1 ring-sky-400 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Texture Scene */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Mockup Backdrop Scene:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'studio', label: 'Clean Studio' },
                  { id: 'marble', label: 'White Marble' },
                  { id: 'wood', label: 'Dark Walnut' },
                ].map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setTabletopBg(bg.id)}
                    className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                      tabletopBg === bg.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Card Headline:</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
              />
            </div>

            {/* Subtitle / CTA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Subheader / Instruction:</label>
              <input
                type="text"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Table Number Placeholder */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Table / Location Tag:</label>
              <input
                type="text"
                value={tableLabel}
                onChange={(e) => setTableLabel(e.target.value)}
                placeholder="e.g. Table # / Room #"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Color Accent Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">QR Code Accent Color:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-300"
                />
                <span className="font-mono text-xs text-slate-700 font-bold uppercase">{qrColor}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleDownloadPng}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Flyer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Tabletop Scene Mockup ({cardFormat.replace('_', ' ')})</span>
          </div>

          {/* Background environment container */}
          <div className={`w-full rounded-3xl p-8 sm:p-12 flex items-center justify-center transition-all ${
            tabletopBg === 'marble'
              ? 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 border border-slate-300'
              : tabletopBg === 'wood'
                ? 'bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900 border border-neutral-800'
                : 'bg-slate-100 border border-slate-200'
          }`}>
            {/* Printable & Interactive Preview Card */}
            <div 
              id="printable-qr-card"
              className={`w-full max-w-xs bg-white text-slate-900 shadow-2xl rounded-3xl p-7 flex flex-col items-center text-center relative border-4 transition-all duration-300 transform hover:scale-[1.02] ${
                cardFormat === 'coaster' ? 'rounded-full aspect-square justify-center' : ''
              }`}
              style={{ borderColor: qrColor }}
            >
              {/* Top Business Logo */}
              <div className="mb-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl text-white shadow-md mx-auto"
                  style={{ backgroundColor: qrColor }}
                >
                  {activeBusiness.logo}
                </div>
                <h4 className="font-extrabold text-base text-slate-950 mt-2 tracking-tight">
                  {activeBusiness.name}
                </h4>
              </div>

              {/* Headline */}
              <h5 className="font-bold text-sm text-slate-800 leading-snug max-w-xs">
                {headline}
              </h5>

              {/* QR Image Container */}
              <div className="my-4 p-3 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Scan QR code for feedback"
                    className="w-44 h-44 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-slate-400">
                    Generating...
                  </div>
                )}
              </div>

              {/* Subheadline & Table Tag */}
              <p className="text-xs text-slate-600 font-medium max-w-xs leading-relaxed">
                {subheadline}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono font-semibold text-slate-500">{tableLabel} ___</span>
                <span className="font-bold" style={{ color: qrColor }}>Smart 2-Step Flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
