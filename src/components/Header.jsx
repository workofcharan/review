import React, { useState } from 'react';
import { 
  Sparkles, 
  QrCode, 
  LayoutDashboard, 
  Smartphone, 
  ChevronDown, 
  ExternalLink,
  SplitSquareVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { 
    businesses, 
    selectedBusinessId, 
    setSelectedBusinessId, 
    activeBusiness, 
    currentRoute, 
    navigateTo 
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { id: '/', label: 'Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: '/dashboard', label: 'Command Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: `/b/${activeBusiness.slug}`, label: 'Live QR Customer Flow', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: '/preview', label: 'Split-Screen Live Demo', icon: <SplitSquareVertical className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <QrCode className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display font-extrabold text-lg tracking-tight text-slate-900">
              <span>RevPulse</span>
              <span className="text-[10px] uppercase px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-700 font-bold border border-sky-200">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 -mt-0.5 hidden sm:block">
              Smart QR Feedback & Google Reviews
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          {navLinks.map((link) => {
            const isActive = link.id === currentRoute || (link.id.startsWith('/b/') && currentRoute.startsWith('/b/'));
            return (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-sky-600 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Business Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-800 shadow-2xs transition-colors"
            >
              <span className="text-sm">{activeBusiness.logo}</span>
              <span className="max-w-[110px] truncate font-bold text-slate-900">{activeBusiness.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-scale-in">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
                  Select Business Archetype:
                </div>
                <div className="space-y-1">
                  {businesses.map((biz) => (
                    <button
                      key={biz.id}
                      onClick={() => {
                        setSelectedBusinessId(biz.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                        biz.id === selectedBusinessId
                          ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-base">{biz.logo}</span>
                        <div className="truncate">
                          <div className="truncate text-slate-900 font-medium">{biz.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{biz.type}</div>
                        </div>
                      </div>
                      {biz.id === selectedBusinessId && (
                        <div className="w-2 h-2 rounded-full bg-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm shadow-sky-600/20 transition-all transform active:scale-95"
          >
            <span>Scan Flow</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
}
