import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelineTweets } from '../../actions/tweets';
import Tweet from '../tweets/Tweet';
import Spinner from '../layout/Spinner';
import ReplyModal from '../forms/ReplyModal';
import './styles/Feed.css';

const Feed = ({ getTimelineTweets, tweets: { tweets, loading } }) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [tweetForModal, setTweetForModal] = useState(null);

   useEffect(() => {
      getTimelineTweets();
   }, [getTimelineTweets]);

   const handleCommentClick = (tweet) => {
      setTweetForModal(tweet);
      setModalOpen(true);
   };

   return (
      <React.Fragment>
         <ReplyModal
            tweet={tweetForModal}
            open={modalOpen}
            setOpen={setModalOpen}
         />
         <div className="feed">
            {loading ? (
               <Spinner />
            ) : (
               tweets.map((tweet) =>
                  tweet.retweetData ? (
                     <Tweet
                        tweet={tweet.retweetData}
                        retweetedBy={tweet.user.name}
                        key={tweet._id}
                        displayNumbers
                        onCommentClick={handleCommentClick}
                     />
                  ) : (
                     <Tweet
                        key={tweet._id}
                        tweet={tweet}
                        displayNumbers
                        onCommentClick={handleCommentClick}
                     />
                  )
               )
            )}
         </div>
      </React.Fragment>
   );
};

Feed.propTypes = {
   getTimelineTweets: PropTypes.func.isRequired,
   tweets: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
});
export default connect(mapStateToProps, { getTimelineTweets })(Feed);
