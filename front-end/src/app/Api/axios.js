import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQxNDQxMjc3LCJleHAiOjE3NDE0NDQ4NzcsIm5iZiI6MTc0MTQ0MTI3NywianRpIjoiWmxYQkRCS0luTzdubFFNZSIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.80WgBije08VDjwZBb9r1iYlDL85txayNU5r97uRIzfo`
  }
})

api.interceptors.request.use(
  config => {
      let token = localStorage.getItem('token') || sessionStorage.getItem('token'); 
      if (token)
          config.headers.Authorization = `Bearer ${token}`;
      return config;
  }
);

api.interceptors.response.use(null, function(error) {
  if (error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('AUTHENTICATED')
      localStorage.removeItem('token')
      // window.location.href = "/";
  }
  
  return Promise.reject(error);
});

export default api
