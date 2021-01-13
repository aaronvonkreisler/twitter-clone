import api from '../utils/api';
import { getSuggestedUsers } from '../services/timeline';
import {
   PROFILE_DATA_ERROR,
   FETCH_USERS_FOLLOWERS,
   FETCH_USERS_FOLLOWING,
   CLEAR_PROFILE_DATA,
   PREPARE_PROFILE_DATA,
   GET_PROFILE_FOLLOW_SUGGESTIONS,
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

export const getUserProfileData = (username) => async (dispatch) => {
   try {
      const res = await api.get(`/api/user/${username}`);
      dispatch({
         type: PREPARE_PROFILE_DATA,
         payload: {
            name: res.data.name,
            screenName: res.data.screen_name,
            id: res.data._id,
         },
      });
   } catch (err) {
      dispatch({
         type: PROFILE_DATA_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getProfileFollowSuggestions = () => async (dispatch) => {
   try {
      const response = await getSuggestedUsers(50);
      dispatch({
         type: GET_PROFILE_FOLLOW_SUGGESTIONS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_DATA_ERROR,
         payload: { msg: err.messgae },
      });
   }
};
