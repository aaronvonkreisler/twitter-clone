import React, { useState, memo } from 'react';
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
import { HiOutlineMail } from 'react-icons/hi';

import MoreMenu from './MoreMenu';
import '../../styles/design/navbar.css';

const Sidebar = memo(function Sidebar({
   setModalOpen,
   withMessages,
   openMessageModal,
}) {
   const [anchorEl, setAnchorEl] = useState(null);

   const navItems = [
      { text: 'Home', path: '/home', icon: BiHomeCircle },

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
         hideMedium: false,
      },

      {
         text: 'Profile',
         path: '/profile',
         icon: BsPerson,
         hideSmall: false,
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
               <MoreMenu
                  open={Boolean(anchorEl)}
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
               />
               <MenuButton
                  text="More"
                  link={false}
                  Icon={CgMoreO}
                  hideSmall={true}
                  hideMedium={false}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
               />
               <li className="main-nav-item nav-tweet-button">
                  <button
                     className="common-button full-width large-height"
                     onClick={
                        // withMessages ? openMessageModal() : setModalOpen(true)
                        () => {
                           if (withMessages) {
                              openMessageModal();
                           } else {
                              setModalOpen(true);
                           }
                        }
                     }
                  >
                     <span className="icon icon-tweet">
                        {withMessages ? <HiOutlineMail /> : <RiQuillPenLine />}
                     </span>
                     <span className="text">
                        {withMessages ? 'New Message' : 'Tweet'}
                     </span>
                  </button>
               </li>
            </ul>
         </div>
         <UserMenu />
      </React.Fragment>
   );
});

export default React.memo(Sidebar);
