import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineSparkles, HiArrowLeft } from 'react-icons/hi';
import '../../styles/design/header.css';

const Header = ({ text, rightIcon, leftIcon, onIconClick }) => {
   return (
      <React.Fragment>
         {rightIcon && (
            <div className="header__root">
               <div className="header__items__right-icon">
                  <span>{text}</span>
                  <HiOutlineSparkles />
               </div>
            </div>
         )}
         {leftIcon && (
            <div className="header__root-left-icon">
               <div className="header__items__left-icon">
                  <div className="icon__root">
                     <div className="icon__hover-box">
                        <div
                           className="left-icon__wrapper"
                           onClick={onIconClick}
                        >
                           <HiArrowLeft />
                        </div>
                     </div>
                  </div>
                  <div className="left-icon__text-root">
                     <div className="left-icon__text-wrapper">
                        <h2>{text}</h2>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </React.Fragment>
   );
};

Header.propTypes = {
   rightIcon: PropTypes.bool,
   leftIcon: PropTypes.bool,
   text: PropTypes.string.isRequired,
};

export default Header;
