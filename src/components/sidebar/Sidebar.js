import React, { useState } from 'react';

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

import './styles/Sidebar.css';
import '../../styles/design/utils.css';

// The width of the root div needs to be 275px on large and up.
// on md and down it needs to be 88px
const Sidebar = (props) => {
   const [modalOpen, setModalOpen] = useState(false);
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
         <div className="sidebar__container">
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
                                    onClick={() => setModalOpen(true)}
                                 >
                                    Tweet
                                 </Button>
                              </div>
                           </div>
                        ) : (
                           <div className="actions">
                              <Fab onClick={() => setModalOpen(true)}>
                                 <RiQuillPenLine />
                              </Fab>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="sidebar__userMenu">
                  <UserMenu />
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};

export default Sidebar;
