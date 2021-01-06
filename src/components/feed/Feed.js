import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tweet from '../tweets/TweetV2';
import Spinner from '../layout/Spinner';

import '../../styles/design/feed.css';

const Feed = ({ timeline: { tweets, fetching }, auth: { user } }) => {
   return (
      <React.Fragment>
         <div className="feed" id="feed">
            {fetching && <Spinner />}
            {tweets &&
               user !== null &&
               tweets.map((tweet) =>
                  tweet.retweetData ? (
                     <Tweet
                        tweet={tweet.retweetData}
                        retweetedBy={tweet.user.name}
                        key={tweet._id}
                        displayNumbers
                        authId={user._id}
                     />
                  ) : (
                     <Tweet
                        key={tweet._id}
                        tweet={tweet}
                        displayNumbers
                        authId={user._id}
                     />
                  )
               )}
         </div>
      </React.Fragment>
   );
};

Feed.propTypes = {
   tweets: PropTypes.array,
   fetching: PropTypes.bool,
   user: PropTypes.object,
};

const mapStateToProps = (state) => ({
   timeline: state.timeline,
   auth: state.auth,
});
export default connect(mapStateToProps)(Feed);
