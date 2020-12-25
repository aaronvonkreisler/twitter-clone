import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/pages/LoginPage';
import AlertDisplay from '../components/layout/AlertDisplay';
import Status from '../components/pages/Status';
import Main from '../components/layout/Main';
import UserProfile from '../components/pages/UserProfile';
import SelectedProfile from '../components/pages/SelectedProfile';
import ProfileFollowing from '../components/profile/ProfileFollowing';
import Home from '../components/pages/Home';
import Bookmarks from '../components/pages/Bookmarks';

const Routes = (props) => {
   return (
      <React.Fragment>
         <AlertDisplay />
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
            </Main>
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
