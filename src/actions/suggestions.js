import { getSuggestedUsers } from '../services/timeline';
import { SIDEBAR_SUGGESTIONS_LOADED, SUGGESTIONS_ERROR } from './types';

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
