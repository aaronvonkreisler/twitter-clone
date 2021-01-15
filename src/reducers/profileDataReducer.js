import {
   PROFILE_DATA_ERROR,
   FETCH_USERS_FOLLOWING,
   FETCH_USERS_FOLLOWERS,
   CLEAR_PROFILE_DATA,
   PREPARE_PROFILE_DATA,
   GET_PROFILE_FOLLOW_SUGGESTIONS,
} from '../actions/types';

const initialState = {
   name: null,
   screenName: null,
   nameLoading: true,
   id: null,
   followers: [],
   followersLoading: true,
   following: [],
   followingLoading: true,
   suggestions: [],
   suggestionsLoading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case PREPARE_PROFILE_DATA:
         return {
            ...state,
            name: payload.name,
            screenName: payload.screenName,
            id: payload.id,
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
      case GET_PROFILE_FOLLOW_SUGGESTIONS:
         return {
            ...state,
            suggestions: payload,
            suggestionsLoading: false,
         };
      case CLEAR_PROFILE_DATA:
         return {
            ...state,
            name: null,
            screenName: null,
            id: null,
            nameLoading: true,
            followers: [],
            followersLoading: true,
            following: [],
            followingLoading: true,
            suggestions: [],
            suggestionsLoading: true,
            error: {},
         };
      default:
         return state;
   }
}
