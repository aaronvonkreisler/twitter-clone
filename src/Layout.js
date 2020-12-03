import React from 'react';
import SidebarUtil from './components/sidebar/SidebarUtil';
import Feed from './components/feed/Feed';
import Widgets from './components/widgets/Widgets';
import './App.css';

const Layout = () => {
   return (
      <div className="app">
         <SidebarUtil />
         <Feed />
         <Widgets />
      </div>
   );
};

export default Layout;
