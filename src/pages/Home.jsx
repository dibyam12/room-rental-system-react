import Header from "../components/header/Header";
import List from "../components/list/List";
import Maps from "../components/maps/Maps";

const Home = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        
        <div className="flex flex-row flex-grow">
          <div className="list w-1/5 m-5">
            <List />
          </div>
          <div className="maps flex-grow ">
            <Maps />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
