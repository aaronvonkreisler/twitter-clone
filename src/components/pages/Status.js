import React, { useEffect, useState, useMemo } from 'react';

import { connect } from 'react-redux';
import {
   getTweet,
   getTweetsReplies,
   clearTweetState,
} from '../../actions/tweets';
import Spinner from '../layout/Spinner';
import Header from '../layout/Header';
import PropTypes from 'prop-types';
import SingleTweet from '../tweets/SingleTweet';
import ReplyModal from '../forms/ReplyModal';
import Tweet from '../tweets/Tweet';

const TweetDisplay = ({
   tweets: { tweet, loading, tweetReady, replies, fetchingReplies },
   auth: { user },
   getTweet,
   getTweetsReplies,
   clearTweetState,
   match,
}) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [tweetForModal, setTweetForModal] = useState(null);

   useEffect(() => {
      getTweet(match.params.tweet_id);
      getTweetsReplies(match.params.tweet_id);

      return function cleanup() {
         clearTweetState();
      };
   }, [getTweet, getTweetsReplies, clearTweetState, match.params.tweet_id]);

   const handleCommentClick = (tweet) => {
      setTweetForModal(tweet);
      setModalOpen(true);
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
                     <ReplyModal
                        tweet={tweetForModal}
                        open={modalOpen}
                        setOpen={setModalOpen}
                     />
                     <SingleTweet
                        tweet={tweet}
                        onCommentClick={handleCommentClick}
                        authId={user._id}
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

TweetDisplay.propTypes = {
   getTweet: PropTypes.func.isRequired,
   getTweetsReplies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getTweet,
   getTweetsReplies,
   clearTweetState,
})(TweetDisplay);
