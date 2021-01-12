import React, { Fragment } from 'react';
import { connect } from 'react-redux';

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
   selectedChat: state.chats.selectedChat,
   auth: state.auth,
});

export default connect(mapStateToProps, { clearSelectedChat })(MessageDisplay);
