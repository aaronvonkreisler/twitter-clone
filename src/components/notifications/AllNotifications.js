import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import NotificationItem from './NotificationItem';
import EmptyDisplay from '../layout/EmptyDisplay';

import '../../styles/design/notifications.css';

const AllNotifications = ({ notifications, fetching }) => {
   return (
      <section className="all-notifications" aria-label="Notifications">
         {fetching && <Spinner />}
         {!fetching && notifications.length > 0
            ? notifications.map((notification) => (
                 <NotificationItem
                    notification={notification}
                    key={notification._id}
                 />
              ))
            : null}
      </section>
   );
};

AllNotifications.propTypes = {
   notifications: PropTypes.array.isRequired,
   fetching: PropTypes.bool.isRequired,
};

export default AllNotifications;
