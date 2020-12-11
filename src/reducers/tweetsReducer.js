import {
   TWEETS_ERROR,
   GET_TIMELINE_TWEETS,
   GET_TWEET,
   ADD_TWEET,
   DELETE_TWEET,
   UPDATE_FAVORITES,
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
      case GET_TWEET:
         return {
            ...state,
            tweet: payload,
            loading: false,
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
            loading: false,
         };

      default:
         return state;
   }
}
