import Slider from "react-slick";
import { useState, useEffect } from "react";
import "./PlaceDetails.css";
import noImage from "../../assets/no_image.png";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import axios from "axios"; // Ensure axios or a similar library is installed
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {backendUrl} from "../../constants/userConstants.jsx";

const PlaceDetails = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const roomDetails = useSelector(state => state.roomDetails)
  const { rooms } = roomDetails;
   const {roomid} = useParams()
    const room = rooms.find((room) => room.id === Number(roomid));
    console.log(room.user, 'room')
   

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
   console.log(rooms.map(room => room.id),'ididid')

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
    <>
        {room? (
            <div>
                <div className="image-slider  ">
                    <Slider {...settings} className="bg-black w-full h-full">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={index} className="w-full h-full">
                                    <img
                                        src={image.url}
                                        alt={`Slide ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                                <img src={noImage} alt="No image available"/>
                                
                                
{/*<img src={`${backendUrl}/${room.image}`}/>*/}
{/*<img src={`${backendUrl}/${room.image1}`}/>*/}
{/*<img src={`${backendUrl}/${room.image2}`}/>*/}
{/*<img src={`${backendUrl}/${room.image3}`}/>*/}
                            
                            
                            
                            
                            
                            
                            
                            
                            </div>
                        )}
                    </Slider>
                </div>
                <div className="total-rooms text-5xl m-5 font-black">TOTAL ROOMS</div>
                <div className="total-rooms text-5xl m-5 font-black">{room.number_of_rooms}</div>
                <div className="address text-4xl font-semibold ml-5 ">
                    <h1>ADDRESS</h1>
                    <p>{room.address}</p>
                    <p>{room.rent}</p>
                    <p>{room.bathroom}</p>
                    <p>{room.phoneNumber}</p>
                    <p>{room.other_details}</p>
                </div>
                <div className="details m-5 ">
                    <div className="call-message flex  items-center rounded-lg  outline mb-4  flex-row">
                        <div className="call w-1/2 flex  justify-center p-3  hover:bg-gray-100 ">
                            <IoCall className="icon w-full"/>
                            {}
                            {/* <a href={`tel:+977${}`}></a> */}
                        </div>
                        <Link
                            to={`/message/${room.user}`}
                            className="message flex justify-center rounded-r-lg hover:bg-gray-100  outline w-1/2 p-3"
                        >
                            <div className="w-full">
                                <MdMessage className="icon w-full"/>
                            </div>
                        </Link>
                    </div>
                    <h2 className="font-semibold">ROOM DETAILS:</h2>
                </div>
            </div>
        ): null}
    
    
    </>
  );
};

export default PlaceDetails;


// the images are:
