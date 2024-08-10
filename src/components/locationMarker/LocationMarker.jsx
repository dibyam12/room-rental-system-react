import { useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

const LocationMarker = ({ position, updatePosition }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(new L.LatLng(position.lat, position.lng));
  }, [position, map]);

  const eventHandlers = {
    dragend(event) {
      const marker = event.target;
      const latLng = marker.getLatLng();
      updatePosition({ lat: latLng.lat, lng: latLng.lng });
    },
  };

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  );
};

export default LocationMarker;
