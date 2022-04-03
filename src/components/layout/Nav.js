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

const Nav = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUsername);

  function handleLogout(e) {
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
            <NavLink to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeclassname="active">
              Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" activeclassname="active">
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/map/all" activeclassname="active">
              Map
            </NavLink>
          </li>
          <li>
            {userName ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/login" activeclassname="active">
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
