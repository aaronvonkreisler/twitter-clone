import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { FiMail } from 'react-icons/fi';
import Header from '../../layout/Header';
import Searchbar from '../../layout/Searchbar';
import Spinner from '../../layout/Spinner';
import InboxItem from './InboxItem';
import '../../../styles/design/inbox.css';
import { selectChat, clearSelectedChat } from '../../../actions/chats';
import { openMessageModal } from '../../../actions/modal';

const Inbox = memo(function Inbox({
   openMessageModal,
   inbox,
   fetching,
   authId,
   selectChat,
   clearSelectedChat,
}) {
   const [searchQuery, setSearchQuery] = useState('');
   const [results, setResults] = useState(inbox);

   const iconStyle = {
      fill: 'none',
   };

   const onInboxItemClick = (chat) => {
      selectChat(chat);
   };

   const handleSearch = (e) => {
      setSearchQuery(e.target.value);
   };

   useEffect(() => {
      const filteredSearch = inbox.filter((chat) => {
         const searchTerm = searchQuery.toLowerCase();
         return (
            chat.users.filter((user) =>
               user.name.toLowerCase().includes(searchTerm)
            ).length > 0
         );
      });
      setResults(filteredSearch);
   }, [inbox, searchQuery]);
   return (
      <React.Fragment>
         <Header
            text="Messages"
            rightIcon
            IconComponent={FiMail}
            overrideStyle={iconStyle}
            onRightIconClick={() => openMessageModal()}
         />
         <div className="inbox-search">
            <Searchbar
               placeholder="Search for people and groups"
               value={searchQuery}
               onChange={handleSearch}
            />
         </div>
         {fetching && <Spinner />}
         {!fetching &&
            results.length > 0 &&
            results.map((item) => (
               <InboxItem
                  chat={item}
                  key={item._id}
                  authId={authId}
                  onClick={onInboxItemClick}
               />
            ))}
         <div
            className="empty-placeholder"
            onClick={() => clearSelectedChat()}
         />
      </React.Fragment>
   );
});

Inbox.propTypes = {
   openMessageModal: PropTypes.func.isRequired,
   inbox: PropTypes.array.isRequired,
   fetching: PropTypes.bool.isRequired,
   clearSelectedChat: PropTypes.func.isRequired,
};

export default connect(null, {
   selectChat,
   clearSelectedChat,
   openMessageModal,
})(Inbox);
