import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../components/pages/Landing';
import LoginPage from '../components/pages/LoginPage';

const Routes = (props) => {
   return (
      <React.Fragment>
         <Switch>
            <Route exact path="/login" component={LoginPage} />
         </Switch>
      </React.Fragment>
   );
};

export default Routes;
