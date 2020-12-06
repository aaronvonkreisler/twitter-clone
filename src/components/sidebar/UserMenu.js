import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Menu, MenuItem, ClickAwayListener } from '@material-ui/core';
import { BsCheck } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { logout } from '../../actions/auth';
import './styles/UserMenu.css';
import '../../styles/design/utils.css';

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
      user && (
         <div>
            <Menu
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
               }}
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               <MenuItem>
                  <div className="list-item__root">
                     <div className="flex flex-row">
                        <div className="list-item__avatar">
                           <div className="list-item__avatar-holder">
                              <Avatar src={user.avatar} alt="" />
                           </div>
                        </div>
                        <div className="list-item__right-side">
                           <div className="flex flex-row justify-between align-center">
                              <div className="flex flex-col flex-shrink w-max-100">
                                 <div className="w-max-100 list-item__name">
                                    <span>{user.name}</span>
                                 </div>
                                 <div className="w-max-100 list-item__handle">
                                    <span>@{user.screen_name}</span>
                                 </div>
                              </div>
                              <BsCheck className="list-item__icon" />
                           </div>
                        </div>
                     </div>
                  </div>
               </MenuItem>

               <MenuItem onClick={handleLogout}>
                  Logout @{user.screen_name}
               </MenuItem>
            </Menu>

            <div className="user-menu__root">
               <div className="user-menu__wrapper" onClick={handleClick}>
                  <div className="user-menu__avatar">
                     <Avatar src={user.avatar} />
                  </div>

                  <div className="user-menu__name">
                     <div className="user-menu__name__container">
                        <div className="user-menu__display-name">
                           <span>{user.name}</span>
                        </div>
                        <div className="user-menu__handle-name">
                           <span>@{user.screen_name}</span>
                        </div>
                     </div>
                  </div>
                  <div className="user-menu__action">
                     <MdMoreHoriz />
                  </div>
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
