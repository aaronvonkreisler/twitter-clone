import React from 'react';
import Header from '../components/layout/Header';
import TabsDisplay from '../components/layout/TabsDisplay';
const NotificationsPage = () => {
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

export default NotificationsPage;
