import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Viewstatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('primary');
  
  const [status , setStatus] = useState('')
  const [preview , setPreview] = useState('')
  
  
  const navigate = useNavigate();
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleColorChange = (event) => {
};

const handleChange = (e) => {
      setSelectedColor(e.target.value);
    const { name, value } = e.target;
   if(name === "status"){
    setStatus(value);}
    else if(name === "preview"){
      setPreview(value)}
  };
  const handleAddSubmit = () => {
    axios.post(`http://localhost:5000/projectStatus/addStatus`, {
        status,
        preview
    })
    .then((res) => {
        console.log(res.data);
        setShowModal(false)
    })
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              style={{ borderRadius: "6px" }}
              className="card-body p-3 bg-white mt-4 shadow blur border-radius-lg"
            >
              <div className="table-responsive p-2">
                <div
                  className="pt-2 pb-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="searchbar" style={{ width: "20%" }}>
                    <div className="searchbar-wrapper">
                      <div className="searchbar-left">
                        <div className="search-icon-wrapper">
                          <span className="search-icon searchbar-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="searchbar-center">
                        <div className="searchbar-input-spacer"></div>

                        <input
                          type="text"
                          className="searchbar-input"
                          maxLength="2048"
                          name="q"
                          autoCapitalize="off"
                          autoComplete="off"
                          title="Search"
                          role="combobox"
                          placeholder="Search user"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm nd btn-primary me-2"
                    style={{ marginLeft: "-15px", height: "33px" }}
                    type="button"
                    onClick={handleShow}
                  >
                    <i className="bx bx-plus" />
                  </button>
                </div>

                <table id="table" className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{}} data-field="id">
                        <div className="th-inner sortable both">ID</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{}} data-field="profile">
                        <div className="th-inner">TITLE</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="role">
                        <div className="th-inner">PREVIEW</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="phone">
                        <div className="th-inner sortable both desc">
                          ALLOWED ROLES
                        </div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="actions">
                        <div className="th-inner">Actions</div>
                        <div className="fht-cell" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style={{ textAlign: "center" }}>
                        <i className="bx bx-edit mx-2" />
                        <button
                          title="Delete"
                          type="button"
                          style={{
                            border: "none",
                            background: "none",
                            margin: "0",
                          }}
                          // onClick={() => handleUserDelete(item.id)}
                        >
                          <i className="bx bx-trash text-danger" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} style={{ top: "20%" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h5>Add Status</h5>
          </Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleAddSubmit}>
        <Modal.Body>
            <label
          htmlFor="nameBasic"className=" mb-1 ml-1"
        >
     Status <span className="asterisk ">*</span>
        </label>
              <input
                type="text"
                placeholder="Add Status"
                className="form-control"
                name="status"
                value={status}
                required
                onChange={handleChange}
              />
               <div className="col mb-3">
        <label
          htmlFor="nameBasic"className="mt-3 mb-1 ml-1"
        >
          Color <span className="asterisk ">*</span>
        </label>
    
        <select
        className={`form-select  select-bg-label-${selectedColor}`}
        name="preview"
        onChange={handleChange}
        value={selectedColor}
        required
        >
            <option  className="badge bg-label-primary" value="primary">
            Primary
          </option>
          <option className="badge bg-label-secondary" value="secondary">
            Secondary
          </option>
          <option className="badge bg-label-success" value="success">
            Success
          </option>
          <option className="badge bg-label-danger" value="danger">
            Danger
          </option>
          <option className="badge bg-label-warning" value="warning">
            Warning
          </option>
          <option className="badge bg-label-info" value="info">
            Info
          </option>
          <option className="badge bg-label-dark" value="dark">
            Dark
          </option>
        </select>
      </div>    
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-3">
            <button type="submit" className="btn btn-warning  float-end m-0">
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary me-2 float-end m-0"
              onClick={() => navigate(-1)}
              >
              Cancel
            </button>
          </div>
        </Modal.Footer>
                </form>
      </Modal>
    </div>
  );
};

export default Viewstatus;
