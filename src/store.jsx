import {
  registrationDetailsReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer
} from "./reducers/userReducers";
import { configureStore } from "@reduxjs/toolkit";
import coordinateReducer, {addRoomReducer, roomDetailReducer, roomDetailsReducer} from "./reducers/roomReducers.jsx";
import chatReducer, {chatUsersReducer} from "./reducers/chatReducer.jsx";
// import {userListReducer} from "./actions/userActions.jsx";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userList: userListReducer,
    userProfile: userProfileReducer,
    userRegister: userRegisterReducer,
    registrationDetail: registrationDetailsReducer,
    roomDetails: roomDetailReducer,
    roomDetail: roomDetailsReducer,
    addRooms: addRoomReducer,
    coordinates: coordinateReducer,
    chat:chatReducer,
    chatUsers:chatUsersReducer,
  },
});

export default store;
