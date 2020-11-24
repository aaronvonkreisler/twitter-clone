import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import LargeSidebar from './LargeSidebar';
import SmallSidebar from './SmallSidebar';
import './styles/Sidebar.css';
import './styles/SidebarItems.css';

const SidebarUtil = () => {
   const largeDevice = useMediaQuery('(min-width:1440px)');
   return <div>{largeDevice ? <LargeSidebar /> : <SmallSidebar />}</div>;
};

export default SidebarUtil;
