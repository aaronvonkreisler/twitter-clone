import React from 'react';
import { Card, useMediaQuery } from '@material-ui/core';

import './styles/WidgetItem.css';

const WidgetItem = () => {
   return (
      <div>
         <div className="widgetItem">
            <Card elevation={0}>
               <div className="widgetItem__flex">
                  <div className="widgetItem__header">
                     <h2>What's happening</h2>
                  </div>
                  <div className="widgetItem__header widgetItem__flexItem">
                     <h2>What's happening</h2>
                  </div>
                  <div className="widgetItem__header widgetItem__flexItem">
                     <h2>What's happening</h2>
                  </div>
                  <div className="widgetItem__header widgetItem__flexItem">
                     <h2>What's happening</h2>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
};

export default WidgetItem;
