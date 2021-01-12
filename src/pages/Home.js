import React, { useEffect } from 'react';
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
   useEffect(() => {
      document.title = 'Home / Tweeter';

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
