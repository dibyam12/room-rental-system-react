// import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoomDetails } from "../../actions/roomActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../../actions/roomActions.jsx";
const List = () => {
  // const {setLongitude, setLatitude} = useAppContext()
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms, loading, error } = roomDetails;
  // const [longitude, setLongitude] = useState(1)
  // const [latitude, setLatitude] = useState(1)
  useEffect(() => {
    dispatch(fetchRoomDetails());
  }, []);

  const locationHandler = (latitude, longitude) => {
    const coordinates = { latitude, longitude };
    console.log("Storing coordinates:", coordinates); // Check the coordinates
    localStorage.setItem("coordinates", JSON.stringify(coordinates));

    // Dispatch action to save coordinates in Redux state
    dispatch({
      type: "SET_COORDINATES",
      payload: coordinates,
    });
  };

  return (
    <>
      <div className="filter inline-flex items-center text-base hover:cursor-pointer">
        Filter <FaFilter />
      </div>
      <div className="room-lists">
        {rooms.map((room) => (
          <div
            className="card flex outline rounded-md h-1/5 w-full m-2 hover:cursor-pointer"
            onClick={() => locationHandler(room.longitude, room.latitude)}
            key={room.id}
          >
            <div className="Place-name mt-3 flex flex-col ml-2">
              <h1 className="font-black text-xl mb-2">
                {room.number_of_rooms}
                {" rooms "}
              </h1>
              <div className="Address ">
                {" "}
                <b>Address: &nbsp;</b>
                {room.address}
              </div>
              <Link to={`/room-details/${room.id}`}>
                <div className="view-more justify-end inline-flex hover:cursor-pointer items-center">
                  Details <FaArrowRight />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
