import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profiles from './profileReducer';
import tweets from './tweetsReducer';
import profileData from './profileDataReducer';

export default combineReducers({
   alerts,
   auth,
   profiles,
   profileData,
   tweets,
});
