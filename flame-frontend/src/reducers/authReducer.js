import { jwtDecode } from 'jwt-decode';

// Action type constants
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOAD_TOKEN = 'LOAD_TOKEN'; 

// Initial state
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case LOAD_TOKEN:
      return { ...state, user: action.payload }; // Set user from token
    default:
      return state;
  }
};

export default authReducer;
