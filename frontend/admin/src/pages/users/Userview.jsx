import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAppContext } from '../../context/AppContext';
import Opentasks from './OpenTasks';
const Userview = () => {
  const {id} = useParams();
  const [data1, setData1] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`http://localhost:5000/admin/team/${id}`)
      .then((res) => {
        console.log(res.data);
          setData1(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
  }, [id]);



  const handleBack = () => {
    navigate("/manageUsers");
  };



  const [data, setData] = useState([]);
  const [username, setUsername] = useState(""); 
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dbStatus , setDbStatus] = useState([]);
  const [dbPriority, setDbPriority] = useState([]);
  const {socket} = useAppContext();
  const itemsPerPage = 10;
  const activeId = localStorage.getItem("id");


  useEffect(() => {
    axios.get(`http://localhost:5000/admin/adminInfo/`, {
      headers: { Authorization: `${activeId}` }
    })
    .then((res) => {
      setUsername(res.data.name);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [activeId]);
  const fetchData = () => {
    axios.get(`http://localhost:5000/project/getAllMemberProjects/${id}`)
      .then((res) => {
        console.log("Projects",res.data);
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
  

  const statusRef = useRef(null);
  const priorityRef = useRef(null);
  const searchRef = useRef(null);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    const status = e.target.value;
    if (priorityRef.current) {
      priorityRef.current.value = "";
    }
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    axios.get(`http://localhost:5000/project/filter/${activeId}`, { params: { status } })  
    .then((res) => {
      setData(res.data);
     
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
    axios.get(`http://localhost:5000/project/filter/${activeId}`, { params: { priority } })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  

  const [favId, setFavId] = useState({});

  const fetchFavData = () => {
    axios.get(`http://localhost:5000/project/getFavProjectId/`, {
      params: { id: activeId  }
    })
      .then((res) => {
        console.log("Favorite Projects:", res.data.map((item) => item.projectId));
        setFavId(res.data?.map((item) => item?.projectId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFavData();
  }, [activeId]);

  const [fav, setFav] = useState({});
  
  const handleFavorite = async (id) => {
    const userId = localStorage.getItem("id");
    
    const isCurrentlyFav = fav[id];
  
    try {
      // Optimistic UI update
      setFav((prevFav) => ({
        ...prevFav,
        [id]: !prevFav[id],
      }));
  
      if (!isCurrentlyFav) {
        // If the project is not currently favorited, favorite it
        await axios.post(`http://localhost:5000/project/favProject`, {
          projectId: id,
          userId: userId,
        });
      } else {
        // If the project is currently favorited, unfavorite it
        await axios.delete(`http://localhost:5000/project/favProject`, {
          data: {
            projectId: id,
            userId: userId,
          },
        });
      }
      // Refresh favorite data after the operation
      fetchFavData();
    } catch (error) {
      console.error('Error updating favorite:', error);
      // Revert the optimistic UI update if there's an error
      setFav((prevFav) => ({
        ...prevFav,
        [id]: isCurrentlyFav,
      }));
    }
  };


  const [taskCount, setTaskCount] = useState(0);

  // Callback function to receive task length
  const handleTaskCount = (length) => {
      setTaskCount(length);
  };

  















  
  
  const handleChange = async (event , id , projectName , usersID) => {
    // alert(id)
    console.log("Onchange: ",id , projectName , usersID);
    
  
    const selectedValue = event.target.value;
    const selectedItem = dbStatus.find((item) => item.id === selectedValue);
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
      await axios.put(`http://localhost:5000/project/editStatus/${id}`, {
        status: selectedValue,
      });
      const notification = {
        username:username,
        projectName:projectName,
        usersID:usersID.map(item => item.id),
        text:`${username} has updated ${projectName} status.`,
        time: new Date().toLocaleString(),
        route: `/manage`,
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
  


  const handlePriorityChange = async (event , id , projectName , usersID) => {
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
      await axios.put(`http://localhost:5000/project/editPriority/${id}`, {
        priority: selectedValue,
      });

      const notification = {
        username:username,
        projectName:projectName,
        usersID:usersID.map(item => item.id),
        text:`${username} has updated ${projectName} priority.`,
        time: new Date().toLocaleString(),
        route: `/manage`,
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
  return (
        <>
           
    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item text-capitalize"> {data1.name} </li>
            <li className="breadcrumb-item active"> Profile</li>
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
              className="form-submit-event"
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
              <input type="hidden" name="_method" />{" "}
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                <img
                  src={ data1.pfpImage }
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  style={{ objectFit: "cover" }}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper mb-4">
                  <h3 className="text-capitalize">{data1.name}</h3>
                  <p className='font-weight-bold texxt-muted ' style={{marginTop:'-13px'}}>{data1.email}</p>
                </div>
              </div>
            </form>
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <form
              id="formAccountSettings"
              encType="multipart/form-data"
              className="form-submit-event"
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
                    First Name 
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Please Enter First Name"
                    autofocus=""
                    value={data1.name || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="email">
                    E-mail 
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Please Enter Email"
                    value={data1.email || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="phone"
                    name="contact"
                    placeholder="Please Enter Phone Number"
                    className="form-control"
                    value={data1.contact || "-"}
                    
                  />
                </div>
               
                {/* <div className="mb-3 col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password{" "}
                    <small className="text-muted">
                      {" "}
                      (Leave it blank if no change)
                    </small>
                  </label>
                  <input
                    readOnly
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
                    readOnly
                    className="form-control"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Please Re Enter Password"
                  />
                </div> */}
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="role">
                    Role 
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="address"
                    placeholder="Please Enter Address"
                    name="role"
                    value={data1.role || "-"}
                    
                  />
                

                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="address"
                    placeholder="Please Enter Address"
                    name="address"
                    value={data1.address || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="address">
                    Description
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="description"
                    placeholder="Please Enter Description"
                    name="description"
                    value={data1.description || "-"}
                    
                  />
                </div>
                {/* <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    readOnly
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
                    readOnly
                    className="form-control"
                    type="text"
                    id="state"
                    placeholder="Please Enter State"
                    name="state"
                    defaultValue="ON"
                  />
                </div> */}
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="country">
                    Country
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    id="country"
                    placeholder="Please Enter Country"
                    name="country"
                    value={data1.country || "-"}
                    
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="number"
                    id="zip"
                    placeholder="Please Enter ZIP Code"
                    name="postalCode"
                    value={data1.postalCode || "-"}
                    
                  />
                </div>
              
              
              </div>
            </form>
            {/* /Account */}


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
        <i class="menu-icon tf-icons bx bx-briefcase-alt text-success"></i>
        Projects{"  "}
        <span className='badge bg-success'>{data?.length} </span>
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
        <i class="menu-icon tf-icons bx bx-task text-primary"></i>
        Tasks {"  "}
        <span className='badge bg-primary'>{taskCount && taskCount} </span>

      </button>
    </li>
  </ul>

  <div class="tab-content">
    <div
      class="tab-pane fade show active"
      id="navs-top-tasks-1"
      role="tabpanel"
    >
    <div className="">
   
   
    <div className="mt-4 d-flex row">
    {data.length > 0 && data.map((item ,index)=>{
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
                  className=" cursor-pointer"
                  onClick={()=> handleFavorite(item.project.id)}
                >
                  <i
  className={
    favId?.includes(item?.project?.id)
      ? 'bx bxs-star favorite-icon text-warning m-0' 
      : 'bx bx-star favorite-icon text-warning m-0'
  }
  data-bs-original-title="Click to Remove from Favorite"
  data-bs-placement="right"
  data-bs-toggle="tooltip"
  data-favorite="1"
  data-id="419"
/>

                </a>
                  <a
                    aria-expanded="false"
                    className="mx-1"
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
                      onChange={(event) => handleChange(event, item.project?.id , item.project?.projectName , item?.users)}
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
                      onChange={(event) => handlePriorityChange(event, item.project?.id , item.project?.projectName , item?.users)}
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
              <a >
                <button
                  className="btn btn-sm rounded-pill btn-outline-primary"
                  type="button"
                  onClick={() => navigate(`/projectInformation/${item.project.id}`)}
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
     

     {data.length === 0 &&
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

            <img src="../assets/images/no_media.jpg" alt="" />
           
          </div>
        
        
        </div>
      </div>
        </div>
      </div> 
      }

     {/* Pagination */}
     {/* <Pagination className="mt-3 justify-content-center">
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
        </Pagination> */}
    </div>
   
            </div>
    </div>

    <div
      class="tab-pane fade"
      id="navs-top-documents-1"
      role="tabpanel"
    >
      <div className="row mt-3">

    <Opentasks id={id} onTaskCountChange={handleTaskCount}  />
        
      </div>
    </div>
  </div>
</div>

            
          </div>




          
          
        </div>
      </div>
    </div>
   
    </div>
    </>
  )
}

export default Userview
