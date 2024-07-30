// Breadcrumbs.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x && isNaN(x));

  const customMappings = {
    "favorite": "Favorite",
    "manage": "Manage Projects",
    "editProject": "Edit Project",
    "projectInformation": "Project Information",
    "addTask": "Add Task",
    "editTask": "Edit Task",
    "tasks": "Tasks",
    "general": "General",
    "viewStatus": "Add Status",
    "priority": "Priority",
    "changePassword": "Change Password",
    "profile": "Profile"
    // Add more custom mappings as needed
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const name = customMappings[value] || value;

      return (
        <li className="breadcrumb-item" key={to}>
          {index === pathnames.length - 1 ? (
            name
          ) : (
            <Link to={to} className="fw-bold">{name}</Link>
          )}
        </li>
      );
    });

    return breadcrumbs;
  };

  return (
    <>
    {location.pathname === "/" ? "" :<div className="container-fluid ">
      <div className="d-flex justify-content-between mt-3 " style={{marginLeft:'10px'}}>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-style1 " >
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
                
              {generateBreadcrumbs()}
            </ol>
          </nav>
        </div>
        <div></div>
        <div>
          <a href="projects/list/favorite"></a>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Breadcrumbs;
