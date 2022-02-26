import { useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import { infoToast } from "./toastService";
import { useNavigate } from "react-router-dom";

export default () => {
  const { setUserName } = useContext(DataContext);
  const navigate = useNavigate();

  function parseJwt (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  function AuthVerify () {
    const decodedJwt = parseJwt(localStorage.getItem("fishlog-token"));
    if (decodedJwt.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  }

  function logOut () {
    navigate("/");
    localStorage.removeItem("fishlog-token");
    localStorage.removeItem("fishlog-userName");
    setUserName(false);
    infoToast("You have been logged out due to inactivity.");  
  }

  function handleUserAction(e) {
    if (!localStorage.getItem("fishlog-token")) {
      return;
    }

    if (!AuthVerify()) {
      e.preventDefault();
      logOut();
    }
  }
  
  useEffect(() => {
    document.addEventListener("click", handleUserAction);
    document.addEventListener("keydown", handleUserAction);
    document.addEventListener("mousemove", handleUserAction);
    document.addEventListener("scroll", handleUserAction);

    return function cleanup() {
      document.removeEventListener("click", handleUserAction);
      document.removeEventListener("keydown", handleUserAction);
      document.removeEventListener("mousemove", handleUserAction);
      document.removeEventListener("scroll", handleUserAction);
    }
  }, []);

  return null;
}