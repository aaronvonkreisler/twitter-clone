import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { CgMore } from 'react-icons/cg';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BiPin } from 'react-icons/bi';

import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import mention from 'linkifyjs/plugins/mention';
import hashtag from 'linkifyjs/plugins/hashtag';
import { linkifyOptions } from '../../utils/linkifyOptions';

import Toolbar from './Toolbar';
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

   let history = useHistory();

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

   const onCommentClick = () => {
      setTweetInModal(tweet);
      openModal();
   };

   const onRetweetClick = () => {
      retweet(tweet._id);
      setRetweeted(!retweeted);
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

   return (
      <React.Fragment>
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
            <div className="tweet-wrapper">
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
               <article
                  className={bottomBorder ? 'tweet bottom-border' : 'tweet'}
               >
                  <div
                     className="image"
                     onClick={() =>
                        history.push(
                           `/${tweet.user.screen_name}/status/${tweet._id}`
                        )
                     }
                  >
                     <Avatar
                        className="profile-image"
                        src={tweet.user.avatar}
                        alt=""
                     />
                     {replyView && <div className="reply-line" />}
                  </div>
                  <div className="body">
                     <header className="tweet-info">
                        <Link
                           to={`/profile/${tweet.user.screen_name}`}
                           className="tweet-info-user"
                        >
                           <span className="name">{tweet.user.name}</span>
                           <span className="screen-name">
                              @{tweet.user.screen_name}
                           </span>

                           <span className="verified-badge">
                              {tweet.user.verified && <GoVerified />}
                           </span>
                           <span className="date">
                              <span className="bullet">·</span>
                              <Moment fromNow ago>
                                 {tweet.created_at}
                              </Moment>
                           </span>
                        </Link>
                        {displayActions && (
                           <div className="tweet-menu" onClick={openActionMenu}>
                              <div className="icon-border" />
                              <button className="icon-button">
                                 <CgMore />
                              </button>
                           </div>
                        )}
                     </header>
                     <div
                        className="content"
                        onClick={(e) => {
                           if (e.target.tagName !== 'A') {
                              history.push(
                                 `/${tweet.user.screen_name}/status/${tweet._id}`
                              );
                           }
                        }}
                     >
                        {replyingTo && (
                           <div className="replying_to" role="button">
                              Replying to{' '}
                              <span className="reply_screen_name">
                                 <Link to="/profile">
                                    @{replyingToUserName}
                                 </Link>
                              </span>
                           </div>
                        )}
                        <Linkify options={linkifyOptions}>
                           {tweet.content}
                        </Linkify>
                        {tweet.image && <ImageDisplay image={tweet.image} />}
                     </div>
                     <div className="toolbar">
                        {displayActions && (
                           <Toolbar
                              isLiked={tweetLiked}
                              isRetweeted={retweeted}
                              onCommentClick={onCommentClick}
                              onFavoriteClick={handleLikeOrUnlike}
                              onRetweetClick={onRetweetClick}
                              onToolbarMenuClick={openToolbarMenu}
                              favorites={tweet.favorites}
                              replies={tweet.replies}
                              retweets={tweet.retweetUsers}
                              overrideStyle={{
                                 justifyContent: 'space-between',
                              }}
                           />
                        )}
                     </div>
                  </div>
               </article>
            </div>
         )}
      </React.Fragment>
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
