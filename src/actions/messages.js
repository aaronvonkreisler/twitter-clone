import { SEND_DM_START, SEND_DM_SUCCESS, DM_ERROR } from './types';
import { setAlert } from './alerts';
import { postMessage } from '../services/messages';

export const sendDirectMessage = (content) => async (dispatch) => {
   try {
      dispatch({ type: SEND_DM_START });

      const response = await postMessage(content);
      dispatch({
         type: SEND_DM_SUCCESS,
         payload: response,
      });
   } catch (err) {
      dispatch({
         type: DM_ERROR,
         payload: err.message,
      });
      dispatch(
         setAlert('Could not send your message. Please try later', 'info')
      );
   }
};
