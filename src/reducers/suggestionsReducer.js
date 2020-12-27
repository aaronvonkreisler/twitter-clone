import {
  SIDEBAR_SUGGESTIONS_LOADED,
  SUGGESTIONS_ERROR,
} from '../actions/types';
const initialState = {
  sidebarUsers: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIDEBAR_SUGGESTIONS_LOADED:
      return {
        ...state,
        sidebarUsers: payload,
        loading: false,
      };
    case SUGGESTIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
