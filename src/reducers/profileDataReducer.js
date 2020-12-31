import {
   SET_NAME_IN_PROFILE_DATA_STATE,
   PROFILE_DATA_ERROR,
   FETCH_USERS_FOLLOWING,
   FETCH_USERS_FOLLOWERS,
   CLEAR_PROFILE_DATA,
   PREPARE_PROFILE_DATA,
} from '../actions/types';

const initialState = {
   name: null,
   screenName: null,
   nameLoading: true,
   followers: [],
   followersLoading: true,
   following: [],
   followingLoading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_NAME_IN_PROFILE_DATA_STATE:
         return {
            ...state,
            name: payload.name,
            screenName: payload.screenName,
            nameLoading: false,
         };
      case PREPARE_PROFILE_DATA:
         return {
            ...state,
            name: payload.name,
            screenName: payload.screen_name,
            nameLoading: false,
         };
      case FETCH_USERS_FOLLOWERS:
         return {
            ...state,
            followers: payload,
            followersLoading: false,
         };
      case FETCH_USERS_FOLLOWING:
         return {
            ...state,
            following: payload,
            followingLoading: false,
         };
      case PROFILE_DATA_ERROR:
         return {
            ...state,
            error: payload,
            followersLoading: false,
            followingLoading: false,
         };
      case CLEAR_PROFILE_DATA:
         return {
            ...state,
            name: null,
            screenName: null,
            followers: [],
            followersLoading: false,
            following: [],
            followingLoading: false,
            error: {},
         };
      default:
         return state;
   }
}
