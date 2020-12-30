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
         hideSmall: true,
      },
      {
         text: 'Notifications',
         path: '/notifications',
         icon: FaRegBell,
         hideSmall: false,
      },
      {
         text: 'Messages',
         path: '/messages',
         icon: FiMail,
         hideSmall: false,
      },
      {
         text: 'Bookmarks',
         path: '/bookmarks',
         icon: BiBookmark,
         hideSmall: true,
      },

      {
         text: 'Profile',
         path: '/profile',
         icon: BsPerson,
         hideSmall: false,
      },
      {
         text: 'More',
         path: '/more',
         icon: CgMoreO,
         hideSmall: true,
      },
   ];
   return (
      <React.Fragment>
         <ComposeModal open={modalOpen} setOpen={setModalOpen} />
         <Link to="/home" className="nav-logo">
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
                  hideSmall={item.hideSmall}
               />
            ))}
            <li className="main-nav-item nav-tweet-button">
               <button
                  className="common-button full-width large-height"
                  onClick={() => setModalOpen(true)}
               >
                  <span className="icon icon-tweet">
                     <RiQuillPenLine />
                  </span>
                  <span className="text">Tweet</span>
               </button>
            </li>
         </ul>
      </React.Fragment>
   );
};

export default React.memo(Sidebar);
