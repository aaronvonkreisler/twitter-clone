import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Routes from './routes/Routes';

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
   }, []);
   return (
      <Provider store={store}>
         <Router>
            <React.Fragment>
               <CssBaseline />

               <Route component={Routes} />
            </React.Fragment>
         </Router>
      </Provider>
   );
};

export default App;
