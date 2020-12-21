import api from '../utils/api';

import {
   GET_CURRENT_USERS_PROFILE,
   PROFILE_ERROR,
   UPLOAD_AVATAR_SUCCESS,
   SELECTED_USER_LOADED,
   GET_PROFILE_LIKES,
   GET_PROFILE_REPLIES,
   GET_PROFILE_TWEETS,
   FOLLOW_USER,
   UNFOLLOW_USER,
   CLEAR_PROFILE,
   UPLOAD_PHOTO_ERROR,
   SET_NAME_IN_PROFILE_DATA_STATE,
   UPLOAD_COVER_PHOTO_SUCCESS,
} from './types';

import { loadUser } from './auth';

export const getCurrentUsersProfile = () => async (dispatch) => {
   try {
      const res = await api.get('/api/user/current');

      dispatch({
         type: GET_CURRENT_USERS_PROFILE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getUserByUsername = (username, requestorId) => async (
   dispatch
) => {
   try {
      const res = await api.get(`/api/user/${username}`);

      const isFollowing = res.data.followers.some(
         (follower) => follower.user === requestorId
      );

      const isOwnProfile = res.data._id === requestorId;

      dispatch({
         type: SELECTED_USER_LOADED,
         payload: { user: res.data, isFollowing, isOwnProfile },
      });

      dispatch({
         type: SET_NAME_IN_PROFILE_DATA_STATE,
         payload: { name: res.data.name, screenName: res.data.screen_name },
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getProfileTweets = (userId) => async (dispatch) => {
   try {
      const res = await api.get(`/api/tweets/user/${userId}`);

      dispatch({
         type: GET_PROFILE_TWEETS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getProfileReplies = (userId) => async (dispatch) => {
   try {
      const res = await api.get(`/api/tweets/user/${userId}/replies`);

      dispatch({
         type: GET_PROFILE_REPLIES,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const getProfileLikes = (userId) => async (dispatch) => {
   try {
      const res = await api.get(`/api/tweets/user/${userId}/likes`);

      dispatch({
         type: GET_PROFILE_LIKES,
         payload: res.data,
      });
   } catch (err) {}
};

export const followUser = (userId) => async (dispatch) => {
   try {
      const res = await api.put(`/api/user/follow/${userId}`);

      dispatch({
         type: FOLLOW_USER,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const unfollowUser = (userId) => async (dispatch) => {
   try {
      const res = await api.put(`/api/user/unfollow/${userId}`);

      dispatch({
         type: UNFOLLOW_USER,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const clearProfileState = () => ({
   type: CLEAR_PROFILE,
});

export const uploadProfilePicture = (formData, userId) => async (dispatch) => {
   try {
      const res = await api.put('/api/user/avatar', formData);
      dispatch({
         type: UPLOAD_AVATAR_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());
      dispatch(getProfileTweets(userId));
   } catch (err) {
      dispatch({
         type: UPLOAD_PHOTO_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

export const uploadCoverPicture = (formData) => async (dispatch) => {
   try {
      const res = await api.put('/api/user/background', formData);
      dispatch({
         type: UPLOAD_COVER_PHOTO_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: UPLOAD_PHOTO_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
