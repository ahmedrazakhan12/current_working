import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';



const Chat = () => {
  const [loggedUser, setLoggedUser] = useState([]);
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
  <style>
        {`
              .layout-content-navbar .layout-navbar , .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl ,.bg-menu-theme.menu-vertical{
            display: none;
          }
            .layout-menu-fixed:not(.layout-menu-collapsed) .layout-page, .layout-menu-fixed-offcanvas:not(.layout-menu-collapsed) .layout-page{
            padding: 0;
            }
        `}
      </style>
  <div style={{maxHeight:'' }}>
  <div className="messenger">
    <input type="hidden" id="chat_type" defaultValue="" />
    <input type="hidden" id="chat_type_id" defaultValue="" />
    <div className={display === true ? " d-none" : "messenger-listView"}>

      <div className="m-header">
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
        <input type="text" className="messenger-search" placeholder="Search" />
      </div>
      <div className="m-body contacts-container mt-3">
        <div
          className="show messenger-tab users-tab app-scroll"
          data-view="users"
        >
          {/* <div className="favorites-section">
            <p className="messenger-title">
              <span>Favorites</span>
            </p>
            <div className="messenger-favorites app-scroll-hidden" />
          </div>
          <p className="messenger-title">
            <span />
          </p> */}
          <table className="messenger-list-item" data-contact={7}>
            <tbody>
              <tr  data-action={0}>
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
    </div>
    <div className="messenger-messagingView">
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
</>

  )
}

export default Chat
