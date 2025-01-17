// reducers/paymentReducer.jsx
import {
  FETCH_PAYMENT_REQUEST,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAIL,
} from "../constants/userConstants";

export const paymentReducer = (state = { paymentHistory: [] }, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_REQUEST:
      return { loading: true, paymentHistory: [] };
    case FETCH_PAYMENT_SUCCESS:
      return { loading: false, paymentHistory: action.payload };
    case FETCH_PAYMENT_FAIL:
      return { loading: false, error: action.payload, paymentHistory: [] };
    default:
      return state;
  }
};
