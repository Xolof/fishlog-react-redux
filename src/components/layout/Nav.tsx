import { useSelector } from "react-redux";
import {
  selectUsername,
  setUserName,
  setMarkerLat,
} from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { infoToast } from "../../services/toastService";
import { MouseEvent } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUsername);

  function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    localStorage.removeItem("fishlog-token");
    localStorage.removeItem("fishlog-userName");
    dispatch(setUserName(false));
    dispatch(setMarkerLat(null));
    infoToast("You have been logged out.");
  }

  return (
    <>
      <ToastContainer />
      <nav>
        <ul className="navLinks">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" className={({ isActive }) => (isActive ? "active" : undefined)}>
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Map
            </NavLink>
          </li>
          <li>
            {userName ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
