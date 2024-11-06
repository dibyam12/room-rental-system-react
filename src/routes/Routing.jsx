import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RegisterLogin from "../pages/RegisterLogin";
import RoomAdd from "../pages/RoomAdd";
import Chats from "../pages/chats/Chats";
import RoomDetails from "../pages/RoomDetails";
import Home from "../pages/Home";

import PrivateRoute from "../context/PrivateRoute";
import Header from "../components/header/Header.jsx";
import Profile from "../components/profile/Profile.jsx";

import Admin from "../pages/admin/Admin.jsx";

import Registerverify from "../components/registerverify/Registerverify.jsx";
import MyRooms from "../components/myrooms/MyRooms.jsx";

/////////////////////////////////// 2 ways to use ////////////////////////////////////////////////
// 1st way////////////////////
const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <RegisterLogin />,
      },
      {
        path: "/myrooms",
        element: (
          // <PrivateRoute>
          <MyRooms />
          // </PrivateRoute>
        ),
      }
      
      ,
      
      {
        path: "/room-details",
        element: (
          // <PrivateRoute>
          <RoomDetails />
          // </PrivateRoute>
        ),
      },
      {
        path: "/add-room",
        element: (
          // <PrivateRoute>
          <RoomAdd />
          // </PrivateRoute>
        ),
      },
      {
        path: "/message",
        element: (
          // <PrivateRoute>
          <Chats />
          // </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
        
        {
        path: "/register-verify",
        element: (
          <RegisterLogin />
        ),
      },
    ],
  },
]);
const Routing = () => {
  return <RouterProvider router={router} />;
};

////////////////////////////////// 2nd way ////////////////////////////////////////////////

// const Routing = () => {
//   return (
//     <>
//
//       <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<RegisterLogin />} />
//           <Route path="/room-details/:id" element={<RoomDetails />} />
//           <Route path="/add-room" element={<RoomAdd />} />
//           <Route path="/message" element={<Chats />} />
//           <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//     </>
//   );
// };

export default Routing;
