import Header from "../components/header/Header";
import AddRoom from "../components/addRoom/AddRoom";

const RoomAdd = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        <div className="header w-full">
          <Header />
        </div>
        <div className="w-full flex justify-center items-center h-full">
          <AddRoom />
        </div>
      </div>
    </>
  );
};

export default RoomAdd;
