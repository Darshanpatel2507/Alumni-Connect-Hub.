import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Check, X } from 'lucide-react';

const AlumniApproval = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const data = await adminService.getPendingAlumni();
      setPending(data);
    } catch (err) {
      setError('Failed to load pending requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveAlumni(id);
      setPending(pending.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to approve user');
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject and delete this registration?')) {
      try {
        await adminService.rejectAlumni(id);
        setPending(pending.filter(p => p._id !== id));
      } catch (err) {
        alert('Failed to reject user');
      }
    }
  };

  if (loading) return <div>Loading pending requests...</div>;

  return (
    <div>
      <h1 className="page-title">Alumni Approvals</h1>
      {error && <div className="alert error">{error}</div>}
      
      <div className="card">
        {pending.length === 0 ? (
          <p className="empty-state">No pending alumni requests.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Passing Year</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(alumni => (
                <tr key={alumni._id}>
                  <td>{alumni.name}</td>
                  <td>{alumni.email}</td>
                  <td>{alumni.branch || 'N/A'}</td>
                  <td>{alumni.passingYear || 'N/A'}</td>
                  <td>{new Date(alumni.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleApprove(alumni._id)} 
                      className="btn-icon btn-approve"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => handleReject(alumni._id)} 
                      className="btn-icon btn-reject"
                      title="Reject"
                    >
                      <X size={18} />
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

export default AlumniApproval;
