import Header from "./components/header/Header";
import List from "./components/list/List";
import Maps from "./components/maps/Maps";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import LoginRegister from "./components/loginRegister/LoginRegister";

import "./App.css";
import "../node_modules/leaflet/dist/leaflet.css";

import "../node_modules/leaflet/dist/leaflet";

import {
  // BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddRoom from "./components/addRoom/AddRoom";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="container1 flex flex-col h-screen">
          <div className="header w-full">
            <Header />
          </div>
          <div className="flex flex-row flex-grow">
            <div className="list w-1/5 m-5">
              <List />
            </div>
            <div className="maps flex-grow ">
              <Maps />
            </div>
          </div>
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <div className="container1 flex flex-col h-screen">
            <div className="header w-full">
              <Header />
            </div>
            <div className="w-full flex justify-center items-center h-full">
              <LoginRegister />
            </div>
          </div>
        </>
      ),
    },
    {
      path: "/room-details/:id",
      element: (
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
      ),
    },
    {
      path: "/add-room",
      element: (
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
      ),
    },
    {
      path: "/message",
      element: (
        <div className="container1 flex flex-col h-screen">
          <div className="header w-full">
            <Header />
          </div>
          <div className="flex flex-row flex-grow">
            <div className="list w-1/5 m-5  ">
              <div>People</div>
            </div>
            <div className="maps flex-grow border-l-2 p-2">
              <div>Chat</div>
            </div>
          </div>
        </div>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
