import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import MessageItem from './MessageItem';
import '../../../styles/design/chatBody.css';

const ChatBody = ({ messages, fetchingMessages, authId }) => {
   return (
      <div className="chat-body">
         {fetchingMessages && <Spinner />}
         {!fetchingMessages && messages.length > 0 && (
            <div className="chat-container">
               {messages.map((message) => (
                  <MessageItem
                     key={message._id}
                     message={message}
                     authId={authId}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

ChatBody.propTypes = {
   fetchingMessages: PropTypes.bool,
   messages: PropTypes.array,
};

export default ChatBody;
