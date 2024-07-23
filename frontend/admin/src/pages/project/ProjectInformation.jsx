import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import TaskById from '../tasks/TaskById';
const ProjectInformation = () => {
    const {id} = useParams();    
    const [data , setData] = useState([]);
    const [dbStatus , setDbStatus] = useState([]);
    const navigate = useNavigate();
    const [dbPriority, setDbPriority] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskId, setTaskId] = useState(null);
  
   
    useEffect(() => {
        axios.get(`http://localhost:5000/project/getProject/${id}`)
          .then((res) => {
              // console.log(res.data);
              setData(res.data);
          })
          .catch((err) => {
              console.log(err);
          });
      }, []);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };


      const [tableData , setTableData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10); // Adjust items per page as needed
    
      const fetchData = () => {
        axios
          .get(`http://localhost:5000/task/getAllTasks/${id}` , {
            headers: { Authorization: ` ${id}` }
          })
          .then((res) => {
            setTableData(res.data);
            console.log("././././././././",res.data);
          })
          .catch((err) => {
            console.log("Error fetching providers:", err);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  // Pagination handling



// For project


const handleProjectChange = async (event , id) => {
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



const handleProjectPriorityChange = async (event , id) => {
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









  const handleShow = (id) => {
    setTaskId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTaskId(null);
    fetchData();

  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Next page handler
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Calculate current items to display based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
    .then((res) => {
      setDbStatus(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  console.log("currentItems: ", currentItems);
  const groupedItems = dbStatus.reduce((acc, status) => {
    acc[status.status] = currentItems.filter(item => item?.status[0] && item.status[0]?.status === status?.status);
    return acc;
  }, {});
  
const handleDelete = (id) => {
  axios
    .delete(`http://localhost:5000/task/deleteTask/${id}`)
    .then((res) => {
      // console.log(res.data);
      fetchData();
    })
    .catch((err) => {
      console.log(err);
    });
};


  const handleChange = async (event , id) => {
  
  const selectedValue = event.target.value;
  const selectedItem = dbStatus.find((item) => item.id === selectedValue);
  const selectedPreview = selectedItem ? selectedItem.preview : '';

  // setSelectedPreview(selectedPreview);

  try {
    await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
      status: selectedValue,
    });
    // Re-fetch task data after update
    fetchData();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};


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

const handlePriorityChange = async (event , id) => {
  const selectedValue = event.target.value;
  const selectedItem = dbPriority.find((item) => item.id === selectedValue);
  const selectedPreview = selectedItem ? selectedItem.preview : '';

  // setSelectedPreview(selectedPreview);

  try {
    await axios.put(`http://localhost:5000/task/editPriority/${id}`, {
      priority: selectedValue,
    });
    // Re-fetch task data after update
    fetchData();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

  return (
    <div className="container-fluid mt-3">
    {data.map((item , index)=>{
        return(
            <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                <button
            className="btn btn-sm nd btn-primary m-0"
            style={{float:'right' }}
            type="button"
            onClick={() =>navigate(`/addTask/${id}`)}
          >
            <i className="bx bx-plus" />
          </button>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <span className="badge bg-info">Learning and Education</span>
                      </div>
                      <h2 className="fw-bold">
                        {item.project.projectName}
                        <a href="javascript:void(0);" className="mx-2">
                          <i
                            className="bx bx-star favorite-icon text-warning"
                            data-id={434}
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="Click to Mark as Favorite"
                            data-favorite={0}
                          />
                        </a>
                        <a
                          href="https://taskify.taskhub.company/chat?type=project&id=434"
                          target="_blank"
                        >
                          <i
                            className="bx bx-message-rounded-dots text-danger"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="Discussion"
                          />
                        </a>
                      </h2>
                      <div className="row">
                        <div className="col-md-6 mt-3 mb-3">
                          <label className="form-label" htmlFor="start_date">
                            Users
                          </label>
                          <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center flex-wrap">
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
                  <span className="badge bg-primary">Not Assigned</span>
                )}
                            <Link
                              className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                              to={`/editProject/${item.project.id}`}
                            >
                              <span className="bx bx-edit" />
                            </Link>
                          </ul>
                        </div>
                        <div className="col-md-6  mt-3 mb-3">
                          {/* <label className="form-label" htmlFor="end_date">
                            Clients
                          </label>
                          <p>
                            <span className="badge bg-primary">Not Assigned</span>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                              data-id={434}
                            >
                              <span className="bx bx-edit" />
                            </a>
                          </p> */}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Status</label>
                         
                          {/* <div
                      className={"form-select form-select-sm select-bg-label-info text-capitalize"}
                      // data-original-color-class="select-bg-label-info"
                      style={{textAlign:'center' , border:'none' }}
                    >
                      {item.project.status}
                     
                     
                    </div> */}
                    <select
                      className={`form-select form-select-sm select-bg-label-${item.status?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="status"
                      onChange={(event) => handleProjectChange(event, item.project?.id)}
                    >

                    <option className={`bg-label-${item.status?.preview}`} >
                    {item.status?.status}
                      </option>
                      {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
                      <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
                        {dbItem.status}
                      </option>
                    ))}
                   
                  </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="prioritySelect" className="form-label">
                            Priority
                          </label>
                          <div className="input-group">
                    <div
                      className={"form-select form-select-sm select-bg-label-secondary text-capitalize"}
                      // data-original-color-class="select-bg-label-info"
                      style={{textAlign:'center' , border:'none' }}
                    >
                      {item.project.priority}
                     
                     
                    </div>
                  </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-4 col-xl-4 order-0 mb-4">
                      <div className="card overflow-hidden mb-3">
                        <div className="card-header pt-3 pb-1">
                          <div className="card-title mb-0">
                            <h5 className="m-0 me-2">Task Statistics</h5>
                          </div>
                         
                        </div>
                        <div className="card-body" id="task-statistics">
                          <div className="mb-3">
                          </div>
                          <ul className="p-0 m-0">
                            <li className="d-flex mb-3 pb-1">
                              <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-danger">
                                  <i className="bx bx-task" />
                                </span>
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=0">
                                    <h6 className="mb-0">Default</h6>
                                  </a>
                                </div>
                                <div className="user-progress">
                                  <div className="status-count">
                                    <small className="fw-semibold">1</small>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex mb-3 pb-1">
                              <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-primary">
                                  <i className="bx bx-task" />
                                </span>
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=1">
                                    <h6 className="mb-0">Started</h6>
                                  </a>
                                </div>
                                <div className="user-progress">
                                  <div className="status-count">
                                    <small className="fw-semibold">0</small>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex mb-3 pb-1">
                              <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-info">
                                  <i className="bx bx-task" />
                                </span>
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=2">
                                    <h6 className="mb-0">On Going</h6>
                                  </a>
                                </div>
                                <div className="user-progress">
                                  <div className="status-count">
                                    <small className="fw-semibold">0</small>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex mb-3 pb-1">
                              <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-warning">
                                  <i className="bx bx-task" />
                                </span>
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=59">
                                    <h6 className="mb-0">In Review</h6>
                                  </a>
                                </div>
                                <div className="user-progress">
                                  <div className="status-count">
                                    <small className="fw-semibold">0</small>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <li className="d-flex ">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-primary">
                                <i className="bx bx-menu" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h5 className="mb-0">Total</h5>
                              </div>
                              <div className="user-progress">
                                <div className="status-count">
                                  <h5 className="mb-0">1</h5>
                                </div>
                              </div>
                            </div>
                          </li>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      {/* "Starts at" card */}
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <i className="menu-icon tf-iconsbx bx bx-calendar-check bx-md text-success" />
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Starts At</span>
                          <h3 className="card-title mb-2">  {formatDate(item.project.startAt)}</h3>
                        </div>
                      </div>
                      <div className="card mt-4">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <i className="menu-icon tf-iconsbx bx bx-time bx-md text-primary" />
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Duration</span>
                          <h3 className="card-title mb-2">-</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      {/* "Ends at" card */}
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <i className="menu-icon tf-icons bx bx-calendar-x bx-md text-danger" />
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Ends At</span>
                          <h3 className="card-title mb-2">{formatDate(item.project.endAt)}</h3>
                        </div>
                      </div>
                      <div className="card mt-4">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <i className="menu-icon tf-icons bx bx-purchase-tag-alt bx-md text-warning" />
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Budget</span>
                          <h3 className="card-title mb-2">${item.project.budget}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title">
                            <h5>Description</h5>
                          </div>
                          {item.project.projectDescription && (

                          <div dangerouslySetInnerHTML={{ __html: item.project.projectDescription  }} />
                          )}
                          {/* <p>{item.project.projectDescription}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" id="media_type_id" defaultValue={434} />
            {/* Tabs */}
            <div className="nav-align-top mt-2">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-top-tasks"
                    aria-controls="navs-top-tasks"
                  >
                    <i className="menu-icon tf-icons bx bx-task text-primary" />
                    Tasks{" "}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link "
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-top-milestones"
                    aria-controls="navs-top-milestones"
                  >
                    <i className="menu-icon tf-icons bx bx-list-check text-warning" />
                    Milestones{" "}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link "
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-top-media"
                    aria-controls="navs-top-media"
                  >
                    <i className="menu-icon tf-icons bx bx-image-alt text-success" />
                    Media{" "}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-top-activity-log"
                    aria-controls="navs-top-activity-log"
                  >
                    <i className="menu-icon tf-icons bx bx-line-chart text-info" />
                    Activity Log{" "}
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="navs-top-tasks"
                  role="tabpanel"
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div />
                    <button
            className="btn btn-sm nd btn-primary m-0"
            style={{float:'right' }}
            type="button"
            onClick={() =>navigate(`/addTask/${id}`)}
          >
                          <i className="bx bx-plus" />
                        </button>
                  </div>
                  {/* tasks */}
                  <div className="mt-2">
                    {/* <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="task_start_date_between"
                            name="task_start_date_between"
                            className="form-control"
                            placeholder="Start Date Between"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="task_end_date_between"
                            name="task_end_date_between"
                            className="form-control"
                            placeholder="End Date Between"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-control js-example-basic-multiple"
                          id="tasks_user_filter"
                          name="user_ids[]"
                          multiple="multiple"
                          data-placeholder="Select Users"
                        >
                          <option value={7}>Admin Infinitie</option>
                          <option value={76}>Memeber2 Infinitie</option>
                          <option value={77}>Member Infinitie</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-control js-example-basic-multiple"
                          id="tasks_client_filter"
                          name="client_ids[]"
                          multiple="multiple"
                          data-placeholder="Select Clients"
                        >
                          &gt;
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-control"
                          id="task_status_filter"
                          name="status_ids[]"
                          multiple="multiple"
                          data-placeholder="Select Statuses"
                        >
                          <option value={0}>Default</option>
                          <option value={1}>Started</option>
                          <option value={2}>On Going</option>
                          <option value={59}>In Review</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-control"
                          id="task_priority_filter"
                          name="priority_ids[]"
                          multiple="multiple"
                          data-placeholder="Select Priorities"
                        >
                          <option value={0}>Default</option>
                        </select>
                      </div>
                    </div> */}
                    {/* <input
                      type="hidden"
                      name="task_start_date_from"
                      id="task_start_date_from"
                    />
                    <input
                      type="hidden"
                      name="task_start_date_to"
                      id="task_start_date_to"
                    />
                    <input
                      type="hidden"
                      name="task_end_date_from"
                      id="task_end_date_from"
                    />
                    <input type="hidden" name="task_end_date_to" id="task_end_date_to" /> */}
                    {/* <div className="table-responsive text-nowrap">
                      <input type="hidden" id="data_type" defaultValue="tasks" />
                      <input type="hidden" id="data_table" defaultValue="task_table" />
                      <input type="hidden" id="save_column_visibility" />
                      <table
                        id="task_table"
                        data-toggle="table"
                        data-loading-template="loadingTemplate"
                        data-url="https://taskify.taskhub.company/tasks/list/project_434"
                        data-icons-prefix="bx"
                        data-icons="icons"
                        data-show-refresh="true"
                        data-total-field="total"
                        data-trim-on-search="false"
                        data-data-field="rows"
                        data-page-list="[5, 10, 20, 50, 100, 200]"
                        data-search="true"
                        data-side-pagination="server"
                        data-show-columns="true"
                        data-pagination="true"
                        data-sort-name="id"
                        data-sort-order="desc"
                        data-mobile-responsive="true"
                        data-query-params="queryParamsTasks"
                      >
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">
                              ID
                            </th>
                            <th
                              data-field="title"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Task
                            </th>
                            <th
                              data-field="project_id"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Project
                            </th>
                            <th data-field="users" data-visible="true">
                              Users
                            </th>
                            <th data-field="clients" data-visible="true">
                              Clients
                            </th>
                            <th
                              data-field="status_id"
                              className="status-column"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Status
                            </th>
                            <th
                              data-field="priority_id"
                              className="priority-column"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Priority
                            </th>
                            <th
                              data-field="start_date"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Starts At
                            </th>
                            <th
                              data-field="end_date"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Ends At
                            </th>
                            <th
                              data-field="created_at"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Created At
                            </th>
                            <th
                              data-field="updated_at"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Updated At
                            </th>
                            <th data-field="actions" data-visible="true">
                              Actions
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div> */}



          <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              style={{ borderRadius: "6px" }}
              className="card-body px-1  mt-0  border-radius-lg"
            >

                          
            <div
              className="d-flex flex-row"
              style={{
                overflowX: 'auto', // Use 'auto' instead of 'scroll' for better UX
                overflowY: 'hidden',
                whiteSpace: 'nowrap' // Prevent items from wrapping to the next line
              }}
            >
              <div className="row flex-row" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              {Object.keys(groupedItems).map((status, index) => (
     <div key={index} className="col" style={{ display: 'inline-block' }}>
    <h4 className="fw-bold mx-4 my-2 text-capitalize text-center">
      {status}
    </h4>
    {groupedItems[status].length > 0 ? (
      groupedItems[status].map((item, idx) => (
        <div key={idx} className="my-4" style={{ backgroundColor: 'none', maxWidth: '300px', minWidth: '300px' }}>
        <div
        className="row m-2 d-flex flex-column"
        data-status="0"
        id="default"
        style={{
          height: '100%'
        }}
      >
        <div
          className="card m-2 p-0 shadow"
          data-task-id={item.task.id}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="card-title">
                <Link
                onClick={() => handleShow(item.task.id)}
                >
                  <strong>
                    {item.task.taskName}
                  </strong>
                </Link>
              </h6>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i className="bx bx-cog" />
                  </a>
                  <ul className="dropdown-menu">
                    <Link
                      className="edit-task"
                      to={`/editTask/${item.task.id}`}
                      >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        {' '}Update
                      </li>
                    </Link>
                    <a
                      className="delete"
                      data-id="93"
                      data-reload="true"
                      data-type="tasks"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item" onClick={() => handleDelete(item.task.id)}>
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        {' '}Delete
                      </li>
                    </a>
                   
                  </ul>
                </div>
                <a
                  className="quick-view"
                  data-id="93"
                  data-type="task"
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
                  href="https://taskify.taskhub.company/chat?type=task&id=93"
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
            {data.map((item,index)=>{
              return(
                <div className="card-subtitle text-muted mb-3">
            {item.project.projectName}
            </div>
              )
            })}
            <div className="row mt-2">
              <div className="col-md-12">
                <p className="card-text mb-1">
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
                  <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <span className="badge bg-primary">
                    Not Assigned
                  </span>
                </ul>
                )}
                </ul>
                
                <p />
              </div>
              
            </div>
            <div className="d-flex flex-column">
              <div>
             
                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    {/* <div
                      className={`form-select-sm select-bg-label-${item.status[0]?.preview} text-capitalize w-100 `}
                      // data-original-color-class="select-bg-label-info"
                      style={{textAlign:'center' , border:'none' }}
                    >
                      {item.status[0]?.status}
                     
                     
                    </div> */}
                     <select
                      className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="status"
                      onChange={(event) => handleChange(event, item.task.id)}
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
              <div>
                  <label
                    className="form-label mt-4"
                    htmlFor="statusSelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                          <select
                      className={`form-select form-select-sm select-bg-label-${item.priority[0]?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="priority"
                      onChange={(event) => handlePriorityChange(event, item.task.id)}
                    >
                      <option className={`bg-label-${item.priority[0]?.preview}`} value={item.priority[0]?.id}>
                       {item.priority[0]?.status}
                      </option>
                      {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
                        <option className={`bg-label-${dbItem.preview}`} key={dbIndex} value={dbItem.id}>
                          {dbItem.status}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
              <div className="mt-3">
              <small className="text-muted">
              <b>Starts At:</b>   {formatDate(item.task.startAt)}
            </small><br />
            <small className="text-muted">
              <b>Ends At:</b>   {formatDate(item.task.endAt)}
            </small>
          </div>
            </div>
            
        
            
          </div>
        </div>
      </div>
         </div>
      ))
    ) : (
      <div  className="my-4" style={{ backgroundColor: 'none', maxWidth: '300px', minWidth: '300px' }}>
      <div
      className="card mt-2 shadow"
      data-task-id="93"
    >
      <div className="card-body p-2 overflow-hidden" style={{minHeight:'375px' }}>
        <h4 className='text-center' style={{marginTop:'5%'}}>No Tasks</h4>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'20%'}}>
        <img src="/assets/images/empty-task.png" alt=""  style={{width:'150px' , height:'150px' , objectFit:"contain" }}/>
        </div>
      </div>
    </div>
    </div>
    )}
  </div>
))}

              </div>
            </div>

                    
              {/* Pagination */}
              {/* <Pagination className="mt-3 justify-content-center ">
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

                {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
                  (number) => {
                    // Limit pagination items to maximum of 10
                    if (
                      number < currentPage + 5 &&
                      number >= currentPage - 4 &&
                      number + 1 <= Math.ceil(data.length / itemsPerPage)
                    ) {
                      return (
                        <Pagination.Item
                          key={number + 1}
                          active={number + 1 === currentPage}
                          onClick={() => paginate(number + 1)}
                        >
                          <span
                            className={
                              number === currentPage - 1
                                ? " text-white text-xs font-weight-bold"
                                : "text-dark text-xs font-weight-bold"
                            }
                          >
                            {number + 1}
                          </span>
                        </Pagination.Item>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
                <Pagination.Next
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination> */}
            </div>
          </div>
      </div>
                  </div>
                </div>
                <div className="tab-pane fade " id="navs-top-milestones" role="tabpanel">
                  
                  <div className="col-12">
                    
                    <div className="row mt-4">
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="start_date_between"
                            name="start_date_between"
                            className="form-control"
                            placeholder="Start Date Between"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="end_date_between"
                            name="end_date_between"
                            className="form-control"
                            placeholder="End Date Between"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-select"
                          id="status_filter"
                          aria-label="Default select example"
                        >
                          <option value="">Select Status</option>
                          <option value="incomplete">Incomplete</option>
                          <option value="complete">Complete</option>
                        </select>
                      </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                      <input type="hidden" name="start_date_from" id="start_date_from" />
                      <input type="hidden" name="start_date_to" id="start_date_to" />
                      <input type="hidden" name="end_date_from" id="end_date_from" />
                      <input type="hidden" name="end_date_to" id="end_date_to" />
                      <input type="hidden" id="data_type" defaultValue="milestone" />
                      <input
                        type="hidden"
                        id="data_table"
                        defaultValue="project_milestones_table"
                      />
                      <input type="hidden" id="save_column_visibility" />
                      <table
                        id="project_milestones_table"
                        data-toggle="table"
                        data-loading-template="loadingTemplate"
                        data-url="https://taskify.taskhub.company/projects/get-milestones/434"
                        data-icons-prefix="bx"
                        data-icons="icons"
                        data-show-refresh="true"
                        data-total-field="total"
                        data-trim-on-search="false"
                        data-data-field="rows"
                        data-page-list="[5, 10, 20, 50, 100, 200]"
                        data-search="true"
                        data-side-pagination="server"
                        data-show-columns="true"
                        data-pagination="true"
                        data-sort-name="id"
                        data-sort-order="desc"
                        data-mobile-responsive="true"
                        data-query-params="queryParamsProjectMilestones"
                      >
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">
                              ID
                            </th>
                            <th
                              data-field="title"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Title
                            </th>
                            <th
                              data-field="start_date"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Start date
                            </th>
                            <th
                              data-field="end_date"
                              data-visible="true"
                              data-sortable="true"
                            >
                              End date
                            </th>
                            <th
                              data-field="cost"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Cost
                            </th>
                            <th
                              data-field="progress"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Progress
                            </th>
                            <th
                              data-field="status"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Status
                            </th>
                            <th
                              data-field="description"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Description
                            </th>
                            <th
                              data-field="created_by"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Created By
                            </th>
                            <th
                              data-field="created_at"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Created At
                            </th>
                            <th
                              data-field="updated_at"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Updated At
                            </th>
                            <th data-field="actions" data-visible="true">
                              Actions
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade " id="navs-top-media" role="tabpanel">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div />
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#add_media_modal"
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          data-bs-original-title="Add Media"
                        >
                          <i className="bx bx-plus" />
                        </button>
                      </a>
                    </div>
                    <div className="table-responsive text-nowrap">
                      <input type="hidden" id="data_type" defaultValue="project-media" />
                      <input
                        type="hidden"
                        id="data_table"
                        defaultValue="project_media_table"
                      />
                      <input type="hidden" id="save_column_visibility" />
                      <table
                        id="project_media_table"
                        data-toggle="table"
                        data-loading-template="loadingTemplate"
                        data-url="https://taskify.taskhub.company/projects/get-media/434"
                        data-icons-prefix="bx"
                        data-icons="icons"
                        data-show-refresh="true"
                        data-total-field="total"
                        data-trim-on-search="false"
                        data-data-field="rows"
                        data-page-list="[5, 10, 20, 50, 100, 200]"
                        data-search="true"
                        data-side-pagination="server"
                        data-show-columns="true"
                        data-pagination="true"
                        data-sort-name="id"
                        data-sort-order="desc"
                        data-mobile-responsive="true"
                        data-query-params="queryParamsProjectMedia"
                      >
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">
                              ID
                            </th>
                            <th
                              data-field="file"
                              data-visible="true"
                              data-sortable="true"
                            >
                              File
                            </th>
                            <th
                              data-field="file_name"
                              data-sortable="true"
                              data-visible="false"
                            >
                              File Name
                            </th>
                            <th
                              data-field="file_size"
                              data-visible="true"
                              data-sortable="true"
                            >
                              File Size
                            </th>
                            <th
                              data-field="created_at"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Created At
                            </th>
                            <th
                              data-field="updated_at"
                              data-sortable="true"
                              data-visible="false"
                            >
                              Updated At
                            </th>
                            <th
                              data-field="actions"
                              data-visible="true"
                              data-sortable="false"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="navs-top-activity-log" role="tabpanel">
                  <div className="col-12">
                    <div className="row mt-4">
                      <div className="mb-3 col-md-4">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="activity_log_between_date"
                            className="form-control"
                            placeholder="Date Between"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-select"
                          id="user_filter"
                          aria-label="Default select example"
                        >
                          <option value="">Select User</option>
                          <option value={7}>Admin Infinitie</option>
                          <option value={76}>Memeber2 Infinitie</option>
                          <option value={77}>Member Infinitie</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-select"
                          id="client_filter"
                          aria-label="Default select example"
                        >
                          <option value="">Select Client</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select
                          className="form-select"
                          id="activity_filter"
                          aria-label="Default select example"
                        >
                          <option value="">Select Activity</option>
                          <option value="created">Created</option>
                          <option value="updated">Updated</option>
                          <option value="duplicated">Duplicated</option>
                          <option value="uploaded">Uploaded</option>
                          <option value="deleted">Deleted</option>
                        </select>
                      </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                      <input type="hidden" id="activity_log_between_date_from" />
                      <input type="hidden" id="activity_log_between_date_to" />
                      <input type="hidden" id="data_type" defaultValue="activity-log" />
                      <input
                        type="hidden"
                        id="data_table"
                        defaultValue="activity_log_table"
                      />
                      <input type="hidden" id="type_id" defaultValue={434} />
                      <input type="hidden" id="save_column_visibility" />
                      <table
                        id="activity_log_table"
                        data-toggle="table"
                        data-loading-template="loadingTemplate"
                        data-url="https://taskify.taskhub.company/activity-log/list"
                        data-icons-prefix="bx"
                        data-icons="icons"
                        data-show-refresh="true"
                        data-total-field="total"
                        data-trim-on-search="false"
                        data-data-field="rows"
                        data-page-list="[5, 10, 20, 50, 100, 200]"
                        data-search="true"
                        data-side-pagination="server"
                        data-show-columns="true"
                        data-pagination="true"
                        data-sort-name="id"
                        data-sort-order="desc"
                        data-mobile-responsive="true"
                        data-query-params="queryParams"
                      >
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">
                              ID
                            </th>
                            <th
                              data-field="actor_id"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Actor ID
                            </th>
                            <th
                              data-field="actor_name"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Actor Name
                            </th>
                            <th
                              data-field="actor_type"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Actor Type
                            </th>
                            <th
                              data-field="type_id"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Type ID
                            </th>
                            <th
                              data-field="parent_type_id"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Parent Type ID
                            </th>
                            <th
                              data-field="activity"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Activity
                            </th>
                            <th
                              data-field="type"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Type
                            </th>
                            <th
                              data-field="parent_type"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Parent Type
                            </th>
                            <th
                              data-field="type_title"
                              data-visible="true"
                              data-sortable="true"
                            >
                              Type Title
                            </th>
                            <th
                              data-field="parent_type_title"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Parent Type Title
                            </th>
                            <th
                              data-field="message"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Message
                            </th>
                            <th
                              data-field="created_at"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Created At
                            </th>
                            <th
                              data-field="updated_at"
                              data-visible="false"
                              data-sortable="true"
                            >
                              Updated At
                            </th>
                            <th data-field="actions" data-visible="true">
                              Actions
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="create_milestone_modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <form
                  className="modal-content form-submit-event"
                  action="https://taskify.taskhub.company/projects/store-milestone"
                  method="POST"
                >
                  <input type="hidden" name="project_id" defaultValue={434} />
                  <input type="hidden" name="dnr" />
                  <input
                    type="hidden"
                    name="table"
                    defaultValue="project_milestones_table"
                  />
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel1">
                      Create Milestone
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
                      <div className="col-12 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Title <span className="asterisk">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="Please Enter Title"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Starts At
                        </label>
                        <input
                          type="text"
                          id="start_date"
                          name="start_date"
                          className="form-control"
                          placeholder="Please Select"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Ends At
                        </label>
                        <input
                          type="text"
                          id="end_date"
                          name="end_date"
                          className="form-control"
                          placeholder="Please Select"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Status <span className="asterisk">*</span>
                        </label>
                        <select className="form-select" name="status">
                          <option value="incomplete">Incomplete</option>
                          <option value="complete">Complete</option>
                        </select>
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Cost <span className="asterisk">*</span>
                        </label>
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">₹</span>
                          <input
                            type="text"
                            name="cost"
                            className="form-control"
                            placeholder="Please Enter Cost"
                          />
                        </div>
                      </div>
                    </div>
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control description"
                      name="description"
                      placeholder="Please Enter Description"
                      defaultValue={""}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close{" "}
                    </button>
                    <button type="submit" id="submit_btn" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="modal fade"
              id="edit_milestone_modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <form
                  className="modal-content form-submit-event"
                  action="https://taskify.taskhub.company/projects/update-milestone"
                  method="POST"
                >
                  <input type="hidden" name="id" id="milestone_id" />
                  <input type="hidden" name="project_id" defaultValue={434} />
                  <input type="hidden" name="dnr" />
                  <input
                    type="hidden"
                    name="table"
                    defaultValue="project_milestones_table"
                  />
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel1">
                      Update Milestone
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
                      <div className="col-12 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Title <span className="asterisk">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="milestone_title"
                          className="form-control"
                          placeholder="Please Enter Title"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Starts At
                        </label>
                        <input
                          type="text"
                          id="update_milestone_start_date"
                          name="start_date"
                          className="form-control"
                          placeholder="Please Select"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Ends At
                        </label>
                        <input
                          type="text"
                          id="update_milestone_end_date"
                          name="end_date"
                          className="form-control"
                          placeholder="Please Select"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Status <span className="asterisk">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="milestone_status"
                          name="status"
                        >
                          <option value="incomplete">Incomplete</option>
                          <option value="complete">Complete</option>
                        </select>
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Cost <span className="asterisk">*</span>
                        </label>
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">₹</span>
                          <input
                            type="text"
                            name="cost"
                            id="milestone_cost"
                            className="form-control"
                            placeholder="Please Enter Cost"
                          />
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="nameBasic" className="form-label">
                          Progress
                        </label>
                        <input
                          type="range"
                          name="progress"
                          id="milestone_progress"
                          className="form-range"
                        />
                        <h6 className="mt-2 milestone-progress" />
                      </div>
                    </div>
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control description"
                      name="description"
                      id="milestone_description"
                      placeholder="Please Enter Description"
                      defaultValue={""}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close{" "}
                    </button>
                    <button type="submit" id="submit_btn" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="modal fade"
              id="add_media_modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <form
                  className="modal-content form-horizontal"
                  id="media-upload"
                  action="https://taskify.taskhub.company/projects/upload-media"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="2uKBUejJQbKQJW1oIFz9CySQxtVosCZ0oi1DIwSC"
                    autoComplete="off"
                  />{" "}
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel1">
                      Add Media
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="alert alert-primary alert-dismissible" role="alert">
                      Storage Type Set as Local Storage,{" "}
                      <a
                        href="https://taskify.taskhub.company/settings/media-storage"
                        target="_blank"
                      >
                        Click Here to Change
                      </a>
                    </div>
                    <div
                      className="dropzone dz-clickable"
                      id="media-upload-dropzone"
                    ></div>
                    <div className="form-group mt-4 text-center">
                      <button className="btn btn-primary" id="upload_media_btn">
                        Upload
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="form-group" id="error_box"></div>
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
                </form>
              </div>
            </div>
            
          </div>
        )
    })}

      <TaskById show={showModal} handleClose={handleClose} taskId={taskId}  />
    </div>
  )
}

export default ProjectInformation







// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Pagination } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// import TaskById from '../tasks/TaskById';
// const ProjectInformation = () => {
//     const {id} = useParams();    
//     const [data , setData] = useState([]);
//     const [dbStatus , setDbStatus] = useState([]);
//     const navigate = useNavigate();


//     const [showModal, setShowModal] = useState(false);
//     const [taskId, setTaskId] = useState(null);
  
   
//     useEffect(() => {
//         axios.get(`http://localhost:5000/project/getProject/${id}`)
//           .then((res) => {
//               // console.log(res.data);
//               setData(res.data);
//           })
//           .catch((err) => {
//               console.log(err);
//           });
//       }, []);

//       const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//       };


//       const [tableData , setTableData] = useState([]);
//       const [currentPage, setCurrentPage] = useState(1);
//       const [itemsPerPage] = useState(10); // Adjust items per page as needed
    
//       const fetchData = () => {
//         axios
//           .get(`http://localhost:5000/task/getAllTasks/${id}` , {
//             headers: { Authorization: ` ${id}` }
//           })
//           .then((res) => {
//             setTableData(res.data);
//             console.log("././././././././",res.data);
//           })
//           .catch((err) => {
//             console.log("Error fetching providers:", err);
//           });
//       };
    
//       useEffect(() => {
//         fetchData();
//       }, []);

//   // Pagination handling


//   const handleShow = (id) => {
//     setTaskId(id);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setTaskId(null);
//     fetchData();

//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => prev - 1);
//   };

//   // Next page handler
//   const nextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil(tableData.length / itemsPerPage);

//   // Calculate current items to display based on currentPage and itemsPerPage
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


//   useEffect(() => {
//     axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
//     .then((res) => {
//       setDbStatus(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);


//   console.log("currentItems: ", currentItems);
//   const groupedItems = dbStatus.reduce((acc, status) => {
//     acc[status.status] = currentItems.filter(item => item?.status[0] && item.status[0]?.status === status?.status);
//     return acc;
//   }, {});
  
// const handleDelete = (id) => {
//   axios
//     .delete(`http://localhost:5000/task/deleteTask/${id}`)
//     .then((res) => {
//       // console.log(res.data);
//       fetchData();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };


//   return (
//     <div className="container-fluid mt-3">
//     {data.map((item , index)=>{
//         return(
//             <div className="row">
//             <div className="col-md-12">
//               <div className="card mb-4">
//                 <div className="card-body">
//                 <button
//             className="btn btn-sm nd btn-primary m-0"
//             style={{float:'right' }}
//             type="button"
//             onClick={() =>navigate(`/addTask/${id}`)}
//           >
//             <i className="bx bx-plus" />
//           </button>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <span className="badge bg-info">Learning and Education</span>
//                       </div>
//                       <h2 className="fw-bold">
//                         {item.project.projectName}
//                         <a href="javascript:void(0);" className="mx-2">
//                           <i
//                             className="bx bx-star favorite-icon text-warning"
//                             data-id={434}
//                             data-bs-toggle="tooltip"
//                             data-bs-placement="right"
//                             data-bs-original-title="Click to Mark as Favorite"
//                             data-favorite={0}
//                           />
//                         </a>
//                         <a
//                           href="https://taskify.taskhub.company/chat?type=project&id=434"
//                           target="_blank"
//                         >
//                           <i
//                             className="bx bx-message-rounded-dots text-danger"
//                             data-bs-toggle="tooltip"
//                             data-bs-placement="right"
//                             data-bs-original-title="Discussion"
//                           />
//                         </a>
//                       </h2>
//                       <div className="row">
//                         <div className="col-md-6 mt-3 mb-3">
//                           <label className="form-label" htmlFor="start_date">
//                             Users
//                           </label>
//                           <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center flex-wrap">
//                           {item.users && item.users.length > 0 ? (
//                       item.users.map((user, index) => (
//                 <>
//                   <li
//                     className="avatar avatar-sm pull-up"
//                     title={user.name}
//                   >
//                     <Link
//                       to={`/Userview/${user.id}`}
//                       target="_blank"
//                     >
                      
//                         <img className="rounded-circle" style={{objectFit:"cover"}} key={index} src={user.pfpImage} alt={user.name} />
                     
//                     </Link>
//                   </li>
//                   </>

//                   ))
//                 ) : (
//                   <span className="badge bg-primary">Not Assigned</span>
//                 )}
//                             <Link
//                               className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
//                               to={`/editProject/${item.project.id}`}
//                             >
//                               <span className="bx bx-edit" />
//                             </Link>
//                           </ul>
//                         </div>
//                         <div className="col-md-6  mt-3 mb-3">
//                           {/* <label className="form-label" htmlFor="end_date">
//                             Clients
//                           </label>
//                           <p>
//                             <span className="badge bg-primary">Not Assigned</span>
//                             <a
//                               href="javascript:void(0)"
//                               className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
//                               data-id={434}
//                             >
//                               <span className="bx bx-edit" />
//                             </a>
//                           </p> */}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">Status</label>
                         
//                           <div
//                       className={"form-select form-select-sm select-bg-label-info text-capitalize"}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.project.status}
                     
                     
//                     </div>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="prioritySelect" className="form-label">
//                             Priority
//                           </label>
//                           <div className="input-group">
//                     <div
//                       className={"form-select form-select-sm select-bg-label-secondary text-capitalize"}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.project.priority}
                     
                     
//                     </div>
//                   </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <hr className="my-0" />
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-12 col-lg-4 col-xl-4 order-0 mb-4">
//                       <div className="card overflow-hidden mb-3">
//                         <div className="card-header pt-3 pb-1">
//                           <div className="card-title mb-0">
//                             <h5 className="m-0 me-2">Task Statistics</h5>
//                           </div>
                         
//                         </div>
//                         <div className="card-body" id="task-statistics">
//                           <div className="mb-3">
//                           </div>
//                           <ul className="p-0 m-0">
//                             <li className="d-flex mb-3 pb-1">
//                               <div className="avatar flex-shrink-0 me-3">
//                                 <span className="avatar-initial rounded bg-label-danger">
//                                   <i className="bx bx-task" />
//                                 </span>
//                               </div>
//                               <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                                 <div className="me-2">
//                                   <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=0">
//                                     <h6 className="mb-0">Default</h6>
//                                   </a>
//                                 </div>
//                                 <div className="user-progress">
//                                   <div className="status-count">
//                                     <small className="fw-semibold">1</small>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                             <li className="d-flex mb-3 pb-1">
//                               <div className="avatar flex-shrink-0 me-3">
//                                 <span className="avatar-initial rounded bg-label-primary">
//                                   <i className="bx bx-task" />
//                                 </span>
//                               </div>
//                               <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                                 <div className="me-2">
//                                   <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=1">
//                                     <h6 className="mb-0">Started</h6>
//                                   </a>
//                                 </div>
//                                 <div className="user-progress">
//                                   <div className="status-count">
//                                     <small className="fw-semibold">0</small>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                             <li className="d-flex mb-3 pb-1">
//                               <div className="avatar flex-shrink-0 me-3">
//                                 <span className="avatar-initial rounded bg-label-info">
//                                   <i className="bx bx-task" />
//                                 </span>
//                               </div>
//                               <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                                 <div className="me-2">
//                                   <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=2">
//                                     <h6 className="mb-0">On Going</h6>
//                                   </a>
//                                 </div>
//                                 <div className="user-progress">
//                                   <div className="status-count">
//                                     <small className="fw-semibold">0</small>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                             <li className="d-flex mb-3 pb-1">
//                               <div className="avatar flex-shrink-0 me-3">
//                                 <span className="avatar-initial rounded bg-label-warning">
//                                   <i className="bx bx-task" />
//                                 </span>
//                               </div>
//                               <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                                 <div className="me-2">
//                                   <a href="https://taskify.taskhub.company/tasks/draggable?project=434&status=59">
//                                     <h6 className="mb-0">In Review</h6>
//                                   </a>
//                                 </div>
//                                 <div className="user-progress">
//                                   <div className="status-count">
//                                     <small className="fw-semibold">0</small>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           </ul>
//                           <li className="d-flex ">
//                             <div className="avatar flex-shrink-0 me-3">
//                               <span className="avatar-initial rounded bg-label-primary">
//                                 <i className="bx bx-menu" />
//                               </span>
//                             </div>
//                             <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                               <div className="me-2">
//                                 <h5 className="mb-0">Total</h5>
//                               </div>
//                               <div className="user-progress">
//                                 <div className="status-count">
//                                   <h5 className="mb-0">1</h5>
//                                 </div>
//                               </div>
//                             </div>
//                           </li>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-12 col-6 mb-4">
//                       {/* "Starts at" card */}
//                       <div className="card">
//                         <div className="card-body">
//                           <div className="card-title d-flex align-items-start justify-content-between">
//                             <div className="avatar flex-shrink-0">
//                               <i className="menu-icon tf-iconsbx bx bx-calendar-check bx-md text-success" />
//                             </div>
//                           </div>
//                           <span className="fw-semibold d-block mb-1">Starts At</span>
//                           <h3 className="card-title mb-2">  {formatDate(item.project.startAt)}</h3>
//                         </div>
//                       </div>
//                       <div className="card mt-4">
//                         <div className="card-body">
//                           <div className="card-title d-flex align-items-start justify-content-between">
//                             <div className="avatar flex-shrink-0">
//                               <i className="menu-icon tf-iconsbx bx bx-time bx-md text-primary" />
//                             </div>
//                           </div>
//                           <span className="fw-semibold d-block mb-1">Duration</span>
//                           <h3 className="card-title mb-2">-</h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-12 col-6 mb-4">
//                       {/* "Ends at" card */}
//                       <div className="card">
//                         <div className="card-body">
//                           <div className="card-title d-flex align-items-start justify-content-between">
//                             <div className="avatar flex-shrink-0">
//                               <i className="menu-icon tf-icons bx bx-calendar-x bx-md text-danger" />
//                             </div>
//                           </div>
//                           <span className="fw-semibold d-block mb-1">Ends At</span>
//                           <h3 className="card-title mb-2">{formatDate(item.project.endAt)}</h3>
//                         </div>
//                       </div>
//                       <div className="card mt-4">
//                         <div className="card-body">
//                           <div className="card-title d-flex align-items-start justify-content-between">
//                             <div className="avatar flex-shrink-0">
//                               <i className="menu-icon tf-icons bx bx-purchase-tag-alt bx-md text-warning" />
//                             </div>
//                           </div>
//                           <span className="fw-semibold d-block mb-1">Budget</span>
//                           <h3 className="card-title mb-2">${item.project.budget}</h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-12 mb-4">
//                       <div className="card">
//                         <div className="card-body">
//                           <div className="card-title">
//                             <h5>Description</h5>
//                           </div>
//                           {item.project.projectDescription && (

//                           <div dangerouslySetInnerHTML={{ __html: item.project.projectDescription  }} />
//                           )}
//                           {/* <p>{item.project.projectDescription}</p> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <input type="hidden" id="media_type_id" defaultValue={434} />
//             {/* Tabs */}
//             <div className="nav-align-top mt-2">
//               <ul className="nav nav-tabs" role="tablist">
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     className="nav-link active"
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-top-tasks"
//                     aria-controls="navs-top-tasks"
//                   >
//                     <i className="menu-icon tf-icons bx bx-task text-primary" />
//                     Tasks{" "}
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     className="nav-link "
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-top-milestones"
//                     aria-controls="navs-top-milestones"
//                   >
//                     <i className="menu-icon tf-icons bx bx-list-check text-warning" />
//                     Milestones{" "}
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     className="nav-link "
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-top-media"
//                     aria-controls="navs-top-media"
//                   >
//                     <i className="menu-icon tf-icons bx bx-image-alt text-success" />
//                     Media{" "}
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     className="nav-link"
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-top-activity-log"
//                     aria-controls="navs-top-activity-log"
//                   >
//                     <i className="menu-icon tf-icons bx bx-line-chart text-info" />
//                     Activity Log{" "}
//                   </button>
//                 </li>
//               </ul>
//               <div className="tab-content">
//                 <div
//                   className="tab-pane fade active show"
//                   id="navs-top-tasks"
//                   role="tabpanel"
//                 >
//                   <div className="d-flex justify-content-between align-items-center mb-4">
//                     <div />
//                     <button
//             className="btn btn-sm nd btn-primary m-0"
//             style={{float:'right' }}
//             type="button"
//             onClick={() =>navigate(`/addTask/${id}`)}
//           >
//                           <i className="bx bx-plus" />
//                         </button>
//                   </div>
//                   {/* tasks */}
//                   <div className="mt-2">
//                     {/* <div className="row">
//                       <div className="col-md-4 mb-3">
//                         <div className="input-group input-group-merge">
//                           <input
//                             type="text"
//                             id="task_start_date_between"
//                             name="task_start_date_between"
//                             className="form-control"
//                             placeholder="Start Date Between"
//                             autoComplete="off"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <div className="input-group input-group-merge">
//                           <input
//                             type="text"
//                             id="task_end_date_between"
//                             name="task_end_date_between"
//                             className="form-control"
//                             placeholder="End Date Between"
//                             autoComplete="off"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-control js-example-basic-multiple"
//                           id="tasks_user_filter"
//                           name="user_ids[]"
//                           multiple="multiple"
//                           data-placeholder="Select Users"
//                         >
//                           <option value={7}>Admin Infinitie</option>
//                           <option value={76}>Memeber2 Infinitie</option>
//                           <option value={77}>Member Infinitie</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-control js-example-basic-multiple"
//                           id="tasks_client_filter"
//                           name="client_ids[]"
//                           multiple="multiple"
//                           data-placeholder="Select Clients"
//                         >
//                           &gt;
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-control"
//                           id="task_status_filter"
//                           name="status_ids[]"
//                           multiple="multiple"
//                           data-placeholder="Select Statuses"
//                         >
//                           <option value={0}>Default</option>
//                           <option value={1}>Started</option>
//                           <option value={2}>On Going</option>
//                           <option value={59}>In Review</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-control"
//                           id="task_priority_filter"
//                           name="priority_ids[]"
//                           multiple="multiple"
//                           data-placeholder="Select Priorities"
//                         >
//                           <option value={0}>Default</option>
//                         </select>
//                       </div>
//                     </div> */}
//                     {/* <input
//                       type="hidden"
//                       name="task_start_date_from"
//                       id="task_start_date_from"
//                     />
//                     <input
//                       type="hidden"
//                       name="task_start_date_to"
//                       id="task_start_date_to"
//                     />
//                     <input
//                       type="hidden"
//                       name="task_end_date_from"
//                       id="task_end_date_from"
//                     />
//                     <input type="hidden" name="task_end_date_to" id="task_end_date_to" /> */}
//                     {/* <div className="table-responsive text-nowrap">
//                       <input type="hidden" id="data_type" defaultValue="tasks" />
//                       <input type="hidden" id="data_table" defaultValue="task_table" />
//                       <input type="hidden" id="save_column_visibility" />
//                       <table
//                         id="task_table"
//                         data-toggle="table"
//                         data-loading-template="loadingTemplate"
//                         data-url="https://taskify.taskhub.company/tasks/list/project_434"
//                         data-icons-prefix="bx"
//                         data-icons="icons"
//                         data-show-refresh="true"
//                         data-total-field="total"
//                         data-trim-on-search="false"
//                         data-data-field="rows"
//                         data-page-list="[5, 10, 20, 50, 100, 200]"
//                         data-search="true"
//                         data-side-pagination="server"
//                         data-show-columns="true"
//                         data-pagination="true"
//                         data-sort-name="id"
//                         data-sort-order="desc"
//                         data-mobile-responsive="true"
//                         data-query-params="queryParamsTasks"
//                       >
//                         <thead>
//                           <tr>
//                             <th data-checkbox="true" />
//                             <th data-field="id" data-visible="true" data-sortable="true">
//                               ID
//                             </th>
//                             <th
//                               data-field="title"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Task
//                             </th>
//                             <th
//                               data-field="project_id"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Project
//                             </th>
//                             <th data-field="users" data-visible="true">
//                               Users
//                             </th>
//                             <th data-field="clients" data-visible="true">
//                               Clients
//                             </th>
//                             <th
//                               data-field="status_id"
//                               className="status-column"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Status
//                             </th>
//                             <th
//                               data-field="priority_id"
//                               className="priority-column"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Priority
//                             </th>
//                             <th
//                               data-field="start_date"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Starts At
//                             </th>
//                             <th
//                               data-field="end_date"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Ends At
//                             </th>
//                             <th
//                               data-field="created_at"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Created At
//                             </th>
//                             <th
//                               data-field="updated_at"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Updated At
//                             </th>
//                             <th data-field="actions" data-visible="true">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                       </table>
//                     </div> */}



//           <div className="row">
//           <div className="col-lg-12 col-md-12 col-sm-12 col-12">
//             <div
//               style={{ borderRadius: "6px" }}
//               className="card-body px-1  mt-0  border-radius-lg"
//             >

                          
//             <div
//               className="d-flex flex-row"
//               style={{
//                 overflowX: 'auto', // Use 'auto' instead of 'scroll' for better UX
//                 overflowY: 'hidden',
//                 whiteSpace: 'nowrap' // Prevent items from wrapping to the next line
//               }}
//             >
//               <div className="row flex-row" style={{ display: 'flex', flexWrap: 'nowrap' }}>
//               {Object.keys(groupedItems).map((status, index) => (
//      <div key={index} className="col" style={{ display: 'inline-block' }}>
//     <h4 className="fw-bold mx-4 my-2 text-capitalize text-center">
//       {status}
//     </h4>
//     {groupedItems[status].length > 0 ? (
//       groupedItems[status].map((item, idx) => (
//         <div key={idx} className="my-4" style={{ backgroundColor: 'none', maxWidth: '300px', minWidth: '300px' }}>
//         <div
//         className="row m-2 d-flex flex-column"
//         data-status="0"
//         id="default"
//         style={{
//           height: '100%'
//         }}
//       >
//         <div
//           className="card m-2 p-0 shadow"
//           data-task-id={item.task.id}
//         >
//           <div className="card-body">
//             <div className="d-flex justify-content-between">
//               <h6 className="card-title">
//                 <Link
//                 onClick={() => handleShow(item.task.id)}
//                 >
//                   <strong>
//                     {item.task.taskName}
//                   </strong>
//                 </Link>
//               </h6>
//               <div className="d-flex align-items-center justify-content-center">
//                 <div className="input-group">
//                   <a
//                     aria-expanded="false"
//                     className="mx-2"
//                     data-bs-toggle="dropdown"
//                     href="javascript:void(0);"
//                   >
//                     <i className="bx bx-cog" />
//                   </a>
//                   <ul className="dropdown-menu">
//                     <Link
//                       className="edit-task"
//                       to={`/editTask/${item.task.id}`}
//                       >
//                       <li className="dropdown-item">
//                         <i className="menu-icon tf-icons bx bx-edit text-primary" />
//                         {' '}Update
//                       </li>
//                     </Link>
//                     <a
//                       className="delete"
//                       data-id="93"
//                       data-reload="true"
//                       data-type="tasks"
//                       href="javascript:void(0);"
//                     >
//                       <li className="dropdown-item" onClick={() => handleDelete(item.task.id)}>
//                         <i className="menu-icon tf-icons bx bx-trash text-danger" />
//                         {' '}Delete
//                       </li>
//                     </a>
                   
//                   </ul>
//                 </div>
//                 <a
//                   className="quick-view"
//                   data-id="93"
//                   data-type="task"
//                   href="javascript:void(0);"
//                 >
//                   <i
//                     className="bx bx bx-info-circle text-info"
//                     data-bs-original-title="Quick View"
//                     data-bs-placement="right"
//                     data-bs-toggle="tooltip"
//                   />
//                 </a>
//                 <a
//                   className="mx-2"
//                   href="https://taskify.taskhub.company/chat?type=task&id=93"
//                   target="_blank"
//                 >
//                   <i
//                     className="bx bx-message-rounded-dots text-danger"
//                     data-bs-original-title="Discussion"
//                     data-bs-placement="right"
//                     data-bs-toggle="tooltip"
//                   />
//                 </a>
//               </div>
//             </div>
//             {data.map((item,index)=>{
//               return(
//                 <div className="card-subtitle text-muted mb-3">
//             {item.project.projectName}
//             </div>
//               )
//             })}
//             <div className="row mt-2">
//               <div className="col-md-12">
//                 <p className="card-text mb-1">
//                   Users:
//                 </p>
//                 <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
//                 {item.users && item.users.length > 0 ? (
//                       item.users.map((user, index) => (
//                 <>
//                   <li
//                     className="avatar avatar-sm pull-up"
//                     title={user.name}
//                   >
//                     <Link
//                       to={`/Userview/${user.id}`}
//                       target="_blank"
//                     >
                      
//                         <img className="rounded-circle" style={{objectFit:"cover"}} key={index} src={user.pfpImage} alt={user.name} />
                     
//                     </Link>
//                   </li>
//                   </>

//                   ))
//                 ) : (
//                   <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
//                   <span className="badge bg-primary">
//                     Not Assigned
//                   </span>
//                 </ul>
//                 )}
//                 </ul>
                
//                 <p />
//               </div>
              
//             </div>
//             <div className="d-flex flex-column">
//               <div>
             
//                   <label
//                     className="form-label"
//                     htmlFor="statusSelect"
//                   >
//                     Status
//                   </label>
//                   <div className="input-group">
//                     <div
//                       className={`form-select-sm select-bg-label-${item.status[0]?.preview} text-capitalize w-100 `}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.status[0]?.status}
                     
                     
//                     </div>
//                   </div>
                  
//               </div>
//               <div>
//                   <label
//                     className="form-label mt-4"
//                     htmlFor="statusSelect"
//                   >
//                     Priority
//                   </label>
//                   <div className="input-group">
//                     <div
//                       className={`w-100 form-select-sm select-bg-label-${item.priority[0]?.preview} text-capitalize`}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.priority[0]?.status}

                     
                     
//                     </div>
//                   </div>
//               </div>
//               <div className="mt-3">
//               <small className="text-muted">
//               <b>Starts At:</b>   {formatDate(item.task.startAt)}
//             </small><br />
//             <small className="text-muted">
//               <b>Ends At:</b>   {formatDate(item.task.endAt)}
//             </small>
//           </div>
//             </div>
            
        
            
//           </div>
//         </div>
//       </div>
//          </div>
//       ))
//     ) : (
//       <div  className="my-4" style={{ backgroundColor: 'none', maxWidth: '300px', minWidth: '300px' }}>
//       <div
//       className="card mt-2 shadow"
//       data-task-id="93"
//     >
//       <div className="card-body p-2 overflow-hidden" style={{minHeight:'375px' }}>
//         <h4 className='text-center' style={{marginTop:'5%'}}>No Tasks</h4>
//         <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'20%'}}>
//         <img src="/assets/images/empty-task.png" alt=""  style={{width:'150px' , height:'150px' , objectFit:"contain" }}/>
//         </div>
//       </div>
//     </div>
//     </div>
//     )}
//   </div>
// ))}

//               </div>
//             </div>

                    
//               {/* Pagination */}
//               {/* <Pagination className="mt-3 justify-content-center ">
//                 <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

//                 {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
//                   (number) => {
//                     // Limit pagination items to maximum of 10
//                     if (
//                       number < currentPage + 5 &&
//                       number >= currentPage - 4 &&
//                       number + 1 <= Math.ceil(data.length / itemsPerPage)
//                     ) {
//                       return (
//                         <Pagination.Item
//                           key={number + 1}
//                           active={number + 1 === currentPage}
//                           onClick={() => paginate(number + 1)}
//                         >
//                           <span
//                             className={
//                               number === currentPage - 1
//                                 ? " text-white text-xs font-weight-bold"
//                                 : "text-dark text-xs font-weight-bold"
//                             }
//                           >
//                             {number + 1}
//                           </span>
//                         </Pagination.Item>
//                       );
//                     } else {
//                       return null;
//                     }
//                   }
//                 )}
//                 <Pagination.Next
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                 />
//               </Pagination> */}
//             </div>
//           </div>
//       </div>
//                   </div>
//                 </div>
//                 <div className="tab-pane fade " id="navs-top-milestones" role="tabpanel">
                  
//                   <div className="col-12">
                    
//                     <div className="row mt-4">
//                       <div className="col-md-4 mb-3">
//                         <div className="input-group input-group-merge">
//                           <input
//                             type="text"
//                             id="start_date_between"
//                             name="start_date_between"
//                             className="form-control"
//                             placeholder="Start Date Between"
//                             autoComplete="off"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <div className="input-group input-group-merge">
//                           <input
//                             type="text"
//                             id="end_date_between"
//                             name="end_date_between"
//                             className="form-control"
//                             placeholder="End Date Between"
//                             autoComplete="off"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-select"
//                           id="status_filter"
//                           aria-label="Default select example"
//                         >
//                           <option value="">Select Status</option>
//                           <option value="incomplete">Incomplete</option>
//                           <option value="complete">Complete</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="table-responsive text-nowrap">
//                       <input type="hidden" name="start_date_from" id="start_date_from" />
//                       <input type="hidden" name="start_date_to" id="start_date_to" />
//                       <input type="hidden" name="end_date_from" id="end_date_from" />
//                       <input type="hidden" name="end_date_to" id="end_date_to" />
//                       <input type="hidden" id="data_type" defaultValue="milestone" />
//                       <input
//                         type="hidden"
//                         id="data_table"
//                         defaultValue="project_milestones_table"
//                       />
//                       <input type="hidden" id="save_column_visibility" />
//                       <table
//                         id="project_milestones_table"
//                         data-toggle="table"
//                         data-loading-template="loadingTemplate"
//                         data-url="https://taskify.taskhub.company/projects/get-milestones/434"
//                         data-icons-prefix="bx"
//                         data-icons="icons"
//                         data-show-refresh="true"
//                         data-total-field="total"
//                         data-trim-on-search="false"
//                         data-data-field="rows"
//                         data-page-list="[5, 10, 20, 50, 100, 200]"
//                         data-search="true"
//                         data-side-pagination="server"
//                         data-show-columns="true"
//                         data-pagination="true"
//                         data-sort-name="id"
//                         data-sort-order="desc"
//                         data-mobile-responsive="true"
//                         data-query-params="queryParamsProjectMilestones"
//                       >
//                         <thead>
//                           <tr>
//                             <th data-checkbox="true" />
//                             <th data-field="id" data-visible="true" data-sortable="true">
//                               ID
//                             </th>
//                             <th
//                               data-field="title"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Title
//                             </th>
//                             <th
//                               data-field="start_date"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Start date
//                             </th>
//                             <th
//                               data-field="end_date"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               End date
//                             </th>
//                             <th
//                               data-field="cost"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Cost
//                             </th>
//                             <th
//                               data-field="progress"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Progress
//                             </th>
//                             <th
//                               data-field="status"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Status
//                             </th>
//                             <th
//                               data-field="description"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Description
//                             </th>
//                             <th
//                               data-field="created_by"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Created By
//                             </th>
//                             <th
//                               data-field="created_at"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Created At
//                             </th>
//                             <th
//                               data-field="updated_at"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Updated At
//                             </th>
//                             <th data-field="actions" data-visible="true">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tab-pane fade " id="navs-top-media" role="tabpanel">
//                   <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div />
//                       <a
//                         href="javascript:void(0);"
//                         data-bs-toggle="modal"
//                         data-bs-target="#add_media_modal"
//                       >
//                         <button
//                           type="button"
//                           className="btn btn-sm btn-primary"
//                           data-bs-toggle="tooltip"
//                           data-bs-placement="left"
//                           data-bs-original-title="Add Media"
//                         >
//                           <i className="bx bx-plus" />
//                         </button>
//                       </a>
//                     </div>
//                     <div className="table-responsive text-nowrap">
//                       <input type="hidden" id="data_type" defaultValue="project-media" />
//                       <input
//                         type="hidden"
//                         id="data_table"
//                         defaultValue="project_media_table"
//                       />
//                       <input type="hidden" id="save_column_visibility" />
//                       <table
//                         id="project_media_table"
//                         data-toggle="table"
//                         data-loading-template="loadingTemplate"
//                         data-url="https://taskify.taskhub.company/projects/get-media/434"
//                         data-icons-prefix="bx"
//                         data-icons="icons"
//                         data-show-refresh="true"
//                         data-total-field="total"
//                         data-trim-on-search="false"
//                         data-data-field="rows"
//                         data-page-list="[5, 10, 20, 50, 100, 200]"
//                         data-search="true"
//                         data-side-pagination="server"
//                         data-show-columns="true"
//                         data-pagination="true"
//                         data-sort-name="id"
//                         data-sort-order="desc"
//                         data-mobile-responsive="true"
//                         data-query-params="queryParamsProjectMedia"
//                       >
//                         <thead>
//                           <tr>
//                             <th data-checkbox="true" />
//                             <th data-field="id" data-visible="true" data-sortable="true">
//                               ID
//                             </th>
//                             <th
//                               data-field="file"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               File
//                             </th>
//                             <th
//                               data-field="file_name"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               File Name
//                             </th>
//                             <th
//                               data-field="file_size"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               File Size
//                             </th>
//                             <th
//                               data-field="created_at"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Created At
//                             </th>
//                             <th
//                               data-field="updated_at"
//                               data-sortable="true"
//                               data-visible="false"
//                             >
//                               Updated At
//                             </th>
//                             <th
//                               data-field="actions"
//                               data-visible="true"
//                               data-sortable="false"
//                             >
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tab-pane fade" id="navs-top-activity-log" role="tabpanel">
//                   <div className="col-12">
//                     <div className="row mt-4">
//                       <div className="mb-3 col-md-4">
//                         <div className="input-group input-group-merge">
//                           <input
//                             type="text"
//                             id="activity_log_between_date"
//                             className="form-control"
//                             placeholder="Date Between"
//                             autoComplete="off"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-select"
//                           id="user_filter"
//                           aria-label="Default select example"
//                         >
//                           <option value="">Select User</option>
//                           <option value={7}>Admin Infinitie</option>
//                           <option value={76}>Memeber2 Infinitie</option>
//                           <option value={77}>Member Infinitie</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-select"
//                           id="client_filter"
//                           aria-label="Default select example"
//                         >
//                           <option value="">Select Client</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <select
//                           className="form-select"
//                           id="activity_filter"
//                           aria-label="Default select example"
//                         >
//                           <option value="">Select Activity</option>
//                           <option value="created">Created</option>
//                           <option value="updated">Updated</option>
//                           <option value="duplicated">Duplicated</option>
//                           <option value="uploaded">Uploaded</option>
//                           <option value="deleted">Deleted</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="table-responsive text-nowrap">
//                       <input type="hidden" id="activity_log_between_date_from" />
//                       <input type="hidden" id="activity_log_between_date_to" />
//                       <input type="hidden" id="data_type" defaultValue="activity-log" />
//                       <input
//                         type="hidden"
//                         id="data_table"
//                         defaultValue="activity_log_table"
//                       />
//                       <input type="hidden" id="type_id" defaultValue={434} />
//                       <input type="hidden" id="save_column_visibility" />
//                       <table
//                         id="activity_log_table"
//                         data-toggle="table"
//                         data-loading-template="loadingTemplate"
//                         data-url="https://taskify.taskhub.company/activity-log/list"
//                         data-icons-prefix="bx"
//                         data-icons="icons"
//                         data-show-refresh="true"
//                         data-total-field="total"
//                         data-trim-on-search="false"
//                         data-data-field="rows"
//                         data-page-list="[5, 10, 20, 50, 100, 200]"
//                         data-search="true"
//                         data-side-pagination="server"
//                         data-show-columns="true"
//                         data-pagination="true"
//                         data-sort-name="id"
//                         data-sort-order="desc"
//                         data-mobile-responsive="true"
//                         data-query-params="queryParams"
//                       >
//                         <thead>
//                           <tr>
//                             <th data-checkbox="true" />
//                             <th data-field="id" data-visible="true" data-sortable="true">
//                               ID
//                             </th>
//                             <th
//                               data-field="actor_id"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Actor ID
//                             </th>
//                             <th
//                               data-field="actor_name"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Actor Name
//                             </th>
//                             <th
//                               data-field="actor_type"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Actor Type
//                             </th>
//                             <th
//                               data-field="type_id"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Type ID
//                             </th>
//                             <th
//                               data-field="parent_type_id"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Parent Type ID
//                             </th>
//                             <th
//                               data-field="activity"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Activity
//                             </th>
//                             <th
//                               data-field="type"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Type
//                             </th>
//                             <th
//                               data-field="parent_type"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Parent Type
//                             </th>
//                             <th
//                               data-field="type_title"
//                               data-visible="true"
//                               data-sortable="true"
//                             >
//                               Type Title
//                             </th>
//                             <th
//                               data-field="parent_type_title"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Parent Type Title
//                             </th>
//                             <th
//                               data-field="message"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Message
//                             </th>
//                             <th
//                               data-field="created_at"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Created At
//                             </th>
//                             <th
//                               data-field="updated_at"
//                               data-visible="false"
//                               data-sortable="true"
//                             >
//                               Updated At
//                             </th>
//                             <th data-field="actions" data-visible="true">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="modal fade"
//               id="create_milestone_modal"
//               tabIndex={-1}
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-lg" role="document">
//                 <form
//                   className="modal-content form-submit-event"
//                   action="https://taskify.taskhub.company/projects/store-milestone"
//                   method="POST"
//                 >
//                   <input type="hidden" name="project_id" defaultValue={434} />
//                   <input type="hidden" name="dnr" />
//                   <input
//                     type="hidden"
//                     name="table"
//                     defaultValue="project_milestones_table"
//                   />
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel1">
//                       Create Milestone
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>
//                   <div className="modal-body">
//                     <div className="row">
//                       <div className="col-12 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Title <span className="asterisk">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="title"
//                           className="form-control"
//                           placeholder="Please Enter Title"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Starts At
//                         </label>
//                         <input
//                           type="text"
//                           id="start_date"
//                           name="start_date"
//                           className="form-control"
//                           placeholder="Please Select"
//                           autoComplete="off"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Ends At
//                         </label>
//                         <input
//                           type="text"
//                           id="end_date"
//                           name="end_date"
//                           className="form-control"
//                           placeholder="Please Select"
//                           autoComplete="off"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Status <span className="asterisk">*</span>
//                         </label>
//                         <select className="form-select" name="status">
//                           <option value="incomplete">Incomplete</option>
//                           <option value="complete">Complete</option>
//                         </select>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Cost <span className="asterisk">*</span>
//                         </label>
//                         <div className="input-group input-group-merge">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="text"
//                             name="cost"
//                             className="form-control"
//                             placeholder="Please Enter Cost"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <label htmlFor="description" className="form-label">
//                       Description
//                     </label>
//                     <textarea
//                       className="form-control description"
//                       name="description"
//                       placeholder="Please Enter Description"
//                       defaultValue={""}
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       Close{" "}
//                     </button>
//                     <button type="submit" id="submit_btn" className="btn btn-primary">
//                       Create
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div
//               className="modal fade"
//               id="edit_milestone_modal"
//               tabIndex={-1}
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-lg" role="document">
//                 <form
//                   className="modal-content form-submit-event"
//                   action="https://taskify.taskhub.company/projects/update-milestone"
//                   method="POST"
//                 >
//                   <input type="hidden" name="id" id="milestone_id" />
//                   <input type="hidden" name="project_id" defaultValue={434} />
//                   <input type="hidden" name="dnr" />
//                   <input
//                     type="hidden"
//                     name="table"
//                     defaultValue="project_milestones_table"
//                   />
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel1">
//                       Update Milestone
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>
//                   <div className="modal-body">
//                     <div className="row">
//                       <div className="col-12 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Title <span className="asterisk">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="title"
//                           id="milestone_title"
//                           className="form-control"
//                           placeholder="Please Enter Title"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Starts At
//                         </label>
//                         <input
//                           type="text"
//                           id="update_milestone_start_date"
//                           name="start_date"
//                           className="form-control"
//                           placeholder="Please Select"
//                           autoComplete="off"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Ends At
//                         </label>
//                         <input
//                           type="text"
//                           id="update_milestone_end_date"
//                           name="end_date"
//                           className="form-control"
//                           placeholder="Please Select"
//                           autoComplete="off"
//                         />
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Status <span className="asterisk">*</span>
//                         </label>
//                         <select
//                           className="form-select"
//                           id="milestone_status"
//                           name="status"
//                         >
//                           <option value="incomplete">Incomplete</option>
//                           <option value="complete">Complete</option>
//                         </select>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Cost <span className="asterisk">*</span>
//                         </label>
//                         <div className="input-group input-group-merge">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="text"
//                             name="cost"
//                             id="milestone_cost"
//                             className="form-control"
//                             placeholder="Please Enter Cost"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 mb-3">
//                         <label htmlFor="nameBasic" className="form-label">
//                           Progress
//                         </label>
//                         <input
//                           type="range"
//                           name="progress"
//                           id="milestone_progress"
//                           className="form-range"
//                         />
//                         <h6 className="mt-2 milestone-progress" />
//                       </div>
//                     </div>
//                     <label htmlFor="description" className="form-label">
//                       Description
//                     </label>
//                     <textarea
//                       className="form-control description"
//                       name="description"
//                       id="milestone_description"
//                       placeholder="Please Enter Description"
//                       defaultValue={""}
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       Close{" "}
//                     </button>
//                     <button type="submit" id="submit_btn" className="btn btn-primary">
//                       Update
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div
//               className="modal fade"
//               id="add_media_modal"
//               tabIndex={-1}
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-lg" role="document">
//                 <form
//                   className="modal-content form-horizontal"
//                   id="media-upload"
//                   action="https://taskify.taskhub.company/projects/upload-media"
//                   method="POST"
//                   encType="multipart/form-data"
//                 >
//                   <input
//                     type="hidden"
//                     name="_token"
//                     defaultValue="2uKBUejJQbKQJW1oIFz9CySQxtVosCZ0oi1DIwSC"
//                     autoComplete="off"
//                   />{" "}
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel1">
//                       Add Media
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>
//                   <div className="modal-body">
//                     <div className="alert alert-primary alert-dismissible" role="alert">
//                       Storage Type Set as Local Storage,{" "}
//                       <a
//                         href="https://taskify.taskhub.company/settings/media-storage"
//                         target="_blank"
//                       >
//                         Click Here to Change
//                       </a>
//                     </div>
//                     <div
//                       className="dropzone dz-clickable"
//                       id="media-upload-dropzone"
//                     ></div>
//                     <div className="form-group mt-4 text-center">
//                       <button className="btn btn-primary" id="upload_media_btn">
//                         Upload
//                       </button>
//                     </div>
//                     <div className="d-flex justify-content-center">
//                       <div className="form-group" id="error_box"></div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       Close{" "}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
            
//           </div>
//         )
//     })}

//       <TaskById show={showModal} handleClose={handleClose} taskId={taskId}  />
//     </div>
//   )
// }

// export default ProjectInformation




