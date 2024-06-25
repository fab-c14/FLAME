import { createStore, applyMiddleware, compose } from 'redux'; // Import compose
import {thunk} from 'redux-thunk'; // Import thunk correctly
import rootReducer from './reducers';

// Use compose from Redux to handle multiple enhancers
// this thing is for developer we can also skip this for logging and testing we are using this
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create your Redux store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
