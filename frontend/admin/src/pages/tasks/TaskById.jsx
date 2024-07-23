import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
const TaskById = ({ show, handleClose, taskId }) => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({});
  const [user, setUsers] = useState([]);
  const [dbStatus, setDbStatus] = useState([]);
  // const [selectedPreview, setSelectedPreview] = useState(taskData?.preview);
  const [priority, setPriority] = useState([]);
  const [dbPriority, setDbPriority] = useState([]);
  const [status, setStatus] = useState([]);

  const { AppContextStatus } = useAppContext();

  const fetchData = async () => {
    try {
      const taskRes = await axios.get(`http://localhost:5000/task/getTask/${taskId}`);
      const task = taskRes.data[0]?.task;
      const users = taskRes.data[0]?.users;
      const status = taskRes.data[0]?.status;
      const priority = taskRes.data[0]?.priority;
      setTaskData(task);
      setUsers(users);
      setPriority(priority);
      setStatus(status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!show || !taskId) return;
    fetchData();
  }, [show, taskId]);

  const fetchPriorities = async () => {
    try {
      const statusRes = await axios.get('http://localhost:5000/projectPriority/getAllPriorities');
      setDbPriority(statusRes.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchStatuses = async () => {
    try {
      const statusRes = await axios.get('http://localhost:5000/projectStatus/getAllStatus');
      setDbStatus(statusRes.data);
      const matchedStatus = statusRes.data.find((item) => item.status === taskData?.status);
      if (matchedStatus) {
        // setSelectedPreview(matchedStatus.preview);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStatuses();
    fetchPriorities();
  }, []);

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    const selectedItem = dbStatus.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : '';

    // setSelectedPreview(selectedPreview);

    try {
      await axios.put(`http://localhost:5000/task/editStatus/${taskId}`, {
        status: selectedValue,
      });
      // Re-fetch task data after update
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const handlePriorityChange = async (event) => {
    const selectedValue = event.target.value;
    const selectedItem = dbPriority.find((item) => item.id === selectedValue);
    const selectedPreview = selectedItem ? selectedItem.preview : '';

    // setSelectedPreview(selectedPreview);

    try {
      await axios.put(`http://localhost:5000/task/editPriority/${taskId}`, {
        priority: selectedValue,
      });
      // Re-fetch task data after update
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

 
    
  return (
    <>
   <Modal show={show} onHide={handleClose} fullscreen={true}>
    <Modal.Header closeButton>
      <Modal.Title style={{marginLeft:'4%'}}>{taskData?.taskName}</Modal.Title>
    </Modal.Header>
    <Modal.Body >
    <div className="container">
 
  <div className="row">
    <div className="col-md-12">
      <div className=" mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
            
              <div className="row">
                <div className="col-md-12 mt-3 mb-3">
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
                              style={{ objectFit: 'cover' }}
                              src={user.pfpImage}
                              alt={user.name}
                            />
                          </Link>
                        </li>
                      </React.Fragment>
                    ))
                  ) : (
                    <span className="badge bg-primary">Not Assigned</span>
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
                  <label htmlFor="" className="form-label">Status</label>
                  {status && status.length > 0 && status.map((item, index) => (
  <select
    key={index}  // Added key for uniqueness
    className={`form-select form-select-sm select-bg-label-${item?.preview } text-center text-capitalize`}
    id="prioritySelect"
    data-original-color-class="select-bg-label-secondary"
    name="status"
    onChange={handleChange}
  >
    <option className={`bg-label-${item?.preview}`} value={item?.id}>
      {item?.status}
    </option>
    {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
      <option className={`bg-label-${dbItem.preview}`} key={dbIndex} value={dbItem.id}>
        {dbItem.status}
      </option>
    ))}
  </select>
                    ))}

                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="prioritySelect" className="form-label">
                    Priority
                  </label>
                  {priority && priority.length > 0 && priority.map((item, index) => (
                    <select
                      key={index}  // Added key for uniqueness
                      className={`form-select form-select-sm select-bg-label-${item?.preview } text-center text-capitalize`}
                      id="prioritySelect"
                      data-original-color-class="select-bg-label-secondary"
                      name="priority"
                      onChange={handlePriorityChange}
                    >
                      <option className={`bg-label-${item?.preview}`} value={item?.id}>
                        {item?.status}
                      </option>
                      {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
                        <option className={`bg-label-${dbItem.preview}`} key={dbIndex} value={dbItem.id}>
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
          <div className="row">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <div className="input-group input-group-merge">
              <div dangerouslySetInnerHTML={{ __html: taskData?.taskDescription  }} />
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
                  value= {formatDate(taskData?.startAt)}
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
                  value= {formatDate(taskData?.endAt)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" id="media_type_id" defaultValue={93} />
    </div>

</div>    
</div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
       </Modal>
    </> 
  )
}

export default TaskById

































// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import '../../App.css';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { useAppContext } from '../../context/AppContext';
// const TaskById = ({ show, handleClose, taskId }) => {
//   const { id } = useParams();
//   const [taskData, setTaskData] = useState({});
//   const [user, setUsers] = useState([]);
//   const [dbStatus, setDbStatus] = useState([]);
//   const [selectedPreview, setSelectedPreview] = useState(taskData?.preview);
//   const [selectedPriorityPreview,setSelectedPriorityPreview] = useState(taskData?.preview);
// console.log("selectedPriorityPreview" , selectedPriorityPreview);

//   const {
//     AppContextStatus,
//     AppContextPriority
//   } = useAppContext();



//   const [dbPriorities , setDbPriorities] = useState([]);

//   const fetchPriorities = async () => {
//     try {
//       const priorityRes = await axios.get(`http://localhost:5000/projectPriority/getAllPriorities`)
//       setDbPriorities(priorityRes.data);
//       const matchedStatus = priorityRes.data.find((item) => item.status === taskData?.status);
      
//       if (matchedStatus) {
//         setSelectedPriorityPreview(matchedStatus.preview);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {

//     fetchPriorities();
//   }, []);
//   // console.log("AppContextStatus", AppContextStatus);

//   useEffect(() => {
//     if (!show || !taskId) return;

//     const fetchData = async () => {
//       try {
//         const taskRes = await axios.get(`http://localhost:5000/task/getTask/${taskId}`);
//         const task = taskRes.data[0]?.task;
//         const users = taskRes.data[0]?.users;
//         setTaskData(task);
//         setUsers(users);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [show, taskId]);
//   const fetchStatuses = async () => {
//     try {
//       const statusRes = await axios.get('http://localhost:5000/projectStatus/getAllStatus');
//       setDbStatus(statusRes.data);
//       const matchedStatus = statusRes.data.find((item) => item.status === taskData?.status);
      
//       if (matchedStatus) {
//         setSelectedPreview(matchedStatus.preview);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   useEffect(() => {
   

//     fetchStatuses();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const matchedStatus = AppContextStatus.find((item) => item.status === taskData?.status);
//   const previewClass = matchedStatus ? matchedStatus.preview : 'default-class'; // Replace 'default-class' with a fallback if needed


//   // console.log("AppContextPriority" , AppContextPriority);
//   const matchedPriority = AppContextPriority.find((item) => item.status === taskData?.priority);
//   const selectedClassPriority = matchedPriority ? matchedPriority.preview : 'default-class';


// //  console.log("selectedClassPriority" , selectedClassPriority);

//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     const selectedItem = dbStatus.find((item) => item.status === selectedValue);
//     const selectedPreview = selectedItem ? selectedItem.preview : '';

//     setSelectedPreview(selectedPreview);
//     // console.log("selected  VAlue", selectedValue);

//     axios.put(`http://localhost:5000/task/editStatus/${taskId}`, {
//       status: selectedValue,
//     })
//       .then((response) => {
//         console.log('Status updated successfully:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating status:', error);
//       });


//     // Handle the change as needed (e.g., update form state, make an API call, etc.)
//     // console.log('Selected status:', selectedValue);
//     // console.log('Selected preview:', selectedPreview);
//   };

// const handlePriorityChange = (event) => {
//   const selectedValue = event.target.value;
//   const selectedItem = dbPriorities.find((item) => item.status === selectedValue);
//   const selectedPreview = selectedItem ? selectedItem.preview : '';

//   setSelectedPriorityPreview(selectedPreview);

//   // setSelectedClassPreview(selectedPreview);
//   // console.log("setSelectedClassPreview", selectedPreview);

//   axios.put(`http://localhost:5000/task/editPriority/${taskId}`, {
//     priority: selectedValue,
//   })
//     .then((response) => {
//       console.log('Status updated successfully:', response.data);
//     })
//     .catch((error) => {
//       console.error('Error updating status:', error);
//     });

// }
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   switch (name) {
//   //     case "status":
//   //       setTaskData(prevData => ({ ...prevData, status: value }));
//   //       break;
//   //     case "priority":
//   //       setTaskData(prevData => ({ ...prevData, priority: value }));
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };
    
//   return (
//     <>
//    <Modal show={show} onHide={handleClose} fullscreen={true}>
//     <Modal.Header closeButton>
//       <Modal.Title style={{marginLeft:'4%'}}>{taskData?.taskName}</Modal.Title>
//     </Modal.Header>
//     <Modal.Body >
//     <div className="container">
 
//   <div className="row">
//     <div className="col-md-12">
//       <div className=" mb-4">
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-12">
            
//               <div className="row">
//                 <div className="col-md-12 mt-3 mb-3">
//                   <label className="form-label" htmlFor="start_date">
//                     Users
//                   </label>
//                   <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center flex-wrap">
                    
//                   {user && user.length > 0 ? (
//                     user.map((user, index) => (
//                       <React.Fragment key={index}>
//                         <li
//                           className="avatar avatar-sm pull-up"
//                           title={user.name}
//                         >
//                           <Link
//                             to={`/Userview/${user.id}`}
//                             target="_blank"
//                           >
//                             <img
//                               className="rounded-circle"
//                               style={{ objectFit: 'cover' }}
//                               src={user.pfpImage}
//                               alt={user.name}
//                             />
//                           </Link>
//                         </li>
//                       </React.Fragment>
//                     ))
//                   ) : (
//                     <span className="badge bg-primary">Not Assigned</span>
//                   )}
                    
                  
//                     <Link
//                       className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-task update-users-clients"
//                     to={`/editTask/${taskData.id}`}
//                     >
//                       <span className="bx bx-edit" />
//                     </Link>
//                   </ul>
                  
//                 </div>
                
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="" className="form-label">Status</label>
//                   <select
//       className={`form-select form-select-sm select-bg-label-${previewClass || selectedPreview} text-center text-capitalize`}
//       id="prioritySelect"
//       data-original-color-class="select-bg-label-secondary"
//       name="status"
//       onChange={handleChange}
//     >
//       <option className={`bg-label-${previewClass}`} value={taskData?.status}>
//         {taskData?.status}
//       </option>
//       {dbStatus.map((item, index) => (
//         <option className={`bg-label-${item.preview}`} key={index} value={item.status}>
//           {item.status}
//         </option>
//       ))}
//     </select>
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="prioritySelect" className="form-label">
//                     Priority
//                   </label>
//                   <select
//                   className={`form-select form-select-sm select-bg-label-${ selectedPriorityPreviewselectedClassPriority || } text-center text-capitalize`}
//                   id="prioritySelect"
//                   data-original-color-class="select-bg-label-secondary"
//                   name="status"
//                   onChange={handlePriorityChange}

//                 >
//                   <option className={`bg-label-${selectedClassPriority}`} value={taskData?.status} readOnly>
//                     {taskData?.priority}
//                   </option>
//                   {dbPriorities.map((item, index) => (
//                     <option className={`bg-label-${item.preview}`} key={index} value={item.status}>
//                       {item.status}
//                     </option>
//                   ))}
//                 </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-0" />
//         <div className="card-body">
//           <div className="row">
//             <div className="mb-3 col-md-12">
//               <label className="form-label" htmlFor="project">
//                 Project
//               </label>
//               <div className="input-group input-group-merge">
//                 <input
//                   className="form-control px-2"
//                   type="text"
//                   id="project"
//                   value={taskData?.projectName}
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="mb-3">
//               <label className="form-label" htmlFor="description">
//                 Description
//               </label>
//               <div className="input-group input-group-merge">
//               <div dangerouslySetInnerHTML={{ __html: taskData?.taskDescription  }} />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="start_date">
//                 Starts At
//               </label>
//               <div className="input-group input-group-merge">
//                 <input
//                   type="text"
//                   name="start_date"
//                   className="form-control"
//                   placeholder=""
//                   value= {formatDate(taskData?.startAt)}
//                   readOnly
//                 />
//               </div>
//             </div>
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="due-date">
//                 Ends At
//               </label>
//               <div className="input-group input-group-merge">
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="due_date"
//                   placeholder=""
//                   value= {formatDate(taskData?.endAt)}
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <input type="hidden" id="media_type_id" defaultValue={93} />
//     </div>

// </div>    
// </div>

//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleClose}>
//         Close
//       </Button>
//       <Button variant="primary" onClick={handleClose}>
//         Save Changes
//       </Button>
//     </Modal.Footer>
//        </Modal>
//     </> 
//   )
// }

// export default TaskById

