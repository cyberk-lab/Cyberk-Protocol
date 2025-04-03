import React from 'react';

interface ButtonProps {
  /**
   * The text content of the button
   */
  label: string;
  
  /**
   * The variant of the button
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * The icon to display before the label
   */
  startIcon?: React.ReactNode;
  
  /**
   * The icon to display after the label
   */
  endIcon?: React.ReactNode;
  
  /**
   * The function to call when the button is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Button component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  onClick,
  className = '',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    tertiary: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  // Size classes
  const sizeClasses = {
    small: 'text-xs px-2.5 py-1.5',
    medium: 'text-sm px-4 py-2',
    large: 'text-base px-6 py-3',
  };
  
  // Disabled classes
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combined classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
      
      {label}
      
      {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
