import {
   FETCH_INBOX_START,
   FETCH_INBOX_SUCCESS,
   FETCH_INBOX_ERROR,
   CREATE_NEW_CHAT,
   CHAT_ERROR,
   SELECT_CHAT,
   CLEAR_SELECTED_CHAT,
   GET_CHAT_WITH_SPECIFIC_USER,
   SEND_DM_SUCCESS,
   SEND_DM_START,
   DM_ERROR,
   CLEAR_MESSAGES,
   FETCH_MESSAGES_SUCCESS,
   FETCH_MESSAGES_START,
} from '../actions/types';

const initialState = {
   inbox: [],
   fetchingInbox: false,
   selectedChat: null,
   messages: [],
   sendingMessage: false,
   fetchingMessages: false,
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
      case SEND_DM_START:
         return {
            ...state,
            sendingMessage: true,
         };
      case FETCH_INBOX_SUCCESS:
         return {
            ...state,
            inbox: payload,
            fetchingInbox: false,
         };
      case SEND_DM_SUCCESS: {
         return {
            ...state,
            sendingMessage: false,
            messages: [payload, ...state.messages],
         };
      }
      case FETCH_INBOX_ERROR:
      case DM_ERROR:
         return {
            ...state,
            error: payload,
         };
      case CREATE_NEW_CHAT:
         const alreadyExists = state.inbox.some(
            (chat) => chat._id === payload.id
         );
         if (alreadyExists) {
            return {
               ...state,
               selectedChat: payload.chat,
            };
         }
         return {
            ...state,
            selectedChat: payload.chat,
            inbox: [payload.chat, ...state.inbox],
         };
      case SELECT_CHAT:
         return {
            ...state,
            selectedChat: payload,
         };
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
      case FETCH_MESSAGES_START:
         return {
            ...state,
            fetchingMessages: true,
         };
      case FETCH_MESSAGES_SUCCESS:
         return {
            ...state,
            fetchingMessages: false,
            messages: payload,
         };
      case CLEAR_MESSAGES:
         return {
            ...state,
            messages: [],
         };
      default:
         return state;
   }
}
