import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socketConnect = io("http://localhost:4000" ,
  //  {autoConnect: false}
  );

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [socket , setSocket] = useState(socketConnect);
  
  console.log("App Socket : ", socket);
  // New state for API data
  const [AppContextStatus, setAppContextStatus] = useState([]);
  const [AppContextPriority, setAppContextPriority] = useState([]);

  const fetchStatuses = async () => {
    try {
      const statusRes = await axios.get(
        "http://localhost:5000/projectStatus/getAllStatus"
      );
      setAppContextStatus(statusRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPriority = async () => {
    try {
      const priorityRes = await axios.get(
        "http://localhost:5000/projectPriority/getAllPriorities"
      );
      setAppContextPriority(priorityRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  const activeId = localStorage.getItem("id");

  // Fetch statuses on component mount
  useEffect(() => {
    fetchStatuses();
    fetchPriority();
  }, []);

  const location = useLocation(); // Hook to get current location
  console.log(location);
  

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
        AppContextPriority,
        socket,
        location
        // options
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
