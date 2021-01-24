import {
   FETCH_NOTIFICATIONS_SUCCESS,
   FETCH_NOTIFICATIONS_START,
   NOTIFICATIONS_ERROR,
} from '../actions/types';

const initialState = {
   notifications: [],
   fetching: false,
   error: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case FETCH_NOTIFICATIONS_START:
         return {
            ...state,
            fetching: true,
         };
      case FETCH_NOTIFICATIONS_SUCCESS:
         return {
            ...state,
            fetching: false,
            notifications: payload,
         };
      case NOTIFICATIONS_ERROR:
         return {
            ...state,
            error: payload,
         };
      default:
         return state;
   }
}
