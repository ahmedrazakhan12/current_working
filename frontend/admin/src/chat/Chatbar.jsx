import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../context/AppContext';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css'
import Swal from 'sweetalert2';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import GroupImage from '../assets/images/group-image.png'
const Chatbar = () => {
    const { socket , location } = useAppContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [chatBarUsers , setChatBarUsers] = useState([])
    const [loggedUser, setLoggedUser] = useState([]);
    const [data, setData] = useState([]);
    const [isSearchData, setIsSearchData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeStatus, setActiveStatus] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const activeId = localStorage.getItem("id");
    const [view , setView] = useState(false);

    useEffect(() => {
      axios
        .get("http://localhost:5000/admin/team")
        .then((res) => {
          console.log("Liquid Data: ",res.data);
          // Assuming `res.data` is an array of objects, each with an `id` property
          const filteredData = res.data.admins.filter(item => Number(item.id) !== Number(activeId));
          
          setGroupData(filteredData);
        })
        .catch((err) => {
          console.log("Error fetching providers:", err);
        });
    }, []); // Add `activeId` to the dependency array if it can change
    
    useEffect(() => {
        if (!activeId) {
          navigate("/login");
        } else {
          axios
            .get(`http://localhost:5000/admin/adminInfo/`, {
              headers: { Authorization: `${activeId}` },
            })
            .then((res) => {
              setLoggedUser(res.data);
            })
            .catch((err) => {
              console.error(err);
              if (err.response && err.response.status === 404) {
                navigate("/login");
              }
            });
        }
      }, [activeId, navigate]);
      const fetchChatsBars = ()=>{
        axios.get(`http://localhost:5000/chat/getChatbarUser/${loggedUser.id}`)
        .then((res) => {
    
          const filteredData = res.data.filter(item => Number(item.id) !== Number(activeId));
    
          setChatBarUsers(filteredData);
          console.log("Users:", filteredData);
        })
        .catch((err) => {
          console.log("Error getting users:", err);
        });
      }
  useEffect(() => {
    fetchChatsBars()
  }, [loggedUser]);


  useEffect(() => {
    fetchGroupData();
    fetchChatsBars()
  } , [view]) 
  const[dbGroupData , setDbGroupData] = useState([]);

    const fetchGroupData = ()=>{
      axios.get(`http://localhost:5000/chat/getGroups/${loggedUser.id}`)
      .then((res) => {
      //   setChatBarUsers(res.data);
      setDbGroupData(res.data);
        console.log("Groups:", res.data);
      })
      .catch((err) => {
        console.log("Error getting Groups:", err);
      });
    }
  useEffect(() => {
    fetchGroupData();
    },[loggedUser])

  socket.on('allusers', (res) => {
    // console.log('allusers:', res);
  
    // Ensure `res` is an array
    if (Array.isArray(res)) {
        // Extract and set active user IDs
        setActiveUsers(res);
        
        // Convert `id` to a number for comparison
        const numericId = Number(id);
  
        // Filter users based on the matching `paramsId`
        const filter = res.filter((user) => Number(user.id) === numericId);
        // console.log('filter:', filter);
        
        // Update active status based on filter results
        if (filter.length > 0) {
            setActiveStatus(true);
        } else {
            setActiveStatus(false);
        }
    } else {
        console.error('Expected an array but received:', res);
    }
  });
  


  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    if (searchTerm.length > 0) {
      setIsSearchData(true);
    } else {
      setData([]);
      setIsSearchData(false);
      return;
    }
    axios
      .get(`http://localhost:5000/admin/search/${searchTerm}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error searching providers:", err);
      });
  };

  const handleChatUser = (id) => {
    navigate(`/chat/${id}`);
    setData([]);
    setGroupData([]);
    setSearchValue("");
    setIsSearchData(false);
  };

  const handleGroupChatUser = (id) => {
    navigate(`/groupchat/${id}`);
    setGroupData([]);
    setSearchValue("");
    setData([]);
    setIsSearchData(false);
  };

const [display  , setDisplay] = useState(false);

const handleGroupView = () => {
  setDisplay(!display);
}


const handleSearchGroupChange = (e) => {
    const searchTerm = e.target.value;
    axios
      .get(`http://localhost:5000/admin/search/${searchTerm}`)
      .then((res) => {
        setGroupData(res.data);
      })
      .catch((err) => {
        console.log("Error searching providers:", err);
      });
  };
  const [userGroupInfo, setUserGroupInfo] = useState([]);

  const [usersID, setUsersID] = useState([]);
  
  console.log(usersID);
  console.log(userGroupInfo);
  
  
  const handleAddUser = (user) => {
    if (usersID.includes(user.id)) {
        // Display an error message or handle the error case
        console.error('User ID already exists');

        Swal.fire({
            position: "top-end",
            title: "User already exists.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'custom-swal-danger'
            }
          });
        return; // Exit the function early
      }

    setUserGroupInfo((prevName) => [...prevName,user]);
    setUsersID((prevIDs) => [...prevIDs, user.id]);
  };

  const handleRemoveUser = (user) => {
    setUserGroupInfo((prevName) => prevName.filter((u) => u.id !== user.id));
    setUsersID((prevIDs) => prevIDs.filter((id) => id !== user.id));
  };
  
  const [groupCreateName , setGroupCreateName] = useState(false);
  const handleGroupMember =()=>{
    setGroupCreateName(true)
    setDisplay('false');

  }


  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handler function for the image click
  const handleImageClick = () => {
    // Trigger a click on the file input
    fileInputRef.current.click();
  };

  const [image , setImage] = useState(null);
  const [groupName , setGroupName] = useState("");
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          setImage(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [error , setError] = useState("");

  const handleGroupCreate = () => {
    const formData = new FormData();
    formData.append('pfpImage', image); 
    formData.append('creator', loggedUser.id);
    formData.append('groupName', groupName);
    formData.append('usersID', JSON.stringify(usersID)); // Convert array to string
    formData.append('time', Date.now());
  
    axios.post('http://localhost:5000/chat/createGroup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res.data);
        fetchGroupData();
        setIsSearchData(false)
        setView(true);
        const notification = {
          fromId: activeId,
          usersID: usersID,
          text:`${loggedUser?.name} Added you to a Group: ${groupName}.`,
          time: new Date().toLocaleString(),
          route: '/chat',
        };
        socket.emit('newNotification', notification, (response) => {
          if (response && response.status === 'ok') {
            console.log(response.msg);
          } else {
            console.error('Message delivery failed or no response from server');
          }
        });
        Swal.fire({
          position: "top-end",
          title: "Group created successfully",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal'
          }
        }).then(() => {
          setGroupCreateName(false);
          setGroupName("");
          setUsersID([]);
          setUserGroupInfo([]);
          setDisplay(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);

      });
  };
  

  return (
    <div>
        {display === false && (
              <div>
               
              <div className="m-header" >
                  <nav  className='mb-2'>
                    <div className="row">
                      <div className="col">
                        <img src={loggedUser.pfpImage} style={{objectFit:'cover' , width:'25px'  , height:'25px' , borderRadius:'50%'}} alt="" />
                      </div>
              <div className="col text-end cursor-pointer" >
              <div class="dropdown">
          <button style={{background:"transparent" , border: "none",
          }}  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className='bx bx-dots-vertical'></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" onClick={handleGroupView} >New Group</a>
          <a class="dropdown-item" href="#" >More</a>
          </div>
        </div>
              </div>
        
              
             
                </div>
              </nav>
              <input type="text" className="messenger-search" value={searchValue}  onChange={handleSearchChange} placeholder="Search" />
              
            </div>
            <div style={{display:'flex' , marginTop:'10px'}} className='mx-3'>
                    <p className={view === false ? "isActive-chat " : "chattt"} style={{ color:'white' , borderRadius:'10px' , padding:'0px 10px' , marginRight:'5px' , cursor:'pointer'}} onClick={()=>setView(false)}>Chats</p>
                    <p className={view === true ? "isActive-gChat " : "chattt"} style={{ color:'white' , borderRadius:'10px' , padding:'0px 10px' , marginRight:'5px' , cursor:'pointer'}} onClick={()=>setView(true)}>Groups</p>
                </div>
            <div className="m-body contacts-container overflow-auto">
            <div className="row mx-2" style={{background:'#f7f7f7' }}>
                <div className="col-12">
                
                   <table className="messenger-list-item " data-contact={7}>
                  <tbody>
                        {data.map((item, index) => (
                            <tr key={index} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
                             
                              <td>
                                
                                  <div className="saved-messages avatar av-m">
                                    <img src={item.pfpImage} style={{ objectFit: 'cover' }} alt="" />
                                  </div>
                                
                              </td>
                              <td className="text-capitalize">
                                {item.name}
                                <span className="d-block m-0 p-0">Click to chat.</span>
                              </td>
                            </tr>
                          ))
                    }
                  </tbody>
                       </table>
                      
                </div>
              </div>
                    
              <div style={{height:'63vh' , overflow:'scroll'}} className='app-scroll'>
                {/* <div style={{overflow:'s  croll'}}> */}

                <div>
             {data.length === 0 && isSearchData === false && view === false && (
                  <>
                  <table className="messenger-list-item mt-3" data-contact={7}>
                  <tbody>
        
                    <tr  data-action={0} onClick={()=>handleChatUser(loggedUser.id)} style={{cursor:'pointer'}}>
                      <td >
                        <div className="saved-messages avatar av-m">
                          <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
                        </div>
                      </td>
                      <td className='text-capitalize '>
                        <p data-id={7} data-type="user">
                          <span>You</span>
                        </p>
                        {loggedUser.name}
                        <span className='d-block m-0 p-0'>Save Messages Secretly</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="messenger-title">
                  <span>All Messages</span>
                </p>
        
              {chatBarUsers?.map((item, index) => (
                 <table className="messenger-list-item mt-3" data-contact={7}>
                 <tbody>
        
                   <tr  data-action={0} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
                     <td >
                       <div className="saved-messages avatar av-m">
                         {/* <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" /> */}
                       
                         <div className="">
                         <div className="saved-messages avatar av-m">
                          <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" />
                        </div>
                        <div className={activeUsers.find(data => Number(data.id) === Number(item.id)) ? 'avatar-online-status' : 'avatar-offline-status'}></div>
        
                      </div>
        
                       </div>
                     </td>
                     <td className='text-capitalize '>
                       <p data-id={7} data-type="user">
                         {/* <span>You</span> */}
                       </p>
                       {item.name}
                       <span className='d-block m-0 p-0'>click to chat</span>
                       {/* <p>{activeUsers.filter(data => Number(data.id) === Number(item.id) ? 'id' : 'not')}</p> */}
                     
        
                        {/* <p>{ activeUsers.map(e => \e.id == item.id) ? 'online': 'ofline'}</p> */}
                     </td>
                   </tr>
                 </tbody>
               </table>
              ))}
                <div
                  className="listOfContacts"
                  style={{
                    width: "100%",
                    height: "calc(100% - 272px)",
                    position: "relative"
                  }}
                />
        
        
        
        
        
                </>
                )}

            {data.length === 0 && isSearchData === false && view === true && (
                  <>
                  <table className="messenger-list-item mt-3 " >
                  <tbody>
        
                    <tr  data-action={0} onClick={()=>handleChatUser(loggedUser.id)} style={{cursor:'pointer'}}>
                      <td >
                        <div className="saved-messages avatar av-m">
                          <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
                        </div>
                      </td>
                      <td className='text-capitalize '>
                        <p data-id={7} data-type="user">
                          <span>You</span>
                        </p>
                        {loggedUser.name}
                        <span className='d-block m-0 p-0'>Save Messages Secretly</span>
                      </td>
                    </tr>
                  </tbody>
                    </table>
                <p className="messenger-title">
                  <span>All Messages</span>
                </p>
        
                {dbGroupData.groups?.map((item, index) => (
  <table className="messenger-list-item mt-3 overflow-scroll" data-contact={7} key={item.id}>
    <tbody>
      <tr data-action={0} onClick={() => handleGroupChatUser(item?.id)} style={{ cursor: 'pointer' }}>
        <td>
          <div className="saved-messages avatar av-m">
            <div className="saved-messages avatar av-m">
              <img src={item?.groupImage} style={{ objectFit: 'cover' }} alt="" />
            </div>
          </div>
        </td>
        <td className='text-capitalize '>
          <p data-id={7} data-type="user">
            {item.groupName}
            <span className='d-block m-0 p-0'>click to chat</span>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
))}

{dbGroupData.getUserGroup?.map((item, index) => (
  <table className="messenger-list-item mt-3" data-contact={7} key={item.id}>
    <tbody>
      <tr data-action={0} onClick={() => handleGroupChatUser(item?.id)} style={{ cursor: 'pointer' }}>
        <td>
          <div className="saved-messages avatar av-m">
            <div className="saved-messages avatar av-m">
              <img src={item?.groupImage} style={{ objectFit: 'cover' }} alt="" />
            </div>
          </div>
        </td>
        <td className='text-capitalize '>
          <p data-id={7} data-type="user">
            {item.groupName}
            <span className='d-block m-0 p-0'>click to chat</span>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
))}


{dbGroupData && dbGroupData.length !== 0 || dbGroupData?.getUserGroup?.length !== 0 && (
  <p className='text-center'>No Group Found</p>
)}


                <div
                  className="listOfContacts"
                  style={{
                    width: "100%",
                    height: "calc(100% - 272px)",
                    position: "relative"
                  }}
                />
        
        
        
        
        
                </>
                )}
                {data.length === 0 && isSearchData === true && (
                  <>
                  <p>No user found</p>
                  </>
                )}
             </div>
                {/* </div> */}
              </div>
                    
              {/* <div className="messenger-tab search-tab app-scroll" data-view="search">
                <p className="messenger-title">
                  <span>Search</span>
                </p>
                <div className="search-records">
                  <p className="message-hint center-el">
                    <span>Type to Search..</span>
                  </p>
                </div>
              </div> */}
            </div>
                </div>
        )}



        {display === true && (
                    <div>
            
                    <div className="m-header" >
                        <nav  className='mb-2'>
                            <div className="row">
                            <div className="col">
                            Add Group Member
                            </div>
                    <div className="col text-end cursor-pointer" >
                    <div class="dropdown">
                <button style={{background:"transparent" , border: "none",
                }}  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className='bx bx-dots-vertical'></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={handleGroupView} >New Group</a>
                <a class="dropdown-item" href="#" >More</a>
                </div>
                </div>
                    </div>
                
                    
                    
                        </div>
                    </nav>
                    <div className='add-group-member '>
                    {userGroupInfo?.map((item, index) => (
                            <div className='group-members '>
                            <img src={`${item.pfpImage}`} alt="" />
                            <p>{item.name}</p>
                            <a onClick={()=>handleRemoveUser(item)}><i class='bx bx-x ' style={{color:"black" , marginTop:'-5px' , cursor:"pointer"}}></i></a>
                        </div>
                    ))}
                    </div>
                    <input type="text" className="messenger-search m-0 " onChange={handleSearchGroupChange} placeholder="Search" />
                    
                    </div>
                    <div className="m-body contacts-container " style={{position:'relative'}}>
                    {groupData?.map((item, index) => (
                        <table className="messenger-list-item mt-3" data-contact={7}>
                        <tbody>
                
                        <tr  data-action={0} onClick={()=>handleAddUser(item)} style={{cursor:'pointer'}}>
                            <td >
                            <div className="saved-messages avatar av-m">
                                {/* <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" /> */}
                            
                                <div className="">
                                <div className="saved-messages avatar av-m">
                                <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" />
                                </div>
                                {/* <div className={activeUsers.find(data => Number(data.id) === Number(item.id)) ? 'avatar-online-status' : 'avatar-offline-status'}></div> */}
                
                            </div>
                
                            </div>
                            </td>
                            <td className='text-capitalize '>
                            <p data-id={7} data-type="user">
                                {/* <span>You</span> */}
                            </p>
                            {item.name}
                            <span className='d-block m-0 p-0'>click to chat</span>
                            {/* <p>{activeUsers.filter(data => Number(data.id) === Number(item.id) ? 'id' : 'not')}</p> */}
                            
                
                                {/* <p>{ activeUsers.map(e => \e.id == item.id) ? 'online': 'ofline'}</p> */}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    ))}
                    {userGroupInfo.length > 0 && (
                        <FontAwesomeIcon onClick={handleGroupMember} icon={faCircleArrowRight} style={{color:'#2180f3' ,  marginTop:'150px' , fontSize:'25px' , marginLeft:'250px' , cursor:'pointer'}} />
                    )}

                    <div >
                       
                        
                    </div>
                    <div
                        className="show messenger-tab users-tab app-scroll"
                        data-view="users"
                    >
                    
                        
                        {data.length === 0 && isSearchData === true && (
                        <>
                        <p>No user found</p>
                        </>
                        )}
                
                
                    </div>
                   
                    </div>
                        </div>
        )}

        {groupCreateName === true && (
             <div>
            
             <div className="m-header" >
                 <nav  className='mb-2'>
                     <div className="row">
                     <div className="col">
                     Add Group Member
                     </div>
             <div className="col text-end cursor-pointer" >
             <div class="dropdown">
         <button style={{background:"transparent" , border: "none",
         }}  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i className='bx bx-dots-vertical'></i>
         </button>
         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
         <a class="dropdown-item" onClick={handleGroupView} >New Group</a>
         <a class="dropdown-item" href="#" >More</a>
         </div>
         </div>
             </div>
         
             
          
                 </div>
             </nav>

            <div>
                <div className='container-group-photo'>
                <img src={ imagePreview || GroupImage} alt="" className='cursor-pointer'         onClick={handleImageClick}
                />
                 <input
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
                </div>
                <div class="input-container">
                <input type="text" id="input" placeholder='Enter Group Name  ( Compulsory )' required="" onChange={(e)=>setGroupName(e.target.value)}/>
            
                <div class="underline"></div>
                </div>
                {error && <p className='error mx-3' style={{fontSize
                  :'12px', color:'red'
                }}>{error}</p>}

                <div className='confirm-group'>
                    <div className='tick-color' onClick={handleGroupCreate}>
                    <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
            </div>
           
             </div>
             </div>
        )}
    </div>
  )
}

export default Chatbar
