import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import 'tachyons';
import ParticlesBg from 'particles-bg';
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
        <h1 className='tc f-headline lh-solid  shadow-3 br4'>
          Foundation for Learning Assistance and Mangement Environment</h1>
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
