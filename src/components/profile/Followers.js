import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowers } from '../../actions/profileData';
import UserPreview from '../layout/UserPreview';

const Followers = ({
   profileData: { followers, followersLoading, screenName },
   getUsersFollowers,
}) => {
   useEffect(() => {
      getUsersFollowers(screenName);
   }, [getUsersFollowers, screenName]);
   return (
      <React.Fragment>
         {followersLoading ? (
            <Spinner />
         ) : (
            <div className="feed">
               {followers.map((user) => (
                  <UserPreview user={user.user} key={user._id} />
               ))}
            </div>
         )}
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