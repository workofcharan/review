import React from 'react';
import { 
  QrCode, 
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { 
    currentRoute, 
    navigateTo 
  } = useApp();

  const isAdminRoute = currentRoute === '/admin' || currentRoute === '/businesses';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Status */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigateTo('/admin')}
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

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            {/* Admin Hub Link */}
            <button
              onClick={() => navigateTo('/admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isAdminRoute
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>Admin Multi-Business Hub</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
