import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import UserStatus from "./UserStatus";

const Nav = () => {
    const { search, setSearch, userName } = useContext(DataContext);
    return (
        <>
            <UserStatus userName={userName} />
            <nav>
                <ul className="navLinks">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
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
