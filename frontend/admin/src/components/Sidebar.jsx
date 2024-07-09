import React from "react";
import { useAppContext } from "../context/AppContext";
import {Link} from "react-router-dom";
const Sidebar = () => {
  const{
    setIsOpen,
    isOpen,
    setIsMenuExpanded,
    isMenuExpanded
  }=useAppContext();
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme menu-container"
      >
        <div className="app-brand demo">
          <a href="/home" className="app-brand-link">
            <span className="app-brand-logo demo">
              <img
                src="assets/images/zEy4tSCAFSMczWbOoxBZ3B43Nc9eeqMlNBXDrOzn.webp"
                width="200px"
                alt=""
              />
            </span>
            {/* <span class="app-brand-text demo menu-text fw-bolder ms-2">Taskify</span> */}
          </a>
          <a
            onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>
        <div className="btn-group dropend px-2">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Main workspace
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/workspaces/switch/6">
                <i className="menu-icon tf-icons bx bx-check-square text-primary" />{" "}
                Main workspace
                <span className="badge bg-success">Primary</span>{" "}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/workspaces/switch/7">
                <i className="menu-icon tf-icons bx bx-square text-solid" /> Dev
                Team
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/workspaces/switch/13">
                <i className="menu-icon tf-icons bx bx-square text-solid" />{" "}
                UI/UX &amp; Graphics Team
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/workspaces/switch/14">
                <i className="menu-icon tf-icons bx bx-square text-solid" />{" "}
                Sales Team
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/workspaces/switch/15">
                <i className="menu-icon tf-icons bx bx-square text-solid" />{" "}
                DevOps Team
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/workspaces">
                <i className="menu-icon tf-icons bx bx-bar-chart-alt-2 text-success" />
                Manage Workspaces{" "}
                <span className="badge badge-center bg-primary"> + 96</span>
              </a>
            </li>
            <li>
              <span
                data-bs-toggle="modal"
                data-bs-target="#createWorkspaceModal"
              >
                <a className="dropdown-item" href="javascript:void(0);">
                  <i className="menu-icon tf-icons bx bx-plus text-warning" />
                  Create Workspace
                </a>
              </span>
            </li>
            <li>
              <a
                className="dropdown-item edit-workspace"
                href="javascript:void(0);"
                data-id={6}
              >
                <i className="menu-icon tf-icons bx bx-edit text-primary" />
                Edit Workspace
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" id="remove-participant">
                <i className="menu-icon tf-icons bx bx-exit text-danger" />
                Remove Me from Workspace
              </a>
            </li>
          </ul>
        </div>
        <ul className="menu-inner py-1">
          <hr className="dropdown-divider" />
          {/* Dashboard */}
          <li className="menu-item active">
            <span  className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle text-danger" />
              <div>Dashboard</div>
            </span>
          </li>
          <li className={`${isOpen ? 'menu-item open': 'menu-item'}`}  >
            <span className="menu-link menu-toggle" onClick={() => setIsOpen(!isOpen)}>
              <i className="menu-icon tf-icons bx bx-briefcase-alt-2 text-success" />
              <div>Projects</div>
            </span>
            <ul className="menu-sub">
              <li className="menu-item ">
                <span className="menu-link">
                  <div>Manage Projects</div>
                </span>
              </li>
              <li className="menu-item ">
                <span  className="menu-link">
                  <div>Favorite Projects</div>
                </span>
              </li>
              <li className="menu-item ">
                <span href="/tags/manage" className="menu-link">
                  <div>Tags</div>
                </span>
              </li>
            </ul>
          </li>
          <li className="menu-item ">
            <span className="menu-link">
              <i className="menu-icon tf-icons bx bx-task text-primary" />
              <div>Tasks</div>
            </span>
          </li>
          {/* <li className="menu-item ">
            <span href="/status/manage" className="menu-link">
              <i className="menu-icon tf-icons bx bx-grid-small text-secondary" />
              <div>Statuses</div>
            </span>
          </li> */}
          {/* <li className="menu-item ">
            <span href="/priority/manage" className="menu-link">
              <i className="menu-icon tf-icons bx bx-up-arrow-alt text-success" />
              <div>Priorities</div>
            </span>
          </li> */}
          {/* <li className="menu-item ">
            <span href="/workspaces" className="menu-link">
              <i className="menu-icon tf-icons bx bx-check-square text-danger" />
              <div>Workspaces</div>
            </span>
          </li> */}
          {/* <li className="menu-item ">
            <span href="/chat" className="menu-link">
              <i className="menu-icon tf-icons bx bx-chat text-warning" />
              <div>Chat </div>
            </span>
          </li> */}
          {/* <li className="menu-item ">
            <span href="/todos" className="menu-link">
              <i className="menu-icon tf-icons bx bx-list-check text-dark" />
              <div>Todos </div>
            </span>
          </li> */}
          <li className="menu-item ">
            <span  className="menu-link">
              <i className="menu-icon tf-icons bx bx-shape-polygon text-success" />
              <div>
                Meetings{" "}
                <span className="flex-shrink-0 badge badge-center bg-success w-px-20 h-px-20">
                  2
                </span>
              </div>
            </span>
          </li>
          <li className="menu-item ">
            <span  className="menu-link">
              <i className="menu-icon tf-icons bx bx-group text-primary" />
              <div>Users</div>
            </span>
          </li>
          <li className="menu-item ">
            <Link to="/clients" className="menu-link">
              <i className="menu-icon tf-icons bx bx-group text-warning" />
              <div>Clients</div>
            </Link>
          </li>
          {/* <li className="menu-item ">
            <span href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-news text-success" />
              Contracts{" "}
            </span>
            <ul className="menu-sub">
              <li className="menu-item ">
                <a href="/contracts" className="menu-link">
                  <div>Manage Contracts</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/contracts/contract-types" className="menu-link">
                  <div>Contract Types</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item ">
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-warning" />
              Payslips{" "}
            </a>
            <ul className="menu-sub">
              <li className="menu-item ">
                <a href="/payslips" className="menu-link">
                  <div>Manage Payslips</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/allowances" className="menu-link">
                  <div>Allowances</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/deductions" className="menu-link">
                  <div>Deductions</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item ">
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-success" />
              Finance{" "}
            </a>
            <ul className="menu-sub">
              <li className="menu-item ">
                <a href="/expenses" className="menu-link">
                  <div>Expenses</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/expenses/expense-types" className="menu-link">
                  <div>Expense types</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/estimates-invoices" className="menu-link">
                  <div>Estimates/Invoices</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/payments" className="menu-link">
                  <div>Payments</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/payment-methods" className="menu-link">
                  <div>Payment Methods</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/taxes" className="menu-link">
                  <div>Taxes</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/units" className="menu-link">
                  <div>Units</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/items" className="menu-link">
                  <div>Items</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item ">
            <a href="/notes" className="menu-link">
              <i className="menu-icon tf-icons bx bx-notepad text-primary" />
              <div>Notes</div>
            </a>
          </li>
          <li className="menu-item ">
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
          <li className="menu-item ">
            <a href="/activity-log" className="menu-link">
              <i className="menu-icon tf-icons bx bx-line-chart text-warning" />
              <div>Activity Log</div>
            </a>
          </li>
          <li className="menu-item ">
            <a href="javascript:void(0)" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-box text-success" />
              <div data-i18n="User interface">Settings</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item ">
                <a href="/settings/general" className="menu-link">
                  <div>General</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/permission" className="menu-link">
                  <div>Permissions</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/languages" className="menu-link">
                  <div>Languages</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/email" className="menu-link">
                  <div>E-mail</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/sms-gateway" className="menu-link">
                  <div>SMS gateway/WhatsApp</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/pusher" className="menu-link">
                  <div>Pusher</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/media-storage" className="menu-link">
                  <div>Media Storage</div>
                </a>
              </li>
              <li className="menu-item ">
                <a href="/settings/templates" className="menu-link">
                  <div>Notification Templates</div>
                </a>
              </li>
              <li className="menu-item ">
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
