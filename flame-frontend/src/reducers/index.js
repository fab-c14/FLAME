// src/reducers/index.js
import { combineReducers } from 'redux';
import batchReducer from './batchReducer';
import authReducer from './authReducer'; // Adjust the import based on your authReducer location

const rootReducer = combineReducers({
    auth: authReducer,
    batches: batchReducer,
    // question:questionReducer,
});

export default rootReducer;
