import api from '../utils/api';
import { setAlert } from './alerts';
import {
   GET_TIMELINE_TWEETS,
   GET_TWEET,
   ADD_TWEET,
   TWEETS_ERROR,
   DELETE_TWEET,
   UPDATE_FAVORITES,
   REPLY_TO_TWEET,
} from './types';

export const getTimelineTweets = () => async (dispatch) => {
   try {
      const res = await api.get('/api/tweets');

      dispatch({
         type: GET_TIMELINE_TWEETS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
      setAlert('There was an error getting your timeline tweets', 'info');
   }
};

export const getTweet = (id) => async (dispatch) => {
   try {
      const res = await api.get(`/api/tweets/${id}`);
      dispatch({
         type: GET_TWEET,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const addTweet = (content) => async (dispatch) => {
   try {
      const res = await api.post('/api/tweets', content);

      dispatch({
         type: ADD_TWEET,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const deleteTweet = (id) => async (dispatch) => {
   try {
      await api.delete(`/api/tweets/${id}`);

      dispatch({
         type: DELETE_TWEET,
         payload: id,
      });
      dispatch(setAlert('Tweet removed', 'info'));
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const favoriteTweet = (id) => async (dispatch) => {
   try {
      const res = await api.put(`/api/tweets/like/${id}`);
      dispatch({
         type: UPDATE_FAVORITES,
         payload: { id, favorites: res.data },
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const removeFavorite = (id) => async (dispatch) => {
   try {
      let res = api.put(`/api/tweets/unlike/${id}`);
      if (res.data === undefined) {
         res.data = [];
      }

      dispatch({
         type: UPDATE_FAVORITES,
         payload: { id, favorites: res.data },
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const replyToTweet = (tweetId, content) => async (dispatch) => {
   try {
      let res = await api.post(`/api/tweets/${tweetId}`, content);

      dispatch({
         type: REPLY_TO_TWEET,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });

      dispatch(
         setAlert('There was an error sending your reply. Try again.', 'info')
      );
   }
};
