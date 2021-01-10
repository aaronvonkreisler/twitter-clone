import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatHeader from './ChatHeader';
import ConversationInfo from './ConversationInfo';

const ChatRoom = ({ chat, authId, withBackIcon }) => {
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
            <ChatHeader
               participants={participants}
               withBackIcon={withBackIcon}
               onInfoButtonClick={onInfoButtonClick}
            />
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
