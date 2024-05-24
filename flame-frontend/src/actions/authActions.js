import axios from 'axios';
import { BACKEND_URL } from '../config';
import {jwtDecode} from 'jwt-decode';

export const loginUser = (email, password, userType) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password, userType });
    const { token } = response.data; // Extract token from response
    const decoded = jwtDecode(token); // Decode the token
    localStorage.setItem('token', JSON.stringify(token)); // Store the token in localStorage
    // localStorage.setItem('user', JSON.stringify(decoded)); // Store the decoded user in localStorage
    dispatch({ type: 'LOGIN_SUCCESS', payload: decoded });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error: error.message });
  }
};
