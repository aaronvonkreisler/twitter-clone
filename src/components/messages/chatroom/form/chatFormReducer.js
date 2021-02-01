export const UPDATE_TEXT = 'UPDATE_TEXT';
export const ADD_GIF = 'ADD_GIF';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const RESET_STATE = 'RESET_STATE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const ADD_EMOJI = 'ADD_EMOJI';
export const CLOSE_EMOJI_MENU = 'CLOSE_EMOJI_MENU';
export const TOGGLE_EMOJI_MENU = 'TOGGLE_EMOJI_MENU';
export const DISABLE_SEND = 'DISABLE_SEND';

export const chatFormReducer = function (state = {}, action) {
   const { type, payload } = action;

   switch (type) {
      case UPDATE_TEXT:
         return {
            ...state,
            message: { ...state.message, content: payload },
         };
      case DISABLE_SEND:
         return {
            ...state,
            sendDisabled: payload,
         };
      case ADD_EMOJI:
         return {
            ...state,
            message: { ...state.message, content: payload },
         };
      case TOGGLE_EMOJI_MENU:
         return {
            ...state,
            emojiMenuOpen: !state.emojiMenuOpen,
         };
      case ADD_GIF:
         return {
            ...state,
            imageBlob: payload,
            message: { ...state.message, image: payload },
            displayImageButtons: false,
         };
      case UPLOAD_FILE:
         return {
            ...state,
            imageBlob: payload.blob,
            fileToUpload: payload.file,
            displayImageButtons: false,
         };
      case REMOVE_IMAGE:
         return {
            ...state,
            displayImageButtons: true,
            imageBlob: null,
            fileToUpload: null,
            message: { ...state.message, image: null },
         };
      case CLOSE_EMOJI_MENU:
         return {
            ...state,
            emojiMenuOpen: false,
         };
      // To reset the state, manually set everything back to it's initial value
      // except the chatId, so that the chatId is persisted.
      case RESET_STATE:
         return {
            ...state,
            displayImageButtons: true,
            emojiMenuOpen: false,
            sendDisabled: true,
            fileToUpload: null,
            imageBlob: null,
            message: {
               content: '',
               image: null,
            },
         };
      default:
         return state;
   }
};
