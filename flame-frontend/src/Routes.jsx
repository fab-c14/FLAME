import React from 'react';
import {
  BrowserRouter,
  Routes as Rs,
  Route,
} from "react-router-dom";
import About from './components/About/About';
import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Docs from './components/Docs/DocsSection';
import Documentation from './components/Docs/Documentation';
import Registration from './components/SignUp/Register/Register';
import Login from './components/SignUp/Login/Login';
import Editor from './Pages/Editor/Editor';
import Profile from './Pages/Profile/Profile';

const Routes = ({ handleLogin }) => {
  const user = localStorage.getItem('user');

  return (
    
      <Rs>
        <Route path="/" element={<React.Fragment >
    
          <Header />
          <About />
          <Docs />
          <Features />
        </React.Fragment>} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Rs>
    
  )
}

export default Routes;





