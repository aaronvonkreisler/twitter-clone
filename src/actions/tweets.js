import api from '../utils/api';
import { setAlert } from './alerts';
import {
   submitTweet,
   fetchReplies,
   fetchTweet,
   submitRetweet,
   removeTweet,
   favorite,
   unfavorite,
   submitReply,
   pinTweet,
   getLikedUsers,
   submitImageTweet,
   submitImageReply,
} from '../services/tweets';
import {
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
   PHOTO_UPLOAD_ERROR,
   REMOVE_PINNED_TWEET,
   PIN_TWEET_TO_PROFILE,
   FETCH_LIKES_START,
   FETCH_LIKES_SUCCESS,
   CLEAR_LIKES,
} from './types';

export const photoUploadError = () => async (dispatch) => {
   dispatch({ type: PHOTO_UPLOAD_ERROR });
   dispatch(setAlert('This file type is not supported', 'info'));
};

export const getTweetsReplies = (id) => async (dispatch) => {
   try {
      const response = await fetchReplies(id);
      dispatch({
         type: GET_TWEETS_REPLIES,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const getTweet = (id) => async (dispatch) => {
   try {
      const response = await fetchTweet(id);
      dispatch({
         type: GET_TWEET,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const addTweet = (tweet) => async (dispatch) => {
   try {
      const response = await submitTweet(tweet);

      dispatch({
         type: ADD_TWEET,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const addTweetWithImage = (formData) => async (dispatch) => {
   try {
      const response = await submitImageTweet(formData);
      dispatch({
         type: ADD_TWEET,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};
export const retweet = (id) => async (dispatch) => {
   try {
      const response = await submitRetweet(id);

      dispatch({
         type: RETWEET_SUCCESS,
         payload: { id, users: response.retweetUsers },
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const deleteTweet = (id) => async (dispatch) => {
   try {
      await removeTweet(id);

      dispatch({
         type: DELETE_TWEET,
         payload: id,
      });
      dispatch(setAlert('Tweet removed', 'info'));
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const favoriteTweet = (id) => async (dispatch) => {
   try {
      const response = await favorite(id);
      dispatch({
         type: UPDATE_FAVORITES,
         payload: { id, favorites: response },
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const removeFavorite = (id) => async (dispatch) => {
   try {
      const response = await unfavorite(id);

      dispatch({
         type: UPDATE_FAVORITES,
         payload: { id, favorites: response },
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const replyToTweet = (id, reply, location) => async (dispatch) => {
   try {
      const response = await submitReply(id, reply);
      if (location.pathname === '/home') {
         dispatch({
            type: REPLY_TO_TWEET_FROM_HOME,
            payload: { id, replies: response },
         });
         dispatch(setAlert('Reply sent', 'info'));
      } else {
         dispatch({
            type: REPLY_TO_TWEET_FROM_STATUS,
            payload: response,
         });
      }
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });

      dispatch(
         setAlert('There was an error sending your reply. Try again.', 'info')
      );
   }
};

export const replyToTweetWithImage = (id, formData, location) => async (
   dispatch
) => {
   try {
      const response = await submitImageReply(id, formData);

      if (location.pathname === '/home') {
         dispatch({
            type: REPLY_TO_TWEET_FROM_HOME,
            payload: { id, replies: response },
         });
         dispatch(setAlert('Reply sent', 'info'));
      } else {
         dispatch({
            type: REPLY_TO_TWEET_FROM_STATUS,
            payload: response,
         });
      }
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
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
      const response = await pinTweet(tweetId);
      dispatch({
         type: PIN_TWEET_TO_PROFILE,
         payload: response,
      });
      dispatch(setAlert('Tweet pinned to your profile', 'info'));
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });

      dispatch(setAlert('There was an error pinning your tweet.', 'info'));
   }
};

export const removePinnedTweetFromProfile = () => async (dispatch) => {
   try {
      await api.put('/api/tweets/remove-pin');

      dispatch({
         type: REMOVE_PINNED_TWEET,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const clearTweetState = () => ({
   type: CLEAR_TWEET_STATE,
});

export const getTweetsLikedUsers = (tweetId) => async (dispatch) => {
   try {
      dispatch({
         type: FETCH_LIKES_START,
      });
      const response = await getLikedUsers(tweetId);
      dispatch({
         type: FETCH_LIKES_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: TWEETS_ERROR,
         payload: err.message,
      });
   }
};

export const clearLikes = () => ({
   type: CLEAR_LIKES,
});
