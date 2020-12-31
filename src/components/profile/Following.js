import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowing } from '../../actions/profileData';

import UserPreview from '../layout/UserPreview';
import EmptyDisplay from '../layout/EmptyDisplay';

const Following = ({
   profileData: { following, followingLoading, screenName, match },
   getUsersFollowing,
}) => {
   const { username } = useParams();
   console.log(username);
   useEffect(() => {
      getUsersFollowing(username);
   }, [getUsersFollowing, username]);

   return (
      <React.Fragment>
         {followingLoading ? (
            <Spinner />
         ) : (
            <div className="feed">
               {following.length === 0 ? (
                  <EmptyDisplay
                     primaryText="You aren't following anyone yet"
                     secondaryText="When you follow someone, you'll see them here."
                  />
               ) : (
                  following.map((user) => (
                     <UserPreview user={user.user} key={user._id} height30 />
                  ))
               )}
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
