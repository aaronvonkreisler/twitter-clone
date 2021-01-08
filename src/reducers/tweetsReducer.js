import {
   TWEETS_ERROR,
   GET_TWEET,
   GET_TWEETS_REPLIES,
   DELETE_TWEET,
   UPDATE_FAVORITES,
   CLEAR_TWEET_STATE,
   REPLY_TO_TWEET_FROM_STATUS,
   RETWEET_SUCCESS,
   LOG_OUT,
} from '../actions/types';

const initialState = {
   tweet: null,
   replies: [],
   fetchingReplies: true,
   loading: true,
   tweetReady: false,
   error: {},
};

// TODO - update a tweets favorites when tweet is liked or unliked

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;
   switch (type) {
      case GET_TWEET:
         return {
            ...state,
            tweet: payload,
            loading: false,
            tweetReady: true,
         };
      case UPDATE_FAVORITES:
         return {
            ...state,
            tweet:
               state.tweet !== null && state.tweet._id === payload.id
                  ? { ...state.tweet, favorites: payload.favorites }
                  : state.tweet,
            replies: state.replies.map((reply) =>
               reply._id === payload.id
                  ? { ...reply, favorites: payload.favorites }
                  : reply
            ),
         };
      case RETWEET_SUCCESS:
         return {
            ...state,
            tweet:
               state.tweet !== null && state.tweet._id === payload.id
                  ? { ...state.tweet, retweetUsers: payload.users }
                  : state.tweet,
            replies: state.replies.map((reply) =>
               reply._id === payload.id
                  ? { ...reply, retweetUsers: payload.users }
                  : reply
            ),
         };
      case GET_TWEETS_REPLIES:
         return {
            ...state,
            replies: payload,
            fetchingReplies: false,
         };
      case TWEETS_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
         };
      case DELETE_TWEET:
         return {
            ...state,
            replies: state.replies.filter((reply) => reply._id !== payload),
            loading: false,
         };
      case REPLY_TO_TWEET_FROM_STATUS:
         return {
            ...state,
            replies: [payload, ...state.replies],
            loading: false,
         };

      case CLEAR_TWEET_STATE:
         return {
            ...state,
            fetchingReplies: true,
            loading: true,
            tweet: null,
         };
      case LOG_OUT:
         return {
            ...state,
            tweets: [],
            tweet: null,
            replies: [],
         };
      default:
         return state;
   }
}
