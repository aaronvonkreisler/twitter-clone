import React, { useState } from 'react';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import omit from 'lodash/omit';
import {
   Avatar,
   Menu,
   MenuItem,
   ListItemIcon,
   ListItemText,
} from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { CgMore } from 'react-icons/cg';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiPin } from 'react-icons/bi';
import ViewOnlyEditor from '../layout/ViewOnlyEditor';
import Spinner from '../layout/Spinner';
import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
} from '../../actions/tweets';

import '../../styles/design/tweet.css';
import '../../styles/design/singleTweet.css';

//--------------- Draft.js Editor config ---------------------------------
const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',
   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});
const hashtagPlugin = createHashtagPlugin();
const viewOnlyPlugins = [linkifyPlugin, hashtagPlugin];

const getPluginDecoratorArray = () => {
   let decorators = [];
   let plugin;
   // check each plugin that will be used in the editor for decorators
   // (retrieve listOfPlugins however makes sense in your code)
   for (plugin of viewOnlyPlugins) {
      if (plugin.decorators !== null && plugin.decorators !== undefined) {
         // if the plugin has any decorators, add them to a list of all decorators from all plugins
         decorators = decorators.concat(plugin.decorators);
      }
   }
   return decorators;
};

const grabAllPluginDecorators = () => {
   return new MultiDecorator([
      new CompositeDecorator(getPluginDecoratorArray()),
   ]);
};

const convertToEditorState = (editorContent) => {
   let decorator = grabAllPluginDecorators();
   const content = convertFromRaw(JSON.parse(editorContent));
   const newEditorState = EditorState.createWithContent(content, decorator);
   return newEditorState;
};

//--------------- End Draft.js Editor config ---------------------------------

const SingleTweet = ({
   tweet,
   auth,
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   displayNumbers,
}) => {
   const [anchorEl, setAnchorEl] = useState(null);

   const open = Boolean(anchorEl);

   const openActionMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLikeOrUnlike = () => {
      if (
         tweet.favorites.filter((fav) => fav.user === auth.user._id).length > 0
      ) {
         removeFavorite(tweet._id);
      } else {
         favoriteTweet(tweet._id);
      }
   };

   const renderFavoriteButton = () => {
      if (auth.isAuthenticated && auth.user !== null) {
         if (
            tweet.favorites.filter((fav) => fav.user === auth.user._id).length >
            0
         ) {
            return (
               <BsHeartFill
                  style={{ color: 'rgb(224, 36, 94)', fontSize: '18px' }}
               />
            );
         }
      }
      return <BsHeart style={{ fontSize: '18px' }} />;
   };

   const renderMenuItems = () => {
      if (auth.isAuthenticated && auth.user !== null) {
         return (
            <div>
               {!auth.loading && tweet.user._id === auth.user._id ? (
                  <React.Fragment>
                     <MenuItem
                        className="delete_tweet"
                        onClick={() => deleteTweet(tweet._id)}
                     >
                        <ListItemIcon>
                           <HiOutlineTrash />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                     </MenuItem>
                     <MenuItem className="pin-to-profile">
                        <ListItemIcon>
                           <BiPin />
                        </ListItemIcon>
                        <ListItemText primary="Pin to your profile" />
                     </MenuItem>
                  </React.Fragment>
               ) : (
                  <MenuItem>Report Tweet</MenuItem>
               )}
            </div>
         );
      }
      <MenuItem>
         <Spinner />
      </MenuItem>;
   };
   return (
      <div className="single-tweet__root">
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
         >
            {renderMenuItems()}
         </Menu>
         {tweet && (
            <div>
               <div className="flex flex-row mb-5">
                  <div className="singleTweet__avatar-root">
                     <div className="avatar__wrapper">
                        <Avatar src={tweet.user.avatar} />
                     </div>
                  </div>
                  {/* Display Name and screen Name */}
                  <div className="singleTweet__top-root">
                     <div className="flex flex-row justify-between align-start">
                        <div className="flex flex-col w-max-100">
                           <div className="flex flex-row w-max-100 align-center user_name">
                              <span>{tweet.user.name}</span>
                              {tweet.user.verified && (
                                 <span className="verified-badge">
                                    <GoVerified />
                                 </span>
                              )}
                           </div>
                           <div className="flex flex-row mw-100 align-center display_name">
                              <span>@{tweet.user.screen_name}</span>
                           </div>
                        </div>
                        <div
                           className="top-right__actionArea"
                           onClick={openActionMenu}
                        >
                           <div className="flex flex-row justify-start top-right-icon">
                              <div className="d-inline-flex">
                                 <div className="icon__border"></div>
                                 <CgMore />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Content goes here */}
               <div className="singleTweet__content-root">
                  <ViewOnlyEditor
                     editorState={convertToEditorState(tweet.content)}
                     plugins={viewOnlyPlugins}
                  />
               </div>
               <div className="singleTweet__time-data">
                  <Moment format="h:mm A • MMM D, YYYY">
                     {tweet.created_at}
                  </Moment>
               </div>
               <div className="singleTweet__metrics-wrapper">
                  <div className="metrics">
                     {tweet.retweet_count > 0 && (
                        <div className="metrics-item">
                           <span className="number">{tweet.retweet_count}</span>
                           <span className="text">
                              {tweet.retweet_count === 1
                                 ? 'Retweet'
                                 : 'Retweets'}
                           </span>
                        </div>
                     )}
                     {tweet.favorites_count > 0 && (
                        <div className="metrics-item">
                           <span className="number">
                              {tweet.favorites_count}
                           </span>
                           <span className="text">
                              {tweet.favorites_count === 1 ? 'Like' : 'Likes'}
                           </span>
                        </div>
                     )}
                     {tweet.replies_count > 0 && (
                        <div className="metrics-item">
                           <span className="number">{tweet.replies_count}</span>
                           <span className="text">
                              {tweet.replies_count === 1 ? 'Reply' : 'Replies'}
                           </span>
                        </div>
                     )}
                  </div>
               </div>
               {/* Toolbar area - like, retweet, comment buttons */}
               <div className="tweet__bottom-actionArea bottom-center flex flex-row justify-between ml-15 my-10">
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div className="action-wrapper comment_wrapper">
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay comment_display" />
                              <BsChat style={{ fontSize: '18px' }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div className="action-wrapper retweet_wrapper">
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay retweet_display" />
                              <AiOutlineRetweet style={{ fontSize: '18px' }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div
                           className="action-wrapper favorites_wrapper"
                           onClick={handleLikeOrUnlike}
                        >
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay favorites_display" />
                              {renderFavoriteButton()}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div className="action-wrapper comment_wrapper">
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay comment_display" />
                              <BsUpload style={{ fontSize: '18px' }} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

SingleTweet.propTypes = {
   tweet: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   deleteTweet: PropTypes.func.isRequired,
   favoriteTweet: PropTypes.func.isRequired,
   removeFavorite: PropTypes.func.isRequired,
   displayMetrics: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});
export default connect(mapStateToProps, {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
})(SingleTweet);
