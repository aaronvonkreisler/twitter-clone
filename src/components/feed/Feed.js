import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelineTweets } from '../../actions/tweets';

import Tweet from '../tweets/Tweet';
import Spinner from '../layout/Spinner';

import './styles/Feed.css';

const Feed = ({
  tweets: { tweets, loading },
  auth: { user },
  getTimelineTweets,
}) => {
  useEffect(() => {
    getTimelineTweets();
  }, [getTimelineTweets]);

  return (
    <React.Fragment>
      <div className="feed">
        {loading || user === null ? (
          <Spinner />
        ) : (
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
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getTimelineTweets,
})(Feed);
