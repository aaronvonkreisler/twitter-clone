import {
   TWEETS_ERROR,
   GET_TIMELINE_TWEETS,
   ADD_TWEET,
   DELETE_TWEET,
} from '../actions/types';

const initialState = {
   tweets: [],
   tweet: null,
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;
   switch (type) {
      case GET_TIMELINE_TWEETS:
         return { ...state, tweets: payload, loading: false };
      case TWEETS_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
         };
      case ADD_TWEET:
         return {
            ...state,
            tweets: [payload, ...state.tweets],
            loading: false,
         };
      case DELETE_TWEET:
         return {
            ...state,
            tweets: state.tweets.filter((tweet) => tweet._id !== payload),
            loading: false,
         };
      default:
         return state;
   }
}
