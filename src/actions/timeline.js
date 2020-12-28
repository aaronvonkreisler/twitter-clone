import { retrieveTimelineTweets } from '../services/timeline';

import {
   FETCH_TWEETS_FAILURE,
   FETCH_TWEETS_START,
   FETCH_TWEETS_SUCCESS,
} from './types';

export const fetchTimelineTweetsStart = (offset) => async (dispatch) => {
   try {
      dispatch({
         type: FETCH_TWEETS_START,
      });
      const response = await retrieveTimelineTweets(offset);

      dispatch({
         type: FETCH_TWEETS_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: FETCH_TWEETS_FAILURE,
         payload: err.message,
      });
   }
};
