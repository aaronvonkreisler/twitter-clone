import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuButton = ({ text, path, Icon, hideSmall, hideMedium }) => {
   const small = hideSmall ? 'hide-small' : '';
   const medium = hideMedium ? 'hide-medium' : '';
   return (
      <li className={`main-nav-item ${small} ${medium}`}>
         <NavLink
            exact
            to={path}
            className="menu-button__link menu-item"
            activeClassName="menu-button__active"
         >
            <span className="icon">
               <Icon />
            </span>
            <span className="text">{text}</span>
         </NavLink>
      </li>
   );
};

MenuButton.propTypes = {
   path: PropTypes.string.isRequired,
};

export default MenuButton;
