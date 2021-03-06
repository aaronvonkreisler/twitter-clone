import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiPin } from 'react-icons/bi';
import {
   deleteTweet,
   reportTweet,
   pinTweetToProfile,
   removePinnedTweetFromProfile,
} from '../../actions/tweets';

const TweetMenu = ({
   anchorEl,
   setAnchorEl,
   onClose,
   tweetOwner,
   currentUser,
   tweetId,
   deleteTweet,
   reportTweet,
   pinTweetToProfile,
   removePinnedTweetFromProfile,
   pinnedTweet,
}) => {
   const open = Boolean(anchorEl);

   // tweetOwner : Id of the owener of the tweet (string)
   // currentUser: ID of the user currently logged in. (string)
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
            {tweetOwner === currentUser ? (
               <div>
                  <MenuItem
                     className="delete_tweet"
                     onClick={() => {
                        deleteTweet(tweetId);
                        setAnchorEl(null);
                     }}
                  >
                     <ListItemIcon>
                        <HiOutlineTrash />
                     </ListItemIcon>
                     <ListItemText primary="Delete" />
                  </MenuItem>
                  {pinnedTweet ? (
                     <MenuItem
                        className="pin-to-profile"
                        onClick={() => {
                           removePinnedTweetFromProfile();
                           setAnchorEl(null);
                        }}
                     >
                        <ListItemIcon>
                           <BiPin />
                        </ListItemIcon>
                        <ListItemText primary="Remove pinned tweet" />
                     </MenuItem>
                  ) : (
                     <MenuItem
                        className="pin-to-profile"
                        onClick={() => {
                           pinTweetToProfile(tweetId);
                           setAnchorEl(null);
                        }}
                     >
                        <ListItemIcon>
                           <BiPin />
                        </ListItemIcon>
                        <ListItemText primary="Pin to your profile" />
                     </MenuItem>
                  )}
               </div>
            ) : (
               <MenuItem
                  onClick={() => {
                     reportTweet();
                     setAnchorEl(null);
                  }}
               >
                  Report Tweet
               </MenuItem>
            )}
         </Menu>
      </React.Fragment>
   );
};

TweetMenu.propTypes = {
   pinTweetToProfile: PropTypes.func.isRequired,
   deleteTweet: PropTypes.func.isRequired,
   reportTweet: PropTypes.func.isRequired,
   tweetOwner: PropTypes.string.isRequired,
   currentUser: PropTypes.string.isRequired,
   tweetId: PropTypes.string.isRequired,
};

export default connect(null, {
   deleteTweet,
   reportTweet,
   pinTweetToProfile,
   removePinnedTweetFromProfile,
})(TweetMenu);
