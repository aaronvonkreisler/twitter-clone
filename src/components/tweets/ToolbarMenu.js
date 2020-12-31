import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import { BiBookmark } from 'react-icons/bi';
import {
   addTweetToBookmarks,
   removeTweetFromBookmarks,
} from '../../actions/bookmarks';
import '../../styles/design/toolbarMenu.css';

const ToolbarMenu = ({
   anchorEl,
   setAnchorEl,
   onClose,
   bookmarkedBy,
   currentUser,
   tweetId,
   removeTweetFromBookmarks,
   addTweetToBookmarks,
   match,
}) => {
   const [isBookmarked, setIsBookmarked] = useState(false);

   useEffect(() => {
      const isBookmarked = bookmarkedBy.includes(currentUser);
      setIsBookmarked(isBookmarked);
   }, [bookmarkedBy, currentUser]);
   const open = Boolean(anchorEl);
   return (
      <React.Fragment>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            getContentAnchorEl={null}
         >
            <MenuItem className="menuItem">
               <ListItemIcon>
                  <FiMail />
               </ListItemIcon>
               <ListItemText primary="Send via Direct Message" />
            </MenuItem>
            {isBookmarked ? (
               <MenuItem
                  className="menuItem"
                  onClick={() => {
                     removeTweetFromBookmarks(tweetId);
                     setIsBookmarked(false);
                     setAnchorEl(null);
                  }}
               >
                  <ListItemIcon>
                     <BiBookmark />
                  </ListItemIcon>
                  <ListItemText primary="Remove Tweet from Bookmarks" />
               </MenuItem>
            ) : (
               <MenuItem
                  className="menuItem"
                  onClick={() => {
                     addTweetToBookmarks(tweetId);
                     setIsBookmarked(true);
                     setAnchorEl(null);
                  }}
               >
                  <ListItemIcon>
                     <BiBookmark />
                  </ListItemIcon>
                  <ListItemText primary="Add Tweet to Bookmarks" />
               </MenuItem>
            )}
         </Menu>
      </React.Fragment>
   );
};

ToolbarMenu.propTypes = {
   tweetId: PropTypes.string,
};

export default connect(null, { addTweetToBookmarks, removeTweetFromBookmarks })(
   ToolbarMenu
);
