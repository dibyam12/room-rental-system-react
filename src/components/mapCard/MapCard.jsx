import { useSelector } from "react-redux";
import "./MapCard.css";

const MapCard = () => {
  const { address } = useSelector((state) => state.coordinates);

  return (
    <div className="popup-card flex w-full h-full text-start p-2 rounded flex-col items-center justify-center flex-grow bg-black">
      <p className="text-white font-thin">📍 {address || "Loading address..."}</p>
    </div>
  );
};

export default MapCard;
