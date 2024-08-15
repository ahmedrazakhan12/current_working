

import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from "react-bootstrap";
import { useAppContext } from '../context/AppContext';

const MManageProject = () => { const navigate = useNavigate();
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
    axios.get(`http://localhost:5000/project/getAllMemberProjects/${activeId}`)
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

  

  return (
    <>
     
    <div className="container-fluid">
    
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
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
      <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
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
      {/* <div className="col-md-5 mb-3">
          <input type="text " ref={searchRef} placeholder="Search User" onChange={handleSearchChange} className="form-control w-100"/>
      </div> */}
      
    </div>
    <div className="mt-4 d-flex row">
      {data.map((item ,index)=>{
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
                      style={{pointerEvents:'none' }}
                    //   onChange={(event) => handleChange(event, item.project?.id , item.project?.projectName , item?.users)}
                    >

                    <option className={`bg-label-${item.status[0]?.preview}`} >
                    {item.status[0]?.status}
                      </option>
                      {/* {dbStatus && dbStatus.length > 0 && dbStatus.map((dbItem, dbIndex) => (
                      <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
                        {dbItem.status}
                      </option>
                    ))} */}
                   
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
                      style={{pointerEvents:'none' }}

                    //   onChange={(event) => handlePriorityChange(event, item.project?.id , item.project?.projectName , item?.users)}
                    >

                    <option className={`bg-label-${item.priority[0]?.preview}`} >
                    {item.priority[0]?.status}
                      </option>
                      {/* {dbPriority && dbPriority.length > 0 && dbPriority.map((dbItem, dbIndex) => (
                      <option className={`bg-label-${dbItem.preview}`}value={dbItem.id}>
                        {dbItem.status}
                      </option>
                    ))} */}
                   
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

            <img src="./assets/images/no_media.jpg" alt="" />
           
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
    </>
  )
}

export default MManageProject




