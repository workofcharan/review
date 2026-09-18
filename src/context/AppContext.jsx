import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BUSINESSES, INITIAL_FEEDBACKS, INITIAL_AI_INSIGHTS } from '../data/initialData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  BUSINESSES: 'revpulse_businesses_v7',
  SELECTED_BIZ: 'revpulse_selected_biz_v7',
  FEEDBACKS: 'revpulse_feedbacks_v7',
  DELETED_BIZ_IDS: 'revpulse_deleted_biz_ids_v7',
};

export function AppProvider({ children }) {
  // Load businesses from localStorage or fallback to defaults (excluding permanently deleted ones)
  const [businesses, setBusinesses] = useState(() => {
    try {
      const deletedSaved = localStorage.getItem(STORAGE_KEYS.DELETED_BIZ_IDS);
      const deletedIds = new Set(deletedSaved ? JSON.parse(deletedSaved) : []);
      const saved = localStorage.getItem(STORAGE_KEYS.BUSINESSES);

      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(b => !deletedIds.has(b.id));
      }
      return INITIAL_BUSINESSES.filter(b => !deletedIds.has(b.id));
    } catch {
      return INITIAL_BUSINESSES;
    }
  });

  // Active business ID defaults to Dr C Dental Clinic or first available
  const [selectedBusinessId, setSelectedBusinessId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_BIZ);
      const deletedSaved = localStorage.getItem(STORAGE_KEYS.DELETED_BIZ_IDS);
      const deletedIds = new Set(deletedSaved ? JSON.parse(deletedSaved) : []);

      if (saved && !deletedIds.has(saved)) {
        return saved;
      }
      const firstActive = INITIAL_BUSINESSES.find(b => !deletedIds.has(b.id));
      return firstActive ? firstActive.id : INITIAL_BUSINESSES[0].id;
    } catch {
      return INITIAL_BUSINESSES[0].id;
    }
  });

  // Feedbacks collection (excluding feedbacks from permanently deleted businesses)
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const deletedSaved = localStorage.getItem(STORAGE_KEYS.DELETED_BIZ_IDS);
      const deletedIds = new Set(deletedSaved ? JSON.parse(deletedSaved) : []);
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);

      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(f => !deletedIds.has(f.businessId));
      }
      return INITIAL_FEEDBACKS.filter(f => !deletedIds.has(f.businessId));
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  // Helper function to resolve route from hash, search params, or pathname
  const resolveRoute = () => {
    try {
      const hash = (window.location.hash || '').replace(/^#\/?/, '').trim();
      if (hash === 'review' || hash === 'google' || hash === 'r') {
        window.location.href = 'https://g.page/r/CVfAf-zR7rBLEBE/review';
        return '/review';
      }
      if (hash) {
        return hash.startsWith('/') ? hash : `/${hash}`;
      }

      // Check search params (e.g. ?b=dr-c-dental-clinic or ?biz=...)
      const params = new URLSearchParams(window.location.search);
      const bizParam = params.get('b') || params.get('biz') || params.get('slug');
      if (bizParam) {
        return `/b/${bizParam}`;
      }

      // Check pathname (e.g. /b/dr-c-dental-clinic or /dashboard)
      const pathname = window.location.pathname || '';
      if (pathname.includes('/b/')) {
        const slugPart = pathname.substring(pathname.indexOf('/b/'));
        return slugPart;
      }
      if (pathname === '/review' || pathname === '/google' || pathname === '/r') {
        window.location.href = 'https://g.page/r/CVfAf-zR7rBLEBE/review';
        return '/review';
      }

      return '/';
    } catch {
      return '/';
    }
  };

  // URL routing state
  const [currentRoute, setCurrentRoute] = useState(resolveRoute);

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

  // Handle browser hash changes & direct review redirect routes
  useEffect(() => {
    const handleUrlChange = () => {
      const resolved = resolveRoute();
      setCurrentRoute(resolved);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateTo = (route) => {
    const formatted = route.startsWith('/') ? route : `/${route}`;
    window.location.hash = formatted;
    setCurrentRoute(formatted);
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
    setBusinesses(prev => {
      const updated = [...prev, biz];
      try {
        localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setSelectedBusinessId(biz.id);
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_BIZ, biz.id);
    } catch (e) {
      console.error(e);
    }
    return biz;
  };

  // Remove business and associated feedbacks permanently
  const removeBusiness = (businessId) => {
    // Record in deleted IDs set in localStorage
    try {
      const deletedSaved = localStorage.getItem(STORAGE_KEYS.DELETED_BIZ_IDS);
      const deletedArr = deletedSaved ? JSON.parse(deletedSaved) : [];
      if (!deletedArr.includes(businessId)) {
        localStorage.setItem(STORAGE_KEYS.DELETED_BIZ_IDS, JSON.stringify([...deletedArr, businessId]));
      }
    } catch (e) {
      console.error(e);
    }

    setBusinesses(prev => {
      const remaining = prev.filter(b => b.id !== businessId);
      try {
        localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(remaining));
      } catch (e) {
        console.error(e);
      }
      
      // If active business was deleted, switch to the first remaining one
      if (selectedBusinessId === businessId && remaining.length > 0) {
        setSelectedBusinessId(remaining[0].id);
        try {
          localStorage.setItem(STORAGE_KEYS.SELECTED_BIZ, remaining[0].id);
        } catch (e) {
          console.error(e);
        }
      }
      return remaining;
    });

    // Also permanently clean up feedbacks belonging to this business
    setFeedbacks(prev => {
      const remaining = prev.filter(f => f.businessId !== businessId);
      try {
        localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(remaining));
      } catch (e) {
        console.error(e);
      }
      return remaining;
    });
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.DELETED_BIZ_IDS);
    setBusinesses(INITIAL_BUSINESSES);
    setSelectedBusinessId(INITIAL_BUSINESSES[0].id);
    setFeedbacks(INITIAL_FEEDBACKS);
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(INITIAL_BUSINESSES));
      localStorage.setItem(STORAGE_KEYS.SELECTED_BIZ, INITIAL_BUSINESSES[0].id);
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(INITIAL_FEEDBACKS));
    } catch (e) {
      console.error(e);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        removeBusiness,
        resetDemoData,
        isAddModalOpen,
        setIsAddModalOpen,
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
