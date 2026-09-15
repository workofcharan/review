import React from 'react';
import { QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-display font-extrabold text-base tracking-tight text-slate-900">
                <span>RevPulse</span>
                <span className="text-[10px] uppercase px-1.5 py-0.2 rounded-md bg-sky-50 text-sky-700 font-bold border border-sky-200">
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
