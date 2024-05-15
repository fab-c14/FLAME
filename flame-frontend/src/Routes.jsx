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
import Login from './components/SignUp/Login/Login';
import Editor from './Pages/Editor/Editor';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';



const Routes = () => {
  return (
   
    <BrowserRouter>
      <Rs>
        <Route path="/" element={<React.Fragment >
            <Navbar />
            <Header />
            <About />
            <Docs /> 
            <Features />
            <Footer/>
            </React.Fragment>} 
        />
        
        
        <Route path="/docs" element={<Documentation />} /> 
        <Route path="/register" element={<Registration />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
      </Rs>
    </BrowserRouter>
    
  )
}

export default Routes