import React from 'react';
import clsx from 'clsx';

const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'rounded-xl border shadow-lg transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/10 backdrop-blur-md border-white/20 text-white',
    glass: 'bg-white/5 backdrop-blur-lg border-white/10 text-white',
    solid: 'bg-white border-gray-200 text-gray-900',
    gradient: 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border-white/20 text-white'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105 hover:-translate-y-1' : '';
  
  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={clsx('p-6 pb-4', className)} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={clsx('p-6', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={clsx('p-6 pt-4', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;