import React from 'react';
import { IconButton } from '@material-ui/core';
import './styles/SidebarItems.css';
const SidebarItem = ({ active, text, Icon, mobile }) => {
   return (
      <React.Fragment>
         {mobile ? (
            <div className="mobile-sidebar-option">
               <IconButton>
                  <Icon />
               </IconButton>
            </div>
         ) : (
            <div
               className={`sidebar-option ${
                  active && 'sidebar-option--active'
               }`}
            >
               <Icon />
               {text && <span>{text}</span>}
            </div>
         )}
      </React.Fragment>
   );
};

export default SidebarItem;
