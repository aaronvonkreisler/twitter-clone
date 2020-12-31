import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import FollowingButton from '../layout/FollowingButton';
import OutlineButton from '../layout/OutlineButton';
import { followUser, unfollowUser } from '../../actions/profile';
import '../../styles/design/userPreview.css';

const UserPreview = ({
   user: { avatar, name, screen_name, _id, verified, followers, bio },
   auth,
   showBio,
   followUser,
   unfollowUser,
}) => {
   const [isOwnProfile] = useState(() => auth.user._id === _id);
   const [isFollowing, setIsFollowing] = useState(() =>
      followers.some((follow) => follow.user === auth.user._id)
   );

   return (
      <div className="userPreview">
         <div className="userPreview__avatar">
            <Avatar src={avatar} style={{ height: '49px', width: '49px' }} />
         </div>
         <div className="userPreview__details">
            {/* Top Row -- includes 2 columns - Col1. names, Col2. Following Button */}
            <div className="details__top">
               <div className="names">
                  <div className="displayName">
                     <Link to={`/profile/${screen_name}`}>
                        <span>{name}</span>
                     </Link>
                     {verified && (
                        <span className="verified-badge">
                           <GoVerified />
                        </span>
                     )}
                  </div>
                  <div className="screenName">
                     <Link to={`/profile/${screen_name}`}>
                        <span>@{screen_name}</span>
                     </Link>
                  </div>
               </div>
               <div className="actions">
                  {isOwnProfile ? (
                     <OutlineButton
                        text="Edit Profile"
                        role="link"
                        path="/profile"
                     />
                  ) : isFollowing ? (
                     <FollowingButton
                        onClick={() => {
                           unfollowUser(_id);
                           setIsFollowing(false);
                        }}
                     />
                  ) : (
                     <OutlineButton
                        text="Follow"
                        role="button"
                        onClick={() => {
                           followUser(_id);
                           setIsFollowing(true);
                        }}
                     />
                  )}
               </div>
            </div>
            {/* Bottom row. Includes optional bio */}
            {showBio && bio && (
               <div className="details__bottom">
                  <span>{bio}</span>
               </div>
            )}
         </div>
      </div>
   );
};

UserPreview.propTypes = {
   user: PropTypes.object.isRequired,
   showBio: PropTypes.bool,
};

UserPreview.defaultProps = {
   showBio: true,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
   UserPreview
);
