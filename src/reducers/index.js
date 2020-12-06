import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profiles from './profileReducer';

export default combineReducers({
   alerts,
   auth,
   profiles,
});
