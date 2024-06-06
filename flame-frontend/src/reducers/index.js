// src/reducers/index.js
import { combineReducers } from 'redux';
import batchReducer from './batchReducer';
import authReducer from './authReducer'; // Adjust the import based on your authReducer location
import questionReducer from './questionReducer';
const rootReducer = combineReducers({
    auth: authReducer,
    batches: batchReducer,
    questions: questionReducer,
});

export default rootReducer;
