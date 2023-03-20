import { createContext, useState } from "react";

export const PublishContext = createContext({
  updateList: false,
  setUpdateList: () => {},
});

export const PublishContextProvider = ({ children }) => {
  const [updateList, setUpdateList] = useState(false);

  return (
    <PublishContext.Provider value={{ updateList, setUpdateList }}>
      {children}
    </PublishContext.Provider>
  );
};