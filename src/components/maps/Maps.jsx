import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import "./Maps.css";
import MapCard from "../mapCard/MapCard";

const Maps = () => {
  const dispatch = useDispatch();
  const coordinates = useSelector(state => state.coordinates); // Access the coordinates from Redux state
  const { longitude, latitude } = coordinates;

  const defaultPosition = { lat: 27.698256, lng: 85.320044 }; // Kathmandu Valley coordinates
  const [position, setPosition] = useState(defaultPosition);
  const [zoom, setZoom] = useState(15);
  const [haveUserLocation, setHaveUserLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Callback function to handle successful geolocation
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

  // Callback function to handle geolocation errors
  const useipApi = useCallback(() => {
    console.error("Error getting location from the device, using IP-based location as fallback.");
    fetch("https://ipapi.co/json/") // Changed to HTTPS
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
        { timeout: 10000 } // Optional: adds timeout for geolocation
      );
    } else {
      setLoading(false);
    }
  }, [handleGeolocationSuccess, useipApi, haveUserLocation]);

  // Effect to update the map position when coordinates change
  useEffect(() => {
    if (longitude !== null && latitude !== null) {
      setPosition({ lat: latitude, lng: longitude });
      setHaveUserLocation(true); // Set this to true to show the marker
      setZoom(15); // Optionally adjust zoom level
    }
  }, [longitude, latitude]); // Run this effect whenever longitude or latitude changes

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <MapContainer
          className="z-55 map"
          center={position}
          zoom={zoom}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Render the marker only when we have user location or new coordinates */}
          {haveUserLocation && (
            <Marker position={position} draggable={true}>
              <Popup className="text-white w-40 h-28">
                <MapCard />
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default Maps;
