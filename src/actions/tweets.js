import api from '../utils/api';
import { setAlert } from './alerts';
import { GET_TIMELINE_TWEETS, ADD_TWEET, TWEETS_ERROR } from './types';

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
