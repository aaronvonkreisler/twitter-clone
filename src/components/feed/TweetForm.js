import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './styles/TweetForm.css';

const TweetForm = (props) => {
   return (
      <div className="tweetForm">
         <form>
            <div className="tweetForm__input">
               <Avatar>A</Avatar>
               <input type="text" placeholder="What's happening?" />
            </div>
            <Button className="tweetForm__button">Tweet</Button>
         </form>
      </div>
   );
};

TweetForm.propTypes = {};

export default TweetForm;
