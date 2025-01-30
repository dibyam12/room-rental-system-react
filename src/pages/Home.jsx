// import Header from "../components/header/Header";
import List from "../components/list/List";
import Maps from "../components/maps/Maps";

const Home = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen overflow-hidden">
     <div className="flex flex-row h-full">
       {/* List Section */}
       <div className="list w-1/5 m-5 overflow-y-auto max-h-full">
         <List />
       </div>
       {/* Map Section */}
       <div className="maps flex-grow sticky top-0 h-screen">
         <Maps />
       </div>
     </div>
   </div>
    </>
  );
};

export default Home;
