import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   getManySuggestedUsers,
   clearConnectUsers,
} from '../actions/suggestions';
import Header from '../components/layout/Header';
import UserPreview from '../components/layout/UserPreview';
import Spinner from '../components/layout/Spinner';
import '../styles/design/connect.css';

const ConnectPage = ({
   suggestions: { fetchingUsers, connectUsers },
   clearConnectUsers,
   getManySuggestedUsers,
}) => {
   useEffect(() => {
      document.title = 'Connect / Tweeter';
      getManySuggestedUsers(100);

      return function cleanup() {
         clearConnectUsers();
      };
   }, [getManySuggestedUsers, clearConnectUsers]);
   return (
      <React.Fragment>
         <Header leftIcon text="Connect" />
         <div className="connect-title">
            <h2 className="connect-text">Suggested for you</h2>
         </div>
         {fetchingUsers && <Spinner />}
         {!fetchingUsers &&
            connectUsers.length > 0 &&
            connectUsers.map((user) => (
               <UserPreview user={user} key={user._id} bottomBorder showBio />
            ))}
      </React.Fragment>
   );
};

ConnectPage.propTypes = {
   getManySuggestedUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   suggestions: state.suggestions,
});

export default connect(mapStateToProps, {
   getManySuggestedUsers,
   clearConnectUsers,
})(ConnectPage);
