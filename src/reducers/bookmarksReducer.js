import {
   ADD_TO_BOOKMARKS,
   REMOVE_FROM_BOOKMARKS,
   GET_BOOKMARKS,
   BOOKMARKS_ERROR,
   CLEAR_BOOKMARKS,
} from '../actions/types';

const initialState = {
   bookmarks: {},
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_BOOKMARKS:
         return {
            ...state,
            bookmarks: payload,
            loading: false,
         };
      case CLEAR_BOOKMARKS:
         return {
            ...state,
            bookmarks: {},
            loading: true,
            error: {},
         };
      case BOOKMARKS_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
         };
      default:
         return state;
   }
}
