import React from 'react';
import './SidebarItems.css';
const SidebarItem = ({ active, text, Icon }) => {
   return (
      <div className={`sidebar-option ${active && 'sidebar-option--active'}`}>
         <Icon />
         <span>{text}</span>
      </div>
   );
};

export default SidebarItem;
