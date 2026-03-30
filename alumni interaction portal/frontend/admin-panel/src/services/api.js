import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header setter
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.user.role !== 'admin') {
      throw new Error('Access denied. Admin only.');
    }
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('adminUser'));
  }
};

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getPendingAlumni: async () => {
    const response = await api.get('/admin/pending-alumni');
    return response.data;
  },
  approveAlumni: async (id) => {
    const response = await api.put(`/admin/approve/${id}`);
    return response.data;
  },
  rejectAlumni: async (id) => {
    const response = await api.delete(`/admin/reject/${id}`);
    return response.data;
  },
  getUsers: async (role = '') => {
    const response = await api.get(`/admin/users${role ? `?role=${role}` : ''}`);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};

export const postService = {
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};

export const eventService = {
  getEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};

export default api;
