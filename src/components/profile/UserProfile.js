import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';

const UserProfile = ({ auth: { loading, user } }) => {
   let history = useHistory();

   return (
      <React.Fragment>
         {loading || user === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header
                  leftIcon
                  onIconClick={() => history.goBack()}
                  text={!loading ? user.name : 'Profile'}
               />
               <div className="feed" />
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profiles: state.profiles,
});
export default connect(mapStateToProps)(UserProfile);
