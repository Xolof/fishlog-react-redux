import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { ToastContainer } from 'react-toastify';
import { infoToast } from "../services/toastService";

const Nav = () => {
    const { userName, setUserName } = useContext(DataContext);

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setUserName(false);
        infoToast("You logged out.");
    }

    return (
        <>
            <ToastContainer />
            <nav>
                <ul className="navLinks">
                    <li>
                        <Link to="/add">Add</Link>
                    </li>
                    <li>
                        <Link to="/">List</Link>
                    </li>
                    <li>
                        <Link to="/map/all">Map</Link>
                    </li>
                    <li>
                    {
                        userName ?
                        <a
                            onClick={handleLogout}
                        >Logout</a> :
                            <Link to="/login">Login</Link>
                    }
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;
