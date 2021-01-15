import {
   FETCH_INBOX_ERROR,
   FETCH_INBOX_SUCCESS,
   FETCH_INBOX_START,
   CREATE_NEW_CHAT,
   CHAT_ERROR,
   SELECT_CHAT,
   CLEAR_SELECTED_CHAT,
   GET_CHAT_WITH_SPECIFIC_USER,
} from './types';
import { setAlert } from './alerts';
import {
   fetchChats,
   createNewChat,
   getChatWithSpecificUser,
} from '../services/chats';

export const getUsersChats = () => async (dispatch) => {
   try {
      dispatch({ type: FETCH_INBOX_START });
      const response = await fetchChats();
      dispatch({
         type: FETCH_INBOX_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: FETCH_INBOX_ERROR,
         payload: err.message,
      });
      dispatch(setAlert(err.message, 'info'));
   }
};

export const startNewChat = (userIds) => async (dispatch) => {
   try {
      const response = await createNewChat(userIds);
      dispatch({
         type: CREATE_NEW_CHAT,
         payload: { id: response._id, chat: response },
      });
   } catch (err) {
      dispatch({
         type: CHAT_ERROR,
         payload: err.message,
      });
      dispatch(setAlert('Please try again later', 'info'));
   }
};

export const getOrCreateChat = (userId, history) => async (dispatch) => {
   try {
      const response = await getChatWithSpecificUser(userId);
      dispatch({
         type: GET_CHAT_WITH_SPECIFIC_USER,
         payload: response,
      });
      history.push('/messages');
   } catch (err) {
      console.error(err.message);
      dispatch({
         type: CHAT_ERROR,
         payload: err.message,
      });
   }
};

export const selectChat = (chat) => ({
   type: SELECT_CHAT,
   payload: chat,
});

export const clearSelectedChat = () => ({
   type: CLEAR_SELECTED_CHAT,
});
