import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.data.id);
        navigate("/");
        Swal.fire({
          position: "top-end",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal'
          }
        });
       
        

        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      
      });
  };
  const handleEyePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
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
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="col-lg-5 col-md-10 col-sm-10 col-12">
          <div className="text-center mt-4">
            <div className="alert alert-warning mb-0">
              <b>Note:</b> Login here.
            </div>
          </div>
          <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
              {/* Register */}
              <div className="card">
                <div className="card-body">
                  {/* Logo */}
                  <div className="app-brand justify-content-center">
                    <a
                      href="https://taskify.taskhub.company/"
                      className="app-brand-link gap-2"
                    >
                      <span className="app-brand-logo demo">
                        <img
                          src="https://taskify.taskhub.company/storage/logos/zEy4tSCAFSMczWbOoxBZ3B43Nc9eeqMlNBXDrOzn.png"
                          width="300px"
                          alt=""
                        />
                      </span>
                    </a>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-2">Welcome to Taskify! 👋</h4>
                  <form
                    id="formAuthentication"
                    className="mb-3 form-submit-event"
                    action=""
                    onSubmit={handleSubmit}
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="redirect_url"
                      defaultValue="/home"
                    />
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="1YXzFUwmmVtQI70Hc2ve6h800uDy19b13elc9Gov"
                      autoComplete="off"
                    />
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email <span className="asterisk">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Please Enter Email"
                        // defaultValue="admin@gmail.com"
                        autoFocus
                          required
                          onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">
                          Password <span className="asterisk">*</span>
                        </label>
                        <a href="https://taskify.taskhub.company/forgot-password">
                          <small>Forgot Password?</small>
                        </a>
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type={passwordType}
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="Please Enter Password"
                          // defaultValue="123456"
                          onChange={handleChange}
                          aria-describedby="password"
                          required
                        />
                        <span
                          className="input-group-text cursor-pointer"
                          onClick={handleEyePassword}
                        >
                          <i
                            className={`bx ${
                              passwordType === "password"
                                ? "bx-hide"
                                : "bx-show"
                            }`}
                          />
                        </span>
                      </div>
                      <span className="text-danger text-xs mt-1 error-message" />
                    </div>
                    <div className="mb-4">
                    {error &&  
               <div className=" col-12 mb-0">
                <div className="alert alert-warning">
                 
                  <p className="mb-0 text-center">
                  {error}
                  </p>
                </div>
              </div>}
                      <button
                        className="btn btn-primary d-grid w-100"
                        id="submit_btn"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    
                  </form>
                </div>
              </div>
              {/* /Register */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
