import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  QrCode, 
  GitFork, 
  BrainCircuit, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import OverviewTab from '../components/dashboard/OverviewTab';
import FeedbackInboxTab from '../components/dashboard/FeedbackInboxTab';
import QrStudioTab from '../components/dashboard/QrStudioTab';
import FlowBuilderTab from '../components/dashboard/FlowBuilderTab';
import AiIntelligenceTab from '../components/dashboard/AiIntelligenceTab';
import SettingsTab from '../components/dashboard/SettingsTab';

export default function DashboardView() {
  const { 
    activeBusiness, 
    feedbacks, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const bizFeedbacks = feedbacks.filter(f => f.businessId === activeBusiness.id);
  const pendingCount = bizFeedbacks.filter(f => f.recoveryStatus === 'pending_review').length;

  const tabs = [
    { id: 'overview', label: 'Command Overview', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    { 
      id: 'feedback_inbox', 
      label: 'Feedback & CRM', 
      icon: <MessageSquare className="w-4 h-4 shrink-0" />,
      badge: pendingCount > 0 ? pendingCount : null 
    },
    { id: 'qr_studio', label: 'QR Code Studio', icon: <QrCode className="w-4 h-4 shrink-0" /> },
    { id: 'flow_builder', label: 'Question Flow Builder', icon: <GitFork className="w-4 h-4 shrink-0" /> },
    { id: 'ai_intelligence', label: 'AI Intelligence', icon: <BrainCircuit className="w-4 h-4 shrink-0" /> },
    { id: 'settings', label: 'Settings & Branding', icon: <Settings className="w-4 h-4 shrink-0" /> },
  ];

  const renderNavButtons = (isMobile = false) => (
    <div className="space-y-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (isMobile) setMobileDrawerOpen(false);
            }}
            title={isCollapsed && !isMobile ? tab.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group cursor-pointer ${
              isActive
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            } ${isCollapsed && !isMobile ? 'justify-center px-2' : 'justify-between'}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'}>
                {tab.icon}
              </span>
              {(!isCollapsed || isMobile) && (
                <span className="truncate tracking-tight">{tab.label}</span>
              )}
            </div>

            {tab.badge && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                isActive 
                  ? 'bg-white text-sky-700' 
                  : 'bg-rose-500 text-white animate-pulse'
              } ${isCollapsed && !isMobile ? 'absolute top-1.5 right-1.5 w-2 h-2 p-0 rounded-full' : ''}`}>
                {(!isCollapsed || isMobile) ? tab.badge : ''}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-[1600px] mx-auto px-3 sm:px-6 py-4 flex flex-col gap-4 bg-slate-50">
      {/* Top Admin Breadcrumb Bar - Frozen Sticky */}
      <div className="sticky top-[4.25rem] z-30 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-3.5 px-4 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigateTo('/admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Admin Multi-Business Hub</span>
          </button>
          <span className="text-slate-300 font-bold">/</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-base">{activeBusiness.logo}</span>
            <span className="font-extrabold text-slate-900">{activeBusiness.name}</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
              {activeBusiness.type}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container: Slide Bar + Content */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Mobile Slide Bar Toggle Button */}
        <div className="md:hidden w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-sky-600 cursor-pointer"
          >
            <Menu className="w-4 h-4 text-sky-600" />
            <span>Slide Menu ({tabs.find(t => t.id === activeTab)?.label})</span>
          </button>
        </div>

        {/* Mobile Slide-Out Drawer Overlay */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex animate-fade-in">
            <div className="w-72 max-w-[85vw] h-full bg-white p-4 shadow-2xl flex flex-col justify-between animate-slide-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{activeBusiness.logo}</span>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{activeBusiness.name}</div>
                      <div className="text-[10px] text-slate-500">Command Slide Bar</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {renderNavButtons(true)}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
          </div>
        )}

        {/* Desktop Slide Bar (Collapsible Sidebar) - Frozen / Sticky */}
        <aside 
          className={`hidden md:flex flex-col justify-between shrink-0 sticky top-[8.25rem] self-start max-h-[calc(100vh-9.5rem)] overflow-y-auto rounded-3xl bg-white border border-slate-200/90 shadow-sm p-3 transition-all duration-300 ease-in-out z-20 ${
            isCollapsed ? 'w-18' : 'w-64'
          }`}
        >
          {/* Top Header inside Slide Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-1">
              {!isCollapsed && (
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-lg">{activeBusiness.logo}</span>
                  <div className="truncate">
                    <div className="font-extrabold text-xs text-slate-900 truncate">{activeBusiness.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Command Slide Bar</div>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand Slide Bar" : "Collapse Slide Bar"}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors mx-auto cursor-pointer"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Nav List */}
            {renderNavButtons(false)}
          </div>
        </aside>

        {/* Main Tab Render View */}
        <main className="flex-1 w-full min-w-0">
          {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === 'feedback_inbox' && <FeedbackInboxTab />}
          {activeTab === 'qr_studio' && <QrStudioTab />}
          {activeTab === 'flow_builder' && <FlowBuilderTab />}
          {activeTab === 'ai_intelligence' && <AiIntelligenceTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
