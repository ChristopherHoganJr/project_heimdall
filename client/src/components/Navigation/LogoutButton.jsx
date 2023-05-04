import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// context
import { UserContext } from "../../contexts/UserContext";

const LogoutButton = () => {
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = async () => {
    await axios.get("/api/account/logout", { withCredentials: true });
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <button className='' onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
