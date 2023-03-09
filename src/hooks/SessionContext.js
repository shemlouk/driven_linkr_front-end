import { createContext, useState } from "react";

export const SessionContext = createContext({
  session: null,
  isLoggedIn: false,
  updateSession: () => {},
});

export const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(() =>
    JSON.parse(localStorage.getItem("session"))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(session ? true : false);

  const updateSession = (data) => {
    setSession(data || null);
    setIsLoggedIn(data ? true : false);
  };

  return (
    <SessionContext.Provider value={{ session, updateSession, isLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};
