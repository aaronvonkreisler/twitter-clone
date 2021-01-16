import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/design/chatBody.css';

const MessageItem = ({ message, authId, nextMessage, lastMessage }) => {
   const isMine = message.sender._id === authId;
   let messageOwnerClass = isMine ? 'mine' : 'theirs';
   const senderName = message.sender.name;

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
         </div>
      </div>
   );
};

MessageItem.propTypes = {
   message: PropTypes.object.isRequired,
   authId: PropTypes.string.isRequired,
};

export default MessageItem;
