import {
    backendUrl,
    FETCH_PAYMENT_FAIL,FETCH_PAYMENT_REQUEST,FETCH_PAYMENT_SUCCESS
} from "../../constants/userConstants.jsx";
import axios from "axios";

export const fetchPaymentDetails = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PAYMENT_REQUEST });

       
        const token = JSON.parse(localStorage.getItem("userInfo"))?.access;

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        
        const response = await axios.get(`${backendUrl}/paymenthistory/`, config);
        console.log(response.data);

        dispatch({ type: FETCH_PAYMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_PAYMENT_FAIL,
            payload:
                error.response && error.response.data
                    ? error.response.data.detail || error.message
                    : error.message,
        });
    }
};

