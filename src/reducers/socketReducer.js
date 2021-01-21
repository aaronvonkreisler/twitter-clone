import { CONNECT_SOCKET, DISCONNECT_SOCKET } from '../actions/types';

const initialState = {
   socket: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case CONNECT_SOCKET:
         return {
            ...state,
            socket: payload,
         };
      case DISCONNECT_SOCKET:
         return {
            ...state,
            socket: null,
         };
      default:
         return state;
   }
}
