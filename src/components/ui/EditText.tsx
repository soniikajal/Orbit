'use client';
import React, { useState } from 'react';

interface EditTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  maxLength?: number;
  autoComplete?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const EditText: React.FC<EditTextProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  maxLength,
  autoComplete,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      maxLength={maxLength}
      autoComplete={autoComplete}
      className={`
        w-full
        px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4
        text-sm sm:text-base md:text-lg
        font-space-grotesk
        text-edittext-text1
        bg-global-background5
        border border-global-text1
        rounded-lg sm:rounded-xl md:rounded-2xl
        transition-all
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-global-background6
        focus:ring-opacity-50
        focus:border-global-background6
        hover:border-global-text2
        placeholder:text-edittext-text1
        placeholder:opacity-70
        ${disabled ? 'opacity-50 cursor-not-allowed bg-global-background2' : ''}
        ${isFocused ? 'shadow-md' : 'shadow-sm'}
        min-h-[44px] sm:min-h-[48px] md:min-h-[52px]
        touch-manipulation
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  );
};

export default EditText;