import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import '../../styles/design/notifications.css';

const IconNotification = ({ notification }) => {
   const { notificationType, sender, entityId, receiver, tweet } = notification;
   const favorite = notificationType === 'like';
   const retweet = notificationType === 'retweet';
   const messageText = retweet ? ' Retweeted your Tweet' : ' liked your Tweet';
   let history = useHistory();

   const handleClick = (e) => {
      if (e.target.tagName !== 'A') {
         history.push(`/${receiver.screen_name}/status/${entityId}`);
      }
   };
   return (
      <div className="notification-container">
         <article className="notification" onClick={handleClick}>
            <div className="left-col">
               <div className="icon">
                  {favorite && <BsHeartFill className="favorite" />}
                  {retweet && <AiOutlineRetweet className="retweet" />}
               </div>
            </div>
            <div className="right-col">
               <div className="image-container">
                  <Avatar
                     src={sender.avatar}
                     alt={sender.name}
                     style={{ height: '30px', width: '30px' }}
                  />
               </div>
               <div className="text-container">
                  <span className="message-text">
                     <Link
                        to={`/profile/${sender.screen_name}`}
                        className="name"
                     >
                        {sender.name}{' '}
                     </Link>
                     <span className="text">{messageText}</span>
                  </span>
               </div>
               <div className="content-container">
                  <span className="text">{tweet.content}</span>
               </div>
            </div>
         </article>
      </div>
   );
};

IconNotification.propTypes = {
   notification: PropTypes.object.isRequired,
   like: PropTypes.bool,
   retweet: PropTypes.bool,
};

export default IconNotification;
