import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from "react-bootstrap";
import { useAppContext } from '../../context/AppContext';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';


const Manage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(""); 
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dbStatus , setDbStatus] = useState([]);
  const [dbPriority, setDbPriority] = useState([]);
  const {socket} = useAppContext();
  const itemsPerPage = 10;
  const activeId = localStorage.getItem("id");

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  
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
  const fetchData = (page = 1) => {
    axios.get(`http://localhost:5000/project/getAllProject?page=${page}&limit=10`)
      .then((res) => {
        console.log("Projects", res.data);
        setData(res.data.data);
        setTotalItems(res.data.totalItems);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  
  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // `selected` is zero-based
    fetchData(page);
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
    axios.get(`http://localhost:5000/project/filter/`, { params: { status } })  
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
    axios.get(`http://localhost:5000/project/filter/`, { params: { priority } })
    .then((res) => {
      setData(res.data);
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
    setStartDate("");
    setEndDate("");
    axios.get(`http://localhost:5000/project/filter/`, { params: { search } })
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
        setStartDate("");
        setEndDate("");
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
  setStartDate("");
  setEndDate("");
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
  

  const [favId, setFavId] = useState({});

  const fetchFavData = () => {
    axios.get(`http://localhost:5000/project/getFavProjectId/`, {
      params: { id: activeId  }
    })
      .then((res) => {
        console.log("Favorite Projects:", res.data.map((item) => item.projectId));
        setFavId(res.data.map((item) => item.projectId));
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

  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    
if (statusRef.current) {
  statusRef.current.value = "";
}
if (priorityRef.current) {
  priorityRef.current.value = "";
}
if (searchRef.current) {
  searchRef.current.value = "";
}
    setStartDate(e.target.value);
    // Add any additional logic here, such as filtering data based on the start date
  };

  const handleEndDateChange = (e) => {
    
if (statusRef.current) {
  statusRef.current.value = "";
}
if (priorityRef.current) {
  priorityRef.current.value = "";
}
if (searchRef.current) {
  searchRef.current.value = "";
}
    setEndDate(e.target.value);
    // Add any additional logic here, such as filtering data based on the end date
  };


  useEffect(() => {
    if (startDate && endDate) {
      axios.get(`http://localhost:5000/project/filterByDate/` , {
        params: { startDate, endDate }
      })
        .then((res) => {
          console.log(res.data);
          
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchData();
    }
  },[startDate , endDate]);
  // import * as XLSX from 'xlsx';
  // const XLSX = require('xlsx');

  const generateExcel = (data) => {
    // Define headers and map them to your data keys
    const headers = [
        { header: "ID", key: "id" },
        { header: "Project Name", key: "projectName" },
        { header: "Task Name", key: "taskName" },
        { header: "User Name", key: "userName" },
        { header: "Task Status", key: "taskStatus" },
        { header: "Log hours", key: "userWorktime" },
        { header: "Start Date", key: "startDate" },
        { header: "End Date", key: "endDate" }
    ];

    // Flatten the data to match the headers
    const formattedData = data.flatMap(item => 
        item.tasks.flatMap(task => 
            task.users.flatMap(user => {
                // Check if userWorktime is an array with more than one item
                if (Array.isArray(user.worktime) && user.worktime.length > 1) {
                    return user.worktime.map((worktime, index) => ({
                        id: user.id,
                        projectName: task.task.projectName,
                        taskName: task.task.taskName,  // Accessing taskName directly from task
                        userName: user.name,
                        taskStatus: task.task.status.status,
                        userWorktime: `${worktime.hour}:${worktime.min} h`,  // Set worktime for each entry
                        startDate: formatDate(task.task.startAt),
                        endDate: formatDate(task.task.endAt)
                    }));
                } else {
                    // Handle the case where userWorktime is not an array or has only one item
                    return [{
                        id: user.id,
                        projectName: task.task.projectName,
                        taskName: task.task.taskName,  // Accessing taskName directly from task
                        userName: user.name,
                        taskStatus: task.task.status.status,
                        userWorktime: user.worktime?.map((item) => `${item.hour}:${item.min} h`).join(', ') || '0 h',  // Ensure worktime exists
                        startDate: formatDate(task.task.startAt),
                        endDate: formatDate(task.task.endAt)
                    }];
                }
            })
        )
    );

    console.log("formattedData:", formattedData);

    // Create a new worksheet with headers
    const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers.map(h => h.key) });

    // Optional: Adjust column width
    const columnWidths = headers.map(header => ({ wch: header.header.length + 10 }));
    ws['!cols'] = columnWidths;

    // Optional: Add styling to header cells (e.g., bold text)
    headers.forEach((header, index) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
        if (!ws[cellRef]) ws[cellRef] = {};
        ws[cellRef].v = header.header;
        ws[cellRef].s = { font: { bold: true } }; // Apply bold to header
    });

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `FilteredData_${new Date().toISOString().slice(0, 10)}.xlsx`);
};


  
  


  return (
    <>
     
    <div className="container-fluid">
    
    <div className="row">
      <div className="col-md-2 mb-3">
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
      <div className="col-md-2 mb-3">
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
      <div className="col-md-2 mb-3">
        <input 
          type="date" 
          className="form-control" 
          value={startDate} 
          onChange={handleStartDateChange} 
        />
      </div>

      <div className="col-md-2 mb-3">
        <input 
          type="date" 
          className="form-control" 
          value={endDate} 
          onChange={handleEndDateChange} 
        />
      </div>

      <div className="col-md-4 mb-3 ">
         <div className="row">
          <div className="col-8">

          <input type="text " ref={searchRef} placeholder="Search User" onChange={handleSearchChange} className="form-control w-100"/>
          
          </div>
          <div className="col-1">
          <div className="d-flex justify-content-between">
          <button
          style={{marginTop:'2px'}}
            className="btn btn-sm nd btn-primary me-3"
            // style={{marginLeft:'-15px' }}
            data-bs-original-title="Filter"
            data-bs-placement="left"
            data-bs-toggle="tooltip"
            id="tags_filter"
            type="button"
            onClick={() =>navigate('/addProject')}
          >
            <i className="bx bx-plus" />
          </button>
          
          <div class="dropdown">
  <button style={{ marginTop:'2px'}} class="btn btn-sm nd btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="bx bx-list-ul" />

  </button>
 
  <div class="dropdown-menu" style={{marginLeft:'-130px'}} aria-labelledby="dropdownMenuButton">
    <span class="dropdown-item cursor-pointer"  onClick={() =>generateExcel(data)}><i class='bx bx-cloud-download' style={{fontSize:'22px'}} ></i>{"  "}Export Data </span>
    <span class="dropdown-item disabled" >More</span>
  </div>
</div>
          
          
          </div>
          </div>
         </div>
         
      </div>
      {/* <div className="col-md-1 d-flex w-10 h-100 mt-1">
     
        
      </div> */}
    </div>
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

            <img src="./assets/images/no_media.jpg" alt="" />
           
          </div>
        
        
        </div>
      </div>
        </div>
      </div> 
      }

     {/* Pagination */}
     <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
    </div>
   
  </div>
    </>
  )
}

export default Manage




