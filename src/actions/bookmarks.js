import api from '../utils/api';
import { setAlert } from './alerts';
import {
  GET_BOOKMARKS,
  BOOKMARKS_ERROR,
  CLEAR_BOOKMARKS,
  ADD_TO_BOOKMARKS,
  REMOVE_BOOKMARK_ITEM,
  REMOVE_ALL_BOOKMARKS,
} from './types';

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

export const addTweetToBookmarks = (tweetId) => async (dispatch) => {
  try {
    const res = await api.post(`/api/bookmarks/${tweetId}`);

    dispatch({
      type: ADD_TO_BOOKMARKS,
      payload: res.data,
    });

    dispatch(setAlert('Tweet added to your bookmarks', 'info'));
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeTweetFromBookmarks = (tweetId) => async (dispatch) => {
  try {
    const res = await api.put(`/api/bookmarks/${tweetId}`);

    dispatch({
      type: REMOVE_BOOKMARK_ITEM,
      payload: res.data,
    });

    dispatch(setAlert('Tweet removed from your bookmarks', 'info'));
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeAllBookmarks = () => async (dispatch) => {
  try {
    const res = await api.delete('/api/bookmarks');
    dispatch({
      type: REMOVE_ALL_BOOKMARKS,
    });

    dispatch(setAlert(res.data.msg, 'info'));
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
