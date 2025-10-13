import React,{useEffect, useState} from 'react';
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
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./actions/actionTypes";
import { BACKEND_URL } from "./config";
import Community from "./Pages/Community/Community";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage/AnimatedPage";

const Routes = () => {
  let user = null; // Initialize user to null
  const token = localStorage.getItem("token");

  // Load user from server using token to avoid client-side decoding
  useEffect(() => {
    const loadUser = async () => {
      // If token present in localStorage, try Authorization header first
      try {
        let resp = null;
        if (token) {
          try {
            resp = await axios.get(`${BACKEND_URL}/api/users/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (e) {
            // fallback to cookie-based request
            resp = await axios.get(`${BACKEND_URL}/api/users/me`, {
              withCredentials: true,
            });
          }
        } else {
          // no token in localStorage, try cookie-based request
          resp = await axios.get(`${BACKEND_URL}/api/users/me`, {
            withCredentials: true,
          });
        }

        if (resp && resp.data) {
          user = resp.data; // local for this render
          dispatch({ type: LOGIN_SUCCESS, payload: resp.data });
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Could not load user from /me", err);
      }
    };
    loadUser();
  }, [token]);

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoggedIn = localStorage.getItem("token") !== null;
  useEffect(() => {
    setIsLoggedIn(userLoggedIn);
  }, [userLoggedIn]);
  const Location = useLocation();
  // console.log(Location.pathname);

  const handleLogin = () => {
    // Logic to handle login and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const isEditor = Location.pathname === "/editor";

  return (
    <>
      {!isEditor && <Navbar isLoggedIn={isLoggedIn} />}
      <AnimatePresence mode="wait">
        <Rs location={Location} key={Location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Header isLoggedIn={isLoggedIn} />
                <About isLoggedIn={isLoggedIn} />
                <Docs />
                <Features />
              </AnimatedPage>
            }
          />
          {!user && (
            <Route
              path="/register"
              element={
                <AnimatedPage>
                  <Registration />
                </AnimatedPage>
              }
            />
          )}
          {!user && (
            <Route
              path="/login"
              element={
                <AnimatedPage>
                  <Login handleLogin={handleLogin} />
                </AnimatedPage>
              }
            />
          )}
          <Route
            path="/docs"
            element={
              <AnimatedPage>
                <Documentation />
              </AnimatedPage>
            }
          />
          <Route
            path="/editor"
            element={
              <AnimatedPage>
                <Editor />
              </AnimatedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <AnimatedPage>
                <Profile user={user || null} />
              </AnimatedPage>
            }
          />
          <Route
            path="/community"
            element={
              <AnimatedPage>
                <Community user={user || null} />
              </AnimatedPage>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatedPage>
                <About isLoggedIn={isLoggedIn} />
              </AnimatedPage>
            }
          />
        </Rs>
      </AnimatePresence>
      {!isEditor && <Footer />}
    </>
  );
};

export default Routes;
