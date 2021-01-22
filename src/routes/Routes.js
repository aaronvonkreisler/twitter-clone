import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import UserProfilePage from '../pages/UserProfilePage';
import StatusPage from '../pages/StatusPage';
import HomePage from '../pages/HomePage';
import BookmarksPage from '../pages/BookmarksPage';
import SelectedProfilePage from '../pages/SelectedProfilePage';
import ConnectPage from '../pages/ConnectPage';
import MessagesPage from '../pages/MessagesPage';
import AlertDisplay from '../components/layout/AlertDisplay';

import Main from '../components/layout/Main';
import ProfileFollowing from '../components/profile/ProfileFollowing';
import ReplyModal from '../components/forms/ReplyModal';

const Routes = (props) => {
   return (
      <React.Fragment>
         <AlertDisplay />
         <ReplyModal />
         <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Main>
               <PrivateRoute
                  exact
                  path="/:screen_name/status/:tweet_id"
                  component={StatusPage}
               />
               <PrivateRoute exact path="/home" component={HomePage} />
               <PrivateRoute
                  exact
                  path="/profile"
                  component={UserProfilePage}
                  key="user"
               />
               <PrivateRoute
                  exact
                  path="/profile/:username"
                  key="selected-user"
                  component={SelectedProfilePage}
               />
               <PrivateRoute
                  exact
                  path="/profile/:username/following"
                  key="users-following"
                  component={ProfileFollowing}
               />
               <PrivateRoute
                  exact
                  path="/bookmarks"
                  component={BookmarksPage}
               />
               <PrivateRoute exact path="/connect" component={ConnectPage} />

               <PrivateRoute exact path="/messages" component={MessagesPage} />
            </Main>
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
