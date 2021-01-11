import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import '../../styles/design/noTweets.css';

const NoTweets = (props) => {
   let history = useHistory();

   const handleClick = () => {
      history.push('/connect');
   };
   return (
      <div className="noTweets__root">
         <div className="noTweets__wrapper">
            <div className="flex flex-row justify-center welcomeMessage">
               <span>Welcome to Tweeter!</span>
            </div>
            <div className="flex flex-row justify-center introMessage">
               <span>
                  This is the best place to see what's happening in your world.
                  Find some people and topics to follow now.
               </span>
            </div>
            <div className="flex flex-row justify-center actionArea">
               <Button className="tweetForm__button" onClick={handleClick}>
                  Let's go!
               </Button>
            </div>
         </div>
      </div>
   );
};

export default NoTweets;
