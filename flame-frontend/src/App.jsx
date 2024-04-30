import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';

function App() {

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
        <ParticlesBg bg={true} type={'fountain'} zIndex={'-1'} num={3}   />

        {/*  make sure put your components here for better experienced particles js */}
                
          <Navbar/>
          <Header />
          
         
          
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
