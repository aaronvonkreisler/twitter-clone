import api from '../utils/api';
import { getCurrentUser, registerUser, signIn } from '../services/auth';
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
      const response = await getCurrentUser();

      dispatch({
         type: USER_LOADED,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};
export const register = (formData) => async (dispatch) => {
   try {
      const response = await registerUser(formData);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: response,
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
   const loginInfo = { email, password };

   try {
      const response = await signIn(loginInfo);
      console.log(response);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: response,
      });
      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
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
