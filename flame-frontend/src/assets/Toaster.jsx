// ToastComponent.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster= ({
  position = 'right-top',
  type = 'default',
  message = '',
  autoClose = 5000,
  closeOnClick = true,
  hideProgressBar = false,
  pauseOnHover = true,
  draggable = true,
  theme = 'light',
}) => {
  const showToast = () => {
    switch (type) {
      case 'info':
        toast.info(message);
        break;
      case 'success':
        toast.success(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message); 
        break;
    }
  };

  React.useEffect(() => {
    if (message) {
      showToast();
    }
  }, [message]);

  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={false}
      closeOnClick={closeOnClick}
      rtl={false}
      pauseOnFocusLoss
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    />
  );
};

export default Toaster;
