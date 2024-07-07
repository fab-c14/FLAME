import axios from 'axios';
import { BACKEND_URL } from '../config';
import {
  FETCH_BATCHES_REQUEST,
  FETCH_BATCHES_SUCCESS,
  FETCH_BATCHES_FAILURE,
  CREATE_BATCH_SUCCESS,
  JOIN_BATCH_SUCCESS,
  FETCH_JOINED_BATCHES_SUCCESS,
} from './actionTypes';

export const fetchBatches = (createdBy) => async (dispatch) => {
  dispatch({ type: FETCH_BATCHES_REQUEST });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/batches`, { createdBy });
    dispatch({ type: FETCH_BATCHES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BATCHES_FAILURE, error });
  }
};

export const createBatch = (batchName, createdBy) => async (dispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/batches/create`, { name: batchName, createdBy });
    dispatch({ type: CREATE_BATCH_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating batch:', error);
  }
};

export const joinBatch = (batchCode, studentId) => async (dispatch) => {
  try {
    console.log(studentId);
    const response = await axios.post(`${BACKEND_URL}/api/batches/join/${batchCode}`, { studentId });
    dispatch({ type: JOIN_BATCH_SUCCESS, payload: response.data });

    // localStorage.setItem('joinedBatches', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error joining batch:', error);
  }
};

export const fetchJoinedBatches = (studentId) => async (dispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/batches/joined`, { studentId });
    dispatch({ type: FETCH_JOINED_BATCHES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching joined batches:', error);
  }
};
