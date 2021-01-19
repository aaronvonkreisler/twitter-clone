import { CONNECT_SOCKET, DISCONNECT_SOCKET } from './types';
import { socket } from '../services/socketService';

export const connectSocket = () => (dispatch) => {
   dispatch({
      type: CONNECT_SOCKET,
      payload: socket,
   });

   socket.on('connect', () => {
      console.log('socket connected');
   });
};

export const disconnectSocket = () => ({
   type: DISCONNECT_SOCKET,
});
