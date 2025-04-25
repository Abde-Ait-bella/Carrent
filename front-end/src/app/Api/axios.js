import axios from 'axios'
import { makeStore } from '../../lib/store.ts';
import { clearUserData } from '../../lib/features/userSlice';

// Don't initialize store immediately
let store;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(
  config => {
    // Only access browser APIs when on the client
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  }
);

api.interceptors.response.use(
  response => response,
  function(error) {
    // Only handle auth errors on the client side
    if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
      // Initialize store only when needed
      if (!store) {
        store = makeStore();
      }
      store.dispatch(clearUserData());
    }
    return Promise.reject(error);
  }
);

export default api
