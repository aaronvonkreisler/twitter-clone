import {
   REMOVE_BOOKMARK_ITEM,
   GET_BOOKMARKS,
   BOOKMARKS_ERROR,
   REMOVE_ALL_BOOKMARKS,
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
      case REMOVE_BOOKMARK_ITEM:
         return {
            ...state,
            bookmarks: payload,
            loading: false,
         };
      case REMOVE_ALL_BOOKMARKS:
         return {
            ...state,
            bookmarks: {},
            loading: false,
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
