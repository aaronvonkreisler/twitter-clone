import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiMail } from 'react-icons/fi';
import Header from '../../layout/Header';
import Searchbar from '../../layout/Searchbar';
import Spinner from '../../layout/Spinner';
import InboxItem from './InboxItem';
import '../../../styles/design/inbox.css';
import { selectChat, clearSelectedChat } from '../../../actions/chats';

const Inbox = memo(function Inbox({
   setModalOpen,
   inbox,
   fetching,
   authId,
   selectChat,
   clearSelectedChat,
}) {
   const [searchQuery, setSearchQuery] = useState('');
   const iconStyle = {
      fill: 'none',
   };

   let history = useHistory();

   const onInboxItemClick = (chat) => {
      selectChat(chat);
      history.push(`/messages/${chat._id}`);
   };

   const handleSearch = (e) => {
      setSearchQuery(e.target.value);
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
            <Searchbar
               placeholder="Search for people and groups"
               value={searchQuery}
               onChange={handleSearch}
            />
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
         <div
            className="empty-placeholder"
            onClick={() => clearSelectedChat()}
         />
      </React.Fragment>
   );
});

Inbox.propTypes = {
   setModalOpen: PropTypes.func.isRequired,
   inbox: PropTypes.array.isRequired,
   fetching: PropTypes.bool.isRequired,
   clearSelectedChat: PropTypes.func.isRequired,
};

export default connect(null, { selectChat, clearSelectedChat })(Inbox);
