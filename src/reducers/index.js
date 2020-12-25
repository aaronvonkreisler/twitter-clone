import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profiles from './profileReducer';
import tweets from './tweetsReducer';
import profileData from './profileDataReducer';
import bookmarks from './bookmarksReducer';

export default combineReducers({
   alerts,
   auth,
   bookmarks,
   profiles,
   profileData,
   tweets,
});
