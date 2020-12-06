import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { loadUser } from './actions/auth';
import { getCurrentUsersProfile } from './actions/profile';
import setAuthToken from './utils/setAuthToken';
import Routes from './routes/Routes';
import Landing from './components/pages/Landing';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
   useEffect(() => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }
      store.dispatch(loadUser());
      store.dispatch(getCurrentUsersProfile());
   }, []);
   return (
      <Provider store={store}>
         <Router>
            <React.Fragment>
               <CssBaseline />
               <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route component={Routes} />
               </Switch>
            </React.Fragment>
         </Router>
      </Provider>
   );
};

export default App;
