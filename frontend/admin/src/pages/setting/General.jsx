import React from "react";
import { Link } from "react-router-dom";

const General = () => {
  return (
    <div className="container-fluid  mt-4">
      <div className="card px-4 pt-4 pb-5">
      <div
        className="d-flex "
        data-toggle="modal"
        data-target="#exampleModal"
      >
            <i className="bx bx-cog me-2"  style={{fontSize:"25px"}}/>
        <div className="d-flex flex-column justify-content-center">
          <h4 className="mb-0 text-sm" style={{ cursor: "pointer" }}>
            Setting
          </h4>
        </div>
      </div>{" "}

      <div className="dropdown-divider mt-3" />
       
     <Link style={{ textDecoration: "none" }} to={'/changePassword'}>
     <div
        className="d-flex mt-5"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="bx bx-lock me-2 text-dark" />
        <div className="d-flex flex-column justify-content-center">
          <h6 className="mb-0 text-sm" style={{ cursor: "pointer" }}>
            Security | Change Password
          </h6>
        </div>
      </div></Link>{" "}
      {/* <div className="dropdown-divider mt-3" /> */}
    
      {/* <Link style={{ textDecoration: "none" }} to={'/viewStatus'}>
     <div
        className="d-flex mt-5"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="bx bx-user me-2 text-dark" />
        <div className="d-flex flex-column justify-content-center">
          <h6 className="mb-0 text-sm" style={{ cursor: "pointer" }}>
            Add Status
          </h6>
        </div>
      </div></Link>{" "}
      <div className="dropdown-divider mt-3" />
    

      <Link style={{ textDecoration: "none" }} to={'/priority'}>
     <div
        className="d-flex mt-5"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="bx bx-user me-2 text-dark" />
        <div className="d-flex flex-column justify-content-center">
          <h6 className="mb-0 text-sm" style={{ cursor: "pointer" }}>
            Add Priority
          </h6>
        </div>
      </div></Link>{" "}
      <div className="dropdown-divider mt-3" />
     */}

      </div>


      
         
    </div>
  );
};

export default General;
