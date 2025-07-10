'use client';
import React, { useState } from 'react';

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  maxLength?: number;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextArea: React.FC<TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  placeholder = '',
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  maxLength,
  rows = 4,
  cols,
  resize = 'vertical',
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  return (
    <textarea
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
      rows={rows}
      cols={cols}
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
        ${resizeClasses[resize]}
        ${disabled ? 'opacity-50 cursor-not-allowed bg-global-background2' : ''}
        ${isFocused ? 'shadow-md' : 'shadow-sm'}
        min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
        touch-manipulation
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  );
};

export default TextArea;