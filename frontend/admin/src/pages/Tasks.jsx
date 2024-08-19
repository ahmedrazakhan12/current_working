import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useAppContext } from '../context/AppContext';
const Tasks = () => {
  const [data , setData] = useState([]);
  const [dbStatus , setDbStatus] = useState([]);
  const navigate = useNavigate();
  const [dbPriority, setDbPriority] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const {socket} = useAppContext()
  
const statusRef = useRef(null);
const priorityRef = useRef(null);
const searchRef = useRef(null);

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

  // const fetchProjectData = () =>{
  //   axios.get(`http://localhost:5000/project/getProject/${id}`)
  //   .then((res) => {
  //       console.log("Reposne: ",res.data);
  //       setData(res.data);
  //   })
  //   .catch((err) => {
  //       console.log(err);
  //   });
  // }
  // useEffect(() => {
  //   fetchProjectData();
  //   }, []);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const [tableData , setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust items per page as needed
  
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/task/tasks/`)
        .then((res) => {
          setTableData(res.data);
          console.log("All Tasks",res.data);
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
// const selectedPreview = selectedItem ? selectedItem.preview : '';

// setSelectedPreview(selectedPreview);

try {
  await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
    status: selectedValue,
  });
  // Re-fetch task data after update
  // fetchProjectData();
  } catch (error) {
  console.error('Error updating status:', error);
}
};

const handleProjectPriorityChange = async (event , id) => {
// alert(id)

const selectedValue = event.target.value;
const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';

// setSelectedPreview(selectedPreview);

try {
  await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
    priority: selectedValue,
  });
  // Re-fetch task data after update
  // fetchProjectData();
  } catch (error) {
  console.error('Error updating status:', error);
}
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


// const handleChange = async (event , id) => {

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';


// if (statusRef.current) {
//   statusRef.current.value = "";
// }
// if (priorityRef.current) {
//   priorityRef.current.value = "";
// }
// if (searchRef.current) {
//   searchRef.current.value = "";
// }
// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
//     status: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchData();
// } catch (error) {
//   console.error('Error updating status:', error);
// }
// };
const handleChange = async (event , id , taskName , projectName , projectId) => {
  
  const selectedValue = event.target.value;
  const selectedItem = dbStatus.find((item) => item.id === selectedValue);
  const selectedPreview = selectedItem ? selectedItem.preview : '';

  // setSelectedPreview(selectedPreview);

  try {
    await axios.put(`http://localhost:5000/task/editStatusInGroup/${id}`, {
      status: selectedValue,
    });
    const userNotificationsIds = [
      ...new Set(
        tableData?.flatMap(item =>
          item?.projectUsers?.filter(user => user.projectId === projectId)?.map(user => user.userId)
        )
      )
    ];
   
    // Remove duplicates by converting to a Set and back to an array
    const uniqueUserNotificationsIds = [...new Set(userNotificationsIds)];
      
    const notification = {
      username: loginData.name,
      projectName: taskName|| 'Unknown Tasks',
      usersID: uniqueUserNotificationsIds,
      text: `${loginData.name} has updated the Task ${taskName} status in ${ projectName || 'the project'} `,
      time: new Date().toLocaleString(),
      route: `/tasks`,
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

const handlePriorityChange = async (event , id , taskName , projectName , projectId) => {
const selectedValue = event.target.value;
const selectedItem = dbPriority.find((item) => item.id === selectedValue);
const selectedPreview = selectedItem ? selectedItem.preview : '';

if (statusRef.current) {
  statusRef.current.value = "";
}
if (priorityRef.current) {
  priorityRef.current.value = "";
}
if (searchRef.current) {
  searchRef.current.value = "";
}
// setSelectedPreview(selectedPreview);

try {
  await axios.put(`http://localhost:5000/task/editPriorityInGroup/${id}`, {
    priority: selectedValue,
  });

  const userNotificationsIds = [
    ...new Set(
      tableData?.flatMap(item =>
        item?.projectUsers?.filter(user => user.projectId === projectId)?.map(user => user.userId)
      )
    )
  ];
  // Remove duplicates by converting to a Set and back to an array
  const uniqueUserNotificationsIds = [...new Set(userNotificationsIds)];
    
  const notification = {
    username: loginData.name,
    projectName: taskName|| 'Unknown Tasks',
    usersID: uniqueUserNotificationsIds,
    text: `${loginData.name} has updated the Task ${taskName} priority in ${ projectName || 'the project'} `,
    time: new Date().toLocaleString(),
    route: `/tasks`,
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




  const handleStatusChange = (e) => {
    const status = e.target.value;
    if (priorityRef.current) {
      priorityRef.current.value = "";
    }
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    axios.get(`http://localhost:5000/task/filter/`, { params: { status } })  
    .then((res) => {
        setTableData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handlePriorityFilterChange = (e) => {
    const priority = e.target.value;
    if (statusRef.current) {
      statusRef.current.value = "";
    }
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    axios.get(`http://localhost:5000/task/filter/`, { params: { priority } })
    .then((res) => {
        setTableData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    if (statusRef.current) {
      statusRef.current.value = "";
    }
    if (priorityRef.current) {
      priorityRef.current.value = "";
    }
    axios.get(`http://localhost:5000/task/filter/`, { params: { search } })
    .then((res) => {
        setTableData(res.data);
        console.log("Search Data: ", res.data);
    })
    .catch((err) => {
      console.log(err);
    });
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
    <div>
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-3 mb-3">
      <select
        aria-label="Default select example"
        className="form-select text-capitalize"
        id="status_filter"
        ref={statusRef}
        onChange={handleStatusChange}
      >
        <option value="">All</option>
        {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
          <option className={`bg-label-${dbItem.preview} text-capitalize`}value={dbItem.id}>
            {dbItem.status}
          </option>
        ))}   
      </select>
      </div>
      <div className="col-md-3 mb-3">
        <select
          aria-label="Default select example"
          className="form-select"
          id="sort" 
          ref={priorityRef}
          onChange={handlePriorityFilterChange}
        >
          <option value="">
            Sort By
          </option>
          {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
          <option className={`bg-label-${dbItem.preview} text-capitalize`}value={dbItem.id}>
            {dbItem.status}
          </option>
        ))}   
        </select>
      </div>
      <div className="col-md-6 mb-3">
          <input type="text " ref={searchRef} placeholder="Search User" onChange={handleSearchChange} className="form-control w-100"/>
      </div>
      
      
    </div>
    <div class="alert alert-warning" role="alert">
          Note: Double Tap to see full task.
          </div>
                 
    <div
              className="card pt-4 pb-4 px-3 d-flex flex-row"
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
          <div className="card-subtitle text-muted mb-3">
         {item.task.projectName}
      </div>
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
                onChange={(event) => handleChange(event, item?.task?.id , item?.task?.taskName , item?.task?.projectName , item?.task?.projectId)}
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
                onChange={(event) => handlePriorityChange(event, item.task.id  , item?.task?.taskName , item?.task?.projectName , item?.task?.projectId)}
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
                        <Link to={`/viewTask/${item.task.id}`}>
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
                            onChange={(event) => handleChange(event, item?.task?.id , item?.task?.taskName , item?.task?.projectName , item?.task?.projectId)}
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
                   {/* {Object.keys(groupedItems).map((status, index) => (
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
            ) : (
              <div className="m-2" data-status="0" id="default" style={{ height: '' }}>
                <div className="card cursor-pointer p-0 shadow" data-task-id={item.task.id}>
                  <div className="card-body px-3 py-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">
                        <Link to={`/viewTask/${item.task.id}`}>
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
                            onChange={(event) => handleChange(event, item.task.id)}
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

 
      
    </div>
          ))} */}

            </div>
  
      </div>
    </div>
  );
};

export default Tasks;

// Latest

// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Pagination } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Swal from 'sweetalert2';
// const Tasks = () => {
//   const {id} = useParams();    
//   const [data , setData] = useState([]);
//   const [dbStatus , setDbStatus] = useState([]);
//   const navigate = useNavigate();
//   const [dbPriority, setDbPriority] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [taskId, setTaskId] = useState(null);
  
// const statusRef = useRef(null);
// const priorityRef = useRef(null);
// const searchRef = useRef(null);



//   const fetchProjectData = () =>{
//     axios.get(`http://localhost:5000/project/getProject/${id}`)
//     .then((res) => {
//         console.log("Reposne: ",res.data);
//         setData(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//   }
//   useEffect(() => {
//     fetchProjectData();
//     }, []);

//     const formatDate = (dateString) => {
//       const options = { year: 'numeric', month: 'long', day: 'numeric' };
//       return new Date(dateString).toLocaleDateString(undefined, options);
//     };


//     const [tableData , setTableData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10); // Adjust items per page as needed
  
//     const fetchData = () => {
//       axios
//         .get(`http://localhost:5000/task/tasks/`)
//         .then((res) => {
//           setTableData(res.data);
//           console.log("All Tasks",res.data);
//         })
//         .catch((err) => {
//           console.log("Error fetching providers:", err);
//         });
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, []);

// // Pagination handling



// // For project


// const handleProjectChange = async (event , id) => {
// // alert(id)

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// // const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
//     status: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchProjectData();
//   } catch (error) {
//   console.error('Error updating status:', error);
// }
// };

// const handleProjectPriorityChange = async (event , id) => {
// // alert(id)

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// // const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
//     priority: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchProjectData();
//   } catch (error) {
//   console.error('Error updating status:', error);
// }
// };









// useEffect(() => {
//   axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
//   .then((res) => {
//     setDbStatus(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }, []);


// const groupedItems = dbStatus.reduce((acc, status) => {
//   acc[status.status] = tableData.filter(item => item?.status[0] && item.status[0]?.status === status?.status);
//   return acc;
// }, {});

// const handleDelete = (id) => {
// axios
//   .delete(`http://localhost:5000/task/deleteTask/${id}`)
//   .then((res) => {
//     // console.log(res.data);
//     fetchData();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };


// const handleChange = async (event , id) => {

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';


// if (statusRef.current) {
//   statusRef.current.value = "";
// }
// if (priorityRef.current) {
//   priorityRef.current.value = "";
// }
// if (searchRef.current) {
//   searchRef.current.value = "";
// }
// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
//     status: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchData();
// } catch (error) {
//   console.error('Error updating status:', error);
// }
// };


// const fetchPriorities = async () => {
// try {
//   const statusRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
//   setDbPriority(statusRes.data);
// } catch (err) {
//   console.log(err);
// }
// };


// useEffect(() => {
// fetchPriorities();
// }, []);

// const handlePriorityChange = async (event , id) => {
// const selectedValue = event.target.value;
// const selectedItem = dbPriority.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';

// if (statusRef.current) {
//   statusRef.current.value = "";
// }
// if (priorityRef.current) {
//   priorityRef.current.value = "";
// }
// if (searchRef.current) {
//   searchRef.current.value = "";
// }
// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/task/editPriority/${id}`, {
//     priority: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchData();
// } catch (error) {
//   console.error('Error updating status:', error);
// }
// };




//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     if (priorityRef.current) {
//       priorityRef.current.value = "";
//     }
//     if (searchRef.current) {
//       searchRef.current.value = "";
//     }
//     axios.get(`http://localhost:5000/task/filter/`, { params: { status } })  
//     .then((res) => {
//         setTableData(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };

//   const handlePriorityFilterChange = (e) => {
//     const priority = e.target.value;
//     if (statusRef.current) {
//       statusRef.current.value = "";
//     }
//     if (searchRef.current) {
//       searchRef.current.value = "";
//     }
//     axios.get(`http://localhost:5000/task/filter/`, { params: { priority } })
//     .then((res) => {
//         setTableData(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };

//   const handleSearchChange = (e) => {
//     const search = e.target.value;
//     if (statusRef.current) {
//       statusRef.current.value = "";
//     }
//     if (priorityRef.current) {
//       priorityRef.current.value = "";
//     }
//     axios.get(`http://localhost:5000/task/filter/`, { params: { search } })
//     .then((res) => {
//         setTableData(res.data);
//         console.log("Search Data: ", res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//       <div className="row">
//       <div className="col-md-3 mb-3">
//       <select
//         aria-label="Default select example"
//         className="form-select text-capitalize"
//         id="status_filter"
//         ref={statusRef}
//         onChange={handleStatusChange}
//       >
//         <option value="">All</option>
//         {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
//           <option className={`bg-label-${dbItem.preview} text-capitalize`}value={dbItem.id}>
//             {dbItem.status}
//           </option>
//         ))}   
//       </select>
//       </div>
//       <div className="col-md-3 mb-3">
//         <select
//           aria-label="Default select example"
//           className="form-select"
//           id="sort" 
//           ref={priorityRef}
//           onChange={handlePriorityFilterChange}
//         >
//           <option value="">
//             Sort By
//           </option>
//           {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
//           <option className={`bg-label-${dbItem.preview} text-capitalize`}value={dbItem.id}>
//             {dbItem.status}
//           </option>
//         ))}   
//         </select>
//       </div>
//       <div className="col-md-5 mb-3">
//           <input type="text " ref={searchRef} placeholder="Search User" onChange={handleSearchChange} className="form-control w-100"/>
//       </div>
//       <div className="col-md-1 d-flex w-10 h-100 mt-1">
//       <button
//             className="btn btn-sm nd btn-primary me-2"
//             style={{marginLeft:'-15px' }}
//             data-bs-original-title="Filter"
//             data-bs-placement="left"
//             data-bs-toggle="tooltip"
//             id="tags_filter"
//             type="button"
//             onClick={() =>navigate('/addProject')}
//           >
//             <i className="bx bx-plus" />
//           </button>
//           <button
//             className="btn btn-sm btn-primary "
//             data-bs-original-title="List View"
//             data-bs-placement="left"
//             data-bs-toggle="tooltip"
//             type="button"
//           >
//             <i className="bx bx-list-ul" />
//           </button>
      
        
//       </div>

      
//     </div>

                 
//     <div
//               className="card pt-4 pb-4 px-3 d-flex flex-row"
//               style={{
//                 overflowX: 'auto', // Use 'auto' instead of 'scroll' for better UX
//               }}
//             >
//                   {Object.keys(groupedItems).map((status, index) => (
//     <div key={status} className="col" style={{ display: 'inline-block' }}>
//         <h4 className="fw-bold  text-capitalize text-center mb-5">{status}</h4>
        
//         {groupedItems[status].length > 0 ? (
//             groupedItems[status].map((item) => (
//                 <div key={item.task.id} style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '252px' }}>
//                     <div className=" m-2 " data-status="0" id="default" style={{ height: '' }}>
//                     <div
//           className="card m-2 p-0 shadow"
//           data-task-id={item.task.id}
//         >
//           <div className="card-body">
//             <div className="d-flex justify-content-between">
//               <h6 className="card-title">
//                 <Link
//                 to={`/viewTask/${item.task.id}`}
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
//               <div>
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
//                     </div>
//                 </div>
//             ))
//         ) : (
//           <div  className="mt-4" style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '250px' }}>
//                  <div
//                  className="card mt-3 shadow mx-2"
//                  data-task-id="93"
//                >
//                  <div className="card-body p-2 overflow-hidden" style={{minHeight:'358px' }}>
//                    <h3 className='text-center' style={{marginTop:'15%'}}>No Tasks</h3>
//                    <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'7%'}}>
//                    <img src="/assets/images/empty-task.png" alt=""  style={{width:'170px' , height:'170px' , objectFit:"contain" }}/>
//                    </div>
//                  </div>
//                </div>
//                </div>
//         )}
//     </div>
// ))}


//             </div>
  
//       </div>
//     </div>
//   );
// };

// export default Tasks;



















// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Pagination } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Swal from 'sweetalert2';
// const Tasks = () => {
//   const {id} = useParams();    
//   const [data , setData] = useState([]);
//   const [dbStatus , setDbStatus] = useState([]);
//   const navigate = useNavigate();
//   const [dbPriority, setDbPriority] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [taskId, setTaskId] = useState(null);


//   const fetchProjectData = () =>{
//     axios.get(`http://localhost:5000/project/getProject/${id}`)
//     .then((res) => {
//         console.log("Reposne: ",res.data);
//         setData(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//   }
//   useEffect(() => {
//     fetchProjectData();
//     }, []);

//     const formatDate = (dateString) => {
//       const options = { year: 'numeric', month: 'long', day: 'numeric' };
//       return new Date(dateString).toLocaleDateString(undefined, options);
//     };


//     const [tableData , setTableData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10); // Adjust items per page as needed
  
//     const fetchData = () => {
//       axios
//         .get(`http://localhost:5000/task/tasks/`)
//         .then((res) => {
//           setTableData(res.data);
//           console.log("All Tasks",res.data);
//         })
//         .catch((err) => {
//           console.log("Error fetching providers:", err);
//         });
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, []);

// // Pagination handling



// // For project


// const handleProjectChange = async (event , id) => {
// // alert(id)

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// // const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
//     status: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchProjectData();
//   } catch (error) {
//   console.error('Error updating status:', error);
// }
// };

// const handleProjectPriorityChange = async (event , id) => {
// // alert(id)

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// // const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
//     priority: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchProjectData();
//   } catch (error) {
//   console.error('Error updating status:', error);
// }
// };










// // Calculate current items to display based on currentPage and itemsPerPage
// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


// useEffect(() => {
//   axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
//   .then((res) => {
//     setDbStatus(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }, []);


// console.log("currentItems: ", currentItems);
// const groupedItems = dbStatus.reduce((acc, status) => {
//   acc[status.status] = currentItems.filter(item => item?.status[0] && item.status[0]?.status === status?.status);
//   return acc;
// }, {});

// const handleDelete = (id) => {
// axios
//   .delete(`http://localhost:5000/task/deleteTask/${id}`)
//   .then((res) => {
//     // console.log(res.data);
//     fetchData();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };


// const handleChange = async (event , id) => {

// const selectedValue = event.target.value;
// const selectedItem = dbStatus.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/task/editStatus/${id}`, {
//     status: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchData();
// } catch (error) {
//   console.error('Error updating status:', error);
// }
// };


// const fetchPriorities = async () => {
// try {
//   const statusRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
//   setDbPriority(statusRes.data);
// } catch (err) {
//   console.log(err);
// }
// };


// useEffect(() => {
// fetchPriorities();
// }, []);

// const handlePriorityChange = async (event , id) => {
// const selectedValue = event.target.value;
// const selectedItem = dbPriority.find((item) => item.id === selectedValue);
// const selectedPreview = selectedItem ? selectedItem.preview : '';

// // setSelectedPreview(selectedPreview);

// try {
//   await axios.put(`http://localhost:5000/task/editPriority/${id}`, {
//     priority: selectedValue,
//   });
//   // Re-fetch task data after update
//   fetchData();
// } catch (error) {
//   console.error('Error updating status:', error);
// }
// };





//   return (
//     <div>
//       <div className=" container-fluid">
      


//       <div className="row">
//           <div className="col-lg-12 col-md-12 col-sm-12 col-12">
//             <div
//               style={{ borderRadius: "6px" }}
//               className="card-body   mt-0  border-radius-lg"
//             >

                          
//             <div
//               className="card pt-4 pb-4 px-3 d-flex flex-row"
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
//           className="card m-2 p-0 shadow"
//           data-task-id={item.task.id}
//         >
//           <div className="card-body">
//             <div className="d-flex justify-content-between">
//               <h6 className="card-title">
//                 <Link
//                 to={`/viewTask/${item.task.id}`}
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
//               <div>
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
//       <div  className="mt-4" style={{ backgroundColor: 'none', maxWidth: '100%', minWidth: '250px' }}>
//       <div
//       className="card mt-3 shadow mx-2"
//       data-task-id="93"
//     >
//       <div className="card-body p-2 overflow-hidden" style={{minHeight:'358px' }}>
//         <h3 className='text-center' style={{marginTop:'15%'}}>No Tasks</h3>
//         <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'7%'}}>
//         <img src="/assets/images/empty-task.png" alt=""  style={{width:'170px' , height:'170px' , objectFit:"contain" }}/>
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
//       </div>
//     </div>
//   );
// };

// export default Tasks;
