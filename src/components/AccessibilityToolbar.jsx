import React, { useState } from 'react';
import { useAccessibility } from '@context/AccessibilityContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { 
  AdjustmentsHorizontalIcon,
  EyeIcon,
  SpeakerWaveIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    reducedMotion, 
    highContrast,
    accessibilityEnabled,
    toggleAccessibility,
    toggleReducedMotion, 
    toggleHighContrast,
    announceToScreenReader
  } = useAccessibility();

  // Keyboard shortcuts
  useHotkeys('alt+a', () => {
    if (!accessibilityEnabled) {
      toggleAccessibility();
    } else {
      setIsOpen(!isOpen);
      announceToScreenReader('Accessibility toolbar toggled');
    }
  });

  useHotkeys('alt+r', () => {
    if (accessibilityEnabled) {
      toggleReducedMotion();
    }
  });

  useHotkeys('alt+c', () => {
    if (accessibilityEnabled) {
      toggleHighContrast();
    }
  });

  const increaseFontSize = () => {
    if (!accessibilityEnabled) return;
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.min(currentSize * 1.1, 24);
    document.documentElement.style.fontSize = `${newSize}px`;
    announceToScreenReader(`Font size increased to ${Math.round(newSize)}px`);
  };

  const decreaseFontSize = () => {
    if (!accessibilityEnabled) return;
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.max(currentSize * 0.9, 12);
    document.documentElement.style.fontSize = `${newSize}px`;
    announceToScreenReader(`Font size decreased to ${Math.round(newSize)}px`);
  };

  const resetFontSize = () => {
    if (!accessibilityEnabled) return;
    document.documentElement.style.fontSize = '16px';
    announceToScreenReader('Font size reset to default');
  };

  return (
    <>
      {/* Accessibility button */}
      <button
        onClick={() => {
          if (!accessibilityEnabled) {
            toggleAccessibility();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="fixed top-20 right-4 z-50 bg-[#D65A31] text-white p-3 rounded-full shadow-lg hover:bg-[#C54A21] focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:ring-offset-2 transition-colors"
        aria-label={!accessibilityEnabled ? "Enable accessibility features" : "Open accessibility toolbar"}
        aria-expanded={accessibilityEnabled && isOpen}
      >
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
      </button>

      {/* Accessibility panel */}
      {accessibilityEnabled && isOpen && (
        <div 
          className="fixed top-32 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80"
          role="dialog"
          aria-label="Accessibility Options"
          aria-describedby="accessibility-description"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Accessibility Options</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close accessibility toolbar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p id="accessibility-description" className="text-sm text-gray-600 mb-4">
            Customize your browsing experience with these accessibility options.
          </p>

          <div className="mb-4 pb-4 border-b border-gray-200">
            <button
              onClick={() => {
                toggleAccessibility();
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
            >
              Disable Accessibility Features
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Controls */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <CommandLineIcon className="w-4 h-4 mr-2" />
                Font Size
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={decreaseFontSize}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  aria-label="Decrease font size"
                >
                  A-
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  aria-label="Reset font size"
                >
                  A
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  aria-label="Increase font size"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Motion Preference */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={toggleReducedMotion}
                  className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                />
                <div className="flex items-center">
                  <SpeakerWaveIcon className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">Reduce Motion</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 ml-7">Minimize animations and transitions</p>
            </div>

            {/* High Contrast */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                />
                <div className="flex items-center">
                  <EyeIcon className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">High Contrast</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 ml-7">Increase color contrast for better visibility</p>
            </div>
          </div>

          {/* Keyboard shortcuts */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Keyboard Shortcuts</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Alt + A: Toggle this panel (when enabled)</div>
              <div>Alt + R: Toggle reduced motion</div>
              <div>Alt + C: Toggle high contrast</div>
              <div>Tab: Navigate through elements</div>
              <div>Enter/Space: Activate buttons</div>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              Press Alt + A when accessibility is disabled to enable it
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AccessibilityToolbar;