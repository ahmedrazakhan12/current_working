import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const Editusers = () => {
  const {id} = useParams();
  const [data, setData] = useState({});
  const [pfpImage, setPfpImage] = useState(null); // Separate state for the file
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`http://localhost:5000/admin/team/${id}`)
      .then((res) => {
        console.log(res.data);
          setData(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
  }, [id]);

  useEffect(() => {
      setImagePreviewUrl(data.pfpImage);
  }, [data]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImagePreviewUrl(imageUrl);
          setPfpImage(file);
      } else {
          setImagePreviewUrl("");
      }
  };

  const handleProfileImageSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("pfpImage", pfpImage);

      axios.put(`http://localhost:5000/admin/adminSingleProfile/${data.id}`, formData)
      .then((res) => {
          Swal.fire({
              position: "top-end",
              title: "Profile Image updated successfully",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                  popup: 'custom-swal'
              }
          }).then(() => {
              navigate("/manageUsers");
          });
      })
      .catch((err) => {
          console.log(err);
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:5000/admin/editProfile/`, data)
      .then((res) => {
          Swal.fire({
              position: "top-end",
              title: "Profile updated successfully",
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
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  const handleBack = () => {
    navigate("/manageUsers");
  };


  const handleUserDelete = () => {
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/admin/delete/${data.id}`)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              title: "User deleted successfully",
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
            console.log(err);
          });
      }
    });

  }
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
          <h5 className="card-header">Profile Details</h5>
          {/* Account */}
          <div className="card-body">
            <form
              className="form-submit-event"
              encType="multipart/form-data"
              onSubmit={handleProfileImageSubmit}
            >
              <input
                type="hidden"
                name="redirect_url"
                defaultValue="/account/7"
              />
              <input
                type="hidden"
                name="_token"
                defaultValue="ExHUdiZcSr0YusuNMHGeteh19a7C4HtV7Xx4D0oq"
                autoComplete="off"
              />{" "}
              <input type="hidden" name="_method" />{" "}
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                <img
                  src={imagePreviewUrl || data.pfpImage }
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  style={{ objectFit: "cover" }}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper">
                  <div className="input-group d-flex">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      accept="image/png, image/jpeg"
                      name="pfpImage"
                      onChange={handleFileChange}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="submit"
                    >
                      Update Profile Photo
                    </button>
                  </div>
                  <p className="text-muted mt-2">Allowed JPG or PNG</p>
                </div>
              </div>
            </form>
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <form
              id="formAccountSettings"
              encType="multipart/form-data"
              className="form-submit-event"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="redirect_url"
                defaultValue="/account/7"
              />
              <input
                type="hidden"
                name="_token"
                defaultValue="ExHUdiZcSr0YusuNMHGeteh19a7C4HtV7Xx4D0oq"
                autoComplete="off"
              />{" "}
              <input type="hidden" name="_method" defaultValue="PUT" />{" "}
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name 
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Please Enter First Name"
                    autofocus=""
                    value={data.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="email">
                    E-mail 
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Please Enter Email"
                    value={data.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="contact"
                    placeholder="Please Enter Phone Number"
                    className="form-control"
                    value={data.contact || ""}
                    onChange={handleChange}
                  />
                </div>
               
                {/* <div className="mb-3 col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password{" "}
                    <small className="text-muted">
                      {" "}
                      (Leave it blank if no change)
                    </small>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Please Enter Password"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="password_confirmation"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Please Re Enter Password"
                  />
                </div> */}
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="role">
                    Role 
                  </label>
                  <div className="input-group">
  <select
    className="form-select text-capitalize"
    id="role"
    name="role"
    value={data.role || ""}
    onChange={handleChange}
  >
    <option value="">{data.role}</option>
    <option value={data.role === "admin" ? "member" : "admin"}>
      {data.role === "admin" ? "Member" : "Admin"}
    </option>
  </select>
</div>

                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="address"
                    placeholder="Please Enter Address"
                    name="address"
                    value={data.address || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Description
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="description"
                    placeholder="Please Enter Description"
                    name="description"
                    value={data.description || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    placeholder="Please Enter City"
                    name="city"
                    defaultValue="Windsor"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="state">
                    State
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="state"
                    placeholder="Please Enter State"
                    name="state"
                    defaultValue="ON"
                  />
                </div> */}
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="country"
                    placeholder="Please Enter Country"
                    name="country"
                    value={data.country || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="zip"
                    placeholder="Please Enter ZIP Code"
                    name="postalCode"
                    value={data.postalCode || ""}
                    onChange={handleChange}
                  />
                </div>
               {errorMessage &&  
               <div className=" col-12 mb-0">
                <div className="alert alert-warning">
                 
                  <p className="mb-0 text-center">
                  {errorMessage}
                  </p>
                </div>
              </div>}
                <div className="mt-0">
                  <button
                    type="submit"
                    id="submit_btn"
                    className="btn btn-primary me-2"
                  >
                    Update
                  </button>
                    <button
                      type='button'
                      className="btn btn-outline-secondary"
                      onClick={handleBack}
                    >
                      Cancel
                    </button>
                </div>
              </div>
            </form>
            {/* /Account */}
          </div>
          <div className="card">
            <h5 className="card-header">Delete Account</h5>
            <div className="card-body">
              <div className="mb-3 col-12 mb-0">
                <div className="alert alert-warning">
                  <h6 className="alert-heading fw-bold mb-1">
                    Are You Sure You Want to Delete Your Account?
                  </h6>
                  <p className="mb-0">
                    Once You Delete Your Account, There Is No Going Back.
                    Please Be Certain.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleUserDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    </div>
    </>
  )
}

export default Editusers
