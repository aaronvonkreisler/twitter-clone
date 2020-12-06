import { GET_USER_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
   profile: null,
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_USER_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false,
         };
      case PROFILE_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            profile: null,
         };
      default:
         return state;
   }
}
