// src/Maps.jsx

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Maps.css";
import MapCard from "../mapCard/MapCard";

const Maps = () => {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.coordinates); // Access coordinates from Redux state
  const { longitude, latitude } = coordinates;

  const defaultPosition = { lat: 27.698256, lng: 85.320044 }; // Default Kathmandu coordinates
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

  // Effect to update the map position when coordinates change
  useEffect(() => {
    if (longitude !== null && latitude !== null) {
      setPosition({ lat: latitude, lng: longitude });
      setHaveUserLocation(true);
      setZoom(15);
    }
  }, [longitude, latitude]);

  // Custom component to handle map click events and update marker position
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(`Clicked coordinates: Latitude: ${lat}, Longitude: ${lng}`);
        setPosition({ lat, lng });
        setHaveUserLocation(true);
      },
    });
    return null;
  }

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
          style={{ height: "89.5vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />{" "}
          {/* Custom component to handle clicks and log coordinates */}
          {haveUserLocation && (
            <Marker position={position}>
              <Popup>
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
