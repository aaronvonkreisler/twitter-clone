import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import '../../../styles/design/chatBody.css';

const MessageItem = ({ message, authId, nextMessage, lastMessage }) => {
   const isMine = message.sender._id === authId;
   let messageOwnerClass = isMine ? 'mine' : 'theirs';

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
               <div className="image-container">
                  <img src={message.image} alt="" />
               </div>
            )}
            <div className="message-body">
               {message.content && (
                  <span className="text">{message.content}</span>
               )}
            </div>
            {isLast && (
               <div className="time-stamp">
                  <Moment className="text" fromNow>
                     {message.createdAt}
                  </Moment>
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
