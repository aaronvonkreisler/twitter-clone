import {
   FETCH_TWEETS_FAILURE,
   FETCH_TWEETS_START,
   FETCH_TWEETS_SUCCESS,
   CLEAR_TIMELINE,
   DELETE_TWEET,
   UPDATE_FAVORITES,
   REPLY_TO_TWEET_FROM_HOME,
   RETWEET_SUCCESS,
   ADD_TWEET,
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
      case ADD_TWEET:
         return {
            ...state,
            tweets: [payload, ...state.tweets],
         };
      case DELETE_TWEET:
         return {
            ...state,
            tweets: state.tweets.filter((tweet) => tweet._id !== payload),
         };
      case UPDATE_FAVORITES:
         return {
            ...state,
            tweets: state.tweets.map((tweet) =>
               tweet._id === payload.id
                  ? {
                       ...tweet,
                       favorites: payload.favorites,
                    }
                  : tweet
            ),
         };
      case RETWEET_SUCCESS:
         return {
            ...state,
            tweets: state.tweets.map((tweet) =>
               tweet._id === payload.id
                  ? { ...tweet, retweetUsers: payload.users }
                  : tweet
            ),
         };
      case REPLY_TO_TWEET_FROM_HOME:
         return {
            ...state,
            tweets: state.tweets.map((tweet) =>
               tweet._id === payload.id
                  ? {
                       ...tweet,
                       replies: [...tweet.replies, payload.replies],
                    }
                  : tweet
            ),
            loading: false,
         };
      case CLEAR_TIMELINE:
         return {
            ...state,
            tweets: [],
            fetching: true,
         };
      default:
         return state;
   }
}
