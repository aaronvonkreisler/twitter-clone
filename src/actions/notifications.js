import {
   FETCH_NOTIFICATIONS_START,
   FETCH_NOTIFICATIONS_SUCCESS,
   NOTIFICATIONS_ERROR,
} from './types';
import { fetchAllNotifications } from '../services/notifications';

export const getNotifications = () => async (dispatch) => {
   try {
      dispatch({ type: FETCH_NOTIFICATIONS_START });

      const response = await fetchAllNotifications();

      dispatch({
         type: FETCH_NOTIFICATIONS_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: NOTIFICATIONS_ERROR,
         payload: err.message,
      });
   }
};
