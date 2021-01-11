import {
  OPEN_REPLY_MODAL,
  CLOSE_REPLY_MODAL,
  SET_TWEET_IN_MODAL,
} from '../actions/types';

const initialState = {
  open: false,
  tweet: null,
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
    default:
      return state;
  }
}
