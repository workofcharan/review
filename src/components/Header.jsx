import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  QrCode, 
  LayoutDashboard, 
  Smartphone, 
  ChevronDown, 
  ExternalLink,
  SplitSquareVertical,
  Check,
  Building2,
  Utensils,
  Coffee,
  ShoppingBag,
  CircleDot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddBusinessModal from './dashboard/AddBusinessModal';
import { Plus } from 'lucide-react';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { id: '/', label: 'Command Hub', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'restaurant': return <Utensils className="w-3.5 h-3.5 text-rose-500" />;
      case 'hotel': return <Building2 className="w-3.5 h-3.5 text-sky-500" />;
      case 'cafe': return <Coffee className="w-3.5 h-3.5 text-amber-500" />;
      case 'retail': return <ShoppingBag className="w-3.5 h-3.5 text-violet-500" />;
      default: return <Building2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Status */}
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

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            {navLinks.map((link) => {
              const isActive = currentRoute === '/' || currentRoute === '' || currentRoute === '/dashboard';
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Business Selector & Launch CTA */}
        <div className="flex items-center gap-3">
          {/* Business Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
            >
              <span className="text-base leading-none">{activeBusiness.logo}</span>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-slate-900 truncate max-w-[120px]">{activeBusiness.name}</div>
                <div className="text-[9px] text-slate-500 font-medium -mt-0.5">{activeBusiness.type}</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-scale-in">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 border-b border-slate-100 mb-1">
                  Active Business Profile
                </div>
                <div className="space-y-1">
                  {businesses.map((biz) => {
                    const isSelected = biz.id === selectedBusinessId;
                    return (
                      <button
                        key={biz.id}
                        onClick={() => {
                          setSelectedBusinessId(biz.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 font-bold border border-sky-200'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base shrink-0 border border-slate-200">
                            {biz.logo}
                          </div>
                          <div className="truncate">
                            <div className="truncate text-slate-900 font-bold">{biz.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal flex items-center gap-1">
                              {getCategoryIcon(biz.category)}
                              <span>{biz.type}</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-white shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Add Business Profile Button */}
                <div className="pt-1.5 mt-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsAddModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-extrabold text-xs transition-colors border border-sky-200/80"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Business Profile</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Business Modal */}
      <AddBusinessModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </header>
  );
}
