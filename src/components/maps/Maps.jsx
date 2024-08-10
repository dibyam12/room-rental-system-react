import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useState, useCallback, useEffect } from "react";
import "./Maps.css";
import MapCard from "../mapCard/MapCard";

const Maps = () => {
  const defaultPosition = { lat: 27.7172, lng: 85.324 }; // Kathmandu Valley coordinates

  const [position, setPosition] = useState(defaultPosition);
  const [zoom, setZoom] = useState(15);
  const [haveUserLocation, setHaveUserLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Callback function to handle successful geolocation
  const handleGeolocationSuccess = useCallback((pos) => {
    setPosition({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
    setHaveUserLocation(true);
    setZoom(15);
    setLoading(false);
  }, []);

  // Callback function to handle geolocation errors
  const useipApi = useCallback(() => {
    console.error("Error getting location from the person");
    fetch("http://ip-api.com/json/")
      .then((res) => res.json())
      .then((location) => {
        setPosition({
          lat: location.lat,
          lng: location.lon,
        });
        setHaveUserLocation(true);
        setZoom(15);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && !haveUserLocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        useipApi
      );
    } else {
      setLoading(false);
    }
  }, [handleGeolocationSuccess, useipApi, haveUserLocation]);

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center   bg-opacity-75">
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
          {haveUserLocation && (
            <Marker position={position} draggable={true}>
              <Popup className="text-white w-40 h-28">
                <MapCard></MapCard>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default Maps;
