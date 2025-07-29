import React, { createContext, useContext, useState, useEffect } from 'react';
import { announce } from '@react-aria/live-announcer';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [announcements, setAnnouncements] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);

  useEffect(() => {
    // Only detect preferences if accessibility is enabled
    if (!accessibilityEnabled) return;

    // Detect user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    // Detect high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);
    
    const handleContrastChange = (e) => setHighContrast(e.matches);
    contrastQuery.addEventListener('change', handleContrastChange);

    // Focus visible detection
    const handleKeydown = (e) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };
    
    const handleMousedown = () => {
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [accessibilityEnabled]);

  const announceToScreenReader = (message, priority = 'polite') => {
    if (!accessibilityEnabled) return;
    announce(message, priority);
    setAnnouncements(prev => [...prev, { message, priority, timestamp: Date.now() }]);
  };

  const toggleAccessibility = () => {
    setAccessibilityEnabled(!accessibilityEnabled);
    if (!accessibilityEnabled) {
      announce('Accessibility features enabled');
    }
  };

  const toggleReducedMotion = () => {
    if (!accessibilityEnabled) return;
    setReducedMotion(!reducedMotion);
    announceToScreenReader(`Motion ${!reducedMotion ? 'reduced' : 'enabled'}`);
  };

  const toggleHighContrast = () => {
    if (!accessibilityEnabled) return;
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast', !highContrast);
    announceToScreenReader(`High contrast ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const value = {
    announcements,
    reducedMotion,
    highContrast,
    focusVisible,
    accessibilityEnabled,
    announceToScreenReader,
    toggleAccessibility,
    toggleReducedMotion,
    toggleHighContrast
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div className={`
        ${accessibilityEnabled && reducedMotion ? 'reduce-motion' : ''}
        ${accessibilityEnabled && highContrast ? 'high-contrast' : ''}
        ${accessibilityEnabled && focusVisible ? 'focus-visible' : ''}
      `}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}