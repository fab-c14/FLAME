// actions.js
import axios from 'axios';
import {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAILURE,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    CREATE_ANSWER_REQUEST,
    CREATE_ANSWER_FAILED,
    CREATE_ANSWER_SUCCESS,
    GET_ANSWER_REQUEST,
    GET_ANSWER_SUCCESS,
    GET_ANSWER_FAILED
} from './actionTypes';
import { BACKEND_URL } from '../config';


// Action creator for creating a question
export const createQuestion = (question, user, batchId) => async (dispatch) => {
    dispatch({ type: CREATE_QUESTION_REQUEST });

    const payload = {
        title: question.title,
        createdBy: user.name,
        testCases: question.testCases,
        batchId: batchId,
    };

    try {
        const response = await axios.post(`${BACKEND_URL}/api/questions/createQuestion`, payload);
        dispatch({ type: CREATE_QUESTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_QUESTION_FAILURE, error: error.message });
    }
};

// Action creator for fetching questions
export const fetchQuestions = (batchId) => async (dispatch) => {
    dispatch({ type: GET_QUESTIONS_REQUEST });

    try {
        const response = await axios.get(`${BACKEND_URL}/api/questions/batch/${batchId}`);
        dispatch({ type: GET_QUESTIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_QUESTIONS_FAILURE, error: error.message });
    }
};



