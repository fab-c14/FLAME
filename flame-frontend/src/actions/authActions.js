import axios from 'axios';
import { BACKEND_URL } from '../config';
import {  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_FAILURE, REGISTER_SUCCESS,REGISTER_REQUEST } from './actionTypes';


export const loginUser = (email, password, userType) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password, userType });
    const { token } = response.data;
    localStorage.setItem('token', token);
    // Fetch normalized user from server to avoid client-side token decoding
    try {
      const meResp = await axios.get(`${BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (meResp?.data) {
        dispatch({ type: LOGIN_SUCCESS, payload: meResp.data });
      } else {
        // fallback: dispatch success without user (edge case)
        dispatch({ type: LOGIN_SUCCESS, payload: null });
      }
    } catch (err) {
      console.error('Could not fetch /me after login', err);
      dispatch({ type: LOGIN_SUCCESS, payload: null });
    }
  } catch (error) {
    dispatch({ type:LOGIN_FAILURE, error: error.message });
  }
};

export const registerUser = (name, email, password, userType) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, { name, email, password, role: userType });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loginUser(email,password,userType));
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, error: error.message });
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});



