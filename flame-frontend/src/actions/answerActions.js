import { 
    CREATE_ANSWER_REQUEST,
    CREATE_ANSWER_SUCCESS,
    CREATE_ANSWER_FAILED,
    GET_ANSWER_REQUEST,
    GET_ANSWER_SUCCESS,
    GET_ANSWER_FAILED
} from "./actionTypes";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const submitAnswer = (userId, sourceCode, language, name, questionId,questionTitle,testResult) => async (dispatch) => {

    dispatch({ type: CREATE_ANSWER_REQUEST });
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/saveCode`, { userId, sourceCode, language, name, questionId,questionTitle});
        console.log(testResult.some(test=> test.remarks === 'Fail'));
        const updateStats = await axios.post(`${BACKEND_URL}/api/updateUserStats`,{userId,testResult})
        dispatch({ type: CREATE_ANSWER_SUCCESS, payload: response.data.snippet });
    } catch (error) {
        dispatch({ type: CREATE_ANSWER_FAILED, payload: error.message });
        console.log(error);
    }
}

export const getAnswers = (userId) => async (dispatch) => {
    dispatch({ type: GET_ANSWER_REQUEST });
    try {
        const response = await axios.post(`${BACKEND_URL}/api/getAnswers`,{userId});
        dispatch({ type: GET_ANSWER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ANSWER_FAILED, payload: error.message });
        console.log(error);
    }
}
