import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFormWrapper from './form/ChatFormWrapper';
import ConversationInfo from './ConversationInfo';

const ChatRoom = ({
   chat,
   authId,
   withBackIcon,
   messages,
   fetchingMessages,
}) => {
   const [participants, setParticipants] = useState([]);
   const [renderChatInfo, setRenderChatInfo] = useState(false);

   useEffect(() => {
      const users = chat.users.filter((user) => user._id !== authId);
      setParticipants(users);
   }, [authId, chat.users]);

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
               <ChatFormWrapper chatId={chat._id} />
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
