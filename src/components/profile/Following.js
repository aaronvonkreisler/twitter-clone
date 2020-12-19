import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowing } from '../../actions/profileData';
import FollowingButton from '../layout/FollowingButton';
import UserPreview from '../layout/UserPreview';

const Following = ({
   profileData: { following, followingLoading, screenName },
   getUsersFollowing,
}) => {
   useEffect(() => {
      getUsersFollowing(screenName);
   }, [getUsersFollowing, screenName]);
   return (
      <React.Fragment>
         {followingLoading ? (
            <Spinner />
         ) : (
            <div className="feed">
               {following.map((user) => (
                  <UserPreview user={user.user} key={user._id} height30 />
               ))}
            </div>
         )}
      </React.Fragment>
   );
};

Following.propTypes = {
   following: PropTypes.array,
   followingLoading: PropTypes.bool,
   getUsersFollowers: PropTypes.func,
   screenName: PropTypes.string,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { getUsersFollowing })(Following);
