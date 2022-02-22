import { NavLink } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { ToastContainer } from "react-toastify";
import { infoToast } from "../services/toastService";

const Nav = () => {
  const { userName, setUserName } = useContext(DataContext);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("fishlog-token");
    localStorage.removeItem("fishlog-userName");
    setUserName(false);
    infoToast("You logged out.");
  }

  return (
    <>
      <ToastContainer />
      <nav>
        <ul className="navLinks">
          <li>
            <NavLink to="/add" activeclassname="active">Add</NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname="active">List</NavLink>
          </li>
          <li>
            <NavLink to="/map/all" activeclassname="active">Map</NavLink>
          </li>
          <li>
            {
              userName ?
                <a
                  onClick={handleLogout}
                >Logout</a> :
                <NavLink to="/login" activeclassname="active">Login</NavLink>
            }
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">About</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav;
