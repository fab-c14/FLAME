// actions.js
import axios from 'axios';
import {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAILURE,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
} from './actionTypes';
import { BACKEND_URL } from '../config';

// Action creator for creating a question
export const createQuestion = (question) => async (dispatch) => {
    dispatch({ type: CREATE_QUESTION_REQUEST });
    try {
        const response = await axios.post(`${BACKEND_URL}/api/questions/createQuestions`, question);
        dispatch({ type: CREATE_QUESTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_QUESTION_FAILURE, error: error.message });
    }
};

// Action creator for getting questions by batch ID
export const getQuestions = (batchId) => async (dispatch) => {
    dispatch({ type: GET_QUESTIONS_REQUEST });
    try {
        const response = await axios.get(`${BACKEND_URL}/api/questions/batch/${batchId}`);
        dispatch({ type: GET_QUESTIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_QUESTIONS_FAILURE, error: error.message });
    }
};
