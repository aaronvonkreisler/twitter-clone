import React from 'react';

import Feed from './components/feed/Feed';
import Widgets from './components/widgets/Widgets';
import './App.css';

const Layout = () => {
   return (
      <div className="app">
         <Feed />
         <Widgets />
      </div>
   );
};

export default Layout;
