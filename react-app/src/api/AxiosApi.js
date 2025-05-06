import axios from 'axios';

// In production with Nginx, we can use a relative URL
// In development, we need the full URL with host and port
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction 
  ? '/api' 
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api');

const api = axios.create({
  baseURL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor for future auth implementation
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle auth error (redirect to login, etc.)
      localStorage.removeItem('token');
      // window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;