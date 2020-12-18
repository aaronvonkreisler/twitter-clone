import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { HiOutlineSparkles, HiArrowLeft } from 'react-icons/hi';
import '../../styles/design/header.css';

const Header = ({ text, rightIcon, leftIcon, borderBottom }) => {
   let history = useHistory();
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
            <div
               className={
                  borderBottom
                     ? 'header__root-left-icon bottom-border'
                     : 'header__root-left-icon'
               }
            >
               <div className="header__items__left-icon">
                  <div className="icon__root">
                     <div className="icon__hover-box">
                        <div
                           className="left-icon__wrapper"
                           onClick={() => history.goBack()}
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
   borderBottom: PropTypes.bool,
};

Header.defaultProps = {
   borderBottom: true,
};

export default Header;
