import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import UserProfile from '../pages/UserProfile';
import Status from '../pages/Status';
import Home from '../pages/Home';
import Bookmarks from '../pages/Bookmarks';
import SelectedProfile from '../pages/SelectedProfile';
import Connect from '../pages/Connect';
import Messages from '../pages/Messages';
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
                  component={Status}
               />
               <PrivateRoute exact path="/home" component={Home} />
               <PrivateRoute
                  exact
                  path="/profile"
                  component={UserProfile}
                  key="user"
               />
               <PrivateRoute
                  exact
                  path="/profile/:username"
                  key="selected-user"
                  component={SelectedProfile}
               />
               <PrivateRoute
                  exact
                  path="/profile/:username/following"
                  key="users-following"
                  component={ProfileFollowing}
               />
               <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
               <PrivateRoute exact path="/connect" component={Connect} />
               <PrivateRoute exact path="/messages" component={Messages} />
            </Main>
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
