import Header from "../components/header/Header";
import PlaceDetails from "../components/PlaceDetails/PlaceDetails";
import {useSelector} from "react-redux";

const RoomDetails = () => {
     const roomDetails = useSelector(state => state.roomDetails)
  const { rooms, loading, error } = roomDetails;
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        
        <div className=" w-full h-full ">
          <PlaceDetails />
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
