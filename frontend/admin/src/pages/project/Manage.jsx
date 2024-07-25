import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from "react-bootstrap";

const Manage = () => { const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dbStatus , setDbStatus] = useState([]);
  const [dbPriority, setDbPriority] = useState([]);

  const itemsPerPage = 10;

  const fetchData = () => {
    axios.get('http://localhost:5000/project/getAllProject')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
    .then((res) => {
      setDbStatus(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);



  

const fetchPriorities = async () => {
  try {
    const statusRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
    setDbPriority(statusRes.data);
  } catch (err) {
    console.log(err);
  }
};


useEffect(() => {
  fetchPriorities();
}, []);
  const deleteProject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/project/deleteProject/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            setData(prevData => prevData.filter(item => item.id !== id));
            fetchData();
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const filteredData = statusFilter
    ? data.filter(item => item.status === statusFilter)
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  
  const handleChange = async (event , id) => {
    // alert(id)
  
    const selectedValue = event.target.value;
    const selectedItem = dbStatus.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : '';
  
    // setSelectedPreview(selectedPreview);
  
    try {
      await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
        status: selectedValue,
      });
      // Re-fetch task data after update
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  


  const handlePriorityChange = async (event , id) => {
    const selectedValue = event.target.value;
    const selectedItem = dbPriority.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : '';
  
    // setSelectedPreview(selectedPreview);
  
    try {
      await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
        priority: selectedValue,
      });
      // Re-fetch task data after update
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  return (
    <>
     
    <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
                <Link to={'/'}>
              Dashboard
              </Link>
             
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
        onChange={handleStatusChange}
      >
        <option value="">All</option>
        <option value="started">Started</option>
        <option value="ongoing">On Going</option>
        <option value="inreview">In Review</option>
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
      {currentItems.map((item ,index)=>{
        return(
          <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
            {item.tags.map((tagName)=>{
              return(
                <span className={`badge ${tagName.tagColor} mt-1 mx-1`}>
                {tagName.tagName}
            </span>

              )
        })}
             </div>
            
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                <Link
                className='text-capitalize'
                to={`/projectInformation/${item.project.id}`}
                >
                  <strong>
                    {item.project.projectName}
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
                      to={`/editProject/${item.project.id}`}
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
                      <li className="dropdown-item cursor-pointer" onClick={() => deleteProject(item.project.id)}>
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        Delete
                      </li>
                    </span>
                 
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
            {/* <span class="badge bg-label-warning me-1"> Creator</span> */}
            <span class="badge bg-label-primary me-1 "> ₹ {item.project.budget}</span>

            <div className="my-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                {/* <h1>{item.users.name}</h1>// */}

                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    {/* <div
                      className={"form-select form-select-sm select-bg-label-info text-capitalize"}
                      // data-original-color-class="select-bg-label-info"
                      style={{textAlign:'center' , border:'none' }}
                    >
                      {item.project.status}
                     
                     
                    </div> */}

                      <select
                      className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="status"
                      onChange={(event) => handleChange(event, item.project?.id)}
                    >

                    <option className={`bg-label-${item.status[0]?.preview}`} >
                    {item.status[0]?.status}
                      </option>
                      {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
                      <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
                        {dbItem.status}
                      </option>
                    ))}
                   
                  </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="prioritySelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                  <select
                      className={`form-select form-select-sm select-bg-label-${item.priority[0]?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="priority"
                      onChange={(event) => handlePriorityChange(event, item.project?.id)}
                    >

                    <option className={`bg-label-${item.priority[0]?.preview}`} >
                    {item.priority[0]?.status}
                      </option>
                      {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
                      <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
                        {dbItem.status}
                      </option>
                    ))}
                   
                  </select>
                  </div>
                  {/* <div className="input-group">
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
                  </div> */}
                </div>
              </div>
            </div>
            <div className="my-4 d-flex justify-content-between">
              <span>
                <i className="bx bx-task text-primary" />
                {' '}
                <b>
                 {item.tasks && item.tasks.length}
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
                {item.users && item.users.length > 0 ? (
                      item.users.map((user, index) => (
                <>
                  <li
                    className="avatar avatar-sm pull-up"
                    title={user.name}
                  >
                    <Link
                      to={`/Userview/${user.id}`}
                      target="_blank"
                    >
                      
                        <img className="rounded-circle" style={{objectFit:"cover"}} key={index} src={user.pfpImage} alt={user.name} />
                     
                    </Link>
                  </li>
                  </>

                  ))
                ) : (
                  ''
                )}

                {item.users && item.users.length === 0 && (
                  <span className="badge bg-primary">Not Assigned</span>
                )}
                </ul>
                <p />
               
              </div>
              <div className="col-md-6">
              <p className="card-text">
                  Creator:
                </p>

                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                {item.creator && item.creator.length > 0 && 
  <li
    className="avatar avatar-sm pull-up"
    title={item.creator[0]?.name}
    key={index}
  >
    <Link
      to={`/Userview/${item.creator[0]?.id}`}
      target="_blank"
    >
      <img
        className="rounded-circle"
        style={{ objectFit: "cover" }}
        src={item.creator[0]?.pfpImage}
        alt={item.creator[0]?.name}
      />
    </Link>
  </li>
}
                </ul>
                <p />

              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 text-start">
                <i className="bx bx-calendar text-success" />
                Starts At :  {formatDate(item.project.startAt)}
              </div>
              <div className="col-md-6 text-end">
                <i className="bx bx-calendar text-danger" />
                Ends At : {formatDate(item.project.endAt)}
              </div>
            </div>
          </div>


        </div>
      </div>
      
        )
      })}
     

     {currentItems.length === 0 &&
      <div className="row">
        <div className="col-5">
        <div className="card mb-3" >
        <div className="card-body">
        
          <div className="d-flex flex-column align-items-center text-center">
            <h4 className="card-title">
              <a
                href="projects/information/419"
                target="_blank"
              >
                
                <strong>
                  No Projects Found
                </strong>
              </a>
            </h4>

            <img src="./assets/images/no_media.jpg" alt="" />
           
          </div>
        
        
        </div>
      </div>
        </div>
      </div> 
      }

     {/* Pagination */}
     <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        </Pagination>
    </div>
   
  </div>
    </>
  )
}

export default Manage
