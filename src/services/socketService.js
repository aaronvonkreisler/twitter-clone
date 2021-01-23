import { io } from 'socket.io-client';

let endpoint;

if (process.env.NODE_ENV === 'development') {
   endpoint = 'http://localhost:5000';
} else {
   endpoint = 'https://tweeter-v1-api.herokuapp.com/';
}

export const socket = io(endpoint, {
   autoConnect: false,
});
