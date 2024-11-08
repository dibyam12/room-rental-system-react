import {userListReducer, userLoginReducer, userRegisterReducer} from "./reducers/userReducers";
import { configureStore } from "@reduxjs/toolkit";
import coordinateReducer, {addRoomReducer, roomDetailReducer, roomDetailsReducer} from "./reducers/roomReducers.jsx";
// import {userListReducer} from "./actions/userActions.jsx";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    roomDetails: roomDetailReducer,
    roomDetail: roomDetailsReducer,
    addRooms: addRoomReducer,
    coordinates: coordinateReducer,
  },
});

export default store;
