import Header from "../components/header/Header";
import List from "../components/list/List";
import Maps from "../components/maps/Maps";

const Home = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen overflow-hidden">
        <div className="flex flex-row h-full overflow-hidden">
          {/* List Section */}
          <div className="list w-1/5 m-5 overflow-y-scroll max-h-full">
            <List />
          </div>

          {/* Map Section */}
          <div className="maps flex-grow sticky overflow-hidden top-0">
            <Maps />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
