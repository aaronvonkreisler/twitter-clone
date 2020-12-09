import React from 'react';

import { FiSearch } from 'react-icons/fi';
import WidgetItem from './WidgetItem';
import './styles/Widgets.css';

const Widgets = () => {
   return (
      <div className="widgets">
         <div className="widget__container">
            <div className="widgets__input">
               <FiSearch className="widgets__searchIcon" />
               <input type="text" placeholder="Search Tweeter" />
            </div>
            <WidgetItem />
            <WidgetItem />
         </div>
      </div>
   );
};

export default Widgets;
