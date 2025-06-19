import UserStatus from "./UserStatus";
import { useLocation } from "react-router-dom";
import { selectUsername } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../slices/dataSlice";

type HeaderProps = {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const isLoading = useSelector(selectIsLoading);
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
