import api from '../utils/api';
import {
   PROFILE_DATA_ERROR,
   FETCH_USERS_FOLLOWERS,
   FETCH_USERS_FOLLOWING,
   CLEAR_PROFILE_DATA,
} from './types';

export const clearProfileDataState = () => ({
   type: CLEAR_PROFILE_DATA,
});

export const getUsersFollowers = (username) => async (dispatch) => {
   try {
      const res = await api.get(`/api/user/${username}/followers`);
      dispatch({
         type: FETCH_USERS_FOLLOWERS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_DATA_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getUsersFollowing = (username) => async (dispatch) => {
   try {
      const res = await api.get(`/api/user/${username}/following`);
      dispatch({
         type: FETCH_USERS_FOLLOWING,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_DATA_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
