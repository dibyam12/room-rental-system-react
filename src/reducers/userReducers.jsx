import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST} from '../constants/userConstants'
// import {createSlice} from "@reduxjs/toolkit";
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
    userInfo: userInfoFromStorage,
}
export const userLoginReducer = (state= initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}



export const userRegisterReducer = (state= initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}





