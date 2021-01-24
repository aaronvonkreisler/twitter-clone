import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Menu,
   MenuItem,
   ListItemIcon,
   ListItemText,
   Link,
} from '@material-ui/core';
import { BiBookmark, BiHelpCircle } from 'react-icons/bi';
import { BsBrush } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import '../../styles/design/moreMenu.css';

const MoreMenu = ({ open, anchorEl, setAnchorEl }) => {
   const query = '(max-width: 500px)';
   const screenMatch = useMediaQuery(query);
   let history = useHistory();

   const handleClose = () => {
      setAnchorEl(null);
   };

   const menuItems = [
      {
         text: 'Settings and privacy',
         icon: FiSettings,
         onClick: () => {
            history.push('/settings');
            handleClose();
         },
      },
      {
         text: 'Help Center',
         icon: BiHelpCircle,
         onClick: null,
         link: 'https://help.twitter.com/en',
      },
      {
         text: 'Display',
         icon: BsBrush,
         onClick: () => {
            alert('TODO');
            handleClose();
         },
      },
   ];

   return (
      <React.Fragment>
         <Menu
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            id="more-menu"
         >
            {screenMatch && (
               <MenuItem
                  onClick={() => {
                     history.push('/bookmarks');
                     handleClose();
                  }}
               >
                  <ListItemIcon className="more-menu-icon">
                     <BiBookmark />
                  </ListItemIcon>
                  <ListItemText primary="Bookmarks" />
               </MenuItem>
            )}
            {menuItems.map((item, index) => {
               return (
                  <MenuItem
                     onClick={item.onClick}
                     component={item.link ? Link : 'li'}
                     key={index}
                     href={item.link ? item.link : null}
                     rel={item.link ? 'noopener' : null}
                     target={item.link ? '_blank' : null}
                     color={item.link ? 'inherit' : null}
                  >
                     <ListItemIcon className="more-menu-icon">
                        <item.icon />
                     </ListItemIcon>
                     <ListItemText primary={item.text} />
                  </MenuItem>
               );
            })}
         </Menu>
      </React.Fragment>
   );
};

MoreMenu.propTypes = {
   open: PropTypes.bool.isRequired,
};

export default MoreMenu;
