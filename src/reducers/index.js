import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profiles from './profileReducer';
import tweets from './tweetsReducer';

export default combineReducers({
   alerts,
   auth,
   profiles,
   tweets,
});
