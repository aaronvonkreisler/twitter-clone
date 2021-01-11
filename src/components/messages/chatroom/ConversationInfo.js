import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../layout/Header';
import SmallUserPreview from '../../layout/SmallUserPreview';
import '../../../styles/design/conversationInfo.css';

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
         <div className="leave-chat">
            <div className="border" />
            <button className="leave-button" onClick={() => alert('TODO')}>
               <span className="text">Leave conversation</span>
            </button>
         </div>
      </div>
   );
};

ConversationInfo.propTypes = {
   setRenderChatInfo: PropTypes.func.isRequired,
   participants: PropTypes.array.isRequired,
};

export default ConversationInfo;
