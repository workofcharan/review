import React, { useState, useRef, useEffect } from 'react';
import { 
  QrCode, 
  Building2, 
  LayoutDashboard, 
  Smartphone, 
  Sparkles, 
  Plus, 
  ChevronDown, 
  ExternalLink, 
  Check, 
  Menu, 
  X,
  Compass,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { 
    businesses, 
    selectedBusinessId, 
    setSelectedBusinessId, 
    activeBusiness, 
    currentRoute, 
    navigateTo, 
    setIsAddModalOpen,
    feedbacks
  } = useApp();

  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBizDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = currentRoute === '/' || currentRoute === '' || (!currentRoute.startsWith('/dashboard') && !currentRoute.startsWith('/preview') && !currentRoute.startsWith('/tour') && !currentRoute.startsWith('/workspace'));
  const isDashboard = currentRoute === '/dashboard' || currentRoute.startsWith('/workspace');
  const isPreview = currentRoute === '/preview';
  const isTour = currentRoute === '/tour';

  const handleSelectBiz = (bizId) => {
    setSelectedBusinessId(bizId);
    setBizDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      id: 'home',
      label: 'All Businesses',
      icon: Building2,
      active: isHome,
      badge: businesses.length,
      onClick: () => {
        navigateTo('/');
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'dashboard',
      label: 'Command Center',
      icon: LayoutDashboard,
      active: isDashboard,
      onClick: () => {
        navigateTo('/dashboard');
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'preview',
      label: 'Live Simulator',
      icon: Smartphone,
      active: isPreview,
      onClick: () => {
        navigateTo('/preview');
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'tour',
      label: 'Features Tour',
      icon: Compass,
      active: isTour,
      onClick: () => {
        navigateTo('/tour');
        setMobileMenuOpen(false);
      }
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
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
        </div>

        {/* Center: Main Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 shadow-2xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={link.onClick}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  link.active
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${link.active ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    link.active ? 'bg-sky-100 text-sky-800' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Active Business Switcher & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Business Quick Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setBizDropdownOpen(!bizDropdownOpen)}
              className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs group max-w-[180px] sm:max-w-[220px]"
            >
              <span className="text-base shrink-0">{activeBusiness.logo}</span>
              <span className="truncate text-left leading-tight">
                {activeBusiness.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 transition-transform ${bizDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {bizDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-50 animate-scale-up space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>Switch Active Location</span>
                  <span>{businesses.length} total</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                  {businesses.map((b) => {
                    const isSelected = b.id === activeBusiness.id;
                    const bFeedbacks = feedbacks.filter(f => f.businessId === b.id);
                    const avg = bFeedbacks.length > 0 
                      ? (bFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / bFeedbacks.length).toFixed(1)
                      : '5.0';

                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleSelectBiz(b.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 font-extrabold ring-1 ring-sky-300'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-lg shrink-0">{b.logo}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate text-slate-900">{b.name}</div>
                            <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                              <span className="capitalize">{b.category}</span>
                              <span>•</span>
                              <span className="flex items-center text-amber-600 font-semibold">
                                <Star className="w-2.5 h-2.5 fill-amber-400 inline" /> {avg}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 ml-1.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBizDropdownOpen(false);
                      setIsAddModalOpen(true);
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Business Profile</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Test Customer QR Button */}
          <button
            type="button"
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            title="Launch live customer QR flow"
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-slate-500" />
            <span>Test QR</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* + Add Business Primary Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-sm shadow-sky-600/20 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Add Business</span>
            <span className="sm:hidden">Add</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl animate-fade-in">
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 pb-1">
              Navigation
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={link.onClick}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    link.active
                      ? 'bg-sky-50 text-sky-900 font-extrabold ring-1 ring-sky-300'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${link.active ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-700">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo(`/b/${activeBusiness.slug}`);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Customer QR Preview</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAddModalOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
