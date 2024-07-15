import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
const ChangeUserPass = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/team/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/admin/changeAdminPassword/${data.id}`, {
        password,
        confirmPassword,
      })
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
          navigate("/manageUsers");
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
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
               <img src={data.pfpImage} style={{width:'40px' , objectFit:'cover' , borderRadius:'8px'}} alt="" /> <span className="text-capitalize">{data.name}</span> | Password & Security
              </h5>
              {/* Account */}

              <hr className="my-0" />
              <div className="card-body">
                <form action="" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-6 col-12">
                      <label htmlFor="company_title" className="form-label">
                        Password<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Please Enter Password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6 col-12 mt-2">
                      <label htmlFor="company_title" className="form-label">
                        Comfirm Password<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="comfim_password"
                        name="confirmPassword"
                        placeholder="Please Enter Comfirm Password"
                        onChange={handleChange}
                      />
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
                        type=""
                        onClick={() => navigate("/")}
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

export default ChangeUserPass;
