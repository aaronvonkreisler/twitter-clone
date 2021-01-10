import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../layout/Header';
import SmallUserPreview from '../../layout/SmallUserPreview';

const ConversationInfo = ({ setRenderChatInfo, participants }) => {
   let history = useHistory();
   const handleBackButton = () => {
      setRenderChatInfo(false);
   };

   const handleUserClick = (user) => {
      history.push(`/profile/${user.screen_name}`);
   };
   return (
      <div className="conversation-info">
         <Header
            leftIcon
            text="Conversation info"
            overrideBackButton
            overrideFunc={handleBackButton}
         />
         {participants.map((participant) => (
            <SmallUserPreview
               user={participant}
               key={participant._id}
               bottomBorder
               onClick={handleUserClick}
            />
         ))}
      </div>
   );
};

ConversationInfo.propTypes = {};

export default ConversationInfo;
