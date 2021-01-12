import {
   OPEN_REPLY_MODAL,
   CLOSE_REPLY_MODAL,
   SET_TWEET_IN_MODAL,
   OPEN_GIF_MODAL,
   CLOSE_GIF_MODAL,
} from './types';

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
