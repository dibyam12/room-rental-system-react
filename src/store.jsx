import {userLoginReducer, userRegisterReducer} from "./reducers/userReducers";
import { configureStore } from "@reduxjs/toolkit";
import coordinateReducer, {roomDetailReducer} from "./reducers/roomReducers.jsx";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    roomDetails: roomDetailReducer,
    coordinates: coordinateReducer,
  },
});

export default store;
