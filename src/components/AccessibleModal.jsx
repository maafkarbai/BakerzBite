import React, { useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import FocusLock from 'react-focus-lock';
import { useAccessibility } from '@context/AccessibilityContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

function AccessibleModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  description,
  size = 'md' 
}) {
  const { announceToScreenReader } = useAccessibility();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      announceToScreenReader(`${title} dialog opened`, 'assertive');
    }
  }, [isOpen, title, announceToScreenReader]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
      initialFocus={closeButtonRef}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true" 
      />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <FocusLock>
          <Dialog.Panel 
            className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? "modal-description" : undefined}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Dialog.Title 
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </Dialog.Title>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:ring-offset-2"
                aria-label="Close dialog"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            {description && (
              <div id="modal-description" className="px-6 pt-4">
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </Dialog.Panel>
        </FocusLock>
      </div>
    </Dialog>
  );
}

export default AccessibleModal;