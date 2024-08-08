import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const Sidebar = () => {
  const {
    setIsOpen,
    isOpen,
    setIsOpen1,
    isOpen1,
    isOpen2,
    setIsOpen2,
    setIsMenuExpanded,
    isMenuExpanded,
  } = useAppContext();
  const location = useLocation();

  const [data, setData] = useState([]);
  const activeId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/adminInfo/`, {
        headers: { Authorization: `${activeId}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeId]);

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme menu-container"
      >
        <div className="app-brand demo">
          <span className="app-brand-logo demo">
            <img src="./assets/images/yourlogo.png" width="200px" alt="" />
          </span>
          {/* <span class="app-brand-text demo menu-text fw-bolder ms-2">Taskify</span> */}
          <span
            onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </span>
        </div>

        <ul className="menu-inner py-1">
          <hr className="dropdown-divider" />
          {/* Dashboard */}
          <li
            className={
              location.pathname === "/" ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle text-danger" />
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  Dashboard
                </Link>
              </div>
            </span>
          </li>
          <li className={`${isOpen ? "menu-item open" : "menu-item"}`}>
            <span
              className="menu-link menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="menu-icon tf-icons bx bx-briefcase-alt-2 text-success" />
              <div className="cursor-pointer">Projects</div>
            </span>
            <ul className="menu-sub">
              <li
                className={
                  location.pathname === "/manage"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/manage"}
                    >
                      Manage Projects
                    </Link>
                  </div>
                </span>
              </li>
              <li
                className={
                  location.pathname === "/favorite"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/favorite"}
                    >
                      Favorite Projects
                    </Link>
                  </div>
                </span>
              </li>
              {/* <li
                className={
                  location.pathname === "/tag"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span href="/tags/manage" className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/tag"}
                    >
                      Tags
                    </Link>
                  </div>
                </span>
              </li> */}
            </ul>
          </li>

          {data && data?.role === "super-admin" && (
            <>
              <li className={`${isOpen1 ? "menu-item open" : "menu-item"}`}>
                <span
                  className="menu-link menu-toggle"
                  onClick={() => setIsOpen1(!isOpen1)}
                >
                  <i className="menu-icon tf-icons bx bx-group text-primary" />
                  <div className="cursor-pointer">Users</div>
                </span>
                <ul className="menu-sub">
                  <li
                    className={
                      location.pathname === "/manageUsers"
                        ? "menu-item active"
                        : "menu-item"
                    }
                  >
                    <span className="menu-link">
                      <div>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={"/manageUsers "}
                        >
                          Manage Users
                        </Link>
                      </div>
                    </span>
                  </li>
                  <li
                    className={
                      location.pathname === "/register"
                        ? "menu-item active"
                        : "menu-item"
                    }
                  >
                    <span className="menu-link">
                      <div>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={"/register"}
                        >
                          Add Users
                        </Link>
                      </div>
                    </span>
                  </li>
                </ul>
              </li>
            </>
          )}

          <li
            className={
              location.pathname === "/tasks" ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-link">
              <i className="menu-icon tf-icons bx bx-task text-primary" />
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/tasks"}
                >
                  Tasks
                </Link>
              </div>
            </span>
          </li>







         
          {/* <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <span href="/priority/manage" className="menu-link">
              <i className="menu-icon tf-icons bx bx-up-arrow-alt text-success" />
              <div>Priorities</div>
            </span>
          </li> */}
          {/* <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <span href="/workspaces" className="menu-link">
              <i className="menu-icon tf-icons bx bx-check-square text-danger" />
              <div>Workspaces</div>
            </span>
          </li> */}
          {/* <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <span href="/chat" className="menu-link">
              <i className="menu-icon tf-icons bx bx-chat text-warning" />
              <div>Chat </div>
            </span>
          </li> */}
          {/* <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <span href="/todos" className="menu-link">
              <i className="menu-icon tf-icons bx bx-list-check text-dark" />
              <div>Todos </div>
            </span>
          </li> */}
           <li
            className={
              location.pathname === "/chat" ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-link">
            <i className="menu-icon tf-icons bx bx-chat text-warning" />
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/chat"}
                >
                  Chat
                </Link>
              </div>
            </span>
          </li>
          <li
            className={
              location.pathname === "/meeting"
                ? "menu-item active"
                : "menu-item"
            }
          >
            <span className="menu-link">
              <i className="menu-icon tf-icons bx bx-shape-polygon text-success" />
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/meeting"
                >
                  Meetings
                </Link>{" "}
                {/* <span className="flex-shrink-0 badge badge-center bg-success w-px-20 h-px-20">
                  2
                </span> */}
              </div>
            </span>
          </li>
          <li className={location.pathname === '/notifications' ? 'menu-item active' : 'menu-item'} >
            <span href="/status/manage" className="menu-link">
              <i className="menu-icon tf-icons bx bx-bell  me-2" />
             <Link  style={{ textDecoration: "none", color: "inherit" }} to={'notifications'}>
              <div>Notifications</div>
             </Link>
            </span>
          </li>
          {/* <li className={location.pathname === '/register' ? 'menu-item active' : 'menu-item'}>
            <span  className="menu-link">
              <i className="menu-icon tf-icons bx bx-group text-primary" />
              <div><Link style={{textDecoration:'none' , color:'inherit'}} to="/register">Register</Link></div>
            </span>
          </li> */}
          {/* <li
            className={
              location.pathname === "/clients"
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/clients"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bx-group text-warning" />
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/clients"
                >
                  Clients
                </Link>
              </div>
            </Link>
          </li> */}
         

          <li className={`${isOpen2 ? "menu-item open" : "menu-item"}`}>
            <span
              className="menu-link menu-toggle"
              onClick={() => setIsOpen2(!isOpen2)}
            >
              <i className="bx bx-cog me-3 text-success" />
              <div>Setting</div>
            </span>
            <ul className="menu-sub">
              <li
                className={
                  location.pathname === "/general"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/general"}
                    >
                      General
                    </Link>
                  </div>
                </span>
              </li>

              {data && data?.role === "super-admin"  && (
            <>
              <li
                className={
                  location.pathname === "/viewStatus"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/viewStatus"}
                    >
                      Add Status
                    </Link>
                  </div>
                </span>
              </li>


              <li
                className={
                  location.pathname === "/priority"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <span className="menu-link">
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/priority"}
                    >
                      Add Priority
                    </Link>
                  </div>
                </span>
              </li>
             </>
              )}
            </ul>
          </li>


          {/* <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <span href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-news text-success" />
              Contracts{" "}
            </span>
            <ul className="menu-sub">
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/contracts" className="menu-link">
                  <div>Manage Contracts</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/contracts/contract-types" className="menu-link">
                  <div>Contract Types</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-warning" />
              Payslips{" "}
            </a>
            <ul className="menu-sub">
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/payslips" className="menu-link">
                  <div>Manage Payslips</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/allowances" className="menu-link">
                  <div>Allowances</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/deductions" className="menu-link">
                  <div>Deductions</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-success" />
              Finance{" "}
            </a>
            <ul className="menu-sub">
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/expenses" className="menu-link">
                  <div>Expenses</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/expenses/expense-types" className="menu-link">
                  <div>Expense types</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/estimates-invoices" className="menu-link">
                  <div>Estimates/Invoices</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/payments" className="menu-link">
                  <div>Payments</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/payment-methods" className="menu-link">
                  <div>Payment Methods</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/taxes" className="menu-link">
                  <div>Taxes</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/units" className="menu-link">
                  <div>Units</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/items" className="menu-link">
                  <div>Items</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="/notes" className="menu-link">
              <i className="menu-icon tf-icons bx bx-notepad text-primary" />
              <div>Notes</div>
            </a>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="/leave-requests" className="menu-link">
              <i className="menu-icon tf-icons bx bx-right-arrow-alt text-danger" />
              <div>
                Leave Requests{" "}
                <span className="flex-shrink-0 badge badge-center bg-danger w-px-20 h-px-20">
                  2
                </span>
              </div>
            </a>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="/activity-log" className="menu-link">
              <i className="menu-icon tf-icons bx bx-line-chart text-warning" />
              <div>Activity Log</div>
            </a>
          </li>
          <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-success" />
              <div data-i18n="User interface">Settings</div>
            </a>
            <ul className="menu-sub">
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/general" className="menu-link">
                  <div>General</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/permission" className="menu-link">
                  <div>Permissions</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/languages" className="menu-link">
                  <div>Languages</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/email" className="menu-link">
                  <div>E-mail</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/sms-gateway" className="menu-link">
                  <div>SMS gateway/WhatsApp</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/pusher" className="menu-link">
                  <div>Pusher</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/media-storage" className="menu-link">
                  <div>Media Storage</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/templates" className="menu-link">
                  <div>Notification Templates</div>
                </a>
              </li>
              <li className={location.pathname === '/manage' ? 'menu-item active' : 'menu-item'}>
                <a href="/settings/system-updater" className="menu-link">
                  <div>System Updater</div>
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
