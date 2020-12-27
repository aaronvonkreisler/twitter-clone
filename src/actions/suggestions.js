import api from '../utils/api';
import { SIDEBAR_SUGGESTIONS_LOADED, SUGGESTIONS_ERROR } from './types';

export const getSidebarSuggestions = (max) => async (dispatch) => {
  try {
    const res = await api.get(`/api/user/suggested/${max}`);
    dispatch({
      type: SIDEBAR_SUGGESTIONS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUGGESTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
