import {
   OPEN_REPLY_MODAL,
   CLOSE_REPLY_MODAL,
   SET_TWEET_IN_MODAL,
   OPEN_GIF_MODAL,
   CLOSE_GIF_MODAL,
   OPEN_MESSAGE_MODAL,
   CLOSE_MESSAGE_MODAL,
} from '../actions/types';

const initialState = {
   open: false,
   tweet: null,
   gifOpen: false,
   messageOpen: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { payload, type } = action;

   switch (type) {
      case OPEN_REPLY_MODAL:
         return {
            ...state,
            open: true,
         };
      case SET_TWEET_IN_MODAL:
         return {
            ...state,
            tweet: payload,
         };
      case CLOSE_REPLY_MODAL:
         return {
            ...state,
            open: false,
         };
      case OPEN_GIF_MODAL:
         return {
            ...state,
            gifOpen: true,
         };
      case CLOSE_GIF_MODAL:
         return {
            ...state,
            gifOpen: false,
         };
      case OPEN_MESSAGE_MODAL:
         return {
            ...state,
            messageOpen: true,
         };
      case CLOSE_MESSAGE_MODAL:
         return {
            ...state,
            messageOpen: false,
         };
      default:
         return state;
   }
}
