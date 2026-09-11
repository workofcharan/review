import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  QrCode, 
  GitFork, 
  BrainCircuit, 
  Settings,
  SplitSquareVertical
} from 'lucide-react';
import OverviewTab from '../components/dashboard/OverviewTab';
import FeedbackInboxTab from '../components/dashboard/FeedbackInboxTab';
import QrStudioTab from '../components/dashboard/QrStudioTab';
import FlowBuilderTab from '../components/dashboard/FlowBuilderTab';
import AiIntelligenceTab from '../components/dashboard/AiIntelligenceTab';
import SettingsTab from '../components/dashboard/SettingsTab';

export default function DashboardView() {
  const { activeBusiness, feedbacks, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const bizFeedbacks = feedbacks.filter(f => f.businessId === activeBusiness.id);
  const pendingCount = bizFeedbacks.filter(f => f.recoveryStatus === 'pending_review').length;

  const tabs = [
    { id: 'overview', label: 'Command Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { 
      id: 'feedback_inbox', 
      label: 'Feedback & CRM', 
      icon: <MessageSquare className="w-4 h-4" />,
      badge: pendingCount > 0 ? pendingCount : null 
    },
    { id: 'qr_studio', label: 'QR Code Studio', icon: <QrCode className="w-4 h-4" /> },
    { id: 'flow_builder', label: 'Question Flow Builder', icon: <GitFork className="w-4 h-4" /> },
    { id: 'ai_intelligence', label: 'AI Intelligence', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings & Branding', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 bg-slate-50">
      {/* Tab Navigation Ribbon */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 border-b border-slate-200">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-sky-600 border border-slate-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Customer Preview Shortcut */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo('/preview')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-sky-600" />
            <span>Dual Screen Live Demo</span>
          </button>
        </div>
      </div>

      {/* Main Tab Render */}
      <div className="w-full">
        {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
        {activeTab === 'feedback_inbox' && <FeedbackInboxTab />}
        {activeTab === 'qr_studio' && <QrStudioTab />}
        {activeTab === 'flow_builder' && <FlowBuilderTab />}
        {activeTab === 'ai_intelligence' && <AiIntelligenceTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}
