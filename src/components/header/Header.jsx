// import React from "react";
// import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./Header.css";
// import { Autocomplete } from "@react-google-maps/api";
import { Link } from "react-router-dom";
const Header = () => {
  // const [value, setValue] = useState(null);
  return (
    <>
      <nav className="bg-cyan-600 text-white p-5 flex flex-row justify-between items-center">
        <div className="logo  font-extrabold ">
          <Link to="/home">
            <h2>Room Rental System</h2>
          </Link>
        </div>
        <div className="contents">
          {/* <Autocomplete className="z-100"> */}
          {/* <GooglePlacesAutocomplete
              apiKey="AIzaSyDtHerYTUch_a9ouhSYDO7hb1Rcga2Zs8Q"
              selectProps={{
                value,
                onChange: setValue,
                placeholder: "Search Area",
                isClearable: true,
                className:
                  "searchBar z-666 w-96 p-3 text-black  focus:outline-none rounded-full ",
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                },
              }}
            /> */}
          <div className="search-bar inline-flex items-center">
            <input
              type="text"
              className="searchBar w-96 p-3 text-black  focus:outline-none rounded-full  "
            />
            <button className=" bg-cyan-600 font-semi-old border text-white p-3  ml-1 hover:bg-white rounded-full   border-white hover:text-cyan-600 hover:outline-none">
              <FaSearch className="text-xl" />
            </button>
          </div>
          {/* </Autocomplete> */}

          <div className="buttons">
            <Link to="/message">
              <button className="h-10 px-6 font-semibold rounded-md border mr-2 text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                Message
              </button>
            </Link>
            <Link to="/add-room">
              <button className="h-10 px-6 font-semibold rounded-md border mr-2 text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                Add Rent
              </button>
            </Link>
            <Link to="/">
              <button className="h-10 px-6 font-semibold rounded-md border text-white border-slate-200 hover:bg-white hover:text-cyan-600  ">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
