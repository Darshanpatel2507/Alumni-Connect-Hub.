import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Users, GraduationCap, FileText, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingAlumni: 0,
    totalPosts: 0,
    totalEvents: 0,
    totalAlumni: 0,
    totalStudents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <span className="stat-sub">({stats.totalStudents} Students, {stats.totalAlumni} Alumni)</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <GraduationCap size={24} />
          </div>
          <div className="stat-details">
            <h3>Pending Approvals</h3>
            <p className="stat-number text-orange">{stats.pendingAlumni}</p>
            <span className="stat-sub">Alumni awaiting access</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green">
            <FileText size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Posts</h3>
            <p className="stat-number">{stats.totalPosts}</p>
            <span className="stat-sub">Across all forums</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <Calendar size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Events</h3>
            <p className="stat-number">{stats.totalEvents}</p>
            <span className="stat-sub">Scheduled on platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
