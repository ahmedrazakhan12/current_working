import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [switchForm, setSwitchForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (e.target.name === "role") {
      setRole(e.target.value);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin/register", {
        name,
        email,
        password,
        confirmPassword,
        role,
      })
      .then((res) => {
        navigate("/login");
        console.log(res.data);
        
      })
      .catch((err) => {
        
        setError(err.response.data.message); 

      });
  };


  return (
    <div className="container-fluid ">
      <style>
        {`
          .light-style.layout-menu-fixed {
            display: none;
          }
        `}
      </style>
      <div className="row " style={{ display: "flex", justifyContent: "center" }}>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
        <div className="card">
                  <div className="card-body">
                    {/* Logo */}
                    <div className="app-brand justify-content-center">
                      <a href="/home" className="app-brand-link">
                        <span className="app-brand-logo demo">
                          <img
                            src="https://taskify.taskhub.company/storage/logos/zEy4tSCAFSMczWbOoxBZ3B43Nc9eeqMlNBXDrOzn.png"
                            width="300px"
                            alt=""
                          />
                        </span>
                        {/* <span class="app-brand-text demo menu-text fw-bolder ms-2">Taskify</span> */}
                      </a>
                    </div>
                    {/* /Logo */}
                    <h4 className="mb-4">Create a new account</h4>
                    <form className="mb-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Name <span className="asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Please Enter Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Email <span className="asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Please Enter Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password <span className="asterisk">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Please Enter Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password <span className="asterisk">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Please Re-enter Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Role <span className="asterisk">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="role"
                    value={role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="member">Member</option>
                    <option value="gerente">Gerente</option>
                    <option value="developer">Developer</option>
                    {/* Add other options as needed */}
                  </select>
                </div>
                <div>
                  {error && <p className="text-danger">{error}</p>}
                </div>
                <button type="submit" className="btn btn-primary d-grid w-100">
                  Submit
                </button>
              </form>
                    <div className="text-center">
                      <a
                        href="https://taskify.taskhub.company"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                        Back to login
                      </a>
                    </div>
                  </div>
                </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;