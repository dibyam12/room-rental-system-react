// // import React from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { FaFilter } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchRoomDetails } from "../../actions/roomActions.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { setCoordinates } from "../../actions/roomActions.jsx";
// const List = () => {
//   // const {setLongitude, setLatitude} = useAppContext()
//   const dispatch = useDispatch();
//   const roomDetails = useSelector((state) => state.roomDetails);
//   const { rooms, loading, error } = roomDetails;
//   // const [longitude, setLongitude] = useState(1)
//   // const [latitude, setLatitude] = useState(1)
//   useEffect(() => {
//     dispatch(fetchRoomDetails());
//   }, []);

//   const locationHandler = (latitude, longitude) => {
//     const coordinates = { latitude, longitude };
//     console.log("Storing coordinates:", coordinates); // Check the coordinates
//     localStorage.setItem("coordinates", JSON.stringify(coordinates));

//     // Dispatch action to save coordinates in Redux state
//     dispatch({
//       type: "SET_COORDINATES",
//       payload: coordinates,
//     });
//   };

//   return (
//     <>
//       <div className="filter inline-flex items-center text-base hover:cursor-pointer mb-2">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn mt-0">
//             Filter <FaFilter />
//           </div>
//           <ul
//             tabIndex={0}
//             className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
//           >
//             <li>
//               <a>
//                 <input type="checkbox" value="Room" /> Room
//               </a>
//             </li>
//             <li>
//               <a>
//                 {" "}
//                 <input type="checkbox" value="Floor" />
//                 Floor
//               </a>
//             </li>
//             <li>
//               <a>
//                 <input type="checkbox" value="House" />
//                 House
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="room-lists">
//         {rooms.map((room) => (
//           <div
//             className="card flex outline rounded-md h-1/5 w-full m-2 hover:cursor-pointer"
//             onClick={() => locationHandler(room.longitude, room.latitude)}
//             key={room.id}
//           >
//             <div className="Place-name mt-3 flex flex-col ml-2">
//               <h1 className="font-black text-xl mb-2">
//                 {room.number_of_rooms}
//                 {" rooms "}
//               </h1>
//               <div className="Address ">
//                 {" "}
//                 <b>Address: &nbsp;</b>
//                 {room.address}
//               </div>
//               <Link to={`/room-details/${room.id}`}>
//                 <div className="view-more justify-end inline-flex hover:cursor-pointer items-center">
//                   Details <FaArrowRight />
//                 </div>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;

import { useEffect, useState } from "react";
import { FaArrowRight, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchRoomDetails } from "../../actions/roomActions.jsx";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms, loading, error } = roomDetails;

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(fetchRoomDetails());
  }, [dispatch]);

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

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilters(
      (prevFilters) =>
        prevFilters.includes(value)
          ? prevFilters.filter((filter) => filter !== value) // Remove filter if already selected
          : [...prevFilters, value] // Add filter if not already selected
    );
  };

  const filteredRooms = rooms.filter((room) => {
    // Show all rooms if no filters are selected
    if (filters.length === 0) return true;
    // Filter rooms based on selected filters
    return filters.includes(room.type); // Assuming room.type matches the filter values (e.g., "Room", "Floor", "House")
  });

  return (
    <>
      <div className="filter inline-flex items-center text-base hover:cursor-pointer mb-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mt-0">
            Filter <FaFilter />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {["Room", "Floor", "House"].map((filter) => (
              <li key={filter}>
                <a>
                  <input
                    type="checkbox"
                    value={filter}
                    onChange={handleFilterChange}
                    checked={filters.includes(filter)}
                  />
                  {filter}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="room-lists">
        {filteredRooms.map((room) => (
          <div
            className="card flex outline rounded-md h-1/5 w-full m-2 hover:cursor-pointer"
            onClick={() => locationHandler(room.longitude, room.latitude)}
            key={room.id}
          >
            <div className="Place-name mt-3 flex flex-col ml-2">
              <h1 className="font-black text-xl mb-2">
                {room.number_of_rooms} rooms
              </h1>
              <div className="Address">
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
