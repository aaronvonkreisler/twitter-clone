import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import TabsDisplay from '../components/layout/TabsDisplay';
import { getNotifications } from '../actions/notifications';

const NotificationsPage = ({ getNotifications }) => {
   const tabsRenderProps = [
      {
         label: 'All',
         component: null,
      },
      {
         label: 'Mentions',
         component: null,
      },
   ];

   useEffect(() => {
      getNotifications();
   }, [getNotifications]);
   return (
      <div className="notification-page">
         <Header
            rightIcon
            text="Notifications"
            withNoIcon
            borderBottom={false}
         />
         <TabsDisplay renderProps={tabsRenderProps} />
      </div>
   );
};

export default connect(null, { getNotifications })(NotificationsPage);
