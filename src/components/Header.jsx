import React from 'react';
import { 
  QrCode, 
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { 
    currentRoute,
    navigateTo, 
    setIsAddModalOpen 
  } = useApp();

  const isAdminHub = currentRoute === '/' || currentRoute === '/admin';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div 
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-all">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display font-extrabold text-base tracking-tight text-slate-900 leading-tight">
              <span>RevPulse</span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-sky-100 text-sky-700 font-black border border-sky-200/80">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block leading-none">
              Smart Feedback & Review Accelerator
            </p>
          </div>
        </div>

        {/* Right: + Add Business CTA (Only visible on Admin Business Hub) */}
        {isAdminHub && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-extrabold shadow-sm shadow-sky-600/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Business</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
