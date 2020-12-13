import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
} from '../../actions/tweets';
import '../../styles/design/tweet.css';

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

const Tweet = ({
   tweet,
   auth,
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   displayNumbers,
   displayActions,
   onCommentClick,
   replyView,
   bottomBorder,
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
      if (auth.isAuthenticated) {
         if (
            tweet.favorites.filter((fav) => fav.user === auth.user._id).length >
            0
         ) {
            return <BsHeartFill style={{ color: 'rgb(224, 36, 94)' }} />;
         }
      }
      return <BsHeart />;
   };

   const renderMenuItems = () => {
      if (auth.isAuthenticated) {
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
                  <MenuItem>Not Mine</MenuItem>
               )}
            </div>
         );
      }
      <MenuItem>Loading...</MenuItem>;
   };
   return (
      <div className={bottomBorder ? 'tweet__root border' : 'tweet__root'}>
         {displayActions && (
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
         )}
         {tweet && (
            <div className="flex flex-col">
               <article className="tweet__wrapper flex flex-row">
                  <div className=" tweet__avatar flex flex-col">
                     <Avatar
                        src={tweet.user.avatar}
                        style={{ height: '49px', width: '49px' }}
                     />
                     {replyView && <div className="reply-line" />}
                  </div>
                  <div className="tweet__content flex flex-col justify-between">
                     <div className="flex flex-row justify-between tweet__name">
                        <div className="flex flex-row justify-between align-start names__display">
                           <div className="flex flex-row justify-between">
                              <span className="display_name">
                                 {tweet.user.name}
                              </span>
                              {tweet.user.verified && (
                                 <span className="verified-badge">
                                    <GoVerified />
                                 </span>
                              )}
                              <span className="screen_name">
                                 @{tweet.user.screen_name}
                              </span>
                           </div>
                        </div>
                        {displayActions && (
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
                        )}
                     </div>
                     <Link
                        to={`/${tweet.user.screen_name}/status/${tweet._id}`}
                     >
                        {/* Content goes here */}
                        <ViewOnlyEditor
                           editorState={convertToEditorState(tweet.content)}
                           plugins={viewOnlyPlugins}
                        />
                     </Link>
                     {/* Toolbar area - like, retweet, comment buttons */}
                     {displayActions && (
                        <div className="tweet__bottom-actionArea flex flex-row justify-between">
                           <div className="tweetAction-item">
                              <div className="flex flex-col justify-center">
                                 <div
                                    className="action-wrapper comment_wrapper"
                                    onClick={() => onCommentClick(tweet)}
                                 >
                                    <div className="d-inline-flex buttonDisplay">
                                       <div className="iconBackgroundDisplay comment_display" />
                                       <BsChat />
                                    </div>
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.replies_count > 0 && (
                                                <span>
                                                   {' '}
                                                   {tweet.replies_count}
                                                </span>
                                             )}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="tweetAction-item ml-15">
                              <div className="flex flex-col justify-center">
                                 <div className="action-wrapper retweet_wrapper">
                                    <div className="d-inline-flex buttonDisplay">
                                       <div className="iconBackgroundDisplay retweet_display" />
                                       <AiOutlineRetweet />
                                    </div>
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.retweet_count > 0 && (
                                                <span>
                                                   {' '}
                                                   {tweet.retweet_count}
                                                </span>
                                             )}
                                       </span>
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
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.favorites_count > 0 && (
                                                <span>
                                                   {tweet.favorites_count}
                                                </span>
                                             )}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="tweetAction-item">
                              <div className="flex flex-col justify-center">
                                 <div className="action-wrapper comment_wrapper">
                                    <div className="d-inline-flex buttonDisplay">
                                       <div className="iconBackgroundDisplay comment_display" />
                                       <BsUpload />
                                    </div>
                                    <div className="metrics"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </article>
            </div>
         )}
      </div>
   );
};

Tweet.propTypes = {
   tweet: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   deleteTweet: PropTypes.func,
   favoriteTweet: PropTypes.func,
   removeFavorite: PropTypes.func,
   displayActions: PropTypes.bool,
   replyView: PropTypes.bool,
   bottomBorder: PropTypes.bool,
};

Tweet.defaultProps = {
   displayActions: true,
   replyView: false,
   bottomBorder: true,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});
export default connect(mapStateToProps, {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
})(Tweet);
