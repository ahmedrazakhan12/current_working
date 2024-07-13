import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
const Manage = () => {
  const navigate = useNavigate();
  const [data ,setData]= useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/project/getAllProject')
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteProject = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5000/project/deleteProject/${id}`)
        .then((res) => {
          console.log(res.data);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          window.location.reload(); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  };

  return (
    <>
    <Navbar />
    <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
              <a href="home">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="projects">
                Projects
              </a>
            </li>
            <li className="breadcrumb-item active">
              Favorite
            </li>
          </ol>
        </nav>
      </div>
      <div>

      </div>
      <div>
        <a href="projects/list/favorite">
          
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-3 mb-3">
        <select
          aria-label="Default select example"
          className="form-select"
          id="status_filter"
        >
          <option value="">
            Filter by Status
          </option>
          <option value="0">
            Default
          </option>
          <option value="1">
            Started
          </option>
          <option value="2">
            On Going
          </option>
          <option value="59">
            In Review
          </option>
        </select>
      </div>
      <div className="col-md-3 mb-3">
        <select
          aria-label="Default select example"
          className="form-select"
          id="sort"
        >
          <option value="">
            Sort By
          </option>
          <option value="newest">
            Newest
          </option>
          <option value="oldest">
            Oldest
          </option>
          <option value="recently-updated">
            Most Recently Updated
          </option>
          <option value="earliest-updated">
            Least Recently Updated
          </option>
        </select>
      </div>
      <div className="col-md-5 mb-3">
      <select
          aria-label="Default select example"
          className="form-select w-100"
          id="status_filter"
        >
          <option value="">
            Filter by Tags
          </option>
          <option value="0">
            Default
          </option>
          <option value="1">
            Started
          </option>
          <option value="2">
            On Going
          </option>
          <option value="59">
            In Review
          </option>
        </select>
      </div>
      <div className="col-md-1 d-flex w-10 h-100 mt-1">
      <button
            className="btn btn-sm nd btn-primary me-2"
            style={{marginLeft:'-15px' }}
            data-bs-original-title="Filter"
            data-bs-placement="left"
            data-bs-toggle="tooltip"
            id="tags_filter"
            type="button"
            onClick={() =>navigate('/addProject')}
          >
            <i className="bx bx-plus" />
          </button>
          <button
            className="btn btn-sm btn-primary "
            data-bs-original-title="List View"
            data-bs-placement="left"
            data-bs-toggle="tooltip"
            type="button"
          >
            <i className="bx bx-list-ul" />
          </button>
      
        
      </div>
    </div>
    <div className="mt-4 d-flex row">
      {data.map((item ,index)=>{
        return(
          <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                <Link
                className='text-capitalize'
                >
                  <strong>
                    {item.projectName}
                  </strong>
                </Link>
              </h4>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i
                      className="bx bx-cog"
                      id="settings-icon"
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <Link
                      to={`/editProject/${item.id}`}
                      className="edit-project"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        Update
                      </li>
                    </Link>
                    <span
                      className="delete"
                    >
                      <li className="dropdown-item cursor-pointer" onClick={() => deleteProject(item.id)}>
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        Delete
                      </li>
                    </span>
                    <a
                      className="duplicate"
                      data-id="419"
                      data-reload="true"
                      data-title="CAM KABİN TEMMUZ"
                      data-type="projects"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-copy text-warning" />
                        Duplicate
                      </li>
                    </a>
                  </ul>
                </div>
                <a
                  className="quick-view"
                  data-id="419"
                  data-type="project"
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bx bx-info-circle text-info"
                    data-bs-original-title="Quick View"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                  />
                </a>
                <a
                  className="mx-2"
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bxs-star favorite-icon text-warning"
                    data-bs-original-title="Click to Remove from Favorite"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                    data-favorite="1"
                    data-id="419"
                  />
                </a>
                <a
                  href="chat?type=project&id=419"
                  target="_blank"
                >
                  <i
                    className="bx bx-message-rounded-dots text-danger"
                    data-bs-original-title="Discussion"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                  />
                </a>
              </div>
            </div>
            <div className="my-2">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    <div
                      className="form-select form-select-sm select-bg-label-info"
                      // data-original-color-class="select-bg-label-info"
                      style={{textAlign:'center' , border:'none'}}
                    >
                      {item.status}
                     
                      {/* <option
                        className="badge bg-label-primary"
                        value="1"
                      >
                        Started
                      </option>
                      <option
                        className="badge bg-label-info"
                        selected
                        value="2"
                      >
                        On Going
                      </option>
                      <option
                        className="badge bg-label-warning"
                        value="59"
                      >
                        In Review
                      </option> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <p className='mt-2'>{item.projectDescription}</p>
                </div>
                {/* <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="prioritySelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-secondary"
                      data-id="419"
                      data-original-color-class="select-bg-label-secondary"
                      data-original-priority-id=""
                      id="prioritySelect"
                    >
                      <option
                        className="badge bg-label-secondary"
                        value="0"
                      >
                        Default
                      </option>
                    </select>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="my-4 d-flex justify-content-between">
              <span>
                <i className="bx bx-task text-primary" />
                {' '}
                <b>
                  2
                </b>
                {' '}Tasks
              </span>
              <a href="projects/tasks/draggable/419">
                <button
                  className="btn btn-sm rounded-pill btn-outline-primary"
                  type="button"
                >
                  Tasks
                </button>
              </a>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <p className="card-text">
                  Users:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Admin Infinitie"
                  >
                    <a
                      href="/users/profile/7"
                      target="_blank"
                    >
                      <img
                        alt="Admin Infinitie"
                        className="rounded-circle"
                        src="storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="HAKAN YOK"
                  >
                    <a
                      href="/users/profile/130"
                      target="_blank"
                    >
                      <img
                        alt="HAKAN YOK"
                        className="rounded-circle"
                        src="storage/photos/no-image.jpg"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="419"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
              <div className="col-md-6">
                <p className="card-text">
                  Clients:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <span className="badge bg-primary">
                    Not Assigned
                  </span>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="419"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 text-start">
                <i className="bx bx-calendar text-success" />
                Starts At : June 30, 2024
              </div>
              <div className="col-md-6 text-end">
                <i className="bx bx-calendar text-danger" />
                Ends At : June 30, 2024
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
        )
      })}
     
    </div>
   
  </div>
    </>
  )
}

export default Manage
