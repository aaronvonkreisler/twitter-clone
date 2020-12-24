import React from 'react';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import { addTweet } from '../../actions/tweets';
import TweetForm from '../feed/TweetForm';
import Feed from '../feed/Feed';

const Home = ({ addTweet }) => {
   const onFormSubmit = (content, image) => {
      addTweet({ content, image });
   };

   return (
      <React.Fragment>
         <Header text="Home" rightIcon />
         <TweetForm
            placeholder="What's happening?"
            bottomBorder
            onFormSubmit={onFormSubmit}
         />
         <Feed />
      </React.Fragment>
   );
};

export default connect(null, { addTweet })(Home);
