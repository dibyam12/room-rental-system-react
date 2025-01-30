import React, { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import SearchBox from "../searchBox/SearchBox";
import LocationMarker from "../locationMarker/LocationMarker";
import { useDispatch, useSelector } from "react-redux";
import MapCard from "../mapCard/MapCard.jsx";
import { FaRegFileImage } from "react-icons/fa";
import { addRooms } from "../../actions/userActions.jsx";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });
  const handleImageChange = (e, key) => {
    setImages({
      ...images,
      [key]: e.target.files[0],
    });
  };
  const coordinates = useSelector((state) => state.coordinates); // Access coordinates from Redux state
  const { longitude, latitude } = coordinates;
  const defaultPosition = { lat: 27.7172, lng: 85.324 }; // Kathmandu Valley
  const [formData, setFormData] = useState({
    rooms: 0,
    wifi: false,
    electricity: false,
    bathroomType: "attached",
    rentPrice: 0,
    address: "",
    phoneNumber: 0,
    longitude: longitude,
    latitude: latitude,
    bhk: 1,
    floorNo: 1,
    houseAge: 1,
    roomFlat: "Room",
    carpetArea: 1,
    otherDetails: "",
  });

  const [position, setPosition] = useState(defaultPosition);
  const [haveUserLocation, setHaveUserLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(15);

  const updatePosition = ({ lat, lng, address }) => {
    setFormData({
      ...formData,
      position: { lat, lng },
      address: address || formData.address,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    // Submit the form data
    formDatas.append("number_of_rooms", formData.rooms);
    formDatas.append("rent", formData.rentPrice);
    formDatas.append("bathroom", formData.bathroomType);
    formDatas.append("latitude", formData.latitude);
    formDatas.append("longitude", formData.longitude);
    formDatas.append("address", formData.address);
    formDatas.append("phoneNumber", formData.phoneNumber);
    formDatas.append("bhk", formData.bhk);
    formDatas.append("roomFlat", formData.roomFlat);
    formDatas.append("floorNo", formData.floorNo);
    formDatas.append("houseAge", formData.houseAge);
    formDatas.append("carpetArea", formData.carpetArea);
    formDatas.append("otherDetails", formData.otherDetails);

    if (images.image) formDatas.append("image", images.image);
    if (images.image1) formDatas.append("image1", images.image1);
    if (images.image2) formDatas.append("image2", images.image2);
    if (images.image3) formDatas.append("image3", images.image3);
    for (let [key, item] of formDatas.entries()) {
      console.log(key, item);
    }
    dispatch(addRooms(formDatas));
    navigate("/");

    setTimeout(() => {
      window.location.reload();
    }, 500); // Small delay to ensure navigation happens first

  };

  const handleGeolocationSuccess = useCallback((pos) => {
    const newPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
    setPosition(newPosition);
    setHaveUserLocation(true);
    setZoom(15);
    setLoading(false);
  }, []);

  const useipApi = useCallback(() => {
    console.error(
      "Error getting location from the device, using IP-based location as fallback."
    );
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((location) => {
        setPosition({
          lat: location.latitude,
          lng: location.longitude,
        });
        setHaveUserLocation(true);
        setZoom(15);
        setLoading(false);
      })
      .catch((error) => {
        console.error("IP-based geolocation failed", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && !haveUserLocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        useipApi,
        { timeout: 10000 }
      );
    } else {
      setLoading(false);
    }
  }, [handleGeolocationSuccess, useipApi, haveUserLocation]);

  useEffect(() => {
    if (longitude !== null && latitude !== null) {
      setPosition({ lat: latitude, lng: longitude });
      setHaveUserLocation(true);
      setZoom(15);
    }
  }, [longitude, latitude]);
  console.log(formData, "dsfdsf");
  function LocationMarrker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        try {
          // Fetch the address using Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();

          const address = data.display_name || "Unknown Location";

          formData.address = address;

          // Log the address
          console.log("Address:", address);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
        console.log(`Clicked coordinates: Latitude: ${lat}, Longitude: ${lng}`);
        setPosition({ lat, lng });
        setHaveUserLocation(true);

        formData.longitude = lng.toFixed(6);
        formData.latitude = lat.toFixed(6);
      },
    });
    return null;
  }
  const submitHandler = () => {
    console.log(formData);
  };

  return (
    <div className="  my-auto  p-5 bg-cyan-400 text-white">
      <h2 className="text-2xl font-bold mb-4">Add Rental House Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-medium ">Number of Rooms</label>
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium ">Bathroom Type</label>
          <select
            name="bathroomType"
            value={formData.bathroomType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="attached">Attached</option>
            <option value="shared">Shared</option>
          </select>
        </div>
        <div>
          <label className="block text-md font-medium ">BHK</label>
          <select
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div>
          <label className="block text-md font-medium ">Floor Number</label>
          <input
            type="number"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block text-md font-medium ">House Age </label>
          <input
            type="number"
            name="houseAge"
            value={formData.houseAge}
            onChange={handleChange}
            placeholder="How old is your house? (In years)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium ">
            Carpet Area(in sq. ft.)
          </label>
          <input
            type="number"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium ">Rent Type</label>
          <select
            name="roomFlat"
            value={formData.roomFlat}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="room">Room</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
          </select>
        </div>

        <div>
          <label className="block text-md font-medium ">Rent Price \Per-day</label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium ">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className=" text-lg font-medium mb-0">
            Room Images (4 required)
          </label>
          <div className="input-box">
            <FaRegFileImage className="icon" />
            <input
              type="file"
              accept="image/*"
              name="image1"
              className="form-input px-4 py-3 rounded-full text-black"
              onChange={(e) => handleImageChange(e, "image")}
            />
          </div>
          <div className="input-box">
            <FaRegFileImage className="icon" />
            <input
              type="file"
              accept="image/*"
              name="image1"
              className="form-input px-4 py-3 rounded-full text-black"
              onChange={(e) => handleImageChange(e, "image1")}
            />
          </div>
          <div className="input-box">
            <FaRegFileImage className="icon" />
            <input
              type="file"
              accept="image/*"
              name="image1"
              className="form-input px-4 py-3 rounded-full text-black"
              onChange={(e) => handleImageChange(e, "image2")}
            />
          </div>
          <div className="input-box">
            <FaRegFileImage className="icon" />
            <input
              type="file"
              accept="image/*"
              name="image1"
              className="form-input px-4 py-3 rounded-full text-black"
              onChange={(e) => handleImageChange(e, "image3")}
            />
          </div>
        </div>
        <div>
          <label className="block text-md font-medium ">Address</label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-md font-medium ">
            Share your house location
          </label>
        </div>
        <div className="h-64">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "98%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarrker />
            {haveUserLocation && (
              <Marker position={position}>
                <Popup>
                  <MapCard />
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div>
          <label className="block text-md font-medium ">Other Details</label>

          <textarea
            type="text"
            name="otherDetails"
            value={formData.otherDetails}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddRoom;
