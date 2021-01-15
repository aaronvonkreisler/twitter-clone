import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/design/chatBody.css';

const MessageItem = ({ message, authId }) => {
   const messageOwnerClass = message.sender._id === authId ? 'mine' : 'theirs';
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

MessageItem.propTypes = {};

export default MessageItem;
