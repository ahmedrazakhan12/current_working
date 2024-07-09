import React, {
    createContext,
    useContext,
    useState,
  } from "react";
  
  const AppContext = createContext();
  export const AppProvider = ({ children }) => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <AppContext.Provider
        value={{
            isMenuExpanded,
            setIsMenuExpanded,
            setIsOpen,
            isOpen
          // options
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  export const useAppContext = () => useContext(AppContext);