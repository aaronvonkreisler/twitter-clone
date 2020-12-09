import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { GrFavorite } from 'react-icons/gr';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';

import './styles/Tweet.css';

const Tweet = ({
   displayName,
   username,
   verified,
   timestamp,
   content,
   avatar,
}) => {
   return (
      <div className="tweet">
         <div className="tweet__avatar">
            <Avatar>A</Avatar>
         </div>
         <div className="tweet__body">
            <div className="tweet__header">
               <div className="tweet__headerText">
                  <h3>
                     Aaron von Kreisler{' '}
                     <span className="tweet__header--special">
                        <GoVerified className="tweet__verified--badge" />
                        @__aavk
                     </span>
                  </h3>
               </div>
               <div className="tweet__headerDescription">
                  <p>I challenge you to build a twitter clone with react</p>
               </div>
            </div>
            <img
               src="https://media.giphy.com/media/cHxTSFB8BtHWw/giphy.gif"
               alt=""
            />
            <div className="tweet__footer">
               <BsChat />
               <AiOutlineRetweet />
               <GrFavorite />
               <BsUpload />
            </div>
         </div>
      </div>
   );
};

Tweet.propTypes = {};

export default Tweet;
