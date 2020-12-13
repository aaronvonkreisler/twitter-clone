import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelineTweets } from '../../actions/tweets';
import NoTweets from '../tweets/NoTweets';
import Tweet from '../tweets/Tweet';
import Spinner from '../layout/Spinner';
import ReplyModal from '../forms/ReplyModal';
import './styles/Feed.css';

const Feed = ({ getTimelineTweets, tweets: { tweets, loading }, user }) => {
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
            ) : user !== null && user.following.length === 0 ? (
               <NoTweets />
            ) : (
               user !== null &&
               tweets.map((tweet) => (
                  <Tweet
                     key={tweet._id}
                     tweet={tweet}
                     displayNumbers
                     onCommentClick={handleCommentClick}
                  />
               ))
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
   user: state.auth.user,
});
export default connect(mapStateToProps, { getTimelineTweets })(Feed);
