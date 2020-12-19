import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import FollowingButton from '../layout/FollowingButton';
import '../../styles/design/userPreview.css';

const UserPreview = ({ user, showBio }) => {
   return (
      <div className="userPreview">
         <div className="userPreview__avatar">
            <Avatar
               src={user.avatar}
               style={{ height: '49px', width: '49px' }}
            />
         </div>
         <div className="userPreview__details">
            {/* Top Row -- includes 2 columns - Col1. names, Col2. Following Button */}
            <div className="details__top">
               <div className="names">
                  <div className="displayName">
                     <Link to={`/profile/${user.screen_name}`}>
                        <span>{user.name}</span>
                     </Link>
                  </div>
                  <div className="screenName">
                     <Link to={`/profile/${user.screen_name}`}>
                        <span>@{user.screen_name}</span>
                     </Link>
                  </div>
               </div>
               <div className="actions">
                  <FollowingButton onClick={() => alert(user._id)} />
               </div>
            </div>
            {/* Bottom row. Includes optional bio */}
            {showBio && (
               <div className="details__bottom">
                  <span>
                     This is where the bio will go if someone has one so in the
                     mean time here is some dummy text to fill up the area yay.
                  </span>
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

export default UserPreview;
