import React, { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const AccessibleInput = forwardRef(({
  label,
  type = 'text',
  required = false,
  error = '',
  helpText = '',
  placeholder = '',
  value,
  onChange,
  onBlur,
  className = '',
  inputClassName = '',
  labelClassName = '',
  id,
  name,
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Generate unique IDs if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  const helpTextId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  // Combine all aria-describedby values
  const describedBy = [ariaDescribedBy, helpTextId, errorId].filter(Boolean).join(' ') || undefined;

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const baseInputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm 
    placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  const inputClasses = `
    ${baseInputClasses}
    ${error 
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 text-gray-900'
    }
    ${isPasswordType ? 'pr-10' : ''}
    ${inputClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium mb-1
    ${error ? 'text-red-700' : 'text-gray-700'}
    ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}
    ${labelClassName}
  `.trim();

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          {...props}
        />

        {/* Password toggle button */}
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={disabled ? -1 : 0}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}

        {/* Error icon */}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Help text */}
      {helpText && (
        <p id={helpTextId} className="text-xs text-gray-500">
          {helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p id={errorId} className="text-xs text-red-600 flex items-center">
          <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {/* Focus indicator for screen readers */}
      {isFocused && (
        <span className="sr-only" aria-live="polite">
          {label} field is focused
        </span>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;