import axios from 'axios';
// import store from '../store/store';
// import { LOG_OUT } from '../actions/types';

let endpoint;

if (process.env.NODE_ENV === 'development') {
   endpoint = 'http://localhost:5000';
} else {
   endpoint = 'https://tweeter-v1-api.herokuapp.com/';
}
const api = axios.create({
   baseURL: endpoint,
   headers: {
      'Content-Type': 'application/json',
   },
});

export const multipartApi = axios.create({
   baseURL: endpoint,
   headers: {
      'Content-Type': 'multipart/form-data',
   },
});

// Intercept any unauthorized error responses to the API
// and check if the token has expired and log out the user

// UNCOMMENT BELOW CODE FOR PRODUCTION

// api.interceptors.response.use(
//    (res) => res,
//    (err) => {
//       if (err.response.status === 401) {
//          store.dispatch({ type: LOG_OUT });
//       }
//       return Promise.reject(err);
//    }
// );

export default api;
