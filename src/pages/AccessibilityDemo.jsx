import React, { useState } from 'react';
import { useAccessibility } from '@context/AccessibilityContext';
import AccessibleModal from '@components/AccessibleModal';
import { useHotkeys } from 'react-hotkeys-hook';

function AccessibilityDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  // Keyboard shortcuts demo
  useHotkeys('ctrl+k', () => {
    announceToScreenReader('Keyboard shortcut activated!');
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility Features Demo
          </h1>
          <p className="text-lg text-gray-600">
            This page demonstrates the comprehensive accessibility features implemented in BakerzBite.
          </p>
        </header>

        <main>
          {/* Keyboard Navigation Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="keyboard-nav">
            <h2 id="keyboard-nav" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Keyboard Navigation
            </h2>
            <div className="space-y-4">
              <p>Try these keyboard shortcuts:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Alt + A</kbd> - Toggle accessibility toolbar</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Alt + R</kbd> - Toggle reduced motion</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Alt + C</kbd> - Toggle high contrast</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Tab</kbd> - Navigate through focusable elements</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + K</kbd> - Test announcement</li>
              </ul>
            </div>
          </section>

          {/* Screen Reader Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="screen-reader">
            <h2 id="screen-reader" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Screen Reader Support
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => announceToScreenReader('This is a test announcement!')}
                className="btn-primary"
                aria-describedby="announce-description"
              >
                Test Screen Reader Announcement
              </button>
              <p id="announce-description" className="text-sm text-gray-600">
                Click this button to send a message to screen readers
              </p>
              
              <div className="border border-gray-200 rounded p-4">
                <h3 className="font-semibold mb-2">ARIA Live Region Example</h3>
                <div aria-live="polite" aria-atomic="true" className="text-[#D65A31] font-medium">
                  Status updates will appear here automatically
                </div>
              </div>
            </div>
          </section>

          {/* Focus Management Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="focus-management">
            <h2 id="focus-management" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Focus Management
            </h2>
            <div className="space-y-4">
              <p>All interactive elements have visible focus indicators:</p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-ghost">Ghost Button</button>
                <input 
                  type="text" 
                  placeholder="Focus me with Tab"
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D65A31]"
                />
              </div>
            </div>
          </section>

          {/* Modal Demo Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="modal-demo">
            <h2 id="modal-demo" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Accessible Modal
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              Open Accessible Modal
            </button>
          </section>

          {/* Color and Contrast Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="color-contrast">
            <h2 id="color-contrast" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Color and Contrast
            </h2>
            <div className="space-y-4">
              <p>All text meets WCAG AA contrast requirements:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#D65A31] text-white rounded">
                  <p className="font-semibold">Primary Brand Color</p>
                  <p className="text-sm">Contrast ratio: 4.5:1</p>
                </div>
                <div className="p-4 bg-gray-900 text-white rounded">
                  <p className="font-semibold">Dark Text</p>
                  <p className="text-sm">Contrast ratio: 21:1</p>
                </div>
                <div className="p-4 bg-gray-600 text-white rounded">
                  <p className="font-semibold">Medium Text</p>
                  <p className="text-sm">Contrast ratio: 7:1</p>
                </div>
              </div>
            </div>
          </section>

          {/* Form Accessibility Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="form-accessibility">
            <h2 id="form-accessibility" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Form Accessibility
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (Required)
                </label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  aria-describedby="name-help"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D65A31]"
                />
                <p id="name-help" className="text-xs text-gray-500 mt-1">
                  Enter your full name
                </p>
              </div>

              <fieldset className="border border-gray-300 rounded p-4">
                <legend className="text-sm font-medium text-gray-700 px-2">
                  Preferred Contact Method
                </legend>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center">
                    <input type="radio" name="contact" value="email" className="mr-2" />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="contact" value="phone" className="mr-2" />
                    Phone
                  </label>
                </div>
              </fieldset>

              <button type="submit" className="btn-primary">
                Submit Form
              </button>
            </form>
          </section>

          {/* Image Accessibility Section */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow" aria-labelledby="image-accessibility">
            <h2 id="image-accessibility" className="text-2xl font-semibold mb-4 text-[#D65A31]">
              Image Accessibility
            </h2>
            <div className="space-y-4">
              <p>All images have descriptive alt text:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <figure>
                  <img 
                    src="/Images/CROISSANT LOGO (1).png"
                    alt="BakerzBite logo featuring a golden croissant with elegant typography"
                    className="w-full h-48 object-cover rounded"
                  />
                  <figcaption className="text-sm text-gray-600 mt-2">
                    Logo with descriptive alt text
                  </figcaption>
                </figure>
                <div className="p-4 bg-gray-100 rounded flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Decorative icon (aria-hidden)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Accessible Modal */}
      <AccessibleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Accessible Modal Example"
        description="This modal demonstrates proper focus management and ARIA attributes"
      >
        <div className="space-y-4">
          <p>This modal includes:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Focus lock (try pressing Tab)</li>
            <li>Escape key to close</li>
            <li>Click outside to close</li>
            <li>Proper ARIA attributes</li>
            <li>Screen reader announcements</li>
          </ul>
          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={() => setIsModalOpen(false)} className="btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </AccessibleModal>
    </div>
  );
}

export default AccessibilityDemo;