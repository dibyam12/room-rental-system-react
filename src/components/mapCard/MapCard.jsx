import { useSelector } from "react-redux";
import "./MapCard.css";

const MapCard = () => {

  const selectedRoom = useSelector((state) => state.coordinates);
  // const {address,setAddress} = selectedRoom;
  return (
    <>
      <div
        className="popup-card flex text-whites w-full h-full text-start p-2 rounded flex-col"
        style={{ "background-color": "black" }}
      >
        <p>Address: {selectedRoom?.address }</p>
      </div>
    </>
  );
};

export default MapCard;
