import { getSuggestedUsers } from '../services/timeline';
import {
   SIDEBAR_SUGGESTIONS_LOADED,
   SUGGESTIONS_ERROR,
   GET_SUGGESTED_USERS,
   CLEAR_CONNECT_USERS,
} from './types';

export const getSidebarSuggestions = (max) => async (dispatch) => {
   try {
      const response = await getSuggestedUsers(max);
      dispatch({
         type: SIDEBAR_SUGGESTIONS_LOADED,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: SUGGESTIONS_ERROR,
         payload: err.message,
      });
   }
};

export const getManySuggestedUsers = (max) => async (dispatch) => {
   try {
      const response = await getSuggestedUsers(max);
      dispatch({
         type: GET_SUGGESTED_USERS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: SUGGESTIONS_ERROR,
         payload: err.message,
      });
   }
};

export const clearConnectUsers = () => ({
   type: CLEAR_CONNECT_USERS,
});
