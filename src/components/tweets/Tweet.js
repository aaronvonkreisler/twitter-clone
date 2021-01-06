import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { CgMore } from 'react-icons/cg';
import { BiPin } from 'react-icons/bi';

import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import mention from 'linkifyjs/plugins/mention';
import hashtag from 'linkifyjs/plugins/hashtag';
import { linkifyOptions } from '../../utils/linkifyOptions';

import TweetMenu from './TweetMenu';
import ToolbarMenu from './ToolbarMenu';
import ImageDisplay from './ImageDisplay';
import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   retweet,
} from '../../actions/tweets';

import { openModal, setTweetInModal } from '../../actions/modal';
import '../../styles/design/tweet.css';

mention(linkify);
hashtag(linkify);

const Tweet = ({
   tweet,
   authId,
   favoriteTweet,
   retweet,
   retweetedBy,
   removeFavorite,
   displayNumbers,
   displayActions,
   replyView,
   replyingTo,
   replyingToUserName,
   bottomBorder,
   pinnedTweet,
   openModal,
   setTweetInModal,
}) => {
   const [tweetMenuAnchorEl, setTweetMenuAnchorEl] = useState(null);
   const [toolbarMenuAnchorEl, setToolbarMenuAnchorEl] = useState(null);
   const [tweetLiked, setTweetLiked] = useState(false);

   const [retweeted, setRetweeted] = useState(false);

   useEffect(() => {
      const isLiked =
         tweet.favorites.filter((fav) => fav.user === authId).length > 0;
      const isRetweeted = tweet.retweetUsers.includes(authId);

      setTweetLiked(isLiked);
      setRetweeted(isRetweeted);
   }, [authId, tweet]);

   const openActionMenu = (e) => {
      setTweetMenuAnchorEl(e.currentTarget);
   };

   const openToolbarMenu = (e) => {
      setToolbarMenuAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setTweetMenuAnchorEl(null);
      setToolbarMenuAnchorEl(null);
   };

   const handleLikeOrUnlike = () => {
      if (tweetLiked) {
         removeFavorite(tweet._id);
         setTweetLiked(false);
      } else {
         favoriteTweet(tweet._id);
         setTweetLiked(true);
      }
   };

   let linkProps = {
      onClick: (e) => {
         e.preventDefault();
         console.log('Hi');
      },
   };

   return (
      <div className={bottomBorder ? 'tweet__root border' : 'tweet__root'}>
         {displayActions && (
            <React.Fragment>
               <TweetMenu
                  anchorEl={tweetMenuAnchorEl}
                  setAnchorEl={setTweetMenuAnchorEl}
                  onClose={handleClose}
                  tweetOwner={tweet.user._id}
                  currentUser={authId}
                  tweetId={tweet._id}
                  pinnedTweet={pinnedTweet}
               />
               <ToolbarMenu
                  anchorEl={toolbarMenuAnchorEl}
                  setAnchorEl={setToolbarMenuAnchorEl}
                  onClose={handleClose}
                  bookmarkedBy={tweet.bookmarkedBy}
                  currentUser={authId}
                  tweetId={tweet._id}
               />
            </React.Fragment>
         )}
         {tweet && (
            <div className="flex flex-col">
               {retweetedBy && (
                  <div className="retweetedByDisplay">
                     <div className="retweetIcon__col">
                        <AiOutlineRetweet />
                     </div>
                     <div className="retweetedBy__col">
                        <span>{retweetedBy} Retweeted</span>
                     </div>
                  </div>
               )}
               {pinnedTweet && (
                  <div className="retweetedByDisplay">
                     <div className="retweetIcon__col">
                        <BiPin />
                     </div>
                     <div className="retweetedBy__col">
                        <span>Pinned Tweet</span>
                     </div>
                  </div>
               )}

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
                                 <Link
                                    to={`/profile/${tweet.user.screen_name}`}
                                 >
                                    {tweet.user.name}
                                 </Link>
                              </span>
                              {tweet.user.verified && (
                                 <span className="verified-badge">
                                    <GoVerified />
                                 </span>
                              )}
                              <span className="screen_name">
                                 <Link
                                    to={`/profile/${tweet.user.screen_name}`}
                                 >
                                    @{tweet.user.screen_name}
                                 </Link>
                              </span>
                              <span className="time_stamp">
                                 •{' '}
                                 <Moment fromNow ago>
                                    {tweet.created_at}
                                 </Moment>
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

                     {/* Content goes here */}
                     {replyingTo && (
                        <div className="replying_to">
                           Replying to{' '}
                           <span className="reply_screen_name">
                              <Link to="/profile">@{replyingToUserName}</Link>
                           </span>
                        </div>
                     )}
                     <Linkify options={linkifyOptions}>{tweet.content}</Linkify>

                     {/* IMAGE PREVIEW COMPONENT GOES HERE */}
                     {tweet.image && (
                        <ImageDisplay
                           image={tweet.image}
                           path={`/${tweet.user.screen_name}/status/${tweet._id}`}
                        />
                     )}

                     {/* Toolbar area - like, retweet, comment buttons */}
                     {displayActions && (
                        <div className="tweet__bottom-actionArea flex flex-row justify-between">
                           <div className="tweetAction-item">
                              <div className="flex flex-col justify-center">
                                 <div
                                    className="action-wrapper comment_wrapper"
                                    onClick={() => {
                                       setTweetInModal(tweet);
                                       openModal();
                                    }}
                                 >
                                    <div className="d-inline-flex buttonDisplay">
                                       <div className="iconBackgroundDisplay comment_display" />
                                       <BsChat />
                                    </div>
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.replies.length > 0 && (
                                                <span>
                                                   {' '}
                                                   {tweet.replies.length}
                                                </span>
                                             )}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="tweetAction-item ml-15">
                              <div className="flex flex-col justify-center">
                                 <div
                                    className="action-wrapper retweet_wrapper"
                                    onClick={() => {
                                       retweet(tweet._id);
                                       setRetweeted(!retweeted);
                                    }}
                                 >
                                    <div className="d-inline-flex buttonDisplay">
                                       <div className="iconBackgroundDisplay retweet_display" />
                                       <AiOutlineRetweet
                                          className={
                                             retweeted ? 'retweet__active' : ''
                                          }
                                       />
                                    </div>
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.retweetUsers.length > 0 && (
                                                <span>
                                                   {' '}
                                                   {tweet.retweetUsers.length}
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
                                       {tweetLiked ? (
                                          <BsHeartFill
                                             style={{
                                                color: 'rgb(224, 36, 94)',
                                             }}
                                          />
                                       ) : (
                                          <BsHeart />
                                       )}
                                    </div>
                                    <div className="metrics">
                                       <span className="metrics__item">
                                          {displayNumbers &&
                                             tweet.favorites.length > 0 && (
                                                <span>
                                                   {tweet.favorites.length}
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
                                    className="action-wrapper comment_wrapper"
                                    onClick={openToolbarMenu}
                                 >
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

   deleteTweet: PropTypes.func,
   favoriteTweet: PropTypes.func,
   retweet: PropTypes.func,
   retweetedBy: PropTypes.string,
   removeFavorite: PropTypes.func,
   displayActions: PropTypes.bool,
   replyView: PropTypes.bool,
   bottomBorder: PropTypes.bool,
   replyingTo: PropTypes.bool,
   replyingToUserName: PropTypes.string,
   pinnedTweet: PropTypes.bool,
};

Tweet.defaultProps = {
   displayActions: true,
   replyView: false,
   bottomBorder: true,
   pinnedTweet: false,
};

export default connect(null, {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   retweet,
   openModal,
   setTweetInModal,
})(Tweet);
