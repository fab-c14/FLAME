import React, { useState } from 'react';
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
    <div>
      {/* this div below was for displaying the particles for now we are not using it  */}
      {/* <div  
        style={{
          width: '100%',
          height: '100%',
          position: 'bottom',
          backgroundSize: 'cover',
          color: '#ffaa00',
          zIndex: -1,
        }}
      >
         <ParticlesBg bg={true} type={'fountain'} zIndex={'-1'} num={2} speed={0.1} color={['red', 'green']} /> 
      </div> */}
      <Toaster
        {...toastProps}
      />
      <Routes  />
      
    </div>
  );
}

export default App;
