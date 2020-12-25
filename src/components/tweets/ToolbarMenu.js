import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import { BiBookmark } from 'react-icons/bi';

const ToolbarMenu = ({
   anchorEl,
   setAnchorEl,
   onClose,
   tweetOwner,
   currentUser,
   tweetId,
}) => {
   const open = Boolean(anchorEl);
   return (
      <React.Fragment>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
         >
            <MenuItem>
               <ListItemIcon>
                  <FiMail />
               </ListItemIcon>
               <ListItemText primary="Send via Direct Message" />
            </MenuItem>
            <MenuItem>
               <ListItemIcon>
                  <BiBookmark />
               </ListItemIcon>
               <ListItemText primary="Add Tweet to Bookmarks" />
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
};

ToolbarMenu.propTypes = {};

export default ToolbarMenu;
