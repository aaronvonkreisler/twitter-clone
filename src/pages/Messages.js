import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Inbox from '../components/messages/Inbox';
import MessageDisplay from '../components/messages/MessageDisplay';
import NewMessageModal from '../components/messages/NewMessageModal';
import '../styles/design/messagePage.css';

const Messages = (props) => {
   const [modalOpen, setModalOpen] = useState(false);
   useEffect(() => {
      document.title = 'Messages / Tweeter';
   });
   return (
      <Fragment>
         <NewMessageModal open={modalOpen} setOpen={setModalOpen} />
         <div className="message-page">
            <div className="message-inbox">
               <Inbox setModalOpen={setModalOpen} />
            </div>
            <div className="message-view">
               <MessageDisplay setModalOpen={setModalOpen} />
            </div>
         </div>
      </Fragment>
   );
};

Messages.propTypes = {};

export default Messages;
