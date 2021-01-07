import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HiOutlineSparkles } from 'react-icons/hi';
import Header from '../components/layout/Header';
import { addTweet } from '../actions/tweets';

import TweetFormWrapper from '../components/forms/TweetFormWrapper';
import Feed from '../components/feed/Feed';
import NoTweets from '../components/tweets/NoTweets';

import { fetchTimelineTweetsStart, clearTimeline } from '../actions/timeline';
import { getSidebarSuggestions } from '../actions/suggestions';
import useScrollPosition from '../hooks/useScrollPosition';

const Home = ({
   addTweet,
   fetchTimelineTweetsStart,
   clearTimeline,
   getSidebarSuggestions,
   timeline: { fetching, hasMore, tweets },
}) => {
   const [feedEl, setFeedEl] = useState(null);

   useEffect(() => {
      document.title = 'Home / Tweeter';
      const element = document.getElementById('feed');
      setFeedEl(element);
      fetchTimelineTweetsStart();

      return function cleanup() {
         clearTimeline();
      };
   }, [fetchTimelineTweetsStart, clearTimeline]);

   useEffect(() => {
      getSidebarSuggestions(3);
   }, [getSidebarSuggestions]);

   useScrollPosition(
      ({ atBottom }) => {
         if (atBottom && hasMore && !fetching) {
            fetchTimelineTweetsStart(tweets.length);
         }
      },
      null,
      [hasMore, fetching]
   );

   const onTweetSubmit = (tweet) => {
      addTweet(tweet);
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
               {/* <TweetForm
                  placeholder="What's happening?"
                  bottomBorder
                  onFormSubmit={onFormSubmit}
               /> */}
               <TweetFormWrapper bottomBorder onTweetSubmit={onTweetSubmit} />
               <Feed />
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

const mapStateToProps = (state) => ({
   timeline: state.timeline,
});

export default connect(mapStateToProps, {
   addTweet,
   fetchTimelineTweetsStart,
   getSidebarSuggestions,
   clearTimeline,
})(Home);
