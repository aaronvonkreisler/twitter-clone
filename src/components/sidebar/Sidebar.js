import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import { BiHomeCircle } from 'react-icons/bi';
import { FaTwitter } from 'react-icons/fa';
import { BiHash } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BiBookmark } from 'react-icons/bi';
import { RiQuillPenLine } from 'react-icons/ri';
import { CgMoreO } from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';
import { useMediaQuery, Fab, Button } from '@material-ui/core';

import './styles/Sidebar.css';
import '../../styles/design/utils.css';

// The width of the root div needs to be 275px on large and up.
// on md and down it needs to be 88px
const Sidebar = (props) => {
   const large = useMediaQuery('(min-width: 1920px)');
   const navItems = [
      {
         text: '',
         path: '/home',
         icon: FaTwitter,
      },
      { text: 'Home', path: '/home', icon: BiHomeCircle },
      {
         text: 'Explore',
         path: '#',
         icon: BiHash,
      },
      {
         text: 'Notifications',
         path: '#',
         icon: FaRegBell,
      },
      {
         text: 'Messages',
         path: '#',
         icon: FiMail,
      },
      {
         text: 'Bookmarks',
         path: '#',
         icon: BiBookmark,
      },

      {
         text: 'Profile',
         path: '/profile',
         icon: BsPerson,
      },
      {
         text: 'More',
         path: '#',
         icon: CgMoreO,
      },
   ];
   return (
      <div className="sidebar__root">
         <div className="sidebar__wrapper">
            <div className="sidebar__items__wrapper">
               {/* User Avatar needs to go in the bottom of this div for alignment to work out.  */}
               <div className="h-100">
                  {navItems.map((item, index) => (
                     <MenuButton
                        key={index}
                        path={item.path}
                        Icon={item.icon}
                        text={item.text}
                        large={large}
                     />
                  ))}
                  {large ? (
                     <div className="button-wrapper">
                        <div className="button-subWrapper">
                           <Button
                              className="tweet-button"
                              type="submit"
                              fullWidth
                           >
                              Tweet
                           </Button>
                        </div>
                     </div>
                  ) : (
                     <div className="actions">
                        <Fab>
                           <RiQuillPenLine />
                        </Fab>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

Sidebar.propTypes = {};

export default Sidebar;

// MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
//          <MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
//          <MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
