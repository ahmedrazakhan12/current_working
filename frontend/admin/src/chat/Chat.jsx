import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAppContext } from '../context/AppContext';
import Chatbar from './Chatbar';




const Chat = () => {
  const { socket } = useAppContext();

  const [loggedUser, setLoggedUser] = useState([]);
  const activeId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isSearchData , setIsSearchData] = useState(false);
  
  const handleSearchChange = (e) => {
    // const search = 
    const searchTerm =e.target.value;
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
  const [display  ,setDisplay] = useState(false);
  const [display2  ,setDisplay2] = useState(false);
  const hide = () => {
    setDisplay(true) 
  }
  const hide2 = () => {
    setDisplay2(true) 
  }


  const [chatBarUsers , setChatBarUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  console.log();
socket.on('allusers', (res) => {
  // console.log('allusers:', res);

  // Ensure `res` is an array
  if (Array.isArray(res)) {
      // Extract and set active user IDs
      setActiveUsers(res);
      
  
  } else {
      console.error('Expected an array but received:', res);
  }
});

  useEffect(() => {
    axios.get(`http://localhost:5000/chat/getChatbarUser/${loggedUser.id}`)
    .then((res) => {
      setChatBarUsers(res.data);
      // console.log("Users:", res.data);
    })
    .catch((err) => {
      console.log("Error getting users:", err);
    });
  }, [loggedUser]);

  return (
    <>
  
 <div className="container-fluid">
 <div className='card p-3'  style={{height:'80vh'}}>
  <div className="messenger"  style={{height:'100%'}}>
    <input type="hidden" id="chat_type" defaultValue="" />
    <input type="hidden" id="chat_type_id" defaultValue="" />
    <div className='my-chatbar'><Chatbar /></div>
    <div className="messenger-messagingView1">
  <div className="d-flex justify-content-center align-items-center mt-5">
    <img src="./assets/images/gmg.png" className="img-fluid" alt="Gmg Solutions Logo" />
  </div>
  <h5 className="text-center mt-n4 ml-1">Gmg Solutions Messaging System!</h5>
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
