import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterLogin from "../pages/RegisterLogin";
import RoomAdd from "../pages/RoomAdd";
import Chats from "../pages/Chats";
import RoomDetails from "../pages/RoomDetails";
import Home from "../pages/Home";

import PrivateRoute from "../context/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";


/////////////////////////////////// 2 ways to use ////////////////////////////////////////////////
// 1st way////////////////////
// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/login",
//       element: <RegisterLogin />,
//     },
//     {
//       path: "/room-details/:id",
//       element: <RoomDetails />,
//     },
//     {
//       path: "/add-room",
//       element: <RoomAdd />,
//     },
//     {
//       path: "/chats",
//       element: <Chats />,
//     },
//   ]);
// const Routing = () => {
//     return (
//       <RouterProvider router={router} />
//     );
//   };

////////////////////////////////// 2nd way ////////////////////////////////////////////////

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RegisterLogin />} />
          <Route path="/room-details/:id" element={<RoomDetails />} />
          <Route path="/add-room" element={<RoomAdd />} />
          <Route path="/message" element={<Chats />} />

          <AuthProvider>
            <Route path="/" element={<RegisterLogin />} />
            <PrivateRoute path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/room-details/:id" element={<RoomDetails />} />
            <Route path="/add-room" element={<RoomAdd />} />
            <Route path="/message" element={<Chats />} />
          </AuthProvider>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
