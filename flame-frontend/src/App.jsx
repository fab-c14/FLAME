import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css'
import Routes from './Routes';
import { Editor } from './components/Editor/Editor';

function App() {

  return (
    <div>
    <div
        style={{
          width: '100%',
          height: '100%',
          position:"fixed",
          backgroundSize: 'cover',
          color:'#ffaa00',
          zIndex: -1,
        }}
      ><ParticlesBg bg={true} type={'cobweb'} zIndex={'-1'} num={30} speed={0.1} color={['red','green']}  />

        {/*  make sure put your components here for better experienced particles js */}
      </div>
        <Navbar/>
        <Editor />
        <Routes />
        <Footer />
       
      
      {/* <NavigationComponent/> :✅ */} 
      {/* <HomeComponent /> : ✅ */} 
      {/* <FeturesComponent /> :✅ */} 
      {/* <FooterComponent /> :✅*/}   
      {/* Set up routes with react router and ... */}

      {/* Add On */}

      {/* <Login /><Register /> :✅ 
       For now we need these components so to get started, let's start building these components 

       // Seperating this to routes 
      */}

      {/* 
      Integrating an online ide interface :✅ 
      */}

      </div>


   

  )
}

export default App
