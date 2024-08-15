import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../App.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
const TaskById = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({});
  const [user, setUsers] = useState([]);
  const [dbStatus, setDbStatus] = useState([]);
  // const [selectedPreview, setSelectedPreview] = useState(taskData?.preview);
  const [priority, setPriority] = useState([]);
  const [dbPriority, setDbPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const { AppContextStatus } = useAppContext();
  const navigate = useNavigate();
  const [projectUserID, setProjectUserID] = useState([]);
  console.log("projectUserID" , projectUserID);
  
  const {socket} = useAppContext();
const [creator , setCreator] = useState([])
  const fetchData = async () => {
    try {
      const taskRes = await axios.get(
        `http://localhost:5000/task/getTask/${id}`
      );
      console.log("taskRes" , taskRes.data);
      const task = taskRes.data[0]?.task;
      const users = taskRes.data[0]?.users;
      const creator = taskRes.data[0]?.projectCreator;
      const status = taskRes.data[0]?.status;
      const priority = taskRes.data[0]?.priority;
      const projectusers = taskRes.data[0]?.filteredProjectUsers;
      setProjectUserID(projectusers);
      setCreator(creator);
      setTaskData(task);
      console.log("tasks" , task);
      setUsers(users);
      setPriority(priority);
      setStatus(status);
    } catch (err) {
      console.log(err);
    }
  };
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

  const projectID = taskData?.projectId;
  const fetchTaskMedia = () => {
    // alert(projectID)
    axios
      .get(`http://localhost:5000/task/getMedia/${projectID}` , {
        headers: {
          Authorization: id,
        },
      })
      .then((res) => {
        console.log("Media: ", res.data);
        setTaskMedia(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchPriorities = async () => {
    try {
      const statusRes = await axios.get(
        "http://localhost:5000/projectPriority/getAllPriorities"
      );
      setDbPriority(statusRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatuses = async () => {
    try {
      const statusRes = await axios.get(
        "http://localhost:5000/projectStatus/getAllStatus"
      );
      setDbStatus(statusRes.data);
      const matchedStatus = statusRes.data.find(
        (item) => item.status === taskData?.status
      );
      if (matchedStatus) {
        // setSelectedPreview(matchedStatus.preview);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!id) return;
    
    fetchData();
    fetchTaskMedia();
    fetchStatuses();
    fetchPriorities();
  }, [id , projectID]);
 


  const handleChange = async (event , taskName , projectName) => {
    const selectedValue = event.target.value;
    const selectedItem = dbStatus.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : "";

    // setSelectedPreview(selectedPreview);

    try {
      await axios.put(`http://localhost:5000/task/editStatus/${taskData?.projectId}`, {
        status: selectedValue,
      });
      const userNotificationsIds = projectUserID?.map(item => item.userId
        
      );
      
      // Remove duplicates by converting to a Set and back to an array
      const uniqueUserNotificationsIds = [...new Set(userNotificationsIds)];
      
        
      const notification = {
        username: loginData.name,
        projectName: taskName|| 'Unknown Tasks',
        usersID: uniqueUserNotificationsIds,
        text: `${loginData.name} has updated the Task ${taskName} status in ${ projectName || 'the project'} `,
        time: new Date().toLocaleString(),
        route: `/tasks`,
        creatorId: creator.creator,
      
      };
      console.log("notification: ", notification);
      
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
      console.error("Error updating status:", error);
    }
  };



    
  const handlePriorityChange = async (event  , taskName , projectName) => {
    const selectedValue = event.target.value;
    const selectedItem = dbPriority.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : "";

    // setSelectedPreview(selectedPreview);

    try {
      await axios.put(`http://localhost:5000/task/editPriority/${taskData?.projectId}`, {
        priority: selectedValue,
      });
      const userNotificationsIds = projectUserID?.map(item => item.userId
        
      );
      
      // Remove duplicates by converting to a Set and back to an array
      const uniqueUserNotificationsIds = [...new Set(userNotificationsIds)];
        
      const notification = {
        username: loginData.name,
        projectName: taskName|| 'Unknown Tasks',
        usersID: uniqueUserNotificationsIds,
        text: `${loginData.name} has updated the Task ${taskName} priority in ${ projectName || 'the project'} `,
        time: new Date().toLocaleString(),
        route: `/tasks`,
        creatorId: creator.creator,

      };
      console.log("notification: ", notification);
      
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
      console.error("Error updating status:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // MEDIA UPLOAD

  const videoTaskExtensions = [".mp4", ".avi", ".mov", ".wmv"];
  const documentTaskExtensions = [".sql", ".pdf", ".docx", ".zip"];
  const imageTaskExtensions = [".png", ".jpg", ".jpeg"];
  const allTasksExtensions = [
    ...videoTaskExtensions,
    ...documentTaskExtensions,
    ...imageTaskExtensions,
  ];

  const [taskFiles, setTasksFiles] = useState([]);
  console.log("taskFiles: ", taskFiles);

  const handleTaskFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = [];
    const invalidFiles = [];
  
    selectedFiles.forEach((file) => {
      const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (allTasksExtensions.includes(fileExtension)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });
  
    if (invalidFiles.length > 0) {
      // alert("Invalid files: ");
      Swal.fire({
        position: "top-end",
        title: "This File type not allowed.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal-danger'
        }
      });
    } else {
      setTasksFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };
  
  

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      taskFiles.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [taskFiles]);

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const modalRef = useRef(null);
  const [taskMedia, setTaskMedia] = useState([]);

 
  const handleTaskMediaSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    taskFiles.forEach((file) => {
      formData.append("media", file); // Ensure 'media' matches the expected field name
    });
    formData.append("taskId" , id)
    const projectID = taskData?.projectId;
    axios
      .post(`http://localhost:5000/task/addMedia/${projectID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchTaskMedia();
        setTasksFiles([]);
        console.log("Response: ", res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleDownload = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "download.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download error:", error));
  };

  const handleVedioDownload = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "vedio.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download error:", error));
  };

  const handleMediaDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "custom-swal-popup",
      },
      willOpen: () => {
        document.querySelector('.swal2-container').style.zIndex = '9999';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/task/deleteMedia/${id}`)
          .then(() => {
            fetchTaskMedia();
            Swal.fire({
              position: "top-end",
              title: "Media deleted",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "custom-swal",
              },
              willOpen: () => {
                document.querySelector('.swal2-container').style.zIndex = '9999';
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting your file.",
              icon: "error",
              customClass: {
                popup: "custom-swal-popup",
              },
              willOpen: () => {
                document.querySelector('.swal2-container').style.zIndex = '9999';
              }
            });
          });
      }
    });
  };
  
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);


  

  const [totalTimeData, setTotalTimeData] = useState([]);
  const fetchTaskTime = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/task/getTaskTime/${id}`);
      console.log("http://localhost:5000/getTaskTime", res.data);
      setTotalTimeData(res.data)
      // Update the state with the total time
    } catch (error) {
      console.error("Error fetching task time:", error);
    }
  };
  
  useEffect(() => {
    // Fetch the task time data from the backend
  if(id){
    fetchTaskTime();
  }

}, [id]);


const handleDeleteUserTime = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      popup: "custom-swal-popup",
    },

    willOpen: () => {
      document.querySelector('.swal2-container').style.zIndex = '9999';
    }
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5000/task/deleteUserTime/${id}`)
        .then(() => {
          // fetchTaskTim/e();
          fetchTaskTime();
          Swal.fire({
            position: "top-end",
            title: "Time deleted",
            showConfirmButton: false,
            timer: 1500,
          
          });
        })

        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting your time.",
            icon: "error",
            customClass: {
              popup: "custom-swal-popup",
            },
            willOpen: () => {
              document.querySelector('.swal2-container').style.zIndex = '9999';
            }
          });
        });
    }
  });
}
  return (
    <>
       <div className="container">
            <div className=" row">
              <div className="col-md-12">
                <div className="card  mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12 mt-3 mb-3">
                            <h2>{taskData.taskName}</h2>
                            <label className="form-label" htmlFor="start_date">
                              Users
                            </label>
                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center flex-wrap">
                              {user && user.length > 0 ? (
                                user.map((user, index) => (
                                  <React.Fragment key={index}>
                                    <li
                                      className="avatar avatar-sm pull-up"
                                      title={user.name}
                                    >
                                      <Link
                                        to={`/Userview/${user.id}`}
                                        target="_blank"
                                      >
                                        <img
                                          className="rounded-circle"
                                          style={{ objectFit: "cover" }}
                                          src={user.pfpImage}
                                          alt={user.name}
                                        />
                                      </Link>
                                    </li>
                                  </React.Fragment>
                                ))
                              ) : (
                                <span className="badge bg-primary">
                                  Not Assigned
                                </span>
                              )}

                              <Link
                                className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-task update-users-clients"
                                to={`/editTask/${taskData.id}`}
                              >
                                <span className="bx bx-edit" />
                              </Link>
                            </ul>
                          </div>

                          <div className="col-md-6 mb-3">
                            <label htmlFor="" className="form-label">
                              Status
                            </label>
                            {status &&
                              status.length > 0 &&
                              status.map((item, index) => (
                                <select
                                  key={index} // Added key for uniqueness
                                  className={`form-select form-select-sm select-bg-label-${item?.preview} text-center text-capitalize`}
                                  id="prioritySelect"
                                  data-original-color-class="select-bg-label-secondary"
                                  name="status"
                                  onChange={(event) => handleChange(event,  taskData.taskName , taskData?.projectName)}

                                >
                                  <option
                                    className={`bg-label-${item?.preview}`}
                                    value={item?.id}
                                  >
                                    {item?.status}
                                  </option>
                                  {dbStatus &&
                                    dbStatus.length > 0 &&
                                    dbStatus.map((dbItem, dbIndex) => (
                                      <option
                                        className={`bg-label-${dbItem.preview}`}
                                        key={dbIndex}
                                        value={dbItem.id}
                                      >
                                        {dbItem.status}
                                      </option>
                                    ))}
                                </select>
                              ))}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label
                              htmlFor="prioritySelect"
                              className="form-label"
                            >
                              Priority
                            </label>
                            {priority &&
                              priority.length > 0 &&
                              priority.map((item, index) => (
                                <select
                                  key={index} // Added key for uniqueness
                                  className={`form-select form-select-sm select-bg-label-${item?.preview} text-center text-capitalize`}
                                  id="prioritySelect"
                                  data-original-color-class="select-bg-label-secondary"
                                  name="priority"
                                  onChange={(event) => handlePriorityChange(event, taskData.taskName , taskData?.projectName)}

                                >
                                  <option
                                    className={`bg-label-${item?.preview}`}
                                    value={item?.id}
                                  >
                                    {item?.status}
                                  </option>
                                  {dbPriority &&
                                    dbPriority.length > 0 &&
                                    dbPriority.map((dbItem, dbIndex) => (
                                      <option
                                        className={`bg-label-${dbItem.preview}`}
                                        key={dbIndex}
                                        value={dbItem.id}
                                      >
                                        {dbItem.status}
                                      </option>
                                    ))}
                                </select>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body">
                    <div className="row">
                      <div className="mb-3 col-md-12">
                        <label className="form-label" htmlFor="project">
                          Project
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            className="form-control px-2"
                            type="text"
                            id="project"
                            value={taskData?.projectName}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row overflow-hidden">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <div className="input-group input-group-merge">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: taskData?.taskDescription,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label className="form-label" htmlFor="start_date">
                          Starts At
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            name="start_date"
                            className="form-control"
                            placeholder=""
                            value={formatDate(taskData?.startAt)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label" htmlFor="due-date">
                          Ends At
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            className="form-control"
                            type="text"
                            name="due_date"
                            placeholder=""
                            value={formatDate(taskData?.endAt)}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>


                    <div class="nav-align-top mt-2">
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <button
        type="button"
        class="nav-link active"
        role="tab"
        data-bs-toggle="tab"
        data-bs-target="#navs-top-tasks-1"
        aria-controls="navs-top-tasks-1"
      >
        <i class="menu-icon tf-icons bx bx-image-alt text-success"></i>
        Media
      </button>
    </li>
    <li class="nav-item">
      <button
        type="button"
        class="nav-link"
        role="tab"
        data-bs-toggle="tab"
        data-bs-target="#navs-top-documents-1"
        aria-controls="navs-top-documents-1"
      >
        <i class="menu-icon tf-icons bx bx-time text-primary"></i>
        Time
      </button>
    </li>
  </ul>

  <div class="tab-content">
    <div
      class="tab-pane fade show active"
      id="navs-top-tasks-1"
      role="tabpanel"
    >
        <div
                          class="tab-pane fade show active"
                          id="navs-top-tasks"
                          role="tabpanel"
                        >
                          <div>
                          {loginData?.role !== "member" && (
                            <button
                              type="button"
                              className="btn btn-sm btn-primary float-end"
                              onClick={handleModalShow}
                            >
                              <i className="bx bx-plus" />
                            </button>
                          )}
                          </div>



                        </div>
                        <div className="row mt-3">
  {taskMedia.map((file, index) => {
  // Determine file type based on URL
  const url = file.file;

function urlEndsWithAny(url, extensions) {
  return extensions.some(ext => url.endsWith(ext));
}

// Usage examples:

const isVideo = urlEndsWithAny(url, videoTaskExtensions);
const isDocument = urlEndsWithAny(url, documentTaskExtensions);
const isImage = urlEndsWithAny(url, imageTaskExtensions); // Add other image extensions as needed
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
                    <i class='menu-icon tf-icons bx bx-show'></i>
                      View
                    </li>
                  </a>
                  }
                  {isVideo  && 
                 <a href={url} target='_blank' className="download" data-id={file.id}  data-type="projects" >
                    <li className="dropdown-item">
                    <i class='menu-icon tf-icons bx bx-show'></i>
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
                 {loginData?.role !== "member" && (
                  <a className="delete" data-id={file.id} onClick={()=>handleMediaDelete(file.id)} data-reload="true" data-type="projects" href="javascript:void(0);">
                    <li className="dropdown-item">
                      <i className="menu-icon tf-icons bx bx-trash text-danger" />
                      Delete
                    </li>
                  </a>
                 )}
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

{taskMedia.length === 0 && 
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

    <div
      class="tab-pane fade"
      id="navs-top-documents-1"
      role="tabpanel"
    >
      <div className="row mt-3">

      <table id="table" className="table table-bordered ">
                  <thead>
                    <tr>
                      <th style={{}} data-field="id">
                        <div className="th-inner sortable both">ID</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{}} data-field="profile">
                        <div className="th-inner ">Users</div>
                        <div className="fht-cell" />
                      </th>
                    
                      <th style={{ textAlign: "center" }} data-field="assigned">
                        <div className="th-inner ">Working Hours</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="assigned">
                        <div className="th-inner ">Last Updated</div>
                        <div className="fht-cell" />
                      </th>

                      {loginData?.role !== "member" && (
                          <th style={{ textAlign: "center" }} data-field="assigned">
                          <div className="th-inner ">Action</div>
                          <div className="fht-cell" />
                        </th>
                      )}
                   
                    </tr>
                  </thead>
                  <tbody>
                    {totalTimeData && totalTimeData?.result?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        <div className="d-flex mt-2">
                           <Link to={`/Userview/${item?.userData?.id}`} target="_blank">
                           <div
                              className="avatar avatar-md pull-up"
                              title="Admin Infinitie"
                            >
                                <img
                                  src={item?.userData?.pfpImage}
                                  alt="Avatar"
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />
                            </div>
                           </Link>

                            <div className="mx-2">
                            <Link to={`/Userview/${item?.userData?.id}`} target="_blank">
                           
                              <h6 className="mb-1 text-capitalize">
                                {item?.userData?.name}{" "}
                              </h6>
                           </Link>
                              <p
                                className="text-muted  "
                                style={{ fontSize: "14px", marginTop: "-4px" }}
                              >
                                {item?.userData?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <h2
                            className={
                                "badge bg-primary me-1"
                            }
                            style={{ fontSize: "16px" , margin: "0" , textAlign: "center" }}
                          >
                            {item?.totalTime }  m 
                          </h2>
                        </td>
                        <td style={{ textAlign: "center" }}>
                        <h2
                            className={
                                "badge bg-warning me-1"
                            }
                            style={{ fontSize: "12px" , margin: "0" , textAlign: "center" }}
                          >
                            {item?.lastUpdatedDate} 
                          </h2>
                          
                       
                        </td>
                      {loginData?.role !== "member" && (
                        <td style={{ textAlign: "center" }}>
                          <i className="bx bx-trash" onClick={() => handleDeleteUserTime(item?.userData?.id)} style={{cursor:'pointer', color:'red'}} aria-hidden="true"/>
                        </td>
                      
                      )}
                      </tr>
                    ))}
                    {totalTimeData.result && totalTimeData.result.length === 0 && (
                      <tr>
                        <td colSpan={loginData?.role !== "member" ? 5 : 4} className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus.</p> */}
      </div>
    </div>
  </div>
</div>

               
                  </div>
                </div>
                <input type="hidden" id="media_type_id" defaultValue={93} />
              </div>
            </div>
          </div>

          <Modal
            show={showModal}
            onHide={handleModalClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Media</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                className=" form-horizontal"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleTaskMediaSubmit}
              >
          
                <div
                  className="dropzone dz-clickable"
                  id="media-upload-dropzone"
                >
                  <div className="file-previews">
                    {taskFiles.length > 0 && (
                      <>
                        {taskFiles.map((file, index) => (
                          <div key={index} className="file-preview">
                            {file.type.startsWith("image/") ? (
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


                    
                    <label  className="labelFile_Task">
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
                    <input
                      className="input_Task"
                      name="text"
                      id="file"
                      type="file"
                      multiple
                      onChange={handleTaskFileChange}
                      accept=".mp4, .avi, .mov, .wmv, .sql, .pdf, .docx, .zip, .png, .jpg, .jpeg"

                    />
                      
                    </label>
                    
                  </div>
                </div>
                <div className="form-group mt-4 text-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="upload_media_btn"
                  >
                    Upload
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="form-group" id="error_box"></div>
                </div>
              </form>
            </Modal.Body>
          </Modal>




    </>
  );
};

export default TaskById;