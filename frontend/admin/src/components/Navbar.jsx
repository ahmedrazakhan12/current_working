import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { setIsMenuExpanded, isMenuExpanded } = useAppContext();
  const [data , setData] = useState([]);
  const navigate = useNavigate();
  const activeId = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/adminInfo/`, {
      headers: { Authorization: ` ${activeId}` }
    })
    .then((res)=>{
      setData(res.data);
      console.log("Login user data: ",res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, []);





  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      {/* Navbar */}
      <div id="section-not-to-print">
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
              <i className="bx bx-search" />
              <span id="global-search" />
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
                    className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger d-none"
                  >
                    0
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-header dropdown-header-highlighted">
                    <i className="bx bx-bell bx-md me-2" />
                    Notifications
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <div id="unreadNotificationsContainer">
                    <li className="p-5 d-flex align-items-center justify-content-center">
                      <span>No Unread Notifications!</span>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                  </div>
                  <li className="d-flex justify-content-between">
                    <a href="/notifications" className="p-3">
                      <b>View All</b>
                    </a>
                    <a
                      href="#"
                      className="p-3 text-end"
                      id="mark-all-notifications-as-read"
                    >
                      <b>Mark All as Read</b>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item navbar-dropdown dropdown mt-3 mx-2">
                <p className="nav-item">
                  <span className="nav-mobile-hidden">Hi👋</span>
                  <span className="nav-mobile-hidden text-capitalize">{data.name}</span>
                </p>
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
                      src={data.pfpImage}
                      alt=""
                      className=" rounded-circle"
                      style={{ objectFit: "cover"  }}
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
                              src={data.pfpImage}
                              alt=""
                              className="  rounded-circle"
                              style={{ objectFit: "cover"  }}
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block text-capitalize">
                          {data.name}
                          </span>
                          <small className="text-muted m-0 p-0">
                          {data.email}
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to={"/profile"} className="dropdown-item" >
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
                    <form className="dropdown-item">
                      <button
                        type="submit"
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bx bx-log-out-circle" /> Logout
                      </button>
                    </form>
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
