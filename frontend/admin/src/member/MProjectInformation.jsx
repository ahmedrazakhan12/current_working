import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import TaskById from '../pages/tasks/TaskById';
import { useAppContext } from '../context/AppContext';

const ProjectInformation = () => {
    const {id} = useParams();    
    const [data , setData] = useState([]);
    const [dbStatus , setDbStatus] = useState([]);
    const navigate = useNavigate();
    const [dbPriority, setDbPriority] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const {socket} = useAppContext();
    const [taskStatusFilter, setTaskStatusFilter] = useState([]);
    const activeId = localStorage.getItem("id");
    const [loginData , setLoginData] = useState([])


useEffect(() => {
  if (!activeId) {
    navigate("/login"); // Redirect to login
  } else {
    axios
      .get(`http://localhost:5000/admin/adminInfo/`, {
        headers: { Authorization: `${activeId}` },
      })
      .then((res) => {
        setLoginData(res.data);
        console.log("Navbar: ", res.data);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 404) {
          navigate("/login"); // Redirect to login on 404
        }
      });
  }

 
}, [activeId, navigate]);


const fetchTaskFilterStatus = ()=>{
  axios.get(`http://localhost:5000/task/filterTaskCount/${id}`)
  .then((res) => {
    console.log("Filter Count", res.data);
    setTaskStatusFilter(res.data.count.status); // Adjusted to access the status array
  })
  .catch((err) => {
    console.log("Err", err);
  });
}
useEffect(() => {
  fetchTaskFilterStatus();
}, [id]);
 
    const fetchProjectData = () =>{
      axios.get(`http://localhost:5000/project/getProject/${id}`)
      .then((res) => {
          console.log("Reposne: ",res.data);
          setData(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
    }
    useEffect(() => {
      fetchProjectData();
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
            // console.log("././././././././",res.data);
          })
          .catch((err) => {
            console.log("Error fetching providers:", err);
          });
      };

      const handleFilterTasks = (event) => {
        const selectedValue = event.target.value; // Get the selected value from the dropdown
        let filteredItems = [];
      
        if (selectedValue === "") {
            // If "All" is selected, show all tasks
            axios
          .get(`http://localhost:5000/task/getAllTasks/${id}` , {
            headers: { Authorization: ` ${id}` }
          })
          .then((res) => {
            setTableData(res.data);
            // console.log("././././././././",res.data);
          })
          .catch((err) => {
            console.log("Error fetching providers:", err);
          });
        } else {
            // Filter tasks based on the activeId
            filteredItems = tableData.filter(item => 
                item.users.some(user => user.id === parseInt(selectedValue))
            );
        }
      
        setTableData(filteredItems)
        // Do something with filteredItems, like setting it to state or updating the UI
        console.log("Filtered Items: ", filteredItems);
        };
    
      useEffect(() => {
        fetchData();
      }, []);

  // Pagination handling



// For project


const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return duration;
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

  

  useEffect(() => {
    axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
    .then((res) => {
      setDbStatus(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  const groupedItems = dbStatus.reduce((acc, status) => {
    acc[status.status] = tableData.filter(item => item?.status[0] && item.status[0]?.status === status?.status);

    return acc;
  }, {});
  console.log("groupedItems: ", groupedItems);
  
  const handleDelete = (id) => {
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
          .delete(`http://localhost:5000/task/deleteTask/${id}`)
          .then((res) => {
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            );
            fetchData();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              'Error!',
              'There was an error deleting the task.',
              'error'
            );
          });
      }
    });
  };



  const handleChange = async (event , id , taskName) => {
  
  const selectedValue = event.target.value;
  const selectedItem = dbStatus.find((item) => item.id === selectedValue);
  const selectedPreview = selectedItem ? selectedItem.preview : '';

  // setSelectedPreview(selectedPreview);

  try {
    await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
      status: selectedValue,
    });
    const userNotificationsIds = data?.flatMap(item => item?.users?.map(user => user.id));

    const notification = {
      username: loginData.name,
      projectName: data?.[0]?.project?.projectName || 'Unknown Project',
      usersID: userNotificationsIds,
      text: `${loginData.name} has updated the Task ${taskName} status in ${data?.[0]?.project?.projectName || 'the project'} `,
      time: new Date().toLocaleString(),
      route: `/projectInformation/${id}`,
    };
    
    socket.emit('newNotification', notification, (response) => {
      if (response && response.status === 'ok') {
        console.log(response.msg);
      } else {
        console.error('Message delivery failed or no response from server');
      }
    });
    // Re-fetch task data after update
    fetchData();
    fetchTaskFilterStatus();

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

const handlePriorityChange = async (event , id , taskName) => {
  const selectedValue = event.target.value;
  const selectedItem = dbPriority.find((item) => item.id === selectedValue);
  const selectedPreview = selectedItem ? selectedItem.preview : '';

  // setSelectedPreview(selectedPreview);

  try {
    await axios.put(`http://localhost:5000/task/editPriority/${id}`, {
      priority: selectedValue,
    });

    const userNotificationsIds = data?.flatMap(item => item?.users?.map(user => user.id));

    const notification = {
      username: loginData.name,
      projectName: data?.[0]?.project?.projectName || 'Unknown Project',
      usersID: userNotificationsIds,
      text: `${loginData.name} has updated the Task ${taskName} priority in ${data?.[0]?.project?.projectName || 'the project'} `,
      time: new Date().toLocaleString(),
      route: `/projectInformation/${id}`,

    };
    
    socket.emit('newNotification', notification, (response) => {
      if (response && response.status === 'ok') {
        console.log(response.msg);
      } else {
        console.error('Message delivery failed or no response from server');
      }
    });
    // Re-fetch task data after update
    fetchData();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};









// MEDIA UPLOAD

const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv'];
const documentExtensions = ['.sql', '.pdf', '.docx', '.zip'];
const imageExtensions = ['.png', '.jpg', '.jpeg'];
const allExtensions = [...videoExtensions, ...documentExtensions, ...imageExtensions];


const [files, setFiles] = useState([]);
console.log("files: ", files);


const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  const validFiles = selectedFiles.filter(file => {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    return allExtensions.includes(fileExtension);
  });

  if (validFiles.length !== selectedFiles.length) {
    Swal.fire({
      position: "top-end",
      title: "This File type not allowed.",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'custom-swal-danger'
      }
    });
  }

  setFiles((prevFiles) => [...prevFiles, ...validFiles]);
};

// Cleanup URLs when component unmounts
useEffect(() => {
  return () => {
    files.forEach(file => URL.revokeObjectURL(URL.createObjectURL(file)));
  };
}, [files]);

const formatFileSize = (size) => {
  return (size / (1024 * 1024)).toFixed(2) + ' MB';
};

const modalRef = useRef(null);
const [media , setMedia] = useState([]);

const fetchMedia = ()=>{
  axios.get(`http://localhost:5000/project/getMedia/${id}`)
  .then((res)=>{
    console.log("Media: ",res.data)
    setMedia(res.data)
  })
  .catch((err)=>{
    console.log(err);
  })
}

useEffect(()=>{
  fetchMedia();
},[])

const handleProjectMediaSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('media', file); // Ensure 'media' matches the expected field name
  });

  axios.post(`http://localhost:5000/project/addMedia/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
    const userNotificationsIds = data?.flatMap(item => item?.users?.map(user => user.id));

    const notification = {
      username: loginData.name,
      projectName: data?.[0]?.project?.projectName || 'Unknown Project',
      usersID: userNotificationsIds,
      text: `${loginData.name} has added the media to ${data?.[0]?.project?.projectName || 'the project'}.`,
      time: new Date().toLocaleString(),
      route: `/projectInformation/${id}`,
    };
    
    socket.emit('newNotification', notification, (response) => {
      if (response && response.status === 'ok') {
        console.log(response.msg);
      } else {
        console.error('Message delivery failed or no response from server');
      }
    });
      fetchMedia();
      setFiles([]);
      console.log("Response: ", res.data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};



const handleDownload = (url) => {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'download.jpg'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Download error:', error));
};






const handleVedioDownload = (url) => {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'vedio.mp4'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Download error:', error));
};



const [openTaskIds, setOpenTaskIds] = useState([]);

  const handleFullTasks = (id) => {
    setOpenTaskIds(prevOpenTaskIds =>
      prevOpenTaskIds.includes(id) 
        ? prevOpenTaskIds.filter(taskId => taskId !== id) 
        : [...prevOpenTaskIds, id]
    );
  };

 


  return (
    <div className="container-fluid mt-3 mb-5">
    {data.map((item , index)=>{
        return(
            <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
              
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <span className="badge bg-info">{item.tags.tagName}</span>
                      </div>
                      <h2 className="fw-bold">
                        {item.project.projectName}
                       
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
                        <label className="form-label" htmlFor="start_date">
                            Creator
                          </label>
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
                      className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview} text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="status"
                      style={{pointerEvents:'none'}}
                    >
                      <option className={`bg-label-${item.status[0]?.preview}`}>
                        {item.status[0]?.status}
                      </option>
                      {/* {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
                        <option
                          key={dbIndex}
                          className={`bg-label-${dbItem.preview}`}
                          value={dbItem?.id}
                        >
                          {dbItem?.status}
                        </option>
                      ))} */}
                    </select>

                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="prioritySelect" className="form-label">
                            Priority
                          </label>
                          <div className="input-group">
                          <select
                      className={`form-select form-select-sm select-bg-label-${item.priority[0]?.preview} text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="status"
                      style={{pointerEvents:'none'}}

                    //   onChange={(event) => handleProjectPriorityChange(event, item.project?.id)}
                    >
                      <option className={`bg-label-${item.priority[0]?.preview}`}>
                        {item.priority[0]?.status}
                      </option>
                      {/* {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
                        <option
                          key={dbIndex}
                          className={`bg-label-${dbItem.preview}`}
                          value={dbItem?.id}
                        >
                          {dbItem?.status}
                        </option>
                      ))} */}
                    </select>
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
                          
                        
                          {Object.keys(groupedItems).map((status, index) => {
    const statusColor = dbStatus.find(dbItem => dbItem.status === status)?.preview || 'default-color';

    return (
        <li className="d-flex mb-3 pb-1" key={index}>
            <div className="avatar flex-shrink-0 me-3">
                <span className={`avatar-initial rounded bg-label-${statusColor}`}>
                    <i className="bx bx-task" />
                </span>
            </div>
            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                    <a>
                        <h6 className="mb-0 text-capitalize">
                            {status}
                        </h6>
                    </a>
                </div>
                <div className="user-progress">
                    <div className="status-count">
                        <div>
                            {groupedItems[status].length}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
})}

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
                <h5 className="mb-0">
                    {Object.values(groupedItems).reduce((total, currentArray) => total + currentArray.length, 0)}
                </h5>
            </div>
        </div>
    </div>
</li>
</ul>
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
                          <h3 className="card-title mb-2">{calculateDuration(item.project.startAt , item.project.endAt)} Days</h3>
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
                {/* <li className="nav-item">
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
                </li> */}
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
                {/* <li className="nav-item">
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
                </li> */}
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="navs-top-tasks"
                  role="tabpanel"
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div />
                   
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
          <select name="" id="" className='form-select ml-3' style={{width:'20%' , marginLeft:'20px'}} onChange={handleFilterTasks}>
            <option value="">All</option>
            <option value={activeId}>My Tasks</option>
          </select>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              style={{ borderRadius: "6px" }}
              className="card-body px-1  mt-0  border-radius-lg"
            >

                          
            <div
              className="d-flex flex-row"
              style={{
                overflowX: 'auto', // Use 'auto' instead of 'scroll' for better UX
              }}
            >
             {Object.keys(groupedItems).map((status, index) => (
    <div key={status} className="col" style={{ display: 'inline-block' }}>
        <h4 className="fw-bold  text-capitalize text-center mb-5">{status}</h4>
        {groupedItems[status].length > 0 ? (
        groupedItems[status].map((item) => (
          <div
            key={item.task.id}
            onDoubleClick={() => handleFullTasks(item.task.id)}
            style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '252px' , cursor:"pointer"}}
          >
            {openTaskIds.includes(item.task.id) ? (
              <div className=" m-2 " data-status="0" id="default" style={{ height: '' }}>
              <div
    className="card cursor-pointer m-2 p-0 shadow"
    data-task-id={item.task.id}
  >
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <h6 className="card-title">
          <Link
          to={`/viewTask/${item.task.id}`}
          >
            <strong>
              {item.task.taskName}
            </strong>
          </Link>
        </h6>
        <div className="d-flex align-items-center justify-content-center">
          <div className="input-group">
           
          </div>
       
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
                onChange={(event) => handleChange(event, item?.task?.id , item?.task?.taskName)}
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
                onChange={(event) => handlePriorityChange(event, item.task.id , item?.task?.taskName)}
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
            ) : (
              <div className="m-2" data-status="0" id="default" style={{ height: '' }}>
                <div className="card cursor-pointer p-0 shadow" data-task-id={item.task.id}>
                  <div className="card-body px-3 py-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">
                        <Link onClick={() => handleShow(item.task.id)}>
                          <strong>{item.task?.taskName}</strong>
                        </Link>
                      </h6>
                      <div style={{ marginTop: '-6px' }}>
                        <div className="input-group m-0 p-0">
                          <a
                            aria-expanded="false"
                            className="m-0 p-0"
                            data-bs-toggle="dropdown"
                            href="javascript:void(0);"
                          >
                            <i className="bx bx-cog" />
                          </a>
                          <ul className="dropdown-menu">
                            <Link className="edit-task" to={`/editTask/${item.task.id}`}>
                              <li className="dropdown-item">
                                <i className="menu-icon tf-icons bx bx-edit text-primary" /> Update
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
                                <i className="menu-icon tf-icons bx bx-trash text-danger" /> Delete
                              </li>
                            </a>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column m-0 p-0">
                      <div>
                        <div className="input-group mt-2 m-0">
                          <select
                            className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview} text-center text-capitalize`}
                            id="prioritySelect"
                            data-original-color-class="select-bg-label-secondary"
                            name="status"
                            onChange={(event) => handleChange(event, item?.task?.id , item?.task?.taskName)}
                          >
                            <option className={`bg-label-${item.status[0]?.preview}`}>
                              {item.status[0]?.status}
                            </option>
                            {dbStatus &&
                              dbStatus.length > 0 &&
                              dbStatus.map((dbItem, dbIndex) => (
                                <option key={dbIndex} className={`bg-label-${dbItem.preview}`} value={dbItem.id}>
                                  {dbItem.status}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="mt-4 mb-1" style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '250px' }}>
          <div className="card mt-3 shadow mx-2" data-task-id="93">
            <div className="card-body p-2 overflow-hidden" style={{ maxHeight: '100px' }}>
              <h5 className="text-center" style={{ marginTop: '2%' }}>No Tasks</h5>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-7%' }}>
                <img src="/assets/images/empty-task.png" alt="" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      )}

 
        {/* {groupedItems[status].length > 0 ? (
            groupedItems[status].map((item) => (
              <>
               {fullTask === false ? <div onClick={()=>handleFullTasks(item.task.id)} key={item.task.id} style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '252px' }}>
              <div className=" m-2 " data-status="0" id="default" style={{ height: '' }}>
                  <div className="card  p-0 shadow" data-task-id={item.task.id}>
                      <div className="card-body px-3 py-3">
                          <div className="d-flex justify-content-between">
                              <h6 className="card-title">
                                  <Link onClick={() => handleShow(item.task.id)}>
                                      <strong>{item.task?.taskName}</strong>
                                  </Link>
                              </h6>
                              <div style={{ marginTop: '-6px' }}>
                                  <div className="input-group m-0 p-0">
                                      <a aria-expanded="false" className="m-0 p-0" data-bs-toggle="dropdown" href="javascript:void(0);">
                                          <i className="bx bx-cog" />
                                      </a>
                                      <ul className="dropdown-menu">
                                          <Link className="edit-task" to={`/editTask/${item.task.id}`}>
                                              <li className="dropdown-item">
                                                  <i className="menu-icon tf-icons bx bx-edit text-primary" /> Update
                                              </li>
                                          </Link>
                                          <a className="delete" data-id="93" data-reload="true" data-type="tasks" href="javascript:void(0);">
                                              <li className="dropdown-item" onClick={() => handleDelete(item.task.id)}>
                                                  <i className="menu-icon tf-icons bx bx-trash text-danger" /> Delete
                                              </li>
                                          </a>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div className="d-flex flex-column m-0 p-0">
                              <div>
                                  <div className="input-group mt-2 m-0">
                                      <select
                                          className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview} text-center text-capitalize`}
                                          id="prioritySelect"
                                          data-original-color-class="select-bg-label-secondary"
                                          name="status"
                                          onChange={(event) => handleChange(event, item.task.id)}
                                      >
                                          <option className={`bg-label-${item.status[0]?.preview}`}>
                                              {item.status[0]?.status}
                                          </option>
                                          {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
                                              <option key={dbIndex} className={`bg-label-${dbItem.preview}`} value={dbItem.id}>
                                                  {dbItem.status}
                                              </option>
                                          ))}
                                      </select>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div> : 
        <div onClick={()=>handleFullTasks(item.task.id)} key={item.task.id} style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '252px' }}>
        <div className=" m-2 " data-status="0" id="default" style={{ height: '' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quia ab, labore repellendus ex cupiditate, non nesciunt alias, recusandae deserunt rerum natus veniam aut vel. Quasi, id ducimus! Eius voluptate vitae eum quisquam culpa. Iure quam corrupti culpa, aliquam odit itaque molestiae dolores, cumque omnis praesentium architecto, voluptates nulla. Officia enim dolorem, corporis accusamus tenetur unde iusto perspiciatis libero debitis, distinctio optio? Doloribus magnam doloremque laborum, nobis amet inventore ea voluptas dolore unde maiores? Nulla obcaecati, odit, optio sit nostrum id rem sequi voluptate provident corporis nihil non repellendus quod. Deleniti id quis voluptates consequuntur laborum aliquam nisi consectetur iure?
        </div>
    </div>}
              </>
            ))
        ) : (
            <div className="mt-4 mb-1" style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '250px' }}>
                <div className="card mt-3 shadow mx-2" data-task-id="93">
                    <div className="card-body p-2 overflow-hidden" style={{ maxHeight: '100px' }}>
                        <h5 className='text-center' style={{ marginTop: '2%' }}>No Tasks</h5>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-7%' }}>
                            <img src="/assets/images/empty-task.png" alt="" style={{ width: '70px', height: '70px', objectFit: "contain" }} />
                        </div>
                    </div>
                </div>
            </div>
        )} */}
    </div>
          ))}


            </div>

                    
      

           
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
                    <div className="d-flex justify-content-between ">
                      <div />
                      {/* <h1>Amed raza</h1> */}
                    
                    </div>
                    
                    <div className="row mt-3">
  {media.map((file, index) => {
  // Determine file type based on URL
  const url = file.file;

function urlEndsWithAny(url, extensions) {
  return extensions.some(ext => url.endsWith(ext));
}

// Usage examples:

const isVideo = urlEndsWithAny(url, videoExtensions);
const isDocument = urlEndsWithAny(url, documentExtensions);
const isImage = urlEndsWithAny(url, imageExtensions); // Add other image extensions as needed
  const cleanFilename = file.filename 
  
    
  const handleDownloadClick = () => {
    if (isVideo) {
      handleVedioDownload(url);
    } else if (isImage) {
      handleDownload(url);
    }
  };
  return (
    <div key={index} className="col-lg-3 col-md-6  col-sm-6 col-12">
      <div className="mb-3" style={{ background: '#f0f4f9', borderRadius: '10px' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <h6 className="card-title text-capitalize">
                <strong>
                {cleanFilename}
                </strong>
              </h6>
            </div>
            <div className="col">
              <div className="input-group">
                <a
                  aria-expanded="false"
                  className="float-end"
                  data-bs-toggle="dropdown"
                  href="javascript:void(0);"
                  style={{ marginLeft: '10px', color: 'black' }}
                >
                  <i className='bx bx-dots-vertical-rounded float-end'></i>
                </a>
                <ul className="dropdown-menu">
                {isImage  && 
                 <a href={url} target='_blank' className="download" data-id={file.id}  data-type="projects" >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bxs-download'></i>
                      View
                    </li>
                  </a>
                  }
                  {isVideo  && 
                 <a href={url} target='_blank' className="download" data-id={file.id}  data-type="projects" >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bxs-download'></i>
                      View
                    </li>
                  </a>
                  }

                 {isImage  && 
                 <>
                  <a  onClick={handleDownloadClick} data-id={file.id}  data-type="projects" >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bxs-download'></i>
                      Download
                    </li>
                  </a>
                 </>}
                 {isVideo  && 
                 <>
                  <a  onClick={handleDownloadClick} data-id={file.id}  data-type="projects" >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bxs-download'></i>
                      Download
                    </li>
                  </a>
                 </>}

                 {isDocument && 
                 <>
                  <a href={url} download >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bxs-download'></i>
                      Download
                    </li>
                  </a>
                 </>}
                
                
                </ul>
              </div>
            </div>
          </div>
          {isDocument && (
            <div>
              <div className="document-preview">
              <img
                  src="/assets/images/document.jpg"
                  alt={`Preview ${index}`}
                  className="file-preview-image"

                />

                {/* <p>Document preview: <a >Download</a></p> */}
              </div>
            </div>
          )}
          {isVideo && (
            <div>
              <video src={url} muted autoPlay playsInline style={{width:'100%'}}></video>
            </div>
          )}
          {isImage && (
  <div>

      

    <img
      src={url}
      alt={`Preview ${index}`}
      className="file-preview-image"

    />

              </div>
)}


        </div>
      </div>
    </div>
  );
})}

{media.length === 0 && 
  <div className="col-lg-3 col-md-6  col-sm-6 col-12">
      <div className="mb-3" style={{ background: '#f0f4f9', borderRadius: '10px' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
            <div className="document-preview">
              <h5 className="text-center">
                No Media
              </h5>
              <img
                  src="/assets/images/no_media.jpg"
                  className="file-preview-image"
                  style={{margin:'auto'}}
                />

                {/* <p>Document preview: <a >Download</a></p> */}
              </div>
            </div>
           
          </div>
        
      </div>
    </div>
    </div>
    }




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
            {/* <div
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
            </div> */}
            {/* <div
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
            </div> */}
            <div
              className="modal fade"
              id="add_media_modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <form
                  className="modal-content form-horizontal"
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleProjectMediaSubmit}
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
                    {/* <div className="alert alert-primary alert-dismissible" role="alert">
                      Storage Type Set as Local Storage,{" "}
                     
                    </div> */}
                    <div className="dropzone dz-clickable" id="media-upload-dropzone">
                      <div className="file-previews">
                    {files.length > 0 && (
          <>
          {files.map((file, index) => (
            <div key={index} className="file-preview">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="file-preview-image"
                />
              ) : (
                <div className="dz-preview dz-file-preview">
              <h5>{formatFileSize(file.size)}</h5>
              <p>{file.name}</p>
                </div>
              )}
            </div>
          ))}

</>
        )}
      <label htmlFor="file" className="labelFile_Project">
        <span>
          <svg
            viewBox="0 0 184.69 184.69"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="Capa_1"
            version="1.1"
            width="60px"
            height="60px"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                      C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                      C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                      c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                      c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                      c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                      c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                      v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                    style={{ fill: '#010002' }}
                  ></path>
                </g>
                <g>
                  <path
                    d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                      c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                      L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                      c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                      C104.91,91.608,107.183,91.608,108.586,90.201z"
                    style={{ fill: '#010002' }}
                  ></path>
      
                </g>
              </g>
            </g>
          </svg>
        </span>
      </label>
      <input
        className="input_Project"
        name="text"
        id="file"
        type="file"
        onChange={handleFileChange}
      />
        </div>
      
    </div>
                    <div className="form-group mt-4 text-center">
                      <button className="btn btn-primary" type='submit' id="upload_media_btn">
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






// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Pagination } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Swal from 'sweetalert2';

// import TaskById from '../tasks/TaskById';
// const ProjectInformation = () => {
//     const {id} = useParams();    
//     const [data , setData] = useState([]);
//     const [dbStatus , setDbStatus] = useState([]);
//     const navigate = useNavigate();
//     const [dbPriority, setDbPriority] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [taskId, setTaskId] = useState(null);
  
 
//     const fetchProjectData = () =>{
//       axios.get(`http://localhost:5000/project/getProject/${id}`)
//       .then((res) => {
//           console.log("Reposne: ",res.data);
//           setData(res.data);
//       })
//       .catch((err) => {
//           console.log(err);
//       });
//     }
//     useEffect(() => {
//       fetchProjectData();
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
//             // console.log("././././././././",res.data);
//           })
//           .catch((err) => {
//             console.log("Error fetching providers:", err);
//           });
//       };
    
//       useEffect(() => {
//         fetchData();
//       }, []);

//   // Pagination handling



// // For project


// const handleProjectChange = async (event , id) => {
//   // alert(id)

//   const selectedValue = event.target.value;
//   const selectedItem = dbStatus.find((item) => item.id === selectedValue);
//   // const selectedPreview = selectedItem ? selectedItem.preview : '';

//   // setSelectedPreview(selectedPreview);

//   try {
//     await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
//       status: selectedValue,
//     });
//     // Re-fetch task data after update
//     fetchProjectData();
//     } catch (error) {
//     console.error('Error updating status:', error);
//   }
// };

// const handleProjectPriorityChange = async (event , id) => {
//   // alert(id)

//   const selectedValue = event.target.value;
//   const selectedItem = dbStatus.find((item) => item.id === selectedValue);
//   // const selectedPreview = selectedItem ? selectedItem.preview : '';

//   // setSelectedPreview(selectedPreview);

//   try {
//     await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
//       priority: selectedValue,
//     });
//     // Re-fetch task data after update
//     fetchProjectData();
//     } catch (error) {
//     console.error('Error updating status:', error);
//   }
// };












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
  
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`http://localhost:5000/task/deleteTask/${id}`)
//           .then((res) => {
//             Swal.fire(
//               'Deleted!',
//               'Your task has been deleted.',
//               'success'
//             );
//             fetchData();
//           })
//           .catch((err) => {
//             console.log(err);
//             Swal.fire(
//               'Error!',
//               'There was an error deleting the task.',
//               'error'
//             );
//           });
//       }
//     });
//   };



//   const handleChange = async (event , id) => {
  
//   const selectedValue = event.target.value;
//   const selectedItem = dbStatus.find((item) => item.id === selectedValue);
//   const selectedPreview = selectedItem ? selectedItem.preview : '';

//   // setSelectedPreview(selectedPreview);

//   try {
//     await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
//       status: selectedValue,
//     });
//     // Re-fetch task data after update
//     fetchData();
//   } catch (error) {
//     console.error('Error updating status:', error);
//   }
// };


// const fetchPriorities = async () => {
//   try {
//     const statusRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
//     setDbPriority(statusRes.data);
//   } catch (err) {
//     console.log(err);
//   }
// };


// useEffect(() => {
//   fetchPriorities();
// }, []);

// const handlePriorityChange = async (event , id) => {
//   const selectedValue = event.target.value;
//   const selectedItem = dbPriority.find((item) => item.id === selectedValue);
//   const selectedPreview = selectedItem ? selectedItem.preview : '';

//   // setSelectedPreview(selectedPreview);

//   try {
//     await axios.put(`http://localhost:5000/task/editPriority/${id}`, {
//       priority: selectedValue,
//     });
//     // Re-fetch task data after update
//     fetchData();
//   } catch (error) {
//     console.error('Error updating status:', error);
//   }
// };









// // MEDIA UPLOAD

// const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv'];
// const documentExtensions = ['.sql', '.pdf', '.docx', '.zip'];
// const imageExtensions = ['.png', '.jpg', '.jpeg'];
// const allExtensions = [...videoExtensions, ...documentExtensions, ...imageExtensions];


// const [files, setFiles] = useState([]);
// console.log("files: ", files);


// const handleFileChange = (event) => {
//   const selectedFiles = Array.from(event.target.files);
//   const validFiles = selectedFiles.filter(file => {
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     return allExtensions.includes(fileExtension);
//   });

//   if (validFiles.length !== selectedFiles.length) {
//     Swal.fire({
//       position: "top-end",
//       title: "This File type not allowed.",
//       showConfirmButton: false,
//       timer: 1500,
//       customClass: {
//         popup: 'custom-swal-danger'
//       }
//     });
//   }

//   setFiles((prevFiles) => [...prevFiles, ...validFiles]);
// };

// // Cleanup URLs when component unmounts
// useEffect(() => {
//   return () => {
//     files.forEach(file => URL.revokeObjectURL(URL.createObjectURL(file)));
//   };
// }, [files]);

// const formatFileSize = (size) => {
//   return (size / (1024 * 1024)).toFixed(2) + ' MB';
// };

// const modalRef = useRef(null);
// const [media , setMedia] = useState([]);

// const fetchMedia = ()=>{
//   axios.get(`http://localhost:5000/project/getMedia/${id}`)
//   .then((res)=>{
//     console.log("Media: ",res.data)
//     setMedia(res.data)
//   })
//   .catch((err)=>{
//     console.log(err);
//   })
// }

// useEffect(()=>{
//   fetchMedia();
// },[])

// const handleProjectMediaSubmit = (event) => {
//   event.preventDefault(); // Prevent the default form submission behavior

//   const formData = new FormData();
//   files.forEach((file) => {
//     formData.append('media', file); // Ensure 'media' matches the expected field name
//   });

//   axios.post(`http://localhost:5000/project/addMedia/${id}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//     .then((res) => {
//       fetchMedia();
//       setFiles([]);
//       console.log("Response: ", res.data);
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//     });
// };



// const handleDownload = (url) => {
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'download.jpg'; 
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     })
//     .catch(error => console.error('Download error:', error));
// };






// const handleVedioDownload = (url) => {
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'vedio.mp4'; 
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     })
//     .catch(error => console.error('Download error:', error));
// };

// const handleMediaDelete = (id) => {
//   // alert(id/)
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       axios.delete(`http://localhost:5000/project/deleteMedia/${id}`)
//         .then(() => {
//           fetchMedia();
//           Swal.fire({
//             position: "top-end",
//             title: "Media deleted",
//             showConfirmButton: false,
//             timer: 1500,
//             customClass: {
//               popup: 'custom-swal'
//             }
//           });
         
//         })
//         .catch((error) => {
//           Swal.fire(
//             'Error!',
//             'There was a problem deleting your file.',
//             'error'
//           );
//         });
//     }
//   });
// };

//   return (
//     <div className="container-fluid mt-3 mb-5">
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
//                         <label className="form-label" htmlFor="start_date">
//                             Creator
//                           </label>
//                           <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
//                 {item.creator && item.creator.length > 0 && 
//   <li
//     className="avatar avatar-sm pull-up"
//     title={item.creator[0]?.name}
//     key={index}
//   >
//     <Link
//       to={`/Userview/${item.creator[0]?.id}`}
//       target="_blank"
//     >
//       <img
//         className="rounded-circle"
//         style={{ objectFit: "cover" }}
//         src={item.creator[0]?.pfpImage}
//         alt={item.creator[0]?.name}
//       />
//     </Link>
//   </li>
// }
//                 </ul>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">Status</label>
                         
//                           {/* <div
//                       className={"form-select form-select-sm select-bg-label-info text-capitalize"}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.project.status}
                     
                     
//                     </div> */}
//                     <select
//                       className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview} text-center text-capitalize`}
//                       id="prioritySelect"
//                       data-original-color-class="select-bg-label-secondary"
//                       name="status"
//                       onChange={(event) => handleProjectChange(event, item.project?.id)}
//                     >
//                       <option className={`bg-label-${item.status[0]?.preview}`}>
//                         {item.status[0]?.status}
//                       </option>
//                       {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
//                         <option
//                           key={dbIndex}
//                           className={`bg-label-${dbItem.preview}`}
//                           value={dbItem?.id}
//                         >
//                           {dbItem?.status}
//                         </option>
//                       ))}
//                     </select>

//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="prioritySelect" className="form-label">
//                             Priority
//                           </label>
//                           <div className="input-group">
//                           <select
//                       className={`form-select form-select-sm select-bg-label-${item.priority[0]?.preview} text-center text-capitalize`}
//                       id="prioritySelect"
//                       data-original-color-class="select-bg-label-secondary"
//                       name="status"
//                       onChange={(event) => handleProjectPriorityChange(event, item.project?.id)}
//                     >
//                       <option className={`bg-label-${item.priority[0]?.preview}`}>
//                         {item.priority[0]?.status}
//                       </option>
//                       {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
//                         <option
//                           key={dbIndex}
//                           className={`bg-label-${dbItem.preview}`}
//                           value={dbItem?.id}
//                         >
//                           {dbItem?.status}
//                         </option>
//                       ))}
//                     </select>
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
//                 {/* <li className="nav-item">
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
//                 </li> */}
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
//                 {/* <li className="nav-item">
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
//                 </li> */}
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
//               }}
//             >
//               {Object.keys(groupedItems).map((status, index) => (
//      <div key={index} className="col" style={{ display: 'inline-block' }}>
//     <h4 className="fw-bold  text-capitalize text-center mb-5">
//       {status}
//     </h4>
    
//     {groupedItems[status].length > 0 ? (
//       groupedItems[status].map((item, idx) => (
//         <div key={idx}  style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '252px' }}>
//         <div
//         className=" m-2 "
//         data-status="0"
//         id="default"
//         style={{
//           height: '',
//         }}
//       >
//         <div
//           className="card  p-0 shadow"
//           data-task-id={item.task.id}
//         >
//           <div className="card-body px-3 py-3">
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
//               <div  style={{marginTop:'-6px'}}>
//                 <div className="input-group m-0 p-0">
//                   <a
//                     aria-expanded="false"
//                     className="m-0 p-0"
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
//                 {/* <a
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
//                 </a> */}
//               </div>
//             </div>
//             {/* {data.map((item,index)=>{
//               return(
//                 <div className="card-subtitle text-muted mb-3">
//             {item.project.projectName}
//             </div>
//               )
//             })} */}
//             {/* <div className="row mt-2">
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
              
//             </div> */}
//             <div className="d-flex flex-column m-0 p-0">
//               <div>
// {/*              
//                   <label
//                     className="form-label m-0 p-0"
//                     htmlFor="statusSelect"
//                   >
//                     Status
//                   </label> */}
//                   <div className="input-group mt-2 m-0">
//                     {/* <div
//                       className={`form-select-sm select-bg-label-${item.status[0]?.preview} text-capitalize w-100 `}
//                       // data-original-color-class="select-bg-label-info"
//                       style={{textAlign:'center' , border:'none' }}
//                     >
//                       {item.status[0]?.status}
                     
                     
//                     </div> */}
//                      <select
//                       className={`form-select form-select-sm select-bg-label-${item.status[0]?.preview } text-center text-capitalize`}
//                       id="prioritySelect"
//                       data-original-color-class="select-bg-label-secondary"
//                       name="status"
//                       onChange={(event) => handleChange(event, item.task.id)}
//                     >

//                     <option className={`bg-label-${item.status[0]?.preview}`} >
//                     {item.status[0]?.status}
//                       </option>
//                       {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
//                       <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
//                         {dbItem.status}
//                       </option>
//                     ))}
                   
//                   </select>
                 
//                   </div>
                  
//               </div>
//               {/* <div>
//                   <label
//                     className="form-label mt-4"
//                     htmlFor="statusSelect"
//                   >
//                     Priority
//                   </label>
//                   <div className="input-group">
//                           <select
//                       className={`form-select form-select-sm select-bg-label-${item.priority[0]?.preview } text-center text-capitalize`}
//                       id="prioritySelect"
//                       data-original-color-class="select-bg-label-secondary"
//                       name="priority"
//                       onChange={(event) => handlePriorityChange(event, item.task.id)}
//                     >
//                       <option className={`bg-label-${item.priority[0]?.preview}`} value={item.priority[0]?.id}>
//                        {item.priority[0]?.status}
//                       </option>
//                       {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
//                         <option className={`bg-label-${dbItem.preview}`} key={dbIndex} value={dbItem.id}>
//                           {dbItem.status}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//               </div> */}
//               {/* <div className="mt-3">
//               <small className="text-muted">
//               <b>Starts At:</b>   {formatDate(item.task.startAt)}
//             </small><br />
//             <small className="text-muted">
//               <b>Ends At:</b>   {formatDate(item.task.endAt)}
//             </small>
//           </div> */}
//             </div>
            
        
            
//           </div>
//         </div>
//       </div>
//          </div>
//       ))
//     ) : (
//       <div  className="mt-4 mb-1" style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '250px' }}>
//       <div
//       className="card mt-3 shadow mx-2"
//       data-task-id="93"
//     >
//       <div className="card-body p-2 overflow-hidden" style={{maxHeight:'100px' }}>
//         <h5 className='text-center' style={{marginTop:'2%'}}>No Tasks</h5>
//         <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'-7%'}}>
//         <img src="/assets/images/empty-task.png" alt=""  style={{width:'70px' , height:'70px' , objectFit:"contain" }}/>
//         </div>
//       </div>
//     </div>
//     </div>
//     )}
//   </div>
// ))}

//             </div>

                    
      
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
//                     <div className="d-flex justify-content-between ">
//                       <div />
//                       {/* <h1>Amed raza</h1> */}
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
                    
//                     <div className="row mt-3">
//   {media.map((file, index) => {
//   // Determine file type based on URL
//   const url = file.file;

// function urlEndsWithAny(url, extensions) {
//   return extensions.some(ext => url.endsWith(ext));
// }

// // Usage examples:

// const isVideo = urlEndsWithAny(url, videoExtensions);
// const isDocument = urlEndsWithAny(url, documentExtensions);
// const isImage = urlEndsWithAny(url, imageExtensions); // Add other image extensions as needed
//   const cleanFilename = file.filename 
  
    
//   const handleDownloadClick = () => {
//     if (isVideo) {
//       handleVedioDownload(url);
//     } else if (isImage) {
//       handleDownload(url);
//     }
//   };
//   return (
//     <div key={index} className="col-lg-3 col-md-6  col-sm-6 col-12">
//       <div className="mb-3" style={{ background: '#f0f4f9', borderRadius: '10px' }}>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-9">
//               <h6 className="card-title text-capitalize">
//                 <strong>
//                 {cleanFilename}
//                 </strong>
//               </h6>
//             </div>
//             <div className="col">
//               <div className="input-group">
//                 <a
//                   aria-expanded="false"
//                   className="float-end"
//                   data-bs-toggle="dropdown"
//                   href="javascript:void(0);"
//                   style={{ marginLeft: '10px', color: 'black' }}
//                 >
//                   <i className='bx bx-dots-vertical-rounded float-end'></i>
//                 </a>
//                 <ul className="dropdown-menu">
//                 {isImage  && 
//                  <a href={url} target='_blank' className="download" data-id={file.id}  data-type="projects" >
//                     <li className="dropdown-item">
//                     <i class='menu-icon tf-icons bx bxs-download'></i>
//                       View
//                     </li>
//                   </a>
//                   }
//                   {isVideo  && 
//                  <a href={url} target='_blank' className="download" data-id={file.id}  data-type="projects" >
//                     <li className="dropdown-item">
//                     <i class='menu-icon tf-icons bx bxs-download'></i>
//                       View
//                     </li>
//                   </a>
//                   }

//                  {isImage  && 
//                  <>
//                   <a  onClick={handleDownloadClick} data-id={file.id}  data-type="projects" >
//                     <li className="dropdown-item">
//                     <i class='menu-icon tf-icons bx bxs-download'></i>
//                       Download
//                     </li>
//                   </a>
//                  </>}
//                  {isVideo  && 
//                  <>
//                   <a  onClick={handleDownloadClick} data-id={file.id}  data-type="projects" >
//                     <li className="dropdown-item">
//                     <i class='menu-icon tf-icons bx bxs-download'></i>
//                       Download
//                     </li>
//                   </a>
//                  </>}

//                  {isDocument && 
//                  <>
//                   <a href={url} download >
//                     <li className="dropdown-item">
//                     <i class='menu-icon tf-icons bx bxs-download'></i>
//                       Download
//                     </li>
//                   </a>
//                  </>}
                
//                   <a className="delete" data-id={file.id} onClick={()=>handleMediaDelete(file.id)} data-reload="true" data-type="projects" href="javascript:void(0);">
//                     <li className="dropdown-item">
//                       <i className="menu-icon tf-icons bx bx-trash text-danger" />
//                       Delete
//                     </li>
//                   </a>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           {isDocument && (
//             <div>
//               <div className="document-preview">
//               <img
//                   src="/assets/images/document.jpg"
//                   alt={`Preview ${index}`}
//                   className="file-preview-image"

//                 />

//                 {/* <p>Document preview: <a >Download</a></p> */}
//               </div>
//             </div>
//           )}
//           {isVideo && (
//             <div>
//               <video src={url} muted autoPlay playsInline style={{width:'100%'}}></video>
//             </div>
//           )}
//           {isImage && (
//   <div>

      

//     <img
//       src={url}
//       alt={`Preview ${index}`}
//       className="file-preview-image"

//     />

//               </div>
// )}


//         </div>
//       </div>
//     </div>
//   );
// })}

// {media.length === 0 && 
//   <div className="col-lg-3 col-md-6  col-sm-6 col-12">
//       <div className="mb-3" style={{ background: '#f0f4f9', borderRadius: '10px' }}>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-12">
//             <div className="document-preview">
//               <h5 className="text-center">
//                 No Media
//               </h5>
//               <img
//                   src="/assets/images/no_media.jpg"
//                   className="file-preview-image"
//                   style={{margin:'auto'}}
//                 />

//                 {/* <p>Document preview: <a >Download</a></p> */}
//               </div>
//             </div>
           
//           </div>
        
//       </div>
//     </div>
//     </div>
//     }




//                 </div>

                  
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
//             {/* <div
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
//             </div> */}
//             {/* <div
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
//             </div> */}
//             <div
//               className="modal fade"
//               id="add_media_modal"
//               tabIndex={-1}
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-lg" role="document">
//                 <form
//                   className="modal-content form-horizontal"
//                   method="POST"
//                   encType="multipart/form-data"
//                   onSubmit={handleProjectMediaSubmit}
// >
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
//                     {/* <div className="alert alert-primary alert-dismissible" role="alert">
//                       Storage Type Set as Local Storage,{" "}
                     
//                     </div> */}
//                     <div className="dropzone dz-clickable" id="media-upload-dropzone">
//                       <div className="file-previews">
//                     {files.length > 0 && (
//           <>
//           {files.map((file, index) => (
//             <div key={index} className="file-preview">
//               {file.type.startsWith('image/') ? (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`Preview ${index}`}
//                   className="file-preview-image"
//                 />
//               ) : (
//                 <div className="dz-preview dz-file-preview">
//               <h5>{formatFileSize(file.size)}</h5>
//               <p>{file.name}</p>
//                 </div>
//               )}
//             </div>
//           ))}

// </>
//         )}
//       <label htmlFor="file" className="labelFile_Project">
//         <span>
//           <svg
//             viewBox="0 0 184.69 184.69"
//             xmlns="http://www.w3.org/2000/svg"
//             xmlnsXlink="http://www.w3.org/1999/xlink"
//             id="Capa_1"
//             version="1.1"
//             width="60px"
//             height="60px"
//           >
//             <g>
//               <g>
//                 <g>
//                   <path
//                     d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
//                       C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
//                       C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
//                       c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
//                       c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
//                       c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
//                       c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
//                       v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
//                     style={{ fill: '#010002' }}
//                   ></path>
//                 </g>
//                 <g>
//                   <path
//                     d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
//                       c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
//                       L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
//                       c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
//                       C104.91,91.608,107.183,91.608,108.586,90.201z"
//                     style={{ fill: '#010002' }}
//                   ></path>
      
//                 </g>
//               </g>
//             </g>
//           </svg>
//         </span>
//       </label>
//       <input
//         className="input_Project"
//         name="text"
//         id="file"
//         type="file"
//         onChange={handleFileChange}
//       />
//         </div>
      
//     </div>
//                     <div className="form-group mt-4 text-center">
//                       <button className="btn btn-primary" type='submit' id="upload_media_btn">
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




