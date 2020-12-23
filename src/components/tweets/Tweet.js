import React, { useState } from 'react';
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
import ViewOnlyEditor from '../layout/ViewOnlyEditor';
import TweetMenu from './TweetMenu';
import {
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   retweet,
   reportTweet,
   pinTweetToProfile,
} from '../../actions/tweets';

import {
   convertToEditorState,
   viewOnlyPlugins,
} from '../../utils/draftEditorSetup';

import '../../styles/design/tweet.css';

const Tweet = ({
   tweet,
   auth,
   deleteTweet,
   favoriteTweet,
   retweet,
   retweetedBy,
   removeFavorite,
   displayNumbers,
   displayActions,
   onCommentClick,
   replyView,
   replyingTo,
   replyingToUserName,
   bottomBorder,
   reportTweet,
   pinnedTweet,
   pinTweetToProfile,
}) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [tweetLiked, setTweetLiked] = useState(() =>
      tweet
         ? tweet.favorites.filter((fav) => fav.user === auth.user._id).length >
           0
         : false
   );

   const [retweeted, setRetweeted] = useState(() =>
      tweet.retweetUsers.includes(auth.user._id)
   );

   // const retweetActiveClass = tweet.retweetUsers.includes(auth.user._id)
   //    ? 'retweet__active'
   //    : '';

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
      <div className={bottomBorder ? 'tweet__root border' : 'tweet__root'}>
         {displayActions && (
            <TweetMenu
               anchorEl={anchorEl}
               setAnchorEl={setAnchorEl}
               onClose={handleClose}
               tweetOwner={tweet.user._id}
               currentUser={auth.user._id}
               tweetId={tweet._id}
            />
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
                     <Link
                        to={`/${tweet.user.screen_name}/status/${tweet._id}`}
                     >
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
   retweet: PropTypes.func,
   retweetedBy: PropTypes.string,
   removeFavorite: PropTypes.func,
   displayActions: PropTypes.bool,
   replyView: PropTypes.bool,
   bottomBorder: PropTypes.bool,
   replyingTo: PropTypes.bool,
   replyingToUserName: PropTypes.string,
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
   retweet,
   reportTweet,
   pinTweetToProfile,
})(Tweet);
