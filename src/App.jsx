import "./App.css";
import "../node_modules/leaflet/dist/leaflet.css";
import 'leaflet/dist/leaflet.css';



import "../node_modules/leaflet/dist/leaflet";
import store from "./store.jsx";
import {Provider} from 'react-redux'

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
        <Provider store={store}>
        
      <Routing />
        </Provider>
   </>
   
  );
}

export default App;
