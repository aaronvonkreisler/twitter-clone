import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import '../../styles/design/header.css';

const Header = ({
   text,
   rightIcon,
   leftIcon,
   borderBottom,
   IconComponent,
   onRightIconClick,
   overrideStyle,
   overrideBackButton,
   overrideFunc,
   withNoIcon,
   ...props
}) => {
   let history = useHistory();
   const onBackButtonClick = () => {
      history.goBack();
   };
   return (
      <React.Fragment>
         {rightIcon && (
            <div
               className={
                  borderBottom ? 'header__root bottom-border' : 'header__root'
               }
            >
               <div className="header__items__right-icon">
                  <h2>{text}</h2>
                  {!withNoIcon && (
                     <div className="rightIcon">
                        <div className="icon__hover-box">
                           <div
                              className="right-icon__wrapper"
                              onClick={onRightIconClick}
                           >
                              <IconComponent
                                 style={overrideStyle ? overrideStyle : null}
                              />
                           </div>
                        </div>
                     </div>
                  )}
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
                           onClick={
                              overrideBackButton
                                 ? overrideFunc
                                 : onBackButtonClick
                           }
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
   withNoIcon: false,
};

export default Header;
