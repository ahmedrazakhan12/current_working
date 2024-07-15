import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
const ChangePass = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const activeId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/adminInfo/` , {
        headers: { Authorization: `${activeId}` },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
        setConfirmPassword(value);
      } else if (name === "currentPassword") {
        setCurrentPassword(value);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/admin/changePassword`, {
        password,
        confirmPassword,
        currentPassword,
      },
      {
        headers: {
          Authorization: activeId,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          title: "Password updated successfully",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal",
          },
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  };
  const [passwordType, setPasswordType] = useState("password");
  
  const handleEyePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  return (
    <>
       
      <div className="container-fluid">
        <div className="d-flex justify-content-between mb-2 mt-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-style1">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Profile </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header text-capitalize">
                {data.name} | Password & Security
              </h5>
              {/* Account */}

              <hr className="my-0" />
              <div className="card-body">
                <form action="" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 mb-3">
                    <label htmlFor="company_title" className="form-label">
                        Current Password<span className="asterisk">*</span>
                      </label>
                    <div className="input-group input-group-merge">
                      
                    <input
                          type={passwordType}
                          id="password"
                          className="form-control"
                          name="currentPassword"
                          placeholder="Please Enter Current Password"
                          onChange={handleChange}
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
                   
                     
                    </div>
                    <div className="mb-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <label htmlFor="company_title" className="form-label">
                        Password<span className="asterisk">*</span>
                      </label>
                      <div className="input-group input-group-merge">
                      
                      <input
                            type={passwordType}
                            id="password"
                            className="form-control"
                            name="password"
                            placeholder="Please Enter Password"
                            onChange={handleChange}
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
                     
                    </div>
                    <div className="mb-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                      <label htmlFor="company_title" className="form-label">
                        Comfirm Password<span className="asterisk">*</span>
                      </label>

                      <div className="input-group input-group-merge">
                      
                      <input
                            type={passwordType}
                            id="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Please Enter Comfirm Password"
                            onChange={handleChange}
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

                    </div>

                    {errorMessage && (
                          <div className=" col-12 mt-3">
                          <div className="alert alert-warning">
                            <p className="mb-0 text-center">{errorMessage}</p>
                          </div>
                        </div>
                    )}


                    <div className="col-12 mt-3 ">
                      <button
                        className="btn btn-warning float-end m-0 "
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary float-end me-2 "
                        type="button"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
