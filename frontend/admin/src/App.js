import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Favorite from './pages/project/Favorite';
import Manage from './pages/project/Manage';
import Tag from './pages/project/Tag';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Meeting from './pages/Meeting';
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

function App() {
  const { isMenuExpanded } = useAppContext();



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
      console.log(err);
    });
  }, [activeId]);

  return (
    <Router>
      <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
             <Sidebar />
            <div className="layout-page">
              <div className="content-wrapper">
                <Routes>
                  <Route path="/" element={<Protected Component={Dashboard} />} />
                  <Route path="/profile" element={<Protected Component={Profile} />} />
                  <Route path="/favorite" element={<Protected Component={Favorite} />} />
                  <Route path="/manage" element={<Protected Component={Manage} />} />
                  <Route path="/tag" element={<Protected Component={Tag} />} />
                  <Route path="/tasks" element={<Protected Component={Tasks} />} />
                  <Route path="/meeting" element={<Protected Component={Meeting} />} />
                  <Route path="/users" element={<Protected Component={Users} />} />
                  <Route path="/clients" element={<Protected Component={Clients} />} />
                  <Route path="/general" element={<Protected Component={General} />} />
                  {data && data.role === "super-admin" &&
                    <>
                      <Route path="/register" element={<Protected Component={Register} />} />
                      <Route path="/manageUsers" element={<Protected Component={Manageusers} />} />
                      <Route path="/userview/:id" element={<Protected Component={Userview} />} />
                      <Route path="/editusers/:id" element={<Protected Component={Editusers} />} />
                      <Route path="/changeUserPassword/:id" element={<Protected Component={ChangeUserPass} />} />
                    </>
                  }
                  <Route path="*" element={<NotFound />} />  {/* Add the NotFound route */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
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
//           {shouldRenderLayout && <Navbar />}
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
