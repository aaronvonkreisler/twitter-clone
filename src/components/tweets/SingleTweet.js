import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { CgMore } from 'react-icons/cg';

import ViewOnlyEditor from '../layout/ViewOnlyEditor';
import ImageDisplay from './ImageDisplay';
import TweetMenu from './TweetMenu';
import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   reportTweet,
   retweet,
   pinTweetToProfile,
} from '../../actions/tweets';

import {
   viewOnlyPlugins,
   convertToEditorState,
} from '../../utils/draftEditorSetup';

import '../../styles/design/tweet.css';
import '../../styles/design/singleTweet.css';

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
}) => {
   const [anchorEl, setAnchorEl] = useState(null);

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
      setAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
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
      <div className="single-tweet__root">
         <TweetMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onClose={handleClose}
            tweetOwner={tweet.user._id}
            currentUser={authId}
            tweetId={tweet._id}
         />
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
                              <Link to={`/profile/${tweet.user.screen_name}`}>
                                 <span>{tweet.user.name}</span>
                              </Link>
                              {tweet.user.verified && (
                                 <span className="verified-badge">
                                    <GoVerified />
                                 </span>
                              )}
                           </div>
                           <div className="flex flex-row mw-100 align-center display_name">
                              <Link to={`/profile/${tweet.user.screen_name}`}>
                                 <span>@{tweet.user.screen_name}</span>
                              </Link>
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
               {tweet.image && <ImageDisplay image={tweet.image} />}
               <div className="singleTweet__time-data">
                  <Moment format="h:mm A • MMM D, YYYY">
                     {tweet.created_at}
                  </Moment>
               </div>
               <div className="singleTweet__metrics-wrapper">
                  <div className="metrics">
                     {tweet.retweetUsers.length > 0 && (
                        <div className="metrics-item">
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
                        <div className="metrics-item">
                           <span className="number">
                              {tweet.favorites.length}
                           </span>
                           <span className="text">
                              {tweet.favorites.length === 1 ? 'Like' : 'Likes'}
                           </span>
                        </div>
                     )}
                     {replies && replies.length > 0 && (
                        <div className="metrics-item">
                           <span className="number">{replies.length}</span>
                           <span className="text">
                              {replies.length === 1 ? 'Reply' : 'Replies'}
                           </span>
                        </div>
                     )}
                  </div>
               </div>
               {/* Toolbar area - like, retweet, comment buttons */}
               <div className="tweet__bottom-actionArea bottom-center flex flex-row justify-between ml-15 my-10">
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div
                           className="action-wrapper comment_wrapper"
                           onClick={() => onCommentClick(tweet)}
                        >
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay comment_display" />
                              <BsChat style={{ fontSize: '18px' }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tweetAction-item">
                     <div className="flex flex-col justify-center">
                        <div
                           className="action-wrapper retweet_wrapper"
                           onClick={() => retweet(tweet._id)}
                        >
                           <div className="d-inline-flex buttonDisplay">
                              <div className="iconBackgroundDisplay retweet_display" />
                              <AiOutlineRetweet
                                 style={{ fontSize: '18px' }}
                                 className={retweeted ? 'retweet__active' : ''}
                              />
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
                                       fontSize: '18px',
                                    }}
                                 />
                              ) : (
                                 <BsHeart style={{ fontSize: '18px' }} />
                              )}
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
