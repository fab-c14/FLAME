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

export const submitAnswer = (userId, sourceCode, language, name, questionId) => async (dispatch) => {
    dispatch({ type: CREATE_ANSWER_REQUEST });
    try {
        const response = await axios.post(`${BACKEND_URL}/api/saveCode`, { userId, sourceCode, language, name, questionId });
        dispatch({ type: CREATE_ANSWER_SUCCESS, payload: response.data.snippet });
        console.log(response.data);
    } catch (error) {
        dispatch({ type: CREATE_ANSWER_FAILED, payload: error.message });
        console.log(error);
    }
}

export const getAnswers = () => async (dispatch) => {
    dispatch({ type: GET_ANSWER_REQUEST });
    try {
        const response = await axios.get(`${BACKEND_URL}/api/getAnswers`);
        dispatch({ type: GET_ANSWER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ANSWER_FAILED, payload: error.message });
        console.log(error);
    }
}
