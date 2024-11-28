import {FETCH_MESSAGE_FAIL, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS} from "../constants/userConstants.jsx";

const initialState = {
  loading: false,
  messages: [],
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MESSAGE_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case FETCH_MESSAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default chatReducer;