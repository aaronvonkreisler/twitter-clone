import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackdropSpinner from '../components/layout/BackdropSpinner';

const PrivateRoute = ({
   component: Component,
   auth: { isAuthenticated, loading },
   ...rest
}) => (
   <Route
      {...rest}
      render={(props) =>
         loading ? (
            <BackdropSpinner />
         ) : isAuthenticated ? (
            <Component {...props} />
         ) : (
            <Redirect to="/login" />
         )
      }
   />
);

PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
