import React from 'react';
import { BrowserRouter, Routes as Rs, Route } from 'react-router-dom';
import About from './components/About/About';
import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Docs from './components/Docs/DocsSection';
import Documentation from './components/Docs/Documentation';
import Registration from './components/SignUp/Register/Register';
import Login from './components/SignUp/Login/Login';
import Editor from './Pages/Editor/Editor';
import Profile from './Pages/Profile/Profile';
import {jwtDecode} from 'jwt-decode';



const Routes = ({ handleLogin }) => {
  let user = null; // Initialize user to null

  const token = localStorage.getItem('token');
  if (token) {
    try {
      user = jwtDecode(token).user; // Decode the JWT token
    } catch (error) {
      console.error('Invalid token:', error);
      // Handle invalid token (optional)
    }
  }

  console.log(user);

  return (
    <Rs>
      <Route path="/" element={
        <React.Fragment>
          <Header />
          <About />
          <Docs />
          <Features />
        </React.Fragment>
      } />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/profile" element={<Profile user={user||null} />} />
    </Rs>
  );
};

export default Routes;
