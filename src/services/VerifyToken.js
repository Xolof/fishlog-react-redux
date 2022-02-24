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
    console.log(Date.now());
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
    console.info("You have been logged out due to inactivity.");  
    infoToast("You have been logged out due to inactivity.");  
  }

  function handleUserAction(e) {
    if (!localStorage.getItem("fishlog-token")) {
      console.info("You are not authenticated.");
      return;
    }

    if (!AuthVerify()) {
      e.preventDefault();
      logOut();
    }
    console.info("You are authenticated.");
  }
  
  useEffect(() => {
    document.addEventListener("click", handleUserAction);
    document.addEventListener("keydown", handleUserAction);

    return function cleanup() {
      document.removeEventListener("click", handleUserAction);
      document.removeEventListener("keydown", handleUserAction);
    }
  }, []);

  return null;
}