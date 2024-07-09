import React from 'react';
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

function App() {
  const{
    isMenuExpanded
  }=useAppContext();
  return (
    <Router>
      <div className={`${isMenuExpanded ? ' light-style layout-menu-fixed layout-menu-expanded' : 'light-style layout-menu-fixed '}`}>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/tag" element={<Tag />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/users" element={<Users />} />
                <Route path="/clients" element={<Clients />} />
              </Routes>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
        
      </div>
    </Router>
  );
}

export default App;
