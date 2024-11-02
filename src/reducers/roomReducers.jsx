import {
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
} from "../constants/userConstants.jsx";

import axios from "axios";
import { backendUrl } from "../constants/userConstants.jsx";



const initialState = {
    rooms: [],   // List of rooms
    loading: false, // Loading state
    error: null, // Error state
};

export const roomDetailReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ROOM_DETAIL_REQUEST:
            return { ...state, loading: true };
        case ROOM_DETAIL_SUCCESS:
            return { ...state, loading: false, rooms: action.payload };
        case ROOM_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }

}


import {SET_COORDINATES} from "../actions/roomActions.jsx";

const locationState = {
    longitude: null,
    latitude: null,
};

const coordinateReducer = (state = locationState, action) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                longitude: action.payload.longitude,
                latitude: action.payload.latitude,
            };
        default:
            return state;
    }
};

export default coordinateReducer;






