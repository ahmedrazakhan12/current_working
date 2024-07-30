import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';



const Chat = () => {
  const {id} =useParams();
  const [userDataById, setUserDataById] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [data, setData] = useState([]);
  const [isSearchData , setIsSearchData] = useState(false);
  const [searchValue , setSearchValue] = useState("");
  
  const activeId = localStorage.getItem("id");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
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
            navigate("/login"); // Redirect to login on 404
          }
        });
    }
  }, [activeId]);

  useEffect(() => {
    if (!id) {
      navigate("/"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/team/${id}`)
        .then((res) => {
          setUserDataById(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/"); // Redirect to login on 404
          }
        });
    }
  }, [id]);

  const handleSearchChange = (e) => {
    // const search = 
    const searchTerm =e.target.value;
    setSearchValue(searchTerm);
    if(searchTerm.length > 0){
      setIsSearchData(true);
    }
    
    if(searchTerm.length === 0){
      setData([])
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
    setData([])
    setSearchValue("");
    setIsSearchData(false);
    return;
  };

  const [display  ,setDisplay] = useState(false);
  const [display2  ,setDisplay2] = useState(false);
  const hide = () => {
    setDisplay(true) 
  }
  const hide2 = () => {
    setDisplay2(true) 
  }

  return (
    <>
  
       <div className="container-fluid">
       <div className="card p-3" style={{minHeight:'100vh'}}>
        <div className="messenger" style={{minHeight:'100vh'}}>
    <input type="hidden" id="chat_type" defaultValue="" />
    <input type="hidden" id="chat_type_id" defaultValue="" />
    {/* <div className={display === true ? " d-none" : "messenger-listView"}>

    <div className="m-header" >
        <nav style={{background:'#f7f7f7'}} className='mb-2'>
          <div className="row">
            <div className="col">
              <img src={loggedUser.pfpImage} style={{objectFit:'cover' , width:'35px'  , height:'35px' , borderRadius:'50%'}} alt="" />
            </div>
            <div className="col text-end cursor-pointer">
              
            <i class='bx bx-dots-vertical' ></i>
            </div>
          </div>
        </nav>
        <input type="text" className="messenger-search" value={searchValue}  onChange={handleSearchChange} placeholder="Search" />
        
      </div>
      <div className="m-body contacts-container">
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
        ))}
            </tbody>
                 </table>
                
          </div>
        </div>
        <div
          className="show messenger-tab users-tab app-scroll"
          data-view="users"
        >
        
          {data.length === 0 && isSearchData === false && (
            <>
            <table className="messenger-list-item mt-3" data-contact={7}>
            <tbody>

              <tr  data-action={0} onClick={()=>navigate(`/chat/${loggedUser.id}`)} style={{cursor:'pointer'}}>
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
        <div className="messenger-tab search-tab app-scroll" data-view="search">
          <p className="messenger-title">
            <span>Search</span>
          </p>
          <div className="search-records">
            <p className="message-hint center-el">
              <span>Type to Search..</span>
            </p>
          </div>
        </div>
      </div>
    </div> */}
    <div className="messenger-messagingView">
      <div className="m-header m-header-messaging">
        <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
          <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
            <a href="#" className="show-listView">
              <i className="fas fa-arrow-left" />
            </a>
  <button class="navbar-toggler" onClick={() => navigate('/chat')} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class='bx bx-arrow-back'></i>
  </button>
            <div
              className="avatar av-s header-avatar"
              style={{
                margin: "0px 10px",
                marginTop: "-5px",
                marginBottom: "-5px"
              }}
            >
              <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
            </div>
            <a className="user-name text-capitalize">
              {userDataById?.name}
            </a>
          </div>
          <nav className="m-header-right">
            <a href="#" className="add-to-favorite">
              <i className="fas fa-star" />
            </a>
            <a href="https://taskify.taskhub.company/public/home">
              <i className="fas fa-home" />
            </a>
            <a onClick={() => setDisplay2(!display2)} className="show-infoSide cursor-pointer">
            <i class='bx bxs-info-circle' style={{color:'#2180f3' , fontSize:'24px'}}></i>
            </a>
          </nav>
        </nav>
        <div className="internet-connection">
          <span className="ic-connected">Connected</span>
          <span className="ic-connecting">Connecting...</span>
          <span className="ic-noInternet">No Internet Access</span>
        </div>
      </div> 
      <div className="m-body messages-container app-scroll" style={{maxHeight:"81vh" , overflow:'scroll' , padding:'0px 30px'}}>
      
     <div className='mt-5'>
     <div className='d-flex justify-content-center'>
        <img src={userDataById?.pfpImage} alt="" style={{width:'140px' , height:'140px' , borderRadius:'50%' , objectFit:'cover'}}/>
      </div>
      <h5 className='text-center text-capitalize mt-2'>{userDataById?.name}</h5>
     </div>


     

        <div className="typing-indicator">
      
          <div className="message-card typing">
      
            <div className="message">
              <span className="typing-dots">
                <span className="dot dot-1" />
                <span className="dot dot-2" />
                <span className="dot dot-3" />
              </span>
            </div>
          </div>
        </div>
      </div>






      <div className="messenger-sendCard" style={{ display: "block" }}>
  <form
    id="message-form"
    method="POST"
    action="https://taskify.taskhub.company/chat/sendMessage"
    encType="multipart/form-data"
  >
    <input
      type="hidden"
      name="_token"
      defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
      autoComplete="off"
    />
   <button className="emoji-button m-0 p-0">
    <FontAwesomeIcon icon={faCirclePlus} />
    <span className="fas fa-smile" />
    </button>
    <button className="emoji-button m-0 p-0">
    <FontAwesomeIcon icon={faFaceSmile} />
    <span className="fas fa-smile" />
    </button>
    <textarea
      name="message"
      className="m-send app-scroll"
      placeholder="Type a Message.."
      style={{ overflow: "hidden", overflowWrap: "break-word", height: 44 }}
      defaultValue={""}
    />
    <button className="send-button">
    <FontAwesomeIcon icon={faPaperPlane} style={{color:'#2180f3'}} />
      <span className="fas fa-paper-plane" />{" "}
    </button>
  </form>
      </div>
    </div>
    <div className={display2 === false ? "d-none" : "messenger-infoView app-scroll"}>
      <nav>
        <p>User Details</p>
        <a onClick={() => setDisplay2(false)}>
        <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
        </a>
      </nav>
      <div className="avatar av-l chatify-d-flex">
      <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
      </div>
     
      <p className="info-name text-capitalize">{userDataById?.name}</p>
      {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
      <p className="messenger-title">
            <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>Shared Photos</span>
          </p>
      
    
    </div>
  </div>
  <div id="imageModalBox" className="imageModal">
    <span className="imageModal-close">×</span>
    <img className="imageModal-content" id="imageModalBoxSrc" />
  </div>
  <div className="app-modal" data-name="delete">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="delete" data-modal={0}>
        <div className="app-modal-header">
          Are You Sure You Want to Delete This?
        </div>
        <div className="app-modal-body">You Cannot Undo This Action</div>
        <div className="app-modal-footer">
          <a href="javascript:void(0)" className="app-btn cancel">
            Cancel
          </a>
          <a href="javascript:void(0)" className="app-btn a-btn-danger delete">
            Yes
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="app-modal" data-name="alert">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="alert" data-modal={0}>
        <div className="app-modal-header" />
        <div className="app-modal-body" />
        <div className="app-modal-footer">
          <a href="javascript:void(0)" className="app-btn cancel">
            Cancel
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="app-modal" data-name="settings">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="settings" data-modal={0}>
        <form
          id="update-settings"
          action="https://taskify.taskhub.company/public/chat/updateSettings"
          encType="multipart/form-data"
          method="POST"
        >
          <input
            type="hidden"
            name="_token"
            defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
            autoComplete="off"
          />
          <div className="app-modal-body">
            <div
              className="avatar av-l upload-avatar-preview chatify-d-flex"
              style={{
                backgroundImage:
                  'url("/storage/users-avatar/f724c64a-28c7-402a-8c4b-89efff99cdac.jpg")'
              }}
            />
            <p className="upload-avatar-details" />
            <label
              className="app-btn a-btn-primary update"
              style={{ backgroundColor: "#2180f3" }}
            >
              Upload New{" "}
              <input
                className="upload-avatar chatify-d-none"
                accept="image/*"
                name="avatar"
                type="file"
              />
            </label>
            <p className="divider" />
            <p className="app-modal-header">
              Dark Mode{" "}
              <span
                className="
                  far fa-moon dark-mode-switch"
                data-mode={0}
              />
            </p>
            <p className="divider" />
            <div className="update-messengerColor">
              <span
                style={{ backgroundColor: "#2180f3" }}
                data-color="#2180f3"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#2196F3" }}
                data-color="#2196F3"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#00BCD4" }}
                data-color="#00BCD4"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#3F51B5" }}
                data-color="#3F51B5"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#673AB7" }}
                data-color="#673AB7"
                className="color-btn"
              />
              <br />
              <span
                style={{ backgroundColor: "#4CAF50" }}
                data-color="#4CAF50"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#FFC107" }}
                data-color="#FFC107"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#FF9800" }}
                data-color="#FF9800"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#ff2522" }}
                data-color="#ff2522"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#9C27B0" }}
                data-color="#9C27B0"
                className="color-btn"
              />
              <br />
            </div>
          </div>
          <div className="app-modal-footer">
            <a href="javascript:void(0)" className="app-btn cancel">
              Cancel
            </a>
            <input
              type="submit"
              className="app-btn a-btn-success update"
              defaultValue="Save Changes"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
        </div>
       </div>
</>

  )
}

export default Chat
