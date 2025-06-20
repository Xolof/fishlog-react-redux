import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const dateObj = new Date();
  return (
    <footer>
      <p>&copy; Xolof {dateObj.getFullYear()}</p>
      <p>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
          About
        </NavLink>
      </p>
    </footer>
  );
};

export default Footer;
