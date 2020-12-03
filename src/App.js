import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Routes from './routes/Routes';
import Landing from './components/pages/Landing';
import './App.css';

const App = () => {
   return (
      <Router>
         <React.Fragment>
            <CssBaseline />
            <Switch>
               <Route exact path="/" component={Landing} />
               <Route component={Routes} />
            </Switch>
         </React.Fragment>
      </Router>
   );
};

export default App;
