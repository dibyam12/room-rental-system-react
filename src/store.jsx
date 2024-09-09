import {configureStore} from "@reduxjs/toolkit";
import {userLoginReducer} from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
    }
})



export default store;



