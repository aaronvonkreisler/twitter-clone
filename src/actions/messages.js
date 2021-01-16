import {
   SEND_DM_START,
   SEND_DM_SUCCESS,
   DM_ERROR,
   FETCH_MESSAGES_START,
   FETCH_MESSAGES_SUCCESS,
   CLEAR_MESSAGES,
} from './types';
import { setAlert } from './alerts';
import {
   postMessage,
   fetchMessages,
   postMessageWithImage,
} from '../services/messages';

export const sendDirectMessage = (content) => async (dispatch) => {
   try {
      dispatch({ type: SEND_DM_START });

      const response = await postMessage(content);
      dispatch({
         type: SEND_DM_SUCCESS,
         payload: { chatId: response.chat, message: response },
      });
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

export const sendDirectMessageWithImage = (formData) => async (dispatch) => {
   try {
      dispatch({ type: SEND_DM_START });

      const response = await postMessageWithImage(formData);
      dispatch({
         type: SEND_DM_SUCCESS,
         payload: { chatId: response.chat, message: response },
      });
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
