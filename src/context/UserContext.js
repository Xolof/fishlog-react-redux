import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserDataProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem("fishlog-userName"));

  return (
    <UserContext.Provider 
      value={
        {
          userName,
          setUserName
        }
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext);
};