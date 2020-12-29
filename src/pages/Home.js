import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HiOutlineSparkles } from 'react-icons/hi';
import Header from '../components/layout/Header';
import { addTweet } from '../actions/tweets';
import TweetForm from '../components/feed/TweetForm';
import Feed from '../components/feed/Feed';
import NoTweets from '../components/tweets/NoTweets';

import { fetchTimelineTweetsStart } from '../actions/timeline';
import useScrollPosition from '../hooks/useScrollPosition';

const Home = ({
  addTweet,
  fetchTimelineTweetsStart,
  timeline: { fetching, hasMore, tweets },
}) => {
  const [feedEl, setFeedEl] = useState(null);

  useEffect(() => {
    document.title = 'Home / Tweeter';
    const element = document.getElementById('feed');
    setFeedEl(element);
    fetchTimelineTweetsStart();
  }, [fetchTimelineTweetsStart]);

  useScrollPosition(
    ({ atBottom }) => {
      if (atBottom && hasMore && !fetching) {
        fetchTimelineTweetsStart(tweets.length);
      }
    },
    feedEl,
    [hasMore, fetching]
  );

  const onFormSubmit = (content, image) => {
    addTweet({ content, image });
  };

  return (
    <React.Fragment>
      <Header
        text="Home"
        rightIcon
        IconComponent={HiOutlineSparkles}
        onRightIconClick={() => alert('TODO')}
      />
      {!fetching && tweets.length === 0 ? (
        <NoTweets />
      ) : (
        <React.Fragment>
          <TweetForm
            placeholder="What's happening?"
            bottomBorder
            onFormSubmit={onFormSubmit}
          />
          <Feed />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
});

export default connect(mapStateToProps, { addTweet, fetchTimelineTweetsStart })(
  Home
);
