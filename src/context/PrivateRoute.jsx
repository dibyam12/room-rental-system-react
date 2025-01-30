import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
<<<<<<< HEAD
  let { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
=======
  let { user } = useContext(AuthContext);
>>>>>>> c47b71d8c99dec64f2636fe382e951325752dc3b
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
