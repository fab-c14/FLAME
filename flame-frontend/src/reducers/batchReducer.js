import {
  FETCH_BATCHES_REQUEST,
  FETCH_BATCHES_SUCCESS,
  FETCH_BATCHES_FAILURE,
  CREATE_BATCH_SUCCESS,
  JOIN_BATCH_SUCCESS,
  FETCH_JOINED_BATCHES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  batches: [],
  joinedBatches: [],
  loading: false,
  error: null,
};

const batchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BATCHES_REQUEST:
      return { ...state, loading: true };
    case FETCH_BATCHES_SUCCESS:
      return { ...state, loading: false, batches: action.payload };
    case FETCH_BATCHES_FAILURE:
      return { ...state, loading: false, error: action.error };
    case CREATE_BATCH_SUCCESS:
      return { ...state, batches: [...state.batches, action.payload] };
    case JOIN_BATCH_SUCCESS:
      return { ...state, joinedBatches: action.payload };
    case FETCH_JOINED_BATCHES_SUCCESS:
      return { ...state, joinedBatches: action.payload };
    default:
      return state;
  }
};

export default batchReducer;
