import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST
} from "../constants/userConstants";
import axios from "axios";
import { backendUrl } from "../constants/userConstants";
import swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

export const login = (email, password) => async (dispatch) => {
  //   const navigate = useNavigate();
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${backendUrl}/user/login/`,
      { username: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

    swal.fire({
      title: "Login Successful",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    // navigate("/home");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });

    swal.fire({
      title: "Login Failed",
      text:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : "An error occurred during login",
      icon: "error",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    // navigate("/");
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  })

}


export const register = (email, password,username,name,phone_number,userType) => async (dispatch) => {

  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${backendUrl}/user/register/`,
      { 'name': name, 'password': password, 'email':email,'username':username,'phone_number':phone_number,'userType':userType },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    
    localStorage.setItem("userInfo", JSON.stringify(data));

    g
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data
        ? error.response.data.detail || error.message
        : error.message,
    });

    swal.fire({
      title: "Register Failed",
      text:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : "An error occurred during login",
      icon: "error",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    // navigate("/");
  }
};