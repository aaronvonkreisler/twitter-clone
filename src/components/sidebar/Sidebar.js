import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';
import UserMenu from './UserMenu';
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
import ComposeModal from '../forms/ComposeModal';

import '../../styles/design/navbar.css';

// The width of the root div needs to be 275px on large and up.
// on md and down it needs to be 88px
const Sidebar = (props) => {
   const [modalOpen, setModalOpen] = useState(false);

   const navItems = [
      { text: 'Home', path: '/home', icon: BiHomeCircle },
      {
         text: 'Explore',
         path: '/explore',
         icon: BiHash,
      },
      {
         text: 'Notifications',
         path: '/notifications',
         icon: FaRegBell,
      },
      {
         text: 'Messages',
         path: '/messages',
         icon: FiMail,
      },
      {
         text: 'Bookmarks',
         path: '/bookmarks',
         icon: BiBookmark,
      },

      {
         text: 'Profile',
         path: '/profile',
         icon: BsPerson,
      },
      {
         text: 'More',
         path: '/more',
         icon: CgMoreO,
      },
   ];
   return (
      <React.Fragment>
         <ComposeModal open={modalOpen} setOpen={setModalOpen} />
         <Link to="/home" className="logo">
            <span className="icon">
               <FaTwitter />
            </span>
         </Link>
         <ul className="main-nav-list">
            {navItems.map((item, index) => (
               <MenuButton
                  key={index}
                  path={item.path}
                  Icon={item.icon}
                  text={item.text}
               />
            ))}
         </ul>
      </React.Fragment>
   );
};

export default React.memo(Sidebar);
