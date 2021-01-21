import {
   OPEN_REPLY_MODAL,
   CLOSE_REPLY_MODAL,
   SET_TWEET_IN_MODAL,
   OPEN_GIF_MODAL,
   CLOSE_GIF_MODAL,
   OPEN_MESSAGE_MODAL,
   CLOSE_MESSAGE_MODAL,
} from './types';

export const openMessageModal = () => ({
   type: OPEN_MESSAGE_MODAL,
});

export const closeMessageModal = () => ({
   type: CLOSE_MESSAGE_MODAL,
});
export const openGifModal = () => ({
   type: OPEN_GIF_MODAL,
});
export const closeGifModal = () => ({
   type: CLOSE_GIF_MODAL,
});

export const openModal = () => (dispatch) => {
   dispatch({
      type: OPEN_REPLY_MODAL,
   });
};

export const closeModal = () => (dispatch) => {
   dispatch({
      type: CLOSE_REPLY_MODAL,
   });
};

export const setTweetInModal = (tweet) => (dispatch) => {
   dispatch({
      type: SET_TWEET_IN_MODAL,
      payload: tweet,
   });
};
