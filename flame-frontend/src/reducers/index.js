// src/reducers/index.js
import { combineReducers } from 'redux';
import batchReducer from './batchReducer.js';
import authReducer from './authReducer.js'; // Adjust the import based on your authReducer location

const rootReducer = combineReducers({
    auth: authReducer,
    batches: batchReducer,
});

export default rootReducer;
