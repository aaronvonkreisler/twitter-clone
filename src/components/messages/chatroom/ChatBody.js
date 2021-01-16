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
               {messages.map((message, index, messages) => {
                  const nextMessage = messages[index + 1];
                  const lastMessage = messages[index - 1];
                  return (
                     <MessageItem
                        key={message._id}
                        message={message}
                        authId={authId}
                        nextMessage={nextMessage}
                        lastMessage={lastMessage}
                     />
                  );
               })}
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
