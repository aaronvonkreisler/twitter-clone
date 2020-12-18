import {
   GET_CURRENT_USERS_PROFILE,
   PROFILE_ERROR,
   UPLOAD_PROFILE_PICTURE,
   SELECTED_USER_LOADED,
   GET_PROFILE_TWEETS,
   GET_PROFILE_REPLIES,
   GET_PROFILE_LIKES,
} from '../actions/types';

const initialState = {
   currentProfile: null,
   profile: null,
   isFollowing: false,
   isOwnProfile: false,
   tweets: [],
   likedTweets: [],
   replies: [],
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_CURRENT_USERS_PROFILE:
      case UPLOAD_PROFILE_PICTURE:
         return {
            ...state,
            currentProfile: payload,
            loading: false,
         };
      case SELECTED_USER_LOADED:
         return {
            ...state,
            profile: payload.user,
            isFollowing: payload.isFollowing,
            isOwnProfile: payload.isOwnProfile,
            loading: false,
         };
      case GET_PROFILE_TWEETS:
         return {
            ...state,
            tweets: payload,
            loading: false,
         };
      case GET_PROFILE_REPLIES:
         return {
            ...state,
            replies: payload,
            loading: false,
         };
      case GET_PROFILE_LIKES:
         return {
            ...state,
            likedTweets: payload,
            loading: false,
         };
      case PROFILE_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            currentProfile: null,
            profile: null,
            tweets: [],
            likedTweets: [],
            replies: [],
         };
      default:
         return state;
   }
}
