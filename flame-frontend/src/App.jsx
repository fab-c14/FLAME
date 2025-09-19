import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import 'tachyons';
import './App.css';
import Toaster from './assets/Toaster';
import Routes from './Routes';


function App() {

  const [toastProps, setToastProps] = useState({
    position: 'top-center',
    type: 'info',
    message: 'Hey Dear, Welcome to FLAME(Foundation for Learning Assistance and Management Environment)',
    autoClose: 2000,
    closeOnClick: true,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true, 
    theme: 'dark',
  });

  return (
    <ChakraProvider>
      <div>
        <Toaster
          {...toastProps}
        />
        <Routes />
      </div>
    </ChakraProvider>
  );
}

export default App;
