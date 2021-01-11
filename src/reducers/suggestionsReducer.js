import {
   SIDEBAR_SUGGESTIONS_LOADED,
   SUGGESTIONS_ERROR,
   GET_SUGGESTED_USERS,
   CLEAR_CONNECT_USERS,
} from '../actions/types';
const initialState = {
   sidebarUsers: [],
   loading: true,
   connectUsers: [],
   fetchingUsers: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SIDEBAR_SUGGESTIONS_LOADED:
         return {
            ...state,
            sidebarUsers: payload,
            loading: false,
         };
      case GET_SUGGESTED_USERS:
         return {
            ...state,
            connectUsers: payload,
            fetchingUsers: false,
         };
      case SUGGESTIONS_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
         };
      case CLEAR_CONNECT_USERS:
         return {
            ...state,
            connectUsers: [],
            fetchingUsers: true,
         };
      default:
         return state;
   }
}
