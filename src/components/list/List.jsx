// import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const List = () => {
  const roomDetails = {
    totalRooms: "3 Rooms (1 flat)",
    roomAddress: "Baneshwor-31, Kathmandu",
  };

  return (
    <>
      <div className="filter inline-flex items-center text-base hover:cursor-pointer">
        Filter <FaFilter />
      </div>
      <div className="room-lists">
        <div className="card flex outline rounded-md h-1/5 w-full m-2">
          <div className="image w-5/12 bg-black">
            <img src="" alt="image" />
          </div>
          <div className="Place-name mt-3 flex flex-col ml-2">
            <h1 className="font-black text-xl mb-2">
              {roomDetails.totalRooms}{" "}
            </h1>
            <div className="Address ">
              {" "}
              <b>Address:</b>
              {roomDetails.roomAddress}
            </div>
            <Link to={`/room-details/${roomDetails.totalRooms}`}>
              <div className="view-more ml-32 inline-flex hover:cursor-pointer items-center">
                Details <FaArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
