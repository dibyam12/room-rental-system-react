import Slider from "react-slick";
import { useState, useEffect } from "react";
import "./PlaceDetails.css";
import noImage from "../../assets/no_image.png";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import axios from "axios"; // Ensure axios or a similar library is installed
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "../../constants/userConstants.jsx";

const PlaceDetails = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms } = roomDetails;
  const { roomid } = useParams();
  const room = rooms.find((room) => room.id === Number(roomid));
  console.log(room, "room");

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(rooms.map((room) => room.id));

  // Fetch images from backend
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       // Replace with your actual API endpoint
  //       const response = await axios.get("https://api.example.com/images");
  //       setImages(response.data);
  //     } catch (error) {
  //       setError("Failed to fetch images");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    // <>
    //   {room ? (
    //     <div>
    //       <div className="slider">
    //         <div className="carousel w-full h-[80vh]">
    //           <div
    //             id={room.image}
    //             className="carousel-item justify-center items-center w-full h-full"
    //           >
    //             {room.image && (
    //               <img
    //                 src={`${backendUrl}/${room.image}`}
    //                 className="image-full "
    //               />
    //             )}
    //           </div>
    //           <div
    //             id={room.image1}
    //             className="carousel-item justify-center w-full h-full"
    //           >
    //             {room.image1 && (
    //               <img
    //                 src={`${backendUrl}/${room.image1}`}
    //                 className="image-full"
    //               />
    //             )}
    //           </div>
    //           <div
    //             id={room.image2}
    //             className="carousel-item justify-center w-full h-full"
    //           >
    //             {room.image2 && (
    //               <img
    //                 src={`${backendUrl}/${room.image2}`}
    //                 className="image-full"
    //               />
    //             )}
    //           </div>
    //           <div
    //             id={room.image3}
    //             className="carousel-item justify-center w-full h-full"
    //           >
    //             {room.image3 && (
    //               <img
    //                 src={`${backendUrl}/${room.image3}`}
    //                 className="image-full"
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <div className="flex w-full justify-center gap-2 py-2">
    //           <a href={`#${room.image}`} className="btn btn-sm">
    //             1
    //           </a>
    //           <a href={`#${room.image1}`} className="btn btn-sm">
    //             2
    //           </a>
    //           <a href={`#${room.image2}`} className="btn btn-sm">
    //             3
    //           </a>
    //           <a href={`#${room.image3}`} className="btn btn-sm">
    //             4
    //           </a>
    //         </div>
    //       </div>
    //       <div className="call-message flex  items-center rounded-lg  outline mb-4  flex-row">
    //         <div className="call w-1/2 flex  justify-center p-3 items-center text-center hover:bg-gray-100 ">
    //           <IoCall className="icon" /> &nbsp;
    //           <p className="font-bold"> &nbsp;{room.phoneNumber}</p>
    //           {}
    //           {/* <a href={`tel:+977${}`}></a> */}
    //         </div>
    //         <Link
    //           to={`/message/${room.user}`}
    //           className="message flex justify-center rounded-r-lg hover:bg-gray-100   w-1/2 p-3"
    //         >
    //           <div className="w-full">
    //             <MdMessage className="icon w-full" />
    //           </div>
    //         </Link>
    //       </div>

    //       {/*<img src={`${backendUrl}/${room.image}`}/>*/}
    //       {/*<img src={`${backendUrl}/${room.image1}`}/>*/}
    //       {/*<img src={`${backendUrl}/${room.image2}`}/>*/}
    //       {/*<img src={`${backendUrl}/${room.image3}`}/>*/}

    //       <div className="total-rooms text-5xl m-5 font-black">TOTAL ROOMS</div>
    //       <div className="total-rooms text-5xl m-5 font-black">
    //         {room.number_of_rooms}
    //       </div>
    //       <div className="address text-4xl font-semibold ml-5 ">
    //         <h1>ADDRESS</h1>
    //         <p>{room.address}</p>
    //         <p>{room.rent}</p>
    //         <p>{room.bathroom}</p>

    //         <p>{room.other_details}</p>
    //       </div>
    //       <div className="details m-5 ">
    //         <h2 className="font-semibold">ROOM DETAILS:</h2>
    //       </div>
    //     </div>
    //   ) : null}
    // </>

    <>
      {room ? (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          {/* Image Carousel */}
          <div className="slider">
            <div className="carousel w-full h-[80vh] rounded-lg overflow-hidden shadow-md bg-gray-200">
              {["image", "image1", "image2", "image3"].map(
                (imgKey, index) =>
                  room[imgKey] && (
                    <div
                      key={imgKey}
                      id={room[imgKey]}
                      className="carousel-item  justify-center r w-full h-full"
                    >
                      <img
                        src={`${backendUrl}/${room[imgKey]}`}
                        alt={`Room ${index + 1}`}
                        className="image-full"
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
            <p className="text-xl mt-2">Bathroom: {room.bathroom}</p>
            <p className="text-lg">{room.other_details}</p>
          </div>
          {/* book/rent now */}
          <div className="book-now mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Rent Now</h3>
            <div className="flex flex-col gap-4">
              {/* Rent From */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium" htmlFor="rent-from">
                  Rent From
                </label>
                <input
                  id="rent-from"
                  type="date"
                  className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
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
                />
              </div>

              {/* Rent Now Button */}
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Rent Now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlaceDetails;

// the images are:
