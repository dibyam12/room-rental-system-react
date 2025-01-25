import {
    ADD_ROOM_FAIL,
    ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS,
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS,
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
export const roomDetailsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ROOM_DETAILS_SUCCESS:
            return { ...state, loading: false, rooms: action.payload };
        case ROOM_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }

}




export const addRoomReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_ROOM_REQUEST:
            return { ...state, loading: true };
        case ADD_ROOM_SUCCESS:
            return { ...state, loading: false, rooms: action.payload };
        case ADD_ROOM_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }

}





import {SET_COORDINATES, SET_SELECTED_ROOM_ADDRESS} from "../actions/roomActions.jsx";

const locationState = {
    longitude: null,
    latitude: null,
    address: null,
};


const coordinateReducer = (state = locationState, action) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                longitude: action.payload.longitude,
                latitude: action.payload.latitude,
            };
            case SET_SELECTED_ROOM_ADDRESS:
                return { ...state,  address: action.payload.address }; // Update address
        default:
            return state;
    }
};

export default coordinateReducer;






