import api from '../utils/api';
import { setAlert } from './alerts';
import {
   GET_TIMELINE_TWEETS,
   GET_TWEET,
   ADD_TWEET,
   RETWEET_SUCCESS,
   TWEETS_ERROR,
   DELETE_TWEET,
   UPDATE_FAVORITES,
   REPLY_TO_TWEET_FROM_HOME,
   REPLY_TO_TWEET_FROM_STATUS,
   CLEAR_TWEET_STATE,
   GET_TWEETS_REPLIES,
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

export const getTweetsReplies = (id) => async (dispatch) => {
   try {
      const res = await api.get(`/api/tweets/${id}/replies`);
      dispatch({
         type: GET_TWEETS_REPLIES,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
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

export const retweet = (id) => async (dispatch) => {
   try {
      const res = await api.post(`/api/tweets/${id}/retweet`);

      dispatch({
         type: RETWEET_SUCCESS,
         payload: { id, users: res.data.retweetUsers },
      });
      dispatch(getTimelineTweets());
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
      let res = await api.put(`/api/tweets/unlike/${id}`);

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

export const replyToTweet = (id, content, location) => async (dispatch) => {
   try {
      let res = await api.post(`/api/tweets/comment/${id}`, content);
      if (location.pathname === '/home') {
         dispatch({
            type: REPLY_TO_TWEET_FROM_HOME,
            payload: { id, replies: res.data },
         });
         dispatch(setAlert('Reply sent', 'info'));
      } else {
         dispatch({
            type: REPLY_TO_TWEET_FROM_STATUS,
            payload: res.data,
         });
      }
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

export const reportTweet = () => async (dispatch) => {
   dispatch(setAlert('Tweet successfully reported', 'info'));
};

export const pinTweetToProfile = (tweetId) => async (dispatch) => {
   try {
      await api.put(`/api/tweets/pin-tweet/${tweetId}`);

      dispatch(setAlert('Tweet pinned to your profile', 'info'));
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });

      dispatch(setAlert('There was an error pinning your tweet.', 'info'));
   }
};

export const clearTweetState = () => ({
   type: CLEAR_TWEET_STATE,
});
