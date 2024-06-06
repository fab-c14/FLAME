// reducer.js
import { CREATE_QUESTION, GET_QUESTIONS } from './actionTypes';

const initialState = {
    questions: [],
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload],
            };
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
            };
        default:
            return state;
    }
};

export default questionReducer;
