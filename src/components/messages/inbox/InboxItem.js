import React, { useState, useEffect, memo } from 'react';

import Moment from 'react-moment';
import { Avatar } from '@material-ui/core';

import { AvatarGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';
import '../../../styles/design/inboxItem.css';

const InboxItem = memo(function InboxItem({ chat, authId, onClick }) {
   const { users, updatedAt, lastMessage } = chat;
   const [multipleUsers, setMultipleUsers] = useState(false);
   const [otherUsers, setOtherUsers] = useState(null);

   useEffect(() => {
      const otherUsers = users.filter((user) => user._id !== authId);
      setOtherUsers(otherUsers);
      setMultipleUsers(otherUsers.length > 1);
   }, [users, authId]);

   const renderAvatars = () => {
      if (multipleUsers && otherUsers !== null) {
         return (
            <AvatarGroup max={2}>
               {otherUsers.map((user) => (
                  <Avatar src={user.avatar} key={user._id} />
               ))}
            </AvatarGroup>
         );
      }
      if (!multipleUsers && otherUsers !== null) {
         return (
            <Avatar
               src={otherUsers[0].avatar}
               style={{ height: '49px', width: '49px' }}
            />
         );
      }
   };

   const renderMultipleNames = (arrayOfUsers) => {
      const names = arrayOfUsers.map((user, index, arr) => {
         if (arr.length - 1 === index) {
            return `${user.name}`;
         } else {
            return `${user.name}, `;
         }
      });

      return names;
   };
   return (
      otherUsers !== null && (
         <div className="inbox-item" onClick={() => onClick(chat)}>
            <div className="profile-picture">{renderAvatars()}</div>
            <div className="details">
               <div className="top">
                  <span className="names-display">
                     <span className="name">
                        {otherUsers.length === 1
                           ? otherUsers[0].name
                           : renderMultipleNames(otherUsers)}
                     </span>
                     <span className="screen-name">
                        {otherUsers.length === 1
                           ? `@${otherUsers[0].screen_name}`
                           : ''}
                     </span>
                  </span>
                  <div className="date">
                     <Moment format="MMM D">{updatedAt}</Moment>
                  </div>
               </div>
               <div className="last-message">
                  <span className="message-text">
                     {lastMessage ? lastMessage.content : ''}
                  </span>
               </div>
            </div>
         </div>
      )
   );
});

InboxItem.propTypes = {
   chat: PropTypes.object.isRequired,
};

export default InboxItem;
