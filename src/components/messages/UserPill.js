import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { CgClose } from 'react-icons/cg';
import '../../styles/design/userPill.css';

const UserPill = ({ user, onClick }) => {
   return (
      <div className="pill" onClick={() => onClick(user)}>
         <div className="avatar">
            <Avatar
               src={user.avatar}
               style={{ height: '24px', width: '24px' }}
            />
         </div>
         <div className="name">
            <span>{user.name}</span>
         </div>
         <div className="icon">
            <CgClose />
         </div>
      </div>
   );
};

UserPill.propTypes = {
   user: PropTypes.object.isRequired,
   onClick: PropTypes.func.isRequired,
};

export default UserPill;
