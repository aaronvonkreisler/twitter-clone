import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineSparkles } from 'react-icons/hi';
import '../../styles/design/header.css';

const Header = ({ text }) => {
   return (
      <div className="header__root">
         <div className="header__items">
            <span>{text}</span>
            <HiOutlineSparkles />
         </div>
      </div>
   );
};

Header.propTypes = {};

export default Header;
