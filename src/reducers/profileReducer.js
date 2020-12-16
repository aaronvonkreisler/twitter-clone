import {
   GET_CURRENT_USERS_PROFILE,
   PROFILE_ERROR,
   UPLOAD_PROFILE_PICTURE,
} from '../actions/types';

const initialState = {
   currentProfile: null,
   profile: null,
   loading: true,
   error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_CURRENT_USERS_PROFILE:
      case UPLOAD_PROFILE_PICTURE:
         return {
            ...state,
            currentProfile: payload,
            loading: false,
         };
      case PROFILE_ERROR:
         return {
            ...state,
            error: payload,
            loading: false,
            currentProfile: null,
         };
      default:
         return state;
   }
}
