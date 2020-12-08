import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/MenuButton.css';

const MenuButton = ({ text, path, Icon, large }) => {
   return (
      <NavLink
         exact
         to={path}
         className="menu-button__link"
         activeClassName="menu-button__active"
      >
         <div className="menu-button__root">
            <div className="menu-button__wrapper">
               <div className="menu-button__icon">
                  <Icon />
               </div>
               {large && (
                  <div className="menu-button__text">
                     <span>{text}</span>
                  </div>
               )}
            </div>
         </div>
      </NavLink>
   );
};

MenuButton.propTypes = {
   path: PropTypes.string.isRequired,
};

export default MenuButton;
