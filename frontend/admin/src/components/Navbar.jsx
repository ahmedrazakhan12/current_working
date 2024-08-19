import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../assets/images/gmg-not.png"
import Notify from '../assets/audio/notify.wav';

const Navbar = () => {
  const { setIsMenuExpanded, isMenuExpanded } = useAppContext();
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const activeId = localStorage.getItem("id");

  const {socket} = useAppContext();

  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setData(res.data);
          console.log("Navbar: ", res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login"); // Redirect to login on 404
          }
        });
    }

    socket.on('notification', (data) => {
      console.log("Notification: ", data);
      
      setNotifications((prevNotifications) => [
        data,
        ...prevNotifications,
      ]);

      // Check if the browser supports notifications
      // if ("Notification" in window) {
      //   // Request permission to show notifications
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === "granted") {
      //       // Show notification
      //       new Notification("Gmg Solutions", {
      //         body: `${data.text}`,
      //       });
      //     }
      //   });
      // }
      // if ("Notification" in window) {
      //   // Request permission to show notifications
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === "granted") {
      //       const capitalizedText = data.text
      //       .split(' ')
      //       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      //       .join(' ');
      //       // Show notification with an image
      //       new Notification("Gmg Solutions", {
      //         body: capitalizedText,
      //         // icon: 'https://example.com/path/to/icon.png', // Icon for the notification
      //         image: Image // Image for the notification
      //       });
      //     }
      //   });
      // }
      if ("Notification" in window) {

        // Request permission to show notifications
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const capitalizedText = data.text
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
      
            // Show notification with an image
            new Notification("Gmg Solutions", {
              body: capitalizedText,
              // icon: 'https://example.com/path/to/icon.png', // Icon for the notification
              image: Image // Image for the notification
            });
      
            // Play custom sound
            const audio = new Audio(Notify);
            audio.play().catch(error => {
              console.error("Playback failed:", error);
            });
          }
        });
      }
      
      
    });

    // Cleanup on component unmount
    return () => {
      socket.off('notification');
    };
  }, [activeId, navigate, socket]);

  const [dbNotifications, setDbNotifications] = useState([]);

  const fetchNotifications = () => {
    axios.get(`http://localhost:5000/notify/getNotification/${localStorage.getItem("id")}`)
        .then((res) => {
          console.log("fetchNotifications: ", res.data.data);
          
          setDbNotifications(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

useEffect(() => {
  fetchNotifications();
} , [])
  function formatTime(datetimeString) {
    // Convert the string to a Date object
    let dateObj = new Date(datetimeString);
  
    // Extract hours and minutes
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Return formatted time as a string
    return `${hours}:${minutes} ${ampm}`;
  }
  
  function extractDate(datetimeString) {
    // Convert the string to a Date object
    let dateObj = new Date(datetimeString);
  
    // Extract the month, date, and year
    let month = dateObj.getMonth() + 1; // Months are 0-based in JavaScript
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
  
    // Add leading zero to month and day if needed
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    // Return formatted date as a string
    return `${month}/${day}/${year}`;
  }
  
      
  // const [currentItems, setCurrentItems] = useState([]);
  //   useEffect(() => {
  //       axios.get(`http://localhost:5000/notify/getNotification/${localStorage.getItem("id")}`)
  //       .then((res) => {
  //         const limitedNotifications = res.data.data.slice(0, 4);
  //         setCurrentItems(limitedNotifications);
  //           console.log(res.data);
            
  //       })
  //       .catch((err) => {
  //           console.log(err);
  //       })
  //   },[])
  const getLimitedNotifications = () => {
    // Combine socket and DB notifications
    const combinedNotifications = [
      ...notifications,
      ...dbNotifications
    ];

    // Limit to 10 notifications, prioritizing socket notifications
    return combinedNotifications.slice(0, 10);
  };

  const limitedNotifications = getLimitedNotifications();

  const handleLogout = () => {
    // Ensure the socket is disconnected
    if (socket) {
        socket.disconnect();
    }

    // Clear local storage and navigate to login
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
};


  return (
    <>
      {/* Navbar */}
      <div id="section-not-to-print" style={{ zIndex: "10" }}>
        <nav
          className="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
          id="layout-navbar"
        >
          
          <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a
              className="nav-item nav-link px-0 me-xl-4"
              href="javascript:void(0)"
              onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            >
              <i className="bx bx-menu bx-sm" />
            </a>
          </div>
          <div
            className="navbar-nav-right d-flex align-items-center"
            id="navbar-collapse"
          >
            <div className="nav-item">
              {/* <i className="bx bx-search" /> */}
              {/* <span id="global-search" /> */}
              Welcome 👋, <b className="text-capitalize">{data?.name}</b>, to GMG Solutions' System!
            </div>
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item navbar-dropdown dropdown">
                <a
                  className="nav-link dropdown-toggle hide-arrow"
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                >
                  <i className="bx bx-bell bx-sm" />
                  <span
                    id="unreadNotificationsCount"
                    className={`badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ${
                      notifications?.length === 0 ? "d-none" : ""
                    }`}
                  >
                    {notifications?.length}
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end app-scroll" style={{height:'40vh' , overflowX:'hidden' , overflowY:'scroll'}}>
                <li className="dropdown-header dropdown-header-highlighted">
                  <i className="bx bx-bell bx-md me-2" />
                  Notifications
                </li>
                <li>
                  <div className="dropdown-divider" />
                </li>
                <div id="unreadNotificationsContainer">
                  {limitedNotifications?.length === 0 ? (
                    <li className="p-5 d-flex align-items-center justify-content-center">
                      {/* <span>No Unread Notifications!</span> */}
                    </li>
                  ) : (
                    limitedNotifications.map((notification, index) => (
                      <React.Fragment key={index}>
                        <li className="p-3 cursor-pointer" onClick={() => navigate(`${notification?.route}`)}>
                          <p>
                            <b className="text-capitalize">
                              {index + 1}.
                            </b>{" "}
                            <b className="text-capitalize">
                              {notification.text}
                            </b>
                          </p>
                          <small className="text-capitalize float-start">
                            {extractDate(notification?.time)}
                          </small>
                          <small className="text-capitalize float-end">
                            {formatTime(notification?.time)}
                          </small>
                        </li>
                        <div className="dropdown-divider" />
                      </React.Fragment>
                    ))
                  )}
                  <li>{/* <div className="dropdown-divider" /> */}</li>
                </div>
                {limitedNotifications?.length > 0 && (
                  <>
                    <li className="d-flex justify-content-between">
                      <Link to="/notifications" className="p-3">
                        <b>View All</b>
                      </Link>
                      <a
                        href="#"
                        className="p-3 text-end"
                        id="mark-all-notifications-as-read"
                        onClick={() => setNotifications([])}
                      >
                        <b>Mark All as Read</b>
                      </a>
                    </li>
                  </>
                )}
              </ul>
              </li>

              
              {/* User */}
              <li className="nav-item navbar-dropdown dropdown">
                <a
                  className="nav-link dropdown-toggle hide-arrow"
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar avatar-online">
                    <img
                      src={data?.pfpImage}
                      alt=""
                      className=" rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar avatar-online">
                            <img
                              src={data?.pfpImage}
                              alt=""
                              className="  rounded-circle"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block text-capitalize">
                            {data?.name}
                          </span>
                          <small className="text-muted m-0 p-0">
                            {data?.email}
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to={"/profile"} className="dropdown-item">
                      <i className="bx bx-user me-2" />
                      <span className="align-middle">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/preferences">
                      <i className="bx bx-cog me-2" />
                      <span className="align-middle">Preferences</span>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bx bx-log-out-circle" /> Logout
                      </button>
                  </li>
                </ul>
              </li>
              {/*/ User */}
            </ul>
          </div>
        </nav>
      </div>
      {/* / Navbar */}
    </>
  );
};

export default Navbar;
