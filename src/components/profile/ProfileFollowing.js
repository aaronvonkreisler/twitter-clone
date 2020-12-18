import React from 'react';
import PropTypes from 'prop-types';
import Header from '../layout/Header';

const ProfileFollowing = (props) => {
   return (
      <div>
         <Header leftIcon text="Following page" borderBottom={false} />
      </div>
   );
};

ProfileFollowing.propTypes = {};

export default ProfileFollowing;
