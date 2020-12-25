import api from '../utils/api';
import { GET_BOOKMARKS, BOOKMARKS_ERROR, CLEAR_BOOKMARKS } from './types';

export const clearBookmarkState = () => ({
   type: CLEAR_BOOKMARKS,
});

export const getUserBookmarks = () => async (dispatch) => {
   try {
      const res = await api.get('/api/bookmarks');

      dispatch({
         type: GET_BOOKMARKS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: BOOKMARKS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
