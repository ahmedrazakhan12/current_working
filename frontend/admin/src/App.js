import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import Register from './pages/Register';

function App() {
  const{
    isMenuExpanded
  }=useAppContext();

  const shouldRenderLayout = window.location !== "/login";


  return (
    <Router>
      <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
        {shouldRenderLayout && <Sidebar />}
          <div className="layout-page">
          {shouldRenderLayout && <Navbar />}
            <div className="content-wrapper">
              <Routes>
                 <Route path="/" element={<Protected Component={Dashboard} />} />
                 <Route path="/profile" element={<Protected Component={Profile} />} />
                <Route path="/favorite"element={<Protected Component={Favorite} />}  />
                <Route path="/manage" element={<Protected Component={Manage} />} />
                <Route path="/tag" element={<Protected Component={Tag} />} />
                <Route path="/tasks" element={<Protected Component={Tasks} />}  />
                <Route path="/meeting" element={<Protected Component={Meeting} />}  />
                <Route path="/users" element={<Protected Component={Users} />}  />
                <Route path="/clients" element={<Protected Component={Clients} />} />
              </Routes>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
        
      </div>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </Router>
  );
}

export default App;
