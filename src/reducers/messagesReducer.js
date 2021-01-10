import {
   FETCH_INBOX_START,
   FETCH_INBOX_SUCCESS,
   FETCH_INBOX_ERROR,
   CREATE_NEW_CHAT,
   CHAT_ERROR,
   SELECT_CHAT,
   CLEAR_SELECTED_CHAT,
} from '../actions/types';

const initialState = {
   inbox: [],
   fetchingInbox: false,
   selectedChat: null,
   error: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case FETCH_INBOX_START:
         return {
            ...state,
            fetchingInbox: true,
         };
      case FETCH_INBOX_SUCCESS:
         return {
            ...state,
            inbox: payload,
            fetchingInbox: false,
         };
      case FETCH_INBOX_ERROR:
         return {
            ...state,
            error: payload,
         };
      case CREATE_NEW_CHAT:
      case SELECT_CHAT:
         return {
            ...state,
            selectedChat: payload,
         };
      case CHAT_ERROR:
         return {
            ...state,
            selectedChat: null,
            error: payload,
         };
      case CLEAR_SELECTED_CHAT:
         return {
            ...state,
            selectedChat: null,
         };
      default:
         return state;
   }
}
