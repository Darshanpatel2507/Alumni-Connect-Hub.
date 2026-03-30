import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { authService } from './services/api';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AlumniApproval from './pages/AlumniApproval';
import UserManagement from './pages/UserManagement';
import PostManagement from './pages/PostManagement';
import EventManagement from './pages/EventManagement';
import Sidebar from './components/Sidebar';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const user = authService.getCurrentUser();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="user-info">
            Welcome, <strong>{user.name}</strong>
          </div>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/approvals" element={<AlumniApproval />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/events" element={<EventManagement />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
