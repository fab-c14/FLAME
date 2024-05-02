import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import About from './components/About/About';
import './App.css'
import Features from './components/Features/Features';
import Docs from './components/Docs/DocsSection';
import Footer from './components/Footer/Footer';
function App() {

  return (
    <div>
    <div
        style={{
          width: '100%',
          height: '100%',
          position:"fixed",
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      ><ParticlesBg bg={true} type={'cobweb'} zIndex={'-1'} num={30} speed={0.1} color='red'  />

        {/*  make sure put your components here for better experienced particles js */}
      </div>
        <Navbar/>
          <Header />
          <About />
          <Docs />
          <Features />
          <Footer />
      {/* <NavigationComponent/> :✅ */} 
      {/* <HomeComponent /> : ✅ */} 
      {/* <FeturesComponent /> :✅ */} 
      {/* <FooterComponent /> :✅*/}   
      {/* Set up routes with react router and ... */}

      {/* Add On */}

      {/* <Login /><Register /> 
       For now we need these components so to get started, let's start building these components 
      
      */}


      </div>


   

  )
}

export default App
