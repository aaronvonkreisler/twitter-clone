import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoSelection from './NoSelection';
import ChatRoom from '../chatroom/ChatRoom';
import '../../../styles/design/messageDisplay.css';

const MessageDisplay = ({
   setModalOpen,
   chats: { selectedChat, messages, fetchingMessages },
   auth: { user },
   withBackIcon,
}) => {
   return (
      <Fragment>
         {user !== null && (
            <div className="message-display">
               {selectedChat === null ? (
                  <div className="no-selection-view">
                     <NoSelection setModalOpen={setModalOpen} />
                  </div>
               ) : (
                  <Fragment>
                     <ChatRoom
                        chat={selectedChat}
                        authId={user._id}
                        withBackIcon={withBackIcon}
                        messages={messages}
                        fetchingMessages={fetchingMessages}
                     />
                  </Fragment>
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
   auth: state.auth,
   chats: state.chats,
});

export default connect(mapStateToProps)(MessageDisplay);
