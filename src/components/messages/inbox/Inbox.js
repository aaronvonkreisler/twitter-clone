import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiMail } from 'react-icons/fi';
import Header from '../../layout/Header';
import Searchbar from '../../layout/Searchbar';
import Spinner from '../../layout/Spinner';
import InboxItem from './InboxItem';
import '../../../styles/design/inbox.css';
import { selectChat } from '../../../actions/chats';

const Inbox = ({ setModalOpen, inbox, fetching, authId, selectChat }) => {
   const iconStyle = {
      fill: 'none',
   };

   const onInboxItemClick = (chat) => {
      selectChat(chat);
   };
   return (
      <React.Fragment>
         <Header
            text="Messages"
            rightIcon
            IconComponent={FiMail}
            overrideStyle={iconStyle}
            onRightIconClick={() => setModalOpen(true)}
         />
         <div className="inbox-search">
            <Searchbar placeholder="Search for people and groups" />
         </div>
         {fetching && <Spinner />}
         {!fetching &&
            inbox.length > 0 &&
            inbox.map((item) => (
               <InboxItem
                  chat={item}
                  key={item._id}
                  authId={authId}
                  onClick={onInboxItemClick}
               />
            ))}
      </React.Fragment>
   );
};

Inbox.propTypes = {
   setModalOpen: PropTypes.func.isRequired,
   inbox: PropTypes.array.isRequired,
   fetching: PropTypes.bool.isRequired,
};

export default connect(null, { selectChat })(Inbox);
