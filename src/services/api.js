import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    contentType: 'Application/json'
  }
});

export default api;
