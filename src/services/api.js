import Axios from 'axios';

const api = Axios.create({
  baseURL: process.env.VITE_BASE_URL,
  headers: {
    contentType: 'Application/json'
  }
});

export default api;
