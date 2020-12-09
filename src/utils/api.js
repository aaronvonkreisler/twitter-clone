import axios from 'axios';
import store from '../store/store';
import { LOG_OUT } from '../actions/types';

const api = axios.create({
   baseURL: 'https://tweeter-v1-api.herokuapp.com/',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Intercept any unauthorized error responses to the API
// and check if the token has expired and log out the user

api.interceptors.response.use(
   (res) => res,
   (err) => {
      if (err.response.status === 401) {
         store.dispatch({ type: LOG_OUT });
      }
      return Promise.reject(err);
   }
);

export default api;
