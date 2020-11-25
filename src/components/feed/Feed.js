import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import Header from './Header';
import TweetForm from './TweetForm';
import './styles/Feed.css';

const Feed = () => {
   const largeDevice = useMediaQuery('(min-width:1440px)');
   return (
      <div className={largeDevice ? 'feed' : 'feed-small-screen'}>
         <Header />
         <TweetForm />
      </div>
   );
};

export default Feed;
