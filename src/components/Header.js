import FlashMessage from "./FlashMessage";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import UserStatus from "./UserStatus";

const Header = ({ title }) => {
    const { userName, flashMessage } = useContext(DataContext);

    return (
        <header className="Header">
            <h1>{title}</h1>
            <UserStatus userName={userName} />
            <FlashMessage flashMessage={flashMessage}/>
        </header>
    )
}

export default Header;
