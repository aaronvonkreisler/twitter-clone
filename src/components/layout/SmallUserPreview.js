import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import PropTypes from 'prop-types';

const SmallUserPreview = ({
   user: { avatar, name, screen_name, verified },
   bottomBorder,
}) => {
   const borderClass = bottomBorder ? 'bottom-border' : '';
   return (
      <div className={`userPreview ${borderClass}`}>
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
            </div>
         </div>
      </div>
   );
};

SmallUserPreview.defaultProps = {
   bottomBorder: true,
};

SmallUserPreview.propTypes = {
   user: PropTypes.object.isRequired,
   bottomBorder: PropTypes.bool,
};

export default SmallUserPreview;
