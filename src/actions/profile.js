import api from '../utils/api';
import axios from 'axios';
import {
   GET_CURRENT_USERS_PROFILE,
   PROFILE_ERROR,
   UPLOAD_PROFILE_PICTURE,
   SELECTED_USER_LOADED,
   GET_PROFILE_LIKES,
   GET_PROFILE_REPLIES,
   GET_PROFILE_TWEETS,
   FOLLOW_USER,
   UNFOLLOW_USER,
} from './types';

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

export const uploadProfilePicture = (file) => async (dispatch) => {
   //https://tweeter-v1-api.herokuapp.com/user/avatar
   //
   try {
      const fd = new FormData();
      fd.append('image', file, file.name);
      const res = await axios.post(
         'https://tweeter-v1-api.herokuapp.com/user/avatar',
         fd
      );
      console.log(res);
      dispatch({
         type: UPLOAD_PROFILE_PICTURE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
