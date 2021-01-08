import React from 'react';
import PropTypes from 'prop-types';
import { BsChat } from 'react-icons/bs';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import '../../styles/design/toolbar.css';

function Toolbar({
   onCommentClick,
   onRetweetClick,
   onFavoriteClick,
   onToolbarMenuClick,
   isLiked,
   isRetweeted,
   favorites,
   replies,
   retweets,
   withNumbers,
}) {
   return (
      <ul className="toolbar-wrapper">
         <li className="toolbar-item hover-blue">
            <button className="icon-button" onClick={onCommentClick}>
               <BsChat />
            </button>
            {withNumbers && replies.length > 0 && (
               <span className="text">{replies.length}</span>
            )}
         </li>
         <li className="toolbar-item hover-green">
            <button className="icon-button retweet" onClick={onRetweetClick}>
               <AiOutlineRetweet className={isRetweeted ? 'retweeted' : ''} />
            </button>
            {withNumbers && retweets.length > 0 && (
               <span className="text">{retweets.length}</span>
            )}
         </li>
         <li className="toolbar-item hover-red">
            <button className="icon-button heart" onClick={onFavoriteClick}>
               {isLiked ? <BsHeartFill className="liked" /> : <BsHeart />}
            </button>
            {withNumbers && favorites.length > 0 && (
               <span className="text">{favorites.length}</span>
            )}
         </li>
         <li className="toolbar-item hover-blue">
            <button className="icon-button" onClick={onToolbarMenuClick}>
               <BsUpload />
            </button>
         </li>
      </ul>
   );
}

Toolbar.defaultProps = {
   withNumbers: true,
};

Toolbar.propTyps = {
   withNumbers: PropTypes.bool,
   isLiked: PropTypes.bool.isRequired,
   isRetweeted: PropTypes.bool.isRequired,
   onToolbarMenuClick: PropTypes.func.isRequired,
   onFavoriteClick: PropTypes.func.isRequired,
   onCommentClick: PropTypes.func.isRequired,
   onRetweetClick: PropTypes.func.isRequired,
};

export default Toolbar;
