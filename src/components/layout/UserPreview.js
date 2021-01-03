import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
   bottomBorder,
}) => {
   const [isOwnProfile, setIsOwnProfile] = useState(false);
   const [isFollowing, setIsFollowing] = useState(false);
   const borderClass = bottomBorder ? 'bottom-border' : '';
   let history = useHistory();

   useEffect(() => {
      if (auth.user !== null && followers !== null) {
         const ownProfile = auth.user._id === _id;
         const following = followers.some(
            (follow) => follow.user === auth.user._id
         );
         setIsOwnProfile(ownProfile);
         setIsFollowing(following);
      }
   }, [_id, auth, followers]);

   const handleClick = (e) => {
      const buttonClick = e.target.className.includes('Mui');
      if (!buttonClick) {
         history.push(`/profile/${screen_name}`);
      }
   };
   return (
      <div className={`userPreview ${borderClass}`} onClick={handleClick}>
         <div className="userPreview__avatar">
            <Link to={`/profile/${screen_name}`}>
               <Avatar src={avatar} style={{ height: '49px', width: '49px' }} />
            </Link>
         </div>
         <Link to={`/profile/${screen_name}`}></Link>
         <div className="userPreview__details">
            {/* Top Row -- includes 2 columns - Col1. names, Col2. Following Button */}

            <div className="details__top">
               <div className="names">
                  <div className="displayName">
                     <span>{name}</span>

                     {verified && (
                        <span className="verified-badge">
                           <GoVerified />
                        </span>
                     )}
                  </div>
                  <div className="screenName">
                     <span>@{screen_name}</span>
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
   bottomBorder: PropTypes.bool,
};

UserPreview.defaultProps = {
   showBio: true,
   bottomBorder: true,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
   UserPreview
);
