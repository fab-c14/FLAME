// Temporary compatibility layer for react-bootstrap components
// This provides simple replacements to avoid build errors while we migrate

export const Container = ({ children, className = '', ...props }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
    {children}
  </div>
);

export const Row = ({ children, className = '', ...props }) => (
  <div className={`flex flex-wrap -mx-4 ${className}`} {...props}>
    {children}
  </div>
);

export const Col = ({ children, className = '', md, xs, ...props }) => {
  let colClass = 'px-4 ';
  if (md) colClass += `md:w-${md}/12 `;
  if (xs) colClass += `w-${xs}/12 `;
  
  return (
    <div className={`${colClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

Card.Header = ({ children, className = '', ...props }) => (
  <div className={`pb-4 border-b border-white/20 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold text-white mb-2 ${className}`} {...props}>
    {children}
  </h3>
);

Card.Text = ({ children, className = '', ...props }) => (
  <p className={`text-white/80 ${className}`} {...props}>
    {children}
  </p>
);

export const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Form = ({ children, className = '', ...props }) => (
  <form className={`space-y-4 ${className}`} {...props}>
    {children}
  </form>
);

Form.Group = ({ children, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {children}
  </div>
);

Form.Label = ({ children, className = '', ...props }) => (
  <label className={`block text-sm font-semibold text-white ${className}`} {...props}>
    {children}
  </label>
);

Form.Control = ({ as = 'input', className = '', ...props }) => {
  const baseClass = 'w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200';
  
  if (as === 'select') {
    return <select className={`${baseClass} ${className}`} {...props} />;
  }
  
  return <input className={`${baseClass} ${className}`} {...props} />;
};

Form.Text = ({ children, className = '', ...props }) => (
  <small className={`text-white/70 ${className}`} {...props}>
    {children}
  </small>
);

export const ListGroup = ({ children, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {children}
  </div>
);

export const ListGroupItem = ({ children, className = '', ...props }) => (
  <div className={`p-4 bg-white/5 rounded-lg border border-white/10 ${className}`} {...props}>
    {children}
  </div>
);

export const InputGroup = ({ children, className = '', ...props }) => (
  <div className={`flex ${className}`} {...props}>
    {children}
  </div>
);

export const Modal = ({ children, show, onHide, className = '', ...props }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onHide}>
      <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl max-w-lg w-full mx-4 ${className}`} onClick={e => e.stopPropagation()} {...props}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children, className = '', ...props }) => (
  <div className={`pb-4 border-b border-white/20 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

Modal.Title = ({ children, className = '', ...props }) => (
  <h2 className={`text-2xl font-bold text-white ${className}`} {...props}>
    {children}
  </h2>
);

Modal.Body = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

Modal.Footer = ({ children, className = '', ...props }) => (
  <div className={`pt-4 border-t border-white/20 mt-4 flex justify-end space-x-2 ${className}`} {...props}>
    {children}
  </div>
);

export const Dropdown = ({ children, ...props }) => (
  <div className="relative inline-block" {...props}>
    {children}
  </div>
);

export const DropdownButton = ({ children, title, className = '', ...props }) => (
  <div className="relative inline-block">
    <button className={`px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg transition-all duration-300 ${className}`} {...props}>
      {title}
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-10">
      {children}
    </div>
  </div>
);

Dropdown.Item = ({ children, className = '', ...props }) => (
  <div className={`p-3 text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg ${className}`} {...props}>
    {children}
  </div>
);