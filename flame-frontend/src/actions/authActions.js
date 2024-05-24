import axios from 'axios';
import { BACKEND_URL } from '../config';
import { jwtDecode } from 'jwt-decode';


export const loginUser = (email, password, userType) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password, userType });
    const { token } = response.data; // Extract token from response
    localStorage.setItem('token', token); // Store the token in localStorage
    const decoded = jwtDecode(token); // Decode the token
    dispatch({ type: 'LOGIN_SUCCESS', payload: decoded });
    dispatch({ type: 'LOAD_TOKEN', payload: decoded }); // Dispatch LOAD_TOKEN action
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error: error.message });
  }
};

export const registerUser = (name, email, password, userType) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, { name, email, password, role: userType });
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', error: error.message });
  }
};

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});



export const loadToken = () => (dispatch) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // Decode the token
    const decoded = jwtDecode(token);
    // Dispatch an action to set the user with decoded token
    dispatch({ type: "LOAD_TOKEN", payload: decoded });
  }
};