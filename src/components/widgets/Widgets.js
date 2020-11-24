import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import './styles/Widgets.css';

const Widgets = () => {
   const largeDevice = useMediaQuery('(min-width:1440px)');
   return (
      <div className={largeDevice ? 'widgets' : 'widgets__small-screen'}>
         <h2>Widgets </h2>
      </div>
   );
};

export default Widgets;
