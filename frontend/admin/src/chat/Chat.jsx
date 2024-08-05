import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAppContext } from '../context/AppContext';




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
    <div className={display === true ? " d-none" : "messenger-listView1" }>

      <div className="m-header" >
        <nav  className='mb-2'>
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
      <div className="m-body contacts-container " style={{height:'74vh' , overflowY:'scroll' , overflowX:'hidden'}}  >
        <div className="row mx-2" style={{background:'#f7f7f7' }}>
          <div className="col-12">
          
             <table className="messenger-list-item " data-contact={7}>
            <tbody>
            {data.map((item, index) => (
          <tr key={index} onClick={()=>navigate(`/chat/${item.id}`)} style={{cursor:'pointer'}}>
           {/* <td></td> */}
            <td>
              {/* <Link style={{ background: 'red', width: '100%', height: '100%'  }} to={`/chat/${item.id}`}> */}
                <div className="saved-messages avatar av-m">
                  <img src={item.pfpImage} style={{ objectFit: 'cover' }} alt="" />
                </div>
              {/* </Link> */}
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
          className=""
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
              {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis laboriosam reprehenderit rerum qui at necessitatibus, quasi saepe iusto suscipit incidunt aperiam dicta? Error consequatur itaque commodi ipsa tempora perspiciatis autem, optio, quasi, sapiente hic officia! Sed, nobis. Aut consequatur inventore velit! Ipsa distinctio magni saepe cum eligendi. Quisquam assumenda odit ratione rem provident? Sapiente, tempore beatae. Ratione dignissimos perferendis ea sapiente magni aliquam odio impedit fugit nostrum harum atque numquam, suscipit omnis temporibus quisquam expedita mollitia voluptatum rem dolores? At dolore dignissimos nobis! Veniam delectus accusamus voluptates cum recusandae quidem deleniti reprehenderit molestias maxime nesciunt molestiae quo magni incidunt ex dicta, consequuntur sapiente. Corrupti aperiam aliquid voluptatibus cum, dolorem quisquam harum quis, reprehenderit nesciunt molestiae sunt est id quasi iste vero nemo ducimus architecto fugiat? Placeat, dolorum. Architecto, aperiam ullam vel veniam nisi totam natus? Sed aperiam incidunt quas, ullam quos sint similique, deserunt officiis illum iste vel qui reprehenderit numquam non voluptatum nisi, labore culpa sapiente ea ex quaerat recusandae. Iusto dolor doloremque sit ipsum officiis doloribus voluptatum itaque. Culpa excepturi est distinctio obcaecati maiores ipsam iusto praesentium earum mollitia, quam, minima sed repellendus rerum aliquam labore. Rerum sint deserunt necessitatibus laboriosam vel, repellat corporis labore nihil! Eum, sint ab ullam quibusdam numquam maiores eveniet assumenda quas qui amet facere sequi est nihil reprehenderit tempore incidunt veniam debitis aspernatur optio totam labore libero reiciendis! Praesentium quibusdam quod fugit, perferendis commodi distinctio natus quisquam iure repellat expedita error maiores tenetur sunt eius porro molestias. Alias officia aut placeat dolor facilis aspernatur quas velit doloremque praesentium minus numquam tenetur vero sit, ut quia debitis, nostrum repellat unde veniam consequatur id consectetur aliquam rem autem. Maxime, dolores debitis. Id expedita alias nisi possimus. Perspiciatis blanditiis, accusantium autem et nobis eligendi qui similique. Voluptatibus, quisquam deserunt autem doloremque sed illo impedit reiciendis, dolore error quaerat molestias animi, laudantium laborum iure? Odit, magnam temporibus explicabo perferendis, eos consequatur voluptatum unde sapiente iusto vitae labore accusantium autem deserunt ullam animi quod sunt, assumenda dicta corporis aliquam aut exercitationem. Excepturi consequuntur molestias inventore culpa quisquam nam vel reiciendis soluta accusamus nemo et dolores minus fugiat voluptatibus sapiente enim similique, repellendus nostrum rerum quia repudiandae dignissimos maiores voluptas! Sed, at provident. Enim perferendis quos eveniet quis voluptates doloremque ipsam beatae nostrum officia aliquam quibusdam totam a inventore distinctio ipsum maiores molestiae, hic eum consequuntur illum soluta veniam necessitatibus quo. Dolor, corrupti, laborum, odio hic quod possimus quas tenetur eos illum omnis asperiores? Quidem explicabo a, optio cum rerum nobis? Dolorum iste veritatis odit natus corrupti accusantium alias eligendi cupiditate eaque, maxime quae tempore nam doloribus ex nostrum officia aliquam, voluptates molestias vitae consequatur mollitia! Voluptates ut inventore sunt numquam eveniet ducimus id harum reprehenderit ipsa! Consequuntur labore eum eaque iusto nemo debitis, quia, a ullam praesentium vitae tempora blanditiis sint accusamus, repudiandae molestiae! Reiciendis provident praesentium sed maxime maiores voluptas est corporis eligendi quasi veritatis facilis a nemo placeat mollitia dolorum reprehenderit sapiente voluptatum tempore, alias porro dicta? Nobis incidunt consectetur aperiam harum eius voluptatem, consequatur magnam fugit hic cum dolore non ab rerum. Laboriosam illum aut laudantium impedit voluptate temporibus dolore aperiam sit dolorem! Corrupti minus enim quo aspernatur, quod nemo beatae? Corporis optio perferendis corrupti dolorum rerum impedit hic, a et. Enim qui corrupti vel beatae natus quasi vero quibusdam molestiae, est exercitationem dolores? Magni suscipit optio porro obcaecati cumque doloribus expedita quaerat voluptatum nesciunt eum, quia inventore tenetur, voluptas architecto? Ullam voluptatibus, odio magnam aut incidunt officia modi eum dignissimos obcaecati facilis autem sit, maiores quo tempore! Doloribus dolor nihil atque quos sapiente beatae dicta unde ab saepe, cupiditate eligendi praesentium dolorem modi dignissimos, minus aspernatur ipsam, aut id iste tenetur est recusandae. Id minus praesentium sint assumenda ratione cupiditate magni fuga neque itaque quasi omnis, consequatur aliquid officiis laudantium rem delectus fugiat animi autem ipsam qui eveniet. Quibusdam quod doloribus unde, quis mollitia debitis consequatur, expedita eaque voluptatem molestiae illo voluptate, ipsam dolore sequi ratione quo dignissimos minus quisquam magnam? Sit nesciunt, molestias expedita similique reprehenderit ad impedit libero rerum dignissimos, eius vel distinctio? In provident unde tempore officia? Veritatis laudantium expedita voluptas? Nam dolorem amet, mollitia doloribus a exercitationem corporis, eligendi delectus ipsa, impedit at ut voluptas quo autem sint? Nemo rerum dolorum placeat consequatur neque, esse harum animi? Nostrum ex ea minima ipsam, itaque sapiente a nemo architecto accusantium repellat odit at repudiandae perferendis cumque nam inventore perspiciatis ad iusto placeat voluptas possimus modi incidunt! Fugiat sit suscipit hic culpa. Blanditiis culpa natus, quidem alias unde sunt nostrum atque provident, odio dolor ea debitis molestias saepe soluta hic asperiores qui corrupti ipsam doloremque accusantium quia autem vero. Molestiae voluptate cum nesciunt exercitationem eligendi voluptates, neque minus vitae expedita recusandae placeat aliquid cupiditate beatae dicta ratione ducimus temporibus possimus sed atque. Commodi dicta in ipsam minus sequi, numquam optio fugiat aut ipsum quibusdam ea itaque asperiores non nam nostrum quidem corporis doloremque. Reiciendis reprehenderit repellendus voluptatibus esse eius temporibus vitae tempore suscipit perferendis veritatis exercitationem totam molestiae accusamus cum nisi, accusantium laudantium et inventore neque, qui assumenda earum dolores ad distinctio. Explicabo dolorum dolores autem suscipit ab impedit illo non corrupti officiis molestiae. Beatae, vero quasi? Vitae placeat, debitis reprehenderit rerum repellendus dignissimos ipsam distinctio labore atque ratione doloribus delectus cum recusandae, rem eum amet iste voluptatem soluta? Labore hic reiciendis architecto aut, perspiciatis excepturi quaerat quam eveniet ipsum accusantium inventore. Reprehenderit iste laboriosam fugiat, deleniti ad sequi expedita animi corrupti, fugit laborum ullam architecto facere distinctio. Mollitia fuga dolorum inventore doloribus in iste possimus eaque sunt autem quaerat minima dignissimos libero maiores atque quos aut, pariatur quibusdam veritatis necessitatibus! Officiis, maiores soluta fugit expedita, facere sequi commodi ducimus deserunt quas fugiat voluptate incidunt rerum facilis quod mollitia repellendus itaque molestiae voluptatibus. Vel blanditiis tempora itaque alias, reiciendis, animi magni assumenda laudantium perspiciatis numquam aliquid corporis quod quia rem laboriosam eaque fugit repellat, ipsum nisi magnam dolorum. Dolores, non facere? Quos, iste maxime modi eos temporibus voluptatem laboriosam eius non voluptas alias adipisci ducimus reprehenderit odio dolor distinctio debitis est sint. Commodi! */}
              {chatBarUsers?.map((item, index) => (
           <table className="messenger-list-item mt-3" data-contact={7}>
           <tbody>

             <tr  data-action={0} onClick={()=>navigate(`/chat/${item.id}`)}  style={{cursor:'pointer'}}>
               <td  >
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
      
    </div>
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
