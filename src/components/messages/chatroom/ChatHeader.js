import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { HiArrowLeft } from 'react-icons/hi';
import { BsInfoCircle } from 'react-icons/bs';
import { clearSelectedChat } from '../../../actions/chats';
import '../../../styles/design/chatHeader.css';

const ChatHeader = ({
   participants,
   withBackIcon,
   clearSelectedChat,
   onInfoButtonClick,
}) => {
   const [singleUser, setSingleUser] = useState(null);

   useEffect(() => {
      if (participants.length === 1) {
         setSingleUser(participants[0]);
      } else {
         setSingleUser(null);
      }
   }, [participants]);

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
   const handleBackButtonClick = () => {
      clearSelectedChat();
   };
   return (
      <div className="chat-header">
         {withBackIcon && (
            <div className="left-icon">
               <button className="icon-button" onClick={handleBackButtonClick}>
                  <HiArrowLeft />
               </button>
            </div>
         )}

         <div className="middle-area">
            {singleUser ? (
               <Fragment>
                  <div className="avatar">
                     <Link to={`/profile/${singleUser.screen_name}`}>
                        <Avatar
                           src={singleUser.avatar}
                           style={{ height: '30px', width: '30px' }}
                        />
                     </Link>
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
                  <div className="group-names">
                     <h2>{renderMultipleNames(participants)}</h2>
                  </div>
               </Fragment>
            )}
         </div>
         <div className="right-icon">
            <button className="icon-button" onClick={onInfoButtonClick}>
               <BsInfoCircle />
            </button>
         </div>
      </div>
   );
};

ChatHeader.propTypes = {
   backIcon: PropTypes.bool,
   clearSelectedChat: PropTypes.func.isRequired,
};

export default connect(null, { clearSelectedChat })(ChatHeader);
