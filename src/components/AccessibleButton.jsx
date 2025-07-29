import React, { forwardRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const AccessibleButton = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className = '',
  loadingText = 'Loading...',
  ...props
}, ref) => {
  const { announceToScreenReader, reducedMotion, accessibilityEnabled } = useAccessibility();

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#D65A31] text-white hover:bg-[#C54A21] focus:ring-[#D65A31]',
    secondary: 'bg-white text-[#D65A31] border border-[#D65A31] hover:bg-[#D65A31] hover:text-white focus:ring-[#D65A31]',
    ghost: 'text-[#D65A31] hover:bg-[#FFF7ED] focus:ring-[#D65A31]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const animationClasses = (accessibilityEnabled && reducedMotion) ? '' : 'transform hover:scale-105 active:scale-95';

  const handleClick = (e) => {
    if (loading || disabled) return;
    
    if (onClick) {
      onClick(e);
    }

    // Announce button action to screen readers if accessibility is enabled and aria-label is provided
    if (accessibilityEnabled && ariaLabel && !loading) {
      announceToScreenReader(`${ariaLabel} activated`);
    }
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${animationClasses}
    ${className}
  `.trim();

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {loading ? loadingText : children}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;