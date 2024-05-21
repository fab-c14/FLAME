import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import Routes from './Routes';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic to handle login and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic to handle logout and set isLoggedIn to false
    setIsLoggedIn(false);
  };

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
        <ParticlesBg bg={true} type={'cobweb'} zIndex={'-1'} num={30} speed={0.1} color={['red', 'green']} />
      </div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes handleLogin={handleLogin} />
      <Footer />
    </div>
  );
}

export default App;
