import React from 'react';

import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import PropTypes from 'prop-types';

const SmallUserPreview = ({ user, bottomBorder, onClick }) => {
  const borderClass = bottomBorder ? 'bottom-border' : '';
  const { avatar, name, screen_name, verified } = user;
  return (
    <div className={`userPreview ${borderClass}`} onClick={() => onClick(user)}>
      <div className="userPreview__avatar">
        <Avatar src={avatar} style={{ height: '49px', width: '49px' }} />
      </div>
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
