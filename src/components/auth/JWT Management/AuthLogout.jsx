import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const AuthLogout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return <>Logout Page</>;
};

export default AuthLogout;
