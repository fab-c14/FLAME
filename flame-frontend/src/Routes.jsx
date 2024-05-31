import React,{useState} from 'react';
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
import Community from './Pages/Community/Community';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Routes = () => {
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


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Location = useLocation();
  // console.log(Location.pathname);

  const handleLogin = () => {
    // Logic to handle login and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic to handle logout and set isLoggedIn to false
    setIsLoggedIn(false);
  };

  const isEditor = Location.pathname === '/editor';



  return (
    <>
   {!isEditor && <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
    <Rs>
      <Route exact path="/" element={
        <React.Fragment>
          <Header />
          <About />
          <Docs />
          <Features />
        </React.Fragment>
      } />
      <Route path="/docs" element={<Documentation />} />
      {
       
      }

      {!user && <Route path="/register" element={<Registration />} />}
      {!user && <Route path="/login" element={<Login handleLogin={handleLogin} />} />}
      <Route path="/editor" element={<Editor />} />
      <Route path="/profile" element={<Profile user={user||null} />} />
      <Route path="/community" element={<Community user={user||null} />} />
    </Rs>
    {!isEditor && <Footer /> }
    </>
  );
};

export default Routes;
