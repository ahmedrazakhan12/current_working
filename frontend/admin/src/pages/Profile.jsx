import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [data , setData] = useState([]);
    const activeId = localStorage.getItem("id");
  
    useEffect(() => {
      axios.get(`http://localhost:5000/admin/adminInfo/`, {
        headers: { Authorization: ` ${activeId}` }
      })
      .then((res)=>{
        setData(res.data);
        console.log("Login user data: ",res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }, []);


  return (
    <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
              <a href="https://taskify.taskhub.company/home">Home</a>
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
              action="https://taskify.taskhub.company/profile/update_photo/7"
              className="form-submit-event"
              method="POST"
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
              <input type="hidden" name="_method" defaultValue="PUT" />{" "}
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                <img
                  src={data.pfpImage}
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  style={{ objectFit: "contain" }}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper">
                  <div className="input-group d-flex">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      name="upload"
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="submit"
                      id="submit_btn"
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
              method="POST"
              className="form-submit-event"
              action="/profile/update/7"
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
                    First Name <span className="asterisk">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Please Enter First Name"
                    defaultValue="Admin"
                    autofocus=""
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="asterisk">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    placeholder="Please Enter Last Name"
                    id="last_name"
                    defaultValue="Infinitie"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Please Enter Phone Number"
                    className="form-control"
                    defaultValue={9876543201}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="email">
                    E-mail <span className="asterisk">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Please Enter Email"
                    defaultValue="admin@gmail.com"
                  />
                </div>
                <div className="mb-3 col-md-6">
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
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="role">
                    Role <span className="asterisk">*</span>
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select text-capitalize"
                      id="role"
                      name="role"
                    >
                      <option value={1} selected="">
                        Admin
                      </option>
                      <option value={9}>Member</option>
                      <option value={18}>Client</option>
                      <option value={21}>Gerente</option>
                      <option value={22}>Developer</option>
                      <option value={23}>Admin one</option>
                      <option value={24}>Product manager</option>
                      <option value={25}>Gong</option>
                      <option value={26}>SIS</option>
                      <option value={27}>Test</option>
                      <option value={28}>Templatedata</option>
                      <option value={29}>Test12</option>
                      <option value={30}>Test_role</option>
                      <option value={31}>User</option>
                      <option value={32}>Test test role</option>
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
                    defaultValue="Devonshire"
                  />
                </div>
                <div className="mb-3 col-md-6">
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
                    defaultValue="Canada"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="zip"
                    placeholder="Please Enter ZIP Code"
                    name="zip"
                    defaultValue={123654}
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    id="submit_btn"
                    className="btn btn-primary me-2"
                  >
                    Update
                  </button>
                  <button
                    type="reset"
                    className="btn btn-outline-secondary"
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
                type="submit"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#deleteAccountModal"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="default_language_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Want to Set As Your Primary Language?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirm"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="set_default_view_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Want to Set as Default View?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirm"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="confirmSaveColumnVisibility"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Want to Save Column Visibility?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirm"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="leaveWorkspaceModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Warning
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            Are You Sure You Want Leave This Workspace?{" "}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button type="submit" className="btn btn-danger" id="confirm">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="create_language_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <form
          className="modal-content form-submit-event"
          action="https://taskify.taskhub.company/settings/languages/store"
          method="POST"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Create Language
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <input
            type="hidden"
            name="_token"
            defaultValue="ExHUdiZcSr0YusuNMHGeteh19a7C4HtV7Xx4D0oq"
            autoComplete="off"
          />{" "}
          <div className="modal-body">
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameBasic" className="form-label">
                  Title <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="For Example: English"
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameBasic" className="form-label">
                  Code <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="For Example: en"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              id="submit_btn"
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      className="modal fade"
      id="edit_language_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <form
          className="modal-content form-submit-event"
          action="https://taskify.taskhub.company/settings/languages/update"
          method="POST"
        >
          <input type="hidden" name="id" id="language_id" />
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Update Language
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <input
            type="hidden"
            name="_token"
            defaultValue="ExHUdiZcSr0YusuNMHGeteh19a7C4HtV7Xx4D0oq"
            autoComplete="off"
          />{" "}
          <div className="modal-body">
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameBasic" className="form-label">
                  Title <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="language_title"
                  placeholder="For Example: English"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              id="submit_btn"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      className="modal fade"
      id="create_contract_type_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <form
          className="modal-content form-submit-event"
          action="https://taskify.taskhub.company/contracts/store-contract-type"
          method="POST"
        >
          <input type="hidden" name="dnr" />
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Create Contract Type
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameBasic" className="form-label">
                  Type <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Please Enter Contract Type"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              id="submit_btn"
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      className="modal fade"
      id="edit_contract_type_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <form
          className="modal-content form-submit-event"
          action="https://taskify.taskhub.company/contracts/update-contract-type"
          method="POST"
        >
          <input type="hidden" name="dnr" />
          <input type="hidden" id="update_contract_type_id" name="id" />
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Update Contract Type
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameBasic" className="form-label">
                  Type <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  id="contract_type"
                  placeholder="Please Enter Contract Type"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              id="submit_btn"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      className="modal fade"
      id="deleteAccountModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Warning
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Sure You Want to Delete Your Account?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <form
              id="formAccountDeactivation"
              action="/account/destroy/7"
              method="POST"
            >
              <input
                type="hidden"
                name="_token"
                defaultValue="ExHUdiZcSr0YusuNMHGeteh19a7C4HtV7Xx4D0oq"
                autoComplete="off"
              />{" "}
              <input type="hidden" name="_method" defaultValue="DELETE" />{" "}
              <button type="submit" className="btn btn-danger">
                Yes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel2">
              Warning
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
              '
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              id="confirmDelete"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="confirmDeleteSelectedModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel2">
              Warning
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
              '
            </button>
          </div>
          <div className="modal-body">
            <p>Are You Sure You Want to Delete Selected Record(s)?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              id="confirmDeleteSelections"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="duplicateModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Warning
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Sure You Want to Duplicate?</p>
            <div id="titleDiv" className="d-none">
              <label className="form-label">Update Title</label>
              <input
                type="text"
                className="form-control"
                id="updateTitle"
                placeholder="Enter Title For Item Being Duplicated"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmDuplicate"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="timerModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Time Tracker
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="stopwatch">
              <div className="stopwatch_time">
                <input
                  type="text"
                  name="hour"
                  id="hour"
                  className="form-control stopwatch_time_input"
                  readOnly=""
                />
                <div className="stopwatch_time_lable">Hours</div>
              </div>
              <div className="stopwatch_time">
                <input
                  type="text"
                  name="minute"
                  id="minute"
                  className="form-control stopwatch_time_input"
                  readOnly=""
                />
                <div className="stopwatch_time_lable">Minutes</div>
              </div>
              <div className="stopwatch_time">
                <input
                  type="text"
                  name="second"
                  id="second"
                  className="form-control stopwatch_time_input"
                  readOnly=""
                />
                <div className="stopwatch_time_lable">Second</div>
              </div>
            </div>
            <div className="selectgroup selectgroup-pills d-flex justify-content-around mt-3">
              <label className="selectgroup-item">
                <span
                  className="selectgroup-button selectgroup-button-icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Start"
                  id="start"
                  onclick="startTimer()"
                >
                  <i className="bx bx-play" />
                </span>
              </label>
              <label className="selectgroup-item">
                <span
                  className="selectgroup-button selectgroup-button-icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Stop"
                  id="end"
                  onclick="stopTimer()"
                >
                  <i className="bx bx-stop" />
                </span>
              </label>
              <label className="selectgroup-item">
                <span
                  className="selectgroup-button selectgroup-button-icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Pause"
                  id="pause"
                  onclick="pauseTimer()"
                >
                  <i className="bx bx-pause" />
                </span>
              </label>
            </div>
            <div className="form-group mb-0 mt-3">
              <label className="label">Message:</label>
              <textarea
                className="form-control"
                id="time_tracker_message"
                placeholder="Please Enter Your Message"
                name="message"
                defaultValue={""}
              />
            </div>
            <div className="modal-footer justify-content-center">
              <a href="/time-tracker" className="btn btn-primary">
                <i className="bx bxs-time" /> View Timesheet
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="stopTimerModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel2">
              Warning
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
              '
            </button>
          </div>
          <div className="modal-body">
            <p>Are You Sure You Want to Stop the Timer?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              id="confirmStop"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="mark_all_notifications_as_read_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>
              Are You Sure You Want to Mark All Notifications as Read?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmMarkAllAsRead"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="update_notification_status_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are You Sure You Want to Update Notification Status?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmNotificationStatus"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="restore_default_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are you sure you want to restore default template?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmRestoreDefault"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="sms_instuction_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Sms Gateway Configuration
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <ul>
              <li>
                Read and follow instructions carefully while configuration
                sms gateway setting{" "}
              </li>
              <li className="my-4">
                Firstly open your sms gateway account . You can find api
                keys in your account -&gt; API keys &amp; credentials
                -&gt; create api key{" "}
              </li>
              <li className="my-4">
                After create key you can see here Account sid and auth
                token{" "}
              </li>
              <div className="simplelightbox-gallery">
                <a
                  href="https://taskify.taskhub.company/storage/images/base_url_and_params.png"
                  target="_blank"
                >
                  <img
                    src="https://taskify.taskhub.company/storage/images/base_url_and_params.png"
                    className="w-100"
                  />
                </a>
              </div>
              <li className="my-4">
                For Base url Messaging -&gt; Send an SMS
              </li>
              <div className="simplelightbox-gallery">
                <a
                  href="https://taskify.taskhub.company/storage/images/api_key_and_token.png"
                  target="_blank"
                >
                  <img
                    src="https://taskify.taskhub.company/storage/images/api_key_and_token.png"
                    className="w-100"
                  />
                </a>
              </div>
              <li className="my-4">
                check this for admin panel settings
              </li>
              <div className="simplelightbox-gallery">
                <a
                  href="https://taskify.taskhub.company/storage/images/sms_gateway_1.png"
                  target="_blank"
                >
                  <img
                    src="https://taskify.taskhub.company/storage/images/sms_gateway_1.png"
                    className="w-100"
                  />
                </a>
              </div>
              <div className="simplelightbox-gallery">
                <a
                  href="https://taskify.taskhub.company/storage/images/sms_gateway_2.png"
                  target="_blank"
                >
                  <img
                    src="https://taskify.taskhub.company/storage/images/sms_gateway_2.png"
                    className="w-100"
                  />
                </a>
              </div>
              <li className="my-4">
                <b>
                  Make sure you entered valid data as per instructions
                  before proceed
                </b>
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="whatsapp_instuction_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              WhatsApp Configuration
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <ul>
              <li className="mb-2">
                You can find your <b>Account SID</b> and <b>Auth Token</b>{" "}
                on the Twilio Console dashboard page.
              </li>
              <li className="mb-2">
                <b>From Number:</b> To get a test <b>From Number</b>, log
                in to your Twilio Console and go to{" "}
                <b>
                  Messaging &gt; Try it out &gt; Send a WhatsApp message
                </b>{" "}
                and follow the instructions. If you want to use{" "}
                <b>your own number</b> as the <b>From Number</b>, go to{" "}
                <b>Messaging &gt; Senders &gt; WhatsApp senders</b> and
                follow the instructions.
              </li>
              <li className="mb-2">
                <b>
                  Feel free to reach out to us if you encounter any
                  difficulties.
                </b>
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="permission_instuction_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Permission Settings Instructions
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <ul>
              <li className="mb-2">
                <b>All Data Access:</b> If this option is selected, users
                or clients assigned to this role will have unrestricted
                access to all data, without any specific restrictions or
                limitations.
              </li>
              <li className="mb-2">
                <b>Allocated Data Access:</b> If this option is selected,
                users or clients assigned to this role will have
                restricted access to data based on specific assignments
                and restrictions.
              </li>
              <li className="mb-2">
                <b>Create Permission:</b> This determines whether users or
                clients assigned to this role can create new records. For
                example, if the create permission is enabled for projects,
                users or clients in this role will be able to create new
                projects; otherwise, they won’t have this ability.
              </li>
              <li className="mb-2">
                <b>Manage Permission:</b> This determines whether users or
                clients assigned to this role can access and interact with
                specific modules. For instance, if the manage permission
                is enabled for projects, users or clients in this role
                will be able to view projects however create, edit, or
                delete depending on the specific permissions granted. If
                the manage permission is disabled for projects, users or
                clients in this role won’t be able to view or interact
                with projects in any way.
              </li>
              <li className="mb-2">
                <b>Edit Permission:</b> This determines whether users or
                clients assigned to this role can edit current records.
                For example, if the edit permission is enabled for
                projects, users or clients in this role will be able to
                edit current projects; otherwise, they won’t have this
                ability.
              </li>
              <li>
                <b>Delete Permission:</b> This determines whether users or
                clients assigned to this role can delete current records.
                For example, if the delete permission is enabled for
                projects, users or clients in this role will be able to
                delete current projects; otherwise, they won’t have this
                ability.
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="confirmUpdateStatusModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Do You Want to Update the Status?</p>
            <textarea
              className="form-control"
              id="statusNote"
              placeholder="Optional Note"
              defaultValue={""}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="declineUpdateStatus"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmUpdateStatus"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="confirmUpdatePriorityModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel2">
              Confirm!
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Do You Want to Update the Priority?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="declineUpdatePriority"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="confirmUpdatePriority"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="createWorkspaceModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Workspace</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form
            action="https://taskify.taskhub.company/workspaces/store"
            className="form-submit-event"
            method="POST"
          >
            <input type="hidden" name="dnr" />
            <div className="modal-body">
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title <span className="asterisk">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Please Enter Title"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="form-label" htmlFor="user_ids[]">
                    Select Users
                  </label>
                  <div className="input-group">
                    <select
                      className="form-control js-example-basic-multiple"
                      name="user_ids[]"
                      multiple="multiple"
                      data-placeholder="Type to Search"
                    >
                      <option value={7} selected="">
                        Admin Infinitie
                      </option>
                      <option value={76}>Memeber2 Infinitie</option>
                      <option value={77}>Member Infinitie</option>
                      <option value={79}>dummy one</option>
                      <option value={80}>ABC PQR</option>
                      <option value={81}>Elara Bishop</option>
                      <option value={82}>Orion Caldwell</option>
                      <option value={96}>Zenith Hayes</option>
                      <option value={103}>Fig manager</option>
                      <option value={104}>Prachi Patil</option>
                      <option value={105}>xxx xxx</option>
                      <option value={107}>Houssam Test</option>
                      <option value={108}>KEMAL OZ</option>
                      <option value={109}>бабораб gfhf</option>
                      <option value={110}>da ad</option>
                      <option value={111}>asdf asd</option>
                      <option value={112}>Pera Peric</option>
                      <option value={113}>Issam Sardar</option>
                      <option value={114}>Issam Sardar</option>
                      <option value={115}>fgbfgfgfgfgffg Solanki</option>
                      <option value={116}>Puspendu Patra</option>
                      <option value={117}>sdafas weareawfasd</option>
                      <option value={118}>Mahmoud Basheer</option>
                      <option value={119}>Uzzal Admin</option>
                      <option value={120}>Uzzal User</option>
                      <option value={121}>yesq nouy</option>
                      <option value={122}>Charlton White</option>
                      <option value={123}>test test 2</option>
                      <option value={124}>Test test</option>
                      <option value={125}>Oluseun Temiye</option>
                      <option value={126}>Oluseun Temiye</option>
                      <option value={127}>JAMES1 BELLO</option>
                      <option value={130}>HAKAN YOK</option>
                      <option value={131}>rabbil hasan</option>
                      <option value={132}>babu Khan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="form-label" htmlFor="client_ids[]">
                    Select Clients
                  </label>
                  <div className="input-group">
                    <select
                      className="form-control js-example-basic-multiple"
                      name="client_ids[]"
                      multiple="multiple"
                      data-placeholder="Type to Search"
                    >
                      <option value={66}>client Two</option>
                      <option value={78}>Client One</option>
                      <option value={79}>saifullah muhamad</option>
                      <option value={80}>Nithin Viswanathan</option>
                      <option value={81}>Kellan Ashford</option>
                      <option value={82}>wdwdw wdwddw</option>
                      <option value={83}>wdwdwasacs wdwdwasacs</option>
                      <option value={85}>Tatiana Pogrebetskaya</option>
                      <option value={86}>Johnathan Doe</option>
                      <option value={87}>Shiva Prasad</option>
                      <option value={88}>Dhananjay User</option>
                      <option value={89}>rehtr drghf</option>
                      <option value={90}>Sanjay Soni</option>
                      <option value={91}>Diego Mau</option>
                      <option value={92}>Dejan cl Gest</option>
                      <option value={93}>hgfh hfh</option>
                      <option value={94}>Md Aynal Haque</option>
                      <option value={95}>test vpn</option>
                      <option value={96}>Blaine Kane</option>
                      <option value={97}>GAF CLIENT CLIENT</option>
                      <option value={98}>test test</option>
                      <option value={99}>Mahmoud Galal</option>
                      <option value={100}>Micle Lion</option>
                      <option value={101}>CLIENT AADDED</option>
                      <option value={102}>sd dd</option>
                      <option value={103}>Kola ross</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label"
                      htmlFor="primaryWorkspace"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="primaryWorkspace"
                        id="primaryWorkspace"
                      />
                      Primary Workspace?
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="alert alert-primary alert-dismissible"
                role="alert"
              >
                You Will Be Workspace Participant Automatically{" "}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                id="submit_btn"
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="editWorkspaceModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Workspace</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form
            action="https://taskify.taskhub.company/workspaces/update"
            className="form-submit-event"
            method="POST"
          >
            <input type="hidden" name="id" id="workspace_id" />
            <input type="hidden" name="dnr" />
            <div className="modal-body">
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title <span className="asterisk">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    id="workspace_title"
                    placeholder="Please Enter Title"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="form-label" htmlFor="user_ids[]">
                    Select Users
                  </label>
                  <div className="input-group">
                    <select
                      className="form-control js-example-basic-multiple"
                      name="user_ids[]"
                      multiple="multiple"
                      data-placeholder="Type to Search"
                    >
                      <option value={7} selected="">
                        Admin Infinitie
                      </option>
                      <option value={76}>Memeber2 Infinitie</option>
                      <option value={77}>Member Infinitie</option>
                      <option value={79}>dummy one</option>
                      <option value={80}>ABC PQR</option>
                      <option value={81}>Elara Bishop</option>
                      <option value={82}>Orion Caldwell</option>
                      <option value={96}>Zenith Hayes</option>
                      <option value={103}>Fig manager</option>
                      <option value={104}>Prachi Patil</option>
                      <option value={105}>xxx xxx</option>
                      <option value={107}>Houssam Test</option>
                      <option value={108}>KEMAL OZ</option>
                      <option value={109}>бабораб gfhf</option>
                      <option value={110}>da ad</option>
                      <option value={111}>asdf asd</option>
                      <option value={112}>Pera Peric</option>
                      <option value={113}>Issam Sardar</option>
                      <option value={114}>Issam Sardar</option>
                      <option value={115}>fgbfgfgfgfgffg Solanki</option>
                      <option value={116}>Puspendu Patra</option>
                      <option value={117}>sdafas weareawfasd</option>
                      <option value={118}>Mahmoud Basheer</option>
                      <option value={119}>Uzzal Admin</option>
                      <option value={120}>Uzzal User</option>
                      <option value={121}>yesq nouy</option>
                      <option value={122}>Charlton White</option>
                      <option value={123}>test test 2</option>
                      <option value={124}>Test test</option>
                      <option value={125}>Oluseun Temiye</option>
                      <option value={126}>Oluseun Temiye</option>
                      <option value={127}>JAMES1 BELLO</option>
                      <option value={130}>HAKAN YOK</option>
                      <option value={131}>rabbil hasan</option>
                      <option value={132}>babu Khan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="form-label" htmlFor="client_ids[]">
                    Select Clients
                  </label>
                  <div className="input-group">
                    <select
                      className="form-control js-example-basic-multiple"
                      name="client_ids[]"
                      multiple="multiple"
                      data-placeholder="Type to Search"
                    >
                      <option value={66}>client Two</option>
                      <option value={78}>Client One</option>
                      <option value={79}>saifullah muhamad</option>
                      <option value={80}>Nithin Viswanathan</option>
                      <option value={81}>Kellan Ashford</option>
                      <option value={82}>wdwdw wdwddw</option>
                      <option value={83}>wdwdwasacs wdwdwasacs</option>
                      <option value={85}>Tatiana Pogrebetskaya</option>
                      <option value={86}>Johnathan Doe</option>
                      <option value={87}>Shiva Prasad</option>
                      <option value={88}>Dhananjay User</option>
                      <option value={89}>rehtr drghf</option>
                      <option value={90}>Sanjay Soni</option>
                      <option value={91}>Diego Mau</option>
                      <option value={92}>Dejan cl Gest</option>
                      <option value={93}>hgfh hfh</option>
                      <option value={94}>Md Aynal Haque</option>
                      <option value={95}>test vpn</option>
                      <option value={96}>Blaine Kane</option>
                      <option value={97}>GAF CLIENT CLIENT</option>
                      <option value={98}>test test</option>
                      <option value={99}>Mahmoud Galal</option>
                      <option value={100}>Micle Lion</option>
                      <option value={101}>CLIENT AADDED</option>
                      <option value={102}>sd dd</option>
                      <option value={103}>Kola ross</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label"
                      htmlFor="updatePrimaryWorkspace"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="primaryWorkspace"
                        id="updatePrimaryWorkspace"
                      />
                      Primary Workspace?
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                id="submit_btn"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile
