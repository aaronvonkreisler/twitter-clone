import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
const ChatRoom = ({ chat, authId }) => {
   const [participants, setParticipants] = useState([]);

   useEffect(() => {
      const users = chat.users.filter((user) => user._id !== authId);
      setParticipants(users);
   }, [authId, chat.users]);

   return (
      <Fragment>
         {participants.length !== 0 && (
            <ChatHeader users={participants} backIcon={true} />
         )}
      </Fragment>
   );
};

ChatRoom.propTypes = {
   chat: PropTypes.object.isRequired,
};

export default ChatRoom;
