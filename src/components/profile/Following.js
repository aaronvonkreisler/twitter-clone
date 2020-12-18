import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowing } from '../../actions/profileData';
import FollowingButton from '../layout/FollowingButton';

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
            <div>
               <FollowingButton onClick={() => alert('HIIII')} />
            </div>
         )}
      </React.Fragment>
   );
};

Following.propTypes = {
   following: PropTypes.array,
   followingLoading: PropTypes.bool,
   getUsersFollowers: PropTypes.func.isRequired,
   screenName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { getUsersFollowing })(Following);
