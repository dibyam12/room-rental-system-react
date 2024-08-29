import "./App.css";
import "../node_modules/leaflet/dist/leaflet.css";

import "../node_modules/leaflet/dist/leaflet";

// import {
//   // BrowserRouter,
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import Routing from "./routes/Routing";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/login",
  //     element: <RegisterLogin />,
  //   },
  //   {
  //     path: "/room-details/:id",
  //     element: <RoomDetails />,
  //   },
  //   {
  //     path: "/add-room",
  //     element: <RoomAdd />,
  //   },
  //   {
  //     path: "/chats",
  //     element: <Chats />,
  //   },
  // ]);
  return (
    <>
      <Routing />
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
