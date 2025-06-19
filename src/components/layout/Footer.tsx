import { NavLink } from "react-router-dom";

const Footer = () => {
  const dateObj = new Date();
  return (
    <footer>
      <p>&copy; Xolof {dateObj.getFullYear()}</p>
      <p>
        <NavLink to="/about" activeclassname="active">
          About
        </NavLink>
      </p>
    </footer>
  );
};

export default Footer;
