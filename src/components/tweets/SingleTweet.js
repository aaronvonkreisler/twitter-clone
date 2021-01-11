import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { CgMore } from 'react-icons/cg';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import mention from 'linkifyjs/plugins/mention';
import hashtag from 'linkifyjs/plugins/hashtag';
import { linkifyOptions } from '../../utils/linkifyOptions';

import ImageDisplay from './ImageDisplay';
import TweetMenu from './TweetMenu';
import ToolbarMenu from './ToolbarMenu';
import Toolbar from './Toolbar';

import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   reportTweet,
   retweet,
   pinTweetToProfile,
} from '../../actions/tweets';

import '../../styles/design/tweet.css';
import '../../styles/design/singleTweet.css';

mention(linkify);
hashtag(linkify);

const SingleTweet = ({
   tweet,
   authId,
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   displayNumbers,
   onCommentClick,
   reportTweet,
   retweet,
   pinTweetToProfile,
   replies,
   hasReplies,
   handleGetLikes,
}) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [tweetLiked, setTweetLiked] = useState(false);
   const [retweeted, setRetweeted] = useState(false);
   const [toolbarMenuAnchorEl, setToolbarMenuAnchorEl] = useState(null);

   useEffect(() => {
      const isLiked =
         tweet.favorites.filter((fav) => fav.user === authId).length > 0;
      const isRetweeted = tweet.retweetUsers.includes(authId);
      setTweetLiked(isLiked);
      setRetweeted(isRetweeted);
   }, [authId, tweet]);

   const openActionMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const openToolbarMenu = (e) => {
      setToolbarMenuAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
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

   const handleRetweet = () => {
      retweet(tweet._id);
      setRetweeted(!retweeted);
   };

   return (
      <React.Fragment>
         <TweetMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onClose={handleClose}
            tweetOwner={tweet.user._id}
            currentUser={authId}
            tweetId={tweet._id}
         />
         <ToolbarMenu
            anchorEl={toolbarMenuAnchorEl}
            setAnchorEl={setToolbarMenuAnchorEl}
            onClose={handleClose}
            bookmarkedBy={tweet.bookmarkedBy}
            currentUser={authId}
            tweetId={tweet._id}
         />
         {tweet && (
            <React.Fragment>
               <article className="single-tweet">
                  <header className="single-tweet-header">
                     <div className="image">
                        <Link to={`/profile/${tweet.user.screen_name}`}>
                           <Avatar
                              src={tweet.user.avatar}
                              style={{ height: '49px', width: '49px' }}
                           />
                        </Link>
                     </div>
                     <div className="right-col">
                        <Link
                           to={`/profile/${tweet.user.screen_name}`}
                           className="names"
                        >
                           <span>
                              <span className="full-name">
                                 {tweet.user.name}
                              </span>
                              <span className="verified-badge">
                                 {tweet.user.verified && <GoVerified />}
                              </span>
                           </span>
                           <span className="screen-name">
                              @{tweet.user.screen_name}
                           </span>
                        </Link>

                        <button
                           className="icon-button hover-blue"
                           onClick={openActionMenu}
                        >
                           <CgMore />
                        </button>
                     </div>
                  </header>
                  <div className="single-tweet-content">
                     <Linkify options={linkifyOptions}>{tweet.content}</Linkify>
                  </div>
                  <div className="single-tweet-media">
                     {tweet.image && <ImageDisplay image={tweet.image} />}
                  </div>
                  <div className="single-tweet-info">
                     <Moment format="h:MM A · MMM D, YYYY">
                        {tweet.createdAt}
                     </Moment>
                     <span>·</span>
                     <span>Tweeter</span>
                  </div>

                  <div className="single-tweet-numbers">
                     {tweet.retweetUsers.length > 0 && (
                        <div className="number-item">
                           <span className="number">
                              {tweet.retweetUsers.length}
                           </span>
                           <span className="text">
                              {tweet.retweetUsers.length === 1
                                 ? 'Retweet'
                                 : 'Retweets'}
                           </span>
                        </div>
                     )}
                     {tweet.favorites.length > 0 && (
                        <div
                           className="number-item"
                           onClick={() => handleGetLikes(tweet._id)}
                        >
                           <span className="number">
                              {tweet.favorites.length}
                           </span>
                           <span className="text">
                              {tweet.favorites.length === 1 ? 'Like' : 'Likes'}
                           </span>
                        </div>
                     )}
                  </div>
                  <Toolbar
                     isLiked={tweetLiked}
                     isRetweeted={retweeted}
                     withNumbers={false}
                     onCommentClick={() => onCommentClick(tweet)}
                     onFavoriteClick={handleLikeOrUnlike}
                     onRetweetClick={handleRetweet}
                     onToolbarMenuClick={openToolbarMenu}
                     overrideStyle={{ justifyContent: 'space-evenly' }}
                  />
                  {/**----------------------------------------------------------------------------- */}
               </article>
               {!hasReplies && <div className="space-filler" />}
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

SingleTweet.propTypes = {
   tweet: PropTypes.object.isRequired,

   deleteTweet: PropTypes.func.isRequired,
   favoriteTweet: PropTypes.func.isRequired,
   removeFavorite: PropTypes.func.isRequired,
   retweet: PropTypes.func.isRequired,
   displayMetrics: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   replies: state.tweets.replies,
});
export default connect(mapStateToProps, {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   reportTweet,
   retweet,
   pinTweetToProfile,
})(SingleTweet);
