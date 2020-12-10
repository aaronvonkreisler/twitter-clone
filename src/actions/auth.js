import api from '../utils/api';
import {
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOG_OUT,
} from './types';
import { setAlert } from './alerts';

export const loadUser = () => async (dispatch) => {
   try {
      const res = await api.get('/api/user/current');

      dispatch({
         type: USER_LOADED,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};
export const register = (formData) => async (dispatch) => {
   try {
      const res = await api.post('/auth/register', formData);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'info')));
      }

      dispatch({
         type: REGISTER_FAIL,
      });
   }
};

export const loginUser = (email, password) => async (dispatch) => {
   const body = { email, password };

   try {
      const res = await api.post('/auth/signin', body);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }

      dispatch({
         type: LOGIN_FAIL,
      });
   }
};

export const logout = () => (dispatch) => {
   dispatch({ type: LOG_OUT });
};
