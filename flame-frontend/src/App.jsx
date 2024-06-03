import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import Routes from './Routes';


function App() {


  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          backgroundSize: 'cover',
          color: '#ffaa00',
          zIndex: -1,
        }}
      >
        {/* <ParticlesBg bg={true} type={'fountain'} zIndex={'-1'} num={2} speed={0.1} color={['red', 'green']} /> */}
      </div>
      
      <Routes  />
      
    </div>
  );
}

export default App;
