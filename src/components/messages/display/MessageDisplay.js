import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoSelection from './NoSelection';
import ChatRoom from '../chatroom/ChatRoom';
import '../../../styles/design/messageDisplay.css';

const MessageDisplay = ({ setModalOpen, selectedChat, authId }) => {
   let params = useParams();

   return (
      <div className="message-display">
         {selectedChat === null ? (
            <div className="no-selection-view">
               <NoSelection setModalOpen={setModalOpen} />
            </div>
         ) : (
            <div className="chat-room-display">
               <ChatRoom chat={selectedChat} authId={authId} />
            </div>
         )}
      </div>
   );
};

MessageDisplay.propTypes = {
   authId: PropTypes.string.isRequired,
   selectedChat: PropTypes.object,
};

const mapStateToProps = (state) => ({
   selectedChat: state.chats.selectedChat,
});

export default connect(mapStateToProps)(MessageDisplay);
