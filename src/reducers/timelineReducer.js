import {
   FETCH_TWEETS_FAILURE,
   FETCH_TWEETS_START,
   FETCH_TWEETS_SUCCESS,
} from '../actions/types';

const initialState = {
   tweets: [],
   fetching: true,
   error: false,
   hasMore: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case FETCH_TWEETS_START:
         return {
            ...state,
            fetching: true,
            error: false,
         };
      case FETCH_TWEETS_SUCCESS:
         return {
            ...state,
            fetching: false,
            error: false,
            tweets: [...state.tweets, ...payload],
            hasMore: payload.length === 10,
         };
      case FETCH_TWEETS_FAILURE:
         return {
            ...state,
            fetching: false,
            error: payload,
         };
      default:
         return state;
   }
}
