import React, {
    createContext,
    useContext,
    useState,
  } from "react";
  
  const AppContext = createContext();
  export const AppProvider = ({ children }) => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
  
    return (
      <AppContext.Provider
        value={{
            isMenuExpanded,
            setIsMenuExpanded,
            setIsOpen,
            isOpen,
            setIsOpen1,
            isOpen1,
          // options
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  export const useAppContext = () => useContext(AppContext);