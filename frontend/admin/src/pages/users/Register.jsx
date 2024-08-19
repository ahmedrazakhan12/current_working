import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    password: '',
    confirmPassword: '',
    country: '',
    postalCode: '',
    role: '',
    description: '', // Added description field
  });
  const [pfpImage, setPfpImage] = useState(null); // Separate state for the file
  const [errorMessage, setErrorMessage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const handlePhoneChange = (value, country) => {
    // Combine country code and phone number
    const combinedPhoneNumber = `+${value}`;
  
    setFormData({
      ...formData,
      contact: combinedPhoneNumber,  // Store the combined phone number with country code
    });
  };
  
  const handleChange = (e) => {
    if (e.target.name === 'pfpImage') {
      const file = e.target.files[0];
      setPfpImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleEyePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

 

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('contact', formData.contact);
    data.append('address', formData.address);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('country', formData.country);
    data.append('postalCode', formData.postalCode);
    data.append('role', formData.role);
    data.append('description', formData.description); // Append description to FormData

    if (pfpImage) {
      data.append('pfpImage', pfpImage);
    }

    axios
      .post('http://localhost:5000/admin/register', data)
      .then((res) => {
        console.log(res.data);
        setErrorMessage(null);
        navigate('/manageUsers');
        Swal.fire({
          position: "top-end",
          title: "User Registered",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal'
          }
        });
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
        console.error(err);
      });
  };

  const handleBack = () => {
    navigate('/');
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
              <li className="breadcrumb-item active">Register </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <h5 className="card-header">Profile Details</h5>
              <form
                className="form-submit-event"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
            <div className="card-body">
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  <img
                    src={ imagePreviewUrl || 'assets/images/avatar.jpg' }
                    alt="user-avatar"
                    className="d-block rounded"
                    height={100}
                    width={100}
                    style={{ objectFit: 'cover' }}
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
                        onChange={handleChange}
                      />
                    
                    </div>
                    <p className="text-muted mt-2">Allowed JPG or PNG</p>
                  </div>
                </div>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              
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
                      autoFocus=""
                      value={formData.name}
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
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                    type="number"
                    id="phone"
                    name="contact"
                    placeholder="Please Enter Phone Number"
                    className="form-control"
                    value={formData.contact || ""}
                    onChange={handleChange}
                  />    {/* <PhoneInput
      country={'us'}
      // value={formData.contact}
      onChange={handlePhoneChange}  // Correctly pass the value
      inputProps={{
        name: 'contact',
        required: true,
        placeholder: 'Please Enter Phone Number',
      }}
      containerStyle={{
        width: '100%',
        // maxWidth: '400px',
        // margin: '0 auto',
        // marginBottom: '20px',
      }}
      inputStyle={{
        borderRadius: '5px',
        border: '1px solid #ccc',
        // padding: '10px',
        fontSize: '16px',
        width: '100%',
      }}
      buttonStyle={{
        backgroundColor: '#f8f8f8',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
      }}
      dropdownStyle={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
      }}
    /> */}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select
                      className="form-select text-capitalize"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      <option value="super-admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
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
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="description"
                      placeholder="Please Enter Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
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
                      value={formData.country}
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
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>



                  <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="password">
                      Password
                    </label>
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
                      <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="confirmpassword">
                      Re-type new password
                    </label>
<div className="input-group input-group-merge">
      <input
        type={passwordType}
        id="password"
        className="form-control"
        name="confirmPassword"
        placeholder="Please Enter Password"
        // defaultValue="123456"
        onChange={handleChange}
        aria-describedby="password"
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
                    <div className="col-12 mb-0">
                      <div className="alert alert-warning">
                        <p className="mb-0 text-center">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-0">
                    <button
                      type="submit"
                      id="submit_btn"
                      className="btn btn-primary me-2"
                    >
                      Register
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleBack}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
            </div>
              </form>
          
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
