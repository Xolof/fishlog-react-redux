import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);
    return (
        <nav>
            <ul className="navLinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/map">Map</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
