import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Favorite from './pages/project/Favorite';
import Manage from './pages/project/Manage';
import Tag from './pages/project/Tag';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Meeting from './pages/meeting/Meeting';
import Users from './pages/Users';
import Clients from './pages/Clients';
import Login from './pages/Login';
import Protected from './components/Protected';
import Profile from './pages/Profile';
import Register from './pages/users/Register';
import Manageusers from './pages/users/Manageusers';
import Userview from './pages/users/Userview';
import Editusers from './pages/users/Editusers';
import NotFound from './pages/Notfound';  // Import the NotFound component
import axios from 'axios';
import ChangeUserPass from './pages/users/ChangeUserPass';
import General from './pages/setting/General';
import Addproject from './pages/project/Addproject';
import EditPrject from './pages/project/EditProject';
import ChangePass from './pages/setting/ChangePass';
import Viewstatus from './pages/setting/status/Viewstatus';
import Priority from './pages/setting/priority/Priority';
import ProjectInformation from './pages/project/ProjectInformation';
import Addtasks from './pages/tasks/Addtasks';
import UpdateTasks from './pages/tasks/UpdateTasks';
import Breadcrumb from './components/Breadcrumb';
import SingleTask from './pages/tasks/SingleTask';
import Chat from './chat/Chat';
import ChatById from './chat/ChatById';
import Notification from './pages/notification/Notification';
import io from "socket.io-client";
import MDashboard from './member/MDashboard';
import MManageProject from './member/MManageProject';
import MProjectInformation from './member/MProjectInformation'
import Mfavorite from './member/Mfavorite';
import Mtasks from './member/Mtasks';
import MMeeting from './member/MMeeting';
import GChatById from './chat/GChatById';
import ChangeDisplay from './pages/setting/ChangeDisplay';
import DeletedUsers from './pages/users/DeletedUsers';
function App() {
  
  const { isMenuExpanded } = useAppContext();
  // const sockclsetUrl = "http://localhost:4000";




  const [data, setData] = useState([]);
  const activeId = localStorage.getItem("id");
  

  useEffect(() => {
     
      axios.get(`http://localhost:5000/admin/adminInfo/`, {
        headers: { Authorization: `${activeId}` }
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    
  }, [activeId]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/general/logos/`)
      .then((res) => {
        console.log(res.data);

        // Update the favicon
        const link = document.querySelector("link[rel~='icon']");
        if (!link) {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = res.data[0].favicon; // Use the fetched logo URL
          document.head.appendChild(newLink);
        } else {
          link.href = res.data[0].favicon;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // <Router>
      <>
      <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
             <Sidebar />
            <div className="layout-page">
              <Navbar />
              <Breadcrumb   />
              <div className="content-wrapper">
                <Routes>
                {data && data.role === "super-admin" || data.role === "admin" ? 
                    
                <>
                  <Route path="/" element={<Protected Component={Dashboard} />} />
                  <Route path="/manage" element={<Protected Component={Manage} />} />
                  <Route path="/projectInformation/:id" element={<Protected Component={ProjectInformation} />} />
                  <Route path="/favorite" element={<Protected Component={Favorite} />} />
                  <Route path="/tasks" element={<Protected Component={Tasks} />} />
                  <Route path="/meeting" element={<Protected Component={Meeting} />} />
                  <Route path="/userview/:id" element={<Protected Component={Userview} />} />
                  <Route path="/deletedUsers" element={<Protected Component={DeletedUsers} />} />

                  <Route path="/changeDisplay" element={<Protected Component={ChangeDisplay} />} />
                  <Route path="/viewStatus" element={<Protected Component={Viewstatus} />} />
                  <Route path="/priority" element={<Protected Component={Priority} />} />
                  <Route path="/addProject" element={<Protected Component={Addproject} />} />
                  <Route path="/addTask/:id" element={<Protected Component={Addtasks} />} />
                  <Route path="/editTask/:id" element={<Protected Component={UpdateTasks} />} />
                  <Route path="/editProject/:id" element={<Protected Component={EditPrject} />} />
                  <Route path="/register" element={<Protected Component={Register} />} />
                  <Route path="/manageUsers" element={<Protected Component={Manageusers} />} />
                  <Route path="/editusers/:id" element={<Protected Component={Editusers} />} />
                  <Route path="/changeUserPassword/:id" element={<Protected Component={ChangeUserPass} />} />
                </>
                  :
                <>
                  <Route path="/" element={<Protected Component={MDashboard} />} />
                  <Route path="/manage" element={<Protected Component={MManageProject} />} />
                  <Route path="/projectInformation/:id" element={<Protected Component={MProjectInformation} />} />
                  <Route path="/favorite" element={<Protected Component={Mfavorite} />} />
                  <Route path="/tasks" element={<Protected Component={Mtasks} />} />
                  <Route path="/meeting" element={<Protected Component={MMeeting} />} />

                
                </>
                }
                  <Route path="/profile" element={<Protected Component={Profile} />} />
                  <Route path="/users" element={<Protected Component={Users} />} />
                  <Route path="/clients" element={<Protected Component={Clients} />} />
                  <Route path="/general" element={<Protected Component={General} />} />
                  <Route path="/changePassword" element={<Protected Component={ChangePass} />} />
                 
                 
                  <Route path="/viewTask/:id" element={<Protected Component={SingleTask} />} />
                  <Route path="/chat" element={<Protected Component={Chat} />} />
                  <Route path="/chat/:id" element={<Protected Component={ChatById}  />} />
                  <Route path="/notifications" element={<Protected Component={Notification}  />} />
                  <Route path="/groupchat/:id" element={<Protected Component={GChatById} />} />

                 
                  <Route path="*" element={<NotFound />} />  {/* Add the NotFound route */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login  />} />
      </Routes></>
      
    // </Router>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import Tasks from './pages/Tasks';
// import Favorite from './pages/project/Favorite';
// import Manage from './pages/project/Manage';
// import Tag from './pages/project/Tag';
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Meeting from './pages/Meeting';
// import Users from './pages/Users';
// import Clients from './pages/Clients';
// import Login from './pages/Login';
// import Protected from './components/Protected';
// import Profile from './pages/Profile';
// import Register from './pages/users/Register';
// import Manageusers from './pages/users/Manageusers';
// import Userview from './pages/users/Userview';
// import Editusers from './pages/users/Editusers';
// import axios from 'axios';

// function App() {
//   const{
//     isMenuExpanded
//   }=useAppContext();

//   const shouldRenderLayout = window.location !== "/login";


//   const [data , setData] = useState([]);
//   const activeId = localStorage.getItem("id");

  
//   useEffect(() => {
//     axios.get(`http://localhost:5000/admin/adminInfo/`, {
//         headers: { Authorization: `${activeId}` }
//     })
//     .then((res) => {
//         setData(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// }, [activeId]);


//   return (
//     <Router>
//       <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
//       <div className="layout-wrapper layout-content-navbar">
//         <div className="layout-container">
//         {shouldRenderLayout && <Sidebar />}
//           <div className="layout-page">
//           {shouldRenderLayout &&  }
//             <div className="content-wrapper">
//               <Routes>
//                  <Route path="/" element={<Protected Component={Dashboard} />} />
//                  <Route path="/profile" element={<Protected Component={Profile} />} />
//                 <Route path="/favorite"element={<Protected Component={Favorite} />}  />
//                 <Route path="/manage" element={<Protected Component={Manage} />} />
//                 <Route path="/tag" element={<Protected Component={Tag} />} />
//                 <Route path="/tasks" element={<Protected Component={Tasks} />}  />
//                 <Route path="/meeting" element={<Protected Component={Meeting} />}  />
//                 <Route path="/users" element={<Protected Component={Users} />}  />
//                 <Route path="/clients" element={<Protected Component={Clients} />} />
//                 {data && data.role === "super-admin" && 
//                 <>
//                 <Route path="/register" element={<Protected Component={Register} />} />
//                 <Route path="/manageUsers" element={<Protected Component={Manageusers} />} />
//                 <Route path="/userview/:id" element={<Protected Component={Userview} />} />
//                 <Route path="/editusers/:id" element={<Protected Component={Editusers} />} />
//                 </>
//                 }
//               </Routes>
//               {/* {shouldRenderLayout && <Footer />} */}
//             </div>
//           </div>
//         </div>
//       </div>
        
//       </div>
//       <Routes>
//           <Route path="/login" element={<Login />} />
//         </Routes>

//     </Router>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import Tasks from './pages/Tasks';
// import Favorite from './pages/project/Favorite';
// import Manage from './pages/project/Manage';
// import Tag from './pages/project/Tag';
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Meeting from './pages/meeting/Meeting';
// import Users from './pages/Users';
// import Clients from './pages/Clients';
// import Login from './pages/Login';
// import Protected from './components/Protected';
// import Profile from './pages/Profile';
// import Register from './pages/users/Register';
// import Manageusers from './pages/users/Manageusers';
// import Userview from './pages/users/Userview';
// import Editusers from './pages/users/Editusers';
// import NotFound from './pages/Notfound';  // Import the NotFound component
// import axios from 'axios';
// import ChangeUserPass from './pages/users/ChangeUserPass';
// import General from './pages/setting/General';
// import Addproject from './pages/project/Addproject';
// import EditPrject from './pages/project/EditProject';
// import ChangePass from './pages/setting/ChangePass';
// import Viewstatus from './pages/setting/status/Viewstatus';
// import Priority from './pages/setting/priority/Priority';
// import ProjectInformation from './pages/project/ProjectInformation';
// import Addtasks from './pages/tasks/Addtasks';
// import UpdateTasks from './pages/tasks/UpdateTasks';
// import Breadcrumb from './components/Breadcrumb';
// import SingleTask from './pages/tasks/SingleTask';
// import Chat from './chat/Chat';
// import ChatById from './chat/ChatById';
// import Notification from './pages/notification/Notification';
// import io from "socket.io-client";
// import MDashboard from './member/MDashboard';
// import MManageProject from './member/MManageProject';
// import MProjectInformation from './member/MProjectInformation'
// import Mfavorite from './member/Mfavorite';
// import Mtasks from './member/Mtasks';
// import MMeeting from './member/MMeeting';
// import GChatById from './chat/GChatById';
// import ChangeDisplay from './pages/setting/ChangeDisplay';
// import DeletedUsers from './pages/users/DeletedUsers';
// function App() {
  
//   const { isMenuExpanded } = useAppContext();
//   // const sockclsetUrl = "http://localhost:4000";




//   const [data, setData] = useState([]);
//   const activeId = localStorage.getItem("id");
  

//   useEffect(() => {
     
//       axios.get(`http://localhost:5000/admin/adminInfo/`, {
//         headers: { Authorization: `${activeId}` }
//       })
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
    
//   }, [activeId]);
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/general/logos/`)
//       .then((res) => {
//         console.log(res.data);

//         // Update the favicon
//         const link = document.querySelector("link[rel~='icon']");
//         if (!link) {
//           const newLink = document.createElement("link");
//           newLink.rel = "icon";
//           newLink.href = res.data[0].favicon; // Use the fetched logo URL
//           document.head.appendChild(newLink);
//         } else {
//           link.href = res.data[0].favicon;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     // <Router>
//       <>
//       <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
//         <div className="layout-wrapper layout-content-navbar">
//           <div className="layout-container">
//              <Sidebar />
//             <div className="layout-page">
//               <Navbar />
//               <Breadcrumb   />
//               <div className="content-wrapper">
//                 <Routes>
//                 {data && data.role === "super-admin" || data.role === "admin" ? 
                    
//                 <>
//                   <Route path="/" element={<Protected Component={Dashboard} />} />
//                   <Route path="/manage" element={<Protected Component={Manage} />} />
//                   <Route path="/projectInformation/:id" element={<Protected Component={ProjectInformation} />} />
//                   <Route path="/favorite" element={<Protected Component={Favorite} />} />
//                   <Route path="/tasks" element={<Protected Component={Tasks} />} />
//                   <Route path="/meeting" element={<Protected Component={Meeting} />} />
//                   <Route path="/userview/:id" element={<Protected Component={Userview} />} />

//                 </>
//                   :
//                 <>
//                   <Route path="/" element={<Protected Component={MDashboard} />} />
//                   <Route path="/manage" element={<Protected Component={MManageProject} />} />
//                   <Route path="/projectInformation/:id" element={<Protected Component={MProjectInformation} />} />
//                   <Route path="/favorite" element={<Protected Component={Mfavorite} />} />
//                   <Route path="/tasks" element={<Protected Component={Mtasks} />} />
//                   <Route path="/meeting" element={<Protected Component={MMeeting} />} />

                
//                 </>
//                 }
//                   <Route path="/profile" element={<Protected Component={Profile} />} />
//                   <Route path="/users" element={<Protected Component={Users} />} />
//                   <Route path="/clients" element={<Protected Component={Clients} />} />
//                   <Route path="/general" element={<Protected Component={General} />} />
//                   <Route path="/changePassword" element={<Protected Component={ChangePass} />} />
                 
                 
//                   <Route path="/viewTask/:id" element={<Protected Component={SingleTask} />} />
//                   <Route path="/chat" element={<Protected Component={Chat} />} />
//                   <Route path="/chat/:id" element={<Protected Component={ChatById}  />} />
//                   <Route path="/notifications" element={<Protected Component={Notification}  />} />
//                   <Route path="/groupchat/:id" element={<Protected Component={GChatById} />} />

//                   {data && data.role === "super-admin" &&
//                     <>
//                       <Route path="/deletedUsers" element={<Protected Component={DeletedUsers} />} />
//                       <Route path="/changeDisplay" element={<Protected Component={ChangeDisplay} />} />
//                       <Route path="/viewStatus" element={<Protected Component={Viewstatus} />} />
//                       <Route path="/priority" element={<Protected Component={Priority} />} />
//                       <Route path="/addProject" element={<Protected Component={Addproject} />} />
//                       <Route path="/addTask/:id" element={<Protected Component={Addtasks} />} />
//                       <Route path="/editTask/:id" element={<Protected Component={UpdateTasks} />} />
//                       <Route path="/editProject/:id" element={<Protected Component={EditPrject} />} />
//                       <Route path="/register" element={<Protected Component={Register} />} />
//                       <Route path="/manageUsers" element={<Protected Component={Manageusers} />} />
//                       <Route path="/editusers/:id" element={<Protected Component={Editusers} />} />
//                       <Route path="/changeUserPassword/:id" element={<Protected Component={ChangeUserPass} />} />
//                     </>
//                   }
//                   <Route path="*" element={<NotFound />} />  {/* Add the NotFound route */}
//                 </Routes>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Routes>
//         <Route path="/login" element={<Login  />} />
//       </Routes></>
      
//     // </Router>
//   );
// }

// export default App;


// // import React, { useEffect, useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // import Sidebar from './components/Sidebar';
// // import Navbar from './components/Navbar';
// // import Dashboard from './pages/Dashboard';
// // import Tasks from './pages/Tasks';
// // import Favorite from './pages/project/Favorite';
// // import Manage from './pages/project/Manage';
// // import Tag from './pages/project/Tag';
// // import Footer from './components/Footer';
// // import { useAppContext } from './context/AppContext';
// // import Meeting from './pages/Meeting';
// // import Users from './pages/Users';
// // import Clients from './pages/Clients';
// // import Login from './pages/Login';
// // import Protected from './components/Protected';
// // import Profile from './pages/Profile';
// // import Register from './pages/users/Register';
// // import Manageusers from './pages/users/Manageusers';
// // import Userview from './pages/users/Userview';
// // import Editusers from './pages/users/Editusers';
// // import axios from 'axios';

// // function App() {
// //   const{
// //     isMenuExpanded
// //   }=useAppContext();

// //   const shouldRenderLayout = window.location !== "/login";


// //   const [data , setData] = useState([]);
// //   const activeId = localStorage.getItem("id");

  
// //   useEffect(() => {
// //     axios.get(`http://localhost:5000/admin/adminInfo/`, {
// //         headers: { Authorization: `${activeId}` }
// //     })
// //     .then((res) => {
// //         setData(res.data);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });
// // }, [activeId]);


// //   return (
// //     <Router>
// //       <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
// //       <div className="layout-wrapper layout-content-navbar">
// //         <div className="layout-container">
// //         {shouldRenderLayout && <Sidebar />}
// //           <div className="layout-page">
// //           {shouldRenderLayout &&  }
// //             <div className="content-wrapper">
// //               <Routes>
// //                  <Route path="/" element={<Protected Component={Dashboard} />} />
// //                  <Route path="/profile" element={<Protected Component={Profile} />} />
// //                 <Route path="/favorite"element={<Protected Component={Favorite} />}  />
// //                 <Route path="/manage" element={<Protected Component={Manage} />} />
// //                 <Route path="/tag" element={<Protected Component={Tag} />} />
// //                 <Route path="/tasks" element={<Protected Component={Tasks} />}  />
// //                 <Route path="/meeting" element={<Protected Component={Meeting} />}  />
// //                 <Route path="/users" element={<Protected Component={Users} />}  />
// //                 <Route path="/clients" element={<Protected Component={Clients} />} />
// //                 {data && data.role === "super-admin" && 
// //                 <>
// //                 <Route path="/register" element={<Protected Component={Register} />} />
// //                 <Route path="/manageUsers" element={<Protected Component={Manageusers} />} />
// //                 <Route path="/userview/:id" element={<Protected Component={Userview} />} />
// //                 <Route path="/editusers/:id" element={<Protected Component={Editusers} />} />
// //                 </>
// //                 }
// //               </Routes>
// //               {/* {shouldRenderLayout && <Footer />} */}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
        
// //       </div>
// //       <Routes>
// //           <Route path="/login" element={<Login />} />
// //         </Routes>

// //     </Router>
// //   );
// // }

// // export default App;


