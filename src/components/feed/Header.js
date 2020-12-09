import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';

const Header = () => {
   return (
      <div className="feed__header">
         <div className="feed__header--items">
            <span>Home</span>
            <HiOutlineSparkles />
         </div>
      </div>
   );
};

export default Header;
