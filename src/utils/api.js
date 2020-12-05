import axios from 'axios';
import store from '../store/store';

const api = axios.create({
   baseURL: 'https://tweeter-v1-api.herokuapp.com/',
   headers: {
      'Content-Type': 'application/json',
   },
});

export default api;
