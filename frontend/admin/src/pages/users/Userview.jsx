import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
const Userview = () => {
  const {id} = useParams();
  const [data, setData] = useState({});
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



  const handleBack = () => {
    navigate("/manageUsers");
  };


  
  return (
    <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item text-capitalize"> {data.name} </li>
            <li className="breadcrumb-item active"> Profile</li>
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
                  src={ data.pfpImage }
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  style={{ objectFit: "cover" }}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper mb-4">
                  <h3 className="text-capitalize">{data.name}</h3>
                  <p className='font-weight-bold texxt-muted ' style={{marginTop:'-13px'}}>{data.email}</p>
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
                    readOnly
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Please Enter First Name"
                    autofocus=""
                    value={data.name || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="email">
                    E-mail 
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Please Enter Email"
                    value={data.email || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="phone"
                    name="contact"
                    placeholder="Please Enter Phone Number"
                    className="form-control"
                    value={data.contact || "-"}
                    
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
                    readOnly
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
                    readOnly
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
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="address"
                    placeholder="Please Enter Address"
                    name="role"
                    value={data.role || "-"}
                    
                  />
                

                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="address"
                    placeholder="Please Enter Address"
                    name="address"
                    value={data.address || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Description
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="description"
                    placeholder="Please Enter Description"
                    name="description"
                    value={data.description || "-"}
                    
                  />
                </div>
                {/* <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    readOnly
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
                    readOnly
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
                    readOnly
                    className="form-control"
                    type="text"
                    id="country"
                    placeholder="Please Enter Country"
                    name="country"
                    value={data.country || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="number"
                    id="zip"
                    placeholder="Please Enter ZIP Code"
                    name="postalCode"
                    value={data.postalCode || "-"}
                    
                  />
                </div>
              
              
              </div>
            </form>
            {/* /Account */}
          </div>
          
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default Userview
