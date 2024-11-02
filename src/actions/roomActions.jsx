import {
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
} from "../constants/userConstants.jsx";

import axios from "axios";
import { backendUrl } from "../constants/userConstants.jsx";

export const fetchRoomDetails = () => async (dispatch) => {
    try {
        dispatch({ type: ROOM_DETAIL_REQUEST });

        const response = await axios.get(`${backendUrl}/roomdetails/`);
        console.log(response.data);

        dispatch({ type: ROOM_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: ROOM_DETAIL_FAIL,
            payload:
                error.response && error.response.data
                    ? error.response.data.detail || error.message
                    : error.message,
        });
    }
};

export const SET_COORDINATES = 'SET_COORDINATES';

export const setCoordinates = (longitude, latitude) => ({
    type: SET_COORDINATES,
    payload: { longitude, latitude },
});



