import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserDataProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("fishlog-userName")
  );

  const [userPosition, setUserPosition] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userPosition,
        setUserPosition,
        markerLocation,
        setMarkerLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
