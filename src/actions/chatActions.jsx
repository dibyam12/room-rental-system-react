// src/api.js
import axios from 'axios';
import {
  backendUrl,
  FETCH_MESSAGE_FAIL,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS
} from "../constants/userConstants.jsx";

// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const token = JSON.parse(localStorage.getItem("userInfo"))?.access;


export const getMyMessages = async (userId) => {
  try {
    const response = await axios.get(`${backendUrl}/myMessages/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const getMessages = async (senderId, receiverId) => {
  try {
    const response = await axios.get(`${backendUrl}/getMessages/${senderId}/${receiverId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages between users:', error);
    throw error;
  }
};


export const sendMessage = async (messageData) => {
  try {
    console.log(messageData,'message')
    const response = await axios.post(`${backendUrl}/chat-messages/`, messageData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error;
  }
};




//

////////////////////////////////////////
export const fetchMessages = (senderId, receiverId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MESSAGE_REQUEST });
    const token = JSON.parse(localStorage.getItem('userInfo'))?.access; // Get the token from localStorage if needed

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${backendUrl}/chat-messages/?sender=${senderId}&receiver=${receiverId}`, config);
    dispatch({ type: FETCH_MESSAGE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_MESSAGE_FAIL,
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};


