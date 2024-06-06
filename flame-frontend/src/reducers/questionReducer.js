// reducer.js
import {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAILURE,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    questions: [],
    loading: false,
    error: null,
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION_REQUEST:
        case GET_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: [...state.questions, action.payload],
            };
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload,
            };
        case CREATE_QUESTION_FAILURE:
        case GET_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default questionReducer;
