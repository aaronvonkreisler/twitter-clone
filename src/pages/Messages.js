import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   getUsersChats,
   startNewChat,
   clearSelectedChat,
} from '../actions/chats';
import { openMessageModal } from '../actions/modal';
import { getMessagesForChat } from '../actions/messages';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Inbox from '../components/messages/inbox/Inbox';
import MessageDisplay from '../components/messages/display/MessageDisplay';
import NewMessageModal from '../components/messages/NewMessageModal';

import '../styles/design/messagePage.css';

const Messages = ({
   getUsersChats,
   startNewChat,
   clearSelectedChat,
   getMessagesForChat,
   openMessageModal,
   chats,
   auth: { user },
}) => {
   const fullScreen = useMediaQuery('(min-width:1005px)');

   useEffect(() => {
      document.title = 'Messages / Tweeter';
      getUsersChats();
   }, [getUsersChats]);

   useEffect(() => {
      if (chats.selectedChat !== null) {
         getMessagesForChat(chats.selectedChat._id);
      }
   }, [chats.selectedChat, getMessagesForChat]);

   useEffect(() => {
      return () => {
         clearSelectedChat();
      };
   }, [clearSelectedChat]);

   return (
      <Fragment>
         <NewMessageModal startNewChat={startNewChat} />

         <div className="message-page">
            {user !== null && fullScreen && (
               <Fragment>
                  <section className="message-inbox">
                     <Inbox
                        inbox={chats.inbox}
                        fetching={chats.fetchingInbox}
                        authId={user._id}
                     />
                  </section>
                  <section className="message-view">
                     <MessageDisplay openMessageModal={openMessageModal} />
                  </section>
               </Fragment>
            )}
            {user !== null &&
               !fullScreen &&
               (chats.selectedChat === null ? (
                  <section className="message-inbox">
                     <Inbox
                        inbox={chats.inbox}
                        fetching={chats.fetchingInbox}
                        authId={user._id}
                     />
                  </section>
               ) : (
                  <section className="message-room">
                     <MessageDisplay
                        openMessageModal={openMessageModal}
                        withBackIcon
                     />
                  </section>
               ))}
         </div>
      </Fragment>
   );
};

Messages.propTypes = {
   getUsersChats: PropTypes.func.isRequired,
   chats: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   chats: state.chats,
   auth: state.auth,
});
export default connect(mapStateToProps, {
   getUsersChats,
   startNewChat,
   clearSelectedChat,
   getMessagesForChat,
   openMessageModal,
})(Messages);
