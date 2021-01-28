import React from 'react';
import PropTypes from 'prop-types';
import IconNotification from './IconNotification';
import Tweet from '../tweets/Tweet';

const NotificationItem = ({ notification }) => {
   const { notificationType, tweet, sender, receiver } = notification;

   return (
      <React.Fragment>
         {notificationType === 'like' || notificationType === 'retweet' ? (
            <IconNotification notification={notification} />
         ) : (
            <Tweet
               tweet={tweet}
               user={sender}
               authId={receiver._id}
               replyingTo
               replyingToUserName={receiver.screen_name}
               displayActions={false}
            />
         )}
      </React.Fragment>
   );
};

NotificationItem.propTypes = {
   notification: PropTypes.object.isRequired,
};

export default NotificationItem;
