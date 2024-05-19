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
import Profile from './Pages/Profile/Profile';


const Routes = () => {

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joined: '2022-01-15',
    stats: {
      totalRuns: 150,
      successfulRuns: 120,
      failedRuns: 30,
      lastActive: '2024-05-18T14:48:00',
    },
  };

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
        <Route path="/profile" element={<Profile user={user} />} />
      </Rs>
    </BrowserRouter>
    
  )
}

export default Routes