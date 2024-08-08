import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../../App.css';
import Swal from 'sweetalert2';
import { useAppContext } from '../../context/AppContext';

const Meeting = () => {

  const [loginUserInfo, setLoginUserInfo] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [meeting , setMeeting] = useState([]);
  const [usersID, setUsersID] = useState([]);
  const [tags, setTags] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit , setShowEdit] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [newUsers , setNewUsers] = useState([]);
  const [title , setTitle] = useState("");
  const [date , setDate] = useState("");
  const [time , setTime] = useState("");
  const [link ,setLink] = useState("");
  const [dbTags, setDbTags] = useState([]);
  const [creator, setCreator] = useState([]);
  

  const {socket} = useAppContext()


  const [deleteTags, setDeleteTags] = useState([]);
  const navigate = useNavigate();


  
  const max = 10;
  const duplicate = false;
  const activeId = localStorage.getItem("id");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMeetingData = () =>{
    axios.get("http://localhost:5000/meeting/getMeeting")
    .then((res) => {
      setMeeting(res.data);
      console.log("Meeting",res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    fetchMeetingData()
  },[])

  const handleEditClose = () => {
    setShowEdit(false)
    setSelectedMeetingId(null)
    setDeleteTags([])
    setLink("")

  };
  const handleEditShow = (id) => {
    setSelectedMeetingId(id);
    setShowEdit(true);
  };


  useEffect(() => {
    if (selectedMeetingId) {
      axios.get(`http://localhost:5000/meeting/getMeeting/${selectedMeetingId}`)
        .then((res) => {
          const meetingData = res.data;
          const users = res.data[0]?.users;

          setCreator(res.data[0]?.creator);
          console.log(meetingData[0]?.meetings?.link);
          
          setTitle(meetingData[0]?.meetings?.title);
          setDate(meetingData[0]?.meetings?.date);
          setTime(meetingData[0]?.meetings?.time);
          setLink(meetingData[0]?.meetings?.link);

          setUsersID(meetingData[0]?.users?.map((user) => user.id));
          // setTags(meetingData.users); // Assuming users are the tags

          if (users) {
            setNewUsers(users);
            // const userIds = users.map(user => user.name); // Assuming users is an array of user objects
            // setNewUsers(userIds);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedMeetingId]);
  

  useEffect(() => {
    if(show === false){
      setTags([]);
      setUsersID([]);
      setInputValue('');
      // setSuggestions([]);
    }
  },[show])

  const addTag = (tag) => {
    if (anyErrors(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    setInputValue('');
    setSuggestions([]);
  };
  useEffect(() => {
    if (Array.isArray(newUsers)) {
        setDbTags(newUsers);
    }
}, [newUsers]);

  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setLoginUserInfo(res.data);
          console.log("Navbar: ",res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login"); // Redirect to login on 404
          }
        });
    }
  }, [activeId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      axios.get(`http://localhost:5000/admin/search/${e.target.value}`)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSuggestions([]);
    }
  };

  const deleteTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setUsersID((prevIDs) => prevIDs.filter((_, i) => i !== index));
    
  };

  
  const deleteDbTag = (index ,id) => {
    setDeleteTags((prevDeleteIDs) => [...prevDeleteIDs, id]);
    setDbTags((prevIDs) => prevIDs.filter((_, i) => i !== index));

  };

  const anyErrors = (tag) => {
    if (max !== null && tags.length >= max) {
      console.log('Max tags limit reached');
      return true;
    }
    if (!duplicate && tags.includes(tag)) {
      console.log(`Duplicate found: "${tag}"`);
      return true;
    }
    return false;
  };

  const handleKeyDown = (e) => {
    const trimmedValue = inputValue.trim();
    if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
      e.preventDefault();
      if (suggestions.some(suggestion => suggestion.name === trimmedValue)) {
        addTag(trimmedValue);
      } else {
        console.log(`"${trimmedValue}" is not a valid selection.`);
      }
    }
  };


  const handleSuggestionClick = (tag) => {
    addTag(tag.name);
    setUsersID((prevIDs) => [...prevIDs, tag.id]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "date":
        setDate(value);
        break;
      case "link":
        setLink(value);
        break;        // case "time":
      //   setTime(value);
      //   break;
      default:
        break;
    }
  };
  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    
    const [hours, minutes] = inputTime.split(':');
    const hourNumber = parseInt(hours, 10);
    const ampm = hourNumber >= 12 ? 'PM' : 'AM';
    const formattedTime = `${inputTime} ${ampm}`;

    console.log(`Selected time: ${formattedTime}`);
    
    setTime(formattedTime);
    // console.log(`Selected time: ${inputTime} ${ampm}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/meeting/addMeeting", {
        title: title,
        date: date,
        time: time,
        link: link,
        creator: loginUserInfo.id,
        userIds: usersID,
      });
      // navigate(-1);
      const notification = {
        username: loginUserInfo.name,
        projectName: title|| 'Unknown Tasks',
        usersID: usersID,
        text: `${loginUserInfo.name} has added you to a meeting ${title} ` ,
        time: new Date().toLocaleString(),
        route: '/meeting',
      };
      
      socket.emit('newNotification', notification, (response) => {
        if (response && response.status === 'ok') {
          console.log(response.msg);
        } else {
          console.error('Message delivery failed or no response from server');
        }
      });
      fetchMeetingData()
      setDeleteTags([])
      setLink("")
      setTitle("")
      setDate("")
      setTime("")
      setTags([])

      setSelectedMeetingId(null)
      setError(null);
      setShow(false)
      Swal.fire({
        position: 'top-end',
        title: 'Project Added Successfully',
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal'
        },
        timer: 1500
      });
    } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    setError(errorMessage);
    console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.put(`http://localhost:5000/meeting/editMeeting/${selectedMeetingId}`, {
        title: title,
        link: link,
        date: date,
        time: time,
        userIds: usersID,
        deleteUsers: deleteTags,
        link: link
      });

      const notification = {
        username: loginUserInfo.name,
        projectName: title|| 'Unknown Tasks',
        usersID: usersID,
        text: `${loginUserInfo.name} has added you to a meeting ${title} `,
        time: new Date().toLocaleString(),
        route: '/meeting',
      };
      
      socket.emit('newNotification', notification, (response) => {
        if (response && response.status === 'ok') {
          console.log(response.msg);
        } else {
          console.error('Message delivery failed or no response from server');
        }
      });
      // navigate(-1);
      fetchMeetingData()
      setLink("")
      setTitle("")
      setDate("")
      setTime("")
      setDeleteTags([])
      setDbTags([])
      setTags([])
      setSelectedMeetingId(null)

      setError(null);
      setShowEdit(false)
      Swal.fire({
        position: 'top-end',
        title: 'Meeting Edited Successfully',
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal'
        },
        timer: 1500
      });
    } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    setError(errorMessage);
    console.error(error);
    }
  }


  const handleMeetingDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/meeting/deleteMeeting/${id}`);
          fetchMeetingData();
        } catch (error) {
          console.error(error);
        }
        Swal.fire({
          position: 'top-end',
          title: 'Deleted!',
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal'
          },
          timer: 1500
        });
      
      }
    })
  }
 

  const handleSearchMeeting = async (e) => {
    const value = e.target.value;
    if (value) {
      try {
        const res = await axios.get(`http://localhost:5000/meeting/searchMeeting/${value}`);
        setMeeting(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    } else {
      fetchMeetingData();
    }
  }
  

  return (
    <>
    <div className="container-fluid">
    <div className="row">
       <div className="col-lg-12 col-md-12 col-sm-12 col-12">
         <div
           style={{ borderRadius: "6px" }}
           className="card-body p-3  bg-white mt-4 shadow blur border-radius-lg"
         >
           <div className="table-responsive p-2 overflow-hidden">
           <div
               className="pt-2 pb-2 row "
             >
               <div className="col-lg-6">
               <div class="searchbar w-50">
                 <div class="searchbar-wrapper">
                   <div class="searchbar-left">
                     <div class="search-icon-wrapper">
                       <span class="search-icon searchbar-icon">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24"
                         >
                           <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                         </svg>
                       </span>
                     </div>
                   </div>

                   <div class="searchbar-center">
                     <div class="searchbar-input-spacer"></div>

                     <input
                       type="text"
                       class="searchbar-input"
                       onChange={handleSearchMeeting}
                       maxlength="2048"
                       name="q"
                       autocapitalize="off"
                       autocomplete="off"
                       title="Search"
                       role="combobox"
                       placeholder="search meeting"
                     />
                   </div>
                 </div>
               </div>
               </div>
            <div className="col-lg-6">
            <button
            className="btn btn-sm  btn-primary  float-end"
            // style={{marginLeft:'-15px' }}
            data-bs-original-title="Filter"
            data-bs-placement="left"
            data-bs-toggle="tooltip"
            id="tags_filter"
            type="button"
            onClick={handleShow}
          >
            <i className="bx bx-plus" />
                </button>
            </div>
             </div>

             <table id="table" className="table table-bordered ">
               <thead>
                 <tr>
                   <th style={{}} data-field="id">
                     <div className="th-inner sortable both">ID</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{}} data-field="profile">
                     <div className="th-inner ">Title</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{textAlign: "center"}} data-field="profile">
                     <div className="th-inner ">Creator</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="role">
                     <div className="th-inner ">Users</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="phone">
                     <div className="th-inner sortable both desc">
                       Date
                     </div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="assigned">
                     <div className="th-inner ">Time</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="assigned">
                     <div className="th-inner ">Link</div>
                     <div className="fht-cell" />
                   </th>
              
                   <th style={{ textAlign: "center" }} data-field="actions">
                     <div className="th-inner ">Actions</div>
                     <div className="fht-cell" />
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {meeting.map((item, index) => (
                   <tr key={index}>
                     <td>{index + 1}</td>
                     <td>
                       <div className="d-flex mt-2">
                         
                         <div className="mx-2">
                           <h6 className="mb-1 text-capitalize">
                             {item?.meetings?.title}{" "}
                             {/* <span className="badge bg-success">Active</span> */}
                           </h6>
                           <p
                             className="text-muted  "
                             style={{ fontSize: "14px", marginTop: "-4px" }}
                           >
                             {item.email}
                           </p>
                         </div>
                       </div>
                     </td>

                     <td>
                       <div className="d-flex align-items-center justify-content-center mt-2">
                         
                         <div className="mx-2 ">
                           <h6 className="mb-1 text-capitalize badge bg-primary text-center">
                             {item?.creator?.name}{" "}
                             {/* <span className="badge bg-success">Active</span> */}
                           </h6>
                          
                         </div>
                       </div>
                     </td>
                     <td style={{ textAlign: "center" }}>
                       <span
                       >
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
                       </span>
                     </td>
                     <td className="align-middle text-center text-sm">
                       <p
                         className="text-xs font-weight-bold mb-0"
                         style={{ fontSize: "15px" }}
                       >
                         {item?.meetings?.date}
                       </p>
                     </td>
                     <td className="align-middle text-center text-sm">
                       <p
                         className="text-xs font-weight-bold mb-0"
                         style={{ fontSize: "15px" }}
                       >
                         {item?.meetings?.time}
                       </p>
                     </td>
                     <td className="align-middle text-center text-sm">
                      {item?.meetings?.link ? (<a href={item?.meetings?.link} target="_blank">Join</a>): (<p className="text-xs font-weight-bold mb-0">Not Available</p>)}
                     </td>
                     <td style={{ textAlign: "center" }} >
                         <i className="bx bx-edit mx-2" onClick={()=>handleEditShow(item.meetings.id)} style={{cursor:"pointer"}}/>

                       <button
                         title="Delete"
                         type="button"
                         style={{
                           border: "none",
                           background: "none",
                           margin: "0",
                         }}
                         onClick={() => handleMeetingDelete(item.meetings.id)}
                       >
                         <i className="bx bx-trash text-danger " />
                       </button>
                     </td>
                   </tr>
                 ))}
                 {meeting.length === 0 && <tr><td colSpan="6"><p className="text-center mt-2">No meetings yet</p></td></tr>}
               </tbody>
             </table>
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





      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <form action="" onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Metting</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Title</label>
              <input type="text" className='form-control' placeholder='Please Enter Meeting Title' name='title' onChange={handleChange} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label htmlFor="formFile" className="form-label">Date</label>
            <input type="date" className='form-control' placeholder='Please Enter Meeting Date' name='date' onChange={handleChange} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label htmlFor="formFile" className="form-label">Time</label>
            <input type="time" className='form-control' placeholder='Please Enter Meeting Time' name='time' onChange={handleTimeChange} />
            </div>

            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Users</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <a onClick={() => deleteTag(index)}>&times;</a> 
                  </span>
                ))}
                <input
                  id="tag-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type to search"
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                {suggestions.length === 0 && inputValue.length > 0 && (
                  <ul className="suggestions-list">
                    <li>No User Found</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Link</label>
              <input type="text" className='form-control' placeholder='Please Enter Meeting Link' name='link' onChange={handleChange} />

            </div>

            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Creator</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
                  <span className="login-tag text-capitalize">
                    {loginUserInfo.name}
                    {/* <a >&times;</a>  */}
                  </span>
               
              </div>
            </div>
                {error && <p className="text-danger">{error}</p>}
          </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>save</Button>
        </Modal.Footer>
        </form>
        </Modal>




        <Modal
        show={showEdit}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
          <form action="" onSubmit={handleEditSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Metting {selectedMeetingId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Title</label>
              <input type="text" className='form-control' placeholder='Please Enter Meeting Title' value={title} name='title' onChange={handleChange} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label htmlFor="formFile" className="form-label">Date</label>
            <input type="date" className='form-control' placeholder='Please Enter Meeting Date' value={date} name='date' onChange={handleChange} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label htmlFor="formFile" className="form-label">Time</label>
            <input type="time" className='form-control' placeholder='Please Enter Meeting Time' name='time' onChange={handleTimeChange} />
            </div>
            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Users</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
                 {dbTags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag.name}
                    <a onClick={() => deleteDbTag(index , tag.id)}>&times;</a> 
                  </span>
                ))}
                {dbTags?.length === 0 && tags?.length === 0 && <span className="badge bg-primary">Not assigned</span>}
                {tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <a onClick={() => deleteTag(index)}>&times;</a> 
                  </span>
                ))}
                <input
                  id="tag-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type to search"
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                {suggestions.length === 0 && inputValue.length > 0 && (
                  <ul className="suggestions-list">
                    <li>No User Found</li>
                  </ul>
                )}
              </div>
            </div>

                <div className="col-lg-12">
                  <label htmlFor="formFile" className="form-label"> Link</label>
                  <input type="text" className='form-control' placeholder='Please Enter Meeting Link' name='link' value={link} onChange={handleChange} />
                </div>
       
            <div className="col-lg-12">
              <label htmlFor="formFile" className="form-label">Creator</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
                  <span className="login-tag text-capitalize">
                    {creator.name}
                    {/* <a >&times;</a>  */}
                  </span>
               
              </div>
            </div>
                {error && <p className="text-danger">{error}</p>}
          </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>save</Button>
        </Modal.Footer>
        </form>
        </Modal>
    </div>
 </>
  )
}

export default Meeting
