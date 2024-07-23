import React, {
    createContext,
    useContext,
    useState,
    useEffect
  } from "react";
import axios from 'axios';
const AppContext = createContext();
  export const AppProvider = ({ children }) => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
  
      // New state for API data
  const [AppContextStatus, setAppContextStatus] = useState([]);
  const [AppContextPriority, setAppContextPriority] = useState([]);

  const fetchStatuses = async () => {
    try {
      const statusRes = await axios.get('http://localhost:5000/projectStatus/getAllStatus');
      setAppContextStatus(statusRes.data);
    
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPriority = async () => {
    try {
      const priorityRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
      setAppContextPriority(priorityRes.data);
    
    } catch (err) {
      console.log(err);
    }
  };


  // Fetch statuses on component mount
  useEffect(() => {
    fetchStatuses();
    fetchPriority();
  }, []);

    return (
      <AppContext.Provider
        value={{
            isMenuExpanded,
            setIsMenuExpanded,
            setIsOpen,
            isOpen,
            setIsOpen1,
            isOpen1,
            isOpen2,
            setIsOpen2,
            AppContextStatus,
            AppContextPriority
          // options
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  export const useAppContext = () => useContext(AppContext);