import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { loadUser } from './actions/auth';

import { LOG_OUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';
import Routes from './routes/Routes';
import Landing from './pages/Landing';

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

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOG_OUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
