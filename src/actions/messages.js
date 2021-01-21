import {
   SEND_DM_START,
   SEND_DM_SUCCESS,
   DM_ERROR,
   FETCH_MESSAGES_START,
   FETCH_MESSAGES_SUCCESS,
   CLEAR_MESSAGES,
   UPDATE_MESSAGES,
} from './types';
import { setAlert } from './alerts';
import { socket } from '../services/socketService';
import {
   postMessage,
   fetchMessages,
   postMessageWithImage,
} from '../services/messages';

export const sendDirectMessage = (content, chat) => async (dispatch) => {
   try {
      dispatch({ type: SEND_DM_START });

      const response = await postMessage(content);
      dispatch({
         type: SEND_DM_SUCCESS,
         payload: { chatId: response.chat, message: response },
      });

      socket.emit('new message', chat);
   } catch (err) {
      dispatch({
         type: DM_ERROR,
         payload: err.message,
      });
      dispatch(
         setAlert('Could not send your message. Please try later', 'info')
      );
   }
};

export const sendDirectMessageWithImage = (formData, chat) => async (
   dispatch
) => {
   try {
      dispatch({ type: SEND_DM_START });

      const response = await postMessageWithImage(formData);
      dispatch({
         type: SEND_DM_SUCCESS,
         payload: { chatId: response.chat, message: response },
      });
      socket.emit('new message', chat);
   } catch (err) {
      dispatch({
         type: DM_ERROR,
         payload: err.message,
      });
      dispatch(
         setAlert('Could not send your message. Please try later', 'info')
      );
   }
};

export const getMessagesForChat = (chatId) => async (dispatch) => {
   try {
      dispatch({ type: FETCH_MESSAGES_START });

      const response = await fetchMessages(chatId);

      dispatch({
         type: FETCH_MESSAGES_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: DM_ERROR,
         payload: err.message,
      });
      dispatch(setAlert('Could not get messages. Please try later', 'info'));
   }
};

export const clearMessages = () => ({
   type: CLEAR_MESSAGES,
});

export const updateMessages = (message) => ({
   type: UPDATE_MESSAGES,
   payload: message,
});
