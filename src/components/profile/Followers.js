import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getUsersFollowers } from '../../actions/profileData';
import UserPreview from '../layout/UserPreview';
import EmptyDisplay from '../layout/EmptyDisplay';

const Followers = ({
   profileData: { followers, followersLoading, id },
   getUsersFollowers,
   authId,
}) => {
   const { username } = useParams();
   useEffect(() => {
      getUsersFollowers(username);
   }, [getUsersFollowers, username]);
   return (
      <React.Fragment>
         {followersLoading ? (
            <Spinner />
         ) : (
            <div className="feed">
               {followers.length > 0 &&
                  followers.map((user) => (
                     <UserPreview user={user.user} key={user._id} height30 />
                  ))}
               {followers.length === 0 && authId === id && (
                  <EmptyDisplay
                     primaryText="You don’t have any followers yet"
                     secondaryText="When someone follows you, you’ll see them here."
                  />
               )}
               {followers.length === 0 && authId !== id && (
                  <EmptyDisplay
                     primaryText="They don't have any followers yet"
                     secondaryText="When they do, you'll see them here."
                  />
               )}
            </div>
         )}
      </React.Fragment>
   );
};

// {followers.length === 0 ? (
//   <EmptyDisplay
//      primaryText="You don’t have any followers yet"
//      secondaryText="When someone follows you, you’ll see them here."
//   />
// ) : (
//   followers.map((user) => (
//      <UserPreview user={user.user} key={user._id} height30 />
//   ))
// )}

Followers.propTypes = {
   followers: PropTypes.array,
   followersLoading: PropTypes.bool,
   getUsersFollowers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { getUsersFollowers })(Followers);
