import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import SearchBox from "../searchBox/SearchBox";
import LocationMarker from "../locationMarker/LocationMarker";

const AddRoom = () => {
  const defaultPosition = { lat: 27.7172, lng: 85.324 }; // Kathmandu Valley
  const [formData, setFormData] = useState({
    rooms: "",
    wifi: false,
    electricity: false,
    bathroomType: "attached",
    rentPrice: "",
    address: "",
    position: defaultPosition,
  });

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
    // Submit the form data
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className=" mx-auto my-8 py-6 p-5">
      <h2 className="text-2xl font-bold mb-4">Add Rental House Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Rooms
          </label>
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WiFi Available
            </label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.wifi}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Electricity Available
            </label>
            <input
              type="checkbox"
              name="electricity"
              checked={formData.electricity}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bathroom Type
          </label>
          <select
            name="bathroomType"
            value={formData.bathroomType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="attached">Attached</option>
            <option value="shared">Shared</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rent Price
          </label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <SearchBox
            onSelect={({ lat, lng, address }) =>
              updatePosition({ lat, lng, address })
            }
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>

        <div className="h-64">
          <MapContainer
            center={formData.position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={formData.position}
              updatePosition={(position) => updatePosition(position)}
            />
          </MapContainer>
        </div>

        <div className="flex justify-end">
          <button
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
