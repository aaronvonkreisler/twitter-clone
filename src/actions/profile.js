import api from '../utils/api';
import { GET_USER_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentUsersProfile = () => async (dispatch) => {
   try {
      const res = await api.get('/api/profile');

      dispatch({
         type: GET_USER_PROFILE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
