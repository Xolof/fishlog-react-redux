import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
    const { userName, setUserName, setFlashMessage } = useContext(DataContext);

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setUserName(false);
        setFlashMessage("You logged out!");
    }

    return (
        <>
            <nav>
                <ul className="navLinks">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
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
