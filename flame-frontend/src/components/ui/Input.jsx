import React from 'react';
import clsx from 'clsx';

const Input = ({ 
  label,
  error,
  className = '',
  required = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-blue-400 focus:ring-blue-400';
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        className={clsx(baseClasses, stateClasses, className)}
        {...props}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

const Select = ({ 
  label,
  error,
  children,
  className = '',
  required = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-white/30 bg-white/10 backdrop-blur-sm text-white focus:border-blue-400 focus:ring-blue-400';
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        className={clsx(baseClasses, stateClasses, className)}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export { Input, Select };