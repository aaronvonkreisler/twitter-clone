import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelineTweets } from '../../actions/tweets';

import Tweet from '../tweets/Tweet';
import Spinner from '../layout/Spinner';

import './styles/Feed.css';

const Feed = ({ timeline: { tweets, fetching }, auth: { user } }) => {
  return (
    <React.Fragment>
      <div className="feed" id="feed">
        {fetching && <Spinner />}
        {tweets &&
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
  tweets: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getTimelineTweets,
})(Feed);
