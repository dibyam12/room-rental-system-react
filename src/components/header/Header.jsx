// import React from "react";
// import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./Header.css";
// import { Autocomplete } from "@react-google-maps/api";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.jsx";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { user, loading, error } = useSelector((state) => state.userProfile);
  // console.log(user,'sfsf')
  // const { users, loading, error } = useSelector(state => state.userList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(userInfo,'sdf')
  const logoutHandler = () => {
    dispatch(logout());
  };
  // const [value, setValue] = useState(null);
  return (
    <>
      <nav className="bg-cyan-600 text-white p-4 flex flex-row justify-between items-center">
        <div className="logo  font-extrabold ">
          <Link to="/">
            <h2>Room Rental System</h2>
          </Link>
        </div>
        <div className="contents">
          {/* <div className="search-bar inline-flex items-center">
            <input
              type="text"
              className="searchBar w-96 p-3 text-black  focus:outline-none rounded-full  "
            />
            <button className=" bg-cyan-600 font-semi-old border text-white p-3  ml-1 hover:bg-white rounded-full   border-white hover:text-cyan-600 hover:outline-none">
              <FaSearch className="text-xl" />
            </button>
          </div> */}
          {/* </Autocomplete> */}

          <div className="buttons">
            {console.log(userInfo)}

            {userInfo?.profile?.userType === "Landlord" ||
              (userInfo?.profile?.userType === "Admin" && (
                <Link to="/myrooms">
                  <button className="h-10 px-6 font-semibold rounded-md border mr-2 text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                    My Rooms
                  </button>
                </Link>
              ))}

            {userInfo && (
              <Link to="/message/1">
                <button className="h-10 px-6 font-semibold rounded-md border mr-2 text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                  Message
                </button>
              </Link>
            )}
            {userInfo?.profile?.userType === "Landlord" ||
              (userInfo?.profile?.userType === "Admin" && (
                <Link to="/add-room">
                  <button className="h-10 px-6 font-semibold rounded-md border mr-2 text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                    Add Rent
                  </button>
                </Link>
              ))}

            {userInfo && (
              <Link to="/profile">
                <button className="h-10 px-6 mr-2 font-semibold rounded-md border text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                  Profile
                </button>
              </Link>
            )}
            {userInfo ? (
              <Link to="/">
                <button
                  onClick={logoutHandler}
                  className="h-10 px-6 font-semibold rounded-md border text-white border-slate-200 hover:bg-white hover:text-cyan-600  "
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="h-10 px-6 ml-2 font-semibold rounded-md border text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                  Login
                </button>
              </Link>
            )}

            {/* {userInfo?.profile?.is_verified ? (
              <Link to="/" className="pop-up">
                Verified
              </Link>
            ) : (
              <Link to="/register-verify" className="pop-up">
                Unverified
              </Link>
            )} */}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
