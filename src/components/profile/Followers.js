import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowers } from '../../actions/profileData';

const Followers = ({
   profileData: { followers, followersLoading, screenName },
   getUsersFollowers,
}) => {
   useEffect(() => {
      getUsersFollowers(screenName);
   }, [getUsersFollowers, screenName]);
   return (
      <React.Fragment>
         {followersLoading ? <Spinner /> : <div>Success!!!!!!</div>}
      </React.Fragment>
   );
};

Followers.propTypes = {
   followers: PropTypes.array,
   followersLoading: PropTypes.bool,
   getUsersFollowers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { getUsersFollowers })(Followers);
