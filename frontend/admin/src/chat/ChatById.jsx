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
  <div className="messenger">
    <input type="hidden" id="chat_type" defaultValue="" />
    <input type="hidden" id="chat_type_id" defaultValue="" />
    <div className={display === true ? " d-none" : "messenger-listView"}>

      <div className="m-header">
        <nav>
          <a href="#">
            <i className="fas fa-inbox" />{" "}
            <span className="messenger-headTitle">Messenger</span>{" "}
          </a>
          <nav className="m-header-right">
            <a  onClick={hide} className='cursor-pointer'>
            <i class='bx bx-x' ></i>
            </a>
           
          </nav>
        </nav>
        <input type="text" className="messenger-search" placeholder="Search" />
      </div>
      <div className="m-body contacts-container">
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
      <div className="m-header m-header-messaging">
        <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
          <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
            <a href="#" className="show-listView">
              <i className="fas fa-arrow-left" />
            </a>
           {display === true && 
  <button class="navbar-toggler" onClick={() => setDisplay(false)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class='bx bx-arrow-back'></i>
  </button>}
            <div
              className="avatar av-s header-avatar"
              style={{
                margin: "0px 10px",
                marginTop: "-5px",
                marginBottom: "-5px"
              }}
            >
              <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
            </div>
            <a className="user-name text-capitalize">
              {loggedUser.name}
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
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, suscipit similique blanditiis quis ipsam odio beatae incidunt ipsum veritatis vitae, nam dolorum atque exercitationem et laudantium sed nostrum alias necessitatibus eligendi aut rerum numquam ratione? Rerum reiciendis illum commodi earum et eos numquam nemo corrupti voluptatum aliquid. Molestias libero expedita inventore voluptatibus vitae quasi accusamus itaque perferendis obcaecati consectetur, neque quas ipsum ad nam optio nihil vero iure quod nobis distinctio odit fuga! Illum totam perspiciatis dignissimos incidunt, illo consequuntur adipisci impedit nostrum vero, ad neque dolore optio possimus culpa veniam repudiandae amet recusandae eum cumque iusto quaerat? Recusandae tenetur sit expedita, culpa blanditiis sequi molestias totam voluptatibus dicta veniam sed eaque fugit minima earum harum eius officia debitis nemo et accusantium autem cupiditate odio eos? Tenetur doloremque a odio dignissimos doloribus quibusdam tempore autem, quisquam voluptatem. Minima magni itaque non quae? Eligendi cupiditate aspernatur velit minus perferendis veniam, incidunt exercitationem vero praesentium iusto qui rem, eius sapiente? Quidem tenetur ea velit alias, dolores molestias. Quidem, explicabo cum recusandae minus mollitia ipsum vitae unde laboriosam voluptate! Corrupti ex quia laborum rem harum velit impedit ut quod voluptatum voluptates fugit architecto doloribus dolor perspiciatis voluptatibus repellendus, iusto sint. Dolor, ipsum debitis error minima incidunt dolorem magni non doloremque. Numquam at dolores quia, optio obcaecati possimus quaerat aut repudiandae consectetur quae ipsum! Adipisci laudantium quis aut delectus fugiat expedita alias sit mollitia maxime excepturi hic consequatur, ipsa culpa eaque optio doloribus debitis at et tempora labore explicabo eveniet iste. Suscipit, iste quam! Aliquid eveniet reiciendis voluptatibus ea accusantium quos eaque dicta dolores deleniti repellendus sapiente, ex expedita eos molestiae consequatur corrupti, cumque aperiam iusto soluta ipsa voluptatem nostrum vel? Illum obcaecati, alias voluptate repudiandae optio a, corporis cumque animi qui minima veniam facilis quisquam ipsa vitae, explicabo ex provident adipisci nisi maxime. Ipsa fuga voluptatibus similique veniam neque, aliquid nisi at itaque cum illum rerum, quia nesciunt reiciendis enim eligendi perferendis vel magni. Earum accusamus delectus placeat repellat suscipit ea, nulla sapiente veritatis atque blanditiis consectetur iste labore aspernatur quod assumenda quo maxime totam, asperiores architecto tenetur nobis? Iure eligendi pariatur nostrum nobis eveniet, dolores aut quis maiores laborum tempora, officiis ipsum in numquam commodi illo porro adipisci corrupti eum facere vero! Quisquam quaerat natus dolore non sapiente necessitatibus illum repellat autem, repellendus nisi doloremque dolor numquam quis, quod quasi! Nihil reiciendis et voluptatum natus voluptas incidunt quae. Amet veniam dicta iure saepe fuga natus dolore similique, ut laudantium quidem cumque quam, molestiae consequatur ea impedit eum a quibusdam. Nam, quo fuga. Dignissimos quia quas ducimus eos dolore, sint ullam nihil temporibus animi ab sunt neque eveniet dicta cumque! Fuga quod rem laboriosam deleniti quisquam quae eum inventore? Veniam, alias? Magni quas aut tenetur iste odit? Accusamus deserunt fuga tenetur quia, atque explicabo minima obcaecati quas, harum quo molestiae dolorum laudantium, iste pariatur adipisci natus quibusdam amet eius et vitae? Voluptatibus, porro, nostrum odit quasi placeat cum facere exercitationem consequuntur non assumenda voluptas molestiae earum provident vel similique. Est perferendis in doloribus illo officiis, odio quibusdam quasi, voluptate quaerat eius nobis, qui ratione impedit. Et suscipit iure saepe blanditiis commodi nihil exercitationem corrupti doloremque aperiam enim accusamus asperiores nisi architecto hic earum totam distinctio debitis eos nulla, quibusdam possimus dolorum laudantium fugiat minima. Doloremque necessitatibus repellat saepe iste obcaecati. Blanditiis consequatur obcaecati fuga quidem dolorem esse distinctio fugiat? Neque expedita nihil, in nobis, officia quidem ratione consequatur et dignissimos inventore accusamus similique temporibus, debitis quas fugiat autem nemo incidunt. Ratione reiciendis recusandae ad blanditiis ipsam rem cumque quia assumenda eos similique incidunt excepturi, harum sunt. Itaque, neque debitis. Esse earum quia et enim, ipsum magnam, autem voluptates expedita nam veniam libero obcaecati deserunt omnis quas suscipit saepe architecto. Iste eum incidunt hic animi in natus recusandae dolorum ab maiores ducimus officiis eos provident reiciendis, beatae quis quaerat odio corporis cum officia consequatur magni perspiciatis? Nulla necessitatibus, sed, labore pariatur quaerat ex quam rem inventore deserunt non odio maiores. Enim possimus, cupiditate iusto in sint culpa, quos officiis expedita pariatur repellendus, illum fugiat! Veritatis veniam laboriosam explicabo. Facilis, fugit. Officiis, labore reprehenderit vel quam iure ratione eum inventore voluptates aut repellat nulla repudiandae laboriosam veritatis iusto? Ab dolorum nihil quasi. Culpa officia error dicta! Beatae explicabo eveniet autem, ab aliquid aut eum repellat ratione voluptatem laudantium corporis cupiditate necessitatibus velit nihil quae officia illum blanditiis adipisci. Animi quasi officiis itaque! Necessitatibus, dolorum cumque mollitia voluptas quis veniam possimus consequuntur earum quibusdam aperiam eius amet reiciendis quam magnam nihil, laborum nemo esse velit recusandae. Illum, voluptatem hic aspernatur earum tenetur impedit aperiam natus animi eveniet excepturi dolorem? Laboriosam, dolores quis rerum quos placeat aliquam ratione non obcaecati recusandae dignissimos, doloremque nam sint hic pariatur debitis iure, eum voluptates nostrum similique est animi amet ad molestiae? Aut illo impedit ab? Exercitationem sunt nulla ullam cupiditate quaerat mollitia sit quidem officia praesentium provident, molestias maiores, consequatur non autem repellat harum dolore odit laborum aliquam! Architecto culpa nemo quam repellendus, ducimus eius odio? Excepturi facere maxime eligendi adipisci quos ea repudiandae odit sunt at dolore iste labore autem, architecto temporibus totam sint odio sapiente eum officia nesciunt ipsa, ipsum cumque fugit vitae! Libero aperiam ab enim voluptatibus sit impedit odio quos minima excepturi sed expedita quasi id animi sapiente voluptas commodi voluptatum, exercitationem qui sunt! Magni, quibusdam alias? Dolores deleniti accusamus architecto esse, ipsum at perferendis impedit? Nulla obcaecati voluptatibus doloremque labore omnis consequuntur inventore a non mollitia quod temporibus numquam ex corrupti, aliquid cum corporis ipsum nisi nihil! Commodi culpa dicta veniam eos reprehenderit quibusdam voluptas autem consequatur ut minima libero, eveniet expedita at esse reiciendis quod dolore eum. Iure doloremque illum corrupti sapiente veniam quae. Enim quibusdam quae dolore laudantium delectus amet natus molestias odio nobis nostrum harum adipisci itaque rem repudiandae vel ducimus recusandae porro culpa ut sit, cum fugiat quas? Iusto, ut hic tempora repellat numquam soluta sapiente quos facere maxime et non magni perferendis architecto, saepe nulla? Id quia vel dolore, veniam cupiditate illum quibusdam repellendus, amet pariatur iure ipsa possimus rerum!
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
      <img src={loggedUser?.pfpImage} style={{objectFit:'cover'}} alt="" />
      </div>
     
      <p className="info-name text-capitalize">{loggedUser?.name}</p>
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
</>

  )
}

export default Chat
