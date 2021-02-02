import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { BsCheck } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { logout } from '../../actions/auth';

import '../../styles/design/userMenu.css';

const UserMenu = ({ auth: { user, loading }, logout }) => {
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      logout();
   };

   return (
      !loading &&
      user !== null && (
         <div className="sidebar__user-menu">
            <Menu
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
               }}
               transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
               }}
               getContentAnchorEl={null}
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
               id="sidebar-menu"
            >
               <MenuItem disableGutters>
                  <div className="list-item">
                     <div className="avatar">
                        <Avatar src={user.avatarSmall} />
                     </div>
                     <div className="names">
                        <div className="display-name">
                           <span>{user.name}</span>
                        </div>
                        <div className="screen-name">
                           <span>@{user.screen_name}</span>
                        </div>
                     </div>
                     <div className="menu-icon">
                        <span className="icon">
                           <BsCheck />
                        </span>
                     </div>
                  </div>
               </MenuItem>

               <MenuItem onClick={handleLogout}>
                  Logout @{user.screen_name}
               </MenuItem>
            </Menu>

            <div className="user-menu" onClick={handleClick}>
               <div className="avatar">
                  <Avatar src={user.avatarSmall} />
               </div>
               <div className="names">
                  <div className="display-name">
                     <span>{user.name}</span>
                  </div>
                  <div className="screen-name">
                     <span>@{user.screen_name}</span>
                  </div>
               </div>
               <div className="menu-icon">
                  <span className="icon">
                     <MdMoreHoriz />
                  </span>
               </div>
            </div>
         </div>
      )
   );
};

UserMenu.propTypes = {
   auth: PropTypes.object.isRequired,
   logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { logout })(UserMenu);
