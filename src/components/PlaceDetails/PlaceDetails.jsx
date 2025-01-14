
import { useState, useEffect, useRef } from "react";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "../../constants/userConstants.jsx";
import noImage from "../../assets/no_image.png";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const PlaceDetails = () => {
  const navigate = useNavigate();
  const [rentFrom, setRentFrom] = useState('');
  const [rentTo, setRentTo] = useState('');
  const [dateDifference, setDateDifference] = useState(0);
  const [esewaData, setEsewaData] = useState({
    amount: '10',
    tax_amount: '0',
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess/",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
    rent_id:'0',
    
  });

  const roomDetails = useSelector((state) => state.roomDetails);
  const { rooms } = roomDetails;
  const { roomid } = useParams();
  const room = rooms.find((room) => room.id === Number(roomid));

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
      const paymentData = new FormData();
      const token = JSON.parse(localStorage.getItem("userInfo"))?.access;
      const configp = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
      paymentData.append("rent_id", roomid)
      paymentData.append("total_amount", esewaData.total_amount)
      paymentData.append("transaction_uuid", esewaData.transaction_uuid)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await axios.post(`${backendUrl}/handle-rent/`, formData, config);
      await axios.post(`${backendUrl}/paymentverify/`, paymentData, configp);
      alert('Room rented');
      navigate('/');
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const generateSignature = (transaction_uuid, product_code, secret, total_amount) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  // Update dateDifference and total_amount
  useEffect(() => {
    if (rentFrom && rentTo) {
      const fromDate = new Date(rentFrom);
      const toDate = new Date(rentTo);
      const differenceInTime = toDate - fromDate;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

      setDateDifference(differenceInDays >= 0 ? differenceInDays : 0);
    }
  }, [rentFrom, rentTo]);

  // Update esewaData after date difference changes
  useEffect(() => {
    if (dateDifference > 0 && room) {
      const totalAmount = dateDifference * room.rent;
      setEsewaData((prevData) => ({
        ...prevData,
        total_amount: totalAmount,
        amount: totalAmount,
      }));
    }
  }, [dateDifference, room]);

  // Update signature whenever esewaData changes
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = esewaData;
    const hashedSignature = generateSignature(transaction_uuid, product_code, secret, total_amount);
    setEsewaData((prevData) => ({
      ...prevData,
      signature: hashedSignature,
    }));
  }, [esewaData]);

  return (
    <>
      {room ? (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
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
                <IoCall className="icon text-black text-2xl"/>
                <p className="font-semibold text-xl">{room.phoneNumber}</p>
              </div>
              <Link
                  to={`/message/${room.user}`}
                  className="message flex-1 flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-800 text-white rounded-r-lg transition-colors"
              >
                <MdMessage className="icon text-2xl"/>
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
              <p className="text-lg">{room.other_details}</p>
            </div>
            {/* Render room details, slider, etc. */}
            <form onSubmit={handleRent}>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium" htmlFor="rent-from">Rent From</label>
                <input
                    id="rent-from"
                    type="date"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
                    value={rentFrom}
                    onChange={(e) => setRentFrom(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium" htmlFor="rent-to">Rent To</label>
                <input
                    id="rent-to"
                    type="date"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
                    value={rentTo}
                    onChange={(e) => setRentTo(e.target.value)}
                />
              </div>
              <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Rent Now
              </button>
            </form>
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
              <input type="text" name="amount" value={esewaData.amount} required/>
              <input type="text" name="tax_amount" value={esewaData.tax_amount} required/>
              <input type="text" name="total_amount" value={esewaData.total_amount} required/>
              <input type="text" name="transaction_uuid" value={esewaData.transaction_uuid} required/>
              <input type="text" name="product_code" value={esewaData.product_code} required/>
              <input type="text" name="product_service_charge" value={esewaData.product_service_charge} required/>
              <input type="text" name="product_delivery_charge" value={esewaData.product_delivery_charge} required/>
              <input type="text" name="success_url" value={esewaData.success_url} required/>
              <input type="text" name="failure_url" value={esewaData.failure_url} required/>
              <input type="text" name="signed_field_names" value={esewaData.signed_field_names} required/>
              <input type="text" name="signature" value={esewaData.signature} required/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
      ) : (
          <p>Loading...</p>
      )}
    </>
  );
};

export default PlaceDetails;
