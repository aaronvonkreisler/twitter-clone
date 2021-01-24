import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { BsCheck } from 'react-icons/bs';

import '../../../styles/design/chatBody.css';

const MessageItem = ({ message, authId, nextMessage, lastMessage }) => {
   const isMine = message.sender._id === authId;
   let messageOwnerClass = isMine ? 'mine' : 'theirs';
   let emptyTextClass =
      message.content && message.content.length > 0 ? '' : 'no-text';
   const sender = message.sender;

   const currentSenderId = sender._id;
   const nextSenderId =
      nextMessage !== null && nextMessage !== undefined
         ? nextMessage.sender._id
         : '';

   const lastSenderId =
      lastMessage !== null && lastMessage !== undefined
         ? lastMessage.sender._id
         : '';
   const isFirst = lastSenderId !== currentSenderId;
   const isLast = nextSenderId !== currentSenderId;

   if (isFirst) {
      messageOwnerClass += ' first';
   }

   if (isLast) {
      messageOwnerClass += ' last';
   }

   const wasSentToday = (someDate) => {
      const today = new Date();
      const date = new Date(someDate);
      return (
         date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
      );
   };

   const isToday = wasSentToday(message.createdAt);

   const timeFormat = isToday ? 'LT' : 'MMM DD, YYYY, LT';

   return (
      <div className={`message ${messageOwnerClass}`}>
         {!isMine && (
            <div className="avatar-container">
               {isLast && (
                  <Avatar
                     src={message.sender.avatar}
                     style={{
                        height: '100%',
                        width: '100%',
                        verticalAlign: 'bottom',
                     }}
                  />
               )}
            </div>
         )}

         <div className="message-container">
            {message.image && (
               <div className={`image-container ${emptyTextClass}`}>
                  <img src={message.image} alt="" />
               </div>
            )}
            {message.content && (
               <div className="message-body">
                  <span className="text">{message.content}</span>
               </div>
            )}
            {isLast && (
               <div className="time-stamp">
                  <Moment className="text" format={timeFormat}>
                     {message.createdAt}
                  </Moment>
                  {isMine && (
                     <span className="sent-icon">
                        <BsCheck />
                     </span>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

MessageItem.propTypes = {
   message: PropTypes.object.isRequired,
   authId: PropTypes.string.isRequired,
};

export default MessageItem;
