import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  let { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
