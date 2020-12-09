import React from 'react';
import Header from '../layout/Header';
import TweetForm from '../feed/TweetForm';

const Home = () => {
   return (
      <React.Fragment>
         <Header text="Home" />
         <TweetForm />
      </React.Fragment>
   );
};

export default Home;
