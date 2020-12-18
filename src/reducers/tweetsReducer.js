import {
   TWEETS_ERROR,
   GET_TIMELINE_TWEETS,
   GET_TWEET,
   ADD_TWEET,
   DELETE_TWEET,
   UPDATE_FAVORITES,
   REPLY_TO_TWEET_FROM_HOME,
   REPLY_TO_TWEET_FROM_STATUS,
} from '../actions/types';

const initialState = {
   tweets: [],
   tweet: null,
   loading: true,
   tweetReady: false,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;
   switch (type) {
      case GET_TIMELINE_TWEETS:
         return { ...state, tweets: payload, loading: false };
      case GET_TWEET:
         return {
            ...state,
            tweet: payload,
            loading: false,
            tweetReady: true,
         };
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
      case REPLY_TO_TWEET_FROM_STATUS:
         return {
            ...state,
            tweet: {
               ...state.tweet,
               replies: payload,
               replies_count: payload.length,
            },
            loading: false,
         };
      case REPLY_TO_TWEET_FROM_HOME:
         return {
            ...state,
            tweets: state.tweets.map((tweet) =>
               tweet._id === payload.id
                  ? {
                       ...tweet,
                       replies: payload.replies,
                       replies_count: payload.replies.length,
                    }
                  : tweet
            ),
            loading: false,
         };
      case UPDATE_FAVORITES:
         return {
            ...state,
            tweets: state.tweets.map((tweet) =>
               tweet._id === payload.id
                  ? {
                       ...tweet,
                       favorites: payload.favorites,
                       favorites_count: payload.favorites.length,
                    }
                  : tweet
            ),
            tweet: {
               ...state.tweet,
               favorites: payload.favorites,
               favorites_count: payload.favorites.length,
            },
            loading: false,
         };

      default:
         return state;
   }
}
