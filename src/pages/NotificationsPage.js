import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import TabsDisplay from '../components/layout/TabsDisplay';
import { getNotifications } from '../actions/notifications';
import AllNotifications from '../components/notifications/AllNotifications';

const NotificationsPage = ({
   getNotifications,
   notifications: { fetching, notifications },
}) => {
   const tabsRenderProps = [
      {
         label: 'All',
         component: (
            <AllNotifications
               fetching={fetching}
               notifications={notifications}
            />
         ),
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

const mapStateToProps = (state) => ({
   notifications: state.notifications,
});

export default connect(mapStateToProps, { getNotifications })(
   NotificationsPage
);
