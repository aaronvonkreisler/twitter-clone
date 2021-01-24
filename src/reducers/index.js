import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profiles from './profileReducer';
import tweets from './tweetsReducer';
import profileData from './profileDataReducer';
import bookmarks from './bookmarksReducer';
import modal from './modalReducer';
import suggestions from './suggestionsReducer';
import timeline from './timelineReducer';
import chats from './messagesReducer';
import socket from './socketReducer';
import notifications from './notificationsReducer';

export default combineReducers({
   alerts,
   auth,
   bookmarks,
   profiles,
   profileData,
   tweets,
   timeline,
   modal,
   suggestions,
   chats,
   socket,
   notifications,
});
