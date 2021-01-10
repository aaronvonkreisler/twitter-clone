import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { HiArrowLeft } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../../styles/design/chatHeader.css';

const ChatHeader = ({ users, backIcon }) => {
   const [singleUser, setSingleUser] = useState(null);

   useEffect(() => {
      if (users.length === 1) {
         setSingleUser(users[0]);
      } else {
         setSingleUser(null);
      }
   }, [users]);

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
      <div className="chat-header">
         {backIcon && (
            <div className="left-icon">
               <button className="icon-button">
                  <HiArrowLeft />
               </button>
            </div>
         )}

         <div className="middle-area">
            {singleUser ? (
               <Fragment>
                  <div className="avatar">
                     <Avatar
                        src={singleUser.avatar}
                        style={{ height: '30px', width: '30px' }}
                     />
                  </div>
                  <div className="single-name">
                     <div className="name">
                        <h2>{singleUser.name}</h2>
                     </div>
                     <div className="screen-name">
                        <span>@{singleUser.screen_name}</span>
                     </div>
                  </div>
               </Fragment>
            ) : (
               <Fragment>
                  <div className="avatar" />
                  <div className="group-names">
                     <h2>{renderMultipleNames(users)}</h2>
                  </div>
               </Fragment>
            )}
         </div>
         <div className="right-icon">
            <button className="icon-button">
               <AiOutlineInfoCircle />
            </button>
         </div>
      </div>
   );
};

ChatHeader.propTypes = {
   backIcon: PropTypes.bool.isRequired,
};

export default ChatHeader;
