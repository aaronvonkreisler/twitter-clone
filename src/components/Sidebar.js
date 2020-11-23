import React from 'react';
import SidebarItem from './SidebarItem';
import BiHomeCircle from 'react-icons/bi';
import BsHash from 'react-icons/bs';
import IoIosNotificationsOutline from 'react-icons/io';
import MdMailOutline from 'react-icons/md';
import BsBookmark from 'react-icons/bs';
import RiFileListLine from 'react-icons/ri';
import BsPerson from 'react-icons/bs';
import CgMoreO from 'react-icons/cg';

const Sidebar = () => {
   return (
      <div>
         <SidebarItem text="Home" />
         <SidebarItem text="Explore" />
         <SidebarItem text="Notifications" />
         <SidebarItem text="Messages" />
         <SidebarItem text="Bookmarks" />
         <SidebarItem text="Lists" />
         <SidebarItem text="Profile" />
         <SidebarItem text="More" />
      </div>
   );
};

export default Sidebar;
