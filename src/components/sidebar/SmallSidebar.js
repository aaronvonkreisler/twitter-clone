import React from 'react';
import SidebarItem from './SidebarItem';
import { Fab, IconButton } from '@material-ui/core';
import { BiHomeCircle } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdMailOutline } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import { RiFileListLine } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { FaTwitter } from 'react-icons/fa';
import { FaFeatherAlt } from 'react-icons/fa';

const SmallSidebar = () => {
   return (
      <nav className="smallSidebar">
         <IconButton>
            <FaTwitter style={{ color: '#50b7f5' }} />
         </IconButton>
         <SidebarItem active mobile Icon={BiHomeCircle} />
         <SidebarItem mobile Icon={BsHash} />
         <SidebarItem mobile Icon={IoIosNotificationsOutline} />
         <SidebarItem mobile Icon={MdMailOutline} />
         <SidebarItem mobile Icon={BsBookmark} />
         <SidebarItem mobile Icon={RiFileListLine} />
         <SidebarItem mobile Icon={BsPerson} />
         <SidebarItem mobile Icon={CgMoreO} />
         <Fab size="medium">
            <FaFeatherAlt />
         </Fab>
      </nav>
   );
};

export default SmallSidebar;
