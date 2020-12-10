import api from '../utils/api';
import { setAlert } from './alerts';
import {
   GET_TIMELINE_TWEETS,
   ADD_TWEET,
   TWEETS_ERROR,
   DELETE_TWEET,
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
