import React from 'react';
import PropTypes from 'prop-types';
import IconNotification from './IconNotification';

const NotificationItem = ({ notification }) => {
   const { notificationType } = notification;

   return (
      <React.Fragment>
         {notificationType === 'like' || notificationType === 'retweet' ? (
            <IconNotification notification={notification} />
         ) : (
            <div>{notification.sender.name}</div>
         )}
      </React.Fragment>
   );
};

NotificationItem.propTypes = {
   notification: PropTypes.object.isRequired,
};

export default NotificationItem;
