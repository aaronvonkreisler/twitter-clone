import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTweet } from '../../actions/tweets';
import Spinner from '../layout/Spinner';
import Header from '../layout/Header';
import PropTypes from 'prop-types';
import SingleTweet from '../tweets/SingleTweet';
import ReplyModal from '../forms/ReplyModal';
import Tweet from '../tweets/Tweet';

const TweetDisplay = ({
   tweets: { tweet, loading, tweetReady },
   getTweet,
   match,
}) => {
   let history = useHistory();
   const [modalOpen, setModalOpen] = useState(false);
   const [tweetForModal, setTweetForModal] = useState(null);

   useEffect(() => {
      getTweet(match.params.tweet_id);
   }, [getTweet, match.params.tweet_id]);

   const handleCommentClick = (tweet) => {
      setTweetForModal(tweet);
      setModalOpen(true);
   };
   return (
      <React.Fragment>
         <Header text="Tweet" leftIcon onIconClick={() => history.goBack()} />
         <div className="feed">
            {loading && !tweetReady ? (
               <Spinner />
            ) : (
               tweetReady && (
                  <React.Fragment>
                     <ReplyModal
                        tweet={tweetForModal}
                        open={modalOpen}
                        setOpen={setModalOpen}
                     />
                     <SingleTweet
                        tweet={tweet}
                        onCommentClick={handleCommentClick}
                     />

                     {tweet.replies.map((reply) => (
                        <Tweet
                           tweet={reply.tweet}
                           key={reply.tweet._id}
                           displayActions={false}
                           replyingTo
                           replyingToUserName={tweet.user.screen_name}
                        />
                     ))}
                  </React.Fragment>
               )
            )}
         </div>
      </React.Fragment>
   );
};

TweetDisplay.propTypes = {
   getTweet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
});

export default connect(mapStateToProps, { getTweet })(TweetDisplay);
