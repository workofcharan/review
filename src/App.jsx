import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import CustomerFeedbackView from './views/CustomerFeedbackView';
import SplitScreenView from './views/SplitScreenView';
import AdminBusinessesHubView from './views/AdminBusinessesHubView';

export default function App() {
  const { currentRoute } = useApp();

  // If customer QR feedback mode is active, render clean mobile view without main header
  if (currentRoute.startsWith('/b/')) {
    return <CustomerFeedbackView />;
  }

  // Admin Hub is the default landing view for the application
  const isDashboardView = currentRoute === '/dashboard' || currentRoute.startsWith('/workspace');
  const isPreviewView = currentRoute === '/preview';
  const isTourView = currentRoute === '/tour';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      <Header />
      
      <main className="flex-1">
        {isDashboardView && <DashboardView />}
        {isPreviewView && <SplitScreenView />}
        {isTourView && <LandingView />}
        {!isDashboardView && !isPreviewView && !isTourView && <AdminBusinessesHubView />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">RevPulse AI</span>
            <span>•</span>
            <span>Smart QR Feedback & Review Acceleration Engine</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Adaptive State Machines</span>
            <span>•</span>
            <span>Google Review Converter</span>
            <span>•</span>
            <span>Private Escalation Shield</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
