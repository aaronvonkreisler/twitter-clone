import React from 'react';
import Header from '../layout/Header';
import TweetForm from '../feed/TweetForm';
import Feed from '../feed/Feed';

const Home = () => {
   return (
      <React.Fragment>
         <Header text="Home" />
         <TweetForm />
         <Feed />
      </React.Fragment>
   );
};

export default Home;
