import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BUSINESSES, INITIAL_FEEDBACKS, INITIAL_AI_INSIGHTS } from '../data/initialData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  BUSINESSES: 'revpulse_businesses_v1',
  SELECTED_BIZ: 'revpulse_selected_biz_v1',
  FEEDBACKS: 'revpulse_feedbacks_v1',
};

export function AppProvider({ children }) {
  // Load businesses from localStorage or fallback to defaults
  const [businesses, setBusinesses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUSINESSES);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
    } catch {
      return INITIAL_BUSINESSES;
    }
  });

  // Active business ID
  const [selectedBusinessId, setSelectedBusinessId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_BIZ);
      return saved || INITIAL_BUSINESSES[0].id;
    } catch {
      return INITIAL_BUSINESSES[0].id;
    }
  });

  // Feedbacks collection
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  // URL Hash routing state
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash;
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
    } catch (e) {
      console.error(e);
    }
  }, [businesses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_BIZ, selectedBusinessId);
    } catch (e) {
      console.error(e);
    }
  }, [selectedBusinessId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
    } catch (e) {
      console.error(e);
    }
  }, [feedbacks]);

  // Handle browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
  };

  // Get current active business object
  const activeBusiness = businesses.find(b => b.id === selectedBusinessId) || businesses[0];

  // Submit feedback submission from customer
  const submitFeedback = (feedbackData) => {
    const newFeedback = {
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...feedbackData
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
    return newFeedback;
  };

  // Update manager resolution status
  const updateFeedbackStatus = (feedbackId, status, managerNotes = '') => {
    setFeedbacks(prev => prev.map(item => {
      if (item.id === feedbackId) {
        return {
          ...item,
          recoveryStatus: status,
          managerNotes: managerNotes || item.managerNotes
        };
      }
      return item;
    }));
  };

  // Update business configuration (branding, questions flow, review links)
  const updateBusiness = (businessId, updatedFields) => {
    setBusinesses(prev => prev.map(biz => {
      if (biz.id === businessId) {
        return { ...biz, ...updatedFields };
      }
      return biz;
    }));
  };

  // Add new business
  const addBusiness = (newBiz) => {
    const biz = {
      id: `biz-${Date.now()}`,
      ...newBiz
    };
    setBusinesses(prev => [...prev, biz]);
    setSelectedBusinessId(biz.id);
    return biz;
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    setBusinesses(INITIAL_BUSINESSES);
    setSelectedBusinessId(INITIAL_BUSINESSES[0].id);
    setFeedbacks(INITIAL_FEEDBACKS);
    localStorage.removeItem(STORAGE_KEYS.BUSINESSES);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_BIZ);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACKS);
  };

  return (
    <AppContext.Provider
      value={{
        businesses,
        selectedBusinessId,
        setSelectedBusinessId,
        activeBusiness,
        feedbacks,
        currentRoute,
        navigateTo,
        submitFeedback,
        updateFeedbackStatus,
        updateBusiness,
        addBusiness,
        resetDemoData,
        aiInsights: INITIAL_AI_INSIGHTS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
