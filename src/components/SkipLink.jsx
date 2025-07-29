import React from 'react';

function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="skip-link absolute left-0 top-0 z-50 bg-[#D65A31] text-white px-4 py-2 rounded-br-md font-semibold transform -translate-y-full focus:translate-y-0 transition-transform duration-200"
      onFocus={(e) => e.target.scrollIntoView()}
    >
      Skip to main content
    </a>
  );
}

export default SkipLink;