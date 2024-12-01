import Slider from "react-slick";
import { useState, useEffect } from "react";
import "./PlaceDetails.css";
import noImage from "../../assets/no_image.png";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "../../constants/userConstants.jsx";

const PlaceDetails = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentFrom, setRentFrom] = useState('');
  const [rentTo, setRentTo] = useState('');
  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms } = roomDetails;
  const { roomid } = useParams();
  console.log(rooms,'roomsssssssssss')
  const room = rooms.find((room) => room.id === Number(roomid));

  useEffect(() => {
    if (room) {
      setLoading(false);
    } else {
      setError("Room not found.");
      setLoading(false);
    }
  }, [room]);

  const handleRent = async (e) => {
    e.preventDefault();
    if (!rentFrom || !rentTo) {
      alert('Please fill out both date fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("rent_id", roomid);
      formData.append("rent_from", rentFrom);
      formData.append("rent_to", rentTo);
      formData.append("rent", true);
       const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            },
        };
       const { data } = await axios.post(`${backendUrl}/handle-rent/`, formData, config);

     
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        room && (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            {/* Image Carousel */}
            <div className="slider">
              <div className="carousel w-full h-[80vh] rounded-lg overflow-hidden shadow-md bg-gray-200">
                {["image", "image1", "image2", "image3"].map(
                  (imgKey, index) =>
                    room[imgKey] && (
                      <div
                        key={imgKey}
                        className="carousel-item w-full h-full flex justify-center items-center"
                      >
                        <img
                          src={`${backendUrl}/${room[imgKey]}`}
                          alt={`Room ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )
                )}
              </div>
              {/* Carousel Navigation */}
              <div className="flex justify-center gap-2 py-4">
                {["image", "image1", "image2", "image3"].map(
                  (imgKey, index) =>
                    room[imgKey] && (
                      <a
                        key={imgKey}
                        href={`#${room[imgKey]}`}
                        className="btn btn-sm bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                      >
                        {index + 1}
                      </a>
                    )
                )}
              </div>
            </div>

            {/* Contact Options */}
            <div className="call-message flex items-center justify-between bg-gray-100 rounded-lg shadow-md my-6">
              <div className="call flex-1 flex items-center justify-center gap-2 p-4 hover:bg-gray-200 cursor-pointer">
                <IoCall className="icon text-black text-2xl" />
                <p className="font-semibold text-xl">{room.phoneNumber}</p>
              </div>
              <Link
                to={`/message/${room.user}`}
                className="message flex-1 flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-800 text-white rounded-r-lg transition-colors"
              >
                <MdMessage className="icon text-2xl" />
                <span className="font-semibold text-xl">Message Owner</span>
              </Link>
            </div>

            {/* Room Information */}
            <div className="room-info">
              <h2 className="text-4xl font-extrabold mb-4">Room Details</h2>
              <div className="details grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="total-rooms text-center">
                  <h3 className="text-3xl font-bold mb-2">Total Rooms</h3>
                  <p className="text-5xl font-black">{room.number_of_rooms}</p>
                </div>
                <div className="address">
                  <h3 className="text-3xl font-bold mb-2">Address</h3>
                  <p className="text-xl">{room.address}</p>
                  <p className="text-xl font-semibold mt-2">
                    Rent: Rs.{room.rent}
                  </p>
                  <p className="text-xl mt-2">Bathroom: {room.bathroom}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="details mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Additional Details</h3>
              {/*<p className="text-xl mt-2">Bathroom: {room.bathroom}</p>*/}
              <p className="text-lg">{room.other_details}</p>
            </div>

            {/* Book/Rent Now */}
            <div className="book-now mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Rent Now</h3>
              <form className="flex flex-col gap-4" onSubmit={handleRent}>
                {/* Rent From */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium" htmlFor="rent-from">
                    Rent From
                  </label>
                  <input
                    id="rent-from"
                    type="date"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
                    value={rentFrom}
                    onChange={(e) => setRentFrom(e.target.value)}
                  />
                </div>

                {/* Rent To */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium" htmlFor="rent-to">
                    Rent To
                  </label>
                  <input
                    id="rent-to"
                    type="date"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
                    value={rentTo}
                    onChange={(e) => setRentTo(e.target.value)}
                  />
                </div>

                {/* Rent Now Button */}
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Rent Now
                </button>
              </form>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default PlaceDetails;
