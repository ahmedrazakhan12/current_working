import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
const Priority = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [selectedColor, setSelectedColor] = useState('primary');
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [modalID, setModalID] = useState(null);
  const [singleData, setSingleData] = useState({ status: '', preview: 'primary' });
  const [error , setError] = useState(null)

  useEffect(() => {
    fetchStatusList();
  }, []);

  const fetchStatusList = () => {
    axios.get(`http://localhost:5000/projectPriority/getAllPriorities`)
      .then((res) => {
        setStatusList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status" || name === "preview") {
      setSingleData({ ...singleData, [name]: value });
    }
  };

  const handleShow = () => {
    setSingleData({ status: '', preview: 'primary' });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow1 = (id) => {
    setModalID(id);
    axios.get(`http://localhost:5000/projectPriority/getPriority/${id}`)
      .then((res) => {
        setSingleData(res.data);
        setShowModal1(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose1 = () => {
    setShowModal1(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/projectPriority/addPriority`, {
        status: singleData.status,
        preview: singleData.preview
      })
      .then((res) => {
        console.log(res.data);
        setShowModal(false);
        fetchStatusList(); // Update status list after successful addition
      })
     .catch((err)=>{
       setError(err.response.data.message)
     })
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/projectPriority/editPriority/${modalID}`, {
        status: singleData.status,
        preview: singleData.preview
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          title: "Updated!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal'
          }
        });
        setShowModal1(false);
        fetchStatusList(); // Update status list after successful edit
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this status!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/projectPriority/deletePriority/${id}`)
          .then(() => {
            fetchStatusList(); // Update status list after successful deletion
            Swal.fire({
              position: "top-end",
              title: "Deleted!",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'custom-swal'
              }
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error', 'Failed to delete status.', 'error');
          });
      }
    });
  };
  
  console.log("singleDataPreview" , singleData);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card-body p-3 bg-white mt-4 shadow blur border-radius-lg">
              <div className="table-responsive p-2">
                <div className="pt-0 pb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                  {/* <div className="searchbar" style={{ width: "20%" }}>
                    <div className="searchbar-wrapper">
                      <div className="searchbar-left">
                        <div className="search-icon-wrapper">
                          <span className="search-icon searchbar-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="searchbar-center">
                        <div className="searchbar-input-spacer"></div>
                        <input type="text" className="searchbar-input" maxLength="2048" name="q" autoCapitalize="off" autoComplete="off" title="Search" role="combobox" placeholder="Search user" />
                      </div>
                    </div>
                  </div> */}
                  <div><h5>Priorty</h5></div>
                  <button className="btn btn-sm nd btn-primary me-2" style={{ marginLeft: "-15px", height: "33px" }} type="button" onClick={handleShow}>
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
                        <div className="th-inner sortable both desc">ALLOWED ROLES</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="actions">
                        <div className="th-inner">Actions</div>
                        <div className="fht-cell" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="text-left text-capitalize">{item.status}</td>
                        <td className="text-center" style={{ fontSize: '13px' }}>
                          <span className={`bg-${item.preview} text-white px-3 pt-1 pb-1 text-capitalize`} style={{ borderRadius: '6px' }}>{item.status}</span>
                        </td>
                        <td className="text-center">-</td>
                        <td style={{ textAlign: "center" }}>
                          <i className="bx bx-edit mx-2 cursor-pointer" onClick={() => handleShow1(item.id)} />
                          <button title="Delete" type="button" style={{ border: "none", background: "none", margin: "0" }} onClick={() => handleDelete(item.id)}>
                            <i className="bx bx-trash text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
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
            <h5>Add Status</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleAddSubmit}>
          <Modal.Body>
            <label className="mb-1 ml-1">
              Status <span className="asterisk">*</span>
            </label>
            <input type="text" placeholder="Add Status" className="form-control" name="status" value={singleData.status} onChange={handleChange} required />
            <div className="col mb-3">
              <label className="mt-3 mb-1 ml-1">
                Color <span className="asterisk">*</span>
              </label>
              <select className={`form-select  select-bg-label-${singleData.preview ? singleData.preview : "primary"}`} name="preview" value={singleData.preview ? singleData.preview : "primary" } onChange={handleChange} required>
                <option className="badge bg-label-primary" value="primary">Primary</option>
                <option className="badge bg-label-secondary" value="secondary">Secondary</option>
                <option className="badge bg-label-success" value="success">Success</option>
                <option className="badge bg-label-danger" value="danger">Danger</option>
                <option className="badge bg-label-warning" value="warning">Warning</option>
                <option className="badge bg-label-info" value="info">Info</option>
                <option className="badge bg-label-dark" value="dark">Dark</option>
              </select>

              {error &&  
               <div className=" col-12 mb-0">
                <div className="alert alert-warning mt-4">
                 
                  <p className="mb-0 text-center">
                  {error}
                  </p>
                </div>
              </div>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-3">

              <button type="submit" className="btn btn-warning float-end m-0">Add</button>
              <button type="button" className="btn btn-secondary me-2 float-end m-0" onClick={handleClose}>Cancel</button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showModal1} onHide={handleClose1} style={{ top: "20%" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Edit Status</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <label className="mb-1 ml-1">
              Status <span className="asterisk">*</span>
            </label>
            <input type="text" placeholder="Edit Status" className="form-control" name="status" value={singleData.status} onChange={handleChange} required />
            <div className="col mb-3">
              <label className="mt-3 mb-1 ml-1">
                Color <span className="asterisk">*</span>
              </label>
              <select className={`form-select  select-bg-label-${singleData.preview}`} name="preview" value={singleData.preview} onChange={handleChange} required>
                <option className="badge bg-label-primary" value="primary">Primary</option>
                <option className="badge bg-label-secondary" value="secondary">Secondary</option>
                <option className="badge bg-label-success" value="success">Success</option>
                <option className="badge bg-label-danger" value="danger">Danger</option>
                <option className="badge bg-label-warning" value="warning">Warning</option>
                <option className="badge bg-label-info" value="info">Info</option>
                <option className="badge bg-label-dark" value="dark">Dark</option>
              </select>
              {error &&  
               <div className=" col-12 mb-0">
                <div className="alert alert-warning mt-4">
                 
                  <p className="mb-0 text-center">
                  {error}
                  </p>
                </div>
              </div>}
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-3">
              <button type="submit" className="btn btn-warning float-end m-0">Edit</button>
              <button type="button" className="btn btn-secondary me-2 float-end m-0" onClick={handleClose1}>Cancel</button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Priority;
