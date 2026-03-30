import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  MessageSquare, 
  Calendar, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <h2>AlumniHub</h2>
          <span>Admin Portal</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/approvals" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <UserCheck size={20} />
          <span>Alumni Approvals</span>
        </NavLink>
        
        <NavLink to="/users" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Users size={20} />
          <span>User Management</span>
        </NavLink>
        
        <NavLink to="/posts" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <MessageSquare size={20} />
          <span>Post Management</span>
        </NavLink>
        
        <NavLink to="/events" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Calendar size={20} />
          <span>Event Management</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
