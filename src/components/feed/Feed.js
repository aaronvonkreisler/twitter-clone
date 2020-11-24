import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import Header from './Header';
import './styles/Feed.css';

const Feed = () => {
   const largeDevice = useMediaQuery('(min-width:1440px)');
   return (
      <div className={largeDevice ? 'feed' : 'feed-small-screen'}>
         <Header />
         <h2> asdf;lkjasdf;lkj ;kjasdf;lkjasdf;lkjasf ;lkjasdf;lkjasdf;lkja</h2>
      </div>
   );
};

export default Feed;
