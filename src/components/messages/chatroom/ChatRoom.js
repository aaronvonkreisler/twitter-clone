import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFormWrapper from './form/ChatFormWrapper';
import ConversationInfo from './ConversationInfo';
import { socket } from '../../../services/socketService';

const ChatRoom = ({
   chat,
   authId,
   withBackIcon,
   messages,
   fetchingMessages,
}) => {
   const [participants, setParticipants] = useState([]);
   const [renderChatInfo, setRenderChatInfo] = useState(false);
   const [isTyping, setIsTyping] = useState(false);
   let lastTypingTime;

   useEffect(() => {
      const users = chat.users.filter((user) => user._id !== authId);
      setParticipants(users);
   }, [authId, chat.users]);

   useEffect(() => {
      console.log('joining chat room');
      socket.emit('join room', chat._id);

      return () => {
         console.log('Leaving chat room');
      };
   }, [chat]);

   useEffect(() => {
      socket.on(
         'typing',
         () => (document.getElementById('typing-dots').style.display = 'block')
      );
      socket.on(
         'stop typing',
         () => (document.getElementById('typing-dots').style.display = 'none')
      );
   }, []);

   const updateTypingIndicator = () => {
      if (!isTyping) {
         setIsTyping(true);
      }
      socket.emit('typing', chat._id);
      lastTypingTime = new Date().getTime();
      const timerLength = 3000;

      setTimeout(() => {
         const timeNow = new Date().getTime();
         const timeDiff = timeNow - lastTypingTime;

         if (timeDiff >= timerLength) {
            socket.emit('stop typing', chat._id);
            setIsTyping(false);
         }
      }, timerLength);
   };

   const endTypingIndicatorOnSend = () => {
      socket.emit('stop typing');
      setIsTyping(false);
   };

   const onInfoButtonClick = () => {
      setRenderChatInfo(true);
   };

   return (
      <Fragment>
         {participants.length !== 0 && !renderChatInfo && (
            <Fragment>
               <ChatHeader
                  participants={participants}
                  withBackIcon={withBackIcon}
                  onInfoButtonClick={onInfoButtonClick}
               />
               <ChatBody
                  messages={messages}
                  fetchingMessages={fetchingMessages}
                  authId={authId}
               />
               <ChatFormWrapper
                  chatId={chat._id}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  updateTypingIndicator={updateTypingIndicator}
                  endTypingIndicatorOnSend={endTypingIndicatorOnSend}
               />
            </Fragment>
         )}
         {renderChatInfo && (
            <ConversationInfo
               setRenderChatInfo={setRenderChatInfo}
               participants={participants}
            />
         )}
      </Fragment>
   );
};

ChatRoom.propTypes = {
   chat: PropTypes.object.isRequired,
};

export default ChatRoom;
