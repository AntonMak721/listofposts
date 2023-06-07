import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const RequireAuth = (props) => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  } 
  return props.children;
};

export default RequireAuth;
