import { SyntheticEvent, useEffect } from "react";
import { infoToast } from "./toastService";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../slices/userSlice";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function parseJwt(token: string) {
    try {
      return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  function AuthVerify() {
    const decodedJwt = parseJwt(localStorage.getItem("fishlog-token") ?? '');
    if (decodedJwt.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  }

  function logOut() {
    navigate("/");
    localStorage.removeItem("fishlog-token");
    localStorage.removeItem("fishlog-userName");
    dispatch(setUserName(false));
    infoToast("You have been logged out due to inactivity.");
  }

  function handleUserAction(e: Event | SyntheticEvent<Element, Event>) {
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
    };
  }, [handleUserAction]);

  return null;
};
