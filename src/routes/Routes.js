import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../components/pages/Landing';
import LoginPage from '../components/pages/LoginPage';
import AlertDisplay from '../components/layout/AlertDisplay';

const Routes = (props) => {
   return (
      <React.Fragment>
         <AlertDisplay />
         <Switch>
            <Route exact path="/login" component={LoginPage} />
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
