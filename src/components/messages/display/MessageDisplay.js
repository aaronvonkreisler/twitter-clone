import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearSelectedChat } from '../../../actions/chats';
import PropTypes from 'prop-types';
import NoSelection from './NoSelection';
import ChatRoom from '../chatroom/ChatRoom';
import '../../../styles/design/messageDisplay.css';

const MessageDisplay = ({
   setModalOpen,
   selectedChat,
   auth: { user },
   withBackIcon,
   clearSelectedChat,
}) => {
   useEffect(() => {
      if (selectedChat === null) {
         return <Redirect to="/messages" />;
      }
   }, [selectedChat]);
   return (
      <Fragment>
         {user !== null && (
            <div className="message-display">
               {selectedChat === null ? (
                  <div className="no-selection-view">
                     <NoSelection setModalOpen={setModalOpen} />
                  </div>
               ) : (
                  <div className="chat-room-display">
                     <ChatRoom
                        chat={selectedChat}
                        authId={user._id}
                        withBackIcon={withBackIcon}
                     />
                  </div>
               )}
            </div>
         )}
      </Fragment>
   );
};

MessageDisplay.propTypes = {
   authId: PropTypes.string,
   selectedChat: PropTypes.object,
};

const mapStateToProps = (state) => ({
   selectedChat: state.chats.selectedChat,
   auth: state.auth,
});

export default connect(mapStateToProps, { clearSelectedChat })(MessageDisplay);
