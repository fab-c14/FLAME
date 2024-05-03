import React from 'react'
import {
    BrowserRouter,
    Routes as Rs,
    Route,
    Link,
  } from "react-router-dom";
import About from './components/About/About';
import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Docs from './components/Docs/DocsSection';
import Documentation from './components/Docs/Documentation';
import Registration from './components/SignUp/Register/Register';
const Routes = () => {
  return (
   
    <BrowserRouter>
      <Rs>
        <Route path="/" element={<React.Fragment >
            <Header />
            <About />
            <Docs /> 
            <Features />
            </React.Fragment>} 
        />
        
        
        <Route path="/Docs" element={<Documentation />} /> 
        <Route path="/Login" element={<Registration />} /> 
      </Rs>
    </BrowserRouter>
    
  )
}

export default Routes