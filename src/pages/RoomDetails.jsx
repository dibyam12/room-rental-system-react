import Header from "../components/header/Header";
import PlaceDetails from "../components/PlaceDetails/PlaceDetails";

const RoomDetails = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        <div className="header w-full">
          <Header />
        </div>
        <div className=" w-full h-full ">
          <PlaceDetails />
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
