import { useSelector } from "react-redux";
import { useApplicationContext } from "../../context/DataContext";
import UserStatus from "./UserStatus";
import { useLocation } from "react-router-dom";
import { selectUsername } from "../../slices/userSlice";

const Header = ({ title }) => {
  const { isLoading } = useApplicationContext();
  const location = useLocation();
  const notLoadingRoutes = ["/add", "/login", "/about"];
  const userName = useSelector(selectUsername);

  return (
    <>
      {isLoading && !notLoadingRoutes.includes(location.pathname) ? (
        <div className="loader">
          <div className="loading"></div>
        </div>
      ) : null}
      <header className="Header">
        <h1>{title}</h1>
        <UserStatus userName={userName} />
      </header>
    </>
  );
};

export default Header;
