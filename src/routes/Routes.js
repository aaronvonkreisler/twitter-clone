import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Landing from '../components/pages/Landing';
import LoginPage from '../components/pages/LoginPage';
import AlertDisplay from '../components/layout/AlertDisplay';
import Home from '../Home';
import Main from '../components/layout/Main';
import Profile from '../components/profile/Profile';
const Routes = (props) => {
   return (
      <React.Fragment>
         <AlertDisplay />
         <Route exact path="/login" component={LoginPage} />
         <Route exact path="/register" component={Landing} />
         <Main>
            <Switch>
               <Route exact path="/home">
                  <div>
                     {' '}
                     Testing! <Link to="/profile">Go to profile</Link>
                  </div>
               </Route>
               <Route path="/profile">
                  <Profile />
               </Route>
            </Switch>
         </Main>
      </React.Fragment>
   );
};

export default Routes;
