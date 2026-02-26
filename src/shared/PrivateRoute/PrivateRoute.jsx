/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // check if user is authenticated
  if (!token || !user) {
    // redirect to login
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // if authenticated, render the children
  return children;
};

export default PrivateRoute;
