import {
   GET_CURRENT_USERS_PROFILE,
   PROFILE_ERROR,
   UPLOAD_PROFILE_PICTURE,
   SELECTED_USER_LOADED,
} from '../actions/types';

const initialState = {
   currentProfile: null,
   profile: null,
   isFollowing: false,
   isOwnProfile: false,
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
      case PROFILE_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            currentProfile: null,
         };
      default:
         return state;
   }
}
