import React, { useEffect, useState } from 'react';
import { eventService } from '../services/api';
import { Trash2, Plus } from 'lucide-react';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', type: 'in-person', tag: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        setEvents(events.filter(e => e._id !== id));
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = await eventService.createEvent(formData);
      setEvents([...events, newEvent]);
      setFormData({ title: '', description: '', date: '', time: '', location: '', type: 'in-person', tag: '' });
      setShowForm(false);
    } catch (err) {
      alert('Failed to create event');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Event Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Create Event
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3>Create New Event</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Event Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Date (e.g., Apr 15, 2026)</label>
              <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="in-person">In-Person</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tag (e.g., Networking)</label>
              <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary">Publish Event</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="card">
        {loading ? (
          <div>Loading events...</div>
        ) : events.length === 0 ? (
          <p className="empty-state">No events found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev._id}>
                  <td>{ev.title}</td>
                  <td>{ev.date} {ev.time ? `at ${ev.time}` : ''}</td>
                  <td>{ev.location}</td>
                  <td><span className={`badge badge-${ev.type === 'virtual' ? 'student' : 'alumni'}`}>{ev.type}</span></td>
                  <td>
                    <button onClick={() => handleDelete(ev._id)} className="btn-icon btn-reject" title="Delete">
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

export default EventManagement;
