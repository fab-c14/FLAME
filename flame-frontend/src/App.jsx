import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import 'tachyons';
import ParticlesBg from 'particles-bg';
function App() {
  const particlesConfig = {
    num: 5,
    color: ["#ff0000", "#ff6600", "#ff9933"],
    shape: "circle",
    opacity: 0.8,
    size: 100,
    speed: 2,
    zIndex: -1,
    position: "none",
    direction: "none",
    random: true,
    // straight: false,
    outMode: "out",
    bounce: false,
    attract: { enable: true },
    pauseOnBlur: true,
    density: 20, // Increase or decrease the density of particles
    lineLinked: { enable: true }, // Connect particles with lines
    collisions: { enable: true }, // Enable particle collisions
    move: { enable: true, gravity: { enable: true } }, // Particle movement settings
    sizeAnimation: { enable: true, speed: 20, sync: false }, // Particle size animation

    polygon: { nb_sides: 5 }, // Number of sides for polygon shape
    detectRetina: true, // Detect retina displays for high DPI

};



  return (
    <>

    <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <ParticlesBg bg={true} type={'custom'} zIndex={'-1'} num={20} config={particlesConfig}  />

        {/*  make sure put your components here for better experienced particles js */}
        <h1 className='tc'>SKIbiid</h1>
      </div>

      {/* <NavigationComponent/> */}
      {/* <HomeComponent /> */}
      {/* <FeturesComponent /> */}
      {/* <FooterComponent /> */}

      {/* Add On */}

      {/* <Login /><Register /> 
       For now we need these components so to get started, let's start building these components 
      
      */}
   
    </>
  )
}

export default App
