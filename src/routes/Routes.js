import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/pages/LoginPage';
import AlertDisplay from '../components/layout/AlertDisplay';
import Status from '../components/pages/Status';
import Main from '../components/layout/Main';
import UserProfile from '../components/profile/UserProfile';
import SelectedProfile from '../components/profile/SelectedProfile';
import ProfileFollowing from '../components/profile/ProfileFollowing';
import Home from '../components/pages/Home';
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
            </Main>
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
