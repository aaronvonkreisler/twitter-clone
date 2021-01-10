import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsersChats, startNewChat } from '../actions/chats';
import Inbox from '../components/messages/inbox/Inbox';
import MessageDisplay from '../components/messages/display/MessageDisplay';
import NewMessageModal from '../components/messages/NewMessageModal';
import '../styles/design/messagePage.css';

const Messages = ({ getUsersChats, startNewChat, chats, auth: { user } }) => {
   const [modalOpen, setModalOpen] = useState(false);
   useEffect(() => {
      document.title = 'Messages / Tweeter';
      getUsersChats();
   }, [getUsersChats]);
   return (
      <Fragment>
         <NewMessageModal
            open={modalOpen}
            setOpen={setModalOpen}
            startNewChat={startNewChat}
         />
         <div className="message-page">
            {user !== null && (
               <Fragment>
                  <section className="message-inbox">
                     <Inbox
                        setModalOpen={setModalOpen}
                        inbox={chats.inbox}
                        fetching={chats.fetchingInbox}
                        authId={user._id}
                     />
                  </section>
                  <section className="message-view">
                     <MessageDisplay
                        setModalOpen={setModalOpen}
                        authId={user._id}
                     />
                  </section>
               </Fragment>
            )}
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
export default connect(mapStateToProps, { getUsersChats, startNewChat })(
   Messages
);
