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
import { useMediaQuery } from '../../hooks/useMediaQuery';

import '../../styles/design/navbar.css';

// The width of the root div needs to be 275px on large and up.
// on md and down it needs to be 88px
const Sidebar = ({ setModalOpen }) => {
   const query =
      '(min-width: 500px) and (max-width: 1004px), (min-width: 1005px) and (max-width: 1094px),(min-width: 1095px) and (max-width: 1281px)';
   const matches = useMediaQuery(query);

   // When matches = true, that's when the bookmark link should be in the more menu as it will not
   // be displayed in the sidebar

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
         hideMedium: false,
      },
      {
         text: 'Messages',
         path: '/messages',
         icon: FiMail,
         hideSmall: false,
         hideMedium: false,
      },
      {
         text: 'Bookmarks',
         path: '/bookmarks',
         icon: BiBookmark,
         hideSmall: true,
         hideMedium: true,
      },

      {
         text: 'Profile',
         path: '/profile',
         icon: BsPerson,
         hideSmall: false,
         hideMedium: false,
      },
      {
         text: 'More',
         path: '/more',
         icon: CgMoreO,
         hideSmall: true,
         hideMedium: false,
      },
   ];
   return (
      <React.Fragment>
         <div className="main-nav-wrapper">
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
                     hideMedium={item.hideMedium}
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
         </div>
         <UserMenu />
      </React.Fragment>
   );
};

export default React.memo(Sidebar);
