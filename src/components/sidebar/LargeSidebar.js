import React from 'react';
import SidebarItem from './SidebarItem';
import { Button } from '@material-ui/core';
import { BiHomeCircle } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdMailOutline } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import { RiFileListLine } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { FaTwitter } from 'react-icons/fa';
import './styles/Sidebar.css';

const Sidebar = () => {
   return (
      <nav className="sidebar">
         <FaTwitter className="sidebar__twitterIcon" />
         <SidebarItem text="Home" active Icon={BiHomeCircle} />
         <SidebarItem text="Explore" Icon={BsHash} />
         <SidebarItem text="Notifications" Icon={IoIosNotificationsOutline} />
         <SidebarItem text="Messages" Icon={MdMailOutline} />
         <SidebarItem text="Bookmarks" Icon={BsBookmark} />
         <SidebarItem text="Lists" Icon={RiFileListLine} />
         <SidebarItem text="Profile" Icon={BsPerson} />
         <SidebarItem text="More" Icon={CgMoreO} />
         <Button className="tweet-btn" variant="outlined" fullWidth>
            Tweet
         </Button>
      </nav>
   );
};

export default Sidebar;
