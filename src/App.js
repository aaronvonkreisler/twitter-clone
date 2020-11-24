import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { useMediaQuery } from '@material-ui/core';
import SmallSidebar from './components/sidebar/SmallSidebar';
import './App.css';

const App = () => {
   const largeDevice = useMediaQuery('(min-width:1450px)');
   return (
      <div className="app">{largeDevice ? <Sidebar /> : <SmallSidebar />}</div>
   );
};

export default App;
