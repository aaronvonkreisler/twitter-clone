import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProfileTweets } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Tweet from '../tweets/Tweet';

import PropTypes from 'prop-types';

const ProfileTweets = ({
   getProfileTweets,
   userId,
   onCommentClick,
   profiles: { tweetsLoading, tweets, pinnedTweet },
}) => {
   useEffect(() => {
      getProfileTweets(userId);
   }, [getProfileTweets, userId]);

   return (
      <React.Fragment>
         {tweetsLoading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               {pinnedTweet && (
                  <Tweet
                     tweet={pinnedTweet}
                     key={pinnedTweet.user._id}
                     displayActions={false}
                     pinnedTweet
                  />
               )}
               {tweets.map((tweet) => (
                  <Tweet
                     tweet={tweet}
                     key={tweet._id}
                     displayActions={true}
                     onCommentClick={onCommentClick}
                  />
               ))}
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

ProfileTweets.propTypes = {
   getProfileTweets: PropTypes.func.isRequired,
   tweets: PropTypes.array,
};

const mapStateToProps = (state) => ({
   profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfileTweets })(ProfileTweets);
