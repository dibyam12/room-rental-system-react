import {
  ROOM_DETAIL_FAIL,
  ROOM_DETAIL_REQUEST,
  ROOM_DETAIL_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  REMOVE_ROOM_REQUEST,
  REMOVE_ROOM_SUCCESS,
  REMOVE_ROOM_FAIL,
  REMOVE_BOOKED_ROOM_REQUEST,
  REMOVE_BOOKED_ROOM_SUCCESS,
  REMOVE_BOOKED_ROOM_FAIL
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

export const fetchRoomDetail = () => async (dispatch) => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"))?.access;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${backendUrl}/roomdetail/`, config);
    console.log(response.data);

    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.detail || error.message
          : error.message,
    });
  }
};

export const SET_COORDINATES = "SET_COORDINATES";

export const setCoordinates = (longitude, latitude) => ({
  type: SET_COORDINATES,
  payload: { longitude, latitude },
});

export const SET_SELECTED_ROOM_ADDRESS = "SET_SELECTED_ROOM_ADDRESS";

export const setRoomAddress = (address) => ({
  type: SET_SELECTED_ROOM_ADDRESS,
  payload: address,
});


export const removeRoom = (roomId) => async (dispatch) => {
  try {
      dispatch({ type: REMOVE_ROOM_REQUEST });

      const token = JSON.parse(localStorage.getItem("userInfo"))?.access;

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      await axios.delete(`${backendUrl}/removerooms/${roomId}/`, config);

      dispatch({ type: REMOVE_ROOM_SUCCESS, payload: roomId });
  } catch (error) {
      dispatch({
          type: REMOVE_ROOM_FAIL,
          payload: error.response?.data?.detail || error.message,
      });
  }
};


export const removeBookedRoom = (roomId) => async (dispatch) => {
  try {
      dispatch({ type: REMOVE_BOOKED_ROOM_REQUEST });

      const token = JSON.parse(localStorage.getItem("userInfo"))?.access;

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      await axios.delete(`${backendUrl}/removebookedroom/${roomId}/`, config);

      dispatch({ type: REMOVE_BOOKED_ROOM_SUCCESS, payload: roomId });
  } catch (error) {
      dispatch({
          type: REMOVE_BOOKED_ROOM_FAIL,
          payload: error.response?.data?.detail || error.message,
      });
  }
};