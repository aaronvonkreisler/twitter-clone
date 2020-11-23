import React from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ Icon, text }) => {
   return (
      <div className="sidebar-option">
         <h2>{text}</h2>
      </div>
   );
};

export default SidebarItem;
