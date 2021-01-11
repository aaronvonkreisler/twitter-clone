import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   getTweet,
   getTweetsReplies,
   clearTweetState,
   getTweetsLikedUsers,
   clearLikes,
} from '../actions/tweets';
import { setTweetInModal, openModal } from '../actions/modal';
import Spinner from '../components/layout/Spinner';
import Header from '../components/layout/Header';
import SingleTweet from '../components/tweets/SingleTweet';

import Tweet from '../components/tweets/Tweet';

const Status = ({
   tweets: { tweet, loading, tweetReady, replies, fetchingReplies },
   auth: { user },
   getTweet,
   getTweetsReplies,
   getTweetsLikedUsers,
   clearTweetState,
   setTweetInModal,
   openModal,
   match,
}) => {
   useEffect(() => {
      getTweet(match.params.tweet_id);
      getTweetsReplies(match.params.tweet_id);

      return function cleanup() {
         clearTweetState();
      };
   }, [getTweet, getTweetsReplies, clearTweetState, match.params.tweet_id]);

   useEffect(
      () =>
         tweet !== null
            ? (document.title = `${tweet.user.name} on Tweeter:`)
            : (document.title = 'Tweeter'),
      [tweet]
   );

   const handleCommentClick = (tweet) => {
      setTweetInModal(tweet);
      openModal();
   };

   const handleGetLikes = (tweetId) => {
      getTweetsLikedUsers(tweetId);
   };
   return (
      <React.Fragment>
         <Header text="Tweet" leftIcon />
         <div className="feed">
            {loading || !tweetReady || user === null ? (
               <Spinner />
            ) : (
               tweetReady &&
               tweet !== null && (
                  <React.Fragment>
                     <SingleTweet
                        tweet={tweet}
                        onCommentClick={handleCommentClick}
                        authId={user._id}
                        hasReplies={replies.length > 0}
                        handleGetLikes={handleGetLikes}
                     />

                     {fetchingReplies ? (
                        <Spinner />
                     ) : (
                        replies.map((reply) => (
                           <Tweet
                              tweet={reply}
                              key={reply._id}
                              displayActions={true}
                              replyingTo
                              displayNumbers
                              replyingToUserName={tweet.user.screen_name}
                              onCommentClick={handleCommentClick}
                              authId={user._id}
                           />
                        ))
                     )}
                  </React.Fragment>
               )
            )}
         </div>
      </React.Fragment>
   );
};

Status.propTypes = {
   getTweet: PropTypes.func.isRequired,
   getTweetsReplies: PropTypes.func.isRequired,
   setTweetInModal: PropTypes.func.isRequired,
   openModal: PropTypes.func.isRequired,
   clearTweetState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getTweet,
   getTweetsReplies,
   clearTweetState,
   setTweetInModal,
   openModal,
   clearLikes,
   getTweetsLikedUsers,
})(Status);
