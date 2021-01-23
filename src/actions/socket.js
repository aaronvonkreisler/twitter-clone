import { CONNECT_SOCKET, DISCONNECT_SOCKET } from './types';
import { socket } from '../services/socketService';
import { setAlert } from './alerts';
import store from '../store/store';
import { updateMessages } from './messages';

export const connectSocket = () => (dispatch) => {
   socket.connect();
   dispatch({
      type: CONNECT_SOCKET,
      payload: socket,
   });

   socket.on('connect', () => {
      console.log('socket connected', socket.connected);
   });

   socket.on('message received', (chat) => {
      const appState = store.getState();
      const isMessageDisplayed =
         appState.chats.selectedChat !== null &&
         appState.chats.selectedChat._id === chat.chat;

      if (isMessageDisplayed) {
         dispatch(updateMessages(chat));
      } else {
         dispatch(setAlert('message received', 'info'));
      }
   });
};

export const disconnectSocket = () => ({
   type: DISCONNECT_SOCKET,
});
