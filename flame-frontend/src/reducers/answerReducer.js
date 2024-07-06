import { 
    CREATE_ANSWER_REQUEST,
    CREATE_ANSWER_SUCCESS,
    CREATE_ANSWER_FAILED,
    GET_ANSWER_REQUEST,
    GET_ANSWER_SUCCESS,
    GET_ANSWER_FAILED,
    CLEAR_ANSWERS
} from "../actions/actionTypes";

const initialState = {
    answers: [],
    loading: false,
    error: null,
};

const answerReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ANSWER_REQUEST:
        case GET_ANSWER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_ANSWER_SUCCESS:
            return {
                ...state,
                loading: false,
                answers: [...state.answers, action.payload]
            };
        case GET_ANSWER_SUCCESS:
            return {
                ...state,
                loading: false,
                answers: action.payload
            };
        case CREATE_ANSWER_FAILED:
        case GET_ANSWER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ANSWERS:
            return {
                ...state,
                answers: []
            };
        default:
            return state;
    }
}

export default answerReducer;
