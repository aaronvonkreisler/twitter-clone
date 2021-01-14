import {
   FETCH_INBOX_START,
   FETCH_INBOX_SUCCESS,
   FETCH_INBOX_ERROR,
   CREATE_NEW_CHAT,
   CHAT_ERROR,
   SELECT_CHAT,
   CLEAR_SELECTED_CHAT,
   GET_CHAT_WITH_SPECIFIC_USER,
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
         return {
            ...state,
            selectedChat: payload,
            inbox: [payload, ...state.inbox],
         };
      case SELECT_CHAT:
      case GET_CHAT_WITH_SPECIFIC_USER:
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
