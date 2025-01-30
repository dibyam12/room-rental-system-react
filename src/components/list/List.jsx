import { useEffect, useState } from "react";
import { FaArrowRight, FaFilter, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchRoomDetails } from "../../actions/roomActions.jsx";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms = [], loading, error } = roomDetails; // Default to empty array if `rooms` is undefined

  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    dispatch(fetchRoomDetails());
  }, [dispatch]);

  const locationHandler = (latitude, longitude,address) => {
    const coordinates = { latitude, longitude };
    console.log("Storing coordinates:", coordinates,address); // Check the coordinates
    localStorage.setItem("coordinates", JSON.stringify(coordinates,address));
    // localStorage.setItem("address", JSON.stringify(address));

    // Dispatch action to save coordinates in Redux state
    dispatch({
      type: "SET_COORDINATES",
      payload: coordinates,
    });
    dispatch({
      type: "SET_SELECTED_ROOM_ADDRESS",
      payload: address,
    });
    
  };

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase(); // Ensure lowercase comparison
    setFilters(
      (prevFilters) =>
        prevFilters.includes(value)
          ? prevFilters.filter((filter) => filter !== value) // Remove filter if already selected
          : [...prevFilters, value] // Add filter if not already selected
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convert search term to lowercase for case-insensitive search
  };

  const filteredRooms = rooms.filter((room) => {
    const roomFlatType = room.roomFlat ? room.roomFlat.toLowerCase() : ""; // Normalize and handle undefined
    const matchesSearch = room.address.toLowerCase().includes(searchTerm); // Check if the address contains the search term
    const matchesFilters =
      filters.length === 0 || filters.includes(roomFlatType); // Apply filters if any

    return matchesSearch && matchesFilters && !room.rented; // Ensure room is not rented
  });

  return (
    <>
      <div className="search-bar inline-flex items-center m-1">
        <input
          placeholder="Search address"
          type="text"
          className="searchBar w-[100%] p-2 text-black outline rounded-full"
          value={searchTerm} // Bind search input value to state
          onChange={handleSearchChange} // Handle search input change
        />
        {/* <button className="bg-cyan-600 font-semi-old border text-white p-2 ml-1 hover:bg-white rounded-full border-white hover:text-cyan-600 hover:outline-none">
          <FaSearch className="text-xl" />
        </button> */}
      </div>
      <div className="filter inline-flex items-center text-base hover:cursor-pointer mb-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mt-0">
            Filter <FaFilter />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {["room", "flat", "house"].map((filter) => (
              <li key={filter}>
                <a>
                  <input
                    type="checkbox"
                    value={filter}
                    onChange={handleFilterChange}
                    checked={filters.includes(filter.toLowerCase())}
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
            className="card flex outline rounded-md h-1/5 w-[95%] m-2 hover:cursor-pointer"
            onClick={() => locationHandler(room.longitude, room.latitude,room.address)}
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
