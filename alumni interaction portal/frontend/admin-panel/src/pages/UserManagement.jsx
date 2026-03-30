import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Trash2 } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filterRole]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers(filterRole);
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete user ${name}? This cannot be undone.`)) {
      try {
        await adminService.deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <select 
          value={filterRole} 
          onChange={(e) => setFilterRole(e.target.value)}
          className="form-control"
          style={{ width: 'auto' }}
        >
          <option value="">All Users</option>
          <option value="student">Students</option>
          <option value="alumni">Alumni</option>
        </select>
      </div>
      
      <div className="card">
        {loading ? (
          <div>Loading users...</div>
        ) : users.length === 0 ? (
          <p className="empty-state">No users found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.role === 'student' ? (
                      <span className="text-green">Active</span>
                    ) : user.isApproved ? (
                      <span className="text-green">Approved</span>
                    ) : (
                      <span className="text-orange">Pending</span>
                    )}
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(user._id, user.name)} 
                      className="btn-icon btn-reject"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
